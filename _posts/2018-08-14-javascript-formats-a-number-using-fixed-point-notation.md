---
title: JavaScript formats a number using fixed-point notation
author: Haijun (Navy) Su
layout: post
tags: [javascript, format]
---
Method: Number.toFixed()

Example:
```javascript
Number.parseFloat(x).toFixed(2);
```

Other examples:
```javascript
// format number easy to ready.
// example: 1000 -> 1,000
function easyRead(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

// format number as Million, kilo- and so on
// example numFormatter(1234, 1) -> 1.2k
function numFormatter(num, digits) {
  var si = [
    { value: 1E18, symbol: "E" },
    { value: 1E15, symbol: "P" },
    { value: 1E12, symbol: "T" },
    { value: 1E9,  symbol: "G" },
    { value: 1E6,  symbol: "M" },
    { value: 1E3,  symbol: "k" }
  ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
  for (i = 0; i < si.length; i++) {
    if (Math.abs(num) >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }
  }
  return num.toFixed(digits).replace(rx, "$1");
}
```




references: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed>
