const $addBtn = document.querySelector("[data-add_button]");
const $modalAdd = document.querySelector("[data-modal]");
const $modalClose = document.querySelectorAll("#close-modal");
const $loading = document.querySelector("[data-spinner]");
const $container = document.querySelector("[data-wrapper]");
const $addForm = document.querySelector("#cats__form");
const $modals = document.querySelectorAll(".modal-wrapper");
const $modalInfo = document.querySelector("[data-modal-info]");
const $modalEdit = document.querySelector("[data-modal-edit]");

const $catImg = document.querySelector("#image");
const $catName = document.querySelector(".cat__name");
const $catAge = document.querySelector("#age");
const $catDesc = document.querySelector(".cat__disc");
const $catRate = document.querySelector("#rate");
const $catLike = document.querySelector(".like");

const $editForm = document.querySelector(".edit__form");

$addBtn.addEventListener("click", function () {
  $modalAdd.classList.remove("hidden");
});
function handleSubmit(form, func) {
  let id = form.id.value;
  let name = form.name.value;
  let description = form.description.value;
  let image = form.image.value;
  let age = form.age.value;
  let rate = form.rate.value;
  let favorite = form.favorite.checked;
  let obj = { id, name, description, image, age, rate, favorite };
  func(obj)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      alert(data.message);
      closeAllModals();
      renderAllCats();
    });
}
$addForm.addEventListener("submit", function (event) {
  event.preventDefault();
  handleSubmit($addForm, addCat);
});

$editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  handleSubmit($editForm, updateCat);
});

$modalClose.forEach(function (elem) {
  elem.addEventListener("click", function () {
    let modalWrapper = elem.closest(".modal-wrapper");
    modalWrapper.classList.add("hidden");
  });
});
$container.addEventListener("click", function (event) {
  let action = event.target.dataset.action;
  let currentCard = event.target.closest("[data-card_id]");
  let id = currentCard.dataset.card_id;
  if (action == "show") {
    getCatDescription(id)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        $modalInfo.classList.remove("hidden");
        $catImg.src = data.image;
        $catName.innerHTML = data.name;
        $catAge.innerHTML = data.age;
        $catDesc.innerHTML = data.description;
        $catRate.innerHTML = data.rate;
        if (data.favorite) {
          $catLike.classList.remove("hidden");
        } else {
          $catLike.classList.add("hidden");
        }
      });
  } else if (action == "delete") {
    deleteCat(id)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        renderAllCats();
      });
  } else if (action == "edit") {
    getCatDescription(id)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        $modalEdit.classList.remove("hidden");
        $editForm.id.value = data.id;
        $editForm.name.value = data.name;
        $editForm.description.value = data.description;
        $editForm.image.value = data.image;
        $editForm.age.value = data.age;
        $editForm.rate.value = data.rate;
        $editForm.favorite.checked = data.favorite;
      });
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
