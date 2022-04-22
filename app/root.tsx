import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Outlet } from "@remix-run/react";

import globalStyles from "./styles/global.css";
import globalMDStyles from "./styles/global-medium.css";
import globalLGStyles from "./styles/global-large.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: globalStyles,
  },
  {
    rel: "stylesheet",
    href: globalMDStyles,
    media: "print, (min-width: 640px)",
  },
  {
    rel: "stylesheet",
    href: globalLGStyles,
    media: "screen and (min-width: 1024px)",
  },
];

const App = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Remix Jokes App</title>

      <Links />
    </head>

    <body>
      <Outlet />
      <LiveReload />
    </body>
  </html>
);

export default App;
