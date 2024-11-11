// código original por Carlos Santana (RA 01201095)
// adaptado por Mikki Aurora (RA 01242083

function fecharJanela(idElemento) {
    idElemento.style.display = 'none';
}

function comecarJogo() {
    qtdAcertos = 0;

    section_inicio.style.display = 'none';

    main_game.style.display = 'flex';
    section_perguntas.style.display = 'block'

    construirCruzadinha();
    progredirJogo();
}

function construirCruzadinha() {
    var tableGame = '<table id="gridGame" celulaspacing=0 celulapadding=0>';
    
    var widthTable = 11;
    var heightTable = 18;
    
    const vazioCelula = '&nbsp;' // 'non-breaking space' 
    var celula = 0;
    for (var row = 1; row <= heightTable; row++) {

        tableGame += `<tr id="row_${row}">`;

        for (var column = 1; column <= widthTable; column++, celula++) {
            tableGame += `<td class="celula-vazia" id="celula_${celula}">${vazioCelula}</td>`;

        }
        tableGame += '</tr>';

    }
    tableGame += '</table>';

    document.querySelector('#div_canvasCruzada').innerHTML = tableGame;

    pintarCelulas();
}

function pintarCelulas() {
    
    const celulaPreenchida = [
        2,   3,  13,  14,  20,  23,  24,  25,  26,  27,  28,  29,
       30,  31,  36,  38,  39,  40,  42,  47,  49,  53,  58,  60,
       64,  69,  71,  72,  74,  75,  76,  80,  82,  84,  85,  86,
       91,  93,  96,  97, 104, 107, 108, 115, 117, 118, 119, 126,
      127, 128, 130, 137, 139, 141, 145, 148, 150, 152, 156, 159,
      161, 163, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174,
      178, 183, 185, 189, 193, 194
    ];

    for (item in celulaPreenchida) {
        var paintcelula = document.getElementById(`celula_${celulaPreenchida[item]}`);
        paintcelula.removeAttribute('class', 'celula-vazia');
        paintcelula.setAttribute('class', 'celula-livre');
    }

    const celulaNumeroPergunta = [2, 84, 38, 38, 167, 145, 74, 20, 126, 193, 165, 117, 75, 71, 23, 3];
    
    for (
        var posicao = 0; 
        posicao < celulaNumeroPergunta.length; 
        posicao++
    ) {
        var paintIndex_celula = document.getElementById(`celula_${celulaNumeroPergunta[posicao]}`);

        paintIndex_celula.innerHTML = `<span class="numero-pergunta absolute">${posicao + 1}</span>`;

        if (posicao == 2 || posicao == 3) {
            paintIndex_celula.innerHTML = `<span class="numero-pergunta absolute">3/4</span>`;
        }
    }
}

function progredirJogo() {
    if (qtdAcertos != 16) {
        p_texto_pergunta.innerHTML = `<b>${qtdAcertos + 1}.</b> ${listaPerguntas[qtdAcertos]}`;
    }

    if (qtdAcertos != 0) {
        palavra[qtdAcertos - 1].escreverCelula();
    }

    if (qtdAcertos == 16) {
        terminarJogo();
    }
}

function verificarResposta() {
    const respostaUsuario = (input_resposta.value).toLowerCase(); // normalização

    var saidaVerificao = '';

    if (respostaUsuario == '') {
        aside_verificacao.setAttribute('class', 'janela absolute')
        saidaVerificao = '<p>Escreva sua resposta no campo.</p>';

    } else {
        const respostaCorreta = respostaUsuario == palavrasChave[qtdAcertos].toLowerCase()
        if (respostaCorreta) {
            aside_verificacao.setAttribute('class', 'janela absolute resposta-correta');
            saidaVerificao = '<h3>Resposta correta!</h3>';

            qtdAcertos++;
            progredirJogo();

        } else {
            aside_verificacao.setAttribute('class', 'janela absolute resposta-incorreta');
            saidaVerificao = '<h3>Resposta incorreta.<h3>';
        }

        input_resposta.value = '';
    }

    span_saida_verificacao.innerHTML = saidaVerificao;
    aside_verificacao.style.display = 'block';

    setInterval(function () {
        aside_verificacao.style.display = 'none';
    }, 3000)
}

function terminarJogo() {
    section_perguntas.style.display = 'none';
    determinarPontuacao();
}

