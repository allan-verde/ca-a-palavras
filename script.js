const body = document.querySelector('body')
const section = document.getElementsByTagName('section')[0]
const audioAbertura = document.createElement('audio')
audioAbertura.setAttribute('src', './audio/abertura.mp3')
audioAbertura.classList.add('audioAbertura')
audioAbertura.loop = true
window.onload = function() {
    audioAbertura.play()
}

const audioJogando = document.createElement('audio')
audioJogando.setAttribute('src', './audio/jogando.mp3')
audioJogando.loop = true
audioJogando.classList.add('audioJogando')

const audioParabens = document.createElement('audio')
audioParabens.setAttribute('src', './audio/parabens.mp3')
audioParabens.classList.add('audioParabens')

const audioRiso = document.createElement('audio')
audioRiso.setAttribute('src', './audio/rindo.mp3')
audioRiso.classList.add('audioRiso')

//SEÇÃO INICIAL
section.classList.add('secaoAbertura')

const menuInicial = document.createElement('main')
menuInicial.classList.add('menuInicial')
section.appendChild(menuInicial)

const blocoBotoesInicial = document.createElement('div')
blocoBotoesInicial.classList.add('blocoBotoesInicial')
menuInicial.appendChild(blocoBotoesInicial)

const botaoJogar = document.createElement('div')
botaoJogar.classList.add('botaoInicial')
botaoJogar.innerText = 'Jogar'
botaoJogar.addEventListener('click', jogar)
blocoBotoesInicial.appendChild(botaoJogar)

const botaoInstrucoes = document.createElement('div')
botaoInstrucoes.classList.add('botaoInicial')
botaoInstrucoes.innerText = 'Instruções'
botaoInstrucoes.addEventListener('click', instrucoes)
blocoBotoesInicial.appendChild(botaoInstrucoes)

const cabecalho = document.createElement('h1')
cabecalho.classList.add('cabecalho')
cabecalho.innerHTML = '<span>CAÇA</span></br>PALAVRAS'
menuInicial.appendChild(cabecalho)

const rodape = document.createElement('footer')
rodape.classList.add('rodape')
section.appendChild(rodape)

const linkedin = document.createElement('p')
linkedin.classList.add('redesocial')
linkedin.innerHTML = '<a href="https://www.linkedin.com/in/allan-verde/" target="_blank"><i class="fab fa-linkedin"></a></i>'
rodape.appendChild(linkedin)

const github = document.createElement('p')
github.classList.add('redesocial')
github.innerHTML = '<a href="https://github.com/allan-verde" target="_blank"><i class="fab fa-github-square"></i></a>'
rodape.appendChild(github)

// SEÇÃO INSTRUÇÕES
function instrucoes() {
    section.innerText = ''
    section.appendChild(blocoInstrucao)
    section.appendChild(botaoVolta)
}
const blocoInstrucao = document.createElement('div')
blocoInstrucao.classList.add('blocoInstrucao')

const tituloInstrucao = document.createElement('h1')
tituloInstrucao.classList.add('tituloInstrucao')
tituloInstrucao.innerText = 'INSTRUÇÔES DE JOGO'
blocoInstrucao.appendChild(tituloInstrucao)

const instrucao1 = document.createElement('p')
instrucao1.classList.add('instrucao')
instrucao1.innerHTML = 'O jogo caça-palavras é um passatempo que consiste de letras arranjadas aparentemente aleatórias em uma grade quadrada ou retangular.'
blocoInstrucao.appendChild(instrucao1)

const instrucao2 = document.createElement('p')
instrucao2.classList.add('instrucao')
instrucao2.innerHTML = 'O objetivo do jogo é encontrar e marcar as palavras escondidas na grade o mais rápido possível.'
blocoInstrucao.appendChild(instrucao2)

const instrucao3 = document.createElement('p')
instrucao3.classList.add('instrucao')
instrucao3.innerHTML = 'As palavras estão escondidas horizontalmente dentro da grade.'
blocoInstrucao.appendChild(instrucao3)

