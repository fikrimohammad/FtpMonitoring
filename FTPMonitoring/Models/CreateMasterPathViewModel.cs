using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
    public class CreateMasterPathViewModel
    {
	    [Required(ErrorMessage = "Nama Path Wajib Diisi")]
		public string Name { get; set; }

        public static implicit operator CreateMasterPathViewModel(MasterPath masterPath)
        {
            return new CreateMasterPathViewModel
            {
                Name = masterPath.Name
            };
        }
        public static implicit operator MasterPath(CreateMasterPathViewModel createMasterPathViewModel)
        {
            return new MasterPath
            {
                Name = createMasterPathViewModel.Name
            };
        }
    }
}