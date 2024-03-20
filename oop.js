// "use strict";

// import { HeaderLogin } from "./header-login.js";
// import { HeaderSearch } from "./header-search.js";
// import { Data } from "./data.js";
// import { Databaze } from "./databaze.js";
// import { UserHandler } from "./user-handler.js";

// document.addEventListener("DOMContentLoaded", function () {
//   const headerLogin = new HeaderLogin();
//   const headerSearch = new HeaderSearch();
//   const data = new Data();
//   const databaze = new Databaze();
//   const userHandler = new UserHandler();
//   const pathname = window.location.pathname;

//   headerLogin._insertLogin();

//   if (pathname === "/pc.html") {
//     data._insertDataPc();
//   } else if (pathname === "/tablet.html") {
//     data._insertDataTablet();
//   } else if (pathname === "/mobil.html") {
//     data._insertDataPhone();
//   }
//   if (window.location.pathname === "/logged-user.html") {
//     databaze._getLocalStorage();
//     const loggedUser = databaze._evidence.find((user) => user._logged === true);
//     headerLogin._insertUserInfo(loggedUser);
//   }

//   data._cartDataProgress();
//   headerLogin._getTime();
//   headerLogin._checkLoggedStatus();
// });
"use strict";

import { HeaderLogin } from "./header-login.js";
import { HeaderSearch } from "./header-search.js";
import { Data } from "./data.js";
import { Databaze } from "./databaze.js";
import { UserHandler } from "./user-handler.js";

document.addEventListener("DOMContentLoaded", function () {
  const headerLogin = new HeaderLogin();
  const headerSearch = new HeaderSearch();
  const data = new Data();
  const databaze = new Databaze();
  const userHandler = new UserHandler();
  const pathname = window.location.pathname;

  headerLogin._insertLogin();

  if (pathname === "/pc.html") {
    data._insertDataPc();
  } else if (pathname === "/tablet.html") {
    data._insertDataTablet();
  } else if (pathname === "/mobil.html") {
    data._insertDataPhone();
  }
  if (window.location.pathname === "/logged-user.html") {
    databaze._getLocalStorage();
    const loggedUser = databaze._evidence.find((user) => user._logged === true);
    headerLogin._insertUserInfo(loggedUser);
  }

  // Update cart items count in localStorage
  const updateCartItemsCount = () => {
    const cartData = JSON.parse(localStorage.getItem("_cartData")) || [];
    const cartItemsCount = cartData.length;
    localStorage.setItem("cartItemsCount", cartItemsCount);
  };

  // Display actual number of cart items
  const displayCartItemsCount = () => {
    const cartItemsCount = localStorage.getItem("cartItemsCount") || 0;
    const number = document.querySelector(".number");
    number.textContent = cartItemsCount;
  };

  updateCartItemsCount(); // Update cart items count initially
  displayCartItemsCount(); // Display cart items count on page load

  data._cartDataProgress();
  headerLogin._getTime();
  headerLogin._checkLoggedStatus();
});

