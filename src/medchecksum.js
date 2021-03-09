const Helpers = require('./utils/helpers');

/**
 * Verifies a Pharmacy Central Number / Pharmazentralnummer (PZN) based on the length and the
 * checksum.
 * @param {string} pzn The Pharmacy Central Number to verify.
 * @returns {boolean} True if the given PZN is valid, false otherwise.
 */
exports.verifyPZN = (pzn) => {
  let weightAdd = 1;
  if (pzn.length < 7 || pzn.length > 8 || !Helpers.isNumeric(pzn)) return false;
  if (pzn.length === 7) weightAdd = 2;
  const splitPzn = pzn.split('');
  const checksum = parseInt(splitPzn[splitPzn.length - 1], 10);
  let sum = 0;
  for (let i = 0; i < splitPzn.length - 1; i += 1) {
    sum += splitPzn[i] * (i + weightAdd);
  }
  if (sum % 11 === checksum) return true;
  return false;
};

/**
 * Verifies a Institution Identifier Number / Institutionskennzeichennummer (IKNR) based on the
 * length and the checksum.
 * @param {string} iknr The Institution Identifier Number to verify.
 * @returns {boolean} True if the given IKNR is valid, false otherwise.
 */
exports.verifyIKNR = (iknr) => {
  if (iknr.length !== 9 || !Helpers.isNumeric(iknr)) return false;
  const checksum = parseInt(iknr.substr(8, 1), 10);
  const revIknr = Helpers.reverse(iknr.substr(2, 6));
  let mult = 1;
  let solution = 0;
  revIknr.split('').forEach((char) => {
    const product = char * mult;
    let crosssum = 0;
    product.toString().split('').forEach((num) => {
      crosssum += parseInt(num, 10);
    });
    solution += crosssum;
    mult = mult === 1 ? 2 : 1;
  });
  solution %= 10;

  if (solution === checksum) return true;
  return false;
};

/**
 * Verifies a Health Insurance Number / Krankenversichertennummer (KVNR) based on the
 * length and the checksum.
 * @param {string} kvnr The Health Insurance Number to verify.
 * @returns {boolean} True if the given KVNR is valid, false otherwise.
 */
exports.verifyKVNR = (kvnr) => {
  if (kvnr.length !== 10 || !Helpers.isNumeric(kvnr.substr(1, 9))) return false;
  let checkKvnr = kvnr.toLowerCase();
  checkKvnr = (checkKvnr.charCodeAt(0) - 96).toString().padStart(2, '0') + checkKvnr.substr(1, 9);
  const checksum = parseInt(checkKvnr.substr(10, 1), 10);
  checkKvnr = checkKvnr.substr(0, 10);
  const splitKvnr = checkKvnr.split('');
  let mult = 1;
  let solution = 0;
  splitKvnr.forEach((char) => {
    const product = char * mult;
    let crosssum = 0;
    product.toString().split('').forEach((num) => {
      crosssum += parseInt(num, 10);
    });
    solution += crosssum;
    mult = mult === 1 ? 2 : 1;
  });
  solution %= 10;

  if (solution === checksum) return true;
  return false;
};
