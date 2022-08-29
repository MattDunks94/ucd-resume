/** Function that displays user GitHub username, as a link to their page, 
 * displays users follower and following count and the users avatar, profile pic.
 * This function is called when the user is using the #gh-username input element. 
 * name, html_url, login and avatar_url are built in to the GitHub API.
*/
function userInformationHTML(user) {
    return `
    <h2>${user.name}
    <span class="small-name">@<a href="${user.html_url}" target="_blank">${user.login}</a>
    </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
            </a>
        </div>
        <p>Followers: ${user.followers} - Following: ${user.following} <br>
        Repos: ${user.public_repos}</p>
    </div>`;

};

// Fetches a list of repositories from the searched user.
function repoInformationHTML(repos) {
    // Checks whether the users repository list is empty. If so displays message.
    if(repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    } 
    // Fetches users repositories url in list form using map method, creates link to each repo individually.
    var listItemsHTML = repos.map(function(repo) {
        return `<li>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </li>`;
    });

    return`<div class="clearfix repo-list">
        <p>
            <strong>Repo List:</strong>
        </p>
        <ul>
            ${listItemsHTML.join("\n")}
        </ul>
    </div>`
}

// Fetching GitHub username information.
function fetchGitHubInformation(event) {
    // Clearing the user-data and repo-data divs html, so users repository list is cleared when username is cleared.
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");
    // Creating variable and assigning it the value of the #gh-username div from github.html.
    var username = $("#gh-username").val();
    // If no username is entered, html for #gh-user-data div displays message.
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    // Giving the #gh-user-data div an image, loader.
    $("#gh-user-data").html(
        `<div id=loader>
            <img src="assets/images/loader.gif" alt="loading..." />
        </div>`);

    $.when(
        // GitHub API links to username and users repositories.
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        },
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`
                );
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
                );
            }
        });
};
// This pre-loads the "octocat" profile, the value of the input in center-form div, in github.html. 
$(document).ready(fetchGitHubInformation);