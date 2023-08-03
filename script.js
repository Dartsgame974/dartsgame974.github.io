function parcourirDossier() {
    // Votre code pour parcourir le dossier et récupérer le chemin d'accès ici
    console.log("Parcourir le dossier...");
}

function redimensionnerImage(chemin_image, taille) {
    // Votre code pour redimensionner une image ici
    console.log("Redimensionner l'image : ", chemin_image, "à la taille : ", taille);
}

function redimensionnerImages() {
    var chemin_acces = document.querySelector(".textbox").value;
    if (!chemin_acces) {
        alert("Veuillez entrer le chemin d'accès d'un répertoire contenant des images à redimensionner.");
        return;
    }

    var options_selectionnees = {
        Twitch: document.getElementById("bits").checked,
        Discord: document.getElementById("channelpoints").checked
        // Ajoutez d'autres options si nécessaire...
    };

    if (!Object.values(options_selectionnees).some(Boolean)) {
        alert("Aucune option de redimensionnement sélectionnée.");
        return;
    }

    // Votre code pour redimensionner les images ici
    console.log("Redimensionner les images...");
    // Remplacez cette ligne avec la logique de redimensionnement réelle

    // Exemple de redimensionnement d'une image
    if (options_selectionnees["Twitch"]) {
        redimensionnerImage(chemin_acces + "/exemple.png", 72);
        redimensionnerImage(chemin_acces + "/exemple.png", 36);
        redimensionnerImage(chemin_acces + "/exemple.png", 18);
    }

    if (options_selectionnees["Discord"]) {
        redimensionnerImage(chemin_acces + "/exemple.png", 256);
    }
}

document.getElementById("redimensionner").addEventListener("click", redimensionnerImages);
