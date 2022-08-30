baseUrl = "http://localhost:3000/";
addButton = document.getElementById("addbutton");
document.getElementById("UL").style.listStyle = "decimal inside";

const removeUl = () => {
  const removeChilds = document.getElementById("UL");
  removeChilds.innerHTML = "";
};

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

const doSomethingWithData = async function () {
  const tasks = await getListOfTasks();
  const UL = document.querySelector(".ULL");
  const taken = tasks.map((taak) => taak.description);
  taken.forEach(function (text, item) {
    const newli = document.createElement("li");
    newli.innerHTML = text;
    UL.newli = item.newli;
    document.body.appendChild(newli);
  });
};

const InputFunction = function () {
  document
    .getElementsByName("searchBar")[0]
    .addEventListener("change", doThing);
};

addButton.addEventListener("click", InputFunction());

/* function */
function doThing() {
  const data = { description: `${this.value}`, done: false };
  fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  removeUl();
  doSomethingWithData();
}
