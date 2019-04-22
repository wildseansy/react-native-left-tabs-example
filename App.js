import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import {NavigationEvents, createSwitchNavigator, createAppContainer, NavigationActions} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import LeftTabs from './LeftTabs';

const sharedStyles = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
};
const Home = ({screenProps}) => {
  return (
    <View style={[sharedStyles, {backgroundColor: '#3BC'}]}>
      <NavigationEvents onDidFocus={screenProps.onDidFocus} />
      <Ionicons name='ios-planet' size={230} color='pink' />
    </View>
  );
}

const Places = ({navigation, screenProps}) => {
  return (
    <View style={[sharedStyles, {backgroundColor: '#81A'}]}>
      <NavigationEvents onDidFocus={screenProps.onDidFocus} />
      <Ionicons name='ios-pin' size={230} color='red' />
      <TouchableHighlight onPress={() => navigation.navigate('Home')}>
        <Text style={{color: 'red', fontSize: 60}}>Go Home</Text>
      </TouchableHighlight>
    </View>
  );
}
const People = ({screenProps}) => {
  return (
    <View style={[sharedStyles, {backgroundColor: '#A53'}]}>
      <NavigationEvents onDidFocus={screenProps.onDidFocus} />
      <Ionicons name='ios-contacts' size={230} color='blue' />
    </View>
  );
}
const Me = ({screenProps}) => {
  return (
    <View style={[sharedStyles, {backgroundColor: '#FAA'}]}>
      <NavigationEvents onDidFocus={screenProps.onDidFocus} />
      <Ionicons name='ios-contact' size={230} color='purple' />
    </View>
  );
}

const AppContent = createSwitchNavigator(
  {
    'Home': {
      screen: Home,
    },
    'Places': {
      screen: Places
    },
    'People': {
      screen: People
    },
    'Me': {
      screen: Me
    }
  },
  {
    resetOnBlur: false
  }
);
class App extends React.PureComponent {
  static router = AppContent.router;
  constructor() {
    super();
    this.state = {
      selectedTab: 'Home'
    }
  }
  onTabPressed = (routeName) => {
    this.props.navigation.navigate({routeName});
  }
  handleNavChange = ({action}) => {
    if (action.type === NavigationActions.NAVIGATE) {
      this.setState({
        selectedTab: action.routeName
      });
    }
  }
  render() {
    const {
      navigation
    } = this.props;
    const tabs = [
      {
        tabName: 'Home',
        tabIcon: 'ios-planet'
      },
      {
        tabName: 'Places',
        tabIcon: 'ios-pin'
      },
      {
        tabName: 'People',
        tabIcon: 'ios-contacts'
      },
      {
        tabName: 'Me',
        tabIcon: 'ios-contact'
      }
    ]
    return (
      <View style={styles.box}>
        <LeftTabs
          width={'25%'}
          tabs={tabs}
          onTabPressed={this.onTabPressed}
          selectedTab={this.state.selectedTab}/>
        <View style={styles.content}>
          <AppContent
            navigation={navigation}
            screenProps={{onDidFocus: this.handleNavChange}}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1
  }
});
export default createAppContainer(App)
