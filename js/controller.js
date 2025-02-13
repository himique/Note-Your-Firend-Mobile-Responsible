

let html = document.querySelector(".card_isolate");
let DescHtml = document.querySelector(".description_container");
let dialog = document.querySelector(".addCard_dialog");
let btnContainer = document.querySelector(".dialog_add_buttoms");
let menuAddContainer = document.querySelector(".buttons_menu");



cardList.renderCard(Database.mainArray, html);


menuAddContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('add_button')) {
    dialog.showModal();
  }
})

btnContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('form_button_cancel')) {
    dialog.close();
  }
});

btnContainer.addEventListener('click', function (event) {

  if (event.target.classList.contains('form_button_change')) {

    let nameInput = document.querySelector(".input_name").value;
    let nameSecondInput = document.querySelector(".input_secondName").value;
    let ageInput = document.querySelector(".input_age").value;
    let empInput = document.querySelector(".input_emp").value;
    let descInput = document.querySelector(".input_desc").value;
    let newId = Database.setId(Database.mainArray);
    Database.add(nameInput, nameSecondInput, ageInput, empInput, newId, descInput);
    cardList.renderCard(Database.mainArray, html);
  
    document.querySelector(".input_name").value = "";
    document.querySelector(".input_secondName").value = "";
    document.querySelector(".input_age").value = "";
    document.querySelector(".input_emp").value = "";
    document.querySelector(".input_desc").value = "";
    dialog.close();
  }
});

// function toAddCard() {

//   let newId = Database.setId(Database.mainArray);

//   Database.add(nameInput, nameSecondInput, ageInput, empInput, newId, newDesdescInputcription);
//   cardList.renderCard(Database.mainArray, html);
// }
//Remove card
html.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove_button')) {
    const cardId = parseInt(event.target.dataset.cardId); // Получаем ID из атрибута data кнопки
    if (cardId) {
      Database.removeObjectById(Database.mainArray, cardId);
      cardList.renderCard(Database.mainArray, html);
      cardList.renderDesc(Database.mainArray, DescHtml);
    }
  }
});
//Update Full Description
html.addEventListener('click', function (event) {
  const cardId = parseInt(event.target.dataset.cardButtonId);
  if (cardId) {
    let found = Database.findObjectById(Database.mainArray, cardId);
    cardList.renderDesc(found, DescHtml);
  }
});

