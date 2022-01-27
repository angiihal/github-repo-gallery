// Div where profile information will appear
const overview = document.querySelector(".overview");
// Unordered List to display repos list
const reposList = document.querySelector(".repo-list");
const username = "angiihal";
const repoInformation = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
// Back to repo gallery button
const backToRepos = document.querySelector(".view-repos");
// Search for repos in the gallery
const filterInput = document.querySelector(".filter-repos");

const getProfileInfo = async function () {
    const users = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await users.json();
    userData(data);
};
getProfileInfo();

// Function to display fetched user information on the page
const userData = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> `
    overview.append(div);
    getRepos();
};

const getRepos = async function () {
    const repos = await fetch (
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    const res = await repos.json();
    console.log(res);
    repoInfo(res);
};

// Function to display info about repos
const repoInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (let repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`
        reposList.append(li);
    }
};

reposList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        specificRepoInfo(repoName);
    }
});

const specificRepoInfo = async function (repoName) {
    const specificRepo = await fetch (
        `https://api.github.com/repos/${username}/${repoName}`
    );
    const repoInfo = await specificRepo.json();
    //console.log(repoInfo);

    // Get languages
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    const languages = [];
    for (let key in languageData) {
        languages.push(key);
    };
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `
    repoData.append(div);
    repoData.classList.remove("hide")
    repoInformation.classList.add("hide");
    backToRepos.classList.remove("hide");
};

backToRepos.addEventListener("click", function () {
    repoInformation.classList.remove("hide");
    repoData.classList.add("hide");
    backToRepos.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const search = e.target.value;
    //console.log(value);
    const repos = document.querySelectorAll(".repo");
    const searchLowerCase = search.toLowerCase();

    for (let repo of repos) {
        const repoLowerCase = repo.innerText.toLowerCase();
        if (repoLowerCase.includes(searchLowerCase)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
