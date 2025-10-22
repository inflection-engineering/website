// Initialize all carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
});

function initCarousel() {
  const carouselItems = document.querySelectorAll('.carousel-item');
  if (carouselItems.length === 0) return;

  initCarouselNavigation();
  initCarouselActiveState(carouselItems);
  initCarouselArrows(carouselItems);
}

// Carousel navigation - horizontal-only scrolling clicks on nav links
function initCarouselNavigation() {
  const navButtons = document.querySelectorAll('a[href^="#"]');

  navButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('href')?.substring(1);
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement && targetElement.parentElement) {
          const carousel = targetElement.parentElement;
          carousel.scrollTo({
            left: targetElement.offsetLeft,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Carousel active state - update nav buttons based on visible item
function initCarouselActiveState(carouselItems: NodeListOf<Element>) {
  const navButtons = document.querySelectorAll('a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const activeId = entry.target.id;

          navButtons.forEach((button) => {
            const targetId = button.getAttribute('href')?.substring(1);
            if (targetId === activeId) {
              button.classList.add('btn-primary');
            } else {
              button.classList.remove('btn-primary');
            }
          });
        }
      });
    },
    {
      root: null,
      threshold: 0.5,
    }
  );

  carouselItems.forEach((item) => observer.observe(item));
}

// Carousel arrow buttons - prev/next with wrapping
function initCarouselArrows(carouselItems: NodeListOf<Element>) {
  const prevButton = document.getElementById('carousel-prev');
  const nextButton = document.getElementById('carousel-next');

  if (!prevButton || !nextButton || carouselItems.length === 0) return;

  const getActiveIndex = () => {
    for (let i = 0; i < carouselItems.length; i++) {
      const rect = carouselItems[i].getBoundingClientRect();
      const viewportCenter = window.innerWidth / 2;
      if (rect.left < viewportCenter && rect.right > viewportCenter) {
        return i;
      }
    }
    return 0;
  };

  const scrollToItem = (index: number) => {
    const item = carouselItems[index] as HTMLElement;
    if (item && item.parentElement) {
      const carousel = item.parentElement;
      carousel.scrollTo({
        left: item.offsetLeft,
        behavior: 'smooth'
      });
    }
  };

  prevButton.addEventListener('click', () => {
    const currentIndex = getActiveIndex();
    const prevIndex = currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1;
    scrollToItem(prevIndex);
  });

  nextButton.addEventListener('click', () => {
    const currentIndex = getActiveIndex();
    const nextIndex = currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1;
    scrollToItem(nextIndex);
  });
}
