namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

public class UpdateRequest
{
    public string FirstName { get; set; }
    public string description { get; set; }

    [EmailAddress]
    public string Email { get; set; }

    public string Password { get; set; }

    private string replaceEmptyWithNull(string value)
    {
        return string.IsNullOrEmpty(value) ? null : value;
    }
}