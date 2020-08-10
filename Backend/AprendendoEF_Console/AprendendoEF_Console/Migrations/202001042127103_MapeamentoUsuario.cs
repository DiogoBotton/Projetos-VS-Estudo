namespace AprendendoEF_Console.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MapeamentoUsuario : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Usuarios", "Nome", c => c.String(nullable: false, maxLength: 150, unicode: false));
            AlterColumn("dbo.Usuarios", "Email", c => c.String(nullable: false, maxLength: 150, unicode: false));
            AlterColumn("dbo.Usuarios", "Senha", c => c.String(nullable: false, maxLength: 60, unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Usuarios", "Senha", c => c.String());
            AlterColumn("dbo.Usuarios", "Email", c => c.String());
            AlterColumn("dbo.Usuarios", "Nome", c => c.String());
        }
    }
}
