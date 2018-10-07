// Retangulos :
const r1 = {
    cor: "green"
};
const r2 = {
    cor: "red"
};
const r3 = {
    cor: "blue"
};
const r4 = {
    cor: "yellow"
};
const r5 = {
    cor: "#808080"
};
// fim dos retangulos

// "botão"
// é o retangulo principal movido pelo jogador
let botao = {
    x: 350,
    y: 200,
    largura: 80,
    altura: 80,
    cor: "black",
    intensidade: 10
};

// Dimensão do Canvas no html
const larguraCanvas = 750;
const alturaCanvas = 500;

// Canvas
let canvas;

// Contexto do Canvas
let contexto;

// Texto de coordenadas e dimensão
let coordenadas;
let largura;
let altura;
let intensidade;

// Usado para calcular pontuação
let pt = 0;

window.onload = function () {

    canvas = document.getElementById("canvas");
    contexto = canvas.getContext("2d");

    // Texto no HTML
    coordenadas = document.getElementById("coordenadas");
    largura = document.getElementById("largura");
    altura = document.getElementById("altura");
    intensidade = document.getElementById("intensidade");

    // Adicionando eventos aos controles
    document.getElementById("iniciar").onclick = iniciar;

    // Eventos adicionados no html
    /*
    document.getElementById("diminuirInt").onclick =  diminuirIntensidade;
    document.getElementById("aumentarInt").onclick =  aumentarIntensidade; 

    document.getElementById("diminuirLarg").onclick =  diminuirLargura;
    document.getElementById("aumentarLarg").onclick =  aumentarLargura;
    document.getElementById("diminuirAlt").onclick =  diminuirAltura;
    document.getElementById("aumentarAlt").onclick = aumentarAltura;
    */

    document.getElementById("btncima").onclick = moverCima;
    document.getElementById("btnbaixo").onclick = moverBaixo;
    document.getElementById("btnesquerda").onclick = moverEsquerda;
    document.getElementById("btndireita").onclick = moverDireita;
};

function iniciar() {

    document.getElementById("iniciar").value = "Reiniciar";

    r1.ativo = false;
    r2.ativo = false;
    r3.ativo = false;
    r4.ativo = false;
    r5.ativo = false;

    limparTela();

    preencherRetangulo(r1);
    desenhar(r1);

    preencherRetangulo(r2);
    desenhar(r2);

    preencherRetangulo(r3);
    desenhar(r3);

    preencherRetangulo(r4);
    desenhar(r4);

    preencherRetangulo(r5);
    desenhar(r5);

    desenhar(botao);

    stop = false;
    setTimeout(loop, 100);
}

// Taxa de atualização 60fps
const frame = 1000 / 60;

// Se for stop for true ele interrompe o loop
let stop;

// game loop
const loop = function () {
    atualizarTexto();
    redesenhar();
    pt++;
    verificar();

    if (stop === false) {
        setTimeout(loop, frame);
    }
};

/*
 * Gera as coordenadas e dimensões do retangulo
 * 
 * @param {Retangulo} r
 */
function preencherRetangulo(r) {
    r.largura = 35 + Math.floor(Math.random() * 115);
    r.altura = 35 + Math.floor(Math.random() * 115);
    r.x = 5 + Math.floor(Math.random() * (larguraCanvas - r.largura - 10));
    r.y = 5 + Math.floor(Math.random() * (alturaCanvas - r.altura - 10));
}

/*
 * Desenha o retangulo do parametro
 * 
 * @param {Retangulo} r
 */
function desenhar(r) {
    contexto.strokeStyle = r.cor;
    contexto.strokeRect(r.x, r.y, r.largura, r.altura);
}

// Atualiza a tela apagando e desenhando denovo
function redesenhar() {
    limparTela();

    desenhar(r1);
    desenhar(r2);
    desenhar(r3);
    desenhar(r4);
    desenhar(r5);
    desenhar(botao);
}

