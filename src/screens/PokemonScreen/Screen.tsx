import { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { ScrollView, Text, View } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { transparentize } from 'polished';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePokemon } from 'contexts/PokemonContext';
import { pokemonColors, unslugify } from 'helpers/index';
import { RootStackParamsListType } from 'routes/index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PokemonScreenType = NativeStackScreenProps<
  RootStackParamsListType,
  'Pokemon'
>;

const Screen: React.FC<PokemonScreenType> = ({ route, navigation }) => {
  const {
    fetchPokemon,
    setPokemon: setRequestPokemon,
    pokemon: requestPokemon,
    loading,
  } = usePokemon();
  const [pokemon, setPokemon] = useState(route.params.pokemon);
  const colors =
    pokemonColors?.[pokemon.color as keyof typeof pokemonColors] ||
    pokemonColors.black;

  useEffect(() => {
    fetchPokemon({
      variables: {
        name: route.params.pokemon.name,
      },
    });
    return () => {
      setRequestPokemon(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (requestPokemon) {
      // setPokemon(requestPokemon);
    }
  }, [requestPokemon]);

  return (
    <>
      <StatusBar
        style={pokemon.color === 'white' ? 'dark' : 'light'}
        animated
      />
      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <ScrollView>
          <View m={16}>
            <View flexDirection="row" justifyContent="space-between">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Entypo name="chevron-left" size={30} color={colors.name} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo name="heart-outlined" size={30} color={colors.name} />
              </TouchableOpacity>
            </View>
            <View
              flexDirection="row"
              justifyContent="space-between"
              mt={13}
              alignItems="center"
            >
              <Text color={colors.name} fontSize={36} lineHeight={40}>
                {unslugify(pokemon.name)}
              </Text>
              <Text color={colors.name} fontSize={18} fontWeight="$extrabold">
                {pokemon.pokedexIndex}
              </Text>
            </View>
            <View flexDirection="row" gap={7} mt={12}>
              {pokemon.types.map((type) => (
                <View
                  bg={transparentize(0.7)(colors.name)}
                  py={2}
                  px={12}
                  borderRadius="$full"
                  key={type}
                >
                  <Text color={colors.name}>{unslugify(type)}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Screen;
