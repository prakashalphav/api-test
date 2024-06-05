export const priceToFloat = (str: string|undefined) :  number=> {
  // if str 
  if(!str){
    return 0;
  }
  const _str = str.replace(/[^0-9\-\.]/g, "");
  if(!_str){
    return NaN;//if str is only Text then will return NaN
  }
    return parseFloat(_str);
  };
  