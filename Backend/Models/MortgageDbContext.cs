using Backend.Models.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class MortgageDbContext : DbContext
{
    public MortgageDbContext()
    {
    }

    public MortgageDbContext(DbContextOptions<MortgageDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CustomForm> CustomForms { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<FormDatum> FormData { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<GetEmployeeDTO> GetEmployeeDTO { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=TXCHD-PC-016\\SQLEXPRESS;Database=MortgageDB;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CustomForm>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CustomFo__3214EC0709822DCE");

            entity.Property(e => e.AdminId).HasColumnName("AdminID");
            entity.Property(e => e.EngFormName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FrenchFormName)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Admin).WithMany(p => p.CustomForms)
                .HasForeignKey(d => d.AdminId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__CustomFor__Admin__2645B050");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Customer__3214EC07014CE573");

            entity.HasIndex(e => e.UserId, "UQ__Customer__1788CC4DF10BB3E2").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Customer__A9D1053418A2A81E").IsUnique();

            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Emp).WithMany(p => p.Customers)
                .HasForeignKey(d => d.EmpId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Customers__EmpId__503BEA1C");

            entity.HasOne(d => d.User).WithOne(p => p.Customer)
                .HasForeignKey<Customer>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Customers__UserI__51300E55");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC07EA7B172F");

            entity.HasIndex(e => e.Email, "UQ__Employee__A9D10534420A93D5").IsUnique();

            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Employees)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Employees__UserI__5224328E");
        });

        modelBuilder.Entity<FormDatum>(entity =>
        {
            entity.HasKey(e => e.Entryid).HasName("PK__FormData__F57AD6DF778547C8");

            entity.Property(e => e.Answer)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Form).WithMany(p => p.FormData)
                .HasForeignKey(d => d.FormId)
                .HasConstraintName("FK__FormData__FormId__367C1819");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Question__3214EC075E928694");

            entity.Property(e => e.AnswerFormat)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EngQuestion).IsUnicode(false);
            entity.Property(e => e.FormId).HasColumnName("FormID");
            entity.Property(e => e.FrenchQuestion).IsUnicode(false);
            entity.Property(e => e.Options)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Form).WithMany(p => p.Questions)
                .HasForeignKey(d => d.FormId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Questions__FormI__29221CFB");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC076CAF944B");

            entity.HasIndex(e => e.Email, "UQ__Users__536C85E43D461860").IsUnique();

            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.Role).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
