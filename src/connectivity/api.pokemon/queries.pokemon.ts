import { useQuery } from '@tanstack/react-query';
import {
	type FetchPokemonParams,
	fetchPokemon,
} from '@/connectivity/api.pokemon/api.pokemon';
import { QUERY_KEY } from '@/utils/queryKeys';

export const useQueryPokemon = ({ name, accessToken }: FetchPokemonParams) =>
	useQuery({
		queryKey: [QUERY_KEY.POKEMON, name],
		queryFn: () => fetchPokemon({ name, accessToken }),
	});
