# Webhook Server


## Purpose

Handle webhooks from Bitbucket, and make requests to circle.


## Authentication


## Important Concepts

In order to facilite the purposes above, the following concepts are used throughout the project.

| Concept| Definition |
| ------------- |-------------|

## Getting Started

Need environment variables

### Prerequisites

#### Application Configuration

Configuration is managed by the JS files located in the `/conf` directory located in the `/src` directory of this project.
There are also many environment variables needed to run this project. (Listed below)

#### Installing dependancies
This project utilized NPM for package managment.  In the root directory, execute the following command:

```bash
npm install
```

#### Running the application / Environment Variables
It is recommended that you utilize an IDE to manage the running configuration of this application as there are generally
a fair number of environment variables the application depends on. Alternatively you can create .env files to manage your environment.  For running a local test environment, set the following
environment variables.

| Variable| Example | Description|
| ------------- |-------------| -----|
| NODE_ENV| testlocal| Mode which to run the application. |
| WEB_PORT| 3000| Port the web server will listen on |


Using the settings above, running this application is as simple as running the following:

```bash
npm start
```

## Running Mocha tests

Mocha can be used to test your ELS environment.  To run the tests provide the same environment variables as you would when running
a test environment.  The mocha files are located under `/tests`. An IDE is highly reccomended for running these tests but with the proper environment variables
set, simply run:

```bash
mocha --require ts-node/register --experimental-modules tests/{name of test file you want to run}
```

if you do not have mocha installed you may have to install globally it via:

```bash
npm install -g mocha
```


## Built With

* NodeJS
* NPM - Dependancy management

## Frameworks

* ExpressJS - Web controller
* Mocha - Testing
* MongoDB - Document oriented database
* Bull - Queuing system
* Typescript - Static Typing for Javascript


## Authors

* **Charles Wooley** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* CPM
