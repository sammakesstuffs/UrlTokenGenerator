function loadIframe() {
    // Get the token entered by the user
    const userToken = document.getElementById('token').value;

    // Retrieve tokens and URLs from localStorage
    let tokens = JSON.parse(localStorage.getItem('tokens')) || {};
    const urlForToken = tokens[userToken];

    if (urlForToken) {
        // Hide the token input form and show the iframe container
        document.getElementById('inputContainer').style.display = 'none';
        const iframeContainer = document.getElementById('iframeContainer');
        iframeContainer.style.display = 'block';
        iframeContainer.innerHTML = `<iframe src="${urlForToken}" allowfullscreen></iframe>`;

        // Request fullscreen mode
        if (iframeContainer.requestFullscreen) {
            iframeContainer.requestFullscreen();
        } else if (iframeContainer.mozRequestFullScreen) { // Firefox
            iframeContainer.mozRequestFullScreen();
        } else if (iframeContainer.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            iframeContainer.webkitRequestFullscreen();
        } else if (iframeContainer.msRequestFullscreen) { // IE/Edge
            iframeContainer.msRequestFullscreen();
        }
        
        // Listen for fullscreen change events to handle exit
        document.addEventListener('fullscreenchange', exitFullscreenHandler);
        document.addEventListener('mozfullscreenchange', exitFullscreenHandler);
        document.addEventListener('webkitfullscreenchange', exitFullscreenHandler);
        document.addEventListener('msfullscreenchange', exitFullscreenHandler);
    } else {
        alert('Invalid token. Please try again.');
    }
}

function exitFullscreenHandler() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // If exited fullscreen, show the token input form again
        document.getElementById('inputContainer').style.display = 'block';
        document.getElementById('iframeContainer').style.display = 'none';

        // Remove fullscreen change listeners
        document.removeEventListener('fullscreenchange', exitFullscreenHandler);
        document.removeEventListener('mozfullscreenchange', exitFullscreenHandler);
        document.removeEventListener('webkitfullscreenchange', exitFullscreenHandler);
        document.removeEventListener('msfullscreenchange', exitFullscreenHandler);
    }
}
