const Genius = {
  nomeDasCores: ["amarelo", "vermelho", "azul", "verde"],
  notas: [261.6, 293.7, 329.6, 392.0],

  sequencia: [],
  sequenciaDoJogador: [],
  gameOver: true,
  contagemDeRodadas: 0,
  limiteDeRodadas: 6,

  titulo: document.querySelector(".inicio h1"),
  botaoDePlay: document.querySelector(".inicio > button"),

  comecarJogo() {
    document.querySelector(".inicio").style.display = "none";
    document.querySelector(".jogo").style.display = "block";
    document.querySelector(".final").style.display = "none";

    this.contagemDeRodadas = 0;
    this.gameOver = false;
    this.sequencia = [];
    this.sequenciaDoJogador = [];
    this.habilitarBotoes();
    this.novaRodada();
  },

  novaRodada() {
    this.contagemDeRodadas++;
    this.sequenciaDoJogador = [];
    this.gerarToque();
    this.tocarSequencia();
  },

  jogar(indiceDaCor) {
    this.tocarNota(indiceDaCor);

    if (this.gameOver) {
      document.querySelector(".inicio").style.display = "none";
      document.querySelector(".jogo").style.display = "none";
      document.querySelector(".final").style.display = "block";

      document.querySelector(
        ".final h2"
      ).innerHTML = `Numero de Rodadas: ${this.contagemDeRodadas}`;

      document.querySelector(".final > button").onclick = () => {
        Genius.comecarJogo();
      };

      return;
    }

    this.sequenciaDoJogador.push(indiceDaCor);

    this.sequenciaDoJogador.forEach((jogada, index) => {
      if (jogada != this.sequencia[index]) {
        this.finalizarJogo("Você Perdeu!");
      }
    });

    if (this.gameOver) {
      document.querySelector(".inicio").style.display = "none";
      document.querySelector(".jogo").style.display = "none";
      document.querySelector(".final").style.display = "block";

      document.querySelector(
        ".final h2"
      ).innerHTML = `Numero de Rodadas: ${this.contagemDeRodadas}`;

      document.querySelector(".final > button").onclick = () => {
        Genius.comecarJogo();
      };

      return;
    }

    if (this.sequenciaDoJogador.length == this.sequencia.length) {
      this.novaRodada();
    }
  },

  gerarToque() {
    const randomInt = this.gerarNumeroAleatorio();
    this.sequencia.push(randomInt);
  },

  gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 4);
  },

  tocarSequencia() {
    this.desabilitarBotoes();

    let iteradorDaSequencia = 0;
    let devoClarear = true;

    const velocidade = 500;

    const intervalo = setInterval(() => {
      const indiceDaSequencia = this.sequencia[iteradorDaSequencia];
      const cor = this.nomeDasCores[indiceDaSequencia];
      const botaoDeCor = document.getElementById(cor);

      if (devoClarear) {
        botaoDeCor.style.border = "3px solid white";
        this.tocarNota(indiceDaSequencia);
      } else {
        botaoDeCor.style.border = "none";
        iteradorDaSequencia++;
      }

      if (iteradorDaSequencia >= this.sequencia.length) {
        clearInterval(intervalo);
        this.habilitarBotoes();
      }

      devoClarear = !devoClarear;
    }, velocidade);
  },

  habilitarBotoes() {
    const botoes = document.querySelectorAll(".genius button");
    botoes.forEach((botao) => {
      botao.removeAttribute("disabled");
    });
  },

  desabilitarBotoes() {
    const botoes = document.querySelectorAll(".genius button");
    botoes.forEach((botao) => {
      botao.setAttribute("disabled", "disabled");
    });
  },

  finalizarJogo(mensagem) {
    this.gameOver = true;
    this.desabilitarBotoes();
  },

  tocarNota(indiceDaNota) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(this.notas[indiceDaNota], "8n");
  },
};

document.querySelector(".inicio").style.display = "block";
document.querySelector(".jogo").style.display = "none";
document.querySelector(".final").style.display = "none";

document.querySelector(".inicio > button").onclick = () => {
  Genius.comecarJogo();
};

document.querySelectorAll(".material-icon.chato").forEach((botao) => {
  botao.onclick = () => {
    const player = document.getElementById("musica");

    if (player.paused) {
      document.querySelectorAll(".material-icon.chato").forEach((botao) => {
        botao.innerHTML = "volume_up";
      });
      player.play();
    } else {
      document.querySelectorAll(".material-icon.chato").forEach((botao) => {
        botao.innerHTML = "volume_off";
      });
      player.pause();
    }
  };
});

document.querySelectorAll(".genius button").forEach((botao, index) => {
  botao.onclick = () => {
    Genius.jogar(index);
  };
});
