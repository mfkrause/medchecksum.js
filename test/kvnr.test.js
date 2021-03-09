const expect = require('chai').expect;
const { verifyKVNR } = require('../src/medchecksum');

it('should check a given KVNR for validity', function(done) {
    const validKvnrs = ['V546249584', 'Z629410041', 'C716829326'];
    const invalidKvnrs = ['a71a18374', '123456789', 'C16274182'];

    validKvnrs.forEach((kvnr) => {
      expect(verifyKVNR(kvnr)).to.be.true;
    });
    invalidKvnrs.forEach((kvnr) => {
      expect(verifyKVNR(kvnr)).to.be.false;
    });
    done();
});