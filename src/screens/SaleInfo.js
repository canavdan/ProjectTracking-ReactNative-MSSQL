import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, TouchableHighlight } from 'react-native';

class SaleInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    };
  }
  convertDate(jsondate) {
    let shortDate = null;
    const regex = /-?\d+/;
    const matches = regex.exec(jsondate);
    const dt = new Date(parseInt(matches[0]));
    const month = dt.getMonth() + 1;
    const monthString = month > 9 ? month : `0${ month}`;
    const day = dt.getDate();
    const dayString = day > 9 ? day : `0${day}`;
    const year = dt.getFullYear();
    shortDate = `${monthString }/${dayString}/${ year}`;
    return shortDate;
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const { params } = this.props.navigation.state;
    fetch(`http://192.168.0.11:56019/Member/GetSale/${params.saleId}`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        responseJson.dateSell = this.convertDate(responseJson.dateSell);
        this.setState(
          {
            isLoading: false,
            data: responseJson,
          },
          () => {},
        );
      })
      .catch((error) => {
        alert(`${error } 111`);
      });
  }
  render() {
    const data = this.state.data;
    const PN = this.props.pn;
    if (this.state.isLoading) {
      return (
        <ScrollView contentContainerStyle={{ flex: 1, marginTop: 0 }}>
          <View
            style={{
              marginTop: 0,
              flex: 1,
              backgroundColor: 'rgba(0, 27, 50, 1)',
            }}
          >
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1) ',
                textAlign: 'center',
                fontSize: 20,
              }}
            >
              Loading...
            </Text>
          </View>
        </ScrollView>
      );
    }
    return (
      <ScrollView contentContainerStyle={{ flex: 1, marginTop: 0 }}>
        <View
          style={{
            marginTop: 0,
            flex: 1,
            backgroundColor: 'rgba(0, 27, 50, 1)',
          }}
        >
          <View style={{ flex: 0, backgroundColor: 'rgba(0, 27, 50, 1)' }}>
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1) ',
                fontSize: 25,
                textAlign: 'center',
              }}
            >
              {data.projectName}
            </Text>
          </View>
          <View
            style={{
              flex: 0,
              backgroundColor: 'rgba(0, 27, 50, 1)',
              height: 40,
            }}
          >
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1) ',
              }}
            >
                Receiver:{' '}
              <Text>
                {' '}{'                      '}
                {data.fullName}{' '}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flex: 0,
              backgroundColor: 'rgba(0, 27, 50, 1)',
              height: 40,
            }}
          >
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1) ',
              }}
            >
                Price:{' '}
              <Text>
                {' '}{'                     '}
                {data.price}{' '}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flex: 0,
              backgroundColor: 'rgba(0, 27, 50, 1)',
              height: 40,
            }}
          >
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1) ',
              }}
            >
                Sale Date:{' '}
              <Text>
                {' '}{'          '}
                {data.dateSell}{' '}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flex: 0,
              backgroundColor: 'rgba(0, 27, 50, 1)',
              height: 40,
            }}
          >
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1) ',
              }}
            >
                Installment:{' '}
              <Text>
                {' '}{'        '}
                {data.hirepurchase}{' '}
              </Text>
            </Text>
          </View>

          <View
            style={{
              flex: 0,
              backgroundColor: 'rgba(0, 27, 50, 1)',
              height: 40,
            }}
          >
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1) ',
              }}
            >
                Description:{' '}
              <Text>
                {' '}{'              '}
                {data.description}{' '}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flex: 0,
              backgroundColor: 'rgba(0, 27, 50, 1)',
              height: 40,
            }}
          >
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1) ',
              }}
            >
                Tax Number:{' '}
              <Text>
                {' '}{'    '}
                {data.taxno}{' '}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default SaleInfo;
