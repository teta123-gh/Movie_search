// Get DOM elements when page loads
document.addEventListener('DOMContentLoaded', function() {
    let searchInput = document.getElementById("Search_data");
    let searchButton = document.getElementById("searchButton");

    // Add click event listener to the search button
    searchButton.addEventListener("click", performSearch);
});

function performSearch() {
    const searchInput = document.getElementById("Search_data");
    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
        alert("Please enter a search term");
        return;
    }

    const URL = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;

    // Show loading state
    document.getElementById("results-table").innerHTML = "Searching...";

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById("results-table").innerHTML = "Error fetching results. Please try again.";
        });
}

function displayResults(shows) {
    const tableContainer = document.getElementById("results-table");

    if (shows.length === 0) {
        tableContainer.innerHTML = "No results found.";
        return;
    }

    // Display results in table
    tableContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Genre</th>
                </tr>
            </thead>
            <tbody>
                ${shows.map(show => `
                    <tr>
                        <td>${show.show.name || 'N/A'}</td>
                        <td>${show.show.summary ? stripHtmlTags(show.show.summary) : 'N/A'}</td>
                        <td>${show.show.genres ? show.show.genres.join(', ') : 'N/A'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function stripHtmlTags(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText;
}
