using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Models.Data;
using Backend.Models.Entity;
using Backend.Services;
using Microsoft.EntityFrameworkCore;
namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly MyDbContext _context;
        private readonly TokenService _tokenService;

        public CustomerController(MyDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // Create a function to get all the customers to a particular employee using a stored procedure
        [HttpGet("by-employee/{employeeId}")]
        public async Task<IActionResult> GetCustomersByEmployeeId(int employeeId)
        {
            // Assuming you have a stored procedure named "GetCustomersByEmployeeId"
            // and it takes @EmpId as a parameter
            var customers = await _context.Customers
                .FromSqlRaw("EXEC GetCustomersByEmployeeId @EmpId = {0}", employeeId)
                .ToListAsync();
            return Ok(customers);
        }

        // Delete a customer by customer id
        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeleteCustomer(int customerId)
        {
            // Assuming you have a stored procedure named "DeleteCustomerById"
            await _context.Database.ExecuteSqlRawAsync("EXEC DeleteCustomerById @CustomerId = {0}", customerId);
            return NoContent();
        }
        // Add a new customer to perticular employee id using a stored procedure 
        [HttpPost("{EmployeeId}")]
        public async Task<IActionResult> AddCustomer(int EmployeeId, [FromBody] Customer customer)
        {
            var employee = await _context.Employees.FindAsync(EmployeeId);
            //check the user already exists or not 
            if (employee == null || customer == null)
            {
                return NotFound("Employee not found. OR Enter valid Customer Details ");
            }
            //check the customer exits or not 
            var isExists = await _context.Customers.AnyAsync(c => c.Email == customer.Email);
            if (isExists)
            {
                return BadRequest("Customer with this email already exists.");
            }
            _context.Customers.Add(customer);
            _context.SaveChangesAsync();
            return Ok("Customer added successfully.");
        }
        // update a customer by customer id 
        [HttpPut("{customerId}")]
        public async Task<IActionResult> UpdateCustomer(int customerId, [FromBody] Customer customer)
        {
            if (customerId != customer.Id)
            {
                return BadRequest("Customer ID mismatch.");
            }
            var existingCustomer = await _context.Customers.FindAsync(customerId);
            if (existingCustomer == null)
            {
                return NotFound("Customer not found.");
            }
            existingCustomer.Name = customer.Name;
            existingCustomer.Email = customer.Email;
            existingCustomer.Address = customer.Address;
            existingCustomer.Empid = customer.Empid;
            _context.Customers.Update(existingCustomer);
            await _context.SaveChangesAsync();
            return Ok("Customer updated successfully.");

        }

    }
}
