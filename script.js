// Récupérer les éléments
const upload = document.getElementById('upload');
const previews = document.querySelector('.previews');
const resizeBtn = document.getElementById('resize');

// Résolutions par plateforme
const sizes = {
  twitch: [72, 36, 18],
  discord: [256],
  moji: [28, 56, 112] 
};

// Lors du chargement des images
upload.addEventListener('change', () => {

  // Réinitialiser
  previews.innerHTML = '';

  const files = upload.files;

  for(let i = 0; i < files.length; i++) {

    const file = files[i];
    
    // Créer img 
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);

    // Créer bouton suppression
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';

    // Ajouter écouteur suppression
    deleteBtn.addEventListener('click', () => {
      previews.removeChild(img);
      previews.removeChild(deleteBtn); 
    });

    // Ajouter au DOM
    previews.appendChild(img);
    previews.appendChild(deleteBtn);

  }

});


// Lors du clic sur le bouton
resizeBtn.addEventListener('click', () => {

  // Réinitialiser
  previews.innerHTML = '';

  // Récupérer options cochées
  const options = getCheckedOptions();

  // Redimensionner et zipper
  zipImages(upload.files, options);

});


// Récupérer les options cochées
function getCheckedOptions() {

  const checked = [];

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

// Redimensionner et zipper
function zipImages(files, options) {

  // Redimensionner et zipper les images
async function zipImages(files, options) {

  // Initialiser JSZip
  const zip = new JSZip();

  for (let i = 0; i < files.length; i++) {

    const file = files[i];
    const img = await getImage(file);
    const fileName = file.name;

    // Boucler sur chaque option
    options.forEach(option => {

      // Résolutions pour cette option
      const sizes = option.sizes; 

      // Redimensionner l'image à chaque résolution
      sizes.forEach(size => {

        // Redimensionner l'image
        const resizedImg = getResizedImage(img, size, size);

        // Nom du fichier redimensionné
        const resizedName = `${fileName}_${option.name}_${size}x${size}.jpg`;

        // Ajouter au zip
        zip.file(resizedName, resizedImg, {base64: true});

      });

    });

  }

  // Générer le zip
  const zipFile = await zip.generateAsync({type: 'blob'});

  // Enregistrer le zip
  saveAs(zipFile, 'images.zip');

}

// Récupérer l'image
function getImage(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      resolve(img); 
    }
  });
}

// Redimensionner l'image
function getResizedImage(img, width, height) {

  // Créer un canevas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  // Dessiner l'image sur le canevas
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL(); // Retourner l'image encodée en base64

}

}
