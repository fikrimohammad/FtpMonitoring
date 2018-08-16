using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web.Mvc;
using System.Web.Services;
using FTPMonitoring.Models;

namespace FTPMonitoring.Controllers
{

    public class FtpMonitorController : Controller
    {
		private readonly FtpMonitoringEntities _con = new FtpMonitoringEntities();

        // GET: FTPMonitor
        public ActionResult Index()
        {
            return View();
        }
	    public JsonResult ListMonitoringLog(int sroId)
	    {
		    using (_con)
			{
				var sro = _con.MasterSROes.FirstOrDefault(x => x.Id == sroId);
				var listMonitoringLogs = sro.MasterFiles
					.Select(x => new
				{
					monitoringLogId = x.MonitoringLogs.Select(y => y.Id).First(),
					fileTemplateId = x.Id,
					fileTemplateName = x.Name,
					monitoringLogDetailCount = x.MonitoringLogs
						.Select(y => y.MonitoringLogDetails.Count).First()
				}).ToList();

				return Json(new {data = listMonitoringLogs}, JsonRequestBehavior.AllowGet);
			}
	    }

	    public JsonResult GetMonitoringLogDetail(int monitoringLogId)
	    {
		    using (_con)
		    {
			    var monitoringLogDetail = _con.MonitoringLogDetails.Where(x => x.MonitoringLogId == monitoringLogId)
				    .Select(x => new
				    {
					    fileTemplateId = x.MonitoringLog.MasterFile.Id,
					    fileName = x.FileName,
						fileStatus = x.MasterStatu.Name,
						etlRunDatetime = x.ETLRunDatetime
					}).OrderByDescending(z => z.etlRunDatetime).First();
			    return Json(new { data = monitoringLogDetail }, JsonRequestBehavior.AllowGet);
			}
	    }

	    public JsonResult ListHistoryMonitoringLog(int fileTemplateId)
	    {
		    using (_con)
		    {
			    var historyMonitoringLogs = _con.spListHistoryMonitoringLogs(fileTemplateId).ToList();
			    return Json(new { data = historyMonitoringLogs }, JsonRequestBehavior.AllowGet);
			}
		   
		}
    }
}