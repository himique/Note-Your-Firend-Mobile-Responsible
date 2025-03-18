const cardList = {
  renderCard(arr, element) {
    element.innerHTML = '';
    arr.forEach(contact => {
      let div = document.createElement("div");
      let div2 = document.createElement("div");
      let div3 = document.createElement("div");
      let button = document.createElement("button");
      let divRemove = document.createElement("div");
      let cardContainer = document.createElement("div");
      let removeButton = document.createElement("div");
      let textCard1 = document.createElement("h2");
      let textCard2 = document.createElement("h3");
      let textCard3 = document.createElement("h4");

      textCard1.dataset.cardButtonId = contact.id;
      textCard2.dataset.cardButtonId = contact.id;
      textCard3.dataset.cardButtonId = contact.id;
      textCard1.classList.add("card_name");
      textCard2.classList.add("card_info");
      textCard3.classList.add("card_id");
      removeButton.classList.add("remove_button");
      removeButton.dataset.cardId = contact.id;
      button.classList.add("card_list");
      button.dataset.cardButtonId = contact.id;
      div.classList.add("card_text_wrapper");
      div.dataset.cardButtonId = contact.id;
      div2.classList.add("card_text_wrapper2");
      div2.dataset.cardButtonId = contact.id;
      div3.classList.add("card_text_wrapper3");
      div3.dataset.cardButtonId = contact.id;
      divRemove.classList.add("remove_menu");
      cardContainer.classList.add("card_container");




      removeButton.insertAdjacentHTML("beforeend", `-`);

      textCard1.insertAdjacentHTML("beforeend", `${contact.name} ${contact.secondName}`);

      textCard2.insertAdjacentHTML("beforeend", `${contact.emp}`);

      textCard3.insertAdjacentHTML("beforeend", `ID: ${contact.id}`);


      cardContainer.appendChild(divRemove);
      cardContainer.appendChild(button);
      divRemove.appendChild(removeButton);
      button.appendChild(div);
      div.appendChild(textCard1);
      button.appendChild(div2);
      div2.appendChild(textCard2);
      button.appendChild(div3);
      div3.appendChild(textCard3);



      element.appendChild(cardContainer);


    });
  },
  renderDesc(arr, element) {
    element.innerHTML = '';
    let description = document.createElement("div");
    let descriptionName = document.createElement("div");
    let descriptionBirthday = document.createElement("div");
    let descriptionEmployment = document.createElement("div");
    let descriptionLastAction = document.createElement("div");
    let textDesc1 = document.createElement("h2");
    let textDesc2 = document.createElement("h3");
    let textDesc3 = document.createElement("h3");
    let textDesc4 = document.createElement("p");
    let changeMenu = document.createElement("div");
    let changeButton = document.createElement("div");
    let formButtonUpdate = document.createElement("button");


    formButtonUpdate.classList.add("form_button_change_update");
    formButtonUpdate.dataset.changeUpdate = arr.id;
    changeMenu.classList.add("change_menu");
    changeButton.classList.add("change_button");
    changeButton.dataset.changeId = arr.id;

    textDesc1.classList.add("desc_name");
    textDesc2.classList.add("desc_age");
    textDesc3.classList.add("desc_enp");
    textDesc4.classList.add("desc_action");

    description.classList.add("description");

    descriptionName.classList.add("description_name");
    descriptionBirthday.classList.add("description_birthday");
    descriptionEmployment.classList.add("description_employment");
    descriptionLastAction.classList.add("description_last_action");

    changeButton.insertAdjacentHTML("beforeend", `<img src="./images/ppeenn.svg" alt="change">`);
    textDesc1.insertAdjacentHTML("beforeend", `${arr.name} ${arr.secondName}`);
    textDesc2.insertAdjacentHTML("beforeend", `Age: ${arr.age}`);
    textDesc3.insertAdjacentHTML("beforeend", `${arr.emp}`);
    textDesc4.insertAdjacentHTML("beforeend", `<span class="description_span">Description:</span> ${arr.desc}`);

    descriptionName.appendChild(textDesc1);
    descriptionBirthday.appendChild(textDesc2);
    descriptionEmployment.appendChild(textDesc3);
    descriptionLastAction.appendChild(textDesc4);

    changeMenu.appendChild(changeButton);
    description.appendChild(changeMenu);
    description.appendChild(descriptionName);
    description.appendChild(descriptionBirthday);
    description.appendChild(descriptionEmployment);
    description.appendChild(descriptionLastAction);

    element.appendChild(description);
  },
  renderWelcome(element) {
    element.innerHTML = '';
    let description = document.createElement("div");
    let textDesc1 = document.createElement("h2");
    let textDesc2 = document.createElement("p");

    textDesc1.classList.add("welcome_h2");
    textDesc2.classList.add("welcome_p");
    description.classList.add("description");

    textDesc1.insertAdjacentHTML("beforeend", `Note Your Friends`);
    textDesc2.insertAdjacentHTML("beforeend", `Select the card to see more information`);

    description.appendChild(textDesc1);
    description.appendChild(textDesc2);
    element.appendChild(description);
  },
};