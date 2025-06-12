namespace Backend.Models.Entity
{
    public class GetEmployeeDTO
    {
        public int Id { get; set; }                 // c.Id (Customer Id)
        public string Name { get; set; }            // c.Name (Customer Name)
        public string Email { get; set; }           // c.Email (Customer Email)
        public string Address { get; set; }         // c.Address

        public int EmployeeId { get; set; }         // e.Id (Employee Id)
        public string EmployeeName { get; set; }    // e.Name
        public string EmployeeEmail { get; set; }   // e.Email
        public string EmployeeRole { get; set; }    // e.Role
    }

}

