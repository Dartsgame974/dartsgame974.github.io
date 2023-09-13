// Function to compare two Spotify playlists
async function comparePlaylists() {
    const playlist1Link = document.getElementById('playlist1').value;
    const playlist2Link = document.getElementById('playlist2').value;

    // Obtain access tokens for Spotify API (you'll need to implement the authentication flow)
    const accessToken = '6108e70bad3a4cf5bb28dab7ada44a5d';

    // Get playlist data using the Spotify API
    const playlist1 = await getPlaylistData(playlist1Link, accessToken);
    const playlist2 = await getPlaylistData(playlist2Link, accessToken);

    // Extract track names and artists from playlists
    const tracks1 = extractTracks(playlist1);
    const tracks2 = extractTracks(playlist2);

    // Find common tracks and artists
    const commonTracks = findCommonElements(tracks1, tracks2);
    const commonArtists = findCommonElements(playlist1.artists, playlist2.artists);

    // Display common tracks and artists in the HTML
    displayResults(commonTracks, commonArtists);
}

// Function to retrieve playlist data from Spotify API
async function getPlaylistData(playlistLink, accessToken) {
    const playlistId = extractPlaylistId(playlistLink);
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return {
        name: data.name,
        artists: extractArtists(data.tracks.items),
    };
}

// Function to extract track names from a playlist
function extractTracks(playlist) {
    return playlist.tracks.map((track) => track.name);
}

// Function to extract artist names from a list of tracks
function extractArtists(tracks) {
    const artists = new Set();
    for (const track of tracks) {
        for (const artist of track.track.artists) {
            artists.add(artist.name);
        }
    }
    return Array.from(artists);
}

// Function to find common elements in two arrays
function findCommonElements(arr1, arr2) {
    return arr1.filter((element) => arr2.includes(element));
}

// Function to display common tracks and artists in the HTML
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
