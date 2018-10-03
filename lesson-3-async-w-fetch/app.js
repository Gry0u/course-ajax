(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        //fetch image with unsplash API
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            {headers: {Authorization: 'Client-ID 50617b56eb5c0cf7cdf65ca6fb26067bfee0cfc1ac698055315626ca293c44dc'}})
            .then(response => response.json())
            .then(addImage)
            .catch(er => requestError(er, 'image'));

        //fetch articles with NYT API
        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=c50315bc807741e89679459a3d5db013`)
            .then(response => response.json())
            .then(addArticles)
            .catch(er => requestError(er, 'article'));

    });

    function addImage(images) {
        let htmlContent = '';
        const firstImage = images.results[0];
        htmlContent = `<figure>
        <img
        src="${firstImage.urls.small}" alt="searchedForText">
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    function addArticles(articles) {
        let htmlContent = '';
        if (articles.response
          && articles.response.docs
          && articles.response.docs.length > 1) {
            htmlContent = '<ul>' + articles.response.docs.map(doc => `<li><a href="${doc.web_url}">${doc.headline.main}</a>
            <p>${doc.snippet}</p>
            </li>`).join(' ') + '</ul>';
        } else {
            htmlContent = '<div>No article available</div>';
        }
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }

    function requestError(er, part) {
        console.log(er);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">There was an error making a request for the ${part}.</p>`);
    }
})();
