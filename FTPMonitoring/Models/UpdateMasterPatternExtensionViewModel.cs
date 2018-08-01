using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FTPMonitoring.Models
{
    public class UpdateMasterPatternExtensionViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static implicit operator UpdateMasterPatternExtensionViewModel(MasterPatternExtension masterPatternExtension)
        {
            return new UpdateMasterPatternExtensionViewModel
            {
                Id = masterPatternExtension.Id,
                Name = masterPatternExtension.Name
            };
        }
        public static implicit operator MasterPatternExtension(UpdateMasterPatternExtensionViewModel masterPatternExtension)
        {
            return new MasterPatternExtension
            {
                Id = masterPatternExtension.Id,
                Name = masterPatternExtension.Name
            };
        }
    }
}