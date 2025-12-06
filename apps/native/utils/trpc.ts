import { authClient } from "@/lib/auth-client";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@my-better-t-app/api/routers/index";

export const queryClient = new QueryClient();

const trpcClient = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${process.env.EXPO_PUBLIC_SERVER_URL}/api/trpc`,
			headers() {
				const headers = new Map<string, string>();
				const cookies = authClient.getCookie();
				if (cookies) {
					headers.set("Cookie", cookies);
				}
				return Object.fromEntries(headers);
			},
		}),
	],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
	client: trpcClient,
	queryClient,
});
