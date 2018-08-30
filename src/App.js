import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import SignIn from './components/SignIn/SignIn'
import Registration from './components/Registration/Registration'
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
      box:{},
      route:'signin',
      isSignIn:false,
      user: {
        email:'',
        id:'',
        name:'',
        entries:0,
        joined: new Date()

      }
    }
  }

  /*
  componentDidMount() {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(console.log)
  }
  */
  
  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries:data.entries,
      joined: data.joined
    }})

  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
      }
  }
  
  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box:box})
  }

  onInputChange = (event) => {
      console.log(event.target.value)
      this.setState({input:event.target.value})
  }

  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
      app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
        .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route==='signout') {
      this.setState({isSignedIn: false})
    } else if (route==='home'){
      this.setState({isSignedIn:true})
    }
      this.setState({ route:route })
  }

  render() {
    return (
      <div className="App">
       <Particles className='particles'
              params={particlesOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' 
        ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange}
                             onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        : (this.state.route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : <Registration onRouteChange={this.onRouteChange}
                            loadUser={this.loadUser} />
          )
      }
      </div>
    );
  }
}

export default App;
