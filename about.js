const searchForm = document.getElementById("search-form");
const searchBar = document.querySelector(".search-bar");
const searchResult = document.querySelector(".search-result");
const viewMoreBtn = document.querySelector(".view-more-btn");

const accesskey = "p932u_AmzNUn7isuf4lsnuQwkhRkAfnJRnfhFzjGVWM";

let keyword = '';
let page = 1;

async function searchImages() {
    keyword = searchBar.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1) {
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.map((result)=>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    viewMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
})
viewMoreBtn.addEventListener("click", ()=>{
    page++;
    searchImages();
})
