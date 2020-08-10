using ConsumirAPI.Models;
using Refit;
using System;
using System.Threading.Tasks;

public interface ICepAPIService
{
    [Get("/ws/{cep}/json/")] // Rota informada pelo ViaCEP, irá receber um CEP por parametro.
    Task<CepResponse> GetAddresAsync(string cep);
}
