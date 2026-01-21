
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav a");
    const currentPage = window.location.pathname.split("/").pop();
  
    links.forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  });
  

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });
  

  const backToTop = document.createElement("button");
  backToTop.innerText = "↑";
  backToTop.id = "backToTop";
  document.body.appendChild(backToTop);
  
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
  
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  

  const toggleTheme = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme) document.body.classList.add(savedTheme);
  
  toggleTheme?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : ""
    );
  });
  

  const images = document.querySelectorAll("img[data-src]");
  
  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imgObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imgObserver.observe(img));
  
 
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", e => {
      const requiredFields = form.querySelectorAll("[required]");
      let valid = true;
  
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }
      });
  
      if (!valid) {
        e.preventDefault();
        alert("Compila tutti i campi obbligatori.");
      }
    });
  });
  

  const animated = document.querySelectorAll(".animate");
  
  const animObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });
  
  animated.forEach(el => animObserver.observe(el));
  