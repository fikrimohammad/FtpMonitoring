using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
	public class CreateMonitoringConfigurationViewModel
	{
		[Required(ErrorMessage = "Nama Status Wajib Dipilih")]
		public int? StatusId { get; set; }
		[Required(ErrorMessage = "Path Yang Dimonitoring Wajib Dipilih")]
		public int? PathId { get; set; }
		[Required(ErrorMessage = "Path Batch File Yang Digunakan Wajib Dipilih")]
		public int? BatchFileId { get; set; }

		public static implicit operator CreateMonitoringConfigurationViewModel(MonitoringConfiguration monitoringConfiguration)
		{
			return new CreateMonitoringConfigurationViewModel
			{
				StatusId = monitoringConfiguration.StatusId,
				PathId = monitoringConfiguration.PathId,
				BatchFileId = monitoringConfiguration.BatchFileId
			};
		}
		public static implicit operator MonitoringConfiguration(CreateMonitoringConfigurationViewModel createMonitoringConfigurationViewModel)
		{
			return new MonitoringConfiguration
			{
				StatusId = createMonitoringConfigurationViewModel.StatusId,
				PathId = createMonitoringConfigurationViewModel.PathId,
				BatchFileId = createMonitoringConfigurationViewModel.BatchFileId
			};
		}
	}
}