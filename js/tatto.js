
    jQuery(function ($) {
        $("#campoData").mask("99/99/9999");
		$("#telefone").mask("(99) 99999-9999");
		$("#cnpj").mask("99.999.999/9999-99");
        //$("#outrotelefone").mask("(99) 99999-9999");
        //$("#campoSenha").mask("***-****");
        $("#cpf").mask("999.999.999-99");
    });

    function showPreview(event) {
    if (event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("file-ip-1-preview");
        preview.src = src;
        preview.style.display = "block";
    }
}

    function ativarImput(value, texto) { 
        document.getElementById(texto).disabled = value;
    }

	function verificarCPF(cpf, usuario) {
	cpf = cpf.replace(/[^\d]+/g, '');    
	if (cpf == '') return false;
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 ||
		cpf == "00000000000" ||
		cpf == "11111111111" ||
		cpf == "22222222222" ||
		cpf == "33333333333" ||
		cpf == "44444444444" ||
		cpf == "55555555555" ||
		cpf == "66666666666" ||
		cpf == "77777777777" ||
		cpf == "88888888888" ||
		cpf == "99999999999")
		return false;
	// Valida 1o digito	
	add = 0;
	for (i = 0; i < 9; i++)
		add += parseInt(cpf.charAt(i)) * (10 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11)
		rev = 0;
	if (rev != parseInt(cpf.charAt(9)))
		return false;
	// Valida 2o digito	
	add = 0;
	for (i = 0; i < 10; i++)
		add += parseInt(cpf.charAt(i)) * (11 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11)
		rev = 0;
	if (rev != parseInt(cpf.charAt(10)))
		return false;
        if (consultarDados.consultarCpf(cpf, usuario) == true) { // Grava no Cpf sem IdCliente um novo IdCliente.
        return true;
    }
	return true;
}

    function validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

    function erroCpf(cpfCliente) { // apresenta erro na tela baseado na função verificarCPF(cpf) 
    alert("Esse Cpf: " + cpfCliente + " é invalido");
    document.getElementById('cpf').value = ("");
}

function erroCnpj(cnpjEstudio) { // apresenta erro na tela baseado na função verificarCPF(cpf) 
    alert("Esse Cnpj: " + cnpjEstudio + " é invalido");
    document.getElementById('cnpj').value = ("");
}

class ConsultarDados {

    consultarCpf(cpfCliente, usuario) {
        $.ajax({ // requisição AJAX com JavaScript e jQuery
            url: '/'+usuario+'/validarcpf',
            type: 'GET',
            data: { cpfCliente: cpfCliente },
            success: function (result) {
                if (result == "True") {
                    alert("Esse Cpf: " + cpfCliente + " Já está cadastrado no Sistema");
                    document.getElementById('cpf').value = (" ");
                }
                else if (result == "TrueFalse") {
                    alert("Seu Id já está atrelado a outro Cpf no Sistema");
                    document.getElementById('cpf').value = (" ");
                }
            }
        });
    }

    SetTipoCliente(tipeUser) {
        $.ajax({
            type: "POST",
            url: '/Home/pegarClienteAtual',
            data: { tipeUser: tipeUser}
        })
    }

    consultarEmail(emailCliente, usuario) {
        $.ajax({ // requisição AJAX com JavaScript e jQuery
            url: '/' + usuario +'/validaremail',
            type: 'GET',
            data: { emailCliente: emailCliente },
            success: function (result) {
                if (result == "True") {
                    alert("Esse Email: " + emailCliente + " Já está cadastrado no Sistema");
                    document.getElementById('email').value = (" ");
                }
            }
        });
    }


    consultarNomeFoto(nomeFoto, name) {
        $.ajax({ // requisição AJAX com JavaScript e jQuery
            url: '/' + name + '/validarnomefoto',
            type: 'GET',
            data: { nomeFoto: nomeFoto },
            success: function (result) {
                if (result == "True") {
                    alert("Esse Nome: " + nomeFoto + " Já está cadastrado no Sistema");
                    document.getElementById('ImageName').value = (" ");
                }
            }
        });
    }


}

var consultarDados = new ConsultarDados(); // Tem que instanciar para virar global