// Botões iniciais
const btnJogar = document.getElementById('btnJogar');
const btnAddPalavra = document.getElementById('btnAddPalavra');

// Array com as palavras que serão sorteadas
let palavras = ['ALURA', 'ORACLE', 'JAVA', 'JAVASCRIPT', 'VSCODE', 'WEB'];      

// Definição das variáveis globais
let acertos = 0;
let erros = 0;
let digitadas = [];
let verifica = true;

// Eventos de click dos botões

// Botão 'começar a jogar' | Inicia o jogo com a função 'jogar'
btnJogar.addEventListener('click', jogar);

// Botão 'adicionar nova palavra' | Abre menu de adicionar palavra com a funcão 'addPalavra'
btnAddPalavra.addEventListener('click', addPalavra);