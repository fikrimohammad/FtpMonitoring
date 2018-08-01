using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
    public class CreateMasterSROViewModel
    {
	    [Required(ErrorMessage = "Nama SRO Wajib Diisi")]
		public string Name { get; set; }

        public static implicit operator CreateMasterSROViewModel(MasterSRO masterSRO)
        {
            return new CreateMasterSROViewModel
            {
                Name = masterSRO.Name
            };
        }
        public static implicit operator MasterSRO(CreateMasterSROViewModel createMasterSROViewModel)
        {
            return new MasterSRO
            {
                Name = createMasterSROViewModel.Name
            };
        }
    }
}