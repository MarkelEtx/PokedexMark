import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Pokemons from './Components/Pokemons';
const appNavigator = createStackNavigator(
  {
    PokedexMark: {
      screen: Pokemons,
    },

  },
  {
    initialRouteName: 'PokedexMark',
  },
);

const AppContainer = createAppContainer(appNavigator);

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;