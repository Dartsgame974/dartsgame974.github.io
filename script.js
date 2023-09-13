import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();
const accessToken = '648744c559e34f23bf849613c3b0f4ca';

spotifyApi.setAccessToken(accessToken);

async function comparePlaylists() {
    const playlist1Link = document.getElementById('playlist1').value;
    const playlist2Link = document.getElementById('playlist2').value;

    try {
        const playlist1 = await spotifyApi.getPlaylist(playlist1Link);
        const playlist2 = await spotifyApi.getPlaylist(playlist2Link);

        const tracks1 = extractTracks(playlist1.tracks.items);
        const tracks2 = extractTracks(playlist2.tracks.items);

        const commonTracks = findCommonElements(tracks1, tracks2);
        const commonArtists = findCommonElements(playlist1.artists, playlist2.artists);

        displayResults(commonTracks, commonArtists);
    } catch (error) {
        console.error('Erreur lors de la récupération des playlists depuis Spotify:', error);
    }
}

function extractTracks(tracks) {
    return tracks.map((track) => track.name);
}

function findCommonElements(arr1, arr2) {
    return arr1.filter((element) => arr2.includes(element));
}

function displayResults(commonTracks, commonArtists) {
    const commonTracksList = document.getElementById('commonTracks');
    const commonArtistsList = document.getElementById('commonArtists');
    
    commonTracksList.innerHTML = '';
    commonArtistsList.innerHTML = '';
    
    commonTracks.forEach((track) => {
        const li = document.createElement('li');
        li.textContent = track;
        commonTracksList.appendChild(li);
    });
    
    commonArtists.forEach((artist) => {
        const li = document.createElement('li');
        li.textContent = artist;
        commonArtistsList.appendChild(li);
    });
}

document.getElementById('compareButton').addEventListener('click', comparePlaylists);
