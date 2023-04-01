import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import Loading from './Loading';
import axios from 'axios';
import Weather from './Weather';

const API_KEY = '550e696d58d3cc6f647648870fdaf894';

export default class extends React.Component {

  state = {
    isLoading: true
  }

  getWeather = async (latitude, longitude) => {
    const {data: {main: {temp}, weather}} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    this.setState({
      isLoading: false, 
      temp: temp, 
      condition: weather[0].main,
    });
    console.log(data);
  }

  getLocation = async () => {
    try {                   
      await Location.requestForegroundPermissionsAsync();
      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch {
      Alert.alert('Не могу определить место положения.', 'Очень грустно :(');
    }
  }

  componentDidMount() { 
    this.getLocation();
  }

  render () {
    const {isLoading, temp, condition} = this.state;
    return (
      isLoading ? <Loading /> : <Weather  temp={Math.round(temp)} condition={condition} />
    );
  } 
}


