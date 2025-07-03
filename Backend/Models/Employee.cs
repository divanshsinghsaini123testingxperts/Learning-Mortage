using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public int UserId { get; set; }

    public virtual ICollection<CustomForm> CustomForms { get; set; } = new List<CustomForm>();

    public virtual ICollection<Customer> Customers { get; set; } = new List<Customer>();

    public virtual User User { get; set; } = null!;
}
