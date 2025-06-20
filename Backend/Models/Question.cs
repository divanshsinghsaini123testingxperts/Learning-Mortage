﻿using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Question
{
    public int Id { get; set; }

    public string? EngQuestion { get; set; }

    public string? FrenchQuestion { get; set; }

    public bool? RequiredField { get; set; }

    public int? FormId { get; set; }

    public virtual CustomForm? Form { get; set; }
}
