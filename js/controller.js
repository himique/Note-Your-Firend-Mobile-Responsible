

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
  removeButton(arr, cardElement, welcomeElement) {
    html.addEventListener('click', function (event) {
      if (event.target.classList.contains('remove_button')) {
        const cardId = parseInt(event.target.dataset.cardId); // Получаем ID из атрибута data кнопки
        if (cardId) {
          Database.removeObjectById(arr, cardId);
          cardList.renderCard(arr, cardElement);
          cardList.renderWelcome(welcomeElement);
          // cardList.renderDesc(Database.mainArray, DescHtml);
        }
      }
    });
  },
  descCard(arr, element) {
    html.addEventListener('click', function (event) {
      const cardId = parseInt(event.target.dataset.cardButtonId);
      if (cardId) {
        let found = Database.findObjectById(arr, cardId);
        cardList.renderDesc(found, element);

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
    getSuggestions(arr, query) {
      let results = [];
      if (query.length > 0) {
          results = results.concat(arr.filter(item =>
              item.name.toLowerCase().startsWith(query.toLowerCase()) ||
              item.secondName.toLowerCase().startsWith(query.toLowerCase()) ||
              item.emp.toLowerCase().startsWith(query.toLowerCase())
          ));
          results = results.concat(this.findObjectByName(arr, query));
          results = results.concat(this.findObjectBySecondName(arr, query));
          results = results.concat(this.findObjectByEmp(arr, query));
      }
      const uniqueSuggestions = [];
      const idsSeen = new Set();
      for (const item of results) {
          if (!idsSeen.has(item.id)) {
              idsSeen.add(item.id);
              uniqueSuggestions.push({
                  suggestionString: `${item.name} ${item.secondName} (${item.emp})`,
                  id: item.id
              });
          }
      }
      return uniqueSuggestions;
  },
    displaySuggestions(suggestions, resultsContainer) {
      resultsContainer.innerHTML = ''; // Очистка предыдущих результатов

      if (suggestions.length === 0) {
        resultsContainer.style.display = 'none';
        return;
      }

      suggestions.forEach((suggestion, index) => { // Добавляем index
        const div = document.createElement('div');
        div.classList.add("info-card"); // Используем тот же класс
        div.textContent = suggestion.suggestionString;
        div.dataset.id = suggestion.id;
        div.dataset.index = index; // <<< Добавляем data-index для навигации

        div.addEventListener('click', function () {
          searchInput.value = suggestion.suggestionString.split(" (")[0];
          resultsContainer.style.display = 'none';
          resultsContainer.innerHTML = ''; // Очистка после клика
          // Вместо searchInput.focus() лучше оставить фокус как есть или вернуть на input
          searchInput.focus(); // Можно убрать, если мешает
          // --- Возможно, здесь нужно вызвать поиск или отображение описания найденной карточки ---
          // Например:
          // const foundCard = Database.findObjectById(Database.mainArray, suggestion.id);
          // if (foundCard) cardList.renderDesc(foundCard, DescHtml);
          // searchCardDialog.close();
        });
        resultsContainer.appendChild(div);
      });

      resultsContainer.style.display = 'block';
    },

    searchMain(arr) {
      let selectedIndex = -1; // Индекс выбранной подсказки (-1 = ничего не выбрано)

      // Обработчик ввода текста
      searchInput.addEventListener('input', function () {
        const query = this.value;
        const suggestions = Cards.searchCard.getSuggestions(arr, query);
        Cards.searchCard.displaySuggestions(suggestions, resultsContainer);
        selectedIndex = -1; // Сброс индекса при новом вводе
      });

      // Обработчик нажатия клавиш в поле ввода
      searchInput.addEventListener('keydown', function (event) {
        // Получаем *актуальный* список элементов подсказок
        const suggestionElements = resultsContainer.querySelectorAll('.info-card');

        // Если подсказок нет, ничего не делаем для стрелок/Enter
        if (suggestionElements.length === 0 && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter')) {
            return;
        }

        let newIndex = selectedIndex;

        if (event.key === 'ArrowDown') {
          event.preventDefault(); // Предотвращаем стандартную прокрутку страницы
          if (selectedIndex === -1) {
              newIndex = 0; // Выбираем первый элемент
          } else {
              newIndex = (selectedIndex + 1) % suggestionElements.length; // Переход вниз с зацикливанием
          }
        } else if (event.key === 'ArrowUp') {
          event.preventDefault(); // Предотвращаем стандартную прокрутку страницы
          if (selectedIndex === -1) {
              newIndex = suggestionElements.length - 1; // Выбираем последний элемент
          } else {
              // Переход вверх с зацикливанием (правильная обработка отрицательного остатка)
              newIndex = (selectedIndex - 1 + suggestionElements.length) % suggestionElements.length;
          }
        } else if (event.key === 'Enter') {
          event.preventDefault(); // Предотвращаем отправку формы, если она есть
          if (selectedIndex !== -1) {
            // Имитируем клик по выбранному элементу
            const selectedSuggestionElement = suggestionElements[selectedIndex];
            if (selectedSuggestionElement) {
              selectedSuggestionElement.click(); // Вызываем обработчик клика, который уже есть
            }
            // Важно: обработчик клика уже скрывает resultsContainer и очищает его
          } else {
            // Опционально: если Enter нажат без выбора, можно выполнить поиск по текущему тексту в input
            console.log("Выполнить поиск по:", searchInput.value);
            // Здесь может быть логика поиска и отображения результатов
            resultsContainer.style.display = 'none';
            resultsContainer.innerHTML = '';
          }
          return; // Выход после Enter
        } else if (event.key === "Escape") {
          event.preventDefault();
          resultsContainer.style.display = 'none';
          resultsContainer.innerHTML = '';
          selectedIndex = -1; // Сбрасываем выбор при Escape
          return; // Выход после Escape
        } else {
          // Для других клавиш (буквы, цифры и т.д.) ничего не делаем здесь,
          // сработает обработчик 'input'
          return;
        }

        // Обновляем выбор и прокрутку, только если индекс изменился
        if (newIndex !== selectedIndex) {
          selectedIndex = newIndex;
          Cards.searchCard.updateSelection(suggestionElements, selectedIndex); // Обновляем классы

          const selectedCard = suggestionElements[selectedIndex];
          if (selectedCard) {
            // Прокручиваем выбранный элемент в видимую область контейнера
            selectedCard.scrollIntoView({
                behavior: 'auto', // или 'auto' для мгновенной прокрутки
                block: 'nearest'   // 'start', 'center', 'end', или 'nearest'
            });
          }
        }
      });
    },
    suggestorToClose() {
      document.addEventListener('click', function (event) {
          // Закрывать, только если клик НЕ внутри контейнера автозаполнения И НЕ по самому инпуту
          if (!event.target.closest('.autocomplete-container') && event.target !== searchInput) {
               resultsContainer.style.display = 'none';
          }
      });
  },
    updateSelection(suggestionsNodeList, index) {
        // Преобразуем NodeList в массив для удобства (хотя и NodeList подходит для forEach)
        const suggestions = Array.from(suggestionsNodeList);
        suggestions.forEach((suggestion, i) => {
            if (i === index) {
            suggestion.classList.add('autocomplete-selected');
            } else {
            suggestion.classList.remove('autocomplete-selected');
            }
        });
    }
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
          cardList.renderDesc(ArrayFind, DescHtml);
          // cardList.renderWelcome(DescHtml);

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
Cards.searchCard.suggestorToClose();
Cards.searchCard.searchMain(Database.mainArray);

Cards.changeDesc.changeToShow(Database.mainArray);
Cards.changeDesc.changeToClose();
Cards.changeDesc.changeToCloseByScreen();
Cards.changeDesc.changeMain(Database.mainArray);

Cards.removeButton(Database.mainArray, html, DescHtml);
Cards.descCard(Database.mainArray, DescHtml);
