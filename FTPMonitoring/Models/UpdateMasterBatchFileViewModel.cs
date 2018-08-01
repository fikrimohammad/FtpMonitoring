using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
    public class UpdateMasterBatchFileViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static implicit operator UpdateMasterBatchFileViewModel(MasterBatchFile masterBatchFile)
        {
            return new UpdateMasterBatchFileViewModel
            {
                Id = masterBatchFile.Id,
                Name = masterBatchFile.PathName
            };
        }
        public static implicit operator MasterBatchFile(UpdateMasterBatchFileViewModel masterBatchFile)
        {
            return new MasterBatchFile
            {
                Id = masterBatchFile.Id,
                PathName = masterBatchFile.Name
            };
        }
    }
}