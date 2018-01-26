var ctrl = {

    get: function (req, res) {
        // res.status(500);
        // res.send("Hello ExpressJS!!");

        res
            .status(500)
            .send("Hello ExpressJS");
    },

    health: function (req, res) {
        var response = { status: 'Up' };
        res.status(200);
        res.json(response);
    }
};

module.exports = ctrl;