function removeInfiniteScroll(infiniteScroll) {
  if (infiniteScroll) {
    window.removeEventListener('scroll', infiniteScroll, { passive: false });
    infiniteScroll = undefined;
  }
}

function smoothScroll() {
  const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothScroll);
    window.scrollTo (0, currentScroll - (currentScroll / 5));
  }
}

export {
  removeInfiniteScroll,
  smoothScroll,
};