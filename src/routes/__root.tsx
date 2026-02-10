import { Header } from "@/components/Header";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "An app to drop and share your ideas easily.",
      },
      { title: "IdeaDrop - Your Ideas Hub" },
    ],
  }),

  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <HeadContent />
      <Header />
      <main className="flex justify-center p-6">
        <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
          <Outlet />
        </div>
      </main>
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">404</h1>
      <p className="mb-6 to-gray-600 text-lg">
        Ooops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      >
        Go back home
      </Link>
    </div>
  );
}
