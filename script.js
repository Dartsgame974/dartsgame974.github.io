// Fonction pour redimensionner une image
function redimensionnerImage(image, taille) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.width = taille;
  canvas.height = taille;
  context.drawImage(image, 0, 0, taille, taille);
  return canvas.toDataURL("image/png");
}

// Liste pour stocker les images chargées
var imagesChargees = [];

// Fonction pour gérer le chargement des fichiers
function gererChargementFichiers(event) {
  imagesChargees = []; // Réinitialiser la liste des images chargées

  var files = event.target.files;
  var previewContainer = document.getElementById("previewContainer");
  previewContainer.innerHTML = ""; // Effacer tout contenu précédent

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var reader = new FileReader();

    // Vérifier si le fichier est une image PNG
    if (file.type === "image/png") {
      reader.onload = function (event) {
        var image = new Image();
        image.src = event.target.result;

        // Redimensionner l'image aux tailles requises
        var image_72 = redimensionnerImage(image, 72);
        var image_36 = redimensionnerImage(image, 36);
        var image_18 = redimensionnerImage(image, 18);

        imagesChargees.push({
          dataUrl_72: image_72,
          dataUrl_36: image_36,
          dataUrl_18: image_18,
        });

        // Vérifier si toutes les images ont été chargées avant d'afficher l'aperçu et activer le bouton "Télécharger ZIP"
        if (imagesChargees.length === files.length) {
          imagesChargees.forEach((image, index) => {
            var previewImage_72 = document.createElement("img");
            previewImage_72.src = image.dataUrl_72;
            previewImage_72.style.maxWidth = "100px";
            previewImage_72.style.maxHeight = "100px";
            previewContainer.appendChild(previewImage_72);

            var previewImage_36 = document.createElement("img");
            previewImage_36.src = image.dataUrl_36;
            previewImage_36.style.maxWidth = "100px";
            previewImage_36.style.maxHeight = "100px";
            previewContainer.appendChild(previewImage_36);

            var previewImage_18 = document.createElement("img");
            previewImage_18.src = image.dataUrl_18;
            previewImage_18.style.maxWidth = "100px";
            previewImage_18.style.maxHeight = "100px";
            previewContainer.appendChild(previewImage_18);
          });

          document.getElementById("downloadButton").disabled = false;
        }
      };

      reader.readAsDataURL(file);
    } else {
      alert("Le fichier " + file.name + " n'est pas une image PNG valide.");
    }
  }
}

// Fonction pour télécharger les images redimensionnées sous forme de ZIP
function telechargerZip() {
  if (imagesChargees.length === 0) {
    alert("Aucune image chargée.");
    return;
  }

  var zip = new JSZip();

  imagesChargees.forEach((image, index) => {
    var nomFichier_72 = "image_" + (index + 1) + "_72.png";
    zip.file(nomFichier_72, image.dataUrl_72.split("base64,")[1], { base64: true });

    var nomFichier_36 = "image_" + (index + 1) + "_36.png";
    zip.file(nomFichier_36, image.dataUrl_36.split("base64,")[1], { base64: true });

    var nomFichier_18 = "image_" + (index + 1) + "_18.png";
    zip.file(nomFichier_18, image.dataUrl_18.split("base64,")[1], { base64: true });
  });

  zip.generateAsync({ type: "blob" }).then(function (contenu) {
    saveAs(contenu, "images_redimensionnees.zip");
  });
}

// Écouter l'événement de chargement de fichiers
document.getElementById("inputFile").addEventListener("change", gererChargementFichiers);

// Écouter l'événement du bouton "Redimensionner"
document.getElementById("downloadButton").addEventListener("click", telechargerZip);
