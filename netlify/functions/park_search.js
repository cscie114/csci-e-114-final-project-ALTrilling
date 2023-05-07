// we make api calls to the meilisearch server here. we do NOT use the meilisearch npm package because i'm pretty sure it would exceed netlify's limits

const handler = async function (event, context) {
    const fetch = (await import("node-fetch")).default;
    const text = event.queryStringParameters.text;

    
    const limit = 600;

    console.log("text: ", text)
    console.log("process.env.MEILI_URL: ", process.env.MEILI_URL)
    console.log("process.env.MEILI_SEARCH_KEY: ", process.env.MEILI_SEARCH_KEY)

    // https://www.meilisearch.com/docs/reference/api/search
    const query = new URLSearchParams({
        q: text,
        limit: limit,
    });

    try {
        return fetch(`${process.env.MEILI_URL}/indexes/parks/search?${query}`, {
            // the reason why i used the search key in favor of the master key was that if i made some mistake here and somehow granted users access to this key, 
            // users would only gain further access to read permissions but not write permissions (as they would gain if the master key was exposed).
            headers: {
                'Authorization': `Bearer ${process.env.MEILI_SEARCH_KEY}`
            }
        })
        .then(response => response.json()
        .then(data => {
            console.log("data: ", data)
            return {
                statusCode: response.status,
                body: JSON.stringify({ data: data })
            }
        })
        )

                
            
        // console.log(response.json().then(data => console.log(data)));
        // return {
        //     statusCode: response.status,
        //     // body: response.body
        //     body: JSON.stringify({ data: response })
        // }
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ err_message: err.message })
        };
    }


    return {
        statusCode: 200,

    }
};

module.exports = { handler };