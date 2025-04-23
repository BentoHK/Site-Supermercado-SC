const carrossel = document.querySelector(".carrossel");
const tabloides = document.querySelectorAll(".tabloide");
const modal = document.getElementById("modal");
const imagemAmpliada = document.getElementById("imagem-ampliada");
const fecharBtn = document.querySelector(".fechar");

let indexAtual = 0;

function atualizarCarrossel() {
  const larguraItem = tabloides[0].offsetWidth + 40;
  const escalaAtiva = 1.1;
  const larguraEscalada = larguraItem * escalaAtiva;
  const containerWidth = document.querySelector(".carrossel-container").offsetWidth;
  const deslocamento = (containerWidth - larguraEscalada) / 2 - indexAtual * larguraItem;

  carrossel.style.transform = `translateX(${deslocamento}px)`;

  tabloides.forEach((img, index) => {
    img.classList.remove("ativa", "visivel");
    if (index === indexAtual) {
      img.classList.add("ativa");
    } else if (
      index === indexAtual - 1 ||
      index === indexAtual + 1 ||
      (indexAtual === 0 && index === tabloides.length - 1) ||
      (indexAtual === tabloides.length - 1 && index === 0)
    ) {
      img.classList.add("visivel");
    }
  });
}

function abrirModal(src) {
  imagemAmpliada.src = src;
  modal.style.display = "flex";
}

function fecharModal() {
  modal.style.display = "none";
}

function avancarCarrossel(direcao) {
  indexAtual = (indexAtual + direcao + tabloides.length) % tabloides.length;
  atualizarCarrossel();
}

document.querySelector(".seta.direita").addEventListener("click", () => avancarCarrossel(1));
document.querySelector(".seta.esquerda").addEventListener("click", () => avancarCarrossel(-1));

tabloides.forEach((img) => {
  img.addEventListener("click", () => abrirModal(img.getAttribute("src")));
});

fecharBtn.addEventListener("click", fecharModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) fecharModal();
});

window.addEventListener("load", atualizarCarrossel);
window.addEventListener("resize", atualizarCarrossel);

let startX = 0;
carrossel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
carrossel.addEventListener("touchend", (e) => {
  const diferenca = startX - e.changedTouches[0].clientX;
  if (Math.abs(diferenca) > 50) {
    avancarCarrossel(diferenca > 0 ? 1 : -1);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") avancarCarrossel(1);
  else if (e.key === "ArrowLeft") avancarCarrossel(-1);
});