/**
 * Checks if a given string consists of only digits.
 * @param {string} str The string to check.
 * @returns {boolean} True if the string consists of only digits, false otherwise.
 */
exports.isNumeric = (str) => /^\d+$/.test(str);

/**
 * Reverses the given string.
 * @param {string} str The string to reverse.
 * @returns {string} The reversed string.
 */
exports.reverse = (str) => str.split('').reverse().join('');
