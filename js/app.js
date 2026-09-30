const toolIcons = {
    "image-compressor.html": "🖼️",
    "image-resizer.html": "✂️",
    "image-to-pdf.html": "📄",
    "pdf-to-image.html": "📑",
    "qr-generator.html": "🔳",
    "percentage.html": "🧮"};

const toolFile =
    window.location.pathname.split("/").pop();

const toolInfo = {
    name: document.title
        .replace(" - KaamKaro", "")
        .trim(),

    url: `tools/${toolFile}`,

    icon: toolIcons[toolFile] || "🧰"
};


function readStorage(key) {

    try {

        const value =
            JSON.parse(
                localStorage.getItem(key) || "[]"
            );

        return Array.isArray(value) ? value : [];

    } catch (error) {

        return [];

    }

}


function writeStorage(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        return false;

    }

    return true;

}


function getFavorites() {

    return readStorage("kaamkaro_favorites");

}


function saveFavorites(favorites) {

    writeStorage(
        "kaamkaro_favorites",
        favorites
    );

}


function isFavorite() {

    const favorites =
        getFavorites();

    return favorites.some(
        item =>
            item.url === toolInfo.url
    );

}


function toggleFavorite() {

    let favorites =
        getFavorites();


    if (isFavorite()) {

        favorites =
            favorites.filter(
                item =>
                    item.url !== toolInfo.url
            );

    } else {

        favorites.unshift(
            toolInfo
        );

    }


    saveFavorites(
        favorites
    );

    updateFavoriteButton();

}


function updateFavoriteButton() {

    const button =
        document.getElementById(
            "favoriteButton"
        );


    if (!button) {
        return;
    }


    if (isFavorite()) {

        button.textContent =
            "★ Favorited";

        button.classList.add(
            "active"
        );

    } else {

        button.textContent =
            "☆ Add to Favorites";

        button.classList.remove(
            "active"
        );

    }

}


function saveToolToRecent() {

    let recent = readStorage("kaamkaro_recent");


    recent =
        recent.filter(
            item =>
                item.url !== toolInfo.url
        );


    recent.unshift(
        toolInfo
    );


    recent =
        recent.slice(
            0,
            5
        );


    writeStorage(
        "kaamkaro_recent",
        recent
    );

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        saveToolToRecent();

        updateFavoriteButton();


        const favoriteButton =
            document.getElementById(
                "favoriteButton"
            );


        if (favoriteButton) {

            favoriteButton.addEventListener(
                "click",
                toggleFavorite
            );

        }

    }
);