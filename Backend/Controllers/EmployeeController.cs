using Backend.Models;
using Backend.Models.Data;
using Backend.Models.Entity;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.AccessControl;
using Backend.Interfaces;
namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IEmailService _emailService;
        private readonly MyDbContext _context;
        private readonly ITokenService _tokenService;
        public EmployeeController(MyDbContext context , ITokenService tokan , IEmailService _EmailService) {
            _context = context; 
            _tokenService = tokan; 
            _emailService = _EmailService; // Initialize the email service
        }
        [HttpPost("Register")]
        public IActionResult Register(User user)
        {
            //user.Id = 0; 

            var eml = _context.Employees.FirstOrDefault(u => u.Email == user.Email);
            if (eml != null)
            {
                return BadRequest("Email already exists."); // Fixed: BadRequest is now accessible via ControllerBase
            }
            var Emp = new Employee
            {
               
                Name = user.Name,
                Email = user.Email,
                Password = user.Password, // Ensure password is hashed in a real application
                Role = user.Role
            };
            _context.Employees.Add(Emp); //saved
            _context.SaveChanges();
            return Ok(user); // Return 200 with the registered user data
        }

        [HttpPost("LoginRequest")]

        public IActionResult LoginRequest(LoginDetailsDTO login)
        {
            if (login == null || string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
            {
                return BadRequest("Invalid login details."); // Return 400 Bad Request for invalid input
            }
            var user = _context.Employees.FirstOrDefault(u => u.Email == login.Email && u.Password == login.Password);
            if (user != null)
            {
                var token = _tokenService.GenerateToken(login.Email);
                return Ok(new { token = token });
            }
            return Unauthorized();
        }
        [HttpPost("Forgot_Password_mailcheck")]
        public IActionResult Forgot_Password_mailcheck(Emailh e)
        {
            var user = _context.Employees.FirstOrDefault(u => u.Email == e.Email);
            if (user == null) return BadRequest("Email not exists -");
            Console.WriteLine("Email_in_databse--" + user.Email);
            Console.WriteLine("email_come_from--" + e.Email);

            // Implement the logic of sending email to user, to that particular mail
            var rand = new Random();
            var otp = rand.Next(100000, 1000000);
            OtpStore.EmailOtpMap[e.Email] = otp;

            string template = System.IO.File.ReadAllText("/Backend/Template/mail_temp.html");
            string emailBody = template.Replace("123456", otp.ToString());
            _emailService.SendCustomEmail(e.Email, emailBody).Wait();

            return Ok();
        }
        [HttpPost("Forgot_Password_otpcheck")]
        public IActionResult Forgot_Password_otpcheck(mailotp temp)
        {
           
            var user = _context.Employees.FirstOrDefault(u => u.Email == temp.Email);
            if (user == null) return BadRequest("User not found");

            if (!OtpStore.EmailOtpMap.TryGetValue(temp.Email, out var savedOtp))
                return BadRequest("OTP expired or not sent");

            int enteredOtp = Convert.ToInt32(temp.Otp);
            if (enteredOtp != savedOtp)
                return BadRequest("Incorrect OTP");

            return Ok("OTP verified");
        }
        [HttpPost("SetNewPassword")]
        public IActionResult SetNewPassword(LoginDetailsDTO user)
        {
            var us = _context.Employees.FirstOrDefault(u => u.Email == user.Email);
            if (us == null) return BadRequest("User NOt found ");
            us.Password = user.Password;
            //_context.Update(us);
            _context.SaveChanges();
            return Ok();

        }

    }
}
