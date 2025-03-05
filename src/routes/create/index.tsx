import { createFileRoute } from "@tanstack/react-router";

import { CreateForm } from "~/components/CreateForm";

export const Route = createFileRoute("/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <header className="text-4xl font-medium">Create Lock</header>
      <CreateForm />
    </>
  );
}
