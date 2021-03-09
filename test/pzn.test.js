const expect = require('chai').expect;
const { verifyPZN } = require('../src/medchecksum');

it('should check a given PZN for validity', function(done) {
    const validPzns = ['04877800', '9230807', '00262467'];
    const invalidPzns = ['1234', '72731923', 'a00262467'];

    validPzns.forEach((pzn) => {
      expect(verifyPZN(pzn)).to.be.true;
    });
    invalidPzns.forEach((pzn) => {
      expect(verifyPZN(pzn)).to.be.false;
    });
    done();
});