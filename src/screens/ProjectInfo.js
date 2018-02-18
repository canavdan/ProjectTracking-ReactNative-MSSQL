import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ProgressCircle from 'react-native-progress-circle';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});

class ProjectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      catData: [],
      data: [],
      cols: [],
    };
    this.onPressButton = this.onPressButton.bind(this);
  }
  componentDidMount() {
    this.fetchData();
    this.fetchCategory();
  }
  onPressButton() {
       const { navigate } = this.props.navigation;
    navigate('SaleInfo', { saleId: this.state.data.saleId, pn: this.state.data.projectName });
  }
  convertDate(jsondate) {
    let shortDate = null;
    const regex = /-?\d+/;
    const matches = regex.exec(jsondate);
    const dt = new Date(parseInt(matches[0]));
    const month = dt.getMonth() + 1;
    const monthString = month > 9 ? month : `0${month}`;
    const day = dt.getDate();
    const dayString = day > 9 ? day : `0${day}`;
    const year = dt.getFullYear();
    shortDate = `${monthString}/${dayString}/${year}`;
    return shortDate;
  }

  fetchCategory() {
    const { params } = this.props.navigation.state;
    fetch(`http://192.168.0.11:56019/MobileMember/GetCategoryValues/${params.projectId}`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            catData: responseJson,
          },
          function () {
            const catData = this.state.catData;
            const col = [];
            if (catData.valueId != -1) {
              catData.forEach((x) => {
                col.push(
                  <View key={x.valueId} style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: 'rgba(255, 255, 255, 1)',
                        textAlign: 'center',
                        marginLeft: -80,
                      }}
                    >
                      {x.valueName}
                    </Text>
                    <ProgressCircle
                      percent={x.statu}
                      radius={55}
                      borderWidth={8}
                      color={'rgba(0, 122, 255, 1)'}
                      shadowColor="#999"
                      bgColor="#fff"
                    >
                      <Text style={{ fontSize: 25 }}>
                        {`${x.statu} %`}
                      </Text>
                    </ProgressCircle>
                  </View>,
                );
              });
              this.setState({ cols: col });
            }
          },
        );
      })
      .catch((error) => {
        alert(`${error} dasd`);
      });
  }
  fetchData() {
    const { params } = this.props.navigation.state;
    fetch(`http://192.168.0.11:56019/Member/GetProjectDetail/${params.projectId}`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        responseJson.startDate = this.convertDate(responseJson.startDate);
        if (responseJson.exceptedFinish != null) {
          responseJson.exceptedFinish = this.convertDate(responseJson.exceptedFinish);
        }
        if (responseJson.finishDate != null) {
          responseJson.finishDate = this.convertDate(responseJson.finishDate);
        }

        this.setState(
          {
            isLoading: false,
            data: responseJson,
          },
          () => {},
        );
      })
      .catch((error) => {
        alert(`${error} 111`);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ScrollView contentContainerStyle={{ flex: 1, marginTop: 0 }}>
          <View
            style={{
              marginTop: 0,
              flex: 1,
              backgroundColor: 'rgba(0, 27, 50, 1)',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1) ',
                textAlign: 'center',
                fontSize: 30,
              }}
            >
              Loading...
            </Text>
          </View>
        </ScrollView>
      );
    }
    const data = this.state.data;
    // data.percentStatu=data.percentStatu/100;
    const dataCat = this.state.cols;
    let a = false;
    if (dataCat.length > 0) a = true;

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
              height: 50,
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 1) ',
                  }}
                >
                  Total Percent:
                </Text>
              </View>
              <View style={{ flex: 3, marginTop: 5 }}>
                <Progress.Bar
                  progress={this.state.statu}
                  unfilledColor="rgba(255, 255, 255, 1)"
                  borderColor="rgba(255, 255, 255, 1)"
                />
              </View>
            </View>
          </View>
          {a
            ? <View
              style={{
                flex: 0,
                backgroundColor: 'rgba(0, 27, 50, 1)',
                height: 150,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                {dataCat}
              </View>
            </View>
            : <Text />}

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
              Managing Person:{' '}
              <Text>
                {' '}{'           '}
                {data.empFull}{' '}
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
             Receiver:{' '}
              <Text>
                {' '}{'                     '}
                {data.memberFull}{' '}
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
              Start Date: <Text> {data.startDate} </Text>
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
              Excepted Finish Date:{' '}
              <Text>
                {' '}{'      '}
                {data.exceptedFinish}{' '}
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
                {' '}{'             '}
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
              Other Info:{' '}
              <Text>
                {' '}{'        '}
                {data.extra}{' '}
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
            <TouchableHighlight onPress={this.onPressButton}>
              <View
                style={{
                  backgroundColor: '#4285f4',
                  height: 50,
                  alignItems: 'center',
                }}
              >
                <Text style={{ padding: 10, color: 'white', fontSize: 20 }}>Sale Info</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default ProjectInfo;
