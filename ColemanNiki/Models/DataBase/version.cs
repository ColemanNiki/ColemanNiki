namespace ColemanNiki.Models.DataBase
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("colemanniki.version")]
    public partial class version
    {
        public int id { get; set; }

        [Column(TypeName = "text")]
        [StringLength(65535)]
        public string title { get; set; }

        [StringLength(1073741823)]
        public string content { get; set; }

        public DateTime? createTime { get; set; }

        public DateTime? finishTime { get; set; }

        [Column(TypeName = "uint")]
        public long? state { get; set; }
    }
}
