﻿using System;
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
        
        public ActionResult Index()
        {
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