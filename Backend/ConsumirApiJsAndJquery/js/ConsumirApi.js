$("#cep").focusout(function(){
    var cep = $("#cep").val();
    cep = cep.replace("-","");
    var urlString = "https://viacep.com.br/ws/" + cep + "/json/";

    $.ajax({
        url : urlString,
        type : "get",
        dataType : "json",
        success : function(data){
            $("#logradouro").val(data.logradouro);
            $("#bairro").val(data.bairro);
            $("#localidade").val(data.localidade);
            $("#uf").val(data.uf);
            $("#complemento").val(data.complemento);
        },
        error : function(erro){}
    })
});