import { createFileRoute } from '@tanstack/react-router';
import { useQueryPokemon } from '@/connectivity/api.pokemon/queries.pokemon';
import { toggleTheme } from '@/signals/theme';
import { ROUTE_KEY } from '@/utils/routerUtils';

export const Route = createFileRoute(ROUTE_KEY.HOME)({
	component: Home,
});

function Home() {
	const {
		data: pokemon,
		error,
		isLoading,
	} = useQueryPokemon({
		name: 'ditto',
	});

	return (
		<div>
			<h1>HOME</h1>
			<button type='button' onClick={toggleTheme} className='cursor-pointer'>
				Toggle Theme
			</button>
			<div>
				{isLoading && <p>Fetching...</p>}
				{error && <p className='text-orange'>Error: {error.message}</p>}
				{pokemon && <span>{pokemon.name}</span>}
			</div>
		</div>
	);
}
