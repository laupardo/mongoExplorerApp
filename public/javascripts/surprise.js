function dogFunction() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => {
      return res.json();
    })
    .then(displayDog);
}
const displayDog = dog => {
  const carDiv = document.getElementById("carDiv");
  carDiv.removeAttribute("style");
  const buttonDiv = document.getElementById("buttonDiv");
  const main = document.getElementById("main");
  buttonDiv.innerHTML = "";
  const h1 = document.createElement("h1");
  h1.innerHTML = "Your surprise is a";
  buttonDiv.appendChild(h1);
  const txt = dog.message;
  const breed = txt.replace("https://images.dog.ceo/breeds/", "").split("/")[0];
  console.log(breed);
  const img = document.createElement("img");
  img.setAttribute("src", txt);
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", breed);

  const imageDiv = document.getElementById("imageDiv");
  imageDiv.innerHTML = "";
  imageDiv.appendChild(img);

  const h2 = document.createElement("h2");
  h2.innerHTML = breed + "!";

  const classBod = document.getElementById("classBod");
  classBod.appendChild(h2);
};

function back() {
  window.location.href = "./";
}
