using Backend.Interfaces;
using Backend.Models;
using Backend.Models.Data;
using Backend.Models.Entity;
using Backend.Repositories.Contract;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly ITokenService _tokenService;
        private readonly ICustomerRepository _customerRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public CustomerController( ITokenService tokenService, ICustomerRepository CustomerRepo, IEmployeeRepository employeeRepository)
        {
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
            
            bool res =   await _customerRepository.DeleteAsync(customerId);
            if (!res)
            {
                return NotFound("Customer not found.");
            }

            await _customerRepository.SaveChangesAsync();
            return Ok("Customer deleted successfully.");
           
        }
        // Add a new customer to perticular employee id using a stored procedure 
        [HttpPost("AddCustomer")]
        public async Task<IActionResult> AddCustomer([FromBody] Customer customer)
        {

            Console.WriteLine("not reachewd hhhhhhhhhhhhhhhh");
            int EmployeeId = (int)customer.EmpId;
            bool Isemployee = await _employeeRepository.ExistsAsync(EmployeeId);

            //check the user already exists or not 
            if (!Isemployee || customer == null)
            {
                return NotFound("Employee not found. OR Enter valid Customer Details ");
            }
            //check the customer exits or not 
            var isExists = await _customerRepository.ExistsAsync(customer.Id);
            if (isExists)
            {
                return BadRequest("Customer with this email already exists.");
            }
            customer.EmpId = EmployeeId;
            await _customerRepository.AddAsync(customer);
            await _customerRepository.SaveChangesAsync();
            return Ok("Customer added successfully.");
        }
        // update a customer by customer id 
        
        [HttpPut("{customerId}")]
        public async Task<IActionResult> UpdateCustomer(int customerId, [FromBody] Customer customer)
        {
            Console.WriteLine("updated called ------");
            if (customerId != customer.Id)
            {

                return BadRequest("Customer ID mismatch.");
            }
            else if (await _customerRepository.ExistsAsync(customerId) == false)
            {
                return NotFound("Customer not found.");
            }
            var existingCustomer = await _customerRepository.UpdateAsync(customer);
            if (!existingCustomer )
            {
                return NotFound("failed to update.");
            }
            await _customerRepository.SaveChangesAsync();
            return Ok("Customer updated successfully.");
        }
        [HttpGet("GetCustomerByID{customerId}")]
        public async Task<IActionResult> GetCustomerByID(int customerId)
        {
            var customer = await _customerRepository.GetByIdAsync(customerId);
            return Ok(customer);
        }

    }
}
