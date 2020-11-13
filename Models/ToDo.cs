using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Bil359VizeToDoApp.Models
{
    public class ToDo
    {
        [Display(Name = "ID")]
        public long ToDoId { get; set; }
        [Display(Name = "To Do Content")]
        public string ToDoContent { get; set; }
        [Display(Name = "Is Finish?")]
        public bool IsFinished { get; set; }
    }
}