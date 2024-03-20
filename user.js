"use strict";

export class User {
  constructor(_username, _name, _surname, _password, _phone, _email) {
    this._username = _username;
    this._name = _name;
    this._surname = _surname;
    this._password = _password;
    this._phone = _phone;
    this._email = _email;
    this._logged = false;
  }

  _toString() {
    return `Username: ${this._username} Name: ${this._name} Surname: ${this._surname} Password: ${this._password} Phone number: ${this._phone}  Email: ${this._email}`;
  }
}
