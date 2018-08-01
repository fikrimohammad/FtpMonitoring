using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
    public class UpdateMasterSROViewModel
    {
        public int Id { get; set; }
	    [Required(ErrorMessage = "Nama SRO Wajib Diisi")]
		public string Name { get; set; }

        public static implicit operator UpdateMasterSROViewModel(MasterSRO masterSRO)
        {
            return new UpdateMasterSROViewModel
            {
                Id = masterSRO.Id,
                Name = masterSRO.Name
            };
        }
        public static implicit operator MasterSRO(UpdateMasterSROViewModel masterSRO)
        {
            return new MasterSRO
            {
                Id = masterSRO.Id,
                Name = masterSRO.Name
            };
        }
    }
}