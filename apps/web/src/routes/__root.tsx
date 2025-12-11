import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@twending/api/routers/index";
import { Provider } from "jotai";
import { useEffect, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { getThemeServerFn, type T as ThemePreference } from "@/lib/theme";

import appCss from "../index.css?url";

export interface RouterAppContext {
  trpc: TRPCOptionsProxy<AppRouter>;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  loader: async () => {
    const theme = await getThemeServerFn();
    return {
      theme,
    };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        href: "/android-chrome-512x512.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon-96x96.png",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Twending",
        description:
          "Twending is a new way to view trending repositories from github.",
        ogTitle: "Twending",
        ogDescription:
          "Twending is a new way to view trending repositories from github.",
        ogUrl: "https://twending.vercel.app",
        ogType: "website",
        ogLocale: "en_US",
        ogSiteName: "Twending",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  component: RootDocument,
});

function useResolvedTheme(preference: ThemePreference) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [resolved, setResolved] = useState<"light" | "dark">(
    preference === "system" ? "dark" : preference,
  );

  useEffect(() => {
    if (preference === "system") {
      setResolved(prefersDark ? "dark" : "light");
      return;
    }
    setResolved(preference);
  }, [preference, prefersDark]);

  return resolved;
}

function RootDocument() {
  const { theme } = Route.useLoaderData();
  const resolvedTheme = useResolvedTheme(theme);

  return (
    <Provider>
      <html
        lang="en"
        className={resolvedTheme === "dark" ? "dark" : undefined}
      >
        <head>
          <HeadContent />
        </head>
        <body>
          <main className="grid h-svh grid-rows-[auto_1fr]">
            <Outlet />
          </main>
          <TanStackRouterDevtools position="bottom-left" />
          <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
          <Scripts />
        </body>
      </html>
    </Provider>
  );
}
