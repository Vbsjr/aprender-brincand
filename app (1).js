const K = 'aprender-brincando-v3';

// Álbuns temáticos: 12 figurinhas cada (emoji + nome). Personagens inventados.
// Escudos originais: formas simples com as cores e as iniciais de cada time (não são os escudos oficiais)
function escudo(sigla, c1, c2) {
  return '<svg viewBox="0 0 64 72" width="48" height="54" aria-hidden="true">' +
    '<path d="M4 4h56v34c0 14-12 24-28 30C16 62 4 52 4 38z" fill="' + c1 + '" stroke="#111" stroke-width="3"/>' +
    '<path d="M4 22h56v16c0 10-7 18-28 24C11 56 4 48 4 38z" fill="' + c2 + '" opacity=".9"/>' +
    '<text x="32" y="40" text-anchor="middle" font-size="13" font-weight="800" font-family="Arial,sans-serif" fill="#fff" stroke="#000" stroke-width="2" paint-order="stroke">' + sigla + '</text></svg>';
}

const TIMES = [
  ['Santos','SAN','#FFFFFF','#111111'],
  ['Flamengo','FLA','#C62828','#111111'],
  ['Corinthians','COR','#111111','#FFFFFF'],
  ['Palmeiras','PAL','#0B7A3B','#FFFFFF'],
  ['São Paulo','SPF','#C62828','#FFFFFF'],
  ['Grêmio','GRE','#1565C0','#FFFFFF'],
  ['Internacional','INT','#C62828','#FFFFFF'],
  ['Cruzeiro','CRU','#1E4FA3','#FFFFFF'],
  ['Atlético Mineiro','CAM','#111111','#FFFFFF'],
  ['Vasco da Gama','VAS','#111111','#FFFFFF'],
  ['Fluminense','FLU','#0B6B3A','#8B1E2D'],
  ['Botafogo','BOT','#111111','#FFFFFF']
];

const ALBUNS = {
  futebol: { nome: 'Futebol', itens: TIMES.map(t => ['', t[0], escudo(t[1], t[2], t[3])]) },
  carros: { nome: 'Carros', itens: [
    ['🚗','Carro Azul'],['🏎️','Bólido Rápido'],['🚙','Jipe Trilha'],['🚓','Viatura'],
    ['🚕','Táxi Amarelo'],['🚒','Caminhão de Bombeiro'],['🚜','Trator'],['🚌','Ônibus'],
    ['🚐','Van'],['🛻','Picape'],['🏁','Bandeira Quadriculada'],['🛠️','Oficina']]},
  princesas: { nome: 'Princesas', itens: [
    ['👸','Princesa Estrela'],['🧚','Fada Lua'],['🦄','Unicórnio Arco-íris'],['🌸','Jardim Encantado'],
    ['👑','Coroa de Cristal'],['🏰','Castelo Rosa'],['🦋','Borboleta Mágica'],['🌟','Estrela Cadente'],
    ['🧜','Sereia Azul'],['🌹','Rosa Dourada'],['🐚','Concha Encantada'],['💎','Tiara de Diamante']]},
  monstrinhos: { nome: 'Monstrinhos', itens: [
    ['👾','Monstrinho Roxo'],['🐲','Dragãozinho'],['🦖','Dino Trovão'],['🐙','Polvo Mágico'],
    ['🦉','Coruja Sábia'],['🐸','Sapo Saltitante'],['🐱','Gato Astuto'],['🐼','Panda Forte'],
    ['🦊','Raposa Veloz'],['🐨','Coala Doce'],['🦇','Morcego Noturno'],['🐧','Pinguim Gelado']]},
  espaco: { nome: 'Espaço', itens: [
    ['🚀','Foguete'],['🪐','Saturno'],['☄️','Cometa'],['🌍','Terra'],
    ['🌙','Lua'],['☀️','Sol'],['🛸','Disco Voador'],['👽','Alienígena Simpático'],
    ['🌟','Estrela'],['🔭','Telescópio'],['🧑‍🚀','Astronauta'],['🌌','Galáxia']]}
};

const MATERIAS = { mat: { nome: 'Matemática' }, por: { nome: 'Português' }, ing: { nome: 'Inglês' } };

