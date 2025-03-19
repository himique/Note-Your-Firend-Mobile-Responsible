

let html = document.querySelector(".card_isolate");
let DescHtml = document.querySelector(".description_container");
let dialog = document.querySelector(".addCard_dialog");
let btnContainer = document.querySelector(".dialog_add_buttoms");
let menuAddContainer = document.querySelector(".buttons_menu");

let shareCardDialog = document.querySelector(".shareCard_dialog");
let btnShareContainer = document.querySelector(".dialog_share_buttons");

let searchCardDialog = document.querySelector(".searchCard_dialog");
let formSearch = document.querySelector(".form_search");
let InputSearch = document.querySelector(".input_search");
let searchBtn = document.querySelector(".form_button_search");
let searchButtons = document.querySelector(".dialog_search_buttons");
let searchCloseBtn = document.querySelector(".form_button_search_close");
let searchMenuBtn = document.querySelector(".search_button");

let changeDialog = document.querySelector(".changeCard_dialog");
let formChange = document.querySelector(".form_change");
let inputNameChange = document.querySelector(".input_name_change");
let inputSecondNameChange = document.querySelector(".input_secondName_change");
let inputAgeChange = document.querySelector(".input_age_change");
let inputEmpChange = document.querySelector(".input_emp_change");
let inputDescChange = document.querySelector(".input_desc_change");
let buttonsChange = document.querySelector(".dialog_change_buttons");
let descChangeButtonsMenu = document.querySelector(".change_menu");
let changeButton = document.querySelector(".change_button");
let updateButton = changeDialog.querySelector('.form_button_change_update');

let wrapper = document.querySelector(".form");
let shareWrapper = document.querySelector(".form_share");
let shareBtn = document.querySelector(".share_button");
let inputShare = document.querySelector(".input_share");

let searchInput = document.querySelector(".input_search");
let searchAutoResults = document.querySelector(".autocomplete-results");
const resultsContainer = document.querySelector('.autocomplete-results');

