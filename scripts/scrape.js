// require axios
var axios = require("axios");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('bfc8e374d6df45af85688db28a5bf373');
var articles = [];function scrape(input) {    const scrapePromise = new Promise((resolve, reject) => {        newsapi.v2.everything({
            q: input,
            language: 'en',
        }).then(response => {
            // console.log("Article Array:", response);
            articles = response.articles.slice(0, 5);
            // console.log("Article Array:", articles);
            let promises = [];
            articles.forEach(article => {
                promises.push(axios({
                    "method": "GET",
                    "url": "https://twinword-sentiment-analysis.p.rapidapi.com/analyze/",
                    "headers": {
                        "content-type": "application/x-www-form-urlencoded",
                        "x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com",
                        "x-rapidapi-key": "bcbc7d6dd8msh5e1eb73a59e842fp1df3fcjsnd9394db0f416"
                    }, "params":
                    {
                        "text": article.content
                    }
                }))
            }
            )
            Promise.all(promises).then(responses => {
                articles.map((article, i) => {
                    let keys = Object.keys(responses[i].data)
                    keys.forEach(key => {
                        if (key !== "keywords") {
                            article[key] = responses[i].data[key]
                        }
                    })
                    return article
                })
                console.log(articles)
                resolve(articles)
            })
                .catch((error) => {
                    reject(error);
                });
        });
    });
    return scrapePromise
}module.exports = scrape;
