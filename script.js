//creating DOM

document.body.innerHTML = `
<div class="container-fluid">
<h2>Here You Can Know The Nationality Of The Name And Probabilities Related To Top Two Countries</h2><br><br><br><br><br>
<input type="text" id="searchtext" placeholder=" Enter the name" size="50"><br><br>
<input type="button" value="Search" id="btn" class="btn btn-primary">
<input type="button" value="Clear" id="resetbtn" class="btn btn-danger">
</div><br><br>
<div class=" container-fluid result">
<h4> Name Related Top Two Countries And Their Probabilities Are</h4><br>
<h3 id=result></h3><br><br>
</div>`

let searchtext = document.querySelector("#searchtext");
let resultdata = document.querySelector("#result");
let searchbtn = document.querySelector("#btn");
let resetbtn = document.querySelector("#resetbtn");

searchbtn.addEventListener("click", async function getdata() {
  let value = document.getElementById("searchtext").value;
  document.querySelector('.result').style.display = "block"

  try {
    let data = await fetch(`https://api.nationalize.io/?name=${value}`);
    let result = await data.json();
    console.log(result);
    resultdata.innerHTML = "";

    if (value.length === 0 || value.includes(" ")) {
      console.log("Please enter the valid name");
    }
    else {
      for (let i = 0; i < 2; i++) {
        resultdata.innerHTML +=
          `
  <div class="container">
    <div class="card">
      <div class="card-header">
       <div class="card-title">TOP-${i + 1}</div>
       
      </div>
      <div class="card-body">
      Country Id:${result.country[i].country_id}<br>
      Probability :${result.country[i].probability}<br><br>
      </div>
    </div>
  </div>
    `
      }
    }
  }
  catch {
    console.log(error);
  }

});

var container_data = document.querySelector('.card');
resetbtn.addEventListener("click", () => {
  document.querySelector('.result').style.display = "none";
  searchtext.value = "";
  resultdata.innerHTML = " ";

});