// Banco de demonstração: 10 questões por matéria (o banco de matemática completo está no CSV)
const Q = {
  mat: [
    {t:'Adição', p:'Quanto é 345 + 278?', o:['613','623','523','633'], c:1, e:'300 + 200 = 500, 40 + 70 = 110 e 5 + 8 = 13. Total: 623.'},
    {t:'Subtração', p:'Quanto é 900 - 437?', o:['463','473','563','367'], c:0, e:'900 - 400 = 500 e depois 500 - 37 = 463.'},
    {t:'Multiplicação', p:'Quanto é 6 x 7?', o:['42','36','48','56'], c:0, e:'Seis grupos de 7 ou sete grupos de 6 dão 42.'},
    {t:'Multiplicação', p:'Quanto é 8 x 9?', o:['63','72','81','56'], c:1, e:'8 x 10 = 80, menos 8 = 72.'},
    {t:'Divisão', p:'Quanto é 56 ÷ 8?', o:['6','7','8','9'], c:1, e:'Quantas vezes o 8 cabe em 56? Sete vezes, pois 8 x 7 = 56.'},
    {t:'Divisão', p:'Quanto é 48 ÷ 6?', o:['7','9','8','6'], c:2, e:'Como 6 x 8 = 48, o resultado é 8.'},
    {t:'Sequência', p:'Qual número vem depois de 1.299?', o:['1.300','1.290','1.399','1.209'], c:0, e:'Somando 1 a 1.299 chegamos a 1.300.'},
    {t:'Valor posicional', p:'Qual número tem 3 centenas, 4 dezenas e 2 unidades?', o:['342','324','432','243'], c:0, e:'3 centenas são 300, 4 dezenas são 40 e 2 unidades são 2. Total: 342.'},
    {t:'Frações', p:'Quanto é metade de 18?', o:['6','9','12','8'], c:1, e:'Metade é dividir por 2: 18 ÷ 2 = 9.'},
    {t:'Frações', p:'Quanto é um quarto de 20?', o:['4','5','10','8'], c:1, e:'Um quarto é dividir por 4: 20 ÷ 4 = 5.'}
  ],
  por: [
    {t:'Ortografia', p:'Qual palavra está escrita corretamente?', o:['Exceção','Ezceção','Esceção','Exseção'], c:0, e:'A palavra exceção se escreve com x e com ç.'},
    {t:'Plural', p:'Qual é o plural de pão?', o:['pãos','pães','pões','pãees'], c:1, e:'O plural de pão é pães.'},
    {t:'Substantivo próprio', p:'Qual palavra é um substantivo próprio?', o:['menino','Brasil','correr','bonito'], c:1, e:'Nomes de países, cidades e pessoas são próprios e começam com letra maiúscula.'},
    {t:'Verbo', p:'Qual palavra é um verbo?', o:['casa','correr','azul','bola'], c:1, e:'Verbo indica ação. Correr mostra uma ação.'},
    {t:'Tempo verbal', p:'Qual frase está no passado?', o:['Eu estudo.','Eu estudei.','Eu estudarei.','Eu estudando.'], c:1, e:'Estudei mostra uma ação que já aconteceu.'},
    {t:'Antônimo', p:'Qual palavra é o contrário de alegre?', o:['feliz','triste','contente','animado'], c:1, e:'Antônimo é a palavra de sentido oposto.'},
    {t:'Pontuação', p:'Qual sinal usamos no final de uma pergunta?', o:['.','!','?',','], c:2, e:'O ponto de interrogação indica uma pergunta.'},
    {t:'Rima', p:'Qual palavra rima com mão?', o:['pão','casa','bola','sol'], c:0, e:'Rima é o som final igual: mão e pão terminam com o mesmo som.'},
    {t:'Plural', p:'Qual é o plural de animal?', o:['animais','animals','animalis','animail'], c:0, e:'Palavras terminadas em -al trocam o l por is no plural.'},
    {t:'Acentuação', p:'Qual palavra tem a força da voz na última sílaba?', o:['café','árvore','lápis','mesa'], c:0, e:'Café é oxítona: a força da voz fica no último som.'}
  ],
  ing: [
    {t:'Vocabulário', p:'Como se diz "gato" em inglês?', o:['dog','cat','bird','fish'], c:1, e:'Gato em inglês é cat.'},
    {t:'Cores', p:'Como se diz "azul" em inglês?', o:['red','green','blue','yellow'], c:2, e:'Azul em inglês é blue.'},
    {t:'Números', p:'Como se diz "três" em inglês?', o:['two','three','four','five'], c:1, e:'Três em inglês é three.'},
    {t:'Verbo to be', p:'Complete a frase: I ___ a student (Eu sou um estudante).', o:['am','is','are','be'], c:0, e:'Com o pronome I usamos am.'},
    {t:'Vocabulário', p:'Como se diz "casa" em inglês?', o:['house','horse','hour','hole'], c:0, e:'Casa em inglês é house.'},
    {t:'Saudações', p:'O que significa "Good morning"?', o:['Boa noite','Bom dia','Boa tarde','Tchau'], c:1, e:'Good morning significa Bom dia.'},
    {t:'Verbos', p:'Complete a frase: She ___ a book (Ela lê um livro).', o:['read','reads','reading','readed'], c:1, e:'Com he, she ou it, acrescentamos -s ao verbo.'},
    {t:'Frutas', p:'Como se diz "maçã" em inglês?', o:['banana','orange','apple','grape'], c:2, e:'Maçã em inglês é apple.'},
    {t:'Dias da semana', p:'Qual dia vem depois de Monday (segunda-feira)?', o:['Sunday','Tuesday','Friday','Wednesday'], c:1, e:'Depois de Monday (segunda) vem Tuesday (terça).'},
    {t:'Plural', p:'Complete a frase: I have two ___ (Eu tenho dois gatos).', o:['cat','cats','catss','cates'], c:1, e:'Para o plural, geralmente acrescentamos -s.'}
  ]
};

