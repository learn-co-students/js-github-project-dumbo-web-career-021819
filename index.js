document.addEventListener('DOMContentLoaded', () => {
    console.log('ready!');
    submitListener();
    dropListener()
})

function submitListener() {
    document.addEventListener('submit', e => {
    e.preventDefault();
    const inputtedUsername = e.target.querySelector('input').value;
    const t = fetch(`https://api.github.com/search/users?q=${inputtedUsername}`)
    .then(r => r.json())
    .then(returnObj => displayUsers(returnObj.items))
})}

function displayUsers(objArray) {
    document.getElementById('user-list').innerHTML = ''
    objArray.forEach(obj => {
        document.getElementById('user-list').innerHTML += `
        <div class='user-container'>
        <h3>${obj.login}</h3>
        <img src="${obj.avatar_url}">
        <div class='drop-down' style='display: none'></div>
        </div>
        <p><a href="${obj.html_url}">GitHub</a></p>
        `
    })
}

function dropListener() {
    document.getElementById("github-container").addEventListener('click', e => {
    username = e.target.parentElement.querySelector('H3').innerText;
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(r => r.json())
    .then(reposArray => displayRepos(reposArray))
    })
}

function displayRepos(reposArray) {
    document.getElementById('repos-list').innerHTML = ''
    reposArray.forEach (repo => {
        console.log(repo)
        document.getElementById('repos-list').innerHTML += `
            <li>
            <p><a href="${repo["archive_url"]}"><strong>${repo["full_name"]}</strong></a></p>
            <ul><li>${repo["description"]}</ul></li>
            </li>
        `
    })
}