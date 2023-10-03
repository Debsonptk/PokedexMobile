import { ParamListBase } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { PokemonScreen } from 'screens/PokemonScreen';
import { PokemonsScreen } from 'screens/PokemonsScreen';
import { PokemonType } from 'types/PokemonType';

export type RootStackParamsListType = {
  Pokemons: NativeStackScreenProps<ParamListBase>;
  Pokemon: {
    pokemon: PokemonType;
  };
};

const Stack = createNativeStackNavigator<RootStackParamsListType>();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Pokemons" component={PokemonsScreen} />
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
