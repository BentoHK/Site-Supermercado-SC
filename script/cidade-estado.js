// Popula os estados
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then((response) => response.json())
  .then((estados) => {
    let estadoSelect = document.getElementById("estado");
    estados.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena por nome
    estados.forEach((estado) => {
      let option = document.createElement("option");
      option.value = estado.sigla; // Pega a sigla correta
      option.textContent = estado.nome;
      estadoSelect.appendChild(option);
    });
  })
  .catch((error) => console.error("Erro ao buscar estados:", error));

// Popula as cidades quando um estado é selecionado
document.getElementById("estado").addEventListener("change", function () {
  let estadoSelecionado = this.value;
  let cidadeSelect = document.getElementById("cidade");
  cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';

  if (!estadoSelecionado) {
    cidadeSelect.disabled = true;
    return;
  }

  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
  )
    .then((response) => response.json())
    .then((cidades) => {
      cidades.forEach((cidade) => {
        let option = document.createElement("option");
        option.value = cidade.nome;
        option.textContent = cidade.nome;
        cidadeSelect.appendChild(option);
      });
      cidadeSelect.disabled = false;
    })
    .catch((error) => console.error("Erro ao buscar cidades:", error));
});
