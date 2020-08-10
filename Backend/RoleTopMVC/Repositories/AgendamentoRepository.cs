using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using RoleTOP_MVC.Database;
using RoleTOP_MVC.Enums;
using RoleTOP_MVC.Models;

namespace RoleTOP_MVC.Repositories {
    public class AgendamentoRepository : BaseRepository {
        private const string PATH = "Database/Agendamento.csv";
        SqlCommand cmd = new SqlCommand ();
        ConexaoSQL conn = new ConexaoSQL ();
        public AgendamentoRepository () {
            if (!File.Exists (PATH)) {
                File.Create (PATH).Close ();
            }
        }
        public ulong ObterNextID () {
            var numPedidos = File.ReadAllLines (PATH).Length;
            ulong ID = (ulong) numPedidos++;
            return ID;
        }
        public bool Inserir (Agendamento agendamento) {
            try {
                cmd.CommandText = PrepararRegistroSQL (agendamento);

                cmd.Connection = conn.ConectarSQL ();
                cmd.ExecuteNonQuery ();
                conn.DesconectarSQL ();
                return true;
            } catch (IOException e) {
                System.Console.WriteLine (e.StackTrace);
                return false;
            }
        }
        public List<Agendamento> ObterTodosPorCliente (string emailCliente) {
            cmd.CommandText = $"select * from tb_Agendamentos where Email = '{emailCliente}'";
            List<Agendamento> agendamentosCliente = new List<Agendamento> ();
            cmd.Connection = conn.ConectarSQL ();
            SqlDataReader sqr = cmd.ExecuteReader ();
            if (sqr.HasRows) {
                while (sqr.Read ()) {
                    Cliente c = new Cliente(){
                        Nome = sqr["Nome"].ToString (),
                        Email = sqr["Email"].ToString (),
                        CEP = sqr["Cep"].ToString (),
                        CPF = sqr["Cpf"].ToString (),
                        Tel = sqr["Telefone"].ToString (),
                    };
                    Agendamento a = new Agendamento(){
                        ID = Convert.ToUInt32(sqr["id"]),
                        Status = Convert.ToUInt32(sqr["Evento_Status"]),
                        Cliente = c,
                        NomeEvento = sqr["Nome_Evento"].ToString(),
                        TipoEvento = sqr["Tipo_Evento"].ToString(),
                        Privacidade = sqr["Privacidade"].ToString(),
                        QtdConvidados = sqr["Qtd_Convidados"].ToString(),
                        DataDoEvento = Convert.ToDateTime(sqr["Data_Evento"]),
                        DataDoAgendamento = sqr["Data_Agendamento"].ToString(),
                        DescricaoEvento = sqr["Descricao_Evento"].ToString(),
                        bannerURL = sqr["Banner_Url"].ToString(),
                        SvcAdicionais = sqr["Servicos_Adicionais"].ToString(),
                        FormaPagamento = sqr["Forma_Pagamento"].ToString(),
                        PrecoTotal = Convert.ToDouble(sqr["Preco_Total"])
                    };
                    agendamentosCliente.Add(a);
                }
                conn.DesconectarSQL ();
                return agendamentosCliente;
            }
            conn.DesconectarSQL ();
            return agendamentosCliente;
        }
        public bool Atualizar (Agendamento a) {
            try
            {
                cmd.CommandText = $"update tb_Agendamentos set Evento_Status = '{a.Status}',Nome = '{a.Cliente.Nome}',Email = '{a.Cliente.Email}',Cep = '{a.Cliente.CEP}',Cpf = '{a.Cliente.CPF}',Telefone = '{a.Cliente.Tel}',Nome_Evento = '{a.NomeEvento}',Tipo_Evento = '{a.TipoEvento}',Privacidade = '{a.Privacidade}',Qtd_Convidados = '{a.QtdConvidados}',Data_Evento = '{a.DataDoEvento}',Data_Agendamento = '{a.DataDoAgendamento}',Descricao_Evento = '{a.DescricaoEvento}',Banner_Url = '{a.bannerURL}',Servicos_Adicionais = '{a.SvcAdicionais}',Forma_Pagamento = '{a.FormaPagamento}',Preco_Total = '{a.PrecoTotal}' where id = {a.ID}";
                
                cmd.Connection = conn.ConectarSQL();
                cmd.ExecuteNonQuery();
                conn.DesconectarSQL();
                return true;
            }
            catch (SqlException e)
            {
                System.Console.WriteLine(e.StackTrace);
                return false;
            }
        }
        public Agendamento ObterPor (ulong id) {
            cmd.CommandText = $"select * from tb_Agendamentos where id = '{id}'";

            cmd.Connection = conn.ConectarSQL ();
            SqlDataReader sqr = cmd.ExecuteReader ();
            while (sqr.Read ()) {
                Cliente c = new Cliente(){
                        Nome = sqr["Nome"].ToString (),
                        Email = sqr["Email"].ToString (),
                        CEP = sqr["Cep"].ToString (),
                        CPF = sqr["Cpf"].ToString (),
                        Tel = sqr["Telefone"].ToString (),
                    };
                Agendamento a = new Agendamento () {
                    ID = Convert.ToUInt32 (sqr["id"]),
                    Status = Convert.ToUInt32(sqr["Evento_Status"]),
                    Cliente = c,
                    NomeEvento = sqr["Nome_Evento"].ToString (),
                    TipoEvento = sqr["Tipo_Evento"].ToString (),
                    Privacidade = sqr["Privacidade"].ToString (),
                    QtdConvidados = sqr["Qtd_Convidados"].ToString (),
                    DataDoEvento = Convert.ToDateTime (sqr["Data_Evento"]),
                    DataDoAgendamento = sqr["Data_Agendamento"].ToString (),
                    DescricaoEvento = sqr["Descricao_Evento"].ToString (),
                    bannerURL = sqr["Banner_Url"].ToString (),
                    SvcAdicionais = sqr["Servicos_Adicionais"].ToString (),
                    FormaPagamento = sqr["Forma_Pagamento"].ToString (),
                    PrecoTotal = Convert.ToDouble (sqr["Preco_Total"])
                };
                conn.DesconectarSQL ();
                return a;
            }
            conn.DesconectarSQL ();
            return null;
        }
        public List<Agendamento> ObterPorStatusAprovado () {
            var lista = ObterTodos ();
            List<Agendamento> aprovados = new List<Agendamento> ();
            foreach (var item in lista) {
                if (item.Status.Equals ((uint) StatusAgendamentoEnum.APROVADO) && item.Privacidade.Equals (PrivacidadeEnum.PUBLICO.ToString ())) {
                    aprovados.Add (item);
                }
            }
            return aprovados;
        }
        public List<Agendamento> ObterTodos () {
            cmd.CommandText = $"select * from tb_Agendamentos";
            List<Agendamento> agendamentos = new List<Agendamento> ();
            cmd.Connection = conn.ConectarSQL ();
            SqlDataReader sqr = cmd.ExecuteReader ();
            if (sqr.HasRows) {
                while (sqr.Read ()) {
                    Cliente c = new Cliente(){
                        Nome = sqr["Nome"].ToString (),
                        Email = sqr["Email"].ToString (),
                        CEP = sqr["Cep"].ToString (),
                        CPF = sqr["Cpf"].ToString (),
                        Tel = sqr["Telefone"].ToString (),
                    };
                    Agendamento a = new Agendamento(){
                        ID = Convert.ToUInt32(sqr["id"]),
                        Cliente = c,
                        Status = Convert.ToUInt32(sqr["Evento_Status"]),
                        NomeEvento = sqr["Nome_Evento"].ToString(),
                        TipoEvento = sqr["Tipo_Evento"].ToString(),
                        Privacidade = sqr["Privacidade"].ToString(),
                        QtdConvidados = sqr["Qtd_Convidados"].ToString(),
                        DataDoEvento = Convert.ToDateTime(sqr["Data_Evento"]),
                        DataDoAgendamento = sqr["Data_Agendamento"].ToString(),
                        DescricaoEvento = sqr["Descricao_Evento"].ToString(),
                        bannerURL = sqr["Banner_Url"].ToString(),
                        SvcAdicionais = sqr["Servicos_Adicionais"].ToString(),
                        FormaPagamento = sqr["Forma_Pagamento"].ToString(),
                        PrecoTotal = Convert.ToDouble(sqr["Preco_Total"])
                    };
                    agendamentos.Add(a);
                }
                conn.DesconectarSQL ();
                return agendamentos;
            }
            conn.DesconectarSQL ();
            return agendamentos;
        }
        private string PrepararRegistroSQL (Agendamento a) {
            Cliente c = a.Cliente;
            return $"INSERT INTO tb_Agendamentos (Evento_Status,Nome,Email,Cep,Cpf,Telefone,Nome_Evento,Tipo_Evento,Privacidade,Qtd_Convidados,Data_Evento,Data_Agendamento,Descricao_Evento,Banner_Url,Servicos_Adicionais,Forma_Pagamento,Preco_Total) VALUES ('{a.Status}','{c.Nome}','{c.Email}','{c.CEP}','{c.CPF}','{c.Tel}','{a.NomeEvento}','{a.TipoEvento}','{a.Privacidade}','{a.QtdConvidados}','{a.DataDoEvento}','{a.DataDoAgendamento}','{a.DescricaoEvento}','{a.bannerURL}','{a.SvcAdicionais}','{a.FormaPagamento}','{a.PrecoTotal}')";
        }
    }
}