// código original por Carlos Santana (RA 01201095)
// adaptado por Mikki Aurora (RA 01242083

function start() {
    cont_correctAnswer = 0;

    section_inicio.style.display = 'none';

    main_game.style.display = 'flex';
    section_perguntas.style.display = 'block'

    renderGrid();
    gameSequence();
}

function renderGrid() {
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
    
    var celulaPreenchida = [
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

function gameSequence() {
    if (cont_correctAnswer != 16) {
        p_texto_pergunta.innerHTML = `<b>${cont_correctAnswer + 1}.</b> ${questions_list[cont_correctAnswer]}`;
    }

    if (cont_correctAnswer != 0) {
        word[cont_correctAnswer - 1].write();
    }

    if (cont_correctAnswer == 16) {
        destroyGrid()
    }
}

function verificarResposta() {
    const respostaUsuario = (input_resposta.value).toLowerCase(); // normalização

    const janelaVerificaco = aside_verificacao.style
    var saidaVerificao = ''

    if (respostaUsuario == '') {
        saidaVerificao = '<p>Escreva sua resposta no campo.</p>';

    } else {
        const respostaCorreta = respostaUsuario == special_words[cont_correctAnswer].toLowerCase()
        if (respostaCorreta) {
            aside_verificacao.setAttribute('class', 'janela absolute resposta-correta');
            saidaVerificao = '<h3>Resposta correta!</h3>';

            cont_correctAnswer++;
            gameSequence();

        } else {
            aside_verificacao.setAttribute('class', 'janela absolute resposta-incorreta');
            saidaVerificao = '<h3>Resposta incorreta<h3>';
        }

        input_resposta.value = '';
    }

    span_saida_verificacao.innerHTML = saidaVerificao
    janelaVerificaco.display = 'block';

    setTimeout(function () {
        janelaVerificaco.display = 'none';
        aside_verificacao.setAttribute('class', 'janela absolute');
    }, 1500);
}

function destroyGrid() {
    pontuation();

    section_perguntas.style.display = 'none';
}

function pontuation() {
    article_gameover.style.display = 'block';

    if (cont_correctAnswer != 0) {
        p_pontuacao.style.display = 'block';

        for (i = 0; i < cont_correctAnswer; i++) {
                ol_pontuacao.innerHTML += `<li>${special_words[i]}`;
        }
    }
}

function recomecarJogo() {
    ol_pontuacao.innerHTML = ''
    p_pontuacao.style.display = 'none'

    main_game.style.display = 'none';
    article_gameover.style.display = 'none';

    section_inicio.style.display = 'flex';
}

// variáveis globais
var cont_correctAnswer = 0;

var special_words = ['CPU', 'ULA', 'Registradores', 'RAM', 'ROM', 'EPROM', 'FLASH', 'Memória de Massa', 'DMA', 'CS', 'Adress Bus', 'Data Bus', 'I5', 'I7', 'Dual Core', 'Quad Core'];

var questions_list = [
    'Qual é a sigla para Central Process Unit?',
    'Um circuto digital que realiza operações lógicas e aritméticas. Qual é o nome deste componente?',
    'Tipo de memória que se encontra no topo da hierarquia de memória',
    'Tipo de memória volátil que tem como nome Random Acess Memory. Qual é a sigla deste componente?',
    'Tipo de memória não volátil que oferece dados apenas para leitura',
    'Tipo de memória não volátil que precisa ter seu chip exposto a luz ultravioleta para apagar seu conteúdo',
    'Tipo particular de EEPROM que mantém as informações armazenadas sem a necessidade de uma fonte de energia elétrica',
    'Tipo de memória que precisa ter seu conteúdo copiado na RAM para poder ser executado pela CPU',
    'Permite que periféricos acessem diretamente a RAM sem ocupar processamento',
    'Também conhecido como Slave Select (SS). Usado para selecionar um ou um conjunto de circuitos que estão conectados no computador',
    'Grupo de linhas ou trilhas usadas para se referir a um endereço físico na memória. O número de trilhas determina a quantidade de endereços na memória física',
    'Também chamado de Memory Bus. É responsável para carregar os dados.',
    'Modelo de processador desenvolvido pela Intel qu teve sua primeira versão lançada em setembro de 2009',
    'Modelo de processador desenvolvido pela Intel qu teve sua primeira versão lançada em novembro de 2008',
    'Tipo de processador que possui dois processadores ou melhor dizendo ‘dois centros, núcleos ou cores de execução‘ no mesmo circuito integrado.  Cada core tem sua própria memória cash e controlador o que permite que funcione mais efetivamente do que um processador single',
    'Segue o mesmo princípio de um dual-core, mas agora em teoria tem o dobro da capacidade de processamento'
];

const word = [
    {
        letter: special_words[0].split(''),
        position: [2, 13, 24],
        write: function () {

            for (i in word[0].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[0].position[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += word[0].letter[i];
                } else {
                    celulaEncontrada.innerHTML = word[0].letter[i];
                }
            }
        }
    },

    {
        letter: special_words[1].split(''),
        position: [84, 85, 86],
        write: function () {
            for (i in word[1].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[1].position[i]}`);
                if (i == 0) {
                    celulaEncontrada.innerHTML += word[1].letter[i];
                } else {
                    celulaEncontrada.innerHTML = word[1].letter[i];
                }
            }
        }
    },

    {
        letter: special_words[2].split(''),
        position: [38, 49, 60, 71, 82, 93, 104, 115, 126, 137, 148, 159, 170],
        write: function () {
            for (i in word[2].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[2].position[i]}`);

                if (i == 0 || i == 3 || i == 8) {
                    celulaEncontrada.innerHTML += word[2].letter[i];
                } else {
                    celulaEncontrada.innerHTML = word[2].letter[i];
                }
            }
        }
    },
    
    {
        letter: special_words[3].split(''),
        position: [38, 39, 40],
        write: function () {
            for (i in word[3].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[3].position[i]}`);

                if (i > 0) {
                    celulaEncontrada.innerHTML = word[3].letter[i];
                }
            }
        }
    },
    
    {
        letter: special_words[4].split(''),
        position: [167, 178, 189],
        write: function () {
            for (i in word[4].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[4].position[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += word[4].letter[i];
                } else {
                    celulaEncontrada.innerHTML = word[4].letter[i];
                }
            }
        }
    },
    
    {
        letter: special_words[5].split(''),
        position: [145, 156, 167, 178, 189],
        write: function () {
            for (i in word[5].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[5].position[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += word[5].letter[i];
                } else if (i == 2) {
                } else {
                    celulaEncontrada.innerHTML = word[5].letter[i];
                }
            }
        }
    },
    
    {
        letter: special_words[6].split(''),
        position: [74, 85, 96, 107, 118],
        write: function () {
            for (i in word[6].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[6].position[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += word[6].letter[i];
                } else {
                    celulaEncontrada.innerHTML = word[6].letter[i];
                }
            }
        }
    },
    
    {
        letter: special_words[7].split(''),
        position: [20, 31, 42, 53, 64, 75, 86, 97, 108, 119, 130, 141, 152, 163, 174, 185],
        write: function () {
            for (i in word[7].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[7].position[i]}`);

                if (i == 0 || i == 5 || i == 8) {
                    celulaEncontrada.innerHTML += word[7].letter[i];
                } else {
                    celulaEncontrada.innerHTML = word[7].letter[i];
                }
            }

            celula_97.innerHTML = '-'
            celula_130.innerHTML = '-'
        }
    },
    
    {
        letter: special_words[8].split(''),
        position: [126, 127, 128],
        write: function () {
            for (i in word[8].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[8].position[i]}`);

                if (i > 0) {
                    celulaEncontrada.innerHTML = word[8].letter[i];
                }
            }
        }
    },
    
    {
        letter: special_words[9].split(''),
        position: [193, 194],
        write: function () {
            for (i in word[9].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[9].position[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += word[9].letter[i];
                } else {
                    celulaEncontrada.innerHTML = word[9].letter[i];
                }
            }
        }
    },
    
    {
        letter: special_words[10].split(''),
        position: [165, 166, 167, 168, 169, 170, 171, 172, 173, 174],
        write: function () {
            for (i in word[10].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[10].position[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += word[10].letter[i];
                } else if (i == 2) {
                } else {
                    celulaEncontrada.innerHTML = word[10].letter[i];
                }
            }

            celula_171.innerHTML = '-'
        }
    },
    
    {
        letter: special_words[11].split(''),
        position: [117, 128, 139, 150, 161, 172, 183, 194],
        write: function () {
            for (i in word[11].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[11].position[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += word[11].letter[i];
                } else {
                    celulaEncontrada.innerHTML = word[11].letter[i];
                }
            }

            celula_161.innerHTML = '-'
        }
    },
    
    {
        letter: special_words[12].split(''),
        position: [75, 76],
        write: function () {
            for (i in word[12].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[12].position[i]}`);

                if (i > 0) {
                    celulaEncontrada.innerHTML = word[12].letter[i];
                }
            }    
        }
    },
    
    {
        letter: special_words[13].split(''),
        position: [71, 72],
        write: function () {
            for (i in word[13].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[13].position[i]}`);

                if (i > 0) {
                    celulaEncontrada.innerHTML = word[13].letter[i];
                }
            }    
        }
    },
    
    {
        letter: special_words[14].split(''),
        position: [23, 24, 25, 26, 27, 28, 29, 30, 31],
        write: function () {
            for (i in word[14].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[14].position[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += word[14].letter[i];
                } else {
                    celulaEncontrada.innerHTML = word[14].letter[i];
                }
            }

            celula_27.innerHTML = '-'
        }
    },
    
    {
        letter: special_words[15].split(''),
        position: [3, 14, 25, 36, 47, 58, 69, 80, 91],
        write: function () {
            for (i in word[15].letter) {
                var celulaEncontrada = document.querySelector(`#celula_${word[15].position[i]}`);

                if (i == 0) {
                    celulaEncontrada.innerHTML += word[15].letter[i];
                } else {
                    celulaEncontrada.innerHTML = word[15].letter[i];
                }
            }

            celula_47.innerHTML = '-'
        }
    }
];