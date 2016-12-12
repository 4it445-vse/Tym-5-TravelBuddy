import React, {Component} from 'react';
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

                console.log("WEATHER response",response.data);
                    this.setState({weather: response.data});
                }
            })
            .catch(function (error) {
                console.log("Error",error);
            });

    }

    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData.list.map(weather => weather.main.temp);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities= cityData.list.map(weather => weather.main.humidity);
        const {lon, lat} = cityData.city.coord;
        return (
            <tr className="weatherItem" key={name}>
                <td>
                    <GoogleMap lat={lat} lon={lon} />
                </td>
                <td>
                    <Chart data={temps} color="orange" units="C"/>
                </td>
                <td>
                    <Chart data={pressures} color="green" units="hPa"/>
                </td>
                <td>
                    <Chart data={humidities} color="black" units="%"/>
                </td>
            </tr>
        );
    }
    render() {
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (C)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.weather != null ? this.renderWeather(this.state.weather) : <tr></tr>}

                </tbody>
            </table>
        );
    }
}
