using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Customer
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Address { get; set; } = null!;

    public int EmpId { get; set; }

    public int UserId { get; set; }

    public virtual Employee Emp { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
