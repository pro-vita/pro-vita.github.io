'use strict';

const searchForm = document.querySelector(".search");
const inputSearch = document.querySelector(".input-search-js");
export class HeaderSearch {
    constructor() {
        searchForm?.addEventListener("submit", (event) => this._search(event)); 
    }

    _search(e) {
        e.preventDefault();
        const searchTerm = inputSearch.value.toLowerCase();
        if (searchTerm === "pc") {
          window.location.href = "pc.html";
        } else if (searchTerm === "tablet") {
          window.location.href = "tablet.html";
        } else if (searchTerm === "mobil") {
          window.location.href = "mobil.html";
        } else if (searchTerm === "registrace") {
          window.location.href = "register.html";
        } else if (searchTerm === "kontakt" || searchTerm === "kontakty") {
          window.location.href = "kontakt.html";
        } else if (searchTerm === "kosik") {
          window.location.href = "shopping-cart.html";
        } else {
          alert("No results found for " + searchTerm);
        }
      }
    
}