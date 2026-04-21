import { Button } from "../components/ui/button";
import { createRoute } from "honox/factory";
import { Users } from "lucide-react";

export default createRoute((c) => {
  return c.render(
    <main className="min-h-screen flex flex-col p-10">
      <div className="bg-card flex flex-1 flex-col gap-2.5 items-center justify-center rounded-[50px]">
        <Users className="h-10 w-10" />
        <p>Create a Room To Start Sharing Your Screen!</p>
        <Button>Create Room</Button>
      </div>
    </main>,
    { title: "WebSS" },
  );
});
