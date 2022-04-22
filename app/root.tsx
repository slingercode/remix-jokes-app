import { LiveReload, Outlet } from "@remix-run/react";

const App = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Remix Jokes App</title>
    </head>

    <body>
      <Outlet />
      <LiveReload />
    </body>
  </html>
);

export default App;
