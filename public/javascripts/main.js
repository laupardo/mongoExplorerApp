function collectionFunction() {
  const dbname = document.getElementById("dbs").value;
  fetch(`/getCollections/${dbname}`)
    .then(res => res.json())
    .then(displayColllections);
  document.getElementById("colTitle").removeAttribute("style");
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

function docsFunction() {
  const dbname = document.getElementById("dbs").value;
  console.log(dbname);
  const collName = document.getElementById("collectionSelect").value;
  console.log(collName);
  fetch(`/getDocs/${dbname}/${collName}`)
    .then(res => {
      return res.json();
    })
    .then(displayDocs);
  document.getElementById("docsBigDiv").removeAttribute("style");
}

const displayDocs = docs => {
  document.getElementById("docsSmallDiv").innerHTML = "";
  docs.forEach(pdoc => {
    const doc = document.createElement("p");
    const val = Object.values(pdoc);
    let i = 0;
    for (field in pdoc) {
      console.log(val[i]);
      doc.innerHTML += `${field} : ${val[i]}`;
      i++;
    }
    document.getElementById("docsSmallDiv").appendChild(doc);
  });
};
