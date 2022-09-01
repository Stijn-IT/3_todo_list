// Verwijzingen
baseUrl = "http://localhost:3000/";
addButton = document.getElementById("addbutton");
const removeChilds = document.getElementById("UL");
const zoekbalk = document.getElementById("searchBar");

// Leegmaken ul
const removeUl = () => {
  removeChilds.innerHTML = "";
};

// Opvragen taken in database
const getListOfTasks = async function () {
  try {
    const res = await fetch(baseUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const tasks = await res.json();
    console.log("List of tasks: ", tasks);
    return tasks;
  } catch (error) {
    console.log(error);
  }
};

// Creëert een takenlijst
const maakTakenLijst = async function () {
  const tasks = await getListOfTasks();
  console.log(tasks);
  tasks.forEach(function (text, item) {
    const newli = document.createElement("li");
    const taakspan = document.createElement("span");
    const i = document.createElement("i");
    i.setAttribute("id", text._id);
    i.className += "fa fa-trash";
    taakspan.innerHTML = text.description;
    removeChilds.newli = item.newli;
    removeChilds.appendChild(newli);
    newli.appendChild(taakspan);
    newli.appendChild(i);
  });
};
maakTakenLijst();

// Invoer van de zoekbalk
const InputFunction = function () {
  document
    .getElementsByName("searchBar")[0]
    .addEventListener("change", doThing);
};

// Maakt de zoekbalk weer schoon
const clearInputZoekbalk = function () {
  zoekbalk.value = "";
};

// Click button om inputfunctie in gang te zetten
addButton.addEventListener("click", InputFunction());

// Post de Data, leegt de zoekbalk, maak UL leeg en maak de Takenlijst
function doThing() {
  const data = { description: `${this.value}`, done: false };
  fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  clearInputZoekbalk();
  removeUl();
  maakTakenLijst();
}

// Click event prullenbakicoon van awesome font
removeChilds.addEventListener("click", async function (e) {
  await fetch(baseUrl + e.target.id, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  removeUl();
  maakTakenLijst();
});
