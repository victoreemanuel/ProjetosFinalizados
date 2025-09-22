let pessoas = [];
let editarId = null;

const form = document.getElementById("formCadastro");
const listaVazia = document.getElementById("listaVazia");
const listaCheia = document.getElementById("listaCheia");
const pessoasContainer = document.getElementById("pessoasContainer");
const contadorSpan = document.getElementById("contador");
const buscaInput = document.getElementById("buscaInput");
const btnCadastrar = document.getElementById("btnCadastrar");

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const nascimento = document.getElementById("nascimento").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nome || !cpf || !nascimento || !email) return;

  const [dia, mes, ano] = nascimento.split('/');
  const dataFormatada = `${ano}-${mes}-${dia}`;

  const novaPessoa = {
    nome,
    cpf,
    dataNascimento: dataFormatada,
    email
  };

  try {
    const response = await fetch("http://localhost:8080/pessoa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novaPessoa)
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      if (errorMessage.includes("CPF inválido")) {
        alert("CPF inválido. Por favor, digite um CPF válido.");
        document.getElementById("cpf").value = "";  
        return;
      }
      throw new Error(errorMessage);
    }

    const pessoaCadastrada = await response.json();
    pessoas.push(pessoaCadastrada);
    atualizarLista();

  } catch (error) {
    console.error("Erro ao cadastrar pessoa:", error);
  }

  form.reset();
  btnCadastrar.textContent = "Cadastrar Pessoa";
  editarId = null;
});

async function carregarPessoas() {
  try {
    const response = await fetch("http://localhost:8080/pessoa");
    if (!response.ok) throw new Error("Erro ao buscar pessoas");
    pessoas = await response.json();
    atualizarLista();
  } catch (error) {
    console.error("Erro ao carregar pessoas:", error);
  }
}

function atualizarLista() {
  if (pessoas.length === 0) {
    listaVazia.style.display = "block";
    listaCheia.style.display = "none";
    contadorSpan.textContent = "0";
    pessoasContainer.innerHTML = "";
    return;
  }

  listaVazia.style.display = "none";
  listaCheia.style.display = "block";
  contadorSpan.textContent = pessoas.length;

  pessoasContainer.innerHTML = "";

  pessoas.forEach(pessoa => {
    const card = document.createElement("div");
    card.className = "card-pessoa";

    card.innerHTML = `
      <div class="pessoa-info">
        <div class="top-row">
          <div class="nome">${escapeHtml(pessoa.nome)}</div>
          <div class="id-pill">ID: ${pessoa.id}</div>
        </div>
        <div class="info-row">
          <div class="cpf">CPF: ${escapeHtml(pessoa.cpf)}</div>
          <div class="nasc">Nascimento: ${escapeHtml(pessoa.dataNascimento)}</div>
          <div class="email">E-mail: ${escapeHtml(pessoa.email)}</div>
        </div>
      </div>

      <div class="acoes">
        <div class="icon-btn" title="Editar" data-id="${pessoa.id}" data-action="editar">
          <img src="img/lapis.png" alt="Editar">
        </div>
        <div class="icon-btn" title="Excluir" data-id="${pessoa.id}" data-action="excluir">
          <img src="img/lixeira.png" alt="Excluir">
        </div>
      </div>
    `;

    pessoasContainer.appendChild(card);
  });
}

pessoasContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const id = Number(btn.getAttribute("data-id"));
  const action = btn.getAttribute("data-action");

  if (action === "excluir") {
    pessoas = pessoas.filter(p => p.id !== id);
    atualizarLista();
  } else if (action === "editar") {
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return;

    document.getElementById("nome").value = pessoa.nome;
    document.getElementById("cpf").value = pessoa.cpf;
    document.getElementById("nascimento").value = pessoa.dataNascimento;
    document.getElementById("email").value = pessoa.email;

    pessoas = pessoas.filter(p => p.id !== id);
    editarId = pessoa.id;
    btnCadastrar.textContent = "Salvar Alterações";
    atualizarLista();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

buscaInput.addEventListener("input", () => {
  const termo = buscaInput.value.trim().toLowerCase();
  document.querySelectorAll(".card-pessoa").forEach(card => {
    const texto = card.innerText.toLowerCase();
    card.style.display = texto.includes(termo) ? "flex" : "none";
  });
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const cpfInput = document.getElementById("cpf");
cpfInput.addEventListener("input", () => {
  let v = cpfInput.value.replace(/\D/g, ""); 
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  cpfInput.value = v;
});

const nascInput = document.getElementById("nascimento");
nascInput.addEventListener("input", () => {
  let v = nascInput.value.replace(/\D/g, "");
  v = v.replace(/(\d{2})(\d)/, "$1/$2");
  v = v.replace(/(\d{2})(\d)/, "$1/$2");
  v = v.replace(/(\d{4})(\d)/, "$1");
  nascInput.value = v;
});

window.addEventListener("load", carregarPessoas);
