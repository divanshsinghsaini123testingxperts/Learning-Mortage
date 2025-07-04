﻿using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class User
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Role { get; set; } = null!;

    public virtual Customer? Customer { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
