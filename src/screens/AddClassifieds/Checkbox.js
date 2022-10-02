import React from 'react';
import { Text } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { View } from 'react-native';

const Checkbox = ({ placeholder, value, setValue }) => {
    const [checked, setChecked] = React.useState(false);
  return (
    <View style={{flexDirection: 'row'}}>
      <CheckBox
            style={{backgroundColor: 'white'}}
            disabled={false}
            value={value}
            onValueChange={(newValue) => setValue(newValue)}
        />
        <Text style={{paddingTop: 8, paddingHorizontal: 10}}>{placeholder}</Text>
    </View>
  );
};

export default Checkbox;