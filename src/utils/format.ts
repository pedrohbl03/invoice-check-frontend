export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

/* "invoiceAmount": {
        "s": 1,
        "e": 2,
        "d": [
            154,
            600000
        ]
    },
*/

export const formatScientificToNumber = (sci: { s: number; e: number; d: number[] }) => {
  if (!sci || !sci.d || sci.d.length === 0) return null;
  const str = sci.d.join('');
  const exponent = sci.e;
  if (exponent === undefined || exponent === null) return null;
  if (exponent >= 0) {
    const intPart = str.slice(0, exponent + 1);
    const fracPart = str.slice(exponent + 1);
    return fracPart ? parseFloat(intPart + '.' + fracPart) : parseFloat(intPart);
  } else {
    const zeros = '0.'.padEnd(Math.abs(exponent) + 2, '0');
    return parseFloat(zeros + str);
  }
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};