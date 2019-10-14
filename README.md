# Roman Numerals Converter

An API server that exposes four routes.This app is able to convert roman numerals to Arabic and the other way round.A documentation can be found through [Postman Documentation](https://documenter.getpostman.com/view/4239781/SVtVV8yE?version=latest).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. An online version of this API server is deployed on [Heroku](https://www.heroku.com/) [ [Here](https://roman-arabic-converter.herokuapp.com/all/arabic) ]. Also for an end to end solution I have deployed an Ionic PWA consuming this API calls [ [Here](https://www.csd.uoc.gr/~csd3142/converter/) ].

### Prerequisites

For running this Node service you will need Node and MongoDB. Also there is option running in it docker,

- [**Node**](https://nodejs.org/en/download/)
- [**MongoDB** ](https://docs.mongodb.com/manual/installation/)
- [**Docker**](https://docs.docker.com/v17.09/engine/installation/)

### Installing

Following these steps will get you a copy of the service running locally on you machine.

```

 1. git clone https://github.com/gkampitakis/romanNumerals.git
 2. cd romanNumerals
 3. npm i
 4. mongo
 5. npm run dev

```

## Running the tests

In order to run the tests for this api service you firstly need to run the service.

```

 1. npm run test

```

## Libraries used

### Dependencies

- [dotenv](https://www.npmjs.com/package/dotenv)
- [mongodb](https://www.npmjs.com/package/mongodb)
- [restify](https://www.npmjs.com/package/restify)
- [restify-cors-middleware](https://www.npmjs.com/package/restify-cors-middleware)
- [typescript](https://www.npmjs.com/package/typescript)

### Dev Dependencies

- [@types/chai](https://www.npmjs.com/package/@types/chai)
- [@types/dotenv](https://www.npmjs.com/package/@types/dotenv)
- [@types/mocha](https://www.npmjs.com/package/@types/mocha)
- [@types/mongodb](https://www.npmjs.com/package/@types/mongodb)
- [@types/node](https://www.npmjs.com/package/@types/node)
- [@types/restify](https://www.npmjs.com/package/@types/restify)
- [@types/restify-cors-middleware](https://www.npmjs.com/package/@types/restify-cors-middleware)
- [chai](https://www.npmjs.com/package/@types/chai)
- [chai-http](https://www.npmjs.com/package/@types/chai-http)
- [chai](https://www.npmjs.com/package/@types/chai)
- [mocha](https://www.npmjs.com/package/mocha)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
