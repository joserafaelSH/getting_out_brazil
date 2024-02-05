import { server } from "./http/server";

server.listen(3000, () => {
  console.log("server is on port 3000");
});
