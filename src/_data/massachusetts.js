require("dotenv").config();
// https://www.11ty.dev/docs/plugins/fetch/

const EleventyFetch = require("@11ty/eleventy-fetch");
const api_url = "https://developer.nps.gov/api/v1/parks";

const query = new URLSearchParams({
    api_key: process.env.NPS_API_KEY,
    stateCode: "MA",
    // this only actually goes up to 18
    limit: 10
});

console.log(api_url + "?" + query);

// use eleventy-fetch to fetch data from the API
// make sure to return the data as JSON
module.exports = async function() {
    let response = await EleventyFetch(api_url + "?" + query, {
        fetchOptions: {
            headers: {
                // found this by googling "what is my user agent" and copying the result
                "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
            }
        },
        type: "json",
        cacheDuration: "1d"
    });

    // return fetch(api_url + "?" + query, {
    //     headers: new Headers({
    //         // found this by googling "what is my user agent" and copying the result
    //         "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome"
    //     })
    // }).then(res => res.json());

    // let json = await JSON.parse(response.toString());
    // console.log(response);
    // return json;
    return response;
};