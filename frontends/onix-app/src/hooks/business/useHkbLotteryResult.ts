
export function useHkbLotteryMapping(){
 
    
    const gameNamesMap = new Map();
    gameNamesMap.set("Singapore", {
        countryCode :  "SG",
    });
    gameNamesMap.set("Sydney", {
        countryCode :  "AU",
    });

    gameNamesMap.set("Hongkong", {
        countryCode :  "SG",
    });
    gameNamesMap.set("Cambodia", {
        countryCode :  "SG",
    });
    gameNamesMap.set("China", {
        countryCode :  "CN",
    });
    gameNamesMap.set("Japan", {
        countryCode :  "JP",
    });
    gameNamesMap.set("Grabpools", {
        countryCode :  "SG",
    });
    gameNamesMap.set("Mongolia", {
        countryCode :  "MN",
    });
    gameNamesMap.set("Taiwan", {
        countryCode :  "TW",
    });
    gameNamesMap.set("Nusantara", {
        countryCode :  "ID",
    });
   
    return {gameNamesMap}
  }