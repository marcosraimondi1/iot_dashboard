# IOT DASHBOARD
An easy to use and customizable dashboard for visualizing and managing your IoT devices.

Check this other repositories for the full integration:
- [IoT Dashboard Services](https://github.com/marcosraimondi1/iot_dashboard_services)
- [IoT Dashboard Devices](https://github.com/marcosraimondi1/iot_dashboard_devices)
 
## Requirements
- npm ^10.9
- node ^23.5

## Build

### Start services
1. Follow instructions on [http://github.com/marcosraimondi1/iot_dashboard_services](http://github.com/marcosraimondi1/iot_dashboard_services) 
to start emqx and mongo services.

### Local development
1. Clone the repository
2. Install dependencies
```sh
npm install
```
3. Create .env file. A template is shown in `env-dev`.
> [!NOTE]  
> Environment variables must match with the backend environment variables (iot_dashboard/.env).
4. Run locally (backend and frontend)
```sh
npm run devn & # start backend daemon (nodemon)
npm run dev # start frontend

```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
6. Check backend [http://localhost:3001/api/health](http://localhost:3001/api/health)

### Production

## Usage
## Screenshots
