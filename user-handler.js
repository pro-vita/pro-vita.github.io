"use strict";

import { Databaze } from "./databaze.js";
import { User } from "./user.js";

const form = document.querySelector(".registration");
const registerBtn = document.querySelector(".register-btn-js");
export class UserHandler extends Databaze {
  constructor(_username, _name, _surname, _password, _phone, _email) {
    super(_username, _name, _surname, _password, _email);
    this._getLocalStorage();
    // Událost  uložení a vypsání dat přes formulář
    form?.addEventListener("submit", this._novyUzivatelVypis.bind(this));
    registerBtn?.addEventListener("click", this._popUpRegister.bind(this));
  }

  _novyUzivatelVypis(e) {
    // zabrání obnově stránky po zadání dat do formuláře
    e.preventDefault();
    // Vybere elementy se kterými budeme pracovat
    let inputUsername = document.querySelector("#username").value;
    let inputName = document.querySelector("#name").value;
    let inputSurname = document.querySelector("#surname").value;
    const inputPhone = document.querySelector("#phone").value;
    const inputPassword = document.querySelector("#password").value;
    const inputEmail = document.querySelector("#email").value;
    const submitError = document.querySelector(".submitError");

    submitError.classList.remove("hidden");
    // Pomocné regex funkce na validaci
    function _regexCZletters(string) {
      const inputRegex = /^[ěščřžýáíéóúůďťňĎŇŤŠČŘŽÝÁÍÉÚŮĚÓA-Za-z]+$/;
      return inputRegex.test(string);
    }
    function _regexNumber(num) {
      const inputRegex = /^[0-9]+$/;
      return inputRegex.test(num);
    }
    // Validace inputu
    if (
      inputUsername === "" ||
      inputName === "" ||
      inputSurname === "" ||
      inputPassword === "" ||
      inputPhone === "" ||
      inputEmail === ""
    ) {
      return (submitError.textContent = "Žádné pole nesmí být prázdné!");
    } else if (!_regexCZletters(inputName) || !_regexCZletters(inputSurname)) {
      return (submitError.textContent = "Zkontrolujte své jméno a příjmení!");
    } else if (!_regexNumber(inputPhone) || inputPhone.length !== 9) {
      return (submitError.textContent = "Zadejte správně svůj telefon!");
    } else if (inputPassword.length < 6) {
      return (submitError.textContent = "Heslo musí mít nejméně 8 znaků!");
    } else {
      // Korekce jména a příjmení pokud uživatel např. zadá vše malým
      inputName =
        inputName[0].toUpperCase() + inputName.slice(1).toLowerCase().trim();
      inputSurname =
        inputSurname[0].toUpperCase() +
        inputSurname.slice(1).toLowerCase().trim();
      inputEmail.trim();
      // Přidání nového pojištěného do proměnné
      const user = new User(
        inputUsername,
        inputName,
        inputSurname,
        inputPassword,
        inputPhone,
        inputEmail
      );

      console.log(`Děkujeme za vytvoření účtu ${user._username} :)`);
      this._addUser(user);
      this._userToConsole();
      submitError.classList.add("hidden");
      submitError.textContent = "";
      this._setLocalStorage();
    }
  }

  _popUpRegister() {
    // Create a backdrop element
    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");
    document.body.appendChild(backdrop);
    const html = `
    <div class="pop-up" >
    <p>Registrace proběhla úspěšně!</p>
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
