namespace ColemanNiki.Models.DataBase
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("colemanniki.versionitem")]
    public partial class versionitem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }

        public int vesionId { get; set; }

        [Column(TypeName = "text")]
        [StringLength(65535)]
        public string title { get; set; }

        [StringLength(1073741823)]
        public string content { get; set; }

        public DateTime? createTime { get; set; }

        public DateTime? finishTime { get; set; }
    }
}
