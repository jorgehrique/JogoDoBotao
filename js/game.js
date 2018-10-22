let rs = [
    { cor: "green" },
    { cor: "red" },
    { cor: "blue" },
    { cor: "red" },
    { cor: "yellow" },
    { cor: "#808080" }
]

let botao = {
    x: 350,
    y: 200,
    largura: 80,
    altura: 80,
    cor: "black",
    intensidade: 10
};

const larguraCanvas = 750;
const alturaCanvas = 500;
let canvas, contexto;
let coordenadas, intensidade;
let largura, altura;
let pt = 0;

window.onload = () => {
    canvas = document.getElementById("canvas");
    contexto = canvas.getContext("2d");

    // Texto no HTML
    coordenadas = document.getElementById("coordenadas");
    largura = document.getElementById("largura");
    altura = document.getElementById("altura");
    intensidade = document.getElementById("intensidade");
    
    // Adicionando eventos aos controles
    document.getElementById("iniciar").onclick = iniciar;
    document.getElementById("btncima").onclick = moverCima;
    document.getElementById("btnbaixo").onclick = moverBaixo;
    document.getElementById("btnesquerda").onclick = moverEsquerda;
    document.getElementById("btndireita").onclick = moverDireita;
};

iniciar = () => {
    document.getElementById("iniciar").value = "Reiniciar";

    rs = rs.map(r => {
        r.ativo = false
        return r
    })
    
    limparTela();

    rs.forEach(r => {
        preencherRetangulo(r);
        desenhar(r);
    })

    desenhar(botao);
    stop = false;
    setTimeout(loop, 100);
}

// Taxa de atualização 60fps
const frame = 1000 / 60;

// Se for stop for true ele interrompe o loop
let stop;

// game loop
loop = () => {
    atualizarTexto();
    redesenhar();
    pt++;
    verificar();
    if (!stop)
        setTimeout(loop, frame);
};

/*
 * Gera as coordenadas e dimensões do retangulo
 * 
 * @param {Retangulo} r
 */
preencherRetangulo = r => {
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
desenhar = r => {
    contexto.strokeStyle = r.cor;
    contexto.strokeRect(r.x, r.y, r.largura, r.altura);
}

// Atualiza a tela apagando e desenhando denovo
redesenhar = () => {
    limparTela();
    rs.forEach(desenhar)
    desenhar(botao);
}

// Atualiza o texto das labels
atualizarTexto = () => {
    coordenadas.innerHTML = "Direção : (" + botao.x + ", " + botao.y + ")";
    largura.innerHTML = botao.largura;
    altura.innerHTML = botao.altura;
    intensidade.innerHTML = botao.intensidade;
}

// limpa TODOS os retangulos da tela
limparTela = () => {
    contexto.clearRect(0, 0, larguraCanvas, alturaCanvas);
}

/*
 * Verifica se todos os quadrados foram encaixados e
 *   finaliza o jogo
 */
verificar = () => {
    rs.forEach(comparar)
    const ativo = rs.map(r => r.ativo)
    if (!ativo.includes(false)) {
        stop = true;
        alert("Fim de jogo !!!");
        limparTela();
        contexto.font = "bold 18px sans-serif";
        contexto.fillText("Fim de jogo, seu record foi : " + pt + " pontos", 130, 130);
    }
}

/*
 * Confere se o botão esta encaixado no quadrado.
 * OBS : +1 e -2 serve para o botão encaixar dentro 
 *       e mostrar a borda do quadrado
 * 
 * @param {Retangulo} r
 */
comparar = r => {
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

aumentarIntensidade = valor => {
    botao.intensidade = botao.intensidade + valor;
}

diminuirIntensidade = valor => {
    if (!(botao.intensidade - 1 < 1)) {
        botao.intensidade = botao.intensidade - valor;
    }
}

/*
 *  muda as coordenadas/dimensões e repinta o botão
 */
moverDireita = () => {
    // Limite parede da direita
    if ((botao.x + botao.intensidade + botao.largura) > larguraCanvas) {
        botao.x = larguraCanvas - botao.largura - 1;
    } else {
        botao.x = botao.x + botao.intensidade;
    }
}

moverEsquerda = () => {
    // Limite parede da esquerda
    if ((botao.x - botao.intensidade) < 1) {
        botao.x = 2;
    } else {
        botao.x = botao.x - botao.intensidade;
    }
}

moverCima = () => {
    // Limite parede de cima
    if ((botao.y - botao.intensidade) < 1) {
        botao.y = 2;
    } else {
        botao.y = botao.y - botao.intensidade;
    }
}

moverBaixo = () => {
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
aumentarAltura = valor => {
    if ((botao.y + botao.altura + 1) > alturaCanvas - 1 ||
        (botao.altura + 1) > 200) {
        botao.altura = 200;
    } else {
        botao.altura = botao.altura + valor;
    }
}

// Altura minima : 20px;
diminuirAltura = valor => {
    if (botao.altura - valor < 20) {
        botao.altura = 20;
    } else {
        botao.altura = botao.altura - valor;
    }
}

/*
 * Não aumentar até passar do limite da direita e maior que 200px;
 */
aumentarLargura = valor => {
    if ((botao.x + botao.largura + valor) > larguraCanvas - 1 ||
        (botao.largura + 1) > 200) {
        botao.largura = 200;
    } else {
        botao.largura = botao.largura + valor;
    }
}

// Largura minima : 20px;
diminuirLargura = valor => {
    if (botao.largura - valor < 20) {
        botao.largura = 20;
    } else {
        botao.largura = botao.largura - valor;
    }
}