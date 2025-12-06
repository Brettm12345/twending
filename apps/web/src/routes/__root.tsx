import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

import type {QueryClient} from '@tanstack/react-query'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import appCss from '../index.css?url'

import {getThemeServerFn} from '@/lib/theme'
import type {TRPCOptionsProxy} from '@trpc/tanstack-react-query'
import type {AppRouter} from '@twending/api/routers/index'
import {Provider} from 'jotai'
export interface RouterAppContext {
  trpc: TRPCOptionsProxy<AppRouter>
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  loader: async () => {
    const theme = await getThemeServerFn()
    return {
      theme,
    }
  },
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
        title: 'My App',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: RootDocument,
})

function RootDocument() {
  const {theme} = Route.useLoaderData()
  return (
    <Provider>
      <html lang="en" className={theme}>
        <head>
          <HeadContent />
        </head>
        <body>
          <div className="grid h-svh grid-rows-[auto_1fr] bg-background antialiased">
            <Outlet />
          </div>
          <TanStackRouterDevtools position="bottom-left" />
          <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
          <Scripts />
        </body>
      </html>
    </Provider>
  )
}
