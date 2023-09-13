// Fonction pour extraire les titres d'une playlist
async function extractPlaylistInfo(playlistUrl) {
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
