# Boxinator 📦

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?)](https://github.com/RichardLitt/standard-readme)
[![web](https://img.shields.io/static/v1?logo=gitlab&message=Pages&label=Gitlab&color=c2681f)](https://theneonleon.gitlab.io/se-java-boxinator-frontend/)
[![web](https://img.shields.io/static/v1?logo=gitlab&message=Backend&label=Gitlab&color=c2681f)](https://gitlab.com/DMasso/se-java-boxinator)

## Table of Contents

- [Background](#background)
- [Description](#description)
- [Install](#install)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Background
The primary purpose of the software to be a capstone experience for the candidates; they
are expected to utilize a selection of possible development options to produce a single
software solution that demonstrates their capabilities as developers. 

The candidates must produce a software solution that is considered a final product. The software is to be produced over a period of three weeks.

##### Technologies used: JavaScript, react, keycloak

## Description

Web app constructed with react as front-end, spring boot and hibernate as back-end. 

Application designed for calculating the shipping cost for mystery
boxes to specific locations around the world. It is a web application, using a RESTful API to communicate with a server.

Users can send packages to different countries around the world. They can for example:

- Add a receiver 
- Select a country
- Select weight options for the package
- Select a box color for the package being sent

Users can register an account, which they can use for retrieving details about packages they have sent, they can see any shipments they have under way and recently completed shipments.

Users can also be administrators. Once an administrator has logged in they are able to view all current shipments and their
respective status’. From here the administrator has the ability to change a shipment’s state. Administrators may also update the country multipliers to affect the pricing of shipment.

## Install
First, clone the repository.
Then run the following commands in terminal:
```
npm install
```


## Usage
Run the following command in terminal:
```
npm start
```
OR

You can use the deployed version on [Gitlab Pages](https://theneonleon.gitlab.io/se-java-boxinator-frontend/)

## Acknowledgements
We would like to thank Livinus Obiora Nweke for giving their time to assist the candidates during the case period.

## Maintainers

Edwin Eliasson [@edwineliasson98](https://gitlab.com/edwineliasson98),
Leon Listo [@TheNeonLeon](https://github.com/TheNeonLeon),
Dennis Massoumnataj [@DMasso](https://gitlab.com/DMasso)

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2022 Edwin Eliasson, Dennis Massoumnataj, Leon Listo
