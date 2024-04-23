namespace WebApi.Entities;

using System.Text.Json.Serialization;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string description { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

}