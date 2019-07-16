# Smartcar with HERE Technologies Example

An example Node.js and JavaScript project that demonstrates how to use the Smartcar JavaScript SDK with the HERE JavaScript SDK.

## Configuring the Application

There are a few requirements that must be met after cloning the project before it can be ran on your own local computer or web server, the first of which involves replacing the tokens to be used in the backend.

Open the project's **backend/app.js** file and change the following lines:

```
const SMARTCAR_CLIENT_ID = "CLIENT_ID_HERE";
const SMARTCAR_CLIENT_SECRET = "CLIENT_SECRET_HERE";
const SMARTCAR_REDIRECT_URL = "REDIRECT_URL_HERE";
```

The values to be used can be found in your Smartcar Developer Portal. The `SMARTCAR_REDIRECT_URL` should be the callback URL in your **backend** application. For example, the route exists as `http://localhost:3000/exchange` currently.

The next step involves replacing the tokens to be used in the frontend.

Open the project's **frontend/index.html** file and change the following lines:

```
const platform = new H.service.Platform({
    "app_id": "HERE_APP_ID",
    "app_code": "HERE_APP_CODE"
});
```

The values to be used can be found in your HERE Developer Portal for a given project.

With the appropriate tokens in place, execute the following command from within the **backend** directory:

```
npm install
```

The above command will install the required project dependencies which include Express Framework and the Smartcar JavaScript SDK.

## Running the Application

Both the **backend** and **frontend** projects need to be served. The cannot be ran directly from the filesystem. For this we'll need two separate Terminal instances, one for each project.

Within the **backend** directory, execute the following:

```
npm start
```

The above command will use the `start` script in the **package.json** file to start serving the application with Nodemon. This particular project will be served on port 3000.

Within the **frontend** directory, execute the following:

```
python -m SimpleHTTPServer 2015
```

Assuming Python is available, the above command will start a web server on port 2015. You can also use NGINX, Apache httpd, or Caddy to get the job done. Whatever you prefer as long as the project is being served.

## Using the Application

The Smartcar API relies on an OAuth flow. To start the flow, navigate to http://localhost:3000/login in the web browser and follow the steps. At the end of the login flow you'll be presented with your access token which is saved in memory in the backend.

After the token is saved in memory, navigate to http://localhost:2015 in the browser. The map should show and center on the Smartcar vehicles that it finds.

## Resources

- Smartcar - [https://www.smartcar.com](https://www.smartcar.com)
- HERE Technologies - [https://www.here.com](https://www.here.com)