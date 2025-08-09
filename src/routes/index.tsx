import { ROUTE_KEY } from '@/utils/routerUtils';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute(ROUTE_KEY.HOME)({
	component: Home,
});

function Home() {
	return (
		<div>
			<h1>HOME</h1>
		</div>
	);
}
