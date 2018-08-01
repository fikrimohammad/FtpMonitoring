using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using FTPMonitoring.Models;

namespace FTPMonitoring.Controllers
{
    public class MasterPathController : Controller
    {
        private readonly FtpMonitoringEntities _con = new FtpMonitoringEntities();
        public MasterPathController()
        {
            _con.Configuration.LazyLoadingEnabled = false;
        }
        // GET: MasterPath
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ListPath()
        {
            using (_con)
            {
                var listPath = _con.MasterPaths.OrderBy(s => s.Name).Select(x => new { Id = x.Id, Name = x.Name }).ToList();
                return Json(new { data = listPath }, JsonRequestBehavior.AllowGet);
            }
        }
        [WebMethod]
        public JsonResult GetPath(int statId)
        {
            using (_con)
            {
                var status = _con.MasterPaths.FirstOrDefault(s => s.Id == statId);
                return Json(new { data = status });
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(CreateMasterPathViewModel masterPath)
        {
            bool status = false;
            var errors = new List<string>();
            if (ModelState.IsValid)
            {
                using (_con)
                {
                    _con.MasterPaths.Add(masterPath);
                    _con.SaveChanges();
                    status = true;
                }
                return new JsonResult { Data = new { status = status, errors = errors } };
            }

            foreach (var state in ModelState)
            {
                foreach (var error in state.Value.Errors)
                {
                    errors.Add(error.ErrorMessage);
                }
            }
            return new JsonResult { Data = new { status = status, errors = errors } };
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Update(UpdateMasterPathViewModel masterPath)
        {
            bool status = false;
            var errors = new List<string>();
            if (ModelState.IsValid)
            {
                using (_con)
                {
                    var stat = _con.MasterPaths.FirstOrDefault(s => s.Id == masterPath.Id);
                    if (stat != null)
                    {
                        stat.Name = masterPath.Name;
                    }
                    _con.SaveChanges();
                    status = true;
                }
                return new JsonResult { Data = new { status = status, errors = errors } };
            }
            else
            {
                foreach (var state in ModelState)
                {
                    foreach (var error in state.Value.Errors)
                    {
                        errors.Add(error.ErrorMessage);
                    }
                }
                return new JsonResult { Data = new { status = status, errors = errors } };
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int statId)
        {
            bool status = false;
            using (_con)
            {
                var masterPath = _con.MasterPaths.FirstOrDefault(s => s.Id == statId);
                if (masterPath != null)
                {
                    _con.MasterPaths.Remove(masterPath);
                }
                _con.SaveChanges();
                status = true;
            }
            return new JsonResult { Data = new { status = status } };
        }
    }
}