import React, { Component } from 'react'
import { View } from 'react-native'
import { Font } from 'expo'

// views
import AuthView from './components/auth/view'
import Main from './components/main'

// AWS Amplify
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from './aws-exports'
Amplify.configure(aws_exports)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedin: false,
      username: '',
      fontLoaded: false,
    }

    // bind methods
    this.updateAppState = this.updateAppState.bind(this)
  }

  async componentDidMount() {
    // is user already logged in?
    await Auth.currentAuthenticatedUser()
      .then(user => this.setState({ loggedin: true }))
      .catch(err => this.setState({ loggedin: false }))

    // load fonts
    await Font.loadAsync({
      'traveling-typewriter': require('./assets/fonts/TravelingTypewriter.ttf'),
    })
    this.setState({ fontLoaded: true })
  }

  updateAppState(obj) {
    for (key in obj) {
      this.setState({ [key]: obj[key] })
    }
  }

  render() {
    return (
      this.state.fontLoaded ? (
        this.state.loggedin
          ? <Main />
          : <AuthView
              signedup={ this.state.signedup }
              verified={ this.state.verified }
              updateAppState={ this.updateAppState }
            />
      ) : null
    )
  }
}