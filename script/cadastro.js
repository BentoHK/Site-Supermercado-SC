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
