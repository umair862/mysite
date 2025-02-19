async function fetchAndDisplayTable() {
    const helloDiv = document.querySelector('.hello');
    const apiParagraph = helloDiv.querySelector('p');

    if (!apiParagraph) {
        console.error("API link not found");
        return;
    }

    // Get API link
    const apiUrl = apiParagraph.textContent.trim();

    try {
        // Fetch data from API
        const response = await fetch(apiUrl);
        const jsonData = await response.json();

        // Remove existing <p> tags
        apiParagraph.parentElement.remove();

        // Sort data by Position in ascending order
        const sortedData = jsonData.data.sort((a, b) => a.Position - b.Position);

        // Create a container for the table
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-container');

        // Create table
        const table = document.createElement('table');

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Index', 'Countries', 'Position'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        sortedData.forEach((item, index) => {
            const row = document.createElement('tr');

            // Create and append columns
            const indexTd = document.createElement('td');
            indexTd.textContent = index + 1;
            row.appendChild(indexTd);

            const countryTd = document.createElement('td');
            countryTd.textContent = item.Countries;
            row.appendChild(countryTd);

            const positionTd = document.createElement('td');
            positionTd.textContent = item.Position;
            row.appendChild(positionTd);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        tableContainer.appendChild(table);

        // Append table container to .hello div
        helloDiv.appendChild(tableContainer);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export default function decorate(block) {
    fetchAndDisplayTable();
}