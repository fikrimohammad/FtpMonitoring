using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
    public class CreateMasterFileViewModel
    {
	    [Required(ErrorMessage = "Nama Template File Wajib Diisi")]
		public string Name { get; set; }
	    [Required(ErrorMessage = "SRO Yang Bersangkutan Wajib Dipilih")]
		public int? SroId { get; set; }

        public static implicit operator CreateMasterFileViewModel(MasterFile masterFile)
        {
            return new CreateMasterFileViewModel
            {
                Name = masterFile.Name,
				SroId = masterFile.SroId
            };
        }
        public static implicit operator MasterFile(CreateMasterFileViewModel createMasterFileViewModel)
        {
            return new MasterFile
            {
                Name = createMasterFileViewModel.Name,
				SroId = createMasterFileViewModel.SroId
            };
        }
    }
}