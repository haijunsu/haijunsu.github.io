---
title: Regex.md
author: Haijun (Navy) Su
layout: page
tags: [regex]
---

### Trim sapces
```
^[\s]*(.*?)[\s]*$
```

### HTML Tag
```
<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)
```

### Hexadecimal value
```
\B#(?:[a-fA-F0–9]{6}|[a-fA-F0–9]{3})\b
```

### Valid email (RFC5322)
```
\b[\w.!#$%&’*+\/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)*\b
```

### Username
(3 <= len <= 16, leters, numbers, or dashes)
```
/^[a-z0-9_-]{3,16}$/
```

### Strong password
Minimum length of 6, at least one uppercase letter, at least one lowercase letter, at least one number, at least one special character
```
(?=^.{6,}$)((?=.*\w)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[|!"$%&\/\(\)\?\^\'\\\+\-\*]))^.*
```

### URL (http, https or ftp) 
```
^(((https?|ftp):\/\/)?([\w\-\.])+(\.)([\w]){2,4}([\w\/+=%&_\.~?\-]*))*$
```

{: .note}
Cannot verify name like www...example.com. will check later

### IPv4 address
```
\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b
```

### SSN - Social Security Nubmer
```
^((?<area>[\d]{3})[-][\d]{2}[-][\d]{4})$
```

### Alpha-numeric, literals, digits, lowercase, uppercase chars only
```
\w                //alpha-numeric only
[a-zA-Z]          //literals only
\d                //digits only
[a-z]             //lowercase literal only
[A-Z]             //uppercase literal only
```

### Other useful topics:

* Boundaries — \b and \B
* Back-references — \1
1. `([abc])\1`
using `\1` it matches the same text that was matched by the first capturing group -> [Try it!](https://regex101.com/r/cO8lqs/14)
2. `([abc])([de])\2\1`      
we can use `\2` (`\3`, `\4`, etc.) to identify the same text that was matched by the second (third, fourth, etc.) capturing group -> [Try it!](https://regex101.com/r/cO8lqs/15)
3. `(?<foo>[abc])\k<foo>`   
we put the name foo to the group and we reference it later (`\k<foo>`). The result is the same of the first regex -> [Try it!](https://regex101.com/r/cO8lqs/16)

* Look-ahead and Look-behind — (?=) and (?<=)
1. `d(?=r)`       
matches a `d` only if is followed by `r`, but `r` will not be part of the overall regex match -> [Try it!](https://regex101.com/r/cO8lqs/18)
2. `(?<=r)d`      
matches a `d` only if is preceded by an `r`, but `r` will not be part of the overall regex match -> Try it!](https://regex101.com/r/cO8lqs/19)


reference:

<https://medium.com/factory-mind/regex-cookbook-most-wanted-regex-aa721558c3c1>

<https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285>
