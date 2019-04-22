import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Tab extends React.PureComponent {
  render() {
    const {
      isSelected,
      tabIcon,
      tabName,
      onPress
    } = this.props;
    const color = isSelected ? '#EEE' : 'blue';
    const textStyles = {color, fontSize: 32, fontWeight: isSelected ? 'bold' : 'normal'};
    const containerStyles = {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isSelected ? 'blue' : '#EEE',
      padding: 12
    }
    return (
      <TouchableOpacity style={containerStyles} onPress={onPress}>
        <Ionicons name={tabIcon} size={50} color={color} style={{width: 66, textAlign: 'center'}} />
        <Text style={textStyles}>{tabName}</Text>
      </TouchableOpacity>
    )
  }
}

class LeftTabs extends React.PureComponent {
  render() {
    const {
      tabs,
      selectedTab,
      onTabPressed,
      width
    } = this.props;
    return (
      <SafeAreaView style={[styles.box, {width}]}>
        {
          tabs.map(({tabName, tabIcon}) => {
            return (
              <Tab
                onPress={() => onTabPressed(tabName)}
                key={tabName}
                tabName={tabName}
                tabIcon={tabIcon}
                isSelected={selectedTab === tabName} />
            )
          })
        }
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    flex: -1,
    minWidth: 140,
    backgroundColor: '#eee',
    height: '100%'
  },
});
export default LeftTabs;
