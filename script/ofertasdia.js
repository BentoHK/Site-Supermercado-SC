const images = document.querySelectorAll(".fundo_ofertas img");
const overlay = document.querySelector(".overlay");
const enlargedImg = document.querySelector(".enlarged-img");
const closeBtn = document.querySelector(".close-btn");

// Adiciona o evento de clique nas imagens
images.forEach((img) => {
  img.addEventListener("click", () => {
    // Mostrar o overlay e a imagem ampliada
    overlay.classList.add("show");
    enlargedImg.src = img.src; // Atualiza a imagem ampliada
    document.body.style.overflow = "hidden"; // Desabilita o scroll da página
  });
});

// Função para fechar a imagem ampliada
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("show");
  enlargedImg.src = ""; // Limpa a imagem ampliada
  document.body.style.overflow = "auto"; // Restaura o scroll da página
});
