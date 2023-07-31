// Fonction pour redimensionner une image
function redimensionnerImage(image, taille) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.width = taille;
  canvas.height = taille;
  context.drawImage(image, 0, 0, taille, taille);
  return canvas.toDataURL("image/png");
}

// Liste pour stocker les images redimensionnées
var imagesRedimensionnees = [];

// Fonction pour gérer le chargement des fichiers
function gererChargementFichiers(event) {
  imagesRedimensionnees = []; // Réinitialiser la liste des images redimensionnées

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

        // Afficher les images redimensionnées
        var previewImage_72 = document.createElement("img");
        previewImage_72.src = image_72;
        previewImage_72.style.maxWidth = "100px";
        previewImage_72.style.maxHeight = "100px";
        previewContainer.appendChild(previewImage_72);

        var previewImage_36 = document.createElement("img");
        previewImage_36.src = image_36;
        previewImage_36.style.maxWidth = "100px";
        previewImage_36.style.maxHeight = "100px";
        previewContainer.appendChild(previewImage_36);

        var previewImage_18 = document.createElement("img");
        previewImage_18.src = image_18;
        previewImage_18.style.maxWidth = "100px";
        previewImage_18.style.maxHeight = "100px";
        previewContainer.appendChild(previewImage_18);

        imagesRedimensionnees.push({ dataUrl: image_72 });
        imagesRedimensionnees.push({ dataUrl: image_36 });
        imagesRedimensionnees.push({ dataUrl: image_18 });

        // Activer le bouton "Télécharger ZIP" une fois que les images sont chargées
        document.getElementById("downloadButton").disabled = false;
      };

      reader.readAsDataURL(file);
    } else {
      alert("Le fichier " + file.name + " n'est pas une image PNG valide.");
    }
  }
}

// Fonction pour télécharger les images redimensionnées sous forme de ZIP
function telechargerZip() {
  if (imagesRedimensionnees.length === 0) {
    alert("Aucune image redimensionnée à télécharger.");
    return;
  }

  var zip = new JSZip();

  imagesRedimensionnees.forEach((image, index) => {
    var nomFichier = "image_" + (index + 1) + ".png";
    zip.file(nomFichier, image.dataUrl.split("base64,")[1], { base64: true });
  });

  zip.generateAsync({ type: "blob" }).then(function (contenu) {
    saveAs(contenu, "images_redimensionnees.zip");
  });
}

// Écouter l'événement de chargement de fichiers
document.getElementById("inputFile").addEventListener("change", gererChargementFichiers);

// Écouter l'événement du bouton "Redimensionner"
document.getElementById("resizeButton").addEventListener("click", telechargerZip);
