using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using ColemanNiki.Models.DataBase;

namespace ColemanNiki.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /User/
        DB db = new DB();
        
        public ActionResult Index()
        {
            dream temp = new dream();
            temp.userId=1;
            temp.remark = Encoding.Default.GetBytes("f");
            temp.state = 1;
            temp.title = Encoding.Default.GetBytes("f");
            db.dreams.Add(temp);
            db.SaveChanges();
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult imgUp()
        {
            return View();
        }
	}
}