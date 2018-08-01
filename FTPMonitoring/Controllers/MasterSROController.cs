using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using FTPMonitoring.Models;

namespace FTPMonitoring.Controllers
{
    public class MasterSROController : Controller
    {
        private readonly FtpMonitoringEntities _con = new FtpMonitoringEntities();
        public MasterSROController()
        {
            _con.Configuration.LazyLoadingEnabled = false;
        }
        // GET: MasterSRO
        public ActionResult Index()
        {
            return View();
        }
        [WebMethod]
        public JsonResult ListSro()
        {
            using (_con)
            {
                var listSro = _con.MasterSROes.OrderBy(x => x.Name)
	                .Select(x => new
	                {
		                Id = x.Id,
		                Name = x.Name
	                }).ToList();
                return Json(new { data = listSro }, JsonRequestBehavior.AllowGet);
            }
        }
        [WebMethod]
        public JsonResult GetSro(int sroId)
        {
            using (_con)
            {
                var sro = _con.MasterSROes.Where(x => x.Id == sroId)
	                .Select(x => new
	                {
						Id = x.Id,
						Name = x.Name
	                }).First();
                return Json(new { data = sro }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(CreateMasterSROViewModel masterSRO)
        {
            bool status = false;
            var errors = new List<string>();
            if (ModelState.IsValid)
            {
                using (_con)
                {
                    _con.MasterSROes.Add(masterSRO);
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
        public ActionResult Update(UpdateMasterSROViewModel masterSRO)
        {
            bool status = false;
            var errors = new List<string>();
            if (ModelState.IsValid)
            {
                using (_con)
                {
                    var stat = _con.MasterSROes.FirstOrDefault(s => s.Id == masterSRO.Id);
                    if (stat != null)
                    {
                        stat.Name = masterSRO.Name;
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
        public ActionResult Delete(int sroId)
        {
            bool status = false;
            using (_con)
            {
                var masterSRO = _con.MasterSROes.FirstOrDefault(s => s.Id == sroId);
                if (masterSRO != null)
                {
                    _con.MasterSROes.Remove(masterSRO);
                }
                _con.SaveChanges();
                status = true;
            }
            return new JsonResult { Data = new { status = status } };
        }
    }
}