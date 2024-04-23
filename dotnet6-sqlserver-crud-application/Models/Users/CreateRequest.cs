namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;

public class CreateRequest
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters long")]
    public string Password { get; set; }
}
