const Express = require("express");
const BodyParser = require("body-parser");
const Cors = require("cors");
const Smartcar = require("smartcar");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Cors());

const SMARTCAR_CLIENT_ID = "CLIENT_ID_HERE";
const SMARTCAR_CLIENT_SECRET = "CLIENT_SECRET_HERE";
const SMARTCAR_REDIRECT_URL = "http://localhost:3000/exchange";

var smartcar_access_token = "";

const client = new Smartcar.AuthClient({
    clientId: SMARTCAR_CLIENT_ID,
    clientSecret: SMARTCAR_CLIENT_SECRET,
    redirectUri: SMARTCAR_REDIRECT_URL,
    scope: ["read_vehicle_info", "read_location", "read_vin", "read_fuel", "read_battery", "read_charge"],
    testMode: true,
});

app.get("/login", (request, response) => {
    const link = client.getAuthUrl();
    response.redirect(link);
});

app.get("/exchange", (request, response) => {
    const code = request.query.code;
    client.exchangeCode(code).then(access => {
        smartcar_access_token = access.accessToken;
        response.send(access);
        //response.redirect("http://localhost:2015");
    });
});

app.get("/vehicles/location", (request, response) => {
    Smartcar.getVehicleIds(smartcar_access_token).then(data => {
        return data.vehicles;
    }).then(ids => {
        return vehicles = ids.map(async id => {
            let vehicle = new Smartcar.Vehicle(id, smartcar_access_token);
            return vehicle.location().then(location => {
                return {
                    id,
                    location: {
                        latitude: location.data.latitude,
                        longitude: location.data.longitude,
                        age: location.age
                    }
                }
            });
        });
    }).then(vehicles => {
        Promise.all(vehicles).then(result => {
            response.send(result);
        });
    });
});

app.get("/vehicle/:id/info", (request, response) => {
    let vehicle = new Smartcar.Vehicle(request.params.id, smartcar_access_token);
    vehicle.info().then(result => {
        response.send(result);
    });
});

app.get("/vehicle/:id/location", (request, response) => {
    let vehicle = new Smartcar.Vehicle(request.params.id, smartcar_access_token);
    vehicle.location().then(result => {
        response.send(result);
    });
});

app.get("/vehicle/:id/fuel", (request, response) => {
    let vehicle = new Smartcar.Vehicle(request.params.id, smartcar_access_token);
    vehicle.setUnitSystem("metric");
    vehicle.fuel().then(fuel => {
        response.send(fuel);
    });
});

var server = app.listen("3000", () => {
    console.log(`Listening at ${server.address().address}${server.address().port}...`);
});