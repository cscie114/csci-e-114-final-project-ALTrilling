const handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Functions are working. test" })
    };
};

module.exports = { handler };