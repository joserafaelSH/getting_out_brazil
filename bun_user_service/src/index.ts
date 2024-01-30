import { server } from "./http/server";

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
