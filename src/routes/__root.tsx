/// <reference types="vite/client" />
import "@/assets/css/global.css";
import { DefaultCatchBoundary } from '@/components/layout/DefaultCatchBoundary';
import { NotFound } from '@/components/layout/NotFound';
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { ReactNode } from 'react';

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'TanStack Start Starter',
			},
		],
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang='en' data-theme="dark">
			<head>
				<HeadContent />
			</head>
			<body className='font-poppins bg-white text-black dark:bg-nightshade dark:text-sunflare'>
				{children}
				<TanStackRouterDevtools position="bottom-right" />
        {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
				<Scripts />
			</body>
		</html>
	);
}
