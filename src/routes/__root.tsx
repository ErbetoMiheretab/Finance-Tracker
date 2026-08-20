import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // Fixed import
import { createRootRoute, Outlet } from "@tanstack/react-router"; // Added Outlet
import { TanStackRouterDevtools } from "@tanstack/router-devtools"; // Removed typo duplicate
import { Layout } from "../components/Layout";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Outlet />
      </Layout>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
}