"use strict";

var buttonSearch = document.querySelector(".modal__button");
var formSearch = document.querySelector(".modal__form");

var arrivalDate = formSearch.querySelector("[name=arrival]");
var departureDate = formSearch.querySelector("[name=departure]");
var adultsCount = formSearch.querySelector("[name=adults]");
var childrenCount = formSearch.querySelector("[name=children]");

var errorMessage = formSearch.querySelector(".modal__error");

var isStorageSupport = true;
var adultsStorage = "";
var childrenStorage = "";

try {
  adultsStorage = localStorage.getItem("adultsCount");
  childrenStorage = localStorage.getItem("childrenCount");
} catch (err) {
  isStorageSupport = false;
}

buttonSearch.addEventListener("click", function (evt) {
  evt.preventDefault();
  formSearch.classList.toggle("modal__form--close");
  arrivalDate.focus();
  if (adultsStorage && childrenStorage) {
    adultsCount.value = adultsStorage;
    childrenCount.value = childrenStorage;
  }
  if (errorMessage.classList.contains("modal__error--show")) {
    errorMessage.classList.remove("modal__error--show");
  }
  if (formSearch.classList.contains("modal__form--close")) {
    formSearch.classList.add("modal__form--animation");
  }
});

formSearch.addEventListener("submit", function (evt) {
  if (!arrivalDate.value || !departureDate.value || !adultsCount.value || !childrenCount.value) {
    evt.preventDefault();
    errorMessage.classList.add("modal__error--show");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("adultsCount", adultsCount.value);
      localStorage.setItem("childrenCount", childrenCount.value);
      if (errorMessage.classList.contains("modal__error--show")) {
        errorMessage.classList.remove("modal__error--show");
      }
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    if (!formSearch.classList.contains("modal__form--close")) {
      evt.preventDefault();
      formSearch.classList.add("modal__form--close");
    }
    if (errorMessage.classList.contains("modal__error--show")) {
      evt.preventDefault();
      errorMessage.classList.remove("modal__error--show");
    }
  }
});
