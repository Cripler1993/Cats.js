const $addBtn = document.querySelector("[data-add_button]");
const $modalAdd = document.querySelector("[data-modal]");
const $modalClose = document.querySelectorAll("#close-modal");
const $loading = document.querySelector("[data-spinner]");
const $container = document.querySelector("[data-wrapper]");
const $addForm = document.querySelector("#cats__form");
const $modals = document.querySelectorAll(".modal-wrapper");

$addBtn.addEventListener("click", function () {
  $modalAdd.classList.remove("hidden");
});

$addForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(event);
  let id = $addForm.id.value;
  let name = $addForm.name.value;
  let description = $addForm.description.value;
  let image = $addForm.image.value;
  let age = $addForm.age.value;
  let rate = $addForm.rate.value;
  let favorite = $addForm.favorite.checked;
  let obj = { id, name, description, image, age, rate, favorite };
  console.log(obj);
  addCat(obj)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      alert(data.message);
      closeAllModals();
      renderAllCats();
    });
});

$modalClose.forEach(function (elem) {
  elem.addEventListener("click", function () {
    let modalWrapper = elem.closest(".modal-wrapper");
    modalWrapper.classList.add("hidden");
  });
});
$container.addEventListener("click", function (event) {
  let action = event.target.dataset.action;
  if (action == "show") {
  } else if (action == "delete") {
    console.log("123");
  } else if (action == "edit") {
  }
});
function renderAllCats() {
  $container.innerHTML = "";
  $loading.classList.remove("hidden");
  getAllCats()
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $loading.classList.add("hidden");
      data.forEach(function (elem) {
        $container.insertAdjacentHTML(
          `beforeend`,
          `<div data-card_id=${elem.id} class="card mx-2" style="width: 18rem;">
        <img src="${elem.image}" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${elem.name}</h5>
          <button data-action="show" class="btn btn-primary">Show</button>
          <button data-action="delete" class="btn btn-danger">Delete</button>
          <button data-action="edit" class="btn btn-success">Edit</button>
        </div>
        </div>`
        );
      });
    });
}
renderAllCats();

function closeAllModals() {
  $modals.forEach(function (elem) {
    elem.classList.add("hidden");
  });
}
