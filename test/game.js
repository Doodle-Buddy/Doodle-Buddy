const expect = require('chai').expect;
const game = require('../game');

describe("Game", () => {
    it("is a Object", () => {
        expect(game).to.be.a("object");
    });
});

