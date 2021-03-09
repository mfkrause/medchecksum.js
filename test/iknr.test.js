const expect = require('chai').expect;
const { verifyIKNR } = require('../src/medchecksum');

it('should check a given IKNR for validity', function(done) {
    const validIknrs = ['260326822', '107299005', '184940005'];
    const invalidIknrs = ['a260326822', '263819462', '1234567890'];

    validIknrs.forEach((iknr) => {
      expect(verifyIKNR(iknr)).to.be.true;
    });
    invalidIknrs.forEach((iknr) => {
      expect(verifyIKNR(iknr)).to.be.false;
    });
    done();
});