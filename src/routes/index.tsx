import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "../components/Button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const navigate = useNavigate();
  return (
    <>
      <header className="text-4xl font-medium w-full">Welcome to Lock</header>
      <div className="flex flex-col gap-y-7.5 items-center w-full">
        <Button
          className="text-xl font-medium py-1.5 min-w-64"
          onClick={() => navigate({ to: "/search" })}
        >
          Search
        </Button>
        <Button
          className="text-xl font-medium py-1.5 min-w-64"
          onClick={() => navigate({ to: "/create" })}
        >
          Create
        </Button>
        <Button
          className="text-xl font-medium py-1.5 min-w-64"
          onClick={() => navigate({ to: "/locks" })}
        >
          View
        </Button>
      </div>
    </>
  );
}
