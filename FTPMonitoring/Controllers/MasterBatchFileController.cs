using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using FTPMonitoring.Models;

namespace FTPMonitoring.Controllers
{
    public class MasterBatchFileController : Controller
    {
        private readonly FtpMonitoringEntities _con = new FtpMonitoringEntities();
        public MasterBatchFileController()
        {
            _con.Configuration.LazyLoadingEnabled = false;
        }
        // GET: MasterBatchFile
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ListBatchFile()
        {
            using (_con)
            {
                var listBatchFile = _con.MasterBatchFiles.OrderBy(s => s.PathName).Select(x => new { Id = x.Id, Name = x.PathName }).ToList();
                return Json(new { data = listBatchFile }, JsonRequestBehavior.AllowGet);
            }
        }
        [WebMethod]
        public JsonResult GetBatchFile(int statId)
        {
            using (_con)
            {
                var status = _con.MasterBatchFiles.FirstOrDefault(s => s.Id == statId);
                return Json(new { data = status });
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(CreateMasterBatchFileViewModel masterBatchFile)
        {
            bool status = false;
            var errors = new List<string>();
            if (ModelState.IsValid)
            {
                using (_con)
                {
                    _con.MasterBatchFiles.Add(masterBatchFile);
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
        public ActionResult Update(UpdateMasterBatchFileViewModel masterBatchFile)
        {
            bool status = false;
            var errors = new List<string>();
            if (ModelState.IsValid)
            {
                using (_con)
                {
                    var stat = _con.MasterBatchFiles.FirstOrDefault(s => s.Id == masterBatchFile.Id);
                    if (stat != null)
                    {
                        stat.PathName = masterBatchFile.Name;
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
                var masterBatchFile = _con.MasterBatchFiles.FirstOrDefault(s => s.Id == statId);
                if (masterBatchFile != null)
                {
                    _con.MasterBatchFiles.Remove(masterBatchFile);
                }
                _con.SaveChanges();
                status = true;
            }
            return new JsonResult { Data = new { status = status } };
        }
    }
}