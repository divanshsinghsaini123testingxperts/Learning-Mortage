using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Models.Data;
using Backend.Models.Entity;
using Backend.Services;
using Microsoft.EntityFrameworkCore;
using Backend.Interfaces;
using Backend.Repositories.Customers;
using Backend.Repositories.Employees;
namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly MyDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly ICustomerRepository _customerRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public CustomerController(MyDbContext context, ITokenService tokenService, ICustomerRepository CustomerRepo, IEmployeeRepository employeeRepository)
        {
            _context = context;
            _tokenService = tokenService;
            _customerRepository = CustomerRepo;
            _employeeRepository = employeeRepository;
        }

        // Create a function to get all the customers to a particular employee using a stored procedure
        [HttpGet("by-employee/{employeeId}")]
        public async Task<IActionResult> GetCustomersByEmployeeId(int employeeId)
        {
            var customers = await _customerRepository.GetByEmployeeIdAsync(employeeId);
            return Ok(customers);
        }
        // Delete a customer by customer id
      
        
        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeleteCustomer(int customerId)
        {
            try
            {
                await _customerRepository.DeleteByIdAsync(customerId);
                await _customerRepository.SaveChangesAsync();
                return Ok("Customer deleted successfully.");
            }
            catch (Exception ex)
            {
                return NotFound("Customer not found.");
            }
        }

        
        // Add a new customer to perticular employee id using a stored procedure 
        [HttpPost("{EmployeeId}")]
        public async Task<IActionResult> AddCustomer(int EmployeeId, [FromBody] Customer customer)
        {

            var employee = await _employeeRepository.ExistsByIdAsync(EmployeeId);

            //check the user already exists or not 
            if (!employee  || customer == null)
            {
                return NotFound("Employee not found. OR Enter valid Customer Details ");
            }
            //check the customer exits or not 
            var isExists = await _customerRepository.GetByIdAsync(customer.Id);
            if (isExists != null)
            {
                return BadRequest("Customer with this email already exists.");
            }

            await _customerRepository.AddAsync(customer);
            await _customerRepository.SaveChangesAsync();
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

            var existingCustomer = await _customerRepository.UpdateCustomer(customerId , customer);
            if (!existingCustomer )
            {
                return NotFound("Customer not found.");
            }
            await _customerRepository.SaveChangesAsync();
            return Ok("Customer updated successfully.");
        }

    }
}
