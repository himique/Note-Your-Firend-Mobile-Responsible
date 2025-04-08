

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

let idToScroll = '';

let searchInput = document.querySelector(".input_search");
const resultsContainer = document.querySelector('.autocomplete-results');
const infoCard = document.querySelector(".info-card")
const highlight = document.querySelector(".highlight");

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
          searchInput.value = '';
        }
      })
    },
    searchToClose() {
      searchButtons.addEventListener('click', function (event) {
        if (event.target.classList.contains('form_button_search_close')) {
          searchCardDialog.close();
          searchInput.value = '';
        }
      })
    },
    searchToCloseByScreen() {
      searchCardDialog.addEventListener('click', function (event) {
        if (!formSearch.contains(event.target)) {
          searchCardDialog.close();
          searchInput.value = '';
        }
      });
    },


    displaySuggestions(suggestions, resultsContainer) {
      let currentlyHighlightedElement = '';
      resultsContainer.innerHTML = ''; // Очистка предыдущих результатов

      if (suggestions.length === 0) {
        resultsContainer.style.display = 'none';
        return;
      }


      suggestions.forEach((suggestion, index) => { // Добавляем index
        const div = document.createElement('div');
        div.classList.add("info-card"); // Используем тот же класс
        div.textContent = `${suggestion.name} ${suggestion.secondName} (${suggestion.emp})`;
        div.dataset.id = suggestion.id;
        div.dataset.index = index;
        idToScroll = div.dataset.id;// <<< Добавляем data-index для навигации

        div.addEventListener('click', function (event) {
          DescHtml.innerHTML = '';
          resultsContainer.style.display = 'none';
          resultsContainer.innerHTML = ''; // Очистка после клика
          if (event.target.classList.contains('info-card')) {
            let actualId = parseInt(event.target.dataset.id);

            const selector = `[data-card-button-id="${actualId}"]`;
            const elementToScroll = document.querySelector(selector);
            currentlyHighlightedElement = elementToScroll;
            if (elementToScroll) {
              // 4. УПРАВЛЕНИЕ ПОДСВЕТКОЙ:
              //    а) Снимаем подсветку с ПРЕДЫДУЩЕГО элемента (если он был и он другой)
              if (currentlyHighlightedElement && currentlyHighlightedElement !== elementToScroll) {
                currentlyHighlightedElement.classList.remove('highlight');
                currentlyHighlightedElement = null;
              }

              //    б) Добавляем подсветку НОВОМУ элементу
              elementToScroll.classList.add('highlight');
              elementToScroll.scrollIntoView({
                behavior: 'smooth', // Плавная прокрутка ('auto' - мгновенная)
                block: 'start',   // Вертикальное выравнивание ('start', 'center', 'end', 'nearest')
                // inline: 'nearest' // Горизонтальное выравнивание (если есть гориз. скролл)

              });
            }
            let currentItem = Database.findObjectById(Database.mainArray, actualId);
            cardList.renderDesc(currentItem, DescHtml);


          }
          let documentClickListenerAdded = false;
          if (!documentClickListenerAdded) {
            document.addEventListener("click", function (docEvent) {
              // Проверяем:
              // 1. Есть ли сейчас подсвеченный элемент? (currentlyHighlightedElement не null)
              // 2. Произошел ли клик (`docEvent.target`) НЕ ВНУТРИ подсвеченного элемента?
              // 3. Произошел ли клик НЕ ВНУТРИ контейнера предложений? (чтобы не снимать подсветку при клике на сам список)
              if (currentlyHighlightedElement &&
                !currentlyHighlightedElement.contains(docEvent.target) &&
                !resultsContainer.contains(docEvent.target) &&
                !docEvent.target.classList.contains('info-card') &&
                !DescHtml.contains(docEvent.target)
              ) {

                currentlyHighlightedElement.classList.remove('highlight');
                currentlyHighlightedElement = null; // <-- ОБЯЗАТЕЛЬНО сбрасываем состояние
              }
              documentClickListenerAdded = true;

            });
            // Вместо searchInput.focus() лучше оставить фокус как есть или вернуть на input
            searchInput.focus();


          }
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
        const suggestions = Database.searchAdvisor(arr, query);
        // const suggestions = Cards.searchCard.getSuggestions(arr, query);
        console.log(suggestions);
        console.log(Database.searchAdvisor(arr, query));
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
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault(); // Предотвращаем стандартную прокрутку страницы
            if (selectedIndex === -1) {
              newIndex = 0; // Выбираем первый элемент
            } else {
              newIndex = (selectedIndex + 1) % suggestionElements.length; // Переход вниз с зацикливанием
            }
            break
          case 'ArrowUp':
            event.preventDefault(); // Предотвращаем стандартную прокрутку страницы
            if (selectedIndex === -1) {
              newIndex = suggestionElements.length - 1; // Выбираем последний элемент
            } else {
              // Переход вверх с зацикливанием (правильная обработка отрицательного остатка)
              newIndex = (selectedIndex - 1 + suggestionElements.length) % suggestionElements.length;
            }
            break
          case 'Enter':
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
              // Здесь может быть логика поиска и отображения результатов
              event.preventDefault();
              resultsContainer.style.display = 'none';
              resultsContainer.innerHTML = '';
            }
            break
          case 'Escape':
            event.preventDefault();
            resultsContainer.style.display = 'none';
            resultsContainer.innerHTML = '';
            selectedIndex = -1; // Сбрасываем выбор при Escape
            break // Выход после Escape
          default:
            break
        }
        // Обновляем выбор и прокрутку, только если индекс изменился
        if (newIndex !== selectedIndex) {
          selectedIndex = newIndex;
          Database.updateSelection(suggestionElements, selectedIndex); // Обновляем классы
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
