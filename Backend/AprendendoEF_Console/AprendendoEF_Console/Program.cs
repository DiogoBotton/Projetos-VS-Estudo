using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;

namespace AprendendoEF_Console
{
    class Program
    {
        static void Main(string[] args)
        {
        }
    }

    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
    }

    //Mapeamento ("Dizer" os tipos de campos que a tabela irá ter, etc)

    public class UsuarioMap : EntityTypeConfiguration<Usuario>
    {
        public UsuarioMap()
        {
            //ToTable(""); Muda o nome da tabela
            HasKey(x => x.Id); //Dizendo qual propriedade vai ser o ID
            Property(x => x.Nome).IsRequired().HasMaxLength(150).HasColumnType("varchar");
            Property(x => x.Email).IsRequired().HasMaxLength(150).HasColumnType("varchar");
            Property(x => x.Senha).IsRequired().HasMaxLength(60).HasColumnType("varchar");
            
            //não nulo, máximo caracteres, tipo da coluna.
        }
    }
    //Além de criar as tabelas, cria também o próprio DATA BASE
    public class DataContext : DbContext
    {
        public DataContext() : base("Data Source=.\\SQLEXPRESS;Initial Catalog=dbTesteEF;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False")
        { }

        public DbSet<Usuario> Usuarios { get; set; }

        //Sobrescrever método para FUNCIONAR o MAPEAMENTO criado acima (UsuarioMap)
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //Nova instância da classe mapeadora
            modelBuilder.Configurations.Add(new UsuarioMap());
        }
        //OBS: Sempre após mudanças, utilizar codigos add-migration e update-database
    }
}
