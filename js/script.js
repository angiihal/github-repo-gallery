// Div where profile information will appear
const overview = document.querySelector(".overview");
// Unordered List to display repos list
const reposList = document.querySelector(".repo-list");
const username = "angiihal";

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
    for (let repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`
        reposList.append(li);
    }
};

