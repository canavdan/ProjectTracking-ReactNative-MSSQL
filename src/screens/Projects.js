import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MenuBar from '../component/MenuBar';
import ProgressCircle from 'react-native-progress-circle';
import { isLogin, getSessim } from '../common/index';
export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      putData: [],
      myKey: null,
    };
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.navigation.navigate('DrawerOpen');
  }
  static navigationOptions = {
    tabBarLabel: 'Projects',
    drawerIcon: ({ tintColor }) => {
      return (
        <View>
          <Icon
            size={25}
            raised
            name="th"
            type="font-awesome"
            color="#444d56"
            style={{ backgroundColor: tintColor }}
          />
        </View>
      );
    },
  };
  onPressButton(data, x) {
    const { navigate } = this.props.navigation;
    //Actions.detay({ projectId: x.projectId });
    navigate('ProjectInfo', { projectId: x.projectId });
  }
  convertDate(jsondate) {
    var shortDate = null;
    var regex = /-?\d+/;
    var matches = regex.exec(jsondate);
    var dt = new Date(parseInt(matches[0]));
    var month = dt.getMonth() + 1;
    var monthString = month > 9 ? month : '0' + month;
    var day = dt.getDate();
    var dayString = day > 9 ? day : '0' + day;
    var year = dt.getFullYear();
    shortDate = monthString + '/' + dayString + '/' + year;
    return shortDate;
  }
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { params } = this.props.navigation.state;
    a = this.convertDate;
    fetch(
      'http://192.168.0.11:56019/MobileMember/GetProject/' +
        (await AsyncStorage.getItem('session_ticket')),
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            data: responseJson,
          },
          function() {
            let stat = true;
            const data = this.state.data;
            const col = [];
            data.forEach(x => {
              if (x.statuName === 'Bitti') stat = false;
              else stat = true;
              if (x.exceptedFinish != null) x.exceptedFinish = a(x.exceptedFinish);
              if (x.finishDate != null) x.finishDate = a(x.finishDate);
              col.push(
                <TouchableHighlight
                  data={x.projectId}
                  key={x.projectId}
                  onPress={this.onPressButton.bind(this, data, x)}
                >
                  <View
                    key={x.projectId}
                    onPress={this.onPressButton}
                    style={{
                      flexDirection: 'column',
                      backgroundColor: 'rgba(0, 27, 50, 1)',
                      height: 200,
                    }}
                  >
                    <Text
                      style={{
                        color: 'rgba(255, 255, 255, 1) ',
                        fontSize: 25,
                        textAlign: 'center',
                      }}
                    >
                      {x.projectName}
                    </Text>
                    <View
                      style={{
                        height: 170,
                        flexDirection: 'row',
                        backgroundColor: 'steelblue',
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: 'rgba(255, 255, 255, 1) ',
                            fontSize: 15,
                            textAlign: 'center',
                          }}
                        >
                          Project's Statu
                        </Text>
                        <View style={{ marginLeft: 5 }}>
                          <ProgressCircle
                            percent={x.percentStatu}
                            radius={70}
                            borderWidth={8}
                            color={'rgba(0, 122, 255, 1)'}
                            shadowColor="#999"
                            bgColor="#fff"
                          >
                            <Text style={{ fontSize: 18 }}>
                              {`${x.percentStatu} %`}
                            </Text>
                          </ProgressCircle>
                        </View>
                      </View>
                      <View style={{ flex: 2 }}>
                        <Text
                          style={{
                            color: 'rgba(255, 255, 255, 1) ',
                            fontSize: 15,
                            textAlign: 'center',
                            padding: 5,
                          }}
                        >
                          Details:
                        </Text>
                        <Text
                          style={{
                            color: 'rgba(255, 255, 255, 1) ',
                            marginLeft: 30,
                          }}
                        >
                          Managing Person:<Text
                            style={{
                              color: 'rgba(255, 255, 255, 1) ',
                            }}
                          >
                            {x.employeeFull}
                          </Text>
                        </Text>
                        <Text />
                        {stat
                          ? <Text
                              style={{
                                color: 'rgba(255, 255, 255, 1) ',
                                marginLeft: 30,
                              }}
                            >
                              Excepted Finish Date:<Text
                                style={{
                                  color: 'rgba(255, 255, 255, 1) ',
                                }}
                              >
                                {x.exceptedFinish}
                              </Text>
                            </Text>
                          : <Text
                              style={{
                                color: 'rgba(255, 255, 255, 1) ',
                                marginLeft: 30,
                              }}
                            >
                             Finish Date:<Text
                                style={{
                                  color: 'rgba(255, 255, 255, 1) ',
                                }}
                              >
                                {x.finishDate}
                              </Text>
                            </Text>}

                        <Text />
                        <Text
                          style={{
                            color: 'rgba(255, 255, 255, 1) ',
                            marginLeft: 30,
                          }}
                        >
                          Statu:<Text
                            style={{
                              color: 'rgba(255, 255, 255, 1) ',
                            }}
                          >
                            {x.statuName}
                          </Text>
                        </Text>
                        <Text />
                        <Text
                          style={{
                            color: 'rgba(255, 255, 255, 1) ',
                            marginLeft: 30,
                          }}
                        >
                          Description:<Text
                            style={{
                              color: 'rgba(255, 255, 255, 1) ',
                            }}
                          >
                            {x.description}
                          </Text>
                        </Text>
                        <Text />
                        <Text
                          style={{
                            color: 'rgba(255, 255, 255, 1) ',
                            marginLeft: 30,
                          }}
                        >
                          Category:<Text
                            style={{
                              color: 'rgba(255, 255, 255, 1) ',
                            }}
                          >
                            {x.categoryName}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>,
              );
            });
            this.setState({ putData: col });
          },
        );
      })
      .catch(error => {
        alert(error);
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
                fontSize: 20,
              }}
            >
              Loading...
            </Text>
          </View>
        </ScrollView>
      );
    } else {
      const data = this.state.putData;
      return (
        <ScrollView contentContainerStyle={{ flex: 1, marginTop: 0 }}>
          <MenuBar onP={this.handlePress} />
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 27, 50, 1)',
            }}
          >
            {data}
          </View>
        </ScrollView>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

AppRegistry.registerComponent('native1', () => Projects);
