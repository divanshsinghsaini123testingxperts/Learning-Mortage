using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class FormDatum
{
    public int Entryid { get; set; }

    public int QuestionId { get; set; }

    public int FormId { get; set; }

    public int CustomerId { get; set; }

    public string? Answer { get; set; }

    public virtual CustomForm Form { get; set; } = null!;
}
