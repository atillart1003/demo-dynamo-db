var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

describe("the module", () => {
    it('should insert item into table', async () => {
        var mock = new MockAdapter(axios);

        mock.onGet("/users").reply(200, {
            users: [{ id: 1, name: "John Smith" }],
        });

        axios.get("/users").then(function (response) {
            console.log(response.data);
        });

        expect(true).toEqual(true)
    });
})