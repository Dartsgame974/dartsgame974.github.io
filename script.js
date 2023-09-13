// Remplacez ces valeurs par vos propres clés d'API
const client_id = '648744c559e34f23bf849613c3b0f4ca';
const client_secret = '6108e70bad3a4cf5bb28dab7ada44a5d';

// Fonction pour extraire les titres et les artistes d'une playlist
async function extractPlaylistInfo(playlistUrl) {
    const client_credentials_manager = new SpotifyClientCredentials({
        clientId: client_id,
        clientSecret: client_secret
    });
    const sp = new SpotifyWebApi({ clientCredentialsManager: client_credentials_manager });

    const titles = new Set();
    const artists = new Set();
    let offset = 0;
    const limit = 100;

    while (true) {
        const results = await sp.getPlaylistTracks(playlistUrl, { offset, limit });

        for (const track of results.items) {
            const title = track.track.name;
            const artist = track.track.artists[0].name;
            titles.add(title);
            artists.add(artist);
        }

        if (results.items.length < limit) {
            break;
        }

        offset += limit;
    }

    return { titles, artists };
}

// Fonction pour comparer les playlists
async function comparePlaylists() {
    const playlist1Url = document.getElementById('playlist1').value;
    const playlist2Url = document.getElementById('playlist2').value;

    const { titles: titles1, artists: artists1 } = await extractPlaylistInfo(playlist1Url);
    const { titles: titles2, artists: artists2 } = await extractPlaylistInfo(playlist2Url);

    // Comparez les titres communs
    const commonTitles = Array.from(titles1).filter(title => titles2.has(title));

    // Affichez les titres communs
    const commonTitlesList = document.getElementById('common-titles');
    commonTitlesList.innerHTML = '';
    commonTitles.forEach(title => {
        const listItem = document.createElement('li');
        listItem.textContent = title;
        commonTitlesList.appendChild(listItem);
    });

    // Comparez les artistes communs
    const commonArtists = Array.from(artists1).filter(artist => artists2.has(artist));

    // Affichez les artistes communs
    const commonArtistsList = document.getElementById('common-artists');
    commonArtistsList.innerHTML = '';
    commonArtists.forEach(artist => {
        const listItem = document.createElement('li');
        listItem.textContent = artist;
        commonArtistsList.appendChild(listItem);
    });
}
