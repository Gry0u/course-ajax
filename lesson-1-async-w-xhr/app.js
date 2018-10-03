(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText = 'hippos';
    const responseContainer = document.querySelector('#response-container');

    // form.addEventListener('submit', function (e) {
    //     e.preventDefault();
    //     responseContainer.innerHTML = '';
    //     searchedForText = searchField.value;
    // });

    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;
    //unsplash API requires a Authorization header
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID 50617b56eb5c0cf7cdf65ca6fb26067bfee0cfc1ac698055315626ca293c44dc');
    unsplashRequest.send();
    function addImage() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);
        const firstImage = data.results[0];
        htmlContent = `<figure>
        <img
        src="${firstImage.urls.regular}" alt="searchedForText">
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
    //NY Times API doesn't require a specific Header
    function addArticles() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);
        htmlContent = '<ul>' + data.response.docs.map(doc => `<li><a href="${doc.web_url}">${doc.headline.main}</a>
        <p>${doc.snippet}</p>
        </li>`).join(' ') + '</ul>';
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }
    //Define XHR object
    const articleRequest = new XMLHttpRequest();
    articleRequest.onload = addArticles;
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=c50315bc807741e89679459a3d5db013
`);
    articleRequest.send();


})();
