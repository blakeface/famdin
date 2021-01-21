import React, {useReducer, useMemo} from 'react';
import {Pressable} from 'react-native';
import {string, func} from 'prop-types';
import {Text, Input} from '@ui-kitten/components';

// views
import inputData from '../../assets/data/input-data';
import AuthInput from './inputs';
import AuthMenu from './menu';

import styles from '../../assets/styles';

interface InputData {
  name: string;
  errorMessage?: string;
  placeholder?: string;
  autoCapitalize?: string;
}

function WelcomeForm(props: {mode: any}) {
  const inputs: InputData[] = useMemo(() => {
    switch (props.mode) {
      case 'verify':
        return [inputData.verify];
      case 're-verify':
        return [inputData.username, inputData.verify];
      case 'signup':
        return [inputData.username, inputData.password, inputData.phone];
      case 'login':
      default:
        return [inputData.username, inputData.password];
    }
  }, [props.mode]);

  // state = {
  //   username: '',
  //   password: '',
  //   phone: '',
  //   verify: '',
  //   errors: [],
  //   isExpanded: false,
  // };

  // handleError(err: any) {
  //   console.error('crap an error: ', err);
  // }
  //     this.setState({
  //       // remove non-digit characters from phone number
  //       [key]:
  //         key === 'phone'
  //           ? obj[key].trim().replace(/\D/g, '')
  //           : obj[key].trim(),
  //     });
  //   }
  // }

  // handleHomeIconPress() {
  //   this.setState((prevState) => {
  //     return {isExpanded: !prevState.isExpanded};
  //   });
  // }

  // validateInput(obj: {[x: string]: any}) {
  //   for (const key in obj) {
  //     const i = this.state.errors.indexOf(key);
  //     const val = obj[key];

  //     if (
  //       (key === 'username' && val.length === 0) ||
  //       (key === 'password' && val.length < 8) ||
  //       (key === 'phone' && val.length !== 10)
  //     ) {
  //       // add to errors
  //       if (i === -1) {
  //         this.setState((prevState) => {
  //           return {errors: [...prevState.errors, key]};
  //         });
  //       }
  //     } else {
  //       // remove from errors
  //       if (i > -1) {
  //         this.setState((prevState) => {
  //           return {
  //             errors: prevState.errors.filter((error: any) => error !== key),
  //           };
  //         });
  //       }
  //     }
  //   }
  // }

  // async handleSubmit() {
  //   // ERROR CHECK
  //   if (this.state.errors.length > 0) {
  //     return;
  //   }

  //   // SIGN UP
  //   if (props.mode == 'signup') {
  //     await Auth.signUp({
  //       username: this.state.username,
  //       password: this.state.password,
  //       attributes: {
  //         phone_number: `+1${this.state.phone}`, // E.164 number convention
  //       },
  //     })
  //       .then((data) => {
  //         console.log('signup success!', data);
  //         if (data.user) {
  //           props.setMessage(
  //             'Congrats! Expect a text message with your verification code 🥠',
  //           );
  //           props.onSubmit('verify');
  //         }
  //       })
  //       .catch((err) => {
  //         this.handleError(err);
  //         // user already exists
  //         props.setMessage(
  //           `Well crud... something bad happened: ${err.code}`,
  //         );
  //         props.onSubmit('login');
  //       });
  //   }

  //   // LOGIN
  //   else if (props.mode === 'login') {
  //     await Auth.signIn(this.state.username, this.state.password)
  //       .then((data) => {
  //         console.log('signIn success!', data);
  //       })
  //       .catch((err) => this.handleError(err));
  //   }

  //   // VERIFY
  //   else {
  //     await Auth.confirmSignUp(this.state.username, this.state.verify, {
  //       forceAliasCreation: true,
  //     })
  //       .then((data) => {
  //         console.log('verify success!', data);
  //       })
  //       .catch((err) => this.handleError(err));
  //   }
  // }

  // componentDidUpdate(prevProps: {mode: any}, prevState: any) {
  //   if (prevProps.mode !== props.mode) {
  //     this.updateInputs();
  //   }
  // }

  return (
    <>
      {inputs.map((input: InputData, i: number) => {
        return (
          <Input
            label={
              input.label ||
              input.name.replace(/\w/, (firstLetter) =>
                firstLetter.toUpperCase(),
              )
            }
          />
          // <AuthInput
          //   name={input.name}
          //   label={input.label}
          //   value={this.state[input.name]}
          //   returnKey={input.returnKey}
          //   keyboard={input.keyboard}
          //   textContent={input.textContent}
          //   placeholder={input.placeholder}
          //   autoFocus={input.autoFocus}
          //   autoCapitalize={input.autoCapitalize}
          //   hasError={
          //     input.hasError || this.state.errors.indexOf(input.name) > -1
          //   }
          //   errorMessage={input.errorMessage}
          //   key={i}
          // />
        );
      })}

      <Pressable onPress={this.handleSubmit} style={styles.formButtonPrimary}>
        <Text>Submit!</Text>
      </Pressable>

      {Boolean(props.mode !== 'verify') && (
        <Text onPress={() => props.onSubmit('re-verify')} style={styles.link}>
          Need to verify your account?
        </Text>
      )}

      {/* <AuthMenu handlePress={props.onSubmit} /> */}
    </>
  );
}

WelcomeForm.propTypes = {
  mode: string.isRequired,
  updateFormState: func.isRequired,
  setMessage: func.isRequired,
  onSubmit: func.isRequired,
};

export default WelcomeForm;