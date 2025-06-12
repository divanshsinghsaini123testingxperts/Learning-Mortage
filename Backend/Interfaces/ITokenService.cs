namespace Backend.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(string username);
    }
}
