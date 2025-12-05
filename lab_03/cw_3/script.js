let allProducts = [];

async function get_response() {
    const apiUrl = 'https://dummyjson.com/products';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        allProducts = data.products; 
        return allProducts; 
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

async function to_html() {
    await get_response(); 
    displayProducts(allProducts.slice(0,30));
}

function displayProducts(products) {
    let html = `<table>
        <tr>
            <th>Zdjęcie</th>
            <th>Tytuł</th>
            <th>Opis</th>
        </tr>`;

    products.forEach(p => {
        html += `<tr>
            <td><img src="${p.thumbnail}" alt="${p.title}" style="max-width:100px;"></td>
            <td>${p.title}</td>
            <td>${p.description}</td>
        </tr>`;
    });

    html += `</table>`;
    document.getElementById("result").innerHTML = html;
}

function filterProducts() {
    const word = document.getElementById("filter").value.toLowerCase();
    const filtered = allProducts.filter(p => 
        p.title.toLowerCase().includes(word) ||
        p.description.toLowerCase().includes(word)
    );
    displayProducts(filtered.slice(0,30));
}

function sort_asc() {
    const sorted = allProducts.slice().sort((a, b) => a.title.localeCompare(b.title));
    displayProducts(sorted.slice(0,30));
}

function sort_desc() {
    const sorted = allProducts.slice().sort((a, b) => a.title.localeCompare(b.title)).reverse();
    displayProducts(sorted.slice(0,30));
}

function original_order() {
    displayProducts(allProducts.slice(0,30));
}