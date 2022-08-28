/** Function that displays user GitHub username, as a link to their page, 
 * displays users follower and following count and the users avatar, profile pic.
 * This function is called when the user is using the #gh-username input element. 
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

}

// Fetching GitHub username information.
function fetchGitHubInformation(event) {
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
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function (response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData))
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
}