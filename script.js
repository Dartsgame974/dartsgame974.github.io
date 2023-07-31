// Fonction pour redimensionner une image
function redimensionnerImage(image, taille) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.width = taille;
  canvas.height = taille;
  context.drawImage(image, 0, 0, taille, taille);
  return canvas.toDataURL("image/png");
}

// Fonction pour afficher un message de statut
function afficherStatutMessage(message) {
  var statutContainer = document.getElementById("statutContainer");
  statutContainer.textContent = message;
}

// Fonction pour gérer le chargement des fichiers
function gererChargementFichiers(event) {
  var files = event.target.files;
  var zip = new JSZip();

  // Réinitialiser le statut des images
  afficherStatutMessage("");

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

        // Ajouter les images redimensionnées au fichier ZIP
        var zipFolderName = "images_redimensionnees";
        zip.folder(zipFolderName).file("image_72.png", image_72.split("base64,")[1], { base64: true });
        zip.folder(zipFolderName).file("image_36.png", image_36.split("base64,")[1], { base64: true });
        zip.folder(zipFolderName).file("image_18.png", image_18.split("base64,")[1], { base64: true });

        // Vérifier si toutes les images ont été ajoutées au fichier ZIP avant d'activer le bouton "Télécharger ZIP"
        if (i === files.length - 1) {
          document.getElementById("downloadButton").disabled = false;
          afficherStatutMessage("Toutes les images ont été redimensionnées.");
        }
      };

      reader.readAsDataURL(file);
    } else {
      alert("Le fichier " + file.name + " n'est pas une image PNG valide.");
    }
  }
}

// Fonction pour télécharger le fichier ZIP
function telechargerZip() {
  var zip = new JSZip();
  var zipFolderName = "images_redimensionnees";

  // Ajouter le contenu du ZIP dans un dossier spécifique
  zip.folder(zipFolderName);

  // Générer le fichier ZIP contenant les images redimensionnées
  zip.generateAsync({ type: "blob" }).then(function (contenu) {
    saveAs(contenu, "images_redimensionnees.zip");
  });
}

// Écouter l'événement de chargement de fichiers
document.getElementById("inputFile").addEventListener("change", gererChargementFichiers);

// Écouter l'événement du bouton "Redimensionner"
document.getElementById("resizeButton").addEventListener("click", telechargerZip);
