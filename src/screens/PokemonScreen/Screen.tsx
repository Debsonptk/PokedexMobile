import { useEffect } from 'react';
import { Text } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePokemon } from 'contexts/PokemonContext';
import { RootStackParamsListType } from 'routes/index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PokemonScreenType = NativeStackScreenProps<
  RootStackParamsListType,
  'Pokemon'
>;

const Screen: React.FC<PokemonScreenType> = ({ route }) => {
  const { fetchPokemon } = usePokemon();

  useEffect(() => {
    fetchPokemon({
      variables: {
        name: route.params.name,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView>
      <Text>{route.params.name}</Text>
    </SafeAreaView>
  );
};

export default Screen;