const padraoStats = () => ({ mat:{a:0,e:0}, por:{a:0,e:0}, ing:{a:0,e:0} });
const padraoColecao = () => ({ futebol:0, carros:0, princesas:0, monstrinhos:0, espaco:0 });

let st = { perfil: null, pin: '', album: null, stats: padraoStats(), colecao: padraoColecao(), minutos: 0 };
try {
  const salvo = JSON.parse(localStorage.getItem(K));
  if (salvo) {
    st = Object.assign(st, salvo);
    st.stats = Object.assign(padraoStats(), salvo.stats || {});
    st.colecao = Object.assign(padraoColecao(), salvo.colecao || {});
  }
} catch (e) {}

const $ = id => document.getElementById(id);
let materiaAtual = 'mat', sessao = [], pos = 0, respondida = false, painelLiberado = false;

function salvar() {
  try { localStorage.setItem(K, JSON.stringify(st)); } catch (e) {}
}

function mostrar(id) {
  document.querySelectorAll('.tela').forEach(t => t.hidden = (t.id !== id));
  window.scrollTo(0, 0);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function totalAcertos() {
  return Object.values(st.stats).reduce((s, x) => s + x.a, 0);
}

function atualizarMenu() {
  $('m-ola').textContent = 'Olá, ' + st.perfil.nome + '!';
  $('m-acertos').textContent = totalAcertos();
  $('m-min').textContent = st.minutos;
  if (st.album) {
    const alb = ALBUNS[st.album];
    $('m-figs').textContent = st.colecao[st.album] + '/' + alb.itens.length;
    $('m-album-txt').textContent = 'Álbum atual: ' + alb.nome;
  } else {
    $('m-figs').textContent = '0/12';
    $('m-album-txt').textContent = 'Você ainda não escolheu um álbum.';
  }
}

function escolherAlbum(chave) {
  st.album = chave;
  salvar();
  atualizarMenu();
  mostrar('t-menu');
}

function renderAlbum() {
  if (!st.album) { mostrar('t-albuns'); return; }
  const alb = ALBUNS[st.album];
  const n = st.colecao[st.album];
  $('a-titulo').textContent = 'Álbum ' + alb.nome;
  $('a-count').textContent = 'Você tem ' + n + ' de ' + alb.itens.length + ' figurinhas.';
  const g = $('a-grid');
  g.innerHTML = '';
  alb.itens.forEach((item, i) => {
    const d = document.createElement('div');
    d.className = 'slot' + (i < n ? ' got' : '');
    if (i < n) {
      const em = document.createElement('i');
      em.innerHTML = item[2] || item[0];
      const nome = document.createElement('span');
      nome.textContent = item[1];
      d.append(em, nome);
    } else {
      d.textContent = '?';
    }
    g.appendChild(d);
  });
}

function renderPais() {
  $('pin-area').hidden = painelLiberado;
  $('pa-painel').hidden = !painelLiberado;
  if (!painelLiberado) return;
  const box = $('pa-dados');
  box.innerHTML = '';
  const linhas = [
    'Criança: ' + st.perfil.nome + ' (' + st.perfil.idade + ' anos, ' + st.perfil.serie + 'º ano)',
    'Álbum atual: ' + (st.album ? ALBUNS[st.album].nome : 'nenhum')
  ];
  Object.keys(MATERIAS).forEach(m => {
    const s = st.stats[m];
    const total = s.a + s.e;
    const taxa = total ? Math.round(s.a / total * 100) : 0;
    linhas.push(MATERIAS[m].nome + ': ' + s.a + ' acertos, ' + s.e + ' erros (' + taxa + '% de acerto)');
  });
  Object.keys(ALBUNS).forEach(k => {
    linhas.push('Álbum ' + ALBUNS[k].nome + ': ' + st.colecao[k] + ' de ' + ALBUNS[k].itens.length);
  });
  linhas.push('Minutos de tempo de tela ganhos: ' + st.minutos);
  linhas.forEach(texto => {
    const p = document.createElement('p');
    p.style.margin = '8px 0';
    p.style.fontSize = '16px';
    p.textContent = texto;
    box.appendChild(p);
  });
}

function iniciarPratica(m) {
  materiaAtual = m;
  sessao = shuffle(Q[m].map((_, i) => i));
  pos = 0;
  mostrar('t-pratica');
  mostrarPergunta();
}

function mostrarPergunta() {
  const q = Q[materiaAtual][sessao[pos]];
  respondida = false;
  $('p-prog').textContent = MATERIAS[materiaAtual].nome + ' · Questão ' + (pos + 1) + ' de ' + sessao.length + ' · ' + q.t;
  $('p-perg').textContent = q.p;
  const box = $('p-opcs');
  box.innerHTML = '';
  q.o.forEach((texto, i) => {
    const b = document.createElement('button');
    b.className = 'btn sec opc';
    b.textContent = texto;
    b.onclick = () => responder(i);
    box.appendChild(b);
  });
  $('p-fb').hidden = true;
  $('p-prox').hidden = true;
}

function ganharFigurinha(msg) {
  if (!st.album) return;
  const alb = ALBUNS[st.album];
  const n = st.colecao[st.album];
  if (n >= alb.itens.length) {
    msg.textContent += ' Álbum completo! Escolha outro álbum no menu.';
    return;
  }
  st.colecao[st.album]++;
  msg.textContent += ' Você ganhou ' + alb.itens[n][1] + '!';
}

function responder(i) {
  if (respondida) return;
  respondida = true;
  const q = Q[materiaAtual][sessao[pos]];
  [...$('p-opcs').children].forEach((b, k) => {
    b.disabled = true;
    if (k === q.c) b.classList.add('ok');
    else if (k === i) b.classList.add('no');
  });

  const acertou = i === q.c;
  const fb = $('p-fb');
  fb.hidden = false;
  fb.innerHTML = '';
  const msg = document.createElement('p');
  msg.className = 'msg';
  msg.textContent = acertou ? 'Muito bem!' : 'Quase! A resposta certa está em verde.';
  const exp = document.createElement('div');
  exp.className = 'exp';
  exp.textContent = q.e;
  fb.append(msg, exp);

  if (acertou) {
    st.minutos++;
    st.stats[materiaAtual].a++;
    if (totalAcertos() % 2 === 0) ganharFigurinha(msg);
  } else {
    st.stats[materiaAtual].e++;
  }
  salvar();

  $('p-prox').hidden = false;
  $('p-prox').textContent = pos + 1 < sessao.length ? 'Próxima' : 'Terminar';
}

$('p-prox').onclick = () => {
  pos++;
  if (pos < sessao.length) {
    mostrarPergunta();
  } else {
    atualizarMenu();
    mostrar('t-menu');
    alert('Sessão concluída! Muito bem.');
  }
};

$('form-cad').addEventListener('submit', e => {
  e.preventDefault();
  const pin = $('c-pin').value.trim();
  if (!/^\d{4}$/.test(pin)) {
    alert('A senha dos pais deve ter 4 números.');
    return;
  }
  st.perfil = { nome: $('c-nome').value.trim(), idade: $('c-idade').value, serie: $('c-serie').value };
  st.pin = pin;
  salvar();
  if (st.album) {
    atualizarMenu();
    mostrar('t-menu');
  } else {
    mostrar('t-albuns');
  }
});

document.querySelectorAll('[data-album]').forEach(b => {
  b.onclick = () => escolherAlbum(b.dataset.album);
});

document.querySelectorAll('[data-materia]').forEach(b => {
  b.onclick = () => iniciarPratica(b.dataset.materia);
});

$('btn-album').onclick = () => {
  renderAlbum();
  mostrar('t-album');
};

$('btn-trocar').onclick = () => mostrar('t-albuns');

$('btn-pais').onclick = () => {
  painelLiberado = false;
  $('pin-in').value = '';
  renderPais();
  mostrar('t-pais');
};

$('form-pin').addEventListener('submit', e => {
  e.preventDefault();
  if ($('pin-in').value === st.pin) {
    painelLiberado = true;
    renderPais();
  } else {
    alert('Senha incorreta.');
    $('pin-in').value = '';
  }
});

$('btn-zerar').onclick = () => {
  if (!confirm('Zerar acertos, erros, figurinhas e minutos de todos os álbuns?')) return;
  st.stats = padraoStats();
  st.colecao = padraoColecao();
  st.minutos = 0;
  salvar();
  renderPais();
};

document.querySelectorAll('[data-ir]').forEach(b => {
  b.addEventListener('click', () => {
    const alvo = b.dataset.ir;
    if (alvo === 't-menu') atualizarMenu();
    mostrar(alvo);
  });
});

if (st.perfil) {
  atualizarMenu();
  mostrar('t-menu');
} else {
  mostrar('t-boas');
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(() => {});
}
