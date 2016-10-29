namespace ColemanNiki.Models.DataBase
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class DB : DbContext
    {
        public DB()
            : base("name=DB")
        {
        }

        public virtual DbSet<dream> dreams { get; set; }
        public virtual DbSet<target> targets { get; set; }
        public virtual DbSet<user> users { get; set; }
        public virtual DbSet<version> versions { get; set; }
        public virtual DbSet<versionitem> versionitems { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<dream>()
                .Property(e => e.title)
                .IsUnicode(false);

            modelBuilder.Entity<dream>()
                .Property(e => e.content)
                .IsUnicode(false);

            modelBuilder.Entity<dream>()
                .Property(e => e.remark)
                .IsUnicode(false);

            modelBuilder.Entity<target>()
                .Property(e => e.title)
                .IsUnicode(false);

            modelBuilder.Entity<target>()
                .Property(e => e.content)
                .IsUnicode(false);

            modelBuilder.Entity<target>()
                .Property(e => e.remark)
                .IsUnicode(false);

            modelBuilder.Entity<user>()
                .Property(e => e.username)
                .IsUnicode(false);

            modelBuilder.Entity<user>()
                .Property(e => e.password)
                .IsUnicode(false);

            modelBuilder.Entity<user>()
                .Property(e => e.nickname)
                .IsUnicode(false);

            modelBuilder.Entity<user>()
                .Property(e => e.userImage)
                .IsUnicode(false);

            modelBuilder.Entity<user>()
                .Property(e => e.phone)
                .IsUnicode(false);

            modelBuilder.Entity<user>()
                .Property(e => e.email)
                .IsUnicode(false);

            modelBuilder.Entity<version>()
                .Property(e => e.title)
                .IsUnicode(false);

            modelBuilder.Entity<version>()
                .Property(e => e.content)
                .IsUnicode(false);

            modelBuilder.Entity<versionitem>()
                .Property(e => e.title)
                .IsUnicode(false);

            modelBuilder.Entity<versionitem>()
                .Property(e => e.content)
                .IsUnicode(false);
        }
    }
}
