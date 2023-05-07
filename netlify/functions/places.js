const api_url = "https://developer.nps.gov/api/v1/places";


const handler = async function (event, context) {
    const fetch = (await import("node-fetch")).default;
    const park_code = event.queryStringParameters.park_code;
    // http://url/.netlify/functions/hello?park_code=[park_code]

    const params = new URLSearchParams({
        limit: 10,
        api_key: process.env.NPS_API_KEY,
        parkCode: park_code
    });
    try {
        const response = await fetch(`${api_url}?${params}`, {
            headers: {
                Accept: "application/json",
                "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
            },
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: response.statusText
            };
        }

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ data })
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ err_message: err.message })
        };
    }
};

module.exports = { handler };