/*
  Love Letter animations and gentle interactions.
  Adjust the values below to fine-tune timing and intensity.
*/
const animationConfig = {
  fadeInDuration: 1500,
  fadeInDelay: 550,
  slideDistance: 24,
  hoverPulseDuration: 2.4,
  lineFadeDuration: 900,
  lineFadeDelay: 280,
  shimmerDuration: 10,
};

const applyAnimationVariables = () => {
  const root = document.documentElement;
  root.style.setProperty(
    "--letter-fade-duration",
    `${animationConfig.fadeInDuration}ms`
  );
  root.style.setProperty(
    "--letter-fade-delay",
    `${animationConfig.fadeInDelay}ms`
  );
  root.style.setProperty(
    "--letter-slide-distance",
    `${animationConfig.slideDistance}px`
  );
  root.style.setProperty(
    "--hover-pulse-duration",
    `${animationConfig.hoverPulseDuration}s`
  );
  root.style.setProperty(
    "--line-fade-duration",
    `${animationConfig.lineFadeDuration}ms`
  );
  root.style.setProperty(
    "--line-fade-delay",
    `${animationConfig.lineFadeDelay}ms`
  );
  root.style.setProperty(
    "--shimmer-duration",
    `${animationConfig.shimmerDuration}s`
  );
};

const revealLines = () => {
  const lines = document.querySelectorAll(".line");
  lines.forEach((line, index) => {
    const delay = animationConfig.lineFadeDelay * (index + 1);
    setTimeout(() => {
      line.classList.add("is-visible");
    }, delay);
  });
};

const toggleInspoReveal = (shouldShow) => {
  const inspoSlot = document.getElementById("inspoSlot");
  if (!inspoSlot) return;

  if (shouldShow) {
    inspoSlot.classList.add("is-visible");
    inspoSlot.setAttribute("aria-hidden", "false");
  } else {
    inspoSlot.classList.remove("is-visible");
    inspoSlot.setAttribute("aria-hidden", "true");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  applyAnimationVariables();
  const letterWrap = document.getElementById("letterWrap");
  const envelope = document.getElementById("envelope");
  const letter = document.querySelector(".letter");
  let hasOpened = false;

  toggleInspoReveal(false);

  const openLetter = () => {
    if (!letterWrap || !envelope || hasOpened) return;
    hasOpened = true;
    letterWrap.classList.add("is-open");
    letterWrap.classList.remove("is-closed");
    envelope.setAttribute("aria-expanded", "true");
    if (letter) letter.classList.add("is-scrollable");
    document.body.classList.add("show-hearts");
    revealLines();
    toggleInspoReveal(true);
  };

  if (envelope) {
    envelope.addEventListener("click", openLetter);
    envelope.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLetter();
      }
    });
  }
});
