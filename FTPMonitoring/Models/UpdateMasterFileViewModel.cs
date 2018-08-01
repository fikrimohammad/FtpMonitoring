using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
    public class UpdateMasterFileViewModel
    {
        public int Id { get; set; }
	    [Required(ErrorMessage = "Nama Template File Wajib Diisi")]
		public string Name { get; set; }
		[Required(ErrorMessage = "SRO Yang Bersangkutan Wajib Dipilih")]
		public int? SroId { get; set; }

        public static implicit operator UpdateMasterFileViewModel(MasterFile masterFile)
        {
            return new UpdateMasterFileViewModel
            {
                Id = masterFile.Id,
                Name = masterFile.Name,
				SroId = masterFile.SroId
            };
        }
        public static implicit operator MasterFile(UpdateMasterFileViewModel masterFile)
        {
            return new MasterFile
            {
                Id = masterFile.Id,
                Name = masterFile.Name,
				SroId = masterFile.SroId
            };
        }
    }
}