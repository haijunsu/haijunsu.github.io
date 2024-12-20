---
title: GraphQL Query
author: Haijun (Navy) Su
layout: post
tags: [graphql, rest, restful, api]
---

GraphQL can query multiple APIs on the backend. Here is an example.

## Set Up a GraphQL Server

* Install dependencies

  ```bash
  npm install express apollo-server-express graphql node-fetch
  ```

* Create the GraphQL Server
  Create a file named `server.js` in the specified directory and set up the server.

  ```javascript
  const express = require('express');

    const { ApolloServer, gql } = require('apollo-server-express');
    const fetch = require('node-fetch');

    const typeDefs = gql`
    type Query {
        api1Data: API1Data
        api2Data: API2Data
    }

    type API1Data {
        id: ID
        name: String
    }

    type API2Data {
        userId: ID
        title: String
    }
    `;

    const resolvers = {
    Query: {
        api1Data: async () => {
        const response = await fetch('<https://jsonplaceholder.typicode.com/users/1>');
        return response.json();
        },
        api2Data: async () => {
        const response = await fetch('<https://jsonplaceholder.typicode.com/posts/1>');
        return response.json();
        },
    },
    };

    const server = new ApolloServer({ typeDefs, resolvers });

    const app = express();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );

    ```

## Exapanations

* **Dependencies**: Import the necessary modules (`express`, `apollo-server-express`, `graphql`, and `node-fetch`)
* **Sehema Definition (`typeDefs)**:
  * Define the GraphQL schema using the `gql` tagged template literal.
  * Create the `Query` type with two fields: `api1Data` and `api2Data`.
  * Define the types for the data returned by each API.
* **Resolvers**:
  * Create resolvers for each query field (api1Data, api2Data).
  * Use `fetch` to make HTTP requests to the respective APIs and return the JSON response.
* **Apollo Server**
  * Initialize an `ApolloServer` instance with the schema and resolvers.
  * Apply the Apollo middleware to the Express app.
* **Express Server**
  * Set up an Express server to listen on port 4000.

## Testing the server

You can test the GraphQL server by navigating to `http://localhost:4000/graphql` in a browser or using a tool like Postman or GraphQL playground. Use the following query to fetch data from both APIs.

```graphql
query {
  api1Data {
    id
    name
  }
  api2Data {
    userId
    title
  }
}
```

This query will return data from both APIs as defined in the schema.

## Summary

* **GraphQL Schema**: Defines the types and queries for you data.
* **Resolvers**: Handle the logic for fetching data from external APIs
* **Express and Apollo Server**: Set up the server and middleware.
