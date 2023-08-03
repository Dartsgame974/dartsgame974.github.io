function redimensionnerImages() {
    // Récupérer le chemin d'accès saisi par l'utilisateur
    var cheminAcces = document.getElementById("cheminInput").value;

    // Récupérer les options de redimensionnement sélectionnées par l'utilisateur
    var optionsSelectionnees = {
        "Twitch": document.getElementById("bits").checked,
        "Discord": document.getElementById("channelpoints").checked,
        "ChannelPoints": document.getElementById("discord").checked
    };

    // Fonction pour redimensionner une image
    function redimensionnerImage(image, taille) {
        var canvas = document.createElement("canvas");
        canvas.width = taille;
        canvas.height = taille;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, taille, taille);
        return canvas.toDataURL("image/png");
    }

    // Fonction pour créer un fichier ZIP contenant les images redimensionnées
    function creerFichierZIP(images) {
        var zip = new JSZip();
        for (var option in images) {
            var dossier = zip.folder(option);
            images[option].forEach(function (dataURL, index) {
                var nomFichier = cheminAcces.substring(cheminAcces.lastIndexOf("/") + 1, cheminAcces.lastIndexOf("."));
                dossier.file(nomFichier + "_" + (index + 1) + "x" + (index + 1) + ".png", dataURL.split(",")[1], { base64: true });
            });
        }
        zip.generateAsync({ type: "blob" }).then(function (blob) {
            // Télécharger le fichier ZIP contenant les images redimensionnées
            var url = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = 'images_redimensionnees.zip';
            link.click();
            URL.revokeObjectURL(url);
        });
    }

    // Charger les images du répertoire spécifié
    var images = {};
    var fichiersCharges = 0;

    // Fonction de rappel lorsqu'une image est chargée
    function imageChargee() {
        fichiersCharges++;
        if (fichiersCharges === fichiers.length) {
            // Toutes les images ont été chargées, procéder au redimensionnement
            var imagesRedimensionnees = {};
            for (var option in images) {
                imagesRedimensionnees[option] = [];
                images[option].forEach(function (image) {
                    var imageRedimensionnee = redimensionnerImage(image, images[option].length);
                    imagesRedimensionnees[option].push(imageRedimensionnee);
                });
            }
            creerFichierZIP(imagesRedimensionnees);
        }
    }

    // Charger les fichiers d'images du répertoire spécifié
    var fichiers = [];
    fetch(cheminAcces)
        .then(response => response.blob())
        .then(blob => {
            var zip = new JSZip();
            zip.loadAsync(blob).then(function (entries) {
                for (var entry in entries.files) {
                    var fichier = entries.files[entry];
                    var ext = fichier.name.toLowerCase().split('.').pop();
                    if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "webp" || ext === "gif") {
                        fichiers.push(fichier);
                        fichier.async("base64").then(function (data) {
                            var img = new Image();
                            img.onload = imageChargee;
                            img.src = "data:image/png;base64," + data;
                            if (optionsSelectionnees["Twitch"]) {
                                if (!images["Twitch"]) {
                                    images["Twitch"] = [];
                                }
                                images["Twitch"].push(img);
                            }
                            if (optionsSelectionnees["Discord"]) {
                                if (!images["Discord"]) {
                                    images["Discord"] = [];
                                }
                                images["Discord"].push(img);
                            }
                            if (optionsSelectionnees["ChannelPoints"]) {
                                if (!images["ChannelPoints"]) {
                                    images["ChannelPoints"] = [];
                                }
                                images["ChannelPoints"].push(img);
                            }
                        });
                    }
                }
            });
        })
        .catch(error => {
            alert("Une erreur est survenue lors du chargement des images : " + error);
        });
}
