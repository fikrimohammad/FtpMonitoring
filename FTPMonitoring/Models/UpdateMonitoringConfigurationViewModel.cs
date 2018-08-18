using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
	public class UpdateMonitoringConfigurationViewModel
	{
		public int Id { get; set; }
		[Required(ErrorMessage = "Nama Status Wajib Dipilih")]
		public int? StatusId { get; set; }
		[Required(ErrorMessage = "Path Yang Dimonitoring Wajib Dipilih")]
		public int? PathId { get; set; }
		[Required(ErrorMessage = "Path Batch File Yang Digunakan Wajib Dipilih")]
		public int? BatchFileId { get; set; }

		public static implicit operator UpdateMonitoringConfigurationViewModel(MonitoringConfiguration monitoringConfiguration)
		{
			return new UpdateMonitoringConfigurationViewModel
			{
				Id = monitoringConfiguration.Id,
				StatusId = monitoringConfiguration.StatusId,
				PathId = monitoringConfiguration.PathId,
				BatchFileId = monitoringConfiguration.BatchFileId
			};
		}
		public static implicit operator MonitoringConfiguration(UpdateMonitoringConfigurationViewModel updateMonitoringConfigurationViewModel)
		{
			return new MonitoringConfiguration
			{
				Id = updateMonitoringConfigurationViewModel.Id,
				StatusId = updateMonitoringConfigurationViewModel.StatusId,
				PathId = updateMonitoringConfigurationViewModel.PathId,
				BatchFileId = updateMonitoringConfigurationViewModel.BatchFileId
			};
		}
	}
}