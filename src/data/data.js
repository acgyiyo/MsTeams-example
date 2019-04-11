var request = require("request");

var options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/configuration',
    qs: {
        api_key: '84ded254fa09932c02a7777a80a71ff3'
    },
    body: '{}'
};

request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log("pelis", body);
});

module.exports = {
    resCofig
};