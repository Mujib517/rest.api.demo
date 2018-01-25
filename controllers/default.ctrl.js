var ctrl = {

    get: function (req, res) {
        res.send("Hello ExpressJS!!");
    },

    health: function (req, res) {
        var response = { status: 'Up' };
        res.json(response);
    }
};

module.exports = ctrl;