import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import "./App.css";
import axios from "axios";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WindPowerIcon from "@mui/icons-material/WindPower";
import { API_ID } from "./Config";

const FirstPage = () => {
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState("");
  const [buttondata, setButtondata] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleSearch = (e) => {
    setCity(e.target.value);
  };
  const handleOn = () => {
    setButtondata(city);
  };
  const convertToFahrenheit = (temperature) => {
    return Math.round(temperature - 273.15);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${buttondata}&appid=${API_ID}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [buttondata]);
  console.log(weatherData);

  return (
    <>
      <React.Fragment>
        <Box>
          <Box>
            <Typography
              style={{
                textAlign: "center",
                marginTop: 5,
                fontWeight: "bolder",
                fontFamily: "initial",
                fontSize: "30px",
                color: "#FF2171",
              }}
            >
              Weather App
            </Typography>
          </Box>

          <Card
            className="cardbody"
            style={{
              textAlign: "center",
              margin: 35,
              borderRadius: "10px",
              minHeight: "70vh",
            }}
          >
            <CardContent>
              <Typography style={{ fontWeight: "bold", fontSize: "18px" }}>
                Enter Your City Name
              </Typography>
            </CardContent>
            <Box>
              <TextField label="CityName" onChange={handleSearch} />
            </Box>
            <Box>
              {city && (
                <Typography
                  variant="h6"
                  style={{ marginTop: 10, color: "#213363" }}
                >
                  Your City Name is: {city}
                </Typography>
              )}
            </Box>
            <Box>
              <Button
                sx={{
                  backgroundColor: "#FF2171",
                  padding: "10px",
                  margin: "10px",
                  color: "white",
                }}
                onClick={handleOn}
              >
                Submit
              </Button>
            </Box>

            <Typography>
              {weatherData && (
                <>
                  Temperature: {convertToFahrenheit(weatherData.main.temp)}°
                  <br />
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box>
                      <WindPowerIcon />
                    </Box>
                    <Box>Wind: {weatherData.wind.speed}</Box>
                  </Box>
                </>
              )}
            </Typography>

            <Box>
              <Typography>
                <AccessTimeIcon
                  style={{ fontSize: "1em", verticalAlign: "middle" }}
                />{" "}
                Current Time: {currentTime.toLocaleTimeString()}
              </Typography>
            </Box>
          </Card>
        </Box>
      </React.Fragment>
    </>
  );
};

export default FirstPage;
