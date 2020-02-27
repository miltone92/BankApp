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

/**
 * Description: Returns an object with information of devices OS and browser.
 * Example: {os: "Windows"
              osVersion: 10
              browser: "Chrome"
              browserVersion: 79.0394513}
 * @return {Object} Object with OS and browser information.
 */
let getOSandBrowser = () =>{
  //Source: https://medium.com/creative-technology-concepts-code/detect-device-browser-and-version-using-javascript-8b511906745
  var module = {
      options: [],
      header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
      dataos: [
          { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
          { name: 'Windows', value: 'Win', version: 'NT' },
          { name: 'iPhone', value: 'iPhone', version: 'OS' },
          { name: 'iPad', value: 'iPad', version: 'OS' },
          { name: 'Kindle', value: 'Silk', version: 'Silk' },
          { name: 'Android', value: 'Android', version: 'Android' },
          { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
          { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
          { name: 'Macintosh', value: 'Mac', version: 'OS X' },
          { name: 'Linux', value: 'Linux', version: 'rv' },
          { name: 'Palm', value: 'Palm', version: 'PalmOS' }
      ],
      databrowser: [
          { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
          { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
          { name: 'Safari', value: 'Safari', version: 'Version' },
          { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
          { name: 'Opera', value: 'Opera', version: 'Opera' },
          { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
          { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
      ],
      init: function () {
          var agent = this.header.join(' '),
              os = this.matchItem(agent, this.dataos),
              browser = this.matchItem(agent, this.databrowser);
          
          return { os: os, browser: browser };
      },
      matchItem: function (string, data) {
          var i = 0,
              j = 0,
              html = '',
              regex,
              regexv,
              match,
              matches,
              version;
          
          for (i = 0; i < data.length; i += 1) {
              regex = new RegExp(data[i].value, 'i');
              match = regex.test(string);
              if (match) {
                  regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                  matches = string.match(regexv);
                  version = '';
                  if (matches) { if (matches[1]) { matches = matches[1]; } }
                  if (matches) {
                      matches = matches.split(/[._]+/);
                      for (j = 0; j < matches.length; j += 1) {
                          if (j === 0) {
                              version += matches[j] + '.';
                          } else {
                              version += matches[j];
                          }
                      }
                  } else {
                      version = '0';
                  }
                  return {
                      name: data[i].name,
                      version: parseFloat(version)
                  };
              }
          }
          return { name: 'unknown', version: 0 };
      }
  };

  var e = module.init(),
  debug = '';

/** 
  debug += 'os.name = ' + e.os.name + '\n';
  debug += 'os.version = ' + e.os.version + '\n';
  debug += 'browser.name = ' + e.browser.name + '\n';
  debug += 'browser.version = ' + e.browser.version + '\n';
  debug += '\n';
  debug += 'navigator.userAgent = ' + navigator.userAgent + '\n';
  debug += 'navigator.appVersion = ' + navigator.appVersion + '\n';
  debug += 'navigator.platform = ' + navigator.platform + '\n';
  debug += 'navigator.vendor = ' + navigator.vendor + '\n';
*/
  let summary = {
    os: e.os.name,
    osVersion: e.os.version,
    browser: e.browser.name,
    browserVersion: e.browser.version
  }

  return summary;
}


export default {
  capitalizeFirstLetter,
  getLastCharactersFromString,
  getRandomNumberFromLength,
  getRandomNumberFromLimit,
  getDateFromLocaleString,
  getOSandBrowser
}