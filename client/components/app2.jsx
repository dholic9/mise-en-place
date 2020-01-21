import React from 'react';
import { Bar } from './bar';
const ThemeContext = React.createContext('green');

class App2 extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value = "black">
        <Bar/>
      </ThemeContext.Provider>
    );
  }
}
