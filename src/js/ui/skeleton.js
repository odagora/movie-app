function addLoadingMoviesSkeleton(container, quantity) {
  const elementsList = [];
  const movieContainer = document.createElement('div');
  const movieImage = document.createElement('img');

  movieContainer.classList.add('movie-container');
  movieImage.classList.add('movie-img', 'loading-skeleton');
  movieContainer.id = 'loading-screen';
  movieContainer.appendChild(movieImage);

  for (let i = 0; i < quantity; i++) {
    elementsList.push(movieContainer.cloneNode(true));
  }
  container.append(...elementsList);
}

function addLoadingCategoriesSkeleton(container, quantity) {
  const elementsList = [];
  const categoryContainer = document.createElement('div');
  const categoryTitle = document.createElement('h3');

  categoryContainer.classList.add('category-container');
  categoryTitle.classList.add('skeleton-text', 'loading-skeleton');
  categoryContainer.id = 'loading-screen';
  categoryContainer.appendChild(categoryTitle);

  for (let i = 0; i < quantity; i++) {
    elementsList.push(categoryContainer.cloneNode(true));
  }

  container.append(...elementsList);
}

function addLoadingMovieDetailSkeleton(container, quantity) {
  const elementsList = [];
  const textContainer = document.createElement('div');
  textContainer.classList.add('skeleton-desc', 'loading-skeleton');
  textContainer.id = 'loading-screen';

  for (let i = 0; i < quantity; i++) {
    elementsList.push(textContainer.cloneNode(true));
  }

  container.append(...elementsList)
}

function removeLoadingSkeletonContainer(container) {
  const nodeList = container.childNodes;
  const nodeArray = [...nodeList];
  nodeArray
    .slice()
    .reverse()
    .forEach(node => {
      if (node.id === 'loading-screen') {
        node.remove();
      }
    }
  )
}

export {
  addLoadingMoviesSkeleton,
  addLoadingCategoriesSkeleton,
  addLoadingMovieDetailSkeleton,
  removeLoadingSkeletonContainer
}