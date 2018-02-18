import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { isLogin, setSessionTicket } from "../common/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    marginTop: -150,
  },
  button: {
    backgroundColor: '#4285f4',
    height: 50,
    alignItems: 'center',
  },
  buttonText: {
    padding: 10,
    color: 'white',
    fontSize: 20,
  },
  textInput: {
    height: 50,
  },
});

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 1,
      data: [],
      username: '',
      password: '',
      valid: false,
    };
    this.onPressButton = this.onPressButton.bind(this);
    this.onPressSMS = this.onPressSMS.bind(this);
    this.handleControl = this.handleControl.bind(this);
    this.onPressPassword = this.onPressPassword.bind(this);
  }
  onPressPassword() {
    if (this.state.valid) {
      const name = this.state.username;
      const pass = this.state.password;
      fetch('http://192.168.0.11:56019/MobileAuthentication/SendPass', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          password: pass,
        }),
      })
        .then(response => response.json())
        .then((responseJson) => {})
        .catch((error) => {
          console.error(error);
        });
      alert('Şifre Telefonunuza gönderilmiştir.');
    } else {
      alert('Kullanıcı adı hatalı');
    }
  }
  onPressSMS() {
    if (this.state.valid) {
      const name = this.state.username;
      const pass = this.state.password;
      fetch('http://192.168.0.11:56019/MobileAuthentication/SendSMS', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          password: pass,
        }),
      })
        .then(response => response.json())
        .then((responseJson) => {})
        .catch((error) => {
          console.error(error);
        });
      alert('SMS Telefonunuza gönderilmiştir.');
    } else {
      alert('Kullanıcı adı hatalı');
    }
  }
  onPressButton() {
    const { navigate } = this.props.navigation;
    const name = this.state.username;
    const pass = this.state.password;
    fetch('http://192.168.0.11:56019/MobileAuthentication/ControlLoginInfo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        password: pass,
      }),
    })
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.username !== 'hatali') {
         
          setSessionTicket(String(responseJson.memberId));
          navigate('Home', { memberId: responseJson.memberId });
          // Actions.home({ memberId: responseJson.memberId });
        } else alert('Wrong username or password');
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleControl(event) {
    const name = this.state.username;
    const pass = this.state.password;
    fetch('http://192.168.0.11:56019/MobileAuthentication/ControlUsername', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        password: pass,
      }),
    })
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.username != 'hatali') {
          this.setState({
            valid: true,
          });
        } else {
          this.setState({
            valid: false,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            value={this.state.data.username}
            onChangeText={value => this.setState({ username: value })}
            onBlur={this.handleControl}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            value={this.state.data.password}
            onChangeText={value => this.setState({ password: value })}
          />
        </View>

        <TouchableHighlight onPress={this.onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableHighlight>
        <Text />
        <Text />
        <TouchableHighlight onPress={this.onPressPassword}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Forget password</Text>
          </View>
        </TouchableHighlight>
        <Text />
        <Text />
        <TouchableHighlight onPress={this.onPressSMS}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Take SMS Info</Text>
          </View>
        </TouchableHighlight>
        <Text />
      </View>
    );
  }
}


