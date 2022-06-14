# GoodPrice

[![GitHub workflow status](https://img.shields.io/github/workflow/status/ayltai/GoodPrice/CI?style=flat)](https://github.com/ayltai/GoodPrice/actions)
[![Coverage](https://img.shields.io/sonar/coverage/ayltai_GoodPrice?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/dashboard?id=ayltai_GoodPrice)
[![Violations](https://img.shields.io/sonar/violations/ayltai_GoodPrice?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/dashboard?id=ayltai_GoodPrice)
[![Tech debt](https://img.shields.io/sonar/tech_debt/ayltai_GoodPrice?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/dashboard?id=ayltai_GoodPrice)
[![Quality gate](https://img.shields.io/sonar/quality_gate/ayltai_GoodPrice?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/dashboard?id=ayltai_GoodPrice)
[![Maintainability rating](https://sonarcloud.io/api/project_badges/measure?project=ayltai_GoodPrice&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ayltai_GoodPrice)
[![Reliability rating](https://sonarcloud.io/api/project_badges/measure?project=ayltai_GoodPrice&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=ayltai_GoodPrice)
[![Security rating](https://sonarcloud.io/api/project_badges/measure?project=ayltai_GoodPrice&metric=security_rating)](https://sonarcloud.io/dashboard?id=ayltai_GoodPrice)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ayltai_GoodPrice&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=ayltai_GoodPrice)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/ayltai/GoodPrice?style=flat)
![Maintenance](https://img.shields.io/maintenance/yes/2022)
[![Release](https://img.shields.io/github/release/ayltai/GoodPrice.svg?style=flat)](https://github.com/ayltai/GoodPrice/releases)
[![License](https://img.shields.io/github/license/ayltai/GoodPrice.svg?style=flat)](https://github.com/ayltai/GoodPrice/blob/master/LICENSE)

The forgotten shopping tool - using unit pricing is the [best](https://eprints.qut.edu.au/221392/) way for shoppers to save money on grocery shopping!

## Features
* Identifies the cheapest item
* Shows the percentage difference for all items
* Supports automatic conversion of quantity of different units
* Supports area, length, time, volume, and weight units
* Supports automatic conversion of different currencies
* Supports offline mode

## Supported units
| Type   | Units                                                |
|--------|------------------------------------------------------|
| Area   | m², cm², ft², in², ym², mm², km², mi²                |
| Length | mm, m, cm, ft, in, ym, km, mi                        |
| Time   | min, hour, day, week, month, year                    |
| Volume | m³, cm³, ft³, in³, ml, L, oz, oz (US), gal, gal (US) |
| Weight | mg, g, kg, lb, oz, oz (US), tonne, tonne (US)        |

## Screenshots
![Light mode](design/light-mode.jpg)
![Dark mode](design/dark-mode.jpg)

## Development
1. Install [NodeJS](https://nodejs.org)
2. Install dependencies
   ```shell
   npm i --legacy-peer-deps
   ```
3. Install Expo CLI
   ```shell
   npm i -g expo-cli
   ```
4. Install EAS CLI
   ```shell
   npm i -g eas-cli
   ```

## Configurations

### (Optional) Open Exchange Rates API
1. Get an API key from [Open Exchange Rates](https://openexchangerates.org/signup)
2. Specify the API key for getting the latest currency rates
   ```shell
   export API_KEY_OPEN_EXCHANGE_RATES=XXXXX
   ```

### Run
Open a terminal window and run:
```shell
npm start
```

### Build
Open a terminal window and run:
```shell
npm run build
```

## License
This project is licensed under the terms of the [MIT license](https://github.com/ayltai/GoodPrice/blob/LICENSE).
