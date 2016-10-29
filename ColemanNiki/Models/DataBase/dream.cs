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

        [Column(TypeName = "blob")]
        [Required]
        public byte[] title { get; set; }

        [Column(TypeName = "mediumblob")]
        public byte[] content { get; set; }

        [Column(TypeName = "mediumblob")]
        public byte[] remark { get; set; }

        public DateTime createtime { get; set; }

        public int userId { get; set; }

        public int state { get; set; }
    }
}
