let searchContent = ""; //setting initial search content null for initial call
let finalData; // finalData will holdthe json filtered as per search content
let currentId = 0; // this is to keep a track of array position of the current displaying profile

// function to clear session when log out button is pressed
function LogOut() {
  sessionStorage.setItem("login Status", false);
  window.location.href = "../loginPage.html";
}

// this is redirect if session in false
if (sessionStorage.getItem("login Status") == "false") {
  window.location.href = "../loginPage.html";
}

//to prevent back
function preventBack() {
  window.history.forward();
}

setTimeout("preventBack()", 0);

//
document.querySelector("#searchContent").addEventListener("keypress", function (event) {
    if (event.key === "Enter" || event.keyCode == 13) {
      searchContent = this.value;
      finalData = searchData(searchContent);
      currentId = 0; // on every search event
      extractData(finalData);
    }
  });
//calling JSON data from Data.json
async function searchData(searchContent) {
  return await fetch("./Data.json")
    .then((response) => response.json())
    .then((value) => {
      let data;
      if (searchContent !== undefined) {
        data = value.resume.filter((element) =>
          element.basics.AppliedFor.toLowerCase().includes(
            searchContent.toLowerCase()
          )
        );
      } else {
        data = value.resume;
      }

      return data;
    })
    .catch((error) => new Error(error));
}

finalData = searchData(searchContent);

extractData(finalData);

function extractData(finalData) {
  finalData
    .then((value) => {
      // document.querySelector("#mainOutline").innerHTML="";
      updateData(value, currentId);
    })
    .catch((error) => {
      document.getElementById("mainOutline").style.visibility = "hidden";
      document.querySelector(".errorMessage").style.visibility = "visible";
    });
}
//updating html page with respective information
function updateData(value, currentId) {
  document.getElementById("mainOutline").style.visibility = "visible";
  document.querySelector(".errorMessage").style.visibility = "hidden";

  if (value[currentId - 1] == undefined) {
    document.getElementById("previousButton").style.visibility = "hidden";
  } else {
    document.getElementById("previousButton").style.visibility = "visible";
  }
  if (value[currentId + 1] == undefined) {
    document.getElementById("nextButton").style.visibility = "hidden";
  } else {
    document.getElementById("nextButton").style.visibility = "visible";
  }

  document.querySelector("#name").innerHTML = value[currentId].basics.name;
  document.querySelector(
    "#appliedFor"
  ).innerHTML = `Applied for: ${value[currentId].basics.AppliedFor}`;
  document.querySelector(
    "#personalInformation"
  ).innerHTML = `${value[currentId].basics.phone} 
                                                                <br><br> ${value[currentId].basics.email} 
                                                                <br><br> <a href="${value[currentId].basics.profiles.url}">${value[currentId].basics.profiles.network}</a>`;
  let skillNode = document.querySelector("#technicalSkills");
  skillNode.innerHTML = "";
  value[currentId].skills.keywords.forEach((element) => {
    let pnode = document.createElement("p");
    (pnode.innerHTML = `${element}`), skillNode.appendChild(pnode);
  });
  let hobbyNode = document.querySelector("#hobbies");
  hobbyNode.innerHTML = "";
  value[currentId].interests.hobbies.forEach((element) => {
    let hnode = document.createElement("p");
    (hnode.innerHTML = `${element}`), hobbyNode.appendChild(hnode);
  });
  let companyName = "Company Name";
  document.querySelector(
    "#companyName"
  ).innerHTML = `<b>Company Name:</b> ${value[currentId].work[companyName]}`;

  document.querySelector(
    "#position"
  ).innerHTML = `<b>Position:</b> ${value[currentId].work.Position}`;

  let startDate = "Start Date";
  document.querySelector(
    "#startDate"
  ).innerHTML = `<b>Start date:</b> ${value[currentId].work[startDate]}`;

  let endDate = "End Date";
  document.querySelector(
    "#endDate"
  ).innerHTML = `<b>End date:</b> ${value[currentId].work[endDate]}`;

  document.querySelector(
    "#summary"
  ).innerHTML = `<b>Summary:</b> ${value[currentId].work.Summary}`;

  document.querySelector(
    "#projects"
  ).innerHTML = `<b>${value[currentId].projects.name}:</b> ${value[currentId].projects.description}`;

  let educationNode = document.querySelector("#education");
  educationNode.innerHTML = "";
  let eduValues = Object.values(value[currentId].education);
  let eduKeys = Object.keys(value[currentId].education);
  for (let i = 0; i < eduKeys.length; i++) {
    let indivalues = Object.values(eduValues[i]);
    let str = "";
    indivalues.forEach((e) => {
      str = str.concat(e + ",");
    });
    let eduNode = document.createElement("li");
    eduNode.innerHTML = `<b>${eduKeys[i]}:</b>${str}`;
    educationNode.appendChild(eduNode);
  }

  let internshipNode = document.querySelector("#internship");
  internshipNode.innerHTML = "";
  for (let i = 0; i < Object.keys(value[currentId].Internship).length; i++) {
    let inode = document.createElement("li");
    (inode.innerHTML = `<b>${
      Object.keys(value[currentId].Internship)[i]
    }:</b> ${Object.values(value[currentId].Internship)[i]}`),
      internshipNode.appendChild(inode);
  }

  let achievementsNode = document.querySelector("#achievements");
  achievementsNode.innerHTML = "";
  for (let i = 0; i < value[currentId].achievements.Summary.length; i++) {
    let anode = document.createElement("li");
    (anode.innerHTML = `${value[currentId].achievements.Summary[i]}`),
      achievementsNode.appendChild(anode);
  }

  let tableHt = Number(
    String(document.getElementById("mainOutline").offsetHeight)
  );
  let divHt = tableHt + 100;
  document.getElementById("mainDiv").style.height = `${divHt}px`;
}

function PreviousData() {
  currentId = currentId - 1;
  finalData.then((value) => {
    updateData(value, currentId);
  });
}

function NextData() {
  currentId = currentId + 1;
  finalData.then((value) => {
    updateData(value, currentId);
  });
}
