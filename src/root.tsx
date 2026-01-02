import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider, useAuth } from "./lib/auth";
import Header from "./components/Header";
import { SidebarProvider } from "./components/ui/sidebar";
import CustomSidebar from "./components/CustomSideBar";
import LoadingPage from "./components/LoadingPage";

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

const queryClient = new QueryClient();

function App() {
  const { claims, loading } = useAuth();

  return loading ? (
    <LoadingPage />
  ) : (
    <SidebarProvider>
      {claims ? <CustomSidebar /> : <Header />}

      <div className="mx-auto mt-8 h-full min-h-[calc(100vh-64px)] w-full max-w-7xl px-8 antialiased">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
        <Toaster position="top-center" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
