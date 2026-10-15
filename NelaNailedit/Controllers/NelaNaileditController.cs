using System.Web.Mvc;

namespace NelaNailedit.Controllers
{
    public class NelaNaileditController : Controller
    {
        // View Action Results
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AdminDashboard()
        {
            return View();
        }

        public ActionResult ClientDashboard()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Registration()
        {
            return View();
        }

        // C# Action Method for AngularJS $http.get Service Calls
        public string GetBackendWelcomeMsg()
        {
            return "Welcome to NelaNailedit VIP Loyalty Rewards Program!";
        }
    }
}