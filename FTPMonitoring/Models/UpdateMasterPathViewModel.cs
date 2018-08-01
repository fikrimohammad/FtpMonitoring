using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
    public class UpdateMasterPathViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static implicit operator UpdateMasterPathViewModel(MasterPath masterPath)
        {
            return new UpdateMasterPathViewModel
            {
                Id = masterPath.Id,
                Name = masterPath.Name
            };
        }
        public static implicit operator MasterPath(UpdateMasterPathViewModel masterPath)
        {
            return new MasterPath
            {
                Id = masterPath.Id,
                Name = masterPath.Name
            };
        }
    }
}