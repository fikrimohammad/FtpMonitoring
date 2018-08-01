using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
    public class CreateMasterBatchFileViewModel
    {
	    [Required(ErrorMessage = "Nama Path Dari Batch File Wajib Diisi")]
		public string Name { get; set; }

        public static implicit operator CreateMasterBatchFileViewModel(MasterBatchFile masterBatchFile)
        {
            return new CreateMasterBatchFileViewModel
            {
                Name = masterBatchFile.PathName
            };
        }
        public static implicit operator MasterBatchFile(CreateMasterBatchFileViewModel createMasterBatchFileViewModel)
        {
            return new MasterBatchFile
            {
                PathName = createMasterBatchFileViewModel.Name
            };
        }
    }
}