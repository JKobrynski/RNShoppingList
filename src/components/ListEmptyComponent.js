import React from 'react';
import {Content, Text} from 'native-base';

const ListEmptyComponent = ({text}) => {
  return (
    <Content
      contentContainerStyle={{
        alignItems: 'center',
        paddingVertical: 50,
      }}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 18,
          color: '#ff9f43',
        }}>
        {text}
      </Text>
    </Content>
  );
};

export default ListEmptyComponent;
