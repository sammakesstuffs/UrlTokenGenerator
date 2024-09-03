function generateToken() {
    // Generate a random 4-digit token
    const token = Math.floor(1000 + Math.random() * 9000);

    // Get the URL entered by the admin
    const url = document.getElementById('url').value;

    // Display the token and URL
    document.getElementById('token').innerText = token;
    document.getElementById('urlDisplay').innerText = url;

    // Retrieve existing tokens from localStorage
    let tokens = JSON.parse(localStorage.getItem('tokens')) || {};
    tokens[token] = url;
    localStorage.setItem('tokens', JSON.stringify(tokens));

    // Update the tokens table and select dropdown
    updateTokensTable();
    updateTokenSelect();
}

function updateTokensTable() {
    const tokensTableBody = document.querySelector('#tokensTable tbody');
    tokensTableBody.innerHTML = ''; // Clear existing rows

    let tokens = JSON.parse(localStorage.getItem('tokens')) || {};

    for (const [token, url] of Object.entries(tokens)) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${token}</td><td>${url}</td>`;
        tokensTableBody.appendChild(row);
    }
}

function updateTokenSelect() {
    const tokenSelect = document.getElementById('tokenSelect');
    tokenSelect.innerHTML = ''; // Clear existing options

    let tokens = JSON.parse(localStorage.getItem('tokens')) || {};

    for (const token of Object.keys(tokens)) {
        const option = document.createElement('option');
        option.value = token;
        option.text = token;
        tokenSelect.appendChild(option);
    }
}

function removeToken() {
    const selectedToken = document.getElementById('tokenSelect').value;

    if (!selectedToken) {
        alert('Please select a token to remove.');
        return;
    }

    // Retrieve existing tokens from localStorage
    let tokens = JSON.parse(localStorage.getItem('tokens')) || {};

    // Remove the selected token
    delete tokens[selectedToken];
    localStorage.setItem('tokens', JSON.stringify(tokens));

    // Update the tokens table and select dropdown
    updateTokensTable();
    updateTokenSelect();
}

// Initialize table and select dropdown on page load
window.onload = function() {
    updateTokensTable();
    updateTokenSelect();
}
