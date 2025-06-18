using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class CustomForm
{
    public int Id { get; set; }

    public string? EngFormName { get; set; }

    public string? FrenchFormName { get; set; }

    public int? AdminId { get; set; }

    public virtual Employee? Admin { get; set; }

    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}