function determinarPontuacao() {
    article_gameover.style.display = 'block';

    if (qtdAcertos != 0) {
        p_pontuacao.style.display = 'block';

        for (i = 0; i < qtdAcertos; i++) {
                ol_pontuacao.innerHTML += `<li>${palavrasChave[i]}`;
        }
    }
}

function recomecarJogo() {
    ol_pontuacao.innerHTML = '';
    p_pontuacao.style.display = 'none'

    main_game.style.display = 'none';
    article_gameover.style.display = 'none';

    section_inicio.style.display = 'flex';
    header_inicio.style.display = 'block';
}

// variáveis globais
var qtdAcertos = 0;

const palavrasChave = ['CPU', 'ULA', 'Registradores', 'RAM', 'ROM', 'EPROM', 'FLASH', 'Memória de Massa', 'DMA', 'CS', 'Adress Bus', 'Data Bus', 'I5', 'I7', 'Dual Core', 'Quad Core'];

const listaPerguntas = [
    `Sigla para o componente denominado cérebro do computador.`,
    'Sigla para o componente da CPU que realiza cálculos ariméticos e booleanos.',
    'Outro componente interno da CPU que armazena resultados ou operandos imediatos para a ULA.',
    'Sigla para a memória volátil que é acessada em ordem aleatória pelo processador.',
    'Sigla para o tipo um memória não-volátil e de gravação única.',
    'Sigla para um Tipo de ROM que pode ser regravada.',
    'Memória do tipo ROM fragmentada em blocos e que pode ser regravada, mas por meio eletrônico.',
    'Rótulo para dispositivos de memória que armazenam dados por tempo prolongado.',
    'Sigla para o processo de transferência de dados sem acesso à CPU.',
    'Sigla para o delimitadaor de dispositivo para comunicação com o processador.',
    'O barramento onde é determinado o endereço de memória (em inglês).',
    'Transporta os dados à serem escritos ou lidos no determinado endereço de memória (em inglês).',
    'Modelo de processador caracterizado como médio porte na família principal da Intel.',
    'Modelo de processador Intel que definiu a nova geração do soquete LGA 1156.',
    'Nome que caracteriza um processador com duas centrais de processamento.',
    'Tipos de processadores predominantes na família Core 2 Quad.'
];

