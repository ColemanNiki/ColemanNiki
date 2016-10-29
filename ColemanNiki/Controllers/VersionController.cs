using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ColemanNiki.Models.DataBase;

namespace ColemanNiki.Controllers
{
    public class VersionController : Controller
    {
        DB db = new DB();
        // GET: Version
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Main()
        {
            return View();
        }

        public ActionResult Append()
        {
            return View();
        }
        public JsonResult submitVersion(version value)
        {

            version temp = value;
            temp.createTime = DateTime.Now;
            temp.state = 0;
            db.versions.Add(temp);
            db.SaveChanges();
            var data = new
            {
                name = 'a',
            };
            return Json(data);
        }
    }
}