const userCard = (user) => `
    <article class="user" id="user-${user.id}" data-info="${CryptoJS.AES.encrypt(JSON.stringify(user), "ip_project")}">
        <figure>
            <img src="${user.avatar_path}"
                alt="Picture">
            <figcaption class="show-more">
                <h2>${user.username}</h2>
                <button>View more...</button>
            </figcaption>
        </figure>
    </article>
`;

const matchCard = (user) => {
    let gamesStr = '';

    let i = 0
    user.games.forEach(game => {
        if (i > 3) return;
        gamesStr += `<li><img src="${game.image}" alt="${game.name}"></li>`;
        i++;
    });

    return `
    <article id="match-${user.id}" data-info="${CryptoJS.AES.encrypt(JSON.stringify(user), "ip_project")}">
        <header class="show-more">
            <img src="${user.avatar_path}"
                alt="Picture">
            <div>
                <h2>${user.username}</h2>
                <ul>
                    ${gamesStr}
                </ul>
            </div>
        </header>
        <a href="https://www.discord.com/users/${user.id}" target="_blank">
            <i class="fas fa-comment-alt"></i>
        </a>
    </article>
`
}

const profilePage = (user) => {
    let gamesStr = '';

    let i = 0
    user.games.forEach(game => {
        gamesStr += `<li><img src="${game.image}" alt="${game.name}"></li>`;
    });

    return `
    <header>
        <figure>
            <img src="${user.avatar_path}" alt="Profile picture">
            <figcaption>${user.username}</figcaption>
        </figure>
    </header>
    <p>
        ${user.description}
    </p>
    <ul class="game-box">
        ${gamesStr}
    </ul>
`;
    
}

export { userCard, matchCard, profilePage }