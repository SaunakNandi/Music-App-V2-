let music = document.querySelector('audio')
let image = document.querySelector("img")
let artist = document.getElementById('artist')
let title = document.getElementById("title")
let next = document.getElementById('next')
let play = document.getElementById('play')
let prev = document.getElementById('prev')
let progress = document.getElementById("progress")
let duration = document.getElementById("duration")
let Var_duration = document.getElementById("duration")
let current_time = document.getElementById("currentTime")
let progress_div = document.getElementById("progress_div")
 // For Play
let isPlaying = false
/*
play.addEventListener('click', () =>
{
    isPlaying=true;
    music.play();// playing the music
    
    play.classList.replace('fa-play','fa-pause')        // replace the play button with pause one
    image.classList.add("anime")  // using classList we are telling that add class anime to <img
})

// For Pause 
play.addEventListener('click', () =>
{
    isPlaying=false;
    music.play();// playing the music
    
    play.classList.replace('fa-play','fa-pause')        // replace the play button with pause one
    image.classList.add("anime")  // using classList we are telling that add class anime to <img
})
*/

const pauseMusic= () =>
{
    isPlaying=false;
    music.pause();// playing the musicplay.classList.replace('fa-pause','fa-play')     // replace the play button with pause one
    play.classList.replace('fa-pause','fa-play')
    image.classList.remove("anime")  // using classList we are telling that remove class anime 
}

const playMusic= ()=>
{
    isPlaying=true;             // that is when play is pressed again isPLaying become true and pauseMusic is called
    music.play();
    play.classList.replace('fa-play', 'fa-pause')        // replace the play button with pause one
    image.classList.add("anime")// using classList we are telling that add class anime to <img/image
}

play.addEventListener("click", () =>
{
    // using ternary operator
    isPlaying ? pauseMusic() : playMusic();  
})


 // array of object
let song = [{
    name: "Attention",
    title: "Attention",
    artist: "Charlie Puth",
},
{
    name: "History",
    title: "History",
    artist: "One Direction",
},
    {
        name: "How Long",
        title: "How Long",
        artist: "Charlie Puth",
    },
    
    {
        name: "Electric",
        title: "Electric",
        artist: "Katy Perry",
    },
    {
        name: "Astronaut in The Ocean",
        title: "Astronaut in The Ocean",
        artist: "Masked Wolf",
    },
    {
        name: "Girls Like You",
        title: "Girls Like You",
        artist: "Maroon 5 ft. Cardi B",
    },
    
    {
        name: "Invisible",
        title: "Invisible",
        artist: "Zara Larsson",
    },

    {
        name: "Taki Taki",
        title: "Taki Taki",
        artist: "DJ Snake ft. Salena Gomez, Cardi B, Ozuna",
    }
]

const loadSong = (song) =>
{
        // change the content of title and artist
    title.textContent = song.title
    artist.textContent = song.artist
    music.src = "Music/" + song.name + ".mp3"
    image.src="PICS/"+song.name+".jfif"
}
//loadSong(song)

let songIndex=0
const nextSong = () =>
{
    songIndex=(songIndex+1)%song.length
    loadSong(song[songIndex])
    playMusic()
}

const prevSong = () => {
    songIndex=(songIndex-1 + song.length)%song.length
    loadSong(song[songIndex])
    playMusic()
}


/*progress */
// using timeupdate that get triggered when the music is playing and keeps on updating the time
music.addEventListener("timeupdate", (event) => {
    //console.log(event)
    // currentTime, duration are present inside event , extract it with event.srcElement
    
    const { currentTime, duration } = event.srcElement;
   /* console.log(currentTime);
    console.log(duration)*/

    let progress_time = currentTime * 100 / duration  // its same as finding ur marks percentage 
    progress.style.width = `${progress_time}%`  // using percentage, as width in css use % or u can say how much 
    // width have to be covered w.r.t 100%

    // music duration update
    let minute = Math.floor(duration / 60);  // using floor to get the whole number
    let second = Math.floor(duration % 60)
    //console.log(typeof(duration))
    if (duration)
    {
        Var_duration.textContent=`${minute} : ${second}`       // dont update the value of div with id="duration" until 
        //the value of duration is obtained
    }
    
    // current time update
    // use the currentTime to calculate minute and seconds
    // remember current_time is the variable that store the dome of id="currentTime"
    let min_currentTime = Math.floor(currentTime / 60);  
    let sec_currentTime = Math.floor(currentTime % 60)
    
    current_time.textContent=`${min_currentTime} : ${sec_currentTime}`

});

progress_div.addEventListener('click', (event) => {
     
    //let { duration } = music
    let duration = music.duration     // fetch the duration of the music playing now
    
    // formula to find the duration where it is clicked in the progress bar
    let move_progress = (event.offsetX / event.srcElement.clientWidth)*duration
    //console.log(move_progress)

    music.currentTime=move_progress  // now this become my new current time
})

// if the music ends call next song func
music.addEventListener('ended', nextSong)

// Next Prev Control system
next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)




