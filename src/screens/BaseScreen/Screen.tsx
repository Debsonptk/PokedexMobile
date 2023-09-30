import { Text, View } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseScreenType = NativeStackScreenProps<any, any>;

const Screen: React.FC<BaseScreenType> = ({ route }) => {
  return (
    <View>
      <Text>{route.name}</Text>
    </View>
  );
};

export default Screen;
