import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable:true,
        value_are:800
      }
    },
  }
}

const API_KEY = 'b6ead27a8df944ca878f85c0e51c4dce'
const app = new Clarifai.App({apiKey: API_KEY});

class App extends Component {
  constructor() {
    super()
    this.state ={
      input:'',
      imageUrl:'',
    }
  }
  
  onInputChange = (event) => {
      console.log(event.target.value)
      this.setState({input:event.target.value})
  }

  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
      app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
       <Particles className='particles'
              params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange}
                       onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
