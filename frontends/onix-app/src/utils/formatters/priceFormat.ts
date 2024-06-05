import { isString, normalizeOpts } from "~/utils/common";

const isNumber = /[0-9]/;

export type PriceFormatOpts = {
  prefix?: string;
  suffix?: string;
  centsSeparator?: string;
  thousandsSeparator?: string;
  limit?: number | false;
  centsLimit?: number;
  clearPrefix?: boolean;
  clearSuffix?: boolean;
  allowNegative?: boolean;
  insertPlusSign?: boolean;
  clearOnEmpty?: boolean;
  leadingZero?: boolean;
};

export const defaultOpts = {
  prefix: "", // "US$ "
  suffix: "",
  centsSeparator: ".",
  thousandsSeparator: ",",
  limit: false,
  centsLimit: 0, // 2
  clearPrefix: false,
  clearSuffix: false,
  allowNegative: true,
  insertPlusSign: false,
  clearOnEmpty: true,
  leadingZero: false,
};

export const normalizePriceFormatOpts = (
  defaultOpts: PriceFormatOpts,
  inputOpts: PriceFormatOpts
) => {
  const opts = normalizeOpts<PriceFormatOpts>(defaultOpts, inputOpts);
  // If insertPlusSign is on, it automatically turns on allowNegative, to work with Signs
  if (opts.insertPlusSign) opts.allowNegative = true;

  return opts;
};

export const priceFormat = (
  str: string | number,
  inputOpts: PriceFormatOpts,
  ignore = true, //set ignore = true if the "str" param is not from form input , and is just a static text
  isOptsNormalized = false, 
) => {
  let opts = inputOpts;
  if (!isOptsNormalized) {
    opts = normalizePriceFormatOpts(defaultOpts, inputOpts);
  }

  if (!str) {
    str = "0";
  }

  if (str && !isString(str)) {
    str = str.toString();
  }
 
  let hasCents = false;
  let centsLength = 0;
  const toNumbers = (str: string) => {
    let formatted = "";
    for (let i = 0; i < str.length; i++) {
      let char = str.charAt(i);
      if (formatted.length == 0 && char == 0) char = false;

      if (char && char.match(isNumber)) {
        if (opts.limit) {
          if (formatted.length < opts.limit) formatted = formatted + char;
        } else {
          formatted = formatted + char;
        }
      }
      else {
        if(char == opts.centsSeparator){
          hasCents = true;
          centsLength = str.length - (i + 1)  ;
        }
      } 
    }
    
    return formatted;
  };


  const fillWithZeroes = (str: string) => {
    if(!ignore){
      //if "str" is from form input, fill zeros froms the front
      while (str.length < opts.centsLimit + 1) {
        str = "0" + str;
      }
    }
    else {
       //if "str" is from static text, fill the centsLimit zeros from the back if the "str" does not have Cents value ald
      if(!hasCents){
        let cnt = 0; 
        while (cnt < opts.centsLimit  ) {
          str = str + "0";
          cnt++;
        }
      }
      else  {
        //has cents 

        //but centsLength is smaller than opts.centsLimit
        if(centsLength <  opts.centsLimit){

          const toAddLength = opts.centsLimit -centsLength; 
          let cnt = 0; 
          while (cnt < toAddLength  ) {
            str = str + "0";
            cnt++;
          }
        }
        else {
            //if centsLength is larger than opts.centsLimit
            //  remove from str.. 
            if(centsLength >  opts.centsLimit){

              let diff= centsLength -opts.centsLimit;
              while (diff  > 0  ) {
                //remove last char from str
                str = str.slice(0, -1);
                diff--;
              }
            }

        }

      }
    } 
   
    return str;
  };

  if (
    !ignore &&
    (str === "" || str == priceFormat("0", opts, true, true)) &&
    opts.clearOnEmpty
  ) {
    return "";
  }

  // formatting settings
  let formatted = fillWithZeroes(toNumbers(str));
  let thousandsFormatted = "";
  let thousandsCount = 0;
  let centsSeparator = opts.centsSeparator;
  //let centsVal = "";
  // Checking CentsLimit
  if (opts.centsLimit == 0) {
    centsSeparator = "";
    //centsVal = "";
  }

  // split integer from cents
  // const centsVal = formatted.substr(
  //   formatted.length - opts.centsLimit,
  //   opts.centsLimit
  // );
  const centsVal = formatted.substring(
    formatted.length - opts.centsLimit,
    formatted.length
  );

  // const integerVal = formatted.substr(0, formatted.length - opts.centsLimit);
  const integerVal = formatted.substring(0, formatted.length - opts.centsLimit);

  // apply cents pontuation
  // This stops from adding a leading Zero '0.00' -> '.00'
  if (opts.leadingZero) {
    formatted = integerVal + centsSeparator + centsVal;
  } else {
    if (integerVal !== "0") {
      formatted = integerVal + centsSeparator + centsVal;
    } else {
      formatted = centsSeparator + centsVal;
    }
  }

  // apply thousands pontuation
  if (opts.thousandsSeparator) {
    for (let j = integerVal.length; j > 0; j--) {
      // let char = integerVal.substr(j - 1, 1);
      let char = integerVal.substring(j - 1, j);
      thousandsCount++;
      if (thousandsCount % 3 == 0) char = opts.thousandsSeparator + char;
      thousandsFormatted = char + thousandsFormatted;
    }
    if (thousandsFormatted.substring(0, 1) == opts.thousandsSeparator)
      thousandsFormatted = thousandsFormatted.substring(
        1,
        thousandsFormatted.length
      );
    formatted =
      opts.centsLimit == 0
        ? thousandsFormatted
        : thousandsFormatted + centsSeparator + centsVal;
  }

  // if the string contains a dash, it is negative - add it to the begining (except for zero)
  if (opts.allowNegative && (integerVal != 0 || centsVal != 0)) {
    if (str.indexOf("-") != -1 && str.indexOf("+") < str.indexOf("-")) {
      formatted = "-" + formatted;
    } else {
      if (!opts.insertPlusSign) formatted = "" + formatted;
      else formatted = "+" + formatted;
    }
  }

  // apply the prefix
  if (opts.prefix) {
    formatted = opts.prefix + formatted;
  }

  // apply the suffix
  if (opts.suffix) formatted = formatted + opts.suffix;

  return formatted;
};
