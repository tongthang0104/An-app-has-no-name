'use strict';
import _ from 'lodash';

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;' || '&ldquo;',
  "'": '&#039;',
  '`': '&#x60;'
};

const unescapeMap = _.invert(escapeMap);

const createEscaper = function(map) {
   const escaper = function(match) {
     return map[match];
   };

   let source = '(?:' + _.keys(map).join('|') + ')';
   let testRegexp = RegExp(source);
   let replaceRegexp = RegExp(source, 'g');
   return function(string) {
     string = string == null ? '' : '' + string;
     return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
   };
};

const unescapeHelper = createEscaper(unescapeMap);

export {unescapeHelper};
