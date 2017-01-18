import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import Chart from './Chart';
import GoogleMap from './google_map';
import axios from 'axios';
const API_KEY = '47865b8d3214e5a9aa7193cba60d08fb';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?units=metric&APPID=${API_KEY}`;


export class WeatherList extends Component {
    constructor(props) {
        super(props);
        this.state ={weather: null};


    }
    componentDidMount() {
        this.fetchWeather(this.props.cityName);
    }

    fetchWeather(city) {
        const url = `${ROOT_URL}&q=${city},cz`;
        axios.get(url)
            .then((response) => {
                if (response.status === 200) {
                    // console.log("WEATHER response",response.data);
                    this.setState({weather: response.data});
                }
            })
            .catch(function (error) {
                console.log("Error",error);
            });

    }

    renderWeather(cityData) {

        const temps = cityData.list.map(weather => weather.main.temp);
        // const name = cityData.city.name;
        // const pressures = cityData.list.map(weather => weather.main.pressure);
        // const humidities= cityData.list.map(weather => weather.main.humidity);
        const {lon, lat} = cityData.city.coord;
        return (
          <Row>
            <Col md={6} style={{height: "300px"}}>
              <GoogleMap lat={lat} lon={lon} />
            </Col>
            <Col md={6} className="chart">
              <Chart data={temps} color="orange" units="C"/>
            </Col>
            {/* Unused charts */}
            {/* <Col md={3} className="chart">
              <Chart data={pressures} color="green" units="hPa"/>
            </Col>
            <Col md={3} className="chart">
              <Chart data={humidities} color="black" units="%"/>
            </Col> */}
          </Row>
        );
    }
    render() {
        return(
          <div className="weather">
            {this.state.weather != null ? this.renderWeather(this.state.weather) : <tr></tr>}
          </div>
        );
    }
}
