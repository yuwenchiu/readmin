import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Button } from "@/components/ui/button";
import readminLogo from "./assets/readmin-logo.svg";
import { Toaster } from "./components/ui/sonner";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/logo-square-dark.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Readmin</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <>
      <nav className="fixed top-0 right-0 left-0 flex h-16 place-items-center justify-between px-8">
        <Link to="/">
          <img src={readminLogo} alt="readmin" className="max-h-8" />
        </Link>
        <section className="flex gap-x-2.5">
          <Link to="/login">
            <Button variant="secondary">Log in</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </section>
      </nav>

      <div className="mx-auto mt-16 h-full min-h-[calc(100vh-64px)] w-full max-w-7xl px-8 antialiased">
        <Outlet />
      </div>

      <Toaster position="top-center" />
    </>
  );
}
