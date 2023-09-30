import { memo } from 'react';
import { View, Text } from 'react-native';

interface ISomeProps {
  someProp: string;
}

const Component: React.FC<ISomeProps> = ({ someProp }) => (
  <View>
    <Text>{someProp}</Text>
  </View>
);

export default memo(Component);
