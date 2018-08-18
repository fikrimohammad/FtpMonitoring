using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
	public class UpdateMasterStatusViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public Nullable<int> PatternExtensionId { get; set; }

		public static implicit operator UpdateMasterStatusViewModel(MasterStatu masterStatus)
		{
			return new UpdateMasterStatusViewModel
			{
				Id = masterStatus.Id,               
                Name = masterStatus.Name,
				PatternExtensionId = masterStatus.PatternExtensionId
			};
		}
		public static implicit operator MasterStatu(UpdateMasterStatusViewModel masterStatus)
		{
			return new MasterStatu
			{
				Id = masterStatus.Id,
                Name = masterStatus.Name,
				PatternExtensionId = masterStatus.PatternExtensionId
			};
		}
	}
}