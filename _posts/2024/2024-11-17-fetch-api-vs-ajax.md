---
title: Fetch API vs AJAX
author: Haijun (Navy) Su
layout: post
tags: [fetch, ajax, javascript, react,angular]
---

Both `fetch` and `ajax` (Asynchronous Javascript and XML) are used for making asynchronous HTTP requests, but they have some key differences in terms of usage, features and modern web development practices.

## Fetch API

### Overview

The `fetch` API is a modern interface that allows you to make network requests similar to `XMLHttpRequest` (XHR). However, it provides a more powerful and flexible feature set.

### Key Features

* **Promise-Based**: `fetch` use Promises, making it easier to work with and handle asynchronous operations.
* **Simpler Syntax**: The syntax is more concise and readable compared to `XMLHttpRequest`.
* **Streaming Responses**: `fetch` allows you to access the body content while it's still downloading, using the `ReadableStream` interface.
* **Better Error Handling**: With Promises, you can handle errors more elegantly using `catch`.

Example:

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
```

## AJAX (Using XMLHttpRequest)

### Overview

AJAX is a technique that use `XMLHttpRequest` to send and receive data asynchronously from a web server. It has been widely used in web development for a long time.

### Key Features

* **Widespread Support**: `XMLHttpRequest` is supported all modern browsers.
* **Complex Callbacks**: Requires more setup with multiple callbacks for different stages of the request.
* **More Control**: Provides more granular control over the request, including progress events.
* **Older API**: The API is older and can be more cumbersome to use compared to modern alternative like `fetch`.

Example:

```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      console.log(data);
    } else {
      console.error('There was a problem with your request:', xhr.statusText);
    }
  }
};
xhr.send();
```

## Comparison Table

| Feature             | Fetch                                   | AJAX (XMLHttpRequest)                   |
| ------------------- | --------------------------------------- | --------------------------------------- |
| **API**             | Modern, promise-based                   | Older, callback-based                   |
| **Syntax**          | Simpler, more concise                   | More complex, verbose                   |
| **Error Handling**  | Easy with Promises (`catch`)            | Requires manual handling with callbacks |
| **Response Type**   | Can handle different types (Blob, Json) | Mostly handles text                     |
| **Stream Handling** | Supports streams                        | Limited steam support                   |
| **Browser Support** | Modern browsers                         | All browsers including older ones       |

## When to Use Fetch

* **Modern Applications**: For new projects or modern web applications, the `fetch` API is recommended due to simplicity and improved feature set.
* **Promise-Based Workflow**: If you prefer or require a Promise-based approach for handling asynchronous operations.

## When to use AJAX (XMLHttpRequest)

* **Legacy Code**: When maintaining or working with legacy systems that already use `XMLHttpRequest`.
* **Greater Control**: If you need fine-grained control over the HTTP request and response, include progress monitoring.
