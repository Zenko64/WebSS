import { Button } from "@/components/ui/button";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(
    <main className="relative min-h-screen w-full bg-brand-900">
      <div className="absolute inset-0 m-7 rounded-4xl bg-brand-800">
        <Button>Create Room</Button>
      </div>
    </main>,
    { title: "WebSS" }
  );
});
