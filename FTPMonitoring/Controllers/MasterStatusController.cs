using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using FTPMonitoring.Models;

namespace FTPMonitoring.Controllers
{
    public class MasterStatusController : Controller
    {
        private readonly FtpMonitoringEntities _con = new FtpMonitoringEntities();
        public MasterStatusController()
        {
            _con.Configuration.LazyLoadingEnabled = false;
        }
        // GET: MasterStatus
        public ActionResult Index()
        {
            return View();
        }
        [WebMethod]
        public JsonResult ListStatus()
        {
            using (_con)
            {
                var listStatus = _con.MasterStatus.OrderBy(x => x.Name).
	                Select(x => new
	                {
		                Id = x.Id,
		                Name = x.Name,
						PatternExtensionName = x.MasterPatternExtension.Name
	                }).ToList();
                return Json(new { data = listStatus }, JsonRequestBehavior.AllowGet);
            }
        }
        [WebMethod]
        public JsonResult GetStatus(int statId)
        {
            using (_con)
            {
                var status = _con.MasterStatus.Where(x => x.Id == statId).
	                Select(x => new
	                {
						Id = x.Id,
						Name = x.Name,
						PatternExtensionId = x.MasterPatternExtension.Id
	                }).First();
                return Json(new { data = status }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(CreateMasterStatusViewModel masterStatus)
        {
            bool status = false;
            var errors = new List<string>();
            if (ModelState.IsValid)
            {
                using (_con)
                {
                    _con.MasterStatus.Add(masterStatus);
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
        public ActionResult Update(UpdateMasterStatusViewModel masterStatus)
        {
            bool status = false;
            var errors = new List<string>();
            if (ModelState.IsValid)
            {
                using (_con)
                {
                    var stat = _con.MasterStatus.FirstOrDefault(s => s.Id == masterStatus.Id);
                    if (stat != null)
                    {
                        stat.Name = masterStatus.Name;
	                    stat.PatternExtensionId = masterStatus.PatternExtensionId;
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
                var masterStatus = _con.MasterStatus.FirstOrDefault(x => x.Id == statId);
                if (masterStatus != null)
                {
                    _con.MasterStatus.Remove(masterStatus);
                }
                _con.SaveChanges();
                status = true;
            }
            return new JsonResult { Data = new { status = status } };
        }
    }
}