<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Redimensionnement d'Images et Création d'un Fichier Zip</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #1a1a1a; /* Couleur de fond en mode sombre */
            color: #ffffff; /* Couleur du texte en mode sombre */
        }

        h1 {
            text-align: center;
            padding: 20px;
        }

        input[type="file"] {
            margin: 10px 0;
        }

        p {
            margin: 5px 0;
            color: #ffffff; /* Couleur du texte en mode sombre */
        }

        label {
            display: block;
            margin: 5px 0;
        }

        button {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #007bff; /* Couleur du bouton en mode sombre */
            color: #ffffff; /* Couleur du texte du bouton en mode sombre */
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3; /* Couleur du bouton en mode sombre lors du survol */
        }
    </style>
</head>
<body>
    <h1>Redimensionnement d'Images</h1>
    <input type="file" id="fileInput" multiple>
    <br>
    <p>Sélectionnez les résolutions :</p>
    <label>
        <input type="checkbox" name="resolutions" value="72x72">Twitch 72x72
    </label>
    <label>
        <input type="checkbox" name="resolutions" value="36x36">Twitch 36x36
    </label>
    <label>
        <input type="checkbox" name="resolutions" value="18x18">Twitch 18x18
    </label>
    <br>
    <label>
        <input type="checkbox" name="resolutions" value="256x256">Discord 256x256
    </label>
    <br>
    <label>
        <input type="checkbox" name="resolutions" value="28x28">Points de chaîne 28x28
    </label>
    <label>
        <input type="checkbox" name="resolutions" value="56x56">Points de chaîne 56x56
    </label>
    <label>
        <input type="checkbox" name="resolutions" value="112x112">Points de chaîne 112x112
    </label>
    <br>
    <button id="resizeButton">Redimensionner</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.6.0/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
    <script>
        // Fonction pour redimensionner une image dans une résolution spécifiée
        function resizeImage(image, resolution) {
            const canvas = document.createElement('canvas');
            canvas.width = resolution;
            canvas.height = resolution;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, resolution, resolution);
            return canvas.toDataURL('image/jpeg', 1.0);
        }

        // Fonction pour créer un fichier zip à partir des images redimensionnées
        function createZip(imagesData) {
            const zip = new JSZip();
            imagesData.forEach((imageData, index) => {
                const fileName = `image_${index + 1}_${imageData.resolution}.jpg`;
                zip.file(fileName, imageData.data.split(',')[1], { base64: true });
            });
            zip.generateAsync({ type: 'blob' }).then((content) => {
                saveAs(content, 'images_resized.zip');
            });
        }

        // Fonction appelée lorsque le bouton "Redimensionner" est cliqué
        function onResizeButtonClick() {
            const selectedResolutions = Array.from(document.querySelectorAll('input[name="resolutions"]:checked'))
                .map(input => {
                    const [width, height] = input.value.split('x').map(Number);
                    return { resolution: input.value, width, height };
                });

            const files = document.getElementById('fileInput').files;
            if (files.length === 0 || selectedResolutions.length === 0) {
                alert('Veuillez sélectionner au moins un fichier et une résolution.');
                return;
            }

            const imagesData = [];

            // Boucle pour traiter chaque fichier sélectionné
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                reader.onload = function(event) {
                    const image = new Image();
                    image.src = event.target.result;
                    image.onload = function() {
                        // Boucle pour redimensionner l'image pour chaque résolution choisie
                        for (const resolutionObj of selectedResolutions) {
                            const { resolution, width } = resolutionObj;
                            const resizedData = resizeImage(image, width);
                            imagesData.push({ data: resizedData, resolution });
                        }

                        // Vérifie si toutes les images ont été redimensionnées avant de créer le zip
                        if (imagesData.length === files.length * selectedResolutions.length) {
                            createZip(imagesData);
                        }
                    };
                };
                reader.readAsDataURL(file);
            }
        }

        // Attache l'événement "click" au bouton "Redimensionner"
        document.getElementById('resizeButton').addEventListener('click', onResizeButtonClick);
    </script>
</body>
</html>
