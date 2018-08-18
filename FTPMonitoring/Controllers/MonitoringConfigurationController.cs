using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using FTPMonitoring.Models;

namespace FTPMonitoring.Controllers
{
    public class MonitoringConfigurationController : Controller
    {
		private readonly FtpMonitoringEntities _con = new FtpMonitoringEntities();

	    public MonitoringConfigurationController()
	    {
		    _con.Configuration.LazyLoadingEnabled = false;
	    }
        // GET: MonitoringConfiguration
        public ActionResult Index()
        {
            return View();
        }
		[WebMethod]
	    public JsonResult ListMonitoringConfiguration()
	    {
		    using (_con)
		    {
			    var monitoringConfigurations = _con.MonitoringConfigurations.OrderBy(x => x.MasterStatu.Name).
				    Select(x => new
				    {
						Id = x.Id,
						StatusName = x.MasterStatu.Name,
						PathName = x.MasterPath.Name,
						BatchFileName = x.MasterBatchFile.PathName
				    }).ToList();
			    return Json(new {data = monitoringConfigurations}, JsonRequestBehavior.AllowGet);
		    }
	    }
	    [WebMethod]
	    public JsonResult GetMonitoringConfiguration(int monitoringConfigurationId)
	    {
		    using (_con)
		    {
			    var monitoringConfiguration = _con.MonitoringConfigurations.Where(x => x.Id == monitoringConfigurationId)
				    .Select(x => new
				    {
					    Id = x.Id,
					    StatusId = x.MasterStatu.Id,
						PathId = x.MasterPath.Id,
					    BatchFileId = x.MasterBatchFile.Id
				    }).First();
			    return Json(new { data = monitoringConfiguration }, JsonRequestBehavior.AllowGet);
		    }
	    }
	    [HttpPost]
	    [ValidateAntiForgeryToken]
	    public ActionResult Create(CreateMonitoringConfigurationViewModel monitoringConfiguration)
	    {
		    bool status = false;
		    var errors = new List<string>();
		    if (ModelState.IsValid)
		    {
			    using (_con)
			    {
				    _con.MonitoringConfigurations.Add(monitoringConfiguration);
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
	    public ActionResult Update(UpdateMonitoringConfigurationViewModel monitoringConfiguration)
	    {
		    bool status = false;
		    var errors = new List<string>();
		    if (ModelState.IsValid)
		    {
			    using (_con)
			    {
				    var monitoringConfig = _con.MonitoringConfigurations.FirstOrDefault(x => x.Id == monitoringConfiguration.Id);
				    if (monitoringConfig != null)
				    {
					    monitoringConfig.StatusId = monitoringConfiguration.StatusId;
					    monitoringConfig.PathId = monitoringConfiguration.PathId;
					    monitoringConfig.BatchFileId = monitoringConfiguration.BatchFileId;
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
	    public ActionResult Delete(int monitoringConfigurationId)
	    {
		    bool status = false;
		    using (_con)
		    {
			    var monitoringConfiguration = _con.MonitoringConfigurations.FirstOrDefault(x => x.Id == monitoringConfigurationId);
			    if (monitoringConfiguration != null)
			    {
				    _con.MonitoringConfigurations.Remove(monitoringConfiguration);
			    }
			    _con.SaveChanges();
			    status = true;
		    }
		    return new JsonResult { Data = new { status = status } };
	    }
	}
}