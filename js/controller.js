

let html = document.querySelector(".card_isolate");
let DescHtml = document.querySelector(".description_container");
let dialog = document.querySelector(".addCard_dialog");
let btnContainer = document.querySelector(".dialog_add_buttoms");
let menuAddContainer = document.querySelector(".buttons_menu");

let shareCardDialog = document.querySelector(".shareCard_dialog");
let btnShareContainer = document.querySelector(".dialog_share_buttons");

let wrapper = document.querySelector(".form");
let shareWrapper = document.querySelector(".form_share");
let shareBtn = document.querySelector(".share_button");

cardList.renderCard(Database.mainArray, html);
//Share

  menuAddContainer.addEventListener('click', function (event) {
    if (shareBtn.contains(event.target)) {
      shareCardDialog.showModal();
    }
  });
  btnShareContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('form_button_close')) {//here
      shareCardDialog.close();
    }
  });
  shareCardDialog.addEventListener('click', function (event) {//here
    if (!shareWrapper.contains(event.target)) {
      shareCardDialog.close();
    }
  });
  btnShareContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('form_button_close')) {
      let shareInput = document.querySelector(".input_share").value;
      cardList.renderCard(Database.mainArray, html);
      document.querySelector(".input_name").value = "";
      dialog.close();
    }
  });

//Add card
menuAddContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('add_button')) {
    dialog.showModal();
  }
});

btnContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('form_button_cancel')) {
    dialog.close();
  }
});
dialog.addEventListener('click', function (event) {
  if (!wrapper.contains(event.target)) {
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

//Remove
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
