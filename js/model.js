let Database = {
  mainArray: [
    { name: "Artem", secondName: "Bondarenko", age: 22, emp: "Developer", id: 1, desc: "I do, what i wanna do" },
    { name: "Hans", secondName: "Amamenko", age: 43, emp: "Waiter", id: 2, desc: "I love be a waiter" },
    { name: "Artem", secondName: "Smith", age: 30, emp: "Engineer", id: 3, desc: "Building the future" },
    { name: "Anna", secondName: "Bondarenko", age: 28, emp: "Designer", id: 4, desc: "Creating beautiful things" },
    { name: "John", secondName: "Doe", age: 35, emp: "Developer Web", id: 5, desc: "Coding all day" },

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
    emp(arr, productName, newCount) {
      const item = arr.find(item => item.id === productName);
      if (item) {
        item.emp = newCount;
      }
    },
    desc(arr, productName, newCount) {
      const item = arr.find(item => item.id === productName);
      if (item) {
        item.desc = newCount;
      }
    },
  },

  setId(arr) {
    if (arr.length > 0) {
      finalId = Math.max(...arr.map(item => item.id)) + 1;      
    }
    else if (arr.length === 0) {
      finalId = 1;
    }
    return finalId
  },

  add(name, secondName, age, emp, id, desc) {
    this.mainArray.push({ name: name, secondName: secondName, age: age, emp: emp, id: id, desc: desc });
  },
  deleteAllItems(arr){
    for(let i = -1; i < arr.length; i++){
      arr.pop();
    }  
  },
  

}
