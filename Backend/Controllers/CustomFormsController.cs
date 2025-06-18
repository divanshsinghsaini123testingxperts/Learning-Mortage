using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class CustomFormsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
