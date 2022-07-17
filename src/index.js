const MORSE_TABLE = {
  '.-': 'a',
  '-...': 'b',
  '-.-.': 'c',
  '-..': 'd',
  '.': 'e',
  '..-.': 'f',
  '--.': 'g',
  '....': 'h',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '--.-': 'q',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '...-': 'v',
  '.--': 'w',
  '-..-': 'x',
  '-.--': 'y',
  '--..': 'z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0',
};

const addLeadingZeroes = (str) => ('0000000000' + str).substring(str.length);

function encode(expr) {
  let morseArr = expr.split('').map(
    (value) => {
      if (value === ' ') return ' ';

      let foundItem = Object.entries(MORSE_TABLE).find((item) => item[1] === value);

      if (foundItem !== undefined) {
        return foundItem[0];
      } else {
        return '';
      }
    }
  );

  return morseArr.map(
    (item) => {
      item = item.split('').map(
              (value) => {
                switch (value) {
                  case '.':
                    return '10';

                  case '-':
                    return '11';

                  case ' ':
                    return '**********';

                  default:
                    return value;
                }
              }
            ).join('');

      return addLeadingZeroes(item);
    }
  ).join('');
}

const mapBinaryToMorse = (str) => {
  let array = [];

  // split by 2 symbols chunks and convert binary to morse
  for (let i = 0; i < str.length / 2; i++) {
    array.push((str.substring(i * 2, (i + 1) * 2) === '10') ? '.' : '-');
  }

  return array.join('');
}

function decode(expr) {
  let array = [];

  // split by 10 symbols chunks
  for (let i = 0; i < expr.length / 10; i++) {
    array.push(expr.substring(i * 10, (i + 1) * 10));
  }

  // remove leading zeroes and convert *********** to space
  array = array.map(
    (value) => {
      if (isNaN(value)) {
        return ' ';
      } else {
        return parseInt(value).toString();
      }
    }
  );

  return array.map(
    (value) => {
      if (value === ' ') return value;

      let foundItem = Object.entries(MORSE_TABLE).find((item) => item[0] === mapBinaryToMorse(value));

      if (foundItem !== undefined) {
        return foundItem[1];
      } else {
        return '';
      }
    }
  ).join('');
}

module.exports = {
  decode
}

// console.log(decode('00101010100000000010001011101000101110100000111111**********00001011110000111111000010111000101110100000111010'));
