# Node.js/Express Boilerplate for GCP 🐣
[![CircleCI](https://circleci.com/gh/cortl/express-gcp.svg?style=svg)](https://circleci.com/gh/cortl/express-gcp)
[![Dependencies](https://img.shields.io/david/cortl/express-gcp.svg)](https://david-dm.org/cortl/express-gcp)
[![Dev Dependencies](https://img.shields.io/david/dev/cortl/express-gcp.svg)](https://david-dm.org/cortl/express-gcp?type=dev)
![Size](https://img.shields.io/github/languages/code-size/cortl/express-gcp.svg)
[![License](https://img.shields.io/github/license/cortl/express-gcp.svg)](LICENSE)

## About
Boilerplate application for Node/Express on Google Cloud App Engine

## Getting Started

### Prerequisites
Google Cloud Platform project setup and the [Google Quickstart "Before You Begin"](https://cloud.google.com/appengine/docs/standard/nodejs/quickstart#before-you-begin) steps followed.

You'll also need to change the `PROJECT_ID` in `/config/default.js` to your Google project id.

### Installing
1. `npm install`

### Usage & Developing
1. `npm run dev`
2. Develop! 🎉
3. `npm run verify` to ensure your changes didn't break anything!

### Testing
We prefer to use [Mocha] combined with [Sinon] and [Chance] to unit test our applications.  You can auto-run the tests using a tool called [Nodemon] which will auto-run the tests.  Some helpful commands to use when you want to run a specfic set of tests are

`nodemon --watch test --exec "Describe Block"`

for this sample project you could use
`nodemon --watch test --exec "Index Router"`
which would run all the tests under
```
describe('Index Router', () => {
    test('should run this test', () => {});

    describe('GET /', () => {
        test('should also run this test', () => {});
    });
});
```

### Logging

Logs for this application can be found in your [GAE log page](https://console.cloud.google.com/logs/viewer).  There aren't many options for logging to Google Cloud that are still actively maintained other than the `@google-cloud/logging` package, so this project takes advantage of that.  It follows the same interace as `console` so it won't be hard to swap to.

### Deploying
1. `gcloud app deploy`
2. `gcloud app browse`

#### Github Actions

Create a service account that you'll use to deploy the application with after it has been built.  It will need the following IAM roles:
- App Engine Admin
- Cloud Build Editor
- Storage Admin
- Service Account User

After you've downloaded the credentials, copy the entire contents into an environment variable called `GCP_SA_KEY` in your repositories' actions' secrets.

The first build in Github Actions will fail and it will tell you to enable the App Engine Admin API, do that and re-run