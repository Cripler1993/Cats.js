const url = "https://cats.petiteweb.dev/api/single/cripler";
const headers = {
  accept: "application/json",
  "content-type": "application/json",
};

function getAllCats() {
  return fetch(`${url}/show`);
}
function addCat(obj) {
  return fetch(`${url}/add`, {
    method: "POST",
    headers,
    body: JSON.stringify(obj),
  });
}

function deleteCat(id) {
  return fetch(`${url}/delete/${id}`, {
    method: "DELETE",
  });
}
function getCatDescription(id) {
  return fetch(`${url}/show/${id}`);
}

function updateCat(obj) {
  return fetch(`${url}/update/${obj.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(obj),
  });
}
