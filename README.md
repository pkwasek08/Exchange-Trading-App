# Exchange Trading - frontend application
This project is frontend client app, It's part of Exchange Trading project. This application is common for [Exchange-Trading-Api](https://github.com/pkwasek08/Exchange-Trading) and [Echange-Trading-Tester](https://github.com/pkwasek08/Exchange-Trading-Tester).

## Main functions
- table of noticed companies
- panel of stock transactions
- specific companie statistic
- user's history transactions
- user's depozit
- execution and managment limit offerts and immediate transactions
- orderbook
- price and volumen stocks plot

## Technologies
- NodeJs >= 10.13.0
- Angular 9
- Docker

### Graphic library
- Angular Material
- Bootstrap 4.5.3

## Setup
Install node_modules packages:  
```
npm install
```
Then app is ready to start. App can start using npm:
```
npm start
```
or use Docker. Firstly, you must build application:
```
ng build
```
Then, you can create custom Docker image which including Exchange-Trading-App:
```
docker build -t <image_name>:<tag> .
```
To run application on Docker you must start container:
```
docker run -d -p 4200:4200 <image_name>
```
Default running adress is ``localhost:4200``. If you use Docker, you can always change port using flag ``-p``. To run application without Docker you can change default port in angular settings (``protractor.conf.js`` file) or use
```
ng serve --port <custom_port>
```
## Linked repositoris
* [Exchange-Trading-Api](https://github.com/pkwasek08/Exchange-Trading)    
* [Exchange-Trading-Tester](https://github.com/pkwasek08/Exchange-Trading-Tester)  
* [Exchange-Trading-DevOps](https://github.com/pkwasek08/Exchange-Trading-DevOps)