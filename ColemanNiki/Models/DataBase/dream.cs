namespace ColemanNiki.Models.DataBase
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("colemanniki.dream")]
    public partial class dream
    {
        public int id { get; set; }

        [Column(TypeName = "text")]
        [StringLength(65535)]
        public string title { get; set; }

        [StringLength(1073741823)]
        public string content { get; set; }

        [StringLength(1073741823)]
        public string remark { get; set; }

        public DateTime? createtime { get; set; }

        public int? userId { get; set; }

        [Column(TypeName = "uint")]
        public long? state { get; set; }
    }
}
