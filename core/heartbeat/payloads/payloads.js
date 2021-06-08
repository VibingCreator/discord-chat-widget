const config = require("../../config.js");

module.exports = {
    "identify": {
        "op": 2,
        "d": {
            "token": config.token,
            "properties": {
                "$os": "linux",
                "$browser": "disco",
                "$device": "disco"
            }
        }
    },

    "hello": {
        "op": 1,
        "d": null
    },
}