const instrucao4 = document.createElement('p')
instrucao4.classList.add('instrucao')
instrucao4.innerHTML = 'Este caça-palavras tem como tema frutas.'
blocoInstrucao.appendChild(instrucao4)

const botaoVolta = document.createElement('botaoVolta')
botaoVolta.classList.add('botaoInicial', 'botaoVolta')
botaoVolta.innerText = 'Voltar'
blocoInstrucao.appendChild(botaoVolta)
botaoVolta.addEventListener('click', volta)

function volta() {
    section.innerText = ''
    section.appendChild(menuInicial)
    section.appendChild(rodape)
    botaoVolta.classList.remove(('botaoFim'))
    audioAbertura.play()
    audioJogando.pause()
    audioParabens.pause()
    audioRiso.pause()
    clearInterval(contaTempo)
}


//SEÇÃO JOGO
const arrayPalavras = ['ABACATE', 'ABACAXI', 'ACEROLA', 'AMORA', 'BANANA', 'CACAU', 'CAJU', 'DAMASCO', 'GOIABA', 'JACA', 'JAMBO', 'LARANJA', 'MANGA', 'MARMELO', 'MELANCIA', 'MORANGO', 'NOZ', 'PERA', 'UVA', 'YAMAMOMO']

const letraAlfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
// minimo: 0
// maximo: 25

// GERADOR DE NÚMERO ALEATÓRIO
let numeroAleatorio = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const bloco = document.createElement('div')
bloco.classList.add('bloco')
const blocoPalavraEscolhida = document.createElement('div')
blocoPalavraEscolhida.classList.add('blocoPalavraEscolhida')

const minhaDivMaior = document.createElement('div')
minhaDivMaior.id = 'arrayMatriz'

const relogio = document.createElement('div')
relogio.classList.add('relogio')
const relogioTexto = document.createElement('p')
relogioTexto.classList.add('relogioTexto')
let time = 30
let contaTempo

relogio.appendChild(relogioTexto)

function jogar() {
    time = 30
    contaTempo = setInterval(temporizador, 1000)
    audioAbertura.pause()
    audioJogando.play()
    section.innerText = ''
    bloco.innerText = ''
    blocoPalavraEscolhida.innerText = ''
    minhaDivMaior.innerText = ''
    section.classList.add('secaoJogo')
    bloco.appendChild(blocoPalavraEscolhida)
    bloco.appendChild(minhaDivMaior)
    section.appendChild(bloco)
    section.appendChild(botaoVolta)
    section.appendChild(relogio)
    //CAPTURANDO 3 PALAVRAS ALEATÓRIAS DIFERENTES
    let arrayPalavraAleatoria1 = arrayPalavras[numeroAleatorio(0, 19)]
    let arrayPalavraAleatoria2 = arrayPalavras[numeroAleatorio(0, 19)]
    let arrayPalavraAleatoria3 = arrayPalavras[numeroAleatorio(0, 19)]
    
    for (let i = 0; i < 3; i++) {    
        if (arrayPalavraAleatoria1 === arrayPalavraAleatoria2) {
            arrayPalavraAleatoria2 = arrayPalavras[numeroAleatorio(0,19)]
        }
    }
    for (let i = 0; i < 3; i++) {
        if (arrayPalavraAleatoria3 === arrayPalavraAleatoria1 || arrayPalavraAleatoria3 === arrayPalavraAleatoria2){
            arrayPalavraAleatoria3 = arrayPalavras[numeroAleatorio(0, 19)]
        }
    }
    // BLOCO QUE CONTERÁ AS PALAVRAS NO JOGO
    const palavraEscolhidaTitulo = document.createElement('h2')
    palavraEscolhidaTitulo.classList.add('palavraEscolhidaTitulo')
    palavraEscolhidaTitulo.innerText = 'Palavras Encontradas:'
    blocoPalavraEscolhida.appendChild(palavraEscolhidaTitulo)
    const arraypalavrasEscolhidas = [arrayPalavraAleatoria1, arrayPalavraAleatoria2, arrayPalavraAleatoria3]
    for (let i = 0; i < 3; i++) {
        const palavraEscolhida = document.createElement('p')
        palavraEscolhida.classList.add('palavraEscolhida', `palavraEscolhida${i}`)
        palavraEscolhida.innerText = arraypalavrasEscolhidas[i]
        blocoPalavraEscolhida.appendChild(palavraEscolhida)
    }

    // CONSTRINDO PÁGINA DO JOGO
    for (let linha = 0; linha < 10; linha++) {
        const minhaDivLinha = document.createElement('div')
        minhaDivLinha.classList.add('minhaDivLinha')
        for (let coluna = 0; coluna < 10; coluna++) {
            const minhaDivCelula = document.createElement('div')
            minhaDivCelula.classList.add('minhaDivCelula')
            minhaDivCelula.addEventListener('click', (evt) => {
                console.log(evt.target)
                evt.target.classList.toggle('itemClicado')
                verificaPalavra(letraPalavra1, 0)
                verificaPalavra(letraPalavra2, 1)
                verificaPalavra(letraPalavra3, 2)
                verificaTodasPalavra(arrLetraPalavra)
            })
            minhaDivLinha.appendChild(minhaDivCelula)
        }
        
        minhaDivMaior.appendChild(minhaDivLinha)
    }
    //CRIANDO VARIAVEIS COM A POSIÇÃO QUE SERÁ COLOCADA A PALAVRA EM LINHAS DIFERENTES
    let numeroAleatorioMatrizLinha1 = numeroAleatorio(0, 9)
    let numeroAleatorioMatrizLinha2 = numeroAleatorio(0, 9)
    let numeroAleatorioMatrizLinha3 = numeroAleatorio(0, 9)
    
    for (let i = 0; i < 5; i++) {
        if (numeroAleatorioMatrizLinha2 === numeroAleatorioMatrizLinha1) {
            numeroAleatorioMatrizLinha2 = numeroAleatorio(0, 9)
        }
    }
    for (let i = 0; i < 10; i++) {
        if (numeroAleatorioMatrizLinha3 === numeroAleatorioMatrizLinha1 || numeroAleatorioMatrizLinha3 === numeroAleatorioMatrizLinha2) {
            numeroAleatorioMatrizLinha3 = numeroAleatorio(0, 9)
        }
    }

    //CRIANDO VARIÁVEL QUE DIRÁ EM QUAL COLUNA COMEÇARÁ A PALAVRA 
    let numeroAleatorioMatrizColuna1 = numeroAleatorio(0, (9 - (arrayPalavraAleatoria1.length - 1)))
    let numeroAleatorioMatrizColuna2 = numeroAleatorio(0, (9 - (arrayPalavraAleatoria2.length - 1)))
    let numeroAleatorioMatrizColuna3 = numeroAleatorio(0, (9 - (arrayPalavraAleatoria3.length - 1)))

    // INCLUINDO LETRAS DA PALAVRA NA MATRIZ
    for (let i = 0; i < arrayPalavraAleatoria1.length; i++) {
        const letra = document.createElement('p')
        letra.classList.add('letra')
        letra.innerText = `${arrayPalavraAleatoria1[i]}`
        document.querySelectorAll('.minhaDivLinha')[numeroAleatorioMatrizLinha1].querySelectorAll('.minhaDivCelula')[numeroAleatorioMatrizColuna1+i].classList.add('letraPalavra1')
        document.querySelectorAll('.minhaDivLinha')[numeroAleatorioMatrizLinha1].querySelectorAll('.minhaDivCelula')[numeroAleatorioMatrizColuna1+i].appendChild(letra)
    }
    
    for (let i = 0; i < arrayPalavraAleatoria2.length; i++) {
        const letra = document.createElement('p')
        letra.classList.add('letra')
        letra.innerText = `${arrayPalavraAleatoria2[i]}`
        document.querySelectorAll('.minhaDivLinha')[numeroAleatorioMatrizLinha2].querySelectorAll('.minhaDivCelula')[numeroAleatorioMatrizColuna2+i].classList.add('letraPalavra2')
        document.querySelectorAll('.minhaDivLinha')[numeroAleatorioMatrizLinha2].querySelectorAll('.minhaDivCelula')[numeroAleatorioMatrizColuna2+i].appendChild(letra)
    }
    
    for (let i = 0; i < arrayPalavraAleatoria3.length; i++) {
        const letra = document.createElement('p')
        letra.classList.add('letra')
        letra.innerText = `${arrayPalavraAleatoria3[i]}`
        document.querySelectorAll('.minhaDivLinha')[numeroAleatorioMatrizLinha3].querySelectorAll('.minhaDivCelula')[numeroAleatorioMatrizColuna3+i].classList.add('letraPalavra3')
        document.querySelectorAll('.minhaDivLinha')[numeroAleatorioMatrizLinha3].querySelectorAll('.minhaDivCelula')[numeroAleatorioMatrizColuna3+i].appendChild(letra)
    }

    const letraPalavra1 = document.querySelectorAll('.letraPalavra1')
    const letraPalavra2 = document.querySelectorAll('.letraPalavra2')
    const letraPalavra3 = document.querySelectorAll('.letraPalavra3')
    const arrLetraPalavra = [letraPalavra1, letraPalavra2, letraPalavra3]
    const todaCelula = document.querySelectorAll('.minhaDivCelula')
    for (let i = 0; i < todaCelula.length; i++) {
        if (todaCelula[i].childElementCount === 0) {
            const letraAleatoria = document.createElement('p')
            letraAleatoria.classList.add('letra')
            letraAleatoria.innerText = `${letraAlfabeto[numeroAleatorio(0, 25)]}`
            todaCelula[i].appendChild(letraAleatoria)
        }
    }
}

