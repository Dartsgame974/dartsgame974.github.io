// Récupérer les éléments du DOM
const upload = document.getElementById('upload');
const previews = document.querySelector('.previews');
const resizeBtn = document.getElementById('resize');

// Résolutions par plateforme 
const sizes = {
  twitch: [72, 36, 18],
  discord: [256],
  moji: [28, 56, 112]
};

// Écouter le chargement de fichiers
upload.addEventListener('change', () => {
  previews.innerHTML = ''; // Réinitialiser

  const files = upload.files;
  for(let i = 0; i < files.length; i++) {
    const file = files[i];

    // Créer l'élément img
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.className = 'preview';

    // Ajouter au DOM
    previews.appendChild(img); 
  }
});

// Écouter le clic sur le bouton
resizeBtn.addEventListener('click', () => {
  // Récupérer les options cochées
  const options = getCheckedOptions();

  // Redimensionner et zipper
  zipImages(upload.files, options);
});

// Utilitaires

// Récupérer les options cochées  
function getCheckedOptions() {
  const checked = [];

  const twitch = document.getElementById('twitch');
  const discord = document.getElementById('discord');
  const moji = document.getElementById('moji');

  if (twitch.checked) {
    checked.push({
      name: 'twitch',
      sizes: sizes.twitch
    });
  }

  if (discord.checked) {
    checked.push({
      name: 'discord', 
      sizes: sizes.discord
    });
  }

  if (moji.checked) {
    checked.push({
      name: 'moji',
      sizes: sizes.moji
    });
  }

  return checked;
}

// Redimensionner et zipper les images
function zipImages(files, options) {
  // Code pour redimensionner et zipper
}
