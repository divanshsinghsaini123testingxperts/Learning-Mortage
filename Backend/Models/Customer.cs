using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Customer
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Address { get; set; }

    public int? EmpId { get; set; }

    public virtual Employee? Emp { get; set; }
}
