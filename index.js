
//Variables
const searchbar = document.querySelector(".searchbar-container")
const btnsubmit = document.querySelector("#submit")
const input = document.querySelector("#input")
const url = "https://api.github.com/users/";


btnsubmit.addEventListener("click", function(){
  if(input.value !== "") {
    getUserData(url + input.value)
  }
})



function getUserData(gitUrl){
  fetch(gitUrl)
    .then((response) => response.json())
    .then((data) =>{
      console.log(data)
      updateProfile(data)
    })

    .catch((error) =>{
      throw error;
    })
}



const noresults = document.querySelector("#no-results")

function updateProfile(data){
  if (data.message !== "Not Found") {
    noresults.style.display = "none";
    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }

    // setting info 
    const avatar = document.querySelector("#avatar")
    avatar.src = `${data.avatar_url}`;

    const userName = document.querySelector('#name')
    userName.innerText = data.name === null ? data.login : data.name;

    const user = document.querySelector("#user")
    user.innerText = `@${data.login}`;
    user.href = `${data.html_url}`;

    datesegments = data.created_at.split("T").shift().split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = document.querySelector("#date")
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] -1]} ${datesegments[0]}`

    const bio = document.querySelector("#bio")
    bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`

    const repos = document.querySelector("#repos")
    repos.innerText = `${data.public_repos}`;

    const followers = document.querySelector("#followers")
    followers.innerText = `${data.followers}`;

    const following = document.querySelector("#following")
    following.innerText = `${data.following}`

    const user_location = document.querySelector("#location")
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";

    const page = document.querySelector("#page")
    page.innerText = checkNull(data.blog, page) ? data.blog : "#"

    const twitter = document.querySelector("#twitter")
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available"
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";

    const company = document.querySelector("#company")
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available"

    searchbar.classList.toggle("active");

    const profilecontainer = document.querySelector("#profile-container")
    profilecontainer.classList.toggle("active");



  }

  else{
    noresults.style.display = "block";
  }
}

getUserData(url + "rohitrothore");

input.addEventListener("keydown", function(e){
  if(e.key == "Enter"){
    if(input.value !== "") {
      getUserData(url + input.value)
    }
  }
})

input.addEventListener("input", function(){
  noresults.style.display = "none"
})

const btnmode = document.querySelector("#btn-mode")
btnmode.addEventListener("click", function(){
  if(darkMode == false){
    darkModeProperties()
  }
  else{
    lightModeProperties()
  }
})

let darkMode = false;

const modetext = document.querySelector("#mode-text")
const modeicon = document.querySelector("#mode-icon")
const root = document.documentElement.style

function darkModeProperties(){
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");

  modetext.innerText = "LIGHT"
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");

  darkMode = true

  localStorage.setItem("dark-mode", true)

}

function lightModeProperties(){
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  localStorage.setItem("dark-mode", false);
}

if(localStorage.getItem("dark-mode")){
  darkMode = localStorage.getItem("dark-mode")
  darkModeProperties()
}

else {
  localStorage.setItem("dark-mode", prefersDarkMode);
  darkMode = prefersDarkMode;
  lightModeProperties();
}

const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
