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
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        h1 {
            text-align: center;
            padding: 20px;
        }

        .drop-area {
            border: 2px dashed #007bff; /* Couleur de la zone de drag and drop en mode sombre */
            padding: 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: border-color 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        .drop-area:hover {
            border-color: #0056b3; /* Couleur de la zone de drag and drop en mode sombre lors du survol */
        }

        p {
            margin: 5px 0;
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

        /* Cacher le champ de fichier d'origine */
        input[type="file"] {
            display: none;
        }

        /* Styler la zone de drag and drop lorsqu'un fichier est survolé */
        .drop-area.active {
            border-color: #0056b3; /* Couleur de la zone de drag and drop en mode sombre lors du survol avec un fichier */
        }

        /* Afficher le texte "Aucun fichier choisi" lorsque aucun fichier n'a été sélectionné */
        .drop-area.empty:after {
            content: "Faites glisser et déposez les fichiers ici ou cliquez pour sélectionner des images.";
            font-size: 14px;
            color: #ffffff; /* Couleur du texte en mode sombre */
        }

        /* Afficher la prévisualisation des images chargées */
        .preview-container {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
        }

        .preview-item {
            width: 200px;
            margin: 10px;
            border: 1px solid #007bff; /* Couleur de la bordure en mode sombre */
            padding: 5px;
            border-radius: 5px;
        }

        .preview-item img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <h1>Redimensionnement d'Images</h1>
    <label for="fileInput" class="drop-area empty" id="dropArea">
        <p>Faites glisser et déposez les fichiers ici ou cliquez pour sélectionner des images.</p>
    </label>
    <input type="file" id="fileInput" multiple>
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