const palavra = [
    {
        letra: palavrasChave[0].split(''),
        numCelula: [2, 13, 24],
        escreverCelula: function () {

            for (i in palavra[0].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[0].numCelula[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += palavra[0].letra[i];
                } else {
                    celulaEncontrada.innerHTML = palavra[0].letra[i];
                }
            }
        }
    },

    {
        letra: palavrasChave[1].split(''),
        numCelula: [84, 85, 86],
        escreverCelula: function () {
            for (i in palavra[1].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[1].numCelula[i]}`);
                if (i == 0) {
                    celulaEncontrada.innerHTML += palavra[1].letra[i];
                } else {
                    celulaEncontrada.innerHTML = palavra[1].letra[i];
                }
            }
        }
    },

    {
        letra: palavrasChave[2].split(''),
        numCelula: [38, 49, 60, 71, 82, 93, 104, 115, 126, 137, 148, 159, 170],
        escreverCelula: function () {
            for (i in palavra[2].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[2].numCelula[i]}`);

                if (i == 0 || i == 3 || i == 8) {
                    celulaEncontrada.innerHTML += palavra[2].letra[i];
                } else {
                    celulaEncontrada.innerHTML = palavra[2].letra[i];
                }
            }
        }
    },
    
    {
        letra: palavrasChave[3].split(''),
        numCelula: [38, 39, 40],
        escreverCelula: function () {
            for (i in palavra[3].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[3].numCelula[i]}`);

                if (i > 0) {
                    celulaEncontrada.innerHTML = palavra[3].letra[i];
                }
            }
        }
    },
    
    {
        letra: palavrasChave[4].split(''),
        numCelula: [167, 178, 189],
        escreverCelula: function () {
            for (i in palavra[4].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[4].numCelula[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += palavra[4].letra[i];
                } else {
                    celulaEncontrada.innerHTML = palavra[4].letra[i];
                }
            }
        }
    },
    
    {
        letra: palavrasChave[5].split(''),
        numCelula: [145, 156, 167, 178, 189],
        escreverCelula: function () {
            for (i in palavra[5].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[5].numCelula[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += palavra[5].letra[i];
                } else if (i == 2) {
                } else {
                    celulaEncontrada.innerHTML = palavra[5].letra[i];
                }
            }
        }
    },
    
    {
        letra: palavrasChave[6].split(''),
        numCelula: [74, 85, 96, 107, 118],
        escreverCelula: function () {
            for (i in palavra[6].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[6].numCelula[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += palavra[6].letra[i];
                } else {
                    celulaEncontrada.innerHTML = palavra[6].letra[i];
                }
            }
        }
    },
    
    {
        letra: palavrasChave[7].split(''),
        numCelula: [20, 31, 42, 53, 64, 75, 86, 97, 108, 119, 130, 141, 152, 163, 174, 185],
        escreverCelula: function () {
            for (i in palavra[7].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[7].numCelula[i]}`);

                if (i == 0 || i == 5 || i == 8) {
                    celulaEncontrada.innerHTML += palavra[7].letra[i];
                } else {
                    celulaEncontrada.innerHTML = palavra[7].letra[i];
                }
            }

            celula_97.innerHTML = '-'
            celula_130.innerHTML = '-'
        }
    },
    
    {
        letra: palavrasChave[8].split(''),
        numCelula: [126, 127, 128],
        escreverCelula: function () {
            for (i in palavra[8].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[8].numCelula[i]}`);

                if (i > 0) {
                    celulaEncontrada.innerHTML = palavra[8].letra[i];
                }
            }
        }
    },
    
    {
        letra: palavrasChave[9].split(''),
        numCelula: [193, 194],
        escreverCelula: function () {
            for (i in palavra[9].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[9].numCelula[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += palavra[9].letra[i];
                } else {
                    celulaEncontrada.innerHTML = palavra[9].letra[i];
                }
            }
        }
    },
    
    {
        letra: palavrasChave[10].split(''),
        numCelula: [165, 166, 167, 168, 169, 170, 171, 172, 173, 174],
        escreverCelula: function () {
            for (i in palavra[10].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[10].numCelula[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += palavra[10].letra[i];
                } else if (i == 2) {
                } else {
                    celulaEncontrada.innerHTML = palavra[10].letra[i];
                }
            }

            celula_171.innerHTML = '-'
        }
    },
    
    {
        letra: palavrasChave[11].split(''),
        numCelula: [117, 128, 139, 150, 161, 172, 183, 194],
        escreverCelula: function () {
            for (i in palavra[11].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[11].numCelula[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += palavra[11].letra[i];
                } else {
                    celulaEncontrada.innerHTML = palavra[11].letra[i];
                }
            }

            celula_161.innerHTML = '-'
        }
    },
    
    {
        letra: palavrasChave[12].split(''),
        numCelula: [75, 76],
        escreverCelula: function () {
            for (i in palavra[12].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[12].numCelula[i]}`);

                if (i > 0) {
                    celulaEncontrada.innerHTML = palavra[12].letra[i];
                }
            }    
        }
    },
    
    {
        letra: palavrasChave[13].split(''),
        numCelula: [71, 72],
        escreverCelula: function () {
            for (i in palavra[13].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[13].numCelula[i]}`);

                if (i > 0) {
                    celulaEncontrada.innerHTML = palavra[13].letra[i];
                }
            }    
        }
    },
    
    {
        letra: palavrasChave[14].split(''),
        numCelula: [23, 24, 25, 26, 27, 28, 29, 30, 31],
        escreverCelula: function () {
            for (i in palavra[14].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[14].numCelula[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += palavra[14].letra[i];
                } else {
                    celulaEncontrada.innerHTML = palavra[14].letra[i];
                }
            }

            celula_27.innerHTML = '-'
        }
    },
    
    {
        letra: palavrasChave[15].split(''),
        numCelula: [3, 14, 25, 36, 47, 58, 69, 80, 91],
        escreverCelula: function () {
            for (i in palavra[15].letra) {
                var celulaEncontrada = document.querySelector(`#celula_${palavra[15].numCelula[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += palavra[15].letra[i];
                } else {
                    celulaEncontrada.innerHTML = palavra[15].letra[i];
                }
            }

            celula_47.innerHTML = '-'
        }
    }
];