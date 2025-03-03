import { createFileRoute } from "@tanstack/react-router";

import { CreateForm } from "../components/CreateForm";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center h-full space-y-12 py-18 px-2.5">
        <header className="text-4xl font-medium">Create Lock</header>
        <div className="space-y-7.5 w-full">
          <CreateForm />
        </div>
      </div>
    </div>
  );
}
