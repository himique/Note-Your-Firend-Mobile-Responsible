let Database = {
  mainArray: [
    { name: "Artem", secondName: "Bondarenko", age: 22, emp: "Developer", id: 1, desc: "I do, what i wanna do" },
    { name: "Hans", secondName: "Mueller", age: 43, emp: "Waiter", id: 2, desc: "I love be a waiter" },

  ],

  removeObjectById(arr, IdFound) {
    const index = arr.findIndex(x => x.id === IdFound);
    if (index > -1) {
      arr.splice(index, 1);
    }
  },
  findObjectById(arr, idToFind) {
    const foundObject = arr.find(item => item.id === idToFind);
    if (foundObject === undefined) {
      console.log("Not found")
    }
    return foundObject;
  },

  update: {

    name(arr, productName, newCount) {
      const item = arr.find(item => item.id === productName);
      if (item) {
        item.name = newCount;
      }
    },

    secondName(arr, productName, newCount) {
      const item = arr.find(item => item.id === productName);
      if (item) {
        item.secondName = newCount;
      }
    },

    age(arr, productName, newCount) {
      const item = arr.find(item => item.id === productName);
      if (item) {
        item.age = newCount;
      }
    },

    desc(arr, productName, newCount) {
      const item = arr.find(item => item.id === productName);
      if (item) {
        item.desc = newCount;
      }
    },
  },

  iterate(arr) {
    const iterator = arr.keys();
    const a = [];
    for (const i of iterator) {
      a.push(i + 1);
    }
    return a
  },

  toEveryPart(arr) {
    const divorced = this.iterate(arr);
    divorced.forEach((element) => console.log(element));
  },

  setId(arr) {
    // let iterated = this.iterate(arr);
    // let finalId = (Math.max(...iterated)) + 1;
    if (arr.length > 0) {
      finalId = Math.max(...arr.map(item => item.id)) + 1;      //изучит подробную роботу
    }
    else if (arr.length === 0) {
      finalId = 1;
    }
    return finalId
  },



  prompt(name) {
    const entered = prompt(`Enter ${name}`);
    return entered
  },

  promptNumber(message) {
    let input = prompt(message);
    let number = Number(input);
    if (input <= 0) {
      alert("Invalid input. Please enter the number more than 0.");
      return this.promptNumber(message);
    }
    else if (isNaN(number)) {
      alert("Invalid input. Please enter a number.");
      return this.promptNumber(message);
    }
    return number;
  },

  add(name, secondName, age, emp, id, desc) {
    this.mainArray.push({ name: name, secondName: secondName, age: age, emp: emp, id: id, desc: desc });
  },

}


// Database.add("qwer", "qwe", 22, Database.setId(Database.mainArray), 2);
// Example of using prompts

// Database.findObjectById(Database.mainArray,2)
console.log(Database.mainArray)

