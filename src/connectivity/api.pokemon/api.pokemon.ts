import { fetchRequest } from '../fetchRequest';
import { getRequestConfig } from '../getRequestConfig';
import type { PokemonResponse } from './types.pokemon';

interface FetchPokemonParams {
	accessToken?: string;
	name: 'pikachu' | 'blastoise' | 'scizor' | 'luxray' | 'ditto';
}

export async function fetchPokemon({ name, accessToken }: FetchPokemonParams) {
	const config = getRequestConfig({
		method: 'GET',
		accessToken,
	});

	const url = `/pokemon/${name}`;

	return await fetchRequest<PokemonResponse>(url, config);
}
