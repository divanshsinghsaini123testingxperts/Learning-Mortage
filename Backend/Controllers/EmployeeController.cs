using Backend.Interfaces;
using Backend.Models;
using Backend.Models.Data;
using Backend.Models.Entity;
using Backend.Repositories;
using Backend.Repositories.Contract;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.AccessControl;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IEmailService _emailService;
        private readonly ITokenService _tokenService;
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeController(ITokenService tokan , IEmailService _EmailService , IEmployeeRepository EmprepoInstance) {
            _tokenService = tokan; 
            _emailService = _EmailService; // Initialize the email service
            _employeeRepository = EmprepoInstance;
        }
        [HttpPost("Register")]
        public async Task<IActionResult> RegisterAsync(User user)
        {
            bool eml = await _employeeRepository.GetByEmailAsync(user.Email);
            if (eml)
            {
                return BadRequest("Email already exists."); 
            }
            var Emp = new Employee
            {
                Id = user.Id ,
                Name = user.Name,
                Email = user.Email,
                Password = user.Password, // Ensure password is hashed in a real application
                Role = user.Role
            };
            await _employeeRepository.AddAsync(Emp);
            await _employeeRepository.SaveChangesAsync(); 
            return Ok("Employee Created Sucessfully");
        }
        [HttpPost("LoginRequest")]
        public async Task<IActionResult> LoginRequest(LoginDetailsDTO login)
        {
            if (login == null || string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
            {
                return BadRequest("Please Enter valid login details."); 
            }
            var checkUser = await _employeeRepository.GetByEmailAsync(login.Email);
            if(!checkUser)return BadRequest("User not found with this email.");
            bool user = await _employeeRepository.GetByEmailAndPasswordAsync(login);
            if (user)
            {
                var token = _tokenService.GenerateToken(login.Email);
                return Ok(new { token = token });
            }
            return Unauthorized("Incorrect Password");
        }
        [HttpPost("Forgot_Password_mailcheck")]
        public async Task<IActionResult> Forgot_Password_mailcheck(Emailh e)
        {
            bool user =await _employeeRepository.GetByEmailAsync(e.Email);
            if (!user)return BadRequest("Email not exists -");
            // Implement the logic of sending email to user, to that particular mail
            var rand = new Random();
            var otp = rand.Next(100000, 1000000);
            OtpStore.EmailOtpMap[e.Email] = otp;

            string path = Path.Combine(Directory.GetCurrentDirectory(), "Template", "mail_temp.html");
            string template = System.IO.File.ReadAllText(path);

            string emailBody = template.Replace("123456", otp.ToString());
            await _emailService.SendCustomEmail(e.Email, emailBody);
            return Ok();
        }
        [HttpPost("Forgot_Password_otpcheck")]
        public async Task<IActionResult> Forgot_Password_otpcheck(mailotp temp)
        {

            bool user = await _employeeRepository.GetByEmailAsync(temp.Email);
            if (!user) return BadRequest("User not found");

            if (!OtpStore.EmailOtpMap.TryGetValue(temp.Email, out var savedOtp))
                return BadRequest("OTP expired or not sent");

            int enteredOtp = Convert.ToInt32(temp.Otp);
            if (enteredOtp != savedOtp)return BadRequest("Incorrect OTP");

            return Ok("OTP verified");
        }
        [HttpPost("SetNewPassword")]
        
        public async Task<IActionResult> SetNewPassword(LoginDetailsDTO user)
        {
            bool sucess_update  = await _employeeRepository.SaveNewPasswordAsync(user);
            if(sucess_update == false)
            {
                return BadRequest("Failed to update password. Please try again.");
            }
            return Ok("sucessFUll Update");

        }

        [HttpPost("GetId")]
        [Authorize]
        public async Task<IActionResult> GetIdbyEmailId([FromBody] string Email)
        {
            Console.WriteLine("beeeeeeeeeeeeehhhhhehehheh");

            int id =  await _employeeRepository.GetIdByEmail(Email);
            Console.WriteLine("hehehheh");
            return Ok(id);
        }

    }
}
