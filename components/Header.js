import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-dom';

function Header() {
  return (
     <View>
      <Text style={styles.baseText}>Header</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  baseText: {
    color: '#fff'
  },
});


export default Header;