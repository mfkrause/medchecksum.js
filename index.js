function isNumeric(str) {
  return /^\d+$/.test(str);
}

function reverse(s) {
  return s.split('').reverse().join('');
}

/**
 * Verifies a Pharmacy Central Number / Pharmazentralnummer (PZN) based on the length and the
 * checksum.
 * @param {string} pzn The Pharmacy Central Number to verify.
 * @returns {boolean} True if the given PZN is valid, false otherwise.
 */
exports.verifyPZN = (pzn) => {
  let weightAdd = 1;
  if (pzn.length < 7 || pzn.length > 8 || !isNumeric(pzn)) return false;
  if (pzn.length === 7) weightAdd = 2;
  const splitPzn = pzn.split('');
  let sum = 0;
  for (let i = 0; i < splitPzn.length - 1; i += 1) {
    sum += splitPzn[i] * (i + weightAdd);
  }
  if (sum % 11 === splitPzn[splitPzn.length - 1]) return true;
  return false;
};

/**
 * Verifies a Institution Identifier Number / Institutionskennzeichennummer (IKNR) based on the
 * length and the checksum.
 * @param {string} iknr The Institution Identifier Number to verify.
 * @returns {boolean} True if the given IKNR is valid, false otherwise.
 */
exports.verifyIKNR = (iknr) => {
  if (iknr.length !== 9 || !isNumeric(iknr)) return false;
  const checksum = iknr.substring(8, 1);
  const revIknr = reverse(iknr.substring(2, -1));
  let mult = 1;
  let solution = 0;
  revIknr.split('').forEach((char) => {
    const product = char * mult;
    let crosssum = 0;
    product.split('').forEach((num) => {
      crosssum += num;
    });
    solution += crosssum;
    mult = mult === 1 ? 2 : 1;
  });
  solution %= 10;

  if (solution === checksum) return true;
  return false;
};