// Atualiza o texto das labels
function atualizarTexto() {
    coordenadas.innerHTML = "Direção : (" + botao.x + ", " + botao.y + ")";
    largura.innerHTML = botao.largura;
    altura.innerHTML = botao.altura;
    intensidade.innerHTML = botao.intensidade;
}

// limpa TODOS os retangulos da tela
function limparTela() {
    contexto.clearRect(0, 0, larguraCanvas, alturaCanvas);
}

/*
 * Verifica se todos os quadrados foram encaixados e
 *   finaliza o jogo
 */
function verificar() {
    comparar(r1);
    comparar(r2);
    comparar(r3);
    comparar(r4);
    comparar(r5);

    if (r1.ativo === true && r2.ativo === true &&
        r3.ativo === true && r4.ativo === true && r5.ativo === true) {

        stop = true;
        alert("Fim de jogo !!!");
        limparTela();
        contexto.font = "bold 18px sans-serif";
        contexto.fillText("Fim de jogo, seu tempo foi : " + pt + " segundos", 130, 130);
    }
}

/*
 * Confere se o botão esta encaixado no quadrado.
 * OBS : +1 e -2 serve para o botão encaixar dentro 
 *       e mostrar a borda do quadrado
 * 
 * @param {Retangulo} r
 */
function comparar(r) {
    if (botao.x === r.x &&
        botao.y === r.y &&
        botao.largura === r.largura &&
        botao.altura === r.altura) {
        r.ativo = true;
        r.cor = "white";
    }
}

/*
 * Aumenta e diminui a intensidade
 *
 *  Valor é o valor a aumentar/diminuir
 */

function aumentarIntensidade(valor) {
    botao.intensidade = botao.intensidade + valor;
}

function diminuirIntensidade(valor) {
    if (!(botao.intensidade - 1 < 1)) {
        botao.intensidade = botao.intensidade - valor;
    }
}

/*
 *  muda as coordenadas/dimensões e repinta o botão
 */
function moverDireita() {
    // Limite parede da direita
    if ((botao.x + botao.intensidade + botao.largura) > larguraCanvas) {
        botao.x = larguraCanvas - botao.largura - 1;

    } else {
        botao.x = botao.x + botao.intensidade;
    }
}

function moverEsquerda() {
    // Limite parede da esquerda
    if ((botao.x - botao.intensidade) < 1) {
        botao.x = 2;
    } else {
        botao.x = botao.x - botao.intensidade;
    }
}

function moverCima() {
    // Limite parede de cima
    if ((botao.y - botao.intensidade) < 1) {
        botao.y = 2;
    } else {
        botao.y = botao.y - botao.intensidade;
    }
}

function moverBaixo() {
    // Limite parede de baixo
    if ((botao.y + botao.intensidade + botao.altura) > alturaCanvas) {
        botao.y = alturaCanvas - botao.altura - 1;
    } else {
        botao.y = botao.y + botao.intensidade;
    }
}

/*
 * Não aumentar até passar do limite de baixo e maior que 200px;
 * Valor é o valor a aumentar/diminuir
 */
function aumentarAltura(valor) {
    if ((botao.y + botao.altura + 1) > alturaCanvas - 1 ||
        (botao.altura + 1) > 200) {
        botao.altura = 200;
    } else {
        botao.altura = botao.altura + valor;
    }
}

// Altura minima : 20px;
function diminuirAltura(valor) {
    if (botao.altura - valor < 20) {
        botao.altura = 20;
    } else {
        botao.altura = botao.altura - valor;
    }
}

/*
 * Não aumentar até passar do limite da direita e maior que 200px;
 */
function aumentarLargura(valor) {
    if ((botao.x + botao.largura + valor) > larguraCanvas - 1 ||
        (botao.largura + 1) > 200) {
        botao.largura = 200;
    } else {
        botao.largura = botao.largura + valor;
    }
}

// Largura minima : 20px;
function diminuirLargura(valor) {
    if (botao.largura - valor < 20) {
        botao.largura = 20;
    } else {
        botao.largura = botao.largura - valor;
    }
}