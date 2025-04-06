// Inicio codigo que preenche campo de cpf

const cpfInput = document.getElementById("cpf");
if (cpfInput) {
  cpfInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.replace(/^(\d{3})/, "$1.");
    if (value.length > 6) value = value.replace(/^(\d{3})\.(\d{3})/, "$1.$2.");
    if (value.length > 9)
      value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, "$1.$2.$3-");
    e.target.value = value.substring(0, 14);
  });
}

// Fim codigo que preenche campo de cpf

// Inicio codigo que preenche campo de telefone

document.getElementById("telefone").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 2) value = value.replace(/^(\d{2})/, "($1) ");
  if (value.length > 7) value = value.replace(/^(\(\d{2}\)) (\d{5})/, "$1 $2-");

  e.target.value = value.substring(0, 15);
});

// Fim codigo que preenche campo de telefone

const cepInput = document.getElementById("cep");

if (cepInput) {
  cepInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2"); // Insere o traço após o 5º dígito
    }

    e.target.value = value.substring(0, 9); // Limita a 9 caracteres (incluindo o "-")
  });
}

function carregarEstados() {
  fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
  )
    .then((res) => res.json())
    .then((estados) => {
      const estadoSelect = document.getElementById("estado");
      estados.forEach((estado) => {
        const option = document.createElement("option");
        option.value = estado.sigla;
        option.textContent = estado.nome;
        estadoSelect.appendChild(option);
      });
    });
}

function carregarCidades(uf) {
  const cidadeSelect = document.getElementById("cidade");
  cidadeSelect.innerHTML = '<option value="">Carregando...</option>';

  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  )
    .then((res) => res.json())
    .then((cidades) => {
      cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
      cidades.forEach((cidade) => {
        const option = document.createElement("option");
        option.value = cidade.nome;
        option.textContent = cidade.nome;
        cidadeSelect.appendChild(option);
      });
    });
}

function buscarCep() {
  const cep = document.getElementById("cep").value.replace(/\D/g, "");
  if (cep.length !== 8) {
    alert("CEP inválido. Deve conter 8 dígitos.");
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((data) => {
      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      document.getElementById("endereco").value = data.logradouro;
      document.getElementById("estado").value = data.uf;
      document.getElementById("estado").dispatchEvent(new Event("change"));

      const cidadeSelect = document.getElementById("cidade");
      const selecionarCidade = setInterval(() => {
        const option = Array.from(cidadeSelect.options).find(
          (opt) => opt.value === data.localidade
        );
        if (option) {
          cidadeSelect.value = data.localidade;
          clearInterval(selecionarCidade);
        }
      }, 100);
    })
    .catch(() => alert("Erro ao consultar o CEP."));
}

document.getElementById("estado").addEventListener("change", function () {
  const uf = this.value;
  if (uf) carregarCidades(uf);
});

document.getElementById("cep").addEventListener("blur", buscarCep);

carregarEstados();
