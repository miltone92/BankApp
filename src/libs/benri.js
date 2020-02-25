/**
 * Description: Capitalizes the first letter of a string.
 *
 * Example: moon --> Moon
 * @param {value}   String    sting value.
 * @return {String} capitalized string.
 */
export function capitalizeFirstLetter(value) { 
  return  value[0].toUpperCase() + value.slice(1); 
} 

/**
 * Description: Gets indicated last amount characters from provided string
 *
 * @param {query}   var    original string from which to get characters.
 * @param {characterAmount}   number    The amount of characters to extract.
 * @return {String} Last indicated characters from string.
 */
let getLastCharactersFromString = (query, characterAmount) => {
  var result = query.substr(query.length - characterAmount);
  return result;
};


/**
 * Description: Generate random number from length.
 *
 * @param {number}   var    Number length.
 * @return {number} Generated random number.
 */
let getRandomNumberFromLength = length => {
  let number = 1;
  for (let i = 0; i < length; i++) {
    number += "0";
  }
  let random = Math.floor(Math.random() * number);
  return random;
};

/**
 * Description: Generates random number from specified limit.
 *
 * Example: If limit == 10: Retun will be a number between 0 - 9
 * @param {number}   var    Number limit.
 * @return {number} Generated random number.
 */
let getRandomNumberFromLimit = limit => {
  let random = Math.floor(Math.random() * limit);
  return random;
};


/**
 * Description: Returns a date time variable provided a String in LocaleString fromat.
 * Requiered format: locale('en-GB', { timeZone: 'UTC' })
 * Example: "17/07/2020, 8:55:19 PM" => such date object instance
 * Expamle: "day/month/year"
 * @param {localeString}   String    LocaleString.
 * @return {date} date object.
 */
export let getDateFromLocaleString = localeString => {

  localeString = localeString.replace("AM","");
  localeString = localeString.replace("PM","");
  localeString = localeString.replace(",","/");
  localeString = localeString.split(":").join("/");
  let localeStringArray = localeString.split('/')
  let date = new Date(localeStringArray[2], localeStringArray[1] - 1, localeStringArray[0], localeStringArray[3], localeStringArray[4], localeStringArray[5])

  return date;
}





export default {
  capitalizeFirstLetter,
  getLastCharactersFromString,
  getRandomNumberFromLength,
  getRandomNumberFromLimit,
  getDateFromLocaleString,
}