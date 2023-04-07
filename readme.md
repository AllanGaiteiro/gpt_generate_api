# gpt_generate_api

A RESTful API that serves as an interface for GPT-3 generation built with Node.js and Express.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of Node.js.
* You have a basic understanding of TypeScript, Express and GPT-3.

## Installation

To install `gpt_generate_api`, follow these steps:

1. Clone the repository using the following command:

```
git clone https://github.com/AllanGaiteiro/gpt_generate_api.git
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file at the root directory and add your OpenAI API key in the following format:

```
OPENAI_API_KEY=<YOUR_API_KEY>
```

## Starting the Server

To start the server, run the following command:

```
npm start
```

This will compile the TypeScript code and start the server using nodemon.

## Testing

To run the tests, run the following command:

```
npm test
```

## Dependencies

The following dependencies are required for this project:

* `@types/express`: "^4.17.17"
* `body-parser`: "^1.20.2"
* `express`: "^4.18.2"
* `js-beautify`: "^1.14.7"
* `openai`: "^3.2.1"

## DevDependencies

The following dev dependencies are used in this project:

* `ts-node`: "^10.9.1"

## License

This project uses the ISC license.
