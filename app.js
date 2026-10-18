const K = 'aprender-brincando-demo-v1';
const FIG = ['🦁','🐯','🦊','🐼','🐸','🦄','🐙','🦖','🚀','⭐','🌈','🎈','🍭','⚽','🎨','🏆','🦋','🐬','🌵','🍕'];

// Banco de demonstração: 20 questões de matemática do 4º ano (o banco completo está no CSV)
const Q = [
  {t:'Adição', p:'Quanto é 345 + 278?', o:['613','623','523','633'], c:1, e:'Some por partes: 300 + 200 = 500, 40 + 70 = 110 e 5 + 8 = 13. Total: 623.'},
  {t:'Subtração', p:'Quanto é 900 - 437?', o:['463','473','563','367'], c:0, e:'900 - 400 = 500 e depois 500 - 37 = 463.'},
  {t:'Multiplicação', p:'Quanto é 6 x 7?', o:['42','36','48','56'], c:0, e:'Seis grupos de 7 ou sete grupos de 6 dão 42.'},
  {t:'Multiplicação', p:'Quanto é 8 x 9?', o:['63','72','81','56'], c:1, e:'8 x 10 = 80, menos 8 = 72.'},
  {t:'Divisão', p:'Quanto é 56 ÷ 8?', o:['6','7','8','9'], c:1, e:'Quantas vezes o 8 cabe em 56? Sete vezes, pois 8 x 7 = 56.'},
  {t:'Divisão', p:'Quanto é 48 ÷ 6?', o:['7','9','8','6'], c:2, e:'Como 6 x 8 = 48, o resultado é 8.'},
  {t:'Sequência', p:'Qual número vem depois de 1.299?', o:['1.300','1.290','1.399','1.209'], c:0, e:'Somando 1 a 1.299 chegamos a 1.300.'},
  {t:'Valor posicional', p:'Qual número tem 3 centenas, 4 dezenas e 2 unidades?', o:['342','324','432','243'], c:0, e:'3 centenas são 300, 4 dezenas são 40 e 2 unidades são 2. Total: 342.'},
  {t:'Frações', p:'Quanto é metade de 18?', o:['6','9','12','8'], c:1, e:'Metade é dividir por 2: 18 ÷ 2 = 9.'},
  {t:'Frações', p:'Quanto é um quarto de 20?', o:['4','5','10','8'], c:1, e:'Um quarto é dividir por 4: 20 ÷ 4 = 5.'},
  {t:'Frações', p:'Uma pizza tem 8 fatias iguais. Comi 4. Que fração eu comi?', o:['1/4','2/8','4/8','8/4'], c:2, e:'Comi 4 de 8 fatias: 4/8, que é metade da pizza.'},
  {t:'Dinheiro', p:'Um lápis custa R$ 2,50. Quanto custam 4 lápis?', o:['R$ 8,00','R$ 10,00','R$ 12,00','R$ 6,50'], c:1, e:'Dois lápis custam 5,00. Quatro lápis custam 10,00.'},
  {t:'Dinheiro', p:'Uma caneta custa R$ 3,75. Paguei com R$ 5,00. Qual o troco?', o:['R$ 1,25','R$ 2,25','R$ 1,75','R$ 1,15'], c:0, e:'5,00 - 3,75 = 1,25.'},
  {t:'Medidas', p:'Quantos centímetros há em 1 metro?', o:['10','100','1.000','50'], c:1, e:'Um metro tem 100 centímetros.'},
  {t:'Medidas de tempo', p:'Quantos minutos há em meia hora?', o:['15','30','60','45'], c:1, e:'Uma hora tem 60 minutos, e meia hora tem 30.'},
  {t:'Medidas de tempo', p:'Quantos dias há em uma semana?', o:['5','6','7','8'], c:2, e:'A semana tem 7 dias: de domingo a sábado.'},
  {t:'Geometria', p:'Quantos lados tem um triângulo?', o:['2','3','4','5'], c:1, e:'Triângulo tem três lados e três ângulos.'},
  {t:'Geometria', p:'Qual figura tem 4 lados iguais e 4 ângulos retos?', o:['Triângulo','Círculo','Quadrado','Pentágono'], c:2, e:'O quadrado tem quatro lados iguais e quatro cantos retos.'},
  {t:'Perímetro', p:'Qual é o perímetro de um retângulo de 5 cm por 3 cm?', o:['8 cm','15 cm','16 cm','10 cm'], c:2, e:'Some todos os lados: 5 + 3 + 5 + 3 = 16 cm.'},
  {t:'Problemas', p:'Carla tinha 35 figurinhas e ganhou 18. Quantas tem agora?', o:['43','53','47','63'], c:1, e:'35 + 18 = 53 figurinhas.'}
];

let st = { perfil: null, pin: '', acertos: 0, erros: 0, minutos: 0, figs: 0 };
try {
  const salvo = JSON.parse(localStorage.getItem(K));
  if (salvo) st = Object.assign(st, salvo);
} catch (e) {}

const $ = id => document.getElementById(id);
let sessao = [], pos = 0, respondida = false, painelLiberado = false;

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

function atualizarMenu() {
  $('m-ola').textContent = 'Oi, ' + st.perfil.nome + '!';
  $('m-acertos').textContent = st.acertos;
  $('m-figs').textContent = st.figs + '/' + FIG.length;
  $('m-min').textContent = st.minutos;
}

function renderAlbum() {
  const g = $('a-grid');
  g.innerHTML = '';
  for (let i = 0; i < FIG.length; i++) {
    const d = document.createElement('div');
    d.className = 'slot' + (i < st.figs ? ' got' : '');
    d.textContent = i < st.figs ? FIG[i] : '?';
    g.appendChild(d);
  }
  $('a-count').textContent = 'Você tem ' + st.figs + ' de ' + FIG.length + ' figurinhas.';
}

function renderPais() {
  $('pin-area').hidden = painelLiberado;
  $('pa-painel').hidden = !painelLiberado;
  if (!painelLiberado) return;
  const total = st.acertos + st.erros;
  const taxa = total ? Math.round(st.acertos / total * 100) : 0;
  $('pa-dados').innerHTML = '';
  [
    'Criança: ' + st.perfil.nome + ' (' + st.perfil.idade + ' anos, ' + st.perfil.serie + 'º ano)',
    'Acertos: ' + st.acertos,
    'Erros: ' + st.erros,
    'Taxa de acerto: ' + taxa + '%',
    'Figurinhas conquistadas: ' + st.figs + ' de ' + FIG.length,
    'Minutos de tempo de tela ganhos com a prática: ' + st.minutos
  ].forEach(linha => {
    const p = document.createElement('p');
    p.textContent = linha;
    p.style.margin = '8px 0';
    $('pa-dados').appendChild(p);
  });
}

function iniciarPratica() {
  sessao = shuffle(Q.map((_, i) => i)).slice(0, 10);
  pos = 0;
  mostrar('t-pratica');
  mostrarPergunta();
}

function mostrarPergunta() {
  const q = Q[sessao[pos]];
  respondida = false;
  $('p-prog').textContent = 'Questão ' + (pos + 1) + ' de ' + sessao.length + ' · ' + q.t;
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

function responder(i) {
  if (respondida) return;
  respondida = true;
  const q = Q[sessao[pos]];
  [...$('p-opcs').children].forEach((b, k) => {
    b.disabled = true;
    if (k === q.c) b.classList.add('ok');
    else if (k === i) b.classList.add('no');
  });

  const fb = $('p-fb');
  fb.hidden = false;
  fb.innerHTML = '';
  const acertou = i === q.c;
  const msg = document.createElement('p');
  msg.className = 'msg';
  msg.textContent = acertou ? 'Muito bem!' : 'Quase! A resposta certa está em verde.';
  const exp = document.createElement('div');
  exp.className = 'exp';
  exp.textContent = q.e;
  fb.append(msg, exp);

  if (acertou) {
    st.acertos++;
    st.minutos++;
    if (st.acertos % 2 === 0 && st.figs < FIG.length) {
      st.figs++;
      msg.textContent += ' Você ganhou a figurinha ' + FIG[st.figs - 1] + '!';
    }
  } else {
    st.erros++;
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
  atualizarMenu();
  mostrar('t-menu');
});

$('btn-mat').onclick = iniciarPratica;

$('btn-album').onclick = () => {
  renderAlbum();
  mostrar('t-album');
};

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
  if (!confirm('Zerar acertos, erros, figurinhas e minutos?')) return;
  st.acertos = 0; st.erros = 0; st.minutos = 0; st.figs = 0;
  salvar();
  renderPais();
};

document.querySelectorAll('[data-ir]').forEach(b => {
  b.addEventListener('click', () => {
    const alvo = b.dataset.ir;
    if (alvo === 't-menu') atualizarMenu();
    if (alvo === 't-album') renderAlbum();
    if (alvo === 't-cadastro') mostrar(alvo);
    else mostrar(alvo);
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
