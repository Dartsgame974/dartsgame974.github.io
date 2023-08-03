const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('active');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('active');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('active');
    const files = event.dataTransfer.files;
    handleFiles(files);
});

dropArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files);
});

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
} 
const resizeButton = document.getElementById('resizeButton');
resizeButton.addEventListener('click', resizeImagesAndCreateZip);
