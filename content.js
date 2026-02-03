function processCards() {
  document.querySelectorAll('div.css-175oi2r.r-1wtj0ep').forEach(card => {
    // avoid reprocessing
    if (card.dataset.nonMutualChecked) return;
    card.dataset.nonMutualChecked = 'true';

    // "Follows you" indicator
    const followsYou = card.querySelector('[data-testid="userFollowIndicator"]');

    if (!followsYou) {
      // find "Following" text
      const followingSpan = Array.from(card.querySelectorAll('span'))
        .find(span => span.textContent.trim() === 'Following');

      if (followingSpan) {
        followingSpan.style.color = 'red';
      }
    }
  });
}

// initial run
processCards();

// handle infinite scroll / dynamic loading
const observer = new MutationObserver(() => {
  processCards();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
