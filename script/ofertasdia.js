const images = document.querySelectorAll(".fundo_ofertas img");
const overlay = document.querySelector(".overlay");
const enlargedImg = document.querySelector(".enlarged-img");
const closeBtn = document.querySelector(".close-btn");

// Função para abrir o overlay
images.forEach((img) => {
  img.addEventListener("click", () => {
    enlargedImg.src = img.src;
    overlay.classList.remove("hide"); // garante que a classe de saída não fique
    overlay.classList.add("show");
    overlay.style.display = "flex"; // garante que aparece
    document.body.style.overflow = "hidden";
  });
});

// Função para fechar o overlay com animação
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("show");
  overlay.classList.add("hide");
  
  // Espera a animação de fadeOut terminar (300ms) antes de esconder
  setTimeout(() => {
    overlay.style.display = "none";
    overlay.classList.remove("hide");
    enlargedImg.src = ""; // Limpa a imagem ampliada
    document.body.style.overflow = "auto";
  }, 300); // TEMPO IGUAL ao tempo da animação CSS (0.3s = 300ms)
});
