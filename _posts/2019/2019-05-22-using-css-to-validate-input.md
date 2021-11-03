---
title: Using CSS to Validate Input
author: Haijun (Navy) Su
layout: post
tags: [css]
---

### Requirement:
```
// Should not match
''
' '
'  '
'   '
// Should match
'one-word'
'one-word '
' one-word'
' one-word '
'one phrase with whitespace'
'one phrase with whitespace '
' one phrase with whitespace'
' one phrase with whitespace '
```

### Solution:
* Using input pattern attrbite and set value as `.*\S.*`
  * `.*`: Any character
  * `\S`: Followed one non-whitespace character
  * `.*`: Followed by any character
* Using css to highlight input status (correct is green border and invaild is red border)

### Code

Here’s a [codepen](https://codepen.io/zellwk/pen/NeRaPw/) with the updated solution by Daniel.

#### HTML Code
```html
<form action="#" autocomplete="off">
  <h2>Empty Validation with pure CSS</h2>
  <p>Type something into this input field below.</p>
  <ul>
    <li>When input is filled: Borders turn green</li>
    <li>When validation fails: Borders turn red</li>
  </ul>
  <div class="input">
    <label for="input" >Label </label>
    <input type="text" name="input" id="input" required placeholder="Type something in here" pattern=".*\S.*">
    </div>
</form>
```

#### CSS Code
```css
/* Show red borders when filled, but invalid */
input:not(:placeholder-shown) {
  border-color: hsl(0, 76%, 50%);;
}

/* Show green borders when valid */
input:valid {
  border-color: hsl(120, 76%, 50%);
}
```

Reference:
<https://medium.freecodecamp.org/how-to-check-if-an-input-is-empty-with-css-1a83715f9f3e>