cardList.renderCard(Database.mainArray, html);
//Share
let Cards = {
  shareCard: {
    shareToShow() {
      menuAddContainer.addEventListener('click', function (event) {
        if (shareBtn.contains(event.target)) {
          shareCardDialog.showModal();
        }
      })

    },
    shareToClose() {
      btnShareContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('form_button_close')) {//here
          shareCardDialog.close();
        }
      });

    },
    shareToCloseByScreen() {
      shareCardDialog.addEventListener('click', function (event) {//here
        if (!shareWrapper.contains(event.target)) {
          shareCardDialog.close();
        }
      });

    },
    shareMain(arr) {
      menuAddContainer.addEventListener('click', function (event) {
        if (shareBtn.contains(event.target)) {
          document.querySelector(".input_share").value = JSON.stringify(arr);
          // JSON.parse(searchInput.value);
        }
      });

    },
    copyBtn() {
      shareCardDialog.addEventListener('click', function (event) {
        if (event.target.classList.contains('form_button_copy')) {
          inputShare.select();
          inputShare.setSelectionRange(0, 99999); // For mobile devices
          // Copy the text inside the text field
          navigator.clipboard.writeText(inputShare.value);
        }
      });

    },
    setDataBtn(arr) {
      shareCardDialog.addEventListener('click', function (event) {
        if (event.target.classList.contains('form_button_import')) {

          const Newitems = JSON.parse(inputShare.value); // Получаем новые данные из inputShare
          Database.deleteAllItems(Database.mainArray);
          console.log(Database.mainArray);
          arr.push(...Newitems);
          cardList.renderCard(arr, html); // Обновляем отображение карточек
          cardList.renderWelcome(DescHtml);
          document.querySelector(".input_share").value = JSON.stringify(arr); // Обновляем значение поля "Поделиться"
          shareCardDialog.close();
        }
      });
    },
  },
  addCard: {
    addToShow() {
      menuAddContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('add_button')) {
          dialog.showModal();
        }
      });
    },
    addToClose() {
      btnContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('form_button_cancel')) {
          dialog.close();
        }
      });
    },
    AddToCloseByScreen() {
      dialog.addEventListener('click', function (event) {
        if (!wrapper.contains(event.target)) {
          dialog.close();
        }
      });
    },
    addMain() {
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
          cardList.renderWelcome(DescHtml);
          document.querySelector(".input_name").value = "";
          document.querySelector(".input_secondName").value = "";
          document.querySelector(".input_age").value = "";
          document.querySelector(".input_emp").value = "";
          document.querySelector(".input_desc").value = "";
          dialog.close();
        }
      });

    },
  },
  removeBtn() {
    html.addEventListener('click', function (event) {
      if (event.target.classList.contains('remove_button')) {
        const cardId = parseInt(event.target.dataset.cardId); // Получаем ID из атрибута data кнопки
        if (cardId) {
          Database.removeObjectById(Database.mainArray, cardId);
          cardList.renderCard(Database.mainArray, html);
          cardList.renderWelcome(DescHtml);
          // cardList.renderDesc(Database.mainArray, DescHtml);
        }
      }
    });
  },
  descCard() {
    html.addEventListener('click', function (event) {
      const cardId = parseInt(event.target.dataset.cardButtonId);
      if (cardId) {
        let found = Database.findObjectById(Database.mainArray, cardId);
        cardList.renderDesc(found, DescHtml);

      }
    });
  },
  searchCard: {
    searchToShow() {
      menuAddContainer.addEventListener('click', function (event) {
        if (searchMenuBtn.contains(event.target)) {
          searchCardDialog.showModal();
        }
      })
    },
    searchToClose() {
      searchButtons.addEventListener('click', function (event) {
        if (event.target.classList.contains('form_button_search_close')) {
          searchCardDialog.close();
        }
      })
    },
    searchToCloseByScreen() {
      searchCardDialog.addEventListener('click', function (event) {
        if (!formSearch.contains(event.target)) {
          searchCardDialog.close();
        }
      });
    },
    findObjectByName(arr, query) {
      query = query.toLowerCase();
      return arr.filter(item => item.name.toLowerCase().includes(query));
    },
    findObjectBySecondName(arr, query) {
      query = query.toLowerCase();
      return arr.filter(item => item.secondName.toLowerCase().includes(query));
    },
    findObjectByEmp(arr, query) {
      query = query.toLowerCase();
      return arr.filter(item => item.emp.toLowerCase().includes(query));
    },
    // searchMain() {
    //                                                To do
    // },
  },
  changeDesc: {
    changeToShow(arr) {
      DescHtml.addEventListener('click', function (event) {
        let target = event.target;
        // Проходим по родителям, пока не дойдем до card_isolate или не найдем change_button
        while (target && !target.classList.contains('description_container')) {
          if (target.classList.contains('change_button')) {
            const cardId = parseInt(target.dataset.changeId);

            updateButton.dataset.changeId = cardId;
            let ArrayFind = Database.findObjectById(arr, cardId);
            inputNameChange.value = ArrayFind.name;
            inputSecondNameChange.value = ArrayFind.secondName;
            inputAgeChange.value = ArrayFind.age;
            inputEmpChange.value = ArrayFind.emp;
            inputDescChange.value = ArrayFind.desc;
            changeDialog.showModal();
            return;
          }

          target = target.parentNode;
        }

      });
    },
    changeToClose() {

      formChange.addEventListener('click', function (event) {
        let target = event.target;
        while (target && !target.classList.contains('changeCard_dialog')) {
          if (target.classList.contains('form_button_change_cancel')) {
            changeDialog.close();
            return;
          }
          target = target.parentNode;
        }
      });
    },
    changeToCloseByScreen() {
      changeDialog.addEventListener('click', function (event) {
        if (!formChange.contains(event.target)) {
          changeDialog.close();
        }
      });
    },
    changeMain(arr) {

      formChange.addEventListener('click', function (event) {
        if (event.target.classList.contains('form_button_change_update')) {
          const card = parseInt(event.target.dataset.changeId);
          let ArrayFind = Database.findObjectById(arr, card);

          const nameField = inputNameChange.value
          const secondNameField = inputSecondNameChange.value;
          const ageField = inputAgeChange.value;
          const empField = inputEmpChange.value;
          const descField = inputDescChange.value;



          Database.update.name(arr, ArrayFind.id, nameField);
          Database.update.secondName(arr, ArrayFind.id, secondNameField);
          Database.update.age(arr, ArrayFind.id, ageField);
          Database.update.desc(arr, ArrayFind.id, descField);
          Database.update.emp(arr, ArrayFind.id, empField);

          cardList.renderCard(arr, html);
          // cardList.renderDesc(arr, DescHtml);
          cardList.renderWelcome(DescHtml);

          nameField.value = "";
          secondNameField.value = "";
          ageField.value = "";
          empField.value = "";
          descField.value = "";
          changeDialog.close();
        }

      });

    },
  },
}

Cards.addCard.addToShow();
Cards.addCard.addToClose();
Cards.addCard.AddToCloseByScreen();
Cards.addCard.addMain();

Cards.shareCard.shareToShow();
Cards.shareCard.shareToClose();
Cards.shareCard.shareToCloseByScreen();
Cards.shareCard.shareMain(Database.mainArray);
Cards.shareCard.copyBtn();
Cards.shareCard.setDataBtn(Database.mainArray);

Cards.searchCard.searchToShow();
Cards.searchCard.searchToClose();
Cards.searchCard.searchToCloseByScreen();

Cards.changeDesc.changeToShow(Database.mainArray);
Cards.changeDesc.changeToClose();
Cards.changeDesc.changeToCloseByScreen();
Cards.changeDesc.changeMain(Database.mainArray);

Cards.removeBtn();
Cards.descCard();
