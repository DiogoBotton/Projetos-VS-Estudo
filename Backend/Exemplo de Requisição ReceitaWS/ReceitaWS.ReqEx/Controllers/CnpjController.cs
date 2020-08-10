using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReceitaWS.ReqEx.ViewModels;

namespace ReceitaWS.ReqEx.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class CnpjController : ControllerBase
    {
        public HttpClient client { get; set; }

        public CnpjController()
        {
            this.client = new HttpClient();
        }

        [HttpGet("receita/cnpj/{cnpj}")]
        public async Task<IActionResult> GetReceitaCnpj(string cnpj)
        {
            string uri = $"https://www.receitaws.com.br/v1/cnpj/{cnpj}";

            HttpResponseMessage response = null;

            try
            {
                response = await client.GetAsync(uri);

                ReceitaWsJsonResponseViewModel receitaVM = null;

                if (response.IsSuccessStatusCode)
                {
                    receitaVM = await response.Content.ReadAsAsync<ReceitaWsJsonResponseViewModel>();
                }

                if (receitaVM.Status != "ERROR")
                    return StatusCode(200, receitaVM);
                else
                    return StatusCode(404, "CPF Inválido ou não registrado no banco de dados");
            }
            catch (Exception ex)
            {
                return BadRequest($"BadRequest: [{ex}]");
            }
        }

        [HttpGet("teste")]
        public IActionResult GetTeste()
        {
            var hora = DateTime.Now;

            return StatusCode(200, hora);
        }
    }
}
