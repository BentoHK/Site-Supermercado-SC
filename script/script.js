let count = 1;
document.getElementById("radio1").checked = true;

function nextImage() {
  count++;
  if (count > 4) {
    count = 1;
  }

  document.getElementById("radio" + count).checked = true;
}

setInterval(function () {
  nextImage();
}, 7000);

document.addEventListener("DOMContentLoaded", function () {
  let index = 1; // Começa no primeiro slide
  const totalSlides = 4; // Número total de slides

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  function showSlide(n) {
    // Garantir que o índice fique dentro do intervalo válido
    if (n > totalSlides) {
      index = 1;
    } else if (n < 1) {
      index = totalSlides;
    } else {
      index = n;
    }

    // Simula um clique no botão de rádio correspondente
    document.getElementById("radio" + index).checked = true;
  }

  prevButton.addEventListener("click", function () {
    showSlide(index - 1);
  });

  nextButton.addEventListener("click", function () {
    showSlide(index + 1);
  });
});
