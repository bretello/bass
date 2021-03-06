// Pure JS simple click (entry) and play (audiosrc) player UI
function playTrack(entry) {
    document.querySelectorAll('.track').forEach(element => {
        element.classList.remove('active');
    }); entry.classList.add('active');

    var player = document.querySelector('#player>audio');
    var playing = document.querySelector('#player>#now_playing');

    player.setAttribute('src', entry.getAttribute('data-audiosrc'));
    player.play();
    playing.innerHTML = entry.innerHTML;
}
// simply changing class to body gives a cascade theme with css
function toggleTheme(theme='none') {
    if(theme !== 'none') { // a theme is given so, reset and add the chosen
        document.querySelector('body').classList.remove('dark');
        document.querySelector('body').classList.remove('light');
        document.querySelector('body').classList.add(theme);
    }
    else {  // default option is just a toggle between dark/light
        document.querySelector('body').classList.toggle('dark');
        document.querySelector('body').classList.toggle('light');
        theme = document.querySelector('body').classList.contains('dark') ? 'dark' : 'light';
    }
    updateThemeHrefs(theme);
}

function updateTheme() {
    // gets the https://bass.link?theme {dark/light}
    if(window.location.search != '') {
        theme = window.location.search.split('?')[1].trim();
        toggleTheme(theme);
    } else {
        theme = 'dark';
    }
    updateThemeHrefs(theme)
}

function updateThemeHrefs(theme='dark') {
    // appends to all ".internal" links to
    if(theme == 'dark' | theme == 'light') {
        document.querySelectorAll('a.internal').forEach(element => {
            element.href = element.href.split('?')[0] + "?" + theme
        })
    }
}

let tracklist = document.querySelector('#tracklist')

// sets the custom (if set) theme (dark/light)
if (typeof theme !== 'undefined') {
    toggleTheme(theme);
}

// sets the custom (if set) numbering to track list order
if (typeof first_track !== 'undefined') {
    tracklist.setAttribute('start', first_track);
}

// binds click on tracks title to the function above
document.querySelectorAll('.track').forEach(element => {
    element.addEventListener('click', function() {
        playTrack(element);
    });
});