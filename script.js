<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Redimensionnement d'Images et Création d'un Fichier Zip</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Redimensionnement d'Images</h1>
    <div class="drop-area" id="dropArea">
        <p>Faites glisser et déposez les fichiers ici ou cliquez pour sélectionner des images.</p>
        <input type="file" id="fileInput" multiple>
    </div>
    <div class="preview-container" id="previewContainer"></div>
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
    <script src="script.js"></script>
</body>
</html>
