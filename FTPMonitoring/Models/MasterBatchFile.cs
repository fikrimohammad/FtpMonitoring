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
    
    public partial class MasterBatchFile
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MasterBatchFile()
        {
            this.MonitoringConfigurations = new HashSet<MonitoringConfiguration>();
        }
    
        public int Id { get; set; }
        public string PathName { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MonitoringConfiguration> MonitoringConfigurations { get; set; }
    }
}
