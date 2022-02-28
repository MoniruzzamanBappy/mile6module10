const getJson = inputText => {
    const url = `https://openlibrary.org/search.json?q=${inputText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => getBookList(data.docs, data.numFound))

}

const clickSearch = () => {
    const inputField = document.getElementById('input-search');
    const inputText = inputField.value;
    getJson(inputText);
}
const getBookList = (lists, num) => {
    const totalResult = document.getElementById('total-result');
    totalResult.innerText = `
    Result show: 100 of ${num}
    `;
    const bookLists = document.getElementById('book-lists');
    bookLists.textContent = '';
    for (const list of lists) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${list.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Title: ${list.title}</h5>
            </div>
            <div class="card-footer">
                <small class="text-muted">Published: ${list.first_publish_year}</small>
            </div>
        </div>
        `;
        bookLists.appendChild(div);
    }
}