import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Separator, Icon} from 'native-base';

/**
 *
 * @typedef {Props}
 * @param {function} onPress
 * @param {boolean} showButton - weather to show "add" button or not
 */

/**
 *
 * @param {props} Props
 */
const ListHeaderComponent = ({onPress, showButton}) => {
  return (
    <Separator style={styles.separator}>
      <Text style={styles.label}>PRODUCTS</Text>
      {showButton && (
        <Icon
          type="FontAwesome"
          name="plus-circle"
          style={styles.icon}
          onPress={onPress}
        />
      )}
    </Separator>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginTop: 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 12,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#576574',
    fontSize: 14,
  },
  icon: {
    fontSize: 30,
    color: '#2e86de',
  },
});

export default ListHeaderComponent;
