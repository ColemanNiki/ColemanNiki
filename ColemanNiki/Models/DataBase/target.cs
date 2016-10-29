namespace ColemanNiki.Models.DataBase
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("colemanniki.target")]
    public partial class target
    {
        public int id { get; set; }

        [Column(TypeName = "blob")]
        [Required]
        public byte[] title { get; set; }

        [Column(TypeName = "mediumint")]
        public int? content { get; set; }

        [Column(TypeName = "mediumint")]
        public int? remark { get; set; }

        public DateTime createtime { get; set; }

        public int dreamId { get; set; }

        [Column(TypeName = "uint")]
        public long state { get; set; }
    }
}
