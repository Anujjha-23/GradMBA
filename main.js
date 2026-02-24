/* =============================================
   MBA India - Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Active Nav Link ---- */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ---- Hamburger Menu ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      }
    });
  }

  /* ---- Scroll Animations ---- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.aos').forEach(el => observer.observe(el));

  /* ---- Carousel ---- */
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = track.querySelectorAll('.college-card');
    const visibleCount = () => window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
    const cardWidth = () => 300 + 24;

    const updateCarousel = () => {
      const maxIndex = Math.max(0, cards.length - visibleCount());
      currentIndex = Math.min(currentIndex, maxIndex);
      track.style.transform = `translateX(-${currentIndex * cardWidth()}px)`;
    };

    nextBtn.addEventListener('click', () => {
      const maxIndex = Math.max(0, cards.length - visibleCount());
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      const maxIndex = Math.max(0, cards.length - visibleCount());
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    });

    // Auto-play
    let autoPlay = setInterval(() => {
      const maxIndex = Math.max(0, cards.length - visibleCount());
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    }, 3500);

    track.closest('.carousel-wrapper').addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.closest('.carousel-wrapper').addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => {
        const maxIndex = Math.max(0, cards.length - visibleCount());
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
      }, 3500);
    });

    window.addEventListener('resize', updateCarousel);
  }

  /* ---- Filter Buttons (Colleges Page) ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const collegeCards = document.querySelectorAll('.college-list-card');

  if (filterBtns.length && collegeCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        collegeCards.forEach(card => {
          if (filter === 'all' || card.dataset.type === filter) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }

  /* ---- Contact Form ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const successMsg = document.querySelector('.success-msg');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        if (successMsg) successMsg.classList.add('show');
        contactForm.reset();
        setTimeout(() => successMsg && successMsg.classList.remove('show'), 5000);
      }, 1500);
    });
  }

  /* ---- Navbar scroll shadow ---- */
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 20
        ? '0 4px 20px rgba(10,36,99,0.15)'
        : '0 2px 8px rgba(10,36,99,0.08)';
    }
  });

  /* ---- Counter animation ---- */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.count;
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current).toLocaleString('en-IN') + (el.dataset.suffix || '');
          if (current >= target) clearInterval(timer);
        }, 16);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

  /* ---- Ticker duplicate for seamless loop ---- */
  const tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack) {
    const clone = tickerTrack.innerHTML;
    tickerTrack.innerHTML += clone;
  }

});
