function contar() {
    const listaNumeros = [3]
    var resultadoContagem = listaNumeros[0]

    for (
        numero = 2;
        numero <= 9;
        numero++
    ) {
        resultadoContagem += 11

        listaNumeros.push(resultadoContagem)
    }

    return listaNumeros
}

console.log(contar())

function corrigirLista(listaNumeros = []) {
    
    const listaOrdenada = listaNumeros.sort((a, b) => a - b)
    /*
        `=>` é uma função anônima, basicamente servindo para encurtar o return de uma função padrão.
        
        a função de lista `sort()` está fazendo cálculos para saber como ordenar os itens.
            * se o resultado da subtração entre `a` (1º item) e `b` (2º item) for negativo -> a vem antes de b
            * se negativo -> então b antes de a
            * se 0 -> itens iguais
    */

    const listaOrdenadaCorrijida = []
    for (i = 0; i < listaOrdenada.length; i++) {
        if (listaOrdenada[i] != listaOrdenada[i + 1]) {
            listaOrdenadaCorrijida.push(listaOrdenada[i])
        }
    }

   var valorSubtracao = 0
   var contadorQuadrado = 1

   var posicaoLista = 0
   
   const novaLista = []
    for (
        var quadradoAtual = 0;
        quadradoAtual <= 313;
        quadradoAtual++
    ) {
        const quadradoAtualNaLista = quadradoAtual == listaOrdenadaCorrijida[posicaoLista]

        if (quadradoAtualNaLista) {
            posicaoLista++

            if (quadradoAtual == 2 || quadradoAtual == 3) {
                novaLista.push(quadradoAtual)
            } else {
                novaLista.push(quadradoAtual - valorSubtracao)
            }
        }

        if (contadorQuadrado == 18) {
            contadorQuadrado = 1
            valorSubtracao += 7
        } else {
            contadorQuadrado++
        }

        if (novaLista[posicaoLista - 1] == 180) {
            break
        }
    }

    return novaLista.sort((a, b) => a - b)
}

const listaDesatualizada = [
    2, 20, 38, 133, 134, 135, 59, 77, 95, 113, 131, 149,
    167, 185, 203, 221, 239, 257, 275, 59, 60, 61, 272, 290, 308, 236,
    254, 272, 290, 308, 116, 134, 152, 170, 188, 27, 45, 63, 81, 99, 117,
    135, 153, 171, 189, 207, 225, 243, 261, 279, 297, 203, 20, 204, 205, 312,
    313, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 187, 223,
    241, 259, 277, 295, 313, 117, 118, 113, 114, 37, 38, 39, 40, 41, 42,
    43, 44, 45, 3, 21, 39, 57, 75, 93, 111, 129, 147
]

console.log(corrigirLista(listaDesatualizada))