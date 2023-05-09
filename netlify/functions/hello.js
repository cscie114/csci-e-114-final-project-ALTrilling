// this is just a test function to make sure that netlify functions are working

const handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Functions are working." })
    };
};

module.exports = { handler };