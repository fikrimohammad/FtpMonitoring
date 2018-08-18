using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
	public class CreateMasterStatusViewModel
	{
		public string Name { get; set; }
		public Nullable<int> PatternExtensionId { get; set; }

		public static implicit operator CreateMasterStatusViewModel(MasterStatu masterStatus)
		{
			return new CreateMasterStatusViewModel
			{               
				Name = masterStatus.Name,
				PatternExtensionId = masterStatus.PatternExtensionId
			};
		}
		public static implicit operator MasterStatu(CreateMasterStatusViewModel createMasterStatusViewModel)
		{
			return new MasterStatu
			{                
                Name = createMasterStatusViewModel.Name,
				PatternExtensionId = createMasterStatusViewModel.PatternExtensionId
			};
		}
	}
}