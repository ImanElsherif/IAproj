namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

public class CreateRequest
{

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string description { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

}