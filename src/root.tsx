import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider, useAuth } from "./lib/auth";
import Header from "./components/header";
import { SidebarProvider } from "./components/ui/sidebar";
import CustomSidebar from "./components/customSideBar";

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

function App() {
  const { claims } = useAuth();

  return (
    <SidebarProvider>
      {claims ? <CustomSidebar /> : <Header />}

      <div className="mx-auto mt-16 h-full min-h-[calc(100vh-64px)] w-full max-w-7xl px-8 antialiased">
        <Outlet />
      </div>

      <Toaster position="top-center" />
    </SidebarProvider>
  );

}

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
