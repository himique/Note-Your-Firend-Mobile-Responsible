

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
let inputShare = document.querySelector(".input_share");

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
    // setDataBtn() {
    //   shareCardDialog.addEventListener('click', function (event) {
    //     if (event.target.classList.contains('form_button_import')) {
    //       Database.mainArray = JSON.parse(inputShare.value);
    //       cardList.renderCard(Database.mainArray, html);
    //       document.querySelector(".input_share").value = JSON.stringify(Database.mainArray);
    //       shareCardDialog.close();
    //     }
    //   });
    // },
    setDataBtn() {
      shareCardDialog.addEventListener('click', function (event) {
        if (event.target.classList.contains('form_button_import')) {
          try {
            const newData = JSON.parse(inputShare.value); // Получаем новые данные из inputShare
    
            if (Array.isArray(newData)) {
              // Если JSON.parse вернул массив, заменяем существующий массив новым
              Database.mainArray = [...newData]; // Используем spread syntax для создания нового массива
            } else if (typeof newData === 'object' && newData !== null) {
              // Если JSON.parse вернул одиночный объект, создаем массив, содержащий только этот объект
              Database.mainArray = [newData]; // Заменяем существующий массив массивом с одним элементом
            } else {
              console.error("Недопустимый формат данных в поле 'Поделиться'. Ожидается массив или объект.");
              return; // Прекращаем выполнение функции
            }
    
            cardList.renderCard(Database.mainArray, html); // Обновляем отображение карточек
            document.querySelector(".input_share").value = JSON.stringify(Database.mainArray); // Обновляем значение поля "Поделиться"
            shareCardDialog.close();
    
          } catch (error) {
            console.error("Ошибка при разборе JSON:", error);
            // Добавьте сюда обработку ошибки (например, отображение сообщения пользователю)
          }
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
          cardList.renderDesc(Database.mainArray, DescHtml);
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
Cards.shareCard.setDataBtn();

Cards.removeBtn();
Cards.descCard();