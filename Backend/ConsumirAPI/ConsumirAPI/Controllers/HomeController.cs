using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Refit;
using System.Threading.Tasks;
using ConsumirAPI.Models;
using ConsumirAPI.ViewModels;
using System;

namespace ConsumirAPI.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index(HomeViewModel hvm)
        {
            return View(hvm);
        }

        public IActionResult GetCep(IFormCollection form)
        {
            HomeViewModel hvm = new HomeViewModel();
            var cep = form["cep"];
            try
            {
            var endereco = ConsultarCEP(cep);
            hvm.Cep = endereco.Result.Cep;
            hvm.Bairro = endereco.Result.Bairro;
            hvm.Complemento = endereco.Result.Complemento;
            hvm.Gia = endereco.Result.Gia;
            hvm.Ibge = endereco.Result.Ibge;
            hvm.Localidade = endereco.Result.Localidade;
            hvm.Logradouro = endereco.Result.Logradouro;
            hvm.UF = endereco.Result.UF;
            hvm.Unidade = endereco.Result.Unidade;
                hvm.Verificacao = true;
            return View("Index", hvm);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                hvm.Verificacao = false;
                return View("Index", hvm);
            }
        }
        private async Task<CepResponse> ConsultarCEP(string cep)
        {
            var cepClient = RestService.For<ICepAPIService>("http://viacep.com.br");
            var endereco = await cepClient.GetAddresAsync(cep);

            return endereco;
        }
    }
}
