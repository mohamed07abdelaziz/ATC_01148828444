using booking_system.DTO;

namespace booking_system.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterRequestDTO dto);
        Task<AuthResponseDto> LoginAsync(LoginRequestDTO dto);
        Task<AuthResponseDto> NewRefreshTokenAsync(string refreshToken);
    }
}
