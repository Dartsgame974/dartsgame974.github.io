<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redimensionner des images</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat&display=swap">
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
    }

    .drop-zone {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      margin: 20px auto;
      max-width: 400px;
    }

    .image-preview {
      display: flex;
      flex-wrap: wrap;
    }

    .image-preview img {
      max-width: 100px;
      margin: 10px;
    }
  </style>
</head>

<body>
  <h1>Redimensionner des images</h1>
  <div class="drop-zone" id="dropZone">
    <p>Glissez-déposez les images ici ou cliquez pour les sélectionner.</p>
    <input type="file" id="fileInput" multiple accept="image/*">
  </div>
  <h2>Résolutions disponibles</h2>
  <label>
    <input type="checkbox" name="resolutions" value="72x72">Twitch (72x72)<br>
  </label>
  <label>
    <input type="checkbox" name="resolutions" value="36x36">Twitch (36x36)<br>
  </label>
  <label>
    <input type="checkbox" name="resolutions" value="18x18">Twitch (18x18)<br>
  </label>
  <label>
    <input type="checkbox" name="resolutions" value="256x256">Discord (256x256)<br>
  </label>
  <label>
    <input type="checkbox" name="resolutions" value="28x28">Points de chaîne (28x28)<br>
  </label>
  <label>
    <input type="checkbox" name="resolutions" value="56x56">Points de chaîne (56x56)<br>
  </label>
  <label>
    <input type="checkbox" name="resolutions" value="112x112">Points de chaîne (112x112)<br>
  </label>
  <button id="resizeBtn">Redimensionner</button>

  <div class="image-preview" id="imagePreview"></div>

  <script>
    // Fonction pour afficher une image prévisualisée dans la page
    function displayImagePreview(imageSrc) {
      const previewDiv = document.getElementById('imagePreview');
      const img = document.createElement('img');
      img.src = imageSrc;
      previewDiv.appendChild(img);
    }

    // Fonction pour redimensionner une image selon les résolutions choisies
    function resizeImage(imageBlob, resolutions) {
      return Promise.all(
        resolutions.map((resolution) => {
          const [width, height] = resolution.split('x').map(Number);
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);
              canvas.toBlob((blob) => {
                resolve({ resolution, blob });
              }, 'image/jpeg', 0.95);
            };
            img.src = URL.createObjectURL(imageBlob);
          });
        })
      );
    }

    // Fonction pour créer un fichier zip contenant toutes les images redimensionnées
    function createZip(images) {
      const zip = new JSZip();
      images.forEach((image) => {
        zip.file(`${image.resolution}.jpg`, image.blob);
      });
      return zip.generateAsync({ type: 'blob' });
    }

    // Gestionnaire d'événement pour le chargement des fichiers
    document.getElementById('fileInput').addEventListener('change', (event) => {
      const dropZone = document.getElementById('dropZone');
      dropZone.style.border = '2px dashed #ccc';
      const previewDiv = document.getElementById('imagePreview');
      previewDiv.innerHTML = '';
      const files = event.target.files;
      for (const file of files) {
        const objectURL = URL.createObjectURL(file);
        displayImagePreview(objectURL);
      }
    });

    // Gestionnaire d'événement pour le glisser-déposer
    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropZone.style.border = '2px dashed #f1c40f';
    });

    dropZone.addEventListener('dragleave', (event) => {
      event.preventDefault();
      dropZone.style.border = '2px dashed #ccc';
    });

    dropZone.addEventListener('drop', (event) => {
      event.preventDefault();
      dropZone.style.border = '2px dashed #ccc';
      const previewDiv = document.getElementById('imagePreview');
      previewDiv.innerHTML = '';
      const files = event.dataTransfer.files;
      for (const file of files) {
        const objectURL = URL.createObjectURL(file);
        displayImagePreview(objectURL);
      }
    });

    // Gestionnaire d'événement pour le bouton Redimensionner
    document.getElementById('resizeBtn').addEventListener('click', () => {
      const resolutions = Array.from(document.querySelectorAll('input[name="resolutions"]:checked')).map(input => input.value);
      const fileInput = document.getElementById('fileInput');
      const images = Array.from(fileInput.files);

      if (images.length === 0) {
        alert("Veuillez sélectionner des images à redimensionner.");
        return;
      }

      if (resolutions.length === 0) {
        alert("Veuillez choisir au moins une résolution.");
        return;
      }

      const resizedImages = images.flatMap(image => resizeImage(image, resolutions));

      Promise.all(resizedImages).then(resized => {
        createZip(resized).then(zipBlob => {
          const zipFileName = "images_resized.zip";
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(zipBlob);
          downloadLink.download = zipFileName;
          downloadLink.click();
        });
      });
    });

  </script>
</body>

</html>
