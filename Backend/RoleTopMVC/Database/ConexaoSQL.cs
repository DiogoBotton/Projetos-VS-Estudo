using System.Data.SqlClient;

namespace RoleTOP_MVC.Database
{
    public class ConexaoSQL
    {
        SqlConnection sqlConn = new SqlConnection();
        public const string ConnectionString = "Data Source=.\\SQLEXPRESS;Initial Catalog=dbRoleTOP;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        
        public ConexaoSQL(){
            sqlConn.ConnectionString = ConnectionString;
        }
        public SqlConnection ConectarSQL(){
            //Se o estado da conexão estiver fechada, conectar
            if(sqlConn.State == System.Data.ConnectionState.Closed){ 
                sqlConn.Open();
            }
            return sqlConn;
        }

        public void DesconectarSQL(){
            if(sqlConn.State == System.Data.ConnectionState.Open){
                sqlConn.Close();
            }
        }
    }
}