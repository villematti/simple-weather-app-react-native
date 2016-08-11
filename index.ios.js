import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  MapView
} from 'react-native';

import Api from './src/api';

var WeatherSpot = React.createClass({
  getInitialState: function() {
    return {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    }
  },
  render: function() {

    return <View style={styles.container}>
      <MapView
        annotations={[this.state.pin]}
        onRegionChangeComplete={this.onRegionChangeComplete}
        style={styles.map}>
      </MapView>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{this.state.city}</Text>
        <Text style={styles.text}>{this.state.temperature}</Text>
        <Text style={styles.text}>{this.state.description}</Text>
      </View>
    </View>
  },
  onRegionChangeComplete: function(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }

    });

    Api(region.latitude, region.longitude)
      .then((data) => {
        console.log(data);
        this.setState(data);
      })

  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 20
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('weatherspot', () => WeatherSpot);
