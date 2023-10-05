import { useEffect, useMemo, useState } from 'react';
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import {
  Icon,
  Image,
  Progress,
  ProgressFilledTrack,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { transparentize } from 'polished';
import { Dimensions, TouchableOpacity } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { calcFeaturesTotal } from 'contexts/helpers';
import { usePokemon } from 'contexts/PokemonContext';
import { pokemonColors, unslugify } from 'helpers/index';
import { RootStackParamsListType } from 'routes/index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PokemonScreenType = NativeStackScreenProps<
  RootStackParamsListType,
  'Pokemon'
>;

const imageWidth = Dimensions.get('screen').width * 0.5;

const Screen: React.FC<PokemonScreenType> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    fetchPokemon,
    setPokemon: setRequestPokemon,
    pokemon: requestPokemon,
  } = usePokemon();
  const [pokemon, setPokemon] = useState(route.params.pokemon);
  const colors =
    pokemonColors?.[pokemon.color as keyof typeof pokemonColors] ||
    pokemonColors.black;

  const total = useMemo(
    () => (pokemon.stats ? calcFeaturesTotal(pokemon.stats) : 0),
    [pokemon.stats],
  );

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
      setPokemon(requestPokemon);
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
          <View m={20}>
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
          <Image
            source={{ uri: pokemon.image }}
            h={imageWidth}
            w={imageWidth}
            alt={pokemon.name}
            alignSelf="center"
            zIndex={2}
          />
          <View
            pb={Math.max(insets.bottom, 20)}
            bg="white"
            px={20}
            pt={imageWidth * 0.3}
            mt={-imageWidth * 0.3}
            borderTopLeftRadius={28}
            borderTopRightRadius={28}
          >
            <Text fontSize={20} bold color={colors.background}>
              Description
            </Text>
            {!pokemon.move ? (
              <View>
                <LottieView // eslint-disable-next-line global-require
                  source={require('../../assets/animations/squirtleLoading.json')}
                  style={{ width: '100%' }}
                  autoPlay
                />
              </View>
            ) : (
              <>
                <Text fontSize={14} mt={40}>
                  {pokemon.description}
                </Text>
                <View mt={32} flexDirection="row">
                  <View
                    alignItems="center"
                    borderRightWidth={1}
                    borderRightColor="$coolgray200"
                    flex={1}
                    px={12}
                    justifyContent="center"
                  >
                    <View flexDirection="row" alignItems="center">
                      <Icon as={FontAwesome5} name="weight" size={16} mr={8} />
                      <Text fontSize={14} fontWeight="$medium">
                        {pokemon.weight} kg
                      </Text>
                    </View>
                    <Text fontSize={10}>Weight</Text>
                  </View>
                  <View
                    alignItems="center"
                    borderRightWidth={1}
                    borderRightColor="$coolgray200"
                    flex={1}
                    px={12}
                    justifyContent="center"
                  >
                    <View flexDirection="row" alignItems="center">
                      <Icon
                        as={FontAwesome5}
                        name="ruler-vertical"
                        size={16}
                        mr={8}
                      />
                      <Text fontSize={14} fontWeight="$medium">
                        {pokemon.height} kg
                      </Text>
                    </View>
                    <Text fontSize={10}>Height</Text>
                  </View>
                  <View
                    alignItems="center"
                    flex={1}
                    justifyContent="center"
                    px={12}
                  >
                    <Text fontSize={14} fontWeight="$medium" textAlign="center">
                      {pokemon.move ? unslugify(pokemon.move) : 'no move'}
                    </Text>
                    <Text fontSize={10}>Move</Text>
                  </View>
                </View>
                <View mt={30}>
                  <Text fontSize={16} fontWeight="$medium">
                    Feature:
                  </Text>
                  <View flexDirection="row" mt={16}>
                    <View w={140}>
                      <Text
                        fontSize={14}
                        fontWeight="$medium"
                        allowFontScaling={false}
                      >
                        Gender
                      </Text>
                    </View>
                    <View flexDirection="row" flex={1}>
                      <View flexDirection="row" mr={12} alignItems="center">
                        <Icon
                          as={Ionicons}
                          name="male"
                          size={15}
                          mr={4}
                          color="$blue500"
                        />
                        <Text
                          fontSize={14}
                          fontWeight="bold"
                          allowFontScaling={false}
                        >
                          {pokemon?.gender?.m}%
                        </Text>
                      </View>
                      <View flexDirection="row" mr={12} alignItems="center">
                        <Icon
                          as={Ionicons}
                          name="female"
                          mr={4}
                          size={15}
                          color="$pink500"
                        />
                        <Text
                          fontSize={14}
                          fontWeight="bold"
                          allowFontScaling={false}
                        >
                          {pokemon?.gender?.f}%
                        </Text>
                      </View>
                    </View>
                  </View>
                  {pokemon.stats?.map((stat) => (
                    <View flexDirection="row" mt={14} key={stat.name}>
                      <View w={100}>
                        <Text
                          fontSize={14}
                          fontWeight="$medium"
                          allowFontScaling={false}
                        >
                          {stat.name}
                        </Text>
                      </View>
                      <View w={30} mx={5}>
                        <Text fontSize={14} allowFontScaling={false}>
                          {stat.value}
                        </Text>
                      </View>
                      <View flex={1} justifyContent="center">
                        <Progress value={stat.value} w="$full" h={3} max={120}>
                          <ProgressFilledTrack
                            h={3}
                            bgColor={stat.value < 60 ? '$red600' : '$green600'}
                          />
                        </Progress>
                      </View>
                    </View>
                  ))}
                  <View flexDirection="row" mt={14}>
                    <View w={100}>
                      <Text
                        fontSize={14}
                        fontWeight="$medium"
                        allowFontScaling={false}
                      >
                        Total:
                      </Text>
                    </View>
                    <View w={30} mx={5}>
                      <Text fontSize={14} allowFontScaling={false}>
                        {total}
                      </Text>
                    </View>
                    <View flex={1} justifyContent="center">
                      <Progress value={total} w="$full" h={3} max={720}>
                        <ProgressFilledTrack
                          h={3}
                          bgColor={total < 360 ? '$red600' : '$green600'}
                        />
                      </Progress>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Screen;
