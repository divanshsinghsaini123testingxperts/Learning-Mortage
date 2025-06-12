namespace Backend.Interfaces
{
    public interface IEmailService
    {
        Task SendCustomEmail(string toEmail, string body);
    }
}
