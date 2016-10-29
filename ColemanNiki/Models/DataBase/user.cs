namespace ColemanNiki.Models.DataBase
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("colemanniki.user")]
    public partial class user
    {
        public int id { get; set; }

        [StringLength(16)]
        public string username { get; set; }

        [StringLength(16)]
        public string password { get; set; }

        [StringLength(16)]
        public string nickname { get; set; }

        [StringLength(255)]
        public string userImage { get; set; }

        public DateTime? createtime { get; set; }

        [StringLength(16)]
        public string phone { get; set; }

        [StringLength(255)]
        public string email { get; set; }

        public int? type { get; set; }
    }
}
