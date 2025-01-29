# IOT DASHBOARD
An easy to use and customizable dashboard for visualizing and managing your IoT devices.

Check this other repositories for the full integration:
- [IoT Dashboard Services](https://github.com/marcosraimondi1/iot_dashboard_services)
- [IoT Dashboard Devices](https://github.com/marcosraimondi1/iot_dashboard_devices)



https://github.com/user-attachments/assets/f5a52d38-905b-401c-bcb3-e46f61a5c553


 
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
1. First register and lgin to access your own dashboard.
2. Once logged, you will need to create a template, a template is a set of widgets that let you see and interact with different variables on your system. Available widgets are:
- IoT Button: sends a custom message to the device when clicked.
- IoT Switch: switches between 2 states (true or false)
- IoT Indicator: shows the status of a binary variable (ex. on/off).
- IoT Real Time Number Chart: displays a line chart of data sent by the device.   
3. Once you have created your template, create a device that will use the template.
4. After creating the device, you now need to set up your device firmware. An example is shown in [IoT Dashboard Devices](https://github.com/marcosraimondi1/iot_dashboard_devices), you can follow that example or configure your own device.
5. Once you have connected your device, you should be able to interact with it from the dashboard.  
## Screenshots

**Main dashboard**:

![dashboard](https://github.com/user-attachments/assets/6ed2f284-dc81-4a79-a158-265b2aec2408)


**Notifications from emqx rules**:

![2025-01-29-191225_1394x939_scrot](https://github.com/user-attachments/assets/f88f3fdb-b5fe-4c49-8a2b-5c3970e1b985)

**Template Creation**:

![templates](https://github.com/user-attachments/assets/a8e3ee3a-d7fd-4a27-a6a0-cd74b63dfe09)
