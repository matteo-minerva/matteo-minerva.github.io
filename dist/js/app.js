const navLinks = document.querySelectorAll(".nav-item");
const menuToggle = document.getElementById("navbarToggler");
const html = document.querySelector("html");
const body = document.querySelector("body");

const sections = document.querySelectorAll("section");

// Quando si clicca su un link il menù viene chiuso e si viene ricondotti ad esso
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth < 1200) {
      // Impedisce il redirect all'id
      // NOTA: facendo altrimenti il comportamento di default porterebbe a una view sfalsata dal collapse del menu
      e.preventDefault();
      const bsCollapse = new bootstrap.Collapse(menuToggle);
      bsCollapse.toggle();

      // Impedisce di scrollare quando il menu è aperto
      menuToggle.addEventListener("shown.bs.collapse", function (e) {
        html.classList.add("overflow-hidden");
        body.classList.add("overflow-hidden");
      });

      // Permette di scollare col menu chiuso
      menuToggle.addEventListener("hidden.bs.collapse", function (e) {
        html.classList.remove("overflow-hidden");
        body.classList.remove("overflow-hidden");

        // Porta la view all'elemento corretto
        sections.forEach((section) => {
          if (link.children[0].href.includes(section.id)) {
            section.scrollIntoView({
              behavior: "smooth",
            });
          }
        });
      });
    }
  });
});
