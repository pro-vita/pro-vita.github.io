"use strict";
const _data = [
  {
    img: "hall3000.jpg",
    title: "HALL3000 PRO MAX",
    about: "Nejvýkonnější počítač našeho výběru.",
    price: 50000,
    id: 0,
  },
  {
    img: "notebook.jpg",
    title: "BOOK PRO",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 25000,
    id: 1,
  },

  {
    img: "hall3001.jpg",
    title: "HALL3000 SEMI-PRO",
    about: "'Lehčí' verze PRO MAX.",
    price: 45200,
    id: 2,
  },
  {
    img: "notebook1.jpg",
    title: "BOOK SEMI-PRO",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 22000,
    id: 3,
  },
  {
    img: "hall3002.jpg",
    title: "HALL3000 PRO LIGHT",
    about: "'PC pro méně náročné uživatel, ale zvládne toho dost i tak!.",
    price: 38500,
    id: 4,
  },
  {
    img: "notebook2.jpg",
    title: "BOOK 3",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 18000,
    id: 5,
  },

  {
    img: "double1.jpg",
    title: "PAD PRO X",
    about: "Nejlepší tablet který tady máme.",
    price: 22600,
    id: 6,
  },
  {
    img: "double1.jpg",
    title: "PAD PRO L",
    about: "Vhodný tablet pro práci v kanceláři.",
    price: 20800,
    id: 7,
  },
  {
    img: "double2.jpg",
    title: "PAD SPORT EXTREME",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 17400,
    id: 8,
  },
  {
    img: "double2.jpg",
    title: "PAD SPORT SPEED",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 15300,
    id: 9,
  },
  {
    img: "tablet.jpg",
    title: "PAD O",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 13800,
    id: 10,
  },
  {
    img: "tablet1.jpg",
    title: "PAD L",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 12100,
    id: 11,
  },
  {
    img: "double11.jpg",
    title: "PHONE X",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 35000,
    id: 12,
  },
  {
    img: "double11.jpg",
    title: "PHONE Y",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 32000,
    id: 13,
  },
  {
    img: "double22.jpg",
    title: "MEDIUM",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 26000,
    id: 14,
  },
  {
    img: "double22.jpg",
    title: "MEDIUM L",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 24000,
    id: 15,
  },
  {
    img: "phone.jpg",
    title: "BLUE",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 20000,
    id: 16,
  },
  {
    img: "phone1.jpg",
    title: "ORANGE",
    about: "Vhodný notebook pro práci v kanceláři.",
    price: 18000,
    id: 17,
  },
];
const _cartData = [];

export class Data {
  constructor() {
    this._cartData = this._getItems();
  }

  _setItems(cartData) {
    localStorage.setItem("_cartData", JSON.stringify(cartData));
  }

  _getItems() {
    const data = JSON.parse(localStorage.getItem("_cartData"));
    return data || [];
  }

  _insertDataPc() {
    const row0 = document.querySelector(".pc-row-0-js");
    const row1 = document.querySelector(".pc-row-1-js");
    const row2 = document.querySelector(".pc-row-2-js");
    const number = document.querySelector(".number");
    const self = this;

    for (let i = 0; i < 6; i++) {
      const html = `
    <div class="pc-product" id="${_data[i].id}">
      <img src=${_data[i].img} alt="${_data[i].title}" />
      <div class="description">
      <h2>${_data[i].title}</h2>
        <p class="description-p">
          ${_data[i].about}
        </p>
        <p><strong>Cena: ${_data[i].price.toLocaleString()}Kč</strong></p>
        <button class="decrement decrement-js" id="${_data[i].id}">-</button>
          <span class="quantity">1</span>
          <button class="increment increment-js" id="${_data[i].id}">+</button>
        <button class="product-btn add-btn-js" id="${_data[i].id}">
          <strong>Přidat do košíku</strong>
        </button>
      </div>
      </div>`;
      if (i < 2) {
        row0.insertAdjacentHTML("beforeend", html);
      } else if (i < 4) {
        row1.insertAdjacentHTML("beforeend", html);
      } else {
        row2.insertAdjacentHTML("beforeend", html);
      }
    }
    const addBtns = document.querySelectorAll(".add-btn-js");
    addBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const quantitySpan = btn.parentElement.querySelector(".quantity");
        const quantity = parseInt(quantitySpan.textContent);

        // Get the ID of the clicked item
        const itemId = parseInt(btn.getAttribute("id"));

        // Find the item with the corresponding ID in _data array
        const selectedItem = _data.find((item) => item.id === itemId);

        // Retrieve existing cart items from local storage
        const existingCartData = self._getItems() || [];

        for (let i = 1; i <= quantity; i++) {
          // Add the new item to the existing cart items
          existingCartData.push(selectedItem);
        }

        number.textContent = existingCartData.length;

        // Update local storage with the updated cart data
        self._setItems(existingCartData);
      });
    });

    const addIncrement = document.querySelectorAll(".increment");
    addIncrement.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Get the quantity span relative to the clicked button
        const quantitySpan = btn.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantitySpan.textContent);
        quantity++;
        quantitySpan.textContent = quantity;
      });
    });

    const addDecrement = document.querySelectorAll(".decrement");
    addDecrement.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Get the quantity span relative to the clicked button
        const quantitySpan = btn.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantitySpan.textContent);
        if (quantity > 1) {
          quantity--;
          quantitySpan.textContent = quantity;
        }
      });
    });
  }

  _insertDataTablet() {
    const row0 = document.querySelector(".tablet-row-0-js");
    const row1 = document.querySelector(".tablet-row-1-js");
    const row2 = document.querySelector(".tablet-row-2-js");
    const number = document.querySelector(".number");
    const self = this;

    for (let i = 0; i < 12; i++) {
      const html = `
    <div class="pc-product" id="${_data[i].id}">
      <img src=${_data[i].img} alt="${_data[i].title}" />
      <div class="description">
      <h2>${_data[i].title}</h2>
        <p class="description-p">
          ${_data[i].about}
        </p>
        <p><strong>Cena: ${_data[i].price.toLocaleString()}Kč</strong></p>
        <button class="decrement decrement-js" id="${_data[i].id}">-</button>
          <span class="quantity">1</span>
          <button class="increment increment-js" id="${_data[i].id}">+</button>
        <button class="product-btn add-btn-js" id="${_data[i].id}">
          <strong>Přidat do košíku</strong>
        </button>
    </div>
    </div>`;
      switch (i) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          continue;
        case 6:
          row0.insertAdjacentHTML("beforeend", html);
          break;
        case 7:
          row0.insertAdjacentHTML("beforeend", html);
          break;
        case 8:
          row1.insertAdjacentHTML("beforeend", html);
          break;
        case 9:
          row1.insertAdjacentHTML("beforeend", html);
          break;
        case 10:
          row2.insertAdjacentHTML("beforeend", html);
          break;
        case 11:
          row2.insertAdjacentHTML("beforeend", html);
          break;
      }
    }

    const addBtns = document.querySelectorAll(".add-btn-js");
    addBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const quantitySpan = btn.parentElement.querySelector(".quantity");
        const quantity = parseInt(quantitySpan.textContent);

        // Get the ID of the clicked item
        const itemId = parseInt(btn.getAttribute("id"));

        // Find the item with the corresponding ID in _data array
        const selectedItem = _data.find((item) => item.id === itemId);

        // Retrieve existing cart items from local storage
        const existingCartData = self._getItems() || [];

        for (let i = 1; i <= quantity; i++) {
          // Add the new item to the existing cart items
          existingCartData.push(selectedItem);
        }

        number.textContent = existingCartData.length;

        // Update local storage with the updated cart data
        self._setItems(existingCartData);
      });
    });

    const addIncrement = document.querySelectorAll(".increment");
    addIncrement.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Get the quantity span relative to the clicked button
        const quantitySpan = btn.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantitySpan.textContent);
        quantity++;
        quantitySpan.textContent = quantity;
      });
    });

    const addDecrement = document.querySelectorAll(".decrement");
    addDecrement.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Get the quantity span relative to the clicked button
        const quantitySpan = btn.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantitySpan.textContent);
        if (quantity > 1) {
          quantity--;
          quantitySpan.textContent = quantity;
        }
      });
    });
  }

  _insertDataPhone() {
    const row0 = document.querySelector(".phone-row-0-js");
    const row1 = document.querySelector(".phone-row-1-js");
    const row2 = document.querySelector(".phone-row-2-js");
    const number = document.querySelector(".number");
    const self = this;

    for (let i = 0; i < 18; i++) {
      const html = `
      <div class="pc-product" id="${_data[i].id}">
        <img src=${_data[i].img} alt="${_data[i].title}" />
        <div class="description">
        <h2>${_data[i].title}</h2>
          <p class="description-p">
            ${_data[i].about}
          </p>
          <p><strong>Cena: ${_data[i].price.toLocaleString()}Kč</strong></p>
          <button class="decrement decrement-js" id="${_data[i].id}">-</button>
          <span class="quantity">1</span>
          <button class="increment increment-js" id="${_data[i].id}">+</button>
          <button class="product-btn add-btn-js" id="${_data[i].id}">
            <strong>Přidat do košíku</strong>
          </button>
      </div>
      </div>`;
      switch (i) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
          continue;
        case 12:
          row0.insertAdjacentHTML("beforeend", html);
          break;
        case 13:
          row0.insertAdjacentHTML("beforeend", html);
          break;
        case 14:
          row1.insertAdjacentHTML("beforeend", html);
          break;
        case 15:
          row1.insertAdjacentHTML("beforeend", html);
          break;
        case 16:
          row2.insertAdjacentHTML("beforeend", html);
          break;
        case 17:
          row2.insertAdjacentHTML("beforeend", html);
          break;
      }
    }

    const addBtns = document.querySelectorAll(".add-btn-js");
    addBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const quantitySpan = btn.parentElement.querySelector(".quantity");
        const quantity = parseInt(quantitySpan.textContent);

        // Get the ID of the clicked item
        const itemId = parseInt(btn.getAttribute("id"));

        // Find the item with the corresponding ID in _data array
        const selectedItem = _data.find((item) => item.id === itemId);

        // Retrieve existing cart items from local storage
        const existingCartData = self._getItems() || [];

        for (let i = 1; i <= quantity; i++) {
          // Add the new item to the existing cart items
          existingCartData.push(selectedItem);
        }

        number.textContent = existingCartData.length;

        // Update local storage with the updated cart data
        self._setItems(existingCartData);
      });
    });

    const addIncrement = document.querySelectorAll(".increment");
    addIncrement.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Get the quantity span relative to the clicked button
        const quantitySpan = btn.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantitySpan.textContent);
        quantity++;
        quantitySpan.textContent = quantity;
      });
    });

    const addDecrement = document.querySelectorAll(".decrement");
    addDecrement.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Get the quantity span relative to the clicked button
        const quantitySpan = btn.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantitySpan.textContent);
        if (quantity > 1) {
          quantity--;
          quantitySpan.textContent = quantity;
        }
      });
    });
  }

  _cartDataProgress() {
    const items = document.querySelector(".items-js");
    const number = document.querySelector(".number");
    const totalPrice = document.querySelector(".total-price-js");
    const totalDiv = document.querySelector(".total");
    const self = this;
    let total = 0;
    let shipping = 0;

    if (!items) {
      console.error("Error: Element with class 'items-js' not found.");
      return; // Exit the function if the element is not found
    }

    // Retrieve data from Local Storage
    let cartData = this._getItems() || [];

    // Display items in the shopping cart
    if (cartData.length > 0) {
      const shippingForm = document.querySelector(".shipping-js");
      shippingForm?.addEventListener("change", function (e) {
        const selectedOption = e.target;
        if (selectedOption.checked) {
          const selectedShipping = parseInt(selectedOption.value);
          // Subtract the previous shipping cost from the total
          total -= shipping;
          // Update the shipping cost
          shipping = selectedShipping;
          // Add the new shipping cost to the total
          total += shipping;
          // Update the total price text content to reflect the change in shipping
          totalPrice.textContent = `Doprava: ${shipping}Kč Celkem: ${total.toLocaleString()}Kč`;
        }
      });

      const html = `
            <button class="pay-btn pay-btn-js">Zaplaťit</button>
        `;
      totalDiv?.insertAdjacentHTML("beforeend", html);

      // Clear the content of items before inserting new ones
      items.innerHTML = "";

      for (let i = 0; i < cartData.length; i++) {
        const item = cartData[i];
        total += item.price;
        const htmlItems = `
                <div class="pc-product-cart" id="${i}">
                    <img src=${item.img} alt="${item.title}" />
                    <div class="description">
                        <h2>${item.title}</h2>
                        <p class="description-p">${item.about}</p>
                        <p><strong>Cena: ${item.price.toLocaleString()}Kč</strong></p>
                        <button class="delete-btn delete-btn-js" data-id="${i}">Odstranit</button>
                    </div>
                </div>
            `;
        items.insertAdjacentHTML("beforeend", htmlItems);
      }

      // Update the cart number
      number.textContent = cartData.length;
      // Update the total price display
      totalPrice.textContent = `Doprava: ${shipping}Kč Celkem: ${total.toLocaleString()}Kč`;

      // Event listener for the delete buttons
      const deleteBtns = document.querySelectorAll(".delete-btn-js");
      deleteBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          const itemId = parseInt(btn.getAttribute("data-id"));
          console.log("Deleting item with itemId:", itemId);
          // Remove the item from the cartData array
          const removedItems = cartData.splice(itemId, 1); // Remove the item at the specified index
          console.log("Removed items:", removedItems);
          if (removedItems.length > 0) {
            const removedItem = removedItems[0];
            if (
              typeof removedItem !== "undefined" &&
              typeof removedItem.price === "number"
            ) {
              // Update the local storage
              self._setItems(cartData);
              // Remove the item from the UI
              btn.parentElement.parentElement.remove();
              // Reindex the items in the cartData array
              cartData.forEach((item, i) => {
                item.id = i; // Update the id property
              });
              // Update the data-id attributes of remaining delete buttons
              const remainingDeleteBtns =
                document.querySelectorAll(".delete-btn-js");
              remainingDeleteBtns.forEach((btn, i) => {
                btn.setAttribute("data-id", i);
              });
              // Update the total price and cart number
              total -= removedItem.price;
              totalPrice.textContent = `Doprava: ${shipping}Kč Celkem: ${total.toLocaleString()}Kč`;
              number.textContent = cartData.length;
            } else {
              console.error(
                "Error: Removed item has undefined or invalid price:",
                removedItem
              );
              console.log("cartData after deletion:", cartData);
            }
          } else {
            console.error("Error: Removed item is undefined.");
            console.log("cartData after deletion:", cartData);
          }
        });
      });

      // Event listener for the pay button
      const payBtn = document.querySelector(".pay-btn-js");
      payBtn?.addEventListener("click", function () {
        localStorage.removeItem("_cartData");
        self._popUpCart();
      });
    } else {
      // If no items in the cart, clear the content and display appropriate message
      items.innerHTML = "<p>Your cart is empty.</p>";
      number.textContent = 0;
      totalPrice.textContent = `Doprava: 0Kč Celkem: 0Kč`;
    }
  }

  _popUpCart() {
    // Create a backdrop element
    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");
    document.body.appendChild(backdrop);
    const html = `
    <div class="pop-up" >
    <p>Děkujeme za váš nákup :)</p>
    <button class="back-home back-home-js">Zpět na hlavní stránku</button>
    </div>
    `;
    document.body.insertAdjacentHTML("beforeend", html);
    const backHome = document.querySelector(".back-home-js");
    backHome.addEventListener(
      "click",
      () => (window.location.href = "index.html")
    );
  }
}
