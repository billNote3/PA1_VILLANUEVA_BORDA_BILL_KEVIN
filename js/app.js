"use strict";
document.addEventListener("DOMContentLoaded", () => {

  /*Navbar que cambia al hacer scroll + botón "volver arriba" */
  const navbar = document.getElementById("navbar");
  const toTop = document.getElementById("top");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    toTop.classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* Cierra el menú móvil al elegir una opción */
  const menu = document.getElementById("menu");
  document.querySelectorAll("#menu .nav-link").forEach(link =>
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    })
  );

  /* Aparición progresiva con IntersectionObserver */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  /* Filtro de destinos por categoría */
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".card-wrap");
  filters.forEach(btn => btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.filter;
    cards.forEach(card => {
      const show = cat === "todos" || card.dataset.category === cat;
      if (show) {
        card.classList.remove("d-none");
        requestAnimationFrame(() => card.classList.remove("out"));
      } else {
        card.classList.add("out");
        setTimeout(() => { if (card.classList.contains("out")) card.classList.add("d-none"); }, 350);
      }
    });
  }));

  
  const modal = new bootstrap.Modal(document.getElementById("modalLugar"));
  document.querySelectorAll(".btn-link-elegant").forEach(btn => btn.addEventListener("click", () => {
    const { title, tag, text, tip } = btn.dataset;
    document.getElementById("modalTitulo").textContent = title;
    document.getElementById("modalTag").textContent = tag;
    document.getElementById("modalTexto").textContent = text;
    document.getElementById("modalTip").textContent = tip;
    modal.show();
  }));

  /* Validación del formulario */
  const form = document.getElementById("form");
  const ok = document.getElementById("ok");
  form.addEventListener("submit", e => {
    e.preventDefault();
    ok.classList.add("d-none");
    if (form.checkValidity()) {
      ok.classList.remove("d-none");
      form.reset();
      form.classList.remove("was-validated");
    } else {
      form.classList.add("was-validated");
    }
  });
});
