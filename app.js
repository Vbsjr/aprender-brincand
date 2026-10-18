const K = 'aprender-brincando-v2';
const FIG = ['🦁','🐯','🦊','🐼','🐸','🦄','🐙','🦖','🚀','⭐','🌈','🎈','🍭','⚽','🎨','🏆','🦋','🐬','🌵','🍕'];
const MATERIAS = {
  mat: { nome: 'Matemática' },
  por: { nome: 'Português' },
  ing: { nome: 'Inglês' }
};

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
    {t:'Vocabulário', p:'What is gato in English?', o:['dog','cat','bird','fish'], c:1, e:'Gato é cat.'},
    {t:'Cores', p:'What color is azul?', o:['red','green','blue','yellow'], c:2, e:'Azul é blue.'},
    {t:'Números', p:'How do you say três in English?', o:['two','three','four','five'], c:1, e:'Três é three.'},
    {t:'Verbo to be', p:'I ___ a student.', o:['am','is','are','be'], c:0, e:'Use a forma am com I.'},
    {t:'Vocabulário', p:'What is casa in English?', o:['house','horse','hour','hole'], c:0, e:'Casa é house.'},
    {t:'Saudações', p:'Good morning means:', o:['Boa noite','Bom dia','Boa tarde','Tchau'], c:1, e:'Good morning significa Bom dia.'},
    {t:'Verbos', p:'She ___ a book.', o:['read','reads','reading','readed'], c:1, e:'Com he, she ou it, acrescentamos -s ao verbo.'},
    {t:'Frutas', p:'What is maçã?', o:['banana','orange','apple','grape'], c:2, e:'Maçã é apple.'},
    {t:'Dias', p:'Which day comes after Monday?', o:['Sunday','Tuesday','Friday','Wednesday'], c:1, e:'Depois de Monday vem Tuesday.'},
    {t:'Plural', p:'I have two ___.', o:['cat','cats','catss','cates'], c:1, e:'Para o plural, geralmente acrescentamos -s.'}
  ]
};

let st = { perfil: null, pin: '', stats: { mat:{a:0,e:0}, por:{a:0,e:0}, ing:{a:0,e:0} }, minutos: 0, figs: 0 };
try {
  const salvo = JSON.parse(localStorage.getItem(K));
  if (salvo) {
    st = Object.assign(st, salvo);
    st.stats = Object.assign({ mat:{a:0,e:0}, por:{a:0,e:0}, ing:{a:0,e:0} }, salvo.stats || {});
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
  const box = $('pa-dados');
  box.innerHTML = '';
  const linhas = [
    'Criança: ' + st.perfil.nome + ' (' + st.perfil.idade + ' anos, ' + st.perfil.serie + 'º ano)'
  ];
  Object.keys(MATERIAS).forEach(m => {
    const s = st.stats[m];
    const total = s.a + s.e;
    const taxa = total ? Math.round(s.a / total * 100) : 0;
    linhas.push(MATERIAS[m].nome + ': ' + s.a + ' acertos, ' + s.e + ' erros (' + taxa + '% de acerto)');
  });
  linhas.push('Figurinhas conquistadas: ' + st.figs + ' de ' + FIG.length);
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

  st.minutos += acertou ? 1 : 0;
  if (acertou) {
    st.stats[materiaAtual].a++;
    if (totalAcertos() % 2 === 0 && st.figs < FIG.length) {
      st.figs++;
      msg.textContent += ' Você ganhou a figurinha ' + FIG[st.figs - 1] + '!';
    }
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
  atualizarMenu();
  mostrar('t-menu');
});

document.querySelectorAll('[data-materia]').forEach(b => {
  b.onclick = () => iniciarPratica(b.dataset.materia);
});

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
  st.stats = { mat:{a:0,e:0}, por:{a:0,e:0}, ing:{a:0,e:0} };
  st.minutos = 0;
  st.figs = 0;
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
