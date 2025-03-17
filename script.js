const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = [ 'bojack2', 'bojack1', 'q1''rick',  'go', 'post', 'bojack', 'coffee', 'mind', '1000', 'hurt', 'dande', 'without', 'tellme', 'sleep', 'ugly', 'oviman' ,'gotus','night', 'cut', '2002', 'east', 'past' , 'trust', 'okay' , 'whatever'
	       ,'rox', 'sun',  '7', 'post', 'light', 'teen' , 'brian','die with a smile', 'girls', 'lala', 'bye' ,'audio' ,
	       'Set Fire to the Rain','Ava Max - Sweet but Psycho [Official Music Video]' , 'Maroon 5 - Animals (Lyrics)',
	        'payphone', 'heat wave', 'all we know', 'The Neighbourhood - Sweater Weather', 'Sia - Cheap Thrills',
	        'Ruth B. - Dandelions'  , 'closer', 'on-my-own', 'rockabye', 'starving','just-a-dream'  ];

// Keep track of song
let songIndex = 0;
let isShuffling = false;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  if (isShuffling) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

// Shuffle button event listener
shuffleBtn.addEventListener('click', () => {
  isShuffling = !isShuffling;
  shuffleBtn.classList.toggle('active', isShuffling);
});
