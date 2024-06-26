const isIntersecting = entry => entry.isIntersecting;

const loadImage = (entries, observer) => {
  entries.filter(isIntersecting).forEach((entry) => {
    const container = entry.target.parentElement;
    const image = container.querySelector('img');
    const likeButton = container.querySelector('button');
    image.classList.add('fade-in');
    likeButton.classList.add('fade-in');
    const { src, alt } = image.dataset;
    image.src = src;
    image.alt = alt;
    observer.unobserve(container);
    likeButton.classList.remove('inactive');
  })
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}

const observer = new IntersectionObserver(loadImage, options);

export const registerImage = (image) => {
  observer.observe(image);
}