import { useCallback, useEffect } from 'react';
import { Image, Text, View } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, ImageBackground } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Background from 'assets/background.png';
import Profile from 'assets/profile.png';
import { usePokemon } from 'contexts/PokemonContext';
import { RootStackParamsListType } from 'routes/index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseScreenType = NativeStackScreenProps<
  RootStackParamsListType,
  'Pokemons'
>;

const Screen: React.FC<BaseScreenType> = () => {
  const { fetchPokemons, pokemons } = usePokemon();
  const insets = useSafeAreaInsets();

  const Header = useCallback(
    () => (
      <View my={40}>
        <Text fontSize={24} bold lineHeight={31.2}>
          Qual Pokémon você escolhe?
        </Text>
      </View>
    ),
    [],
  );

  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView edges={['left', 'right']} style={{ flex: 1 }}>
      <View
        flexDirection="row"
        bgColor="$trueGray500"
        borderBottomEndRadius={24}
        borderBottomStartRadius={24}
        alignItems="flex-end"
      >
        <View flex={1} mb={48} ml={22}>
          <Text fontSize={20} color="$white">
            Olá,{' '}
            <Text fontSize={20} bold color="$white">
              Ash Ketchum
            </Text>
          </Text>
          <Text color="white">Bem Vindo!😄</Text>
        </View>
        <ImageBackground
          source={Background}
          resizeMode="cover"
          style={{
            width: 147,
            height: 147,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: insets.top * 0.4,
          }}
        >
          <Image source={Profile} alt="Profile" w={47} h={47} ml={20} mt={12} />
        </ImageBackground>
      </View>
      <FlatList
        ListHeaderComponent={Header}
        contentContainerStyle={{ marginHorizontal: 16 }}
        numColumns={2}
        data={pokemons}
        renderItem={({ item }) => <Text flex={1}>{item.name}</Text>}
      />
    </SafeAreaView>
  );
};

export default Screen;
