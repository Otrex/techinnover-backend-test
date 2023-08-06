# DispatcherAPI Project README

Welcome to the DispatcherAPI project! This README will guide you on how to build, run, and test the project. Please follow the instructions below to get started.

## Project Description

You can find the description for this project @[Task Description](./TASK.md).

### Stack Used

This project was built with `typescript`, `SQLite`, `Mocha` and `TypeORM` as the ORM.

> Refer to the TypeORM documentation for more information

The data is seeded automatically using the TypeORM extension feature.

_Note: No migration is required for this project_

### API Documentation
The API documentation is available @ the endpoint `/docs` which can be visited once the app is running. Or you can get out the OpenAPI `.json` file [here](./docs/api.json), the use an OpenAPI documentation viewer such as the [SwaggerEditor](https://editor.swagger.io), to preview the docs. 

## Prerequisites

To run the app, please ensure you have the following software installed on your system:

- Node.js (version 14 or higher)
- npm (Node Package Manager) or yarn (Yarn Package Manager)
- TypeScript

## Getting Started

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Otrex/techinnover-backend-test.git techinnover-server
```

2. Install dependencies:

```bash
cd techinnover-server
yarn
```

## Build

To build the TypeScript project, use the following command:

```bash
yarn build
```

This command will transpile the TypeScript code into JavaScript and store the output in the `build` directory.

## Run

To run the project, use the following command:

```bash
yarn start
```

This command will execute the main entry point of the application, which should be defined in the `package.json` file.

## Test

To run tests, use the following command:

```bash
yarn test
```

This command will execute all the test cases defined in the `test` directory using a testing framework 'Mocha'.

## Development

If you wish to make changes to the project code, you can start the development server in watch mode. This will automatically rebuild the project when changes are detected:

```bash
yarn dev
```

## Contact

If you have any questions or need further assistance, please feel free to contact us:

- Name: Obisike Treasure
- Email: <obisiket@gmail.com>

