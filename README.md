# Node.js/Express Boilerplate for GCP 🐣
[![Dependencies](https://img.shields.io/david/cortl/express-gcp.svg)](https://david-dm.org/cortl/express-gcp)
[![Dev Dependencies](https://img.shields.io/david/dev/cortl/express-gcp.svg)](https://david-dm.org/cortl/express-gcp?type=dev)
![Size](https://img.shields.io/github/languages/code-size/cortl/express-gcp.svg)
[![License](https://img.shields.io/packagist/l/cortl/express-gcp.svg)](LICENSE)

## About
Boilerplate application for Node/Express on Google Cloud App Engine

## Getting Started

### Prerequisites
Google Cloud Platform project setup and the [Google Quickstart "Before You Begin"](https://cloud.google.com/appengine/docs/standard/nodejs/quickstart#before-you-begin) steps followed.

### Installing
1. `npm install`

### Usage & Developing
1. `npm run dev`
3. Develop! 🎉

### Testing
We prefer to use [Mocha] combined with [Sinon] and [Chance] to unit test our applications.  You can auto-run the tests using a tool called [Nodemon] which will auto-run the tests.  Some helpful commands to use when you want to run a specfic set of tests are

`nodemon --watch test --exec "Describe Block"`

for this sample project you could use
`nodemon --watch test --exec "Index Router"`
which would run all the tests under
```
describe('Index Router', () => {
    it('should run this test', () => {});

    describe('GET /', () => {
        it('should also run this test', () => {});
    });
});
```

### Deploying
1. `gcloud app deploy`
2. `gcloud app browse`
