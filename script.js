var palavra = "";
var quantidadeDeErros = 0;
var quantidadeDeAcertos = 0;
var jogoIniciado = false;
var quantidadeMaximaErros = 8;

function IniciarJogo() {
    palavra = escolhePalavra();
    desenhaQuantidadeLetras(palavra);
    jogoIniciado = true;
}

document.querySelector('body').addEventListener('keydown', function (event) {
    if (jogoIniciado) {
        var teclaPressionada = event.keyCode;
        if (verificaLetraDigitadaEstaNoIntervalo(teclaPressionada)) {
            var letra = codParaLetra(teclaPressionada);
            if (letraEstaNaPalavra(letra)) {
                var indices = obtemIndiceDaLetra(letra);
                adicionaOValorNoInputAcertos(indices, letra);
                verificaFimJogo();

            } else {
                quantidadeDeErros += 1;
                if (verificaQuantidadeErros()) {
                    limpaInputErroAcertos();
                    trocaParaImagemInicial();
                    limpaVariaveis();
                    return;
                }
                adicionaOValorNoInputErros(quantidadeDeErros, letra);
                desenhaBonecoErro(quantidadeDeErros);
            }
        }
    } else {
        alert("Jogo não iniciado!!")
    }

});


function desenhaBonecoErro(erros) {
    var campoHtmlForca = document.querySelector("#forca");
    var nomeImagem = "erro-" + erros;
    campoHtmlForca.innerHTML = '<img src="./novo-boneco-1/' + nomeImagem + '.png" alt="Forca">';
}

function escolhePalavra() {
    var escolherPalavra = "";
    var palavras = [];

    //obtendo o valor do select
    var select = document.getElementById('opcoes');
    var valueSelect = select.options[select.selectedIndex].value;
    console.log(valueSelect);

    if (valueSelect != -1) {

        if (valueSelect == 1) {
            palavras = frutas;

        }
        if (valueSelect == 2) {
            palavras = animais;
        }
        if (valueSelect == 3) {
            palavras = alimentos;
        }
        if (valueSelect == 4) {
            palavras = cores;
        }
        if (valueSelect == 5) {
            palavras = objetos;
        }
        if (valueSelect == 6) {
            palavras = profissoes;
        }

        var tamanhoListaPalavras = palavras.length;
        var posicaoAleatoria = Math.floor(Math.random() * tamanhoListaPalavras);
        escolherPalavra = palavras[posicaoAleatoria];
        console.log(escolherPalavra);
    } else {
        alert("Selecione um tema!!");
    }

    return escolherPalavra;
}

function desenhaQuantidadeLetras(palavra) {
    var campoHtmlLetras = document.querySelector(".letras");
    var montarLetrasTela = '<legend>Palavra</legend>';
    for (let index = 0; index < palavra.length; index++) {
        montarLetrasTela += '<input id="' + index + '"type="text" maxlength="1" value="" disabled>'
    }
    campoHtmlLetras.innerHTML = montarLetrasTela;
}

function verificaLetraDigitadaEstaNoIntervalo(teclaPressionada) {
    var codLetraA = 65;
    var codLetraZ = 90;
    return teclaPressionada >= codLetraA && teclaPressionada <= codLetraZ;
}

function codParaLetra(code) {
    return String.fromCharCode(code);
}

function letraEstaNaPalavra(letra) {
    var index = palavra.indexOf(letra.toLocaleLowerCase());
    return index != -1;
}

function obtemIndiceDaLetra(letra) {
    var listaIndice = [];
    var palavraTransformadaArray = palavra.split('');
    for (let i = 0; i < palavraTransformadaArray.length; i++) {
        var letraPosicaoI = palavraTransformadaArray[i];
        if (letraPosicaoI == letra.toLocaleLowerCase()) {
            listaIndice.push(i);
        }
    }
    return listaIndice;
}

function adicionaOValorNoInputAcertos(indices, letra) {
    if (indices.length >= 1) {
        for (let index = 0; index < indices.length; index++) {
            var id = indices[index];
            var input = document.getElementById(id);
            input.value = letra;
            quantidadeDeAcertos++;
        }
    }
}

function adicionaOValorNoInputErros(id, letra) {
    var input = document.getElementById("erro" + id);
    input.value = letra;
}

function verificaFimJogo() {
    if (quantidadeDeAcertos == palavra.length) {
        alert("Parabéns, você venceu!! A palavra era: " + palavra.toLocaleUpperCase());
        limpaInputErroAcertos();
        trocaParaImagemInicial();
        limpaVariaveis();
    }
}

function limpaInputErroAcertos() {
    //acertos
    var campoHtmlLetras = document.querySelector(".letras");
    campoHtmlLetras.innerHTML = "<legend>Palavra</legend>";

    //erros
    for (let i = 1; i <= 8; i++) {
        adicionaOValorNoInputErros(i, "");
    }

}

function trocaParaImagemInicial() {
    var campoHtmlForca = document.querySelector("#forca")
    campoHtmlForca.innerHTML = '<img src="./novo-boneco-1/forca-sem-boneco.png" alt="Forca">';
}

function limpaVariaveis() {
    quantidadeDeErros = 0;
    quantidadeDeAcertos = 0;
    jogoIniciado = false;
}

function verificaQuantidadeErros() {
    if (quantidadeDeErros > quantidadeMaximaErros) {
        alert("Você Perdeu!! A palavra era: " + palavra.toLocaleUpperCase());
        return true;
    }
    return false;
}