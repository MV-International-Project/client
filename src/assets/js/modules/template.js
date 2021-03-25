const userCard = (user) => `
    <article class="user active" id="${user.id}">
        <figure>
            <img src="${user.avatar_path}"
                alt="Picture">
            <figcaption>
                <h2>${username}</h2>
                <button>View more...</button>
            </figcaption>
        </figure>
    </article>
`;