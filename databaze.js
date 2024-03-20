"use strict";

import { User } from "./user.js";

export class Databaze extends User {
  constructor(_username, _name, _surname, _password, _phone, _email) {
    super(_username, _name, _surname, _password, _email);
    this._evidence = [];
  }

  _addUser(user) {
    return this._evidence.push(user);
  }

  _setLocalStorage() {
    localStorage.setItem("_evidence", JSON.stringify(this._evidence));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("_evidence"));
    if (!data) return;
    this._evidence = data;
  }

  _userToConsole() {
    let output = "";
    let i = 0;
    for (const user of this._evidence) {
      i++;
      output += `Username: ${user._username} \n Name: ${user._name} \n Surname: ${user._surname} \n Phone number: ${user._phone} \n Email: ${user._email} \n`;
    }
    if (output === "") output += "V evidenci není žádný pojištěný!";
    console.log(output);
  }
}
