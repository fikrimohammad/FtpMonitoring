//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FTPMonitoring.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class MonitoringConfiguration
    {
        public int Id { get; set; }
        public Nullable<int> StatusId { get; set; }
        public Nullable<int> PathId { get; set; }
        public Nullable<int> BatchFileId { get; set; }
    
        public virtual MasterBatchFile MasterBatchFile { get; set; }
        public virtual MasterPath MasterPath { get; set; }
        public virtual MasterStatu MasterStatu { get; set; }
    }
}
