window.addEventListener("scroll", function () {
    const img = document.querySelector(".parallax-img");
    if (!img) return;
    let offset = window.scrollY * 0.2;
    img.style.transform = `translateY(${offset}px)`;
  });
  

//   window.addEventListener("scroll", () => {
//     const heading = document.querySelector(".hero h1");
//     const offset = window.scrollY * 0.2;
//     heading.style.transform = `translateY(${offset}px)`;
//   });



  window.addEventListener("scroll", () => {
    const elements = document.querySelectorAll(".parallax-text");
    const scrollY = window.scrollY;

    elements.forEach(el => {
      const speed = parseFloat(el.getAttribute("data-speed"));
      el.style.transform = `translateY(${scrollY * -speed}px)`;
    });
  });


  
  const expCards = document.querySelectorAll('.exp-card');

  // Назначаем направление и скорость
  expCards.forEach((card, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    card.dataset.parallaxDir = direction;
    card.dataset.parallaxSpeed = 0.05 + index * 0.01; // Мягкий параллакс
  });
  
  // Следим за теми, кто в поле зрения
  const activeCards = new Set();
  
  const expObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeCards.add(entry.target);
      } else {
        activeCards.delete(entry.target);
      }
    });
  }, { threshold: 0.4 }); // Больше — только почти полностью видимые
  
  expCards.forEach(card => expObserver.observe(card));
  
  // Параллакс только для видимых и в пределах maxOffset
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
  
    activeCards.forEach(card => {
      const dir = parseInt(card.dataset.parallaxDir);
      const speed = parseFloat(card.dataset.parallaxSpeed);
      let offset = scrollY * speed * dir;
  
      const maxOffset = 40; // максимум пикселей
      if (offset > maxOffset) offset = maxOffset;
      if (offset < -maxOffset) offset = -maxOffset;
  
      card.style.transform = `translateX(${offset}px)`;
    });
  });
  