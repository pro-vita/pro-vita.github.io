"user strict";

import { Databaze } from "./databaze.js";

export class HeaderLogin extends Databaze {
  constructor(_username, _name, _surname, _password, _phone, _email, _logged) {
    super(_username, _name, _surname, _password, _email);
    this._logged = false;
  }

  _userLogin(e) {
    e.preventDefault();
    this._getLocalStorage();
    const loginName = document.querySelector("#login-name").value;
    const loginPassword = document.querySelector("#login-password").value;
    const loginError = document.querySelector(".login-error");
    const user = this._evidence.find(
      (user) => user._username === loginName && user._password === loginPassword
    );
    if (user) {
      user._logged = true;
      this._setLocalStorage();
      this._insertLogin(user, loginError);
    } else {
      loginError.textContent =
        "Zadali jste špatně uživatelské jméno nebo heslo!";
    }
  }

  _insertUserInfo(user) {
    console.log("hello");
    console.log(user);
    const loggedDetails = document.querySelector(".user-details");
    if (user) {
      console.log(user, loggedDetails);
      const html = `
        <table class="user-info">
  <tr>
    <td>Uživatelské jméno:</td>
    <td>${user._username}</td>
  </tr>
  <tr>
    <td>Jméno:</td>
    <td>${user._name}</td>
  </tr>
  <tr>
    <td>Příjmení:</td>
    <td>${user._surname}</td>
  </tr>
  <tr>
    <td>Heslo:</td>
    <td>${user._password}</td>
  </tr>
  <tr>
    <td>Telefon:</td>
    <td>${user._phone}</td>
  </tr>
  <tr>
    <td>Email:</td>
    <td>${user._email}</td>
  </tr>
</table>    
        `;
      loggedDetails.insertAdjacentHTML("beforeend", html);
    }
  }

  _getTime() {
    setInterval(function () {
      const time = document.querySelector(".time");
      const now = new Date();
      const hour = `${now.getHours()}`.padStart(2, 0);
      const minute = `${now.getMinutes()}`.padStart(2, 0);
      const second = `${now.getSeconds()}`.padStart(2, 0);
      const output = hour + ":" + minute + ":" + second;
      time.textContent = output;
    }, 1000);
  }

  _insertLogin(user, loginError) {
    const login = document.querySelector(".login-js");
    if (!user || !user._logged) {
      login.innerHTML = "";
      const html = `
        <p class="login-error"></p>
        <form class="user">
          <input id="login-name" type="text" placeholder="Přihlašovací jméno" />
          <input id="login-password" type="password" placeholder="Heslo" />
          <input type="submit" value="Přihlásit se" />
        </form>
        <p class="register-p">
          Pokud nemáte účet zde se můžete<a href="register.html">zaregistrovat</a>
        </p>
      `;
      login.insertAdjacentHTML("beforeend", html);
      const loginForm = login.querySelector("form.user");
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this._userLogin(e);
      });
    } else if (user._logged) {
      const login = document.querySelector(".login-js");
      login.innerHTML = "";
      loginError.textContent = "";
      const html = `
      <div class="user">
      <a href="logged-user.html" class="logged-user" >${user._username}</a>
      <button class="sign-off-btn sign-off-js">Odhlásit se</button>
      </div>
      `;
      login.insertAdjacentHTML("beforeend", html);
      const signOff = document.querySelector(".sign-off-js");
      signOff.addEventListener("click", () => {
        user._logged = false;
        this._setLocalStorage();
        login.innerHTML = "";
        const html = `
      <p class="login-error"></p>
      <form class="user">
        <input id="login-name" type="text" placeholder="Přihlašovací jméno" />
        <input id="login-password" type="password" placeholder="Heslo" />
        <input type="submit" value="Přihlásit se" />
      </form>
      <p class="register-p">
        Pokud nemáte účet zde se můžete<a href="register.html">
          zaregistrovat</a
        >
      </p>
      `;
        login.insertAdjacentHTML("beforeend", html);
        window.location.href = "./index.html";
      });
    }
  }

  _checkLoggedStatus() {
    this._getLocalStorage();
    const loggedUser = this._evidence.find((user) => user._logged === true);
    if (loggedUser) {
      const login = document.querySelector(".login-js");
      login.innerHTML = "";
      const html = `
      <div class="user">
      <a href="logged-user.html" class="logged-user">${loggedUser._username}</a>
      <button class="sign-off-btn sign-off-js">Odhlásit se</button>
      </div>
      `;
      login.insertAdjacentHTML("beforeend", html);
      const signOff = document.querySelector(".sign-off-js");
      signOff.addEventListener("click", () => {
        loggedUser._logged = false;
        this._setLocalStorage();
        login.innerHTML = "";
        const html = `
      <p class="login-error"></p>
      <form class="user">
        <input id="login-name" type="text" placeholder="Přihlašovací jméno" />
        <input id="login-password" type="password" placeholder="Heslo" />
        <input type="submit" value="Přihlásit se" />
      </form>
      <p class="register-p">
        Pokud nemáte účet zde se můžete<a href="register.html">
          zaregistrovat</a
        >
      </p>
      `;
        login.insertAdjacentHTML("beforeend", html);
        window.location.href = "./index.html";
      });
    }
  }
}
