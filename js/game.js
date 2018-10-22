let _BOTAO = {
    x: 350,
    y: 200,
    largura: 80,
    altura: 80,
    cor: "black",
    intensidade: 10
};

// labels
const larguraCanvas = 750;
const alturaCanvas = 500;
let canvas, contexto;
let coordenadas, intensidade;
let largura, altura;
let pt = 0;

// Taxa de atualização 60fps
const frame = 1000 / 60;

// Se for stop for true ele interrompe o loop
let stop;

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

    limparTela();

    let botoes = [
        { cor: "green", ativo: false },
        { cor: "red", ativo: true },
        { cor: "blue", ativo: true },
        { cor: "red", ativo: true },
        { cor: "yellow", ativo: true },
        { cor: "#808080", ativo: true }
    ];

    botoes = botoes.map(preencherRetangulo);

    setTimeout(loop, 100, botoes);
}

loop = botoes => {
    atualizarTexto();
    limparTela();
    desenhar(botoes);
    desenhar([_BOTAO]);
    const verificados = verificar(botoes);

    if (verificados == null)
        finalizar();
    else
        setTimeout(loop, frame, verificados);
};

preencherRetangulo = r => {
    r.largura = 35 + Math.floor(Math.random() * 115);
    r.altura = 35 + Math.floor(Math.random() * 115);
    r.x = 5 + Math.floor(Math.random() * (larguraCanvas - r.largura - 10));
    r.y = 5 + Math.floor(Math.random() * (alturaCanvas - r.altura - 10));
    return r;
}

verificar = botoes => {
    const verificados = botoes.map(comparar);
    const falsos = verificados.filter(v => v.ativo == false);
    return (falsos.length == 0) ? null : verificados;
}

comparar = b => {
    if (_BOTAO.x === b.x && _BOTAO.y === b.y &&
        _BOTAO.largura === b.largura && _BOTAO.altura === b.altura) {
        return { ...b, ativo: true, cor: 'white' };
    }
    return b;
}

// side effect
desenhar = botoes => {
    botoes.forEach(b => {
        contexto.strokeStyle = b.cor;
        contexto.strokeRect(b.x, b.y, b.largura, b.altura);
    })
}

// side effect
atualizarTexto = () => {
    coordenadas.innerHTML = "Direção : (" + _BOTAO.x + ", " + _BOTAO.y + ")";
    largura.innerHTML = _BOTAO.largura;
    altura.innerHTML = _BOTAO.altura;
    intensidade.innerHTML = _BOTAO.intensidade;
}

// side effect
limparTela = () => {
    contexto.clearRect(0, 0, larguraCanvas, alturaCanvas);
}

// side effect
finalizar = () => {
    stop = true;
    alert("Fim de jogo !!!");
    limparTela();
    contexto.font = "bold 18px sans-serif";
    contexto.fillText("Fim de jogo, seu record foi : " + pt + " pontos", 130, 130);
}

aumentarIntensidade = valor => {
    _BOTAO.intensidade = _BOTAO.intensidade + valor;
}

diminuirIntensidade = valor => {
    if (!(_BOTAO.intensidade - 1 < 1)) {
        _BOTAO.intensidade = _BOTAO.intensidade - valor;
    }
}

moverDireita = () => {
    // Limite parede da direita
    if ((_BOTAO.x + _BOTAO.intensidade + _BOTAO.largura) > larguraCanvas) {
        _BOTAO.x = larguraCanvas - _BOTAO.largura - 1;
    } else {
        _BOTAO.x = _BOTAO.x + _BOTAO.intensidade;
    }
}

moverEsquerda = () => {
    // Limite parede da esquerda
    if ((_BOTAO.x - _BOTAO.intensidade) < 1) {
        _BOTAO.x = 2;
    } else {
        _BOTAO.x = _BOTAO.x - _BOTAO.intensidade;
    }
}

moverCima = () => {
    // Limite parede de cima
    if ((_BOTAO.y - _BOTAO.intensidade) < 1) {
        _BOTAO.y = 2;
    } else {
        _BOTAO.y = _BOTAO.y - _BOTAO.intensidade;
    }
}

moverBaixo = () => {
    // Limite parede de baixo
    if ((_BOTAO.y + _BOTAO.intensidade + _BOTAO.altura) > alturaCanvas) {
        _BOTAO.y = alturaCanvas - _BOTAO.altura - 1;
    } else {
        _BOTAO.y = _BOTAO.y + _BOTAO.intensidade;
    }
}

/*
 * Não aumentar até passar do limite de baixo e maior que 200px;
 * Valor é o valor a aumentar/diminuir
 */
aumentarAltura = valor => {
    if ((_BOTAO.y + _BOTAO.altura + 1) > alturaCanvas - 1 ||
        (_BOTAO.altura + 1) > 200) {
        _BOTAO.altura = 200;
    } else {
        _BOTAO.altura = _BOTAO.altura + valor;
    }
}

// Altura minima : 20px;
diminuirAltura = valor => {
    if (_BOTAO.altura - valor < 20) {
        _BOTAO.altura = 20;
    } else {
        _BOTAO.altura = _BOTAO.altura - valor;
    }
}

/*
 * Não aumentar até passar do limite da direita e maior que 200px;
 */
aumentarLargura = valor => {
    if ((_BOTAO.x + _BOTAO.largura + valor) > larguraCanvas - 1 ||
        (_BOTAO.largura + 1) > 200) {
        _BOTAO.largura = 200;
    } else {
        _BOTAO.largura = _BOTAO.largura + valor;
    }
}

// Largura minima : 20px;
diminuirLargura = valor => {
    if (_BOTAO.largura - valor < 20) {
        _BOTAO.largura = 20;
    } else {
        _BOTAO.largura = _BOTAO.largura - valor;
    }
}