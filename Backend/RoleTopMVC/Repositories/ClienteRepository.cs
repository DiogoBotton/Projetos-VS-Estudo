using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using RoleTOP_MVC.Database;
using RoleTOP_MVC.Enums;
using RoleTOP_MVC.Models;

namespace RoleTOP_MVC.Repositories {
    public class ClienteRepository : BaseRepository {
        ConexaoSQL conn = new ConexaoSQL ();
        SqlCommand cmd = new SqlCommand (); //Classe específica para escrever comandos
        public const string PATH = "Database/Cliente.csv"; //PATH: Caminho (diretório do arquivo).

        public ClienteRepository () {
            if (!File.Exists (PATH)) {
                File.Create (PATH).Close ();
                Cliente c = new Cliente () {
                    TipoUsuario = (uint) TipoClienteEnum.ADMINISTRADOR,
                    Nome = "Admin",
                    Email = "admin@email.com",
                    Senha = "admin",
                };
                Inserir (c);
            }
        }

        public bool Inserir (Cliente cliente) {
            try {
                // string[] dadosCliente = { PrepararRegistroCSV (c) };
                // File.AppendAllLines (PATH, dadosCliente)
                //$"INSERT INTO tb_Clientes (Tipo_Cliente,Nome,Email,Senha,Cep,Cpf,Telefone) VALUES (@tipo_usuaro,@nome,@email,@senha,@cep,@cpf,@tel)";

                cmd.CommandText = PrepararRegistroSQL (cliente);

                cmd.Connection = conn.ConectarSQL ();
                cmd.ExecuteNonQuery ();
                conn.DesconectarSQL ();
                return true;
            } catch (SqlException e) {
                System.Console.WriteLine (e.StackTrace);
                return false;
            }
        }

        public bool Remover (string email) {
            try {
                cmd.CommandText = $"delete from tb_Clientes where Email = '{email}'";
                cmd.Connection = conn.ConectarSQL ();
                cmd.ExecuteNonQuery ();
                conn.DesconectarSQL ();
                return true;
            } catch (SqlException e) {
                System.Console.WriteLine (e.StackTrace);
                return false;
            }
        }
        public Cliente ObterPor (string email) {
            cmd.CommandText = $"select * from tb_Clientes where Email = '{email}'";

            cmd.Connection = conn.ConectarSQL ();
            SqlDataReader sqr = cmd.ExecuteReader ();
            while (sqr.Read ()) { //Há linhas? Execute(também com sqr.HasRow) NECESSÁRIO
                Cliente c = new Cliente () {
                    TipoUsuario = System.Convert.ToUInt32 (sqr["Tipo_Cliente"]),
                    Nome = sqr["Nome"].ToString (),
                    Email = sqr["Email"].ToString (),
                    Senha = sqr["Senha"].ToString (),
                    CEP = sqr["Cep"].ToString (),
                    CPF = sqr["Cpf"].ToString (),
                    Tel = sqr["Telefone"].ToString ()
                };
                sqr.Close ();
                conn.DesconectarSQL ();
                return c;
            }
            conn.DesconectarSQL ();
            return null;
        }
        private string PrepararRegistroSQL (Cliente c) {
            return $"INSERT INTO tb_Clientes (Tipo_Cliente,Nome,Email,Senha,Cep,Cpf,Telefone) VALUES ('{c.TipoUsuario}','{c.Nome}','{c.Email}','{c.Senha}','{c.CEP}','{c.CPF}','{c.Tel}')";
        }
    }
}