function collectionFunction() {
  const dbname = document.getElementById("dbs").value;
  fetch(`/getCollections/${dbname}`)
    .then(res => res.json())
    .then(displayColllections);
}

const displayColllections = col => {
  document.getElementById("collectionSelect").innerHTML = "";
  col.forEach(c => {
    const op = document.createElement("option");
    op.value = c.name;
    op.innerHTML = c.name;
    document.getElementById("collectionSelect").appendChild(op);
  });
};
