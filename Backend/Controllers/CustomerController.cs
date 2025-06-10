using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class CustomerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
