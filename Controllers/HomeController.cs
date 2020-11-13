using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Bil359VizeToDoApp.Models;

namespace Bil359VizeToDoApp.Controllers
{
    public class HomeController : Controller
    {
        List<ToDo> todos = new List<ToDo>  
        {  
            new ToDo  
            {  
                ToDoId = 1,  
                ToDoContent = "Arkadaşlarınla kafeye git",  
                IsFinished = true,
            },  
            new ToDo  
            {  
                ToDoId = 2,  
                ToDoContent = "Evi temizle",  
                IsFinished = false,  
            },  
            new ToDo  
            {  
                ToDoId = 3,  
                ToDoContent = "Okul ödevini bitir",  
                IsFinished = true,  
            }  
        };
        public ActionResult Index()
        {
            return View(todos);
        }

        [HttpGet]
        public ActionResult GetAllTodos()
        {
            return Json(new { success = true, responseText= todos}, JsonRequestBehavior.AllowGet);  
        }
    }
}