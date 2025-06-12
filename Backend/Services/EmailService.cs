using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Backend.Interfaces;


namespace Backend.Services
{
    public class EmailService : IEmailService
    {
        public async Task SendCustomEmail(string toEmail, string body)
        {
            var fromEmail = "divanshsinghsaini123@gmail.com";
            var appPassword = "zewz oqyw icvb fsyk";

            var message = new MailMessage();
            message.To.Add(toEmail);
            message.Subject = "Password Reset Verification Code from Employee Manager";
            message.Body = body;
            message.IsBodyHtml = true; // or false if plain text
            message.From = new MailAddress(fromEmail);

            using (var smtp = new SmtpClient("smtp.gmail.com", 587))
            {
                smtp.Credentials = new NetworkCredential(fromEmail, appPassword);
                smtp.EnableSsl = true;
                await smtp.SendMailAsync(message);
            }
        }
    }
}
