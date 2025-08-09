import { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { DefaultCatchBoundary } from './components/layout/DefaultCatchBoundary';
import { NotFound } from './components/layout/NotFound';
import { routeTree } from './routeTree.gen';
import { minutes } from './utils/timeUtils';

export function createRouter() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				// The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only.
				staleTime: minutes(5),
				// Queries that fail are silently retried 3 times, with exponential backoff delay
				retry: 3,
				refetchOnWindowFocus: false,
				// The duration until inactive queries will be removed from the cache and garbage collected.
				gcTime: minutes(10),
			},
		},
	});

	const router = createTanStackRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: 'intent',
		defaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: () => <NotFound />,
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	});
	return router;
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
