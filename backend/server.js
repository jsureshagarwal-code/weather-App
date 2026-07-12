
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

const API_KEY = process.env.API_KEY;

/* =========================
   WEATHER ROUTE
========================= */

app.get("/weather/:city", async (req, res) => {

    const city = req.params.city;

    console.log("City Requested:", city);

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        console.log(url);

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        if (data.cod !== 200) {

            return res.status(404).json({
                message: data.message || "City not found"
            });
        }

        res.json(data);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

/* =========================
   FORECAST ROUTE
========================= */

app.get("/forecast/:city", async (req, res) => {

    const city = req.params.city;

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        res.json(data);

    }

    catch (error) {

        res.status(500).json({
            message: "Forecast error"
        });
    }
});

/* =========================
   AIR QUALITY ROUTE
========================= */

app.get("/air-quality/:lat/:lon", async (req, res) => {

    const { lat, lon } = req.params;

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );

        const data = await response.json();

        res.json({
            air: data
        });

    }

    catch (error) {

        res.status(500).json({
            message: "AQI error"
        });
    }
});

/* =========================
   LOCATION WEATHER
========================= */

app.get("/weather-location/:lat/:lon", async (req, res) => {

    const { lat, lon } = req.params;

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        res.json(data);

    }

    catch (error) {

        res.status(500).json({
            message: "Location weather error"
        });
    }
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});

