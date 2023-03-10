const getElement = (params) => document.querySelector(`${params}`);

const searchInput = getElement("#search-input");
const searchBtn = getElement("#search-btn");
const profileImg = getElement("#avatarImg");
const profileName = getElement("#name");
const publicRepos = getElement("#public-repos");
const userName = getElement("#username");
const followers = getElement("#followers");
const following = getElement("#following");
const bio = getElement("#bio");
const company = getElement("#company");
const notFound = getElement(".not-found");
const mainContainer = getElement(".main");
const userUrl = getElement("#visit-profile");
const email = getElement("#email");
const userLocation = getElement("#location");

mainContainer.style.display = "none";

async function fetchUser(username) {
    try{
        const res = await fetch(`https://api.github.com/users/${username}`);
            const data = await res.json();
            console.log(data);
            return data;
    }
    catch(e){
        throw new Error(e);
    }
}

function displayResult(data){
    if(data?.name){
        mainContainer.style.display = "flex";
        notFound.classList.remove("active");
    }
    else{
        mainContainer.style.display = "none";
        notFound.classList.add("active");
    }
}

function checkData(data,prop){
    if(data?.company === null){
        company.innerHTML = "Company: Not Available";
    }
    if(data?.email === null){
        email.innerHTML = "Email: Not Available";
    }
    if(data?.location === null){
        userLocation.innerHTML = "Location : Not Available";
    }
}

searchBtn.addEventListener("click", async () => {
    const username = searchInput.value;
    if(username === "") return;
    const data = await fetchUser(username);
    renderProfile(data);
    checkData(data);
    displayResult(data);
    searchInput.value = "";
})


function renderProfile(data) {
    profileImg.src = `${data?.avatar_url}`;
    profileName.innerHTML = `Name: ${data?.name}`;
    userName.innerHTML = `Username: ${data?.login}`;
    bio.innerHTML = `Bio: ${data?.bio}`;
    followers.innerHTML = `Followers: ${data?.followers}`;
    following.innerHTML = `Following: ${data?.following}`;
    publicRepos.innerHTML = `Public Repos: ${data?.public_repos}`;
    twitter.href = `https://twitter.com/${data?.twitter_username}`;
    twitter.innerHTML = `Twitter: @${data?.twitter_username}`;
    company.innerHTML = `Company: ${data?.company}`;
    userUrl.href = data?.html_url;
    email.innerHTML = `Email: ${data?.email}`;
    userLocation.innerHTML = `Company: ${data?.location}`;
}