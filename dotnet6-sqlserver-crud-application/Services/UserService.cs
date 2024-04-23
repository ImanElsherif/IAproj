using AutoMapper;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Users;

namespace WebApi.Services
{
    public class UserService : IUserService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public UserService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            return getUser(id);
        }

        public void Create(CreateRequest model)
        {
            // Validate
            if (_context.Users.Any(x => x.Email == model.Email))
                throw new AppException("User with the email '" + model.Email + "' already exists");

            // Map model to new user object
            var user = _mapper.Map<User>(model);

            // Hash password
            user.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // Save user
            _context.Users.Add(user);
            _context.SaveChanges();
        }


        public void Update(int id, UpdateRequest model)
        {
            var user = getUser(id);

            // Validate
            if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
                throw new AppException("User with the email '" + model.Email + "' already exists");

            // Check for password change and hash new password if present
            if (!string.IsNullOrEmpty(model.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
            }

            // Copy model to user and save
            _mapper.Map(model, user);
            _context.Users.Update(user);
            _context.SaveChanges();
        }


        public void Delete(int id)
        {
            var user = getUser(id);
            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        // helper methods

        private User getUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }
    }
}
