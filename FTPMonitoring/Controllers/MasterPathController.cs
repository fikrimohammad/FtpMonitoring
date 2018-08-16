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
                var listPath = _con.MasterPaths.OrderBy(x => x.Name).
	                Select(x => new
	                {
		                Id = x.Id,
		                Name = x.Name
	                }).ToList();
                return Json(new { data = listPath }, JsonRequestBehavior.AllowGet);
            }
        }
        [WebMethod]
        public JsonResult GetPath(int pathId)
        {
            using (_con)
            {
                var path = _con.MasterPaths.Where(x => x.Id == pathId).Select(x => new
                {
					Id = x.Id,
					Name = x.Name
                }).First();
                return Json(new { data = path }, JsonRequestBehavior.AllowGet);
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
                    var path = _con.MasterPaths.FirstOrDefault(x => x.Id == masterPath.Id);
                    if (path != null)
                    {
                        path.Name = masterPath.Name;
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
        public ActionResult Delete(int pathId)
        {
            bool status = false;
            using (_con)
            {
                var masterPath = _con.MasterPaths.FirstOrDefault(s => s.Id == pathId);
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