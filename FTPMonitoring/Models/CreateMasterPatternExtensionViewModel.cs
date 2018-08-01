using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
    public class CreateMasterPatternExtensionViewModel
    {
	    [Required(ErrorMessage = "Nama Pattern Extension Wajib Diisi")]
		public string Name { get; set; }

        public static implicit operator CreateMasterPatternExtensionViewModel(MasterPatternExtension masterPatternExtension)
        {
            return new CreateMasterPatternExtensionViewModel
            {
                Name = masterPatternExtension.Name
            };
        }
        public static implicit operator MasterPatternExtension(CreateMasterPatternExtensionViewModel createMasterPatternExtensionViewModel)
        {
            return new MasterPatternExtension
            {
                Name = createMasterPatternExtensionViewModel.Name
            };
        }
    }
}