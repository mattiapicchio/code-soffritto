import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/')({
	component: Home,
});

function Home() {
	return (
		<div>
			<h3>HOME</h3>
		</div>
	);
}
