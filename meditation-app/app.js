const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  // sound
  const sounds = document.querySelector(".sound-picker button");
  // TIme display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  //   Get the length of outline
  const outlineLength = outline.getTotalLength();
  //   duration
  let fakeduration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //   select sound
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(
        fakeDuration / 60
      )} : ${Math.floor(fakeDuration % 60)}`;
    });
  });

  //   craete a function to stop and play the sounds
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };
  //   we can animate the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeduration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // animate the circle
    let progress = outlineLength - (currentTime / fakeduration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    // animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;
  };
};

app();
