var audio = document.getElementById("audioPlayer");

function startAudio() {
  audio.play();
  audio.loop = true;
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
}