// Função principal que inicia o jogo
async function jogar() {
    await loading(10); // Espera o término da animação de loading

    acertos = 0; // Zera o contador de acertos
    erros = 0;  // Zera o contador de erros

    let palavra = criarInterface(); // Cria a interface do jogo e retorna a palavra sorteada

    // Recebendo elementos da interface
    const letras = document.getElementById('letras');
    const letrasDigitadas = document.getElementById('letrasDigitadas');
    const btnNovoJogo = document.getElementById('btnNovoJogo');
    const btnDesistir = document.getElementById('btnDesistir');

    // Eventos de ação das teclas ao serem pressionadas
    document.addEventListener('keypress', function(evento) {

        verifica = true;

        let letra = evento.key.toUpperCase(); // Recebe a letra digitada

        // Verifica se a letra já foi digitada
        for (let i = 0; i < digitadas.length; i++) {
            if (digitadas[i] == letra) {
                aviso('A letra "' + letra + '" já foi digitada!', 'ok', 'laranja');
                verifica = false; // Não executa a função
            }
        }

        if (verifica) {
            digitadas.push(letra); // Adiciona a letra na lista de letras digitadas
            letrasDigitadas.innerHTML += letra + '- '; // Adiciona a letra na interface de digitadas

            if (!palavra.includes(letra)) {
                erros++; // Incrementa o contador de erros
                erro(erros); // Executa a função de erro

                // Verifica se o jogador perdeu
                if (erros == 6) {
                    aviso('Que pena, você perdeu!<br>A Palavra era: "' + palavra + '".<br><br>Deseja jogar novamente?', 0, 'vermelho');
                }
            }
    
            for (let i = 0; i < palavra.length; i++) {
                if (letra == palavra[i]) {
                    letras.children[i].children[0].classList.remove('invisivel'); // Mostra a letra na interface
                    acertos++; // Incrementa o contador de acertos
    
                    // Verifica se o jogador ganhou
                    if (acertos == palavra.length) {
                        aviso('Parabéns, você ganhou!<br>A Palavra era: "' + palavra + '".<br><br>Deseja jogar novamente?');
                    }
                }
            }
        }
    });

    // Evento de clique dos botões
    btnNovoJogo.addEventListener('click', novoJogo);
    btnDesistir.addEventListener('click', desistir);
}

// Animação de loading
function loading(time) {
    // Cria a animação de loading
    return new Promise((resolve) => {
        const main = document.querySelector('main');
        main.innerHTML = '';
        
        const div = document.createElement('div');
        div.classList.add('loading');
    
        const p = document.createElement('p');
        p.innerHTML = 'Carregando...';
    
        const span = document.createElement('span');
        span.classList.add('loading__span');
    
        const hr = document.createElement('hr');
        hr.classList.add('loading__hr')
    
        div.appendChild(p);
    
        let i = 0
    
        const timer = setInterval(function() {
        if (i >= 100) {
            hr.style.backgroundColor = 'var(--main-color)';
            setInterval(function() {
                clearInterval(timer);
                resolve(); // Retorna à funcão que a chamou para que essa possa continuar
            }, 500);
        }
    
        i++;
        hr.style.width = i + '%';
        span.appendChild(hr);
        div.appendChild(span);
        main.appendChild(div);
        }, time);  
    });
}

