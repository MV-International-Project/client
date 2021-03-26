const userCard = (user) => `
    <article class="user" id="user-${user.id}">
        <figure>
            <img src="${user.avatar_path}"
                alt="Picture">
            <figcaption>
                <h2>${user.username}</h2>
                <button>View more...</button>
            </figcaption>
        </figure>
    </article>
`;

const matchCard = (user) => `
    <article id="match-${user.id}">
        <header>
            <img src="${user.avatar_path}"
                alt="Picture">
            <div>
                <h2>${user.username}</h2>
                <ul>
                    <li><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg"
                        alt="rainbow"></li>
                    <li><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg"
                        alt="csgo">
                    </li>
                </ul>
            </div>
        </header>
        <a href="https://www.discord.com/users/${user.id}" target="_blank">
            <i class="fas fa-comment-alt"></i>
        </a>
    </article>
`

export { userCard, matchCard }