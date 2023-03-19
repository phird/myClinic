export default function ThaiNationalID(id) {
    if (id == null || id.length !== 13 || !/^[0-9]\d+$/.test(id)) return false;
    let i, sum = 0;
    for ((i = 0), (sum = 0); i < 12; i++) {
      sum += parseInt(id.charAt(i)) * (13 - i);
    }
    let check = (11 - sum % 11) % 10;
    if (check === parseInt(id.charAt(12))) {
      return true;
    }
    return false;
  }  