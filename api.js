const url = "https://cats.petiteweb.dev/api/single/cripler";

function getAllCats() {
  return fetch(`${url}/show`);
}
function addCat(obj) {
  return fetch(`${url}/add`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(obj),
  });
}
