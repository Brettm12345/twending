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

import appCss from "@/styles.css?url";

export interface RouterAppContext {
  trpc: TRPCOptionsProxy<AppRouter>;
  queryClient: QueryClient;
}

const posthogScript = `
!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init Xr es pi Zr rs Kr Qr capture Ni calculateEventProperties os register register_once register_for_session unregister unregister_for_session ds getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty us ns createPersonProfile hs Vr vs opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing ss debug O ls getPageViewId captureTraceFeedback captureTraceMetric qr".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('phc_dAam8kgQPVoA93AZYmMNBcknT1PXOmwseN1FA3fjGYG', {
      api_host: 'https://us.i.posthog.com',
      defaults: '2025-11-30',
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  })
`;
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
        property: "og:image",
        content: "/og.png",
        sizes: "1200x630",
        href: "/og.png",
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:title",
        content: "Twending",
      },
      {
        property: "og:description",
        content:
          "Twending is the best way to find new trending repositories on github.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Twending" },
      {
        name: "twitter:description",
        content:
          "Twending is the best way to find new trending repositories on github.",
      },
      { name: "twitter:image", content: "/og.png" },
      {
        property: "og:url",
        content: "https://twending.vercel.app",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "background-color",
        content: "#0A0A0A",
        media: "(prefers-color-scheme: dark)",
      },
      {
        property: "background-color",
        content: "#ffffff",
        media: "(prefers-color-scheme: light)",
      },
      {
        name: "theme-color",
        content: "#171717",
        media: "(prefers-color-scheme: dark)",
      },
      {
        name: "theme-color",
        content: "#fafafa",
        media: "(prefers-color-scheme: light)",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Twending",
        description:
          "Twending is the best way to find new trending repositories on github.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        purpose: "any maskable",
        href: "/android-chrome-maskable_512x512.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "128x128",
        purpose: "any maskable",
        href: "/android-chrome-maskable_128x128.png",
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
        rel: "manifest",
        href: "/site.webmanifest",
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
      <html lang="en" className={resolvedTheme === "dark" ? "dark" : undefined}>
        <script>{posthogScript}</script>
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
