import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { fetchPokemon } from '@/connectivity/api.pokemon/api.pokemon';
import { toggleTheme } from '@/signals/theme';
import { ROUTE_KEY } from '@/utils/routerUtils';

export const Route = createFileRoute(ROUTE_KEY.HOME)({
	component: Home,
});

function Home() {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchPokemon({ name: 'pikachu' });
				console.log('Fetched Pokémon:', result);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			<h1>HOME</h1>
			<button type='button' onClick={toggleTheme} className='cursor-pointer'>
				Toggle Theme
			</button>
		</div>
	);
}
