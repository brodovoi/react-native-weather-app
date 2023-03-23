import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import Loading from './Loading';
import axios from 'axios';

const API_KEY = '550e696d58d3cc6f647648870fdaf894';

export default class extends React.Component {

  state = {
    isLoading: true
  }

  getWeather = async (latitude, longitude) => {
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    console.log(data);
  }

  getLocation = async () => {
    try {                   
      await Location.requestForegroundPermissionsAsync();
      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      this.setState({isLoading: false});
    } catch {
      Alert.alert('Не могу определить место положения.', 'Очень грустно :(');
    }
  }

  componentDidMount() { 
    this.getLocation();
  }

  render () {
    const {isLoading} = this.state;
    return (
      isLoading ? <Loading /> : null
    );
  } 
}


