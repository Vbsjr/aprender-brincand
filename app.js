const K = 'aprender-brincando-v4';
const $ = id => document.getElementById(id);

// Escudos originais: formas simples, cores e iniciais (não são os escudos oficiais)
function escudo(sigla, c1, c2) {
  return '<svg viewBox="0 0 64 72" aria-hidden="true">' +
    '<path d="M4 4h56v34c0 14-12 24-28 30C16 62 4 52 4 38z" fill="' + c1 + '" stroke="#111" stroke-width="3"/>' +
    '<path d="M4 22h56v16c0 10-7 18-28 24C11 56 4 48 4 38z" fill="' + c2 + '" opacity=".9"/>' +
    '<text x="32" y="40" text-anchor="middle" font-size="13" font-weight="800" font-family="Arial,sans-serif" fill="#fff" stroke="#000" stroke-width="2" paint-order="stroke">' + sigla + '</text></svg>';
}

const TIMES = [
  ['Santos','SAN','#FFFFFF','#111111'], ['Flamengo','FLA','#C62828','#111111'],
  ['Corinthians','COR','#111111','#FFFFFF'], ['Palmeiras','PAL','#0B7A3B','#FFFFFF'],
  ['São Paulo','SPF','#C62828','#FFFFFF'], ['Grêmio','GRE','#1565C0','#FFFFFF'],
  ['Internacional','INT','#C62828','#FFFFFF'], ['Cruzeiro','CRU','#1E4FA3','#FFFFFF'],
  ['Atlético Mineiro','CAM','#111111','#FFFFFF'], ['Vasco da Gama','VAS','#111111','#FFFFFF'],
  ['Fluminense','FLU','#0B6B3A','#8B1E2D'], ['Botafogo','BOT','#111111','#FFFFFF']
];

// Cada figurinha: [emoji, nome] ou, no futebol, ['', nome, escudo]
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

const MATERIAS = { mat: 'Matemática', por: 'Português', ing: 'Inglês' };

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

let st = { perfil: null, pin: '', album: null, stats: padraoStats(), colecao: padraoColecao(), minutos: 0, som: true };
try {
  const salvo = JSON.parse(localStorage.getItem(K));
  if (salvo) {
    st = Object.assign(st, salvo);
    st.stats = Object.assign(padraoStats(), salvo.stats || {});
    st.colecao = Object.assign(padraoColecao(), salvo.colecao || {});
  }
} catch (e) {}

let materiaAtual = 'mat', fila = [], pos = 0, respondida = false, revisao = false;
let sessAc = 0, sessErr = [], painelLiberado = false, popT = null;

function salvar() { try { localStorage.setItem(K, JSON.stringify(st)); } catch (e) {} }

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

function totalAcertos() { return Object.values(st.stats).reduce((s, x) => s + x.a, 0); }

// Sons gerados pelo próprio navegador (sem arquivos externos)
let audioCtx = null;
function tom(freq, dur, tipo, vol, atraso) {
  if (!st.som) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    const t = audioCtx.currentTime + (atraso || 0);
    o.type = tipo || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(vol || 0.15, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(t); o.stop(t + dur);
  } catch (e) {}
}
function somAcerto() { tom(660, 0.12); tom(990, 0.18, 'sine', 0.15, 0.12); }
function somErro() { tom(220, 0.25, 'sawtooth', 0.07); tom(180, 0.3, 'sawtooth', 0.07, 0.18); }
function somFig() { [523, 659, 784, 1046].forEach((f, i) => tom(f, 0.25, 'triangle', 0.14, i * 0.12)); }

function raridade(i) {
  if (i % 4 === 3) return { n: 'LENDÁRIA', c: '#facc15' };
  if (i % 3 === 2) return { n: 'RARA', c: '#a78bfa' };
  return { n: 'COMUM', c: '#94a3b8' };
}

// Figurinha no mesmo estilo para todos os álbuns
function fig(item, idx, obtida) {
  if (!obtida) return '<div class="fig off"><div class="in"><div class="vis">❔</div><div class="nm">???</div></div></div>';
  const r = raridade(idx), poder = 60 + (idx * 7) % 35;
  return '<div class="fig"><div class="in"><span class="raz" style="color:' + r.c + '">' + r.n + '</span>' +
    '<div class="vis">' + (item[2] || item[0]) + '</div><div class="nm">' + item[1] + '</div>' +
    '<div class="pw"><i style="width:' + poder + '%"></i></div></div><div class="sh"></div></div>';
}

function atualizarMenu() {
  $('m-ola').textContent = 'Olá, ' + st.perfil.nome + '!';
  $('m-acertos').textContent = totalAcertos();
  $('m-min').textContent = st.minutos;
  $('btn-som').textContent = 'Som: ' + (st.som ? 'ligado' : 'desligado');
  if (st.album) {
    $('m-figs').textContent = st.colecao[st.album] + '/' + ALBUNS[st.album].itens.length;
    $('m-album-txt').textContent = 'Álbum atual: ' + ALBUNS[st.album].nome;
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
  const alb = ALBUNS[st.album], n = st.colecao[st.album];
  $('a-titulo').textContent = 'Álbum ' + alb.nome;
  $('a-count').textContent = 'Você tem ' + n + ' de ' + alb.itens.length + ' figurinhas.';
  $('a-grid').innerHTML = alb.itens.map((item, i) => fig(item, i, i < n)).join('');
}

function ganharFig() {
  if (!st.album) return null;
  const alb = ALBUNS[st.album], n = st.colecao[st.album];
  if (n >= alb.itens.length) return 'cheio';
  st.colecao[st.album]++;
  return { item: alb.itens[n], idx: n };
}

function mostrarPop(g) {
  $('pop-fig').innerHTML = fig(g.item, g.idx, true);
  $('pop').hidden = false;
  somFig();
  clearTimeout(popT);
  popT = setTimeout(() => { $('pop').hidden = true; }, 3000);
}

function iniciarPratica(m) {
  materiaAtual = m;
  fila = shuffle(Q[m].map((_, i) => ({ m: m, i: i })));
  pos = 0; sessAc = 0; sessErr = []; revisao = false;
  mostrar('t-pratica');
  mostrarPergunta();
}

function iniciarRevisao() {
  fila = sessErr.slice();
  pos = 0; sessAc = 0; sessErr = []; revisao = true;
  mostrar('t-pratica');
  mostrarPergunta();
}

function mostrarPergunta() {
  const it = fila[pos], q = Q[it.m][it.i];
  respondida = false;
  $('p-prog').textContent = (revisao ? 'Revisão · ' : '') + MATERIAS[it.m] + ' · ' + (pos + 1) + ' de ' + fila.length + ' · ' + q.t;
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
  $('sheet').classList.remove('on');
  window.scrollTo(0, 0);
}

function responder(i) {
  if (respondida) return;
  respondida = true;
  const it = fila[pos], q = Q[it.m][it.i];
  [...$('p-opcs').children].forEach((b, k) => {
    b.disabled = true;
    if (k === q.c) b.classList.add('ok2');
    else if (k === i) b.classList.add('no2');
  });

  let msg;
  if (i === q.c) {
    msg = 'Muito bem!';
    sessAc++;
    somAcerto();
    if (!revisao) {
      st.stats[it.m].a++;
      st.minutos++;
      if (totalAcertos() % 2 === 0) {
        const g = ganharFig();
        if (g === 'cheio') msg += ' Álbum completo! Escolha outro no menu.';
        else if (g) { mostrarPop(g); msg += ' Você ganhou uma figurinha!'; }
      }
    }
  } else {
    msg = 'Quase! A resposta certa está em verde.';
    somErro();
    sessErr.push(it);
    if (!revisao) st.stats[it.m].e++;
  }
  salvar();

  $('s-msg').textContent = msg;
  $('s-exp').textContent = q.e;
  $('p-prox').textContent = pos + 1 < fila.length ? 'Próxima pergunta' : 'Ver resultado';
  $('sheet').classList.add('on');
}

$('p-prox').onclick = () => {
  pos++;
  if (pos < fila.length) mostrarPergunta();
  else mostrarResumo();
};

function mostrarResumo() {
  $('r-ac').textContent = sessAc;
  $('r-er').textContent = sessErr.length;
  if (revisao) {
    $('r-txt').textContent = sessErr.length
      ? 'Ainda há questões para revisar. Continue até acertar todas!'
      : 'Você revisou tudo e acertou todas as questões!';
  } else {
    $('r-txt').textContent = sessErr.length
      ? 'Revise as questões que errou. É assim que a gente aprende de verdade.'
      : 'Parabéns, nenhuma resposta errada!';
  }
  $('btn-rev').hidden = !sessErr.length;
  $('btn-rev').textContent = 'Revisar os ' + sessErr.length + ' erros';
  atualizarMenu();
  mostrar('t-resumo');
}

$('btn-rev').onclick = iniciarRevisao;

$('form-cad').addEventListener('submit', e => {
  e.preventDefault();
  const pin = $('c-pin').value.trim();
  if (!/^\d{4}$/.test(pin)) { alert('A senha dos pais deve ter 4 números.'); return; }
  st.perfil = { nome: $('c-nome').value.trim(), idade: $('c-idade').value, serie: $('c-serie').value };
  st.pin = pin;
  salvar();
  if (st.album) { atualizarMenu(); mostrar('t-menu'); }
  else mostrar('t-albuns');
});

document.querySelectorAll('[data-album]').forEach(b => { b.onclick = () => escolherAlbum(b.dataset.album); });
document.querySelectorAll('[data-materia]').forEach(b => { b.onclick = () => iniciarPratica(b.dataset.materia); });

$('btn-album').onclick = () => { renderAlbum(); mostrar('t-album'); };
$('btn-trocar').onclick = () => mostrar('t-albuns');
$('btn-som').onclick = () => { st.som = !st.som; salvar(); atualizarMenu(); };

$('btn-pais').onclick = () => {
  painelLiberado = false;
  $('pin-in').value = '';
  renderPais();
  mostrar('t-pais');
};

function renderPais() {
  $('pin-area').hidden = painelLiberado;
  $('pa-painel').hidden = !painelLiberado;
  if (!painelLiberado) return;
  const nome = st.perfil.nome;
  let h = '<p class="topo">Criança: ' + nome + ' (' + st.perfil.idade + ' anos, ' + st.perfil.serie + 'º ano)' +
    (st.album ? ' · Álbum: ' + ALBUNS[st.album].nome : '') + '</p>';
  const alertas = [];
  Object.keys(MATERIAS).forEach(m => {
    const s = st.stats[m], t = s.a + s.e, taxa = t ? Math.round(s.a / t * 100) : 0;
    const cor = taxa >= 70 ? '#34d399' : '#f87171';
    h += '<p style="margin:14px 0 0;font-weight:700">' + MATERIAS[m] + ': ' + taxa + '% de acerto (' + s.a + ' acertos · ' + s.e + ' erros)</p>' +
      '<div class="barra"><i style="width:' + taxa + '%;background:' + cor + '"></i></div>';
    if (t >= 5 && taxa < 70) alertas.push(['bad', '⚠️ ' + nome + ' está abaixo da média em ' + MATERIAS[m] + ' (' + taxa + '%). Errou ' + s.e + ' questões: revise com ele.']);
    else if (t >= 5) alertas.push(['good', '✅ Bom desempenho em ' + MATERIAS[m] + ' (' + taxa + '%).']);
    else alertas.push(['info', 'ℹ️ Ainda há poucas respostas em ' + MATERIAS[m] + ' para avaliar.']);
  });
  h += '<p style="margin:18px 0 0;font-weight:700">Álbuns</p>';
  Object.keys(ALBUNS).forEach(k => {
    const n = st.colecao[k], tot = ALBUNS[k].itens.length, pct = Math.round(n / tot * 100);
    h += '<p style="margin:10px 0 0;font-size:14px">' + ALBUNS[k].nome + ': ' + n + ' de ' + tot + '</p>' +
      '<div class="barra"><i style="width:' + pct + '%;background:linear-gradient(90deg,#22d3ee,#e879f9)"></i></div>';
  });
  h += '<p style="margin:14px 0 0">Minutos de tempo de tela ganhos: <b>' + st.minutos + '</b></p>';
  h += alertas.map(a => '<div class="alerta ' + a[0] + '">' + a[1] + '</div>').join('');
  $('pa-dados').innerHTML = h;
}

$('form-pin').addEventListener('submit', e => {
  e.preventDefault();
  if ($('pin-in').value === st.pin) { painelLiberado = true; renderPais(); }
  else { alert('Senha incorreta.'); $('pin-in').value = ''; }
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
    if (b.dataset.ir === 't-menu') atualizarMenu();
    mostrar(b.dataset.ir);
  });
});

if (st.perfil) { atualizarMenu(); mostrar('t-menu'); }
else mostrar('t-boas');


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(() => {});
}