function verificaPalavra(param, num) {
    let res = true
    for (let i = 0; i < param.length; i++) {
        if (param[i].classList[2] !== 'itemClicado') {
            res = false
        }
    }

    if (res === true) {
        alteraPalavra(param)
        mostraPalavra(num)
    }

    return res
}
function verificaTodasPalavra(param) {
    let res = true
    for (let i = 0; i < param.length; i++) {
        for (let j = 0; j < param[i].length; j++) {
            if (param[i][j].classList[2] !== 'itemClicado') {
                res = false
            }
        }
    }

    if (res === true) {
        console.log('Ganhou')
        ganhou(popUp)
    }

    return res
}

function alteraPalavra(palavra) {
    for (let i = 0; i < palavra.length; i++) {
        palavra[i].classList.add('palavraEncontrada')
    }
}

function mostraPalavra(num) {
    document.querySelectorAll('.palavraEscolhida')[num].style.color= '#C0B7B1'
}
const divPopUp = document.createElement('div')
divPopUp.classList.add('divPopUp')

const popUp = document.createElement('div')
popUp.classList.add('popUp')
divPopUp.appendChild(popUp)

const botaoFim = document.createElement('button')
botaoFim.innerText = 'Voltar para o Início'
botaoFim.classList.add('botaoInicial', 'botaoFim')
botaoFim.addEventListener('click', volta)
popUp.appendChild(botaoFim)

function ganhou(bloco) {
    clearInterval(contaTempo)
    bloco.innerText = 'Parabéns, você ganhou!!!'
    section.appendChild(divPopUp)
    botaoVolta.classList.add('botaoFim')
    popUp.appendChild(botaoVolta)
    audioJogando.pause()
    audioRiso.pause()
    audioParabens.play()
}

// setInterval(temporizador, 1000)

function temporizador() {
    let segundos = time

    segundos = segundos < 10 ? '0' + `${segundos}` : `${segundos}`
    relogioTexto.innerHTML = `00:${segundos}`
    if (segundos <= 0) {
        derrota(popUp)
    }
    time--
}

function derrota(bloco) {
    clearInterval(contaTempo)
    bloco.innerText = 'Que triste! Você perdeu.'
    section.appendChild(divPopUp)
    botaoVolta.classList.add('botaoFim')
    popUp.appendChild(botaoVolta)
    audioJogando.pause()
    audioParabens.pause()
    audioRiso.play()
}