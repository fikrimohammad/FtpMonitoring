using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using FTPMonitoring.Models;

namespace FTPMonitoring.Controllers
{
    public class MasterFileController : Controller
    {
        private readonly FtpMonitoringEntities _con = new FtpMonitoringEntities();
        public MasterFileController()
        {
            _con.Configuration.LazyLoadingEnabled = false;
        }
        // GET: MasterFile
        public ActionResult Index()
        {
            return View();
        }
        [WebMethod]
        public JsonResult ListMasterTemplateFile()
        {
            using (_con)
            {
                var listMasterTemplateFile = _con.MasterFiles.OrderBy(x => x.Name)
	                .Select(x => new
		                {
			                Id = x.Id,
							Name = x.Name,
							SROName = x.MasterSRO.Name
		                })
	                .ToList();
                return Json(new { data = listMasterTemplateFile }, JsonRequestBehavior.AllowGet);
            }
        }
        [WebMethod]
        public JsonResult GetMasterTemplateFile(int fileTemplateId)
        {
            using (_con)
            {
                var masterTemplateFile = _con.MasterFiles.Where(x => x.Id == fileTemplateId)
	                .Select(x => new
	                {
						Id = x.Id,
						Name = x.Name,
						SROId = x.MasterSRO.Id
	                }).First();
                return Json(new { data = masterTemplateFile }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(CreateMasterFileViewModel masterFile)
        {
            bool status = false;
            var errors = new List<string>();
            if (ModelState.IsValid)
            {
                using (_con)
                {
                    _con.MasterFiles.Add(masterFile);
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
        public ActionResult Update(UpdateMasterFileViewModel masterFile)
        {
            bool status = false;
            var errors = new List<string>();
            if (ModelState.IsValid)
            {
                using (_con)
                {
                    var masterTemplateFile = _con.MasterFiles.FirstOrDefault(s => s.Id == masterFile.Id);
                    if (masterTemplateFile != null)
                    {
						masterTemplateFile.Name = masterFile.Name;
						masterTemplateFile.SroId = masterFile.SroId;
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
        public ActionResult Delete(int fileTemplateId)
        {
            bool status = false;
            using (_con)
            {
				var masterTemplateFile = _con.MasterFiles.FirstOrDefault(s => s.Id == fileTemplateId);
                if (masterTemplateFile != null)
                {
                    _con.MasterFiles.Remove(masterTemplateFile);
                }
                _con.SaveChanges();
                status = true;
            }
            return new JsonResult { Data = new { status = status } };
        }
    }
}