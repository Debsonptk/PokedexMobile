import { API_BASE_URL, API_SPRITES_BASE_URL } from '@env';

export const Config = {
  beseUrl: API_BASE_URL || 'https://beta.pokeapi.co/graphql/v1beta',
  spritesBaseUrl:
    API_SPRITES_BASE_URL ||
    'https://raw.githubusercontent.com/PokeAPI/sprites/master',
};
