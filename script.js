// Assurez-vous que les bibliothèques Spotipy et SpotifyWebApi sont incluses
// Remplacez ces valeurs par vos propres clés d'API
const client_id = '648744c559e34f23bf849613c3b0f4ca';
const client_secret = '6108e70bad3a4cf5bb28dab7ada44a5d';

// Fonction pour extraire les titres d'une playlist
async function extractPlaylistInfo(playlistUrl) {
    // Initialisez l'objet SpotifyWebApi avec vos clés d'API
    const spotifyApi = new SpotifyWebApi({
        clientId: client_id,
        clientSecret: client_secret
    });

    const response = await fetch(playlistUrl);
    const data = await response.json();
    const tracks = data.tracks.items;

    const titles = new Set();
    
    tracks.forEach(track => {
        const title = track.track.name;
        titles.add(title);
    });

    return titles;
}

// Fonction pour comparer les playlists et afficher les titres communs
async function comparePlaylists() {
    const playlist1Url = document.getElementById('playlist1').value;
    const playlist2Url = document.getElementById('playlist2').value;

    const titles1 = await extractPlaylistInfo(playlist1Url);
    const titles2 = await extractPlaylistInfo(playlist2Url);

    // Comparez les titres communs
    const commonTitles = [...titles1].filter(title => titles2.has(title));

    // Affichez les titres communs
    const commonTitlesList = document.getElementById('common-titles');
    commonTitlesList.innerHTML = '';
    commonTitles.forEach(title => {
        const listItem = document.createElement('li');
        listItem.textContent = title;
        commonTitlesList.appendChild(listItem);
    });
}
