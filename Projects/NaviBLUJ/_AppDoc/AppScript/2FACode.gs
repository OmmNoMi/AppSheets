/**
 * @param {string} secret The Base32 secret key.
 * @return {string} The 6-digit TOTP code.
 */
function generateTOTP(secret) {
  if (!secret) return "No Secret";
  
  const key = _base32tohex(secret.toUpperCase().replace(/\s/g, ''));
  const epoch = Math.floor(new Date().getTime() / 1000.0);
  const time = _leftPad(_dec2hex(Math.floor(epoch / 30)), 16, '0');

  // Apps Script built-in HMAC-SHA1
  const signature = Utilities.computeHmacSignature(
    Utilities.MacAlgorithm.HMAC_SHA_1, 
    _hexToBytes(time), 
    _hexToBytes(key)
  );

  const offset = signature[signature.length - 1] & 0xf;
  const binary = ((signature[offset] & 0x7f) << 24) |
                 ((signature[offset + 1] & 0xff) << 16) |
                 ((signature[offset + 2] & 0xff) << 8) |
                 (signature[offset + 3] & 0xff);

  const response= (binary % 1000000).toString().padStart(6, '0');
  console.log(response);
  return response;
}

// Helpers for the math
function _hexToBytes(hex) {
  let bytes = [];
  for (let c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}
function _leftPad(str, len, pad) { return (pad.repeat(len) + str).slice(-len); }
function _dec2hex(s) { return (s < 15.5 ? '0' : '') + Math.round(s).toString(16); }
function _base32tohex(base32) {
  const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "", hex = "";
  for (let i = 0; i < base32.length; i++) {
    let val = base32chars.indexOf(base32.charAt(i));
    bits += _leftPad(val.toString(2), 5, '0');
  }
  for (let i = 0; i + 4 <= bits.length; i += 4) {
    hex += parseInt(bits.substr(i, 4), 2).toString(16);
  }
  return hex;
}
