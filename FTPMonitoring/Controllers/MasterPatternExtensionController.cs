using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using FTPMonitoring.Models;

namespace FTPMonitoring.Controllers
{
    public class MasterPatternExtensionController : Controller
    {
        private readonly FtpMonitoringEntities _con = new FtpMonitoringEntities();
        public MasterPatternExtensionController()
        {
            _con.Configuration.LazyLoadingEnabled = false;
        }
        // GET: MasterPatternExtension
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ListPatternExtension()
        {
            using (_con)
            {
                var listPatternExtension = _con.MasterPatternExtensions.OrderBy(x => x.Name).
	                Select(x => new
	                {
		                Id = x.Id,
		                Name = x.Name
	                }).ToList();
                return Json(new { data = listPatternExtension }, JsonRequestBehavior.AllowGet);
            }
        }
        [WebMethod]
        public JsonResult GetPatternExtension(int patternExtensionId)
        {
            using (_con)
            {
                var patternExtension = _con.MasterPatternExtensions.Where(x => x.Id == patternExtensionId).
	                Select(x => new
	                {
						Id = x.Id,
						Name = x.Name
	                }).First();
                return Json(new { data = patternExtension }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(CreateMasterPatternExtensionViewModel masterPatternExtension)
        {
            bool status = false;
            var errors = new List<string>();
            if (ModelState.IsValid)
            {
                using (_con)
                {
                    _con.MasterPatternExtensions.Add(masterPatternExtension);
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
        public ActionResult Update(UpdateMasterPatternExtensionViewModel masterPatternExtension)
        {
            bool status = false;
            var errors = new List<string>();
            if (ModelState.IsValid)
            {
                using (_con)
                {
                    var patternExtension = _con.MasterPatternExtensions.FirstOrDefault(x => x.Id == masterPatternExtension.Id);
                    if (patternExtension != null)
                    {
                        patternExtension.Name = masterPatternExtension.Name;
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
        public ActionResult Delete(int patternExtensionId)
        {
            bool status = false;
            using (_con)
            {
                var masterPatternExtension = _con.MasterPatternExtensions.FirstOrDefault(x => x.Id == patternExtensionId);
                if (masterPatternExtension != null)
                {
                    _con.MasterPatternExtensions.Remove(masterPatternExtension);
                }
                _con.SaveChanges();
                status = true;
            }
            return new JsonResult { Data = new { status = status } };
        }
    }
}