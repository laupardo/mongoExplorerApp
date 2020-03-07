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
  const collName = document.getElementById("collectionSelect").value;
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
      doc.innerHTML += `${field} : ${val[i]} `;
      i++;
    }
    document.getElementById("docsSmallDiv").appendChild(doc);
  });
};

function newDoc() {
  const dbname = document.getElementById("dbs").value;
  const collName = document.getElementById("collectionSelect").value;
  fetch(`/getNewest/${dbname}/${collName}`)
    .then(res => {
      return res.json();
    })
    .then(fillForm);
  document.getElementById("newDoc").removeAttribute("style");
}

const fillForm = doc => {
  console.log("input", doc[0]);
  document.getElementById("docFormInner").innerHTML = "";
  for (field in doc[0]) {
    if (field != "_id") {
      const formGroup = document.createElement("div");
      formGroup.setAttribute("class", "form-group");
      const label = document.createElement("label");
      label.innerHTML = field;
      label.setAttribute("for", `input${field}`);
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("class", "form-control");
      input.setAttribute("id", `input${field}`);
      formGroup.appendChild(label);
      formGroup.appendChild(input);
      document.getElementById("docFormInner").appendChild(formGroup);
    }
  }
};

function insertNewDoc() {
  const inputs = document.getElementsByTagName("input");
  const doc = {};
  //let comma = ",";
  for (let i = 0; i < inputs.length; i++) {
    const att = inputs[0].getAttribute("id").replace("input", "");
    doc[`${att}`] = `${inputs[i].value}`;
  }
  console.log(doc);
  fetch("/newDoc", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    body: doc
  }).then(res => res.json());
}