// Função que cria a interface do jogo
function criarInterface() {
    // Criando os elementos da interface do jogo
    const main = document.querySelector('main');
    main.innerHTML = '';

    const divJogo = document.createElement('div');
    divJogo.classList.add('jogo');
    divJogo.id = 'jogo';
    
    const divInfo = document.createElement('div');
    divInfo.classList.add('jogo__info');

    const titulo = document.createElement('div');
    titulo.classList.add('jogo__titulo');
    titulo.innerHTML = '<p>Digite uma letra</p>';

    const divLetras = document.createElement('div');
    divLetras.classList.add('jogo__letras');
    divLetras.id = 'letras';

    // Definindo qual vai ser a palavra aleatóriamente
    const palavra = palavras[Math.floor(Math.random() * palavras.length)];

    // Criando as letras da palavra de acordo com o tamanho
    for (let i = 0; i < palavra.length; i++) {
        divLetras.innerHTML += '<div><p class="invisivel">' + palavra[i] + '</p><span class="espaco"></span></div>';
    }

    const letrasDigitadas = document.createElement('div');
    letrasDigitadas.classList.add('jogo__letrasDigitadas');
    letrasDigitadas.innerHTML = '<p>Letras digitadas:</p>';
    letrasDigitadas.id = 'letrasDigitadas';

    const divBtn = document.createElement('div');
    divBtn.classList.add('jogo__btn');

    const btnNovoJogo = document.createElement('button');
    btnNovoJogo.classList.add('btnJogo');
    btnNovoJogo.id = 'btnNovoJogo';
    btnNovoJogo.innerHTML = 'Novo Jogo';
    divBtn.appendChild(btnNovoJogo);

    const btnDesistir = document.createElement('button');
    btnDesistir.classList.add('btnJogo');
    btnDesistir.id = 'btnDesistir';
    btnDesistir.innerHTML = 'Desistir';
    divBtn.appendChild(btnDesistir);

    divInfo.appendChild(titulo);
    divInfo.appendChild(divLetras);
    divInfo.appendChild(letrasDigitadas);
    divInfo.appendChild(divBtn);

    divJogo.innerHTML += '<canvas id="tela" class="jogo__tela" width="400" height="400"></canvas>';
    divJogo.appendChild(divInfo);

    main.appendChild(divJogo);

    // Desenhando a forca no canvas
    const tela = document.getElementById('tela');
    const ctx = tela.getContext('2d');
    ctx.fillStyle = '#000';

    ctx.fillRect(80, 350, 100, 4);
    ctx.fillRect(130, 50, 4, 300);
    ctx.fillRect(130, 50, 100, 4);
    ctx.fillRect(230, 50, 4, 50);

    // Retornando a palavra que foi sorteada
    return palavra;
}

// Função que desenha o boneco de acordo com os erros
function erro(e){ // recebe os erros como parâmetro
    const tela = document.getElementById('tela');
    const ctx = tela.getContext('2d');
    ctx.fillStyle = '#000';

    // Caso haja 1 erro desenha a cabeça
    if(e == 1){
        ctx.beginPath();
        ctx.arc(232, 96, 30, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.arc(232, 96, 26, 0, 2 * Math.PI);
        ctx.fill();

        // Caso haja 2 erros desenha o corpo
    } else if (e == 2){
        ctx.fillStyle = '#000';
        ctx.fillRect(230, 125, 4, 125);    

        // Caso haja 3 erros desenha o braço esquerdo
    } else if (e == 3){
        ctx.beginPath();
        ctx.moveTo(230,125);
        ctx.lineTo(234,125);
        ctx.lineTo(180,190);
        ctx.lineTo(176,190);
        ctx.fill();       

        // Caso haja 4 erros desenha o braço direito
    } else if (e == 4){
        ctx.beginPath();
        ctx.moveTo(230,125);
        ctx.lineTo(234,125);
        ctx.lineTo(280,190);
        ctx.lineTo(276,190);
        ctx.fill();

        // Caso haja 5 erros desenha a perna esquerda
    } else if (e == 5){
        ctx.beginPath();
        ctx.moveTo(230,250);
        ctx.lineTo(234,250);
        ctx.lineTo(180,320);
        ctx.lineTo(176,320);
        ctx.fill();

        // Caso haja 6 erros desenha a perna direita
    } else if (e == 6){
        ctx.beginPath();
        ctx.moveTo(230,250);
        ctx.lineTo(234,250);
        ctx.lineTo(280,320);
        ctx.lineTo(276,320);
        ctx.fill(); 
    }
}

// Função que exibe os avisos na tela
function aviso(msg, btnType=0, cor='verde'){ // recebe a mensagem, o tipo do botão e uma cor como parâmetro
    // Criando o div que irá conter o aviso
    const main = document.querySelector('main');
    const aviso = document.createElement('div');
    aviso.classList.add('aviso');

    // Aplica o estilo de acordo com a cor informada
    if(cor == 'laranja'){
        aviso.classList.add('laranja');
    } else if(cor == 'vermelho'){
        aviso.classList.add('vermelho');
    } else {
        aviso.classList.add('verde');
    }

    main.appendChild(aviso);

    // Animação de abertura do aviso
    let i = 0;

    setInterval(function() {
        if (i <= 60) {
            i += 10;
            aviso.style.width = i + '%';
        }
    }, 10);

    // Criando o texto do aviso
    aviso.innerHTML = '<p>' + msg + '</p>';

    const btn = document.createElement('div');
    btn.classList.add('aviso__btn');

    // Criando os botões de acordo com o tipo informado
    if (btnType == 'ok'){
        const btnOk = document.createElement('button');
        btnOk.classList.add('btnAviso');
        btnOk.innerHTML = 'OK';

        btn.appendChild(btnOk);

        btnOk.addEventListener('click', function() {
            aviso.remove(); // Remove o aviso, tudo volta ao normal
        });
    
    } else {
        const btnSim = document.createElement('button');
        btnSim.classList.add('btnAviso');
        btnSim.innerHTML = 'Sim';
    
        const btnNao = document.createElement('button');
        btnNao.classList.add('btnAviso');
        btnNao.innerHTML = 'Não';  
        
        btn.appendChild(btnSim);
        btn.appendChild(btnNao);

        // Remove o aviso e inicia um novo jogo
        btnSim.addEventListener('click', function() {
            aviso.remove();
            window.location.href = "index.html";
        });
    
        // Recarrega a página
        btnNao.addEventListener('click', function() {
            window.location.href = "index.html";
        });
    }

    aviso.appendChild(btn);
}

// Função que inicia um novo jogo
function novoJogo(){
    const popUp = document.createElement('div');
    popUp.classList.add('popUp');

    const jogo = document.getElementById('jogo');
    jogo.appendChild(popUp);

    let i = 0;

    setInterval(function() {
        if (i <= 60) {
            i += 10;
            popUp.style.width = i + '%';
        }
    }, 10);

    popUp.innerHTML = '<p>Tem Certeza que deseja iniciar um novo jogo?</p>';

    const btnSim = document.createElement('button');
    btnSim.classList.add('btnSN');
    btnSim.innerHTML = 'Sim';

    const btnNao = document.createElement('button');
    btnNao.classList.add('btnSN');
    btnNao.innerHTML = 'Não';

    const btn = document.createElement('div');
    btn.classList.add('popUp__btn');

    btn.appendChild(btnSim);
    btn.appendChild(btnNao);

    popUp.appendChild(btn);

    // Remove o aviso e recerrega a página
    btnSim.addEventListener('click', function() {
        popUp.remove();
        window.location.href = "index.html";
    });

    // Remove o aviso
    btnNao.addEventListener('click', function() {
        popUp.remove();
    });
}

// Função que desiste do jogo atual e recarrega a página
function desistir(){
    const popUp = document.createElement('div');
    popUp.classList.add('popUp');

    const jogo = document.getElementById('jogo');
    jogo.appendChild(popUp);

    let i = 0;

    setInterval(function() {
        if (i <= 60) {
            i += 10;
            popUp.style.width = i + '%';
        }
    }, 10);

    popUp.innerHTML = '<p>Tem Certeza que deseja desistir?</p>';

    const btnSim = document.createElement('button');
    btnSim.classList.add('btnSN');
    btnSim.innerHTML = 'Sim';

    const btnNao = document.createElement('button');
    btnNao.classList.add('btnSN');
    btnNao.innerHTML = 'Não';

    const btn = document.createElement('div');
    btn.classList.add('popUp__btn');

    btn.appendChild(btnSim);
    btn.appendChild(btnNao);

    popUp.appendChild(btn);

    // Remove o aviso e recarrega a página
    btnSim.addEventListener('click', function() {
        popUp.remove();
        window.location.href = "index.html";
    });

    // Remove o aviso
    btnNao.addEventListener('click', function() {
        popUp.remove();
    });
}

// Função que adiciona uma palavra ao jogo
function addPalavra() {
    const main = document.querySelector('main');

    const popUp = document.createElement('div');
    popUp.classList.add('popUp');
    popUp.classList.add('opaco');

    main.appendChild(popUp);

    let i = 0;

    setInterval(function() {
        if (i <= 60) {
            i += 10;
            popUp.style.width = i + '%';
        }
    }, 10);

    popUp.innerHTML = '<p>Digite uma palavra:</p>';

    const btnSim = document.createElement('button');
    btnSim.classList.add('btnSN');
    btnSim.innerHTML = 'OK';

    const btnNao = document.createElement('button');
    btnNao.classList.add('btnSN');
    btnNao.innerHTML = 'Voltar';

    const textArea = document.createElement('textarea');
    textArea.classList.add('textArea');
    textArea.id = 'textArea';

    const btn = document.createElement('div');
    btn.classList.add('popUp__btn');

    btn.appendChild(btnSim);
    btn.appendChild(btnNao);

    popUp.appendChild(textArea);
    popUp.appendChild(btn);

    btnSim.addEventListener('click', function() {
        if (textArea.value != '') {
            popUp.remove();
            textArea.value = textArea.value.toUpperCase();
            palavras.push(textArea.value);    
            aviso('Palavra adicionada com sucesso!', 'ok');
        } else {
            aviso('Digite uma palavra!', 'ok', 'laranja');
        }
    });

    btnNao.addEventListener('click', function() {
        popUp.remove();
    });
}