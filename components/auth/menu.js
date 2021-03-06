import React, { Fragment, Component } from 'react'
import {
	View,
	Text,
	TouchableWithoutFeedback,
	Image,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../assets/styles'

class AuthMenu extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isExpanded: false,
		}

		this.handlePress = this.handlePress.bind(this)
	}

	handlePress() {
		this.setState( prevState => {
			return { isExpanded: ! prevState.isExpanded }
		})
	}

	render() {
		return (
			<Fragment>
				<View
	        style={ [styles.homeMenu, {width: this.state.isExpanded ? '87%' : 58 }] }
	      >
	        <Text
	          style={ styles.homeMenuText }
	          onPress={ () => this.props.handlePress({ mode: null }) }
	        >
	          { this.state.isExpanded ? 'Go Home!' : '' }
	        </Text>
	      </View>

	      <TouchableWithoutFeedback
	        accessibilityLabel='hamburger menu'
	        accessibilityRole='button'
	        accessible={ true }
	        onPress={ this.handlePress }
	      >
	        <Image
	          source={ require('../../assets/images/rice-icon.png') }
	          style={ styles.homeIcon }
	        />
	      </TouchableWithoutFeedback>
			</Fragment>
		)
	}
}

AuthMenu.propTypes = {
	handlePress: PropTypes.func.isRequired,
}

export default AuthMenu



