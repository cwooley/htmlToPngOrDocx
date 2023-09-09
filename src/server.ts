import App from "./app";
import { WEB_PORT, SIGTERM_GRACE_PERIOD } from "./conf/secrets";
const { createTerminus } = require("@godaddy/terminus");
const PORT = WEB_PORT || 3005;

module.exports = new Promise((resolve) => {
  const webhookServer = new App();
  return webhookServer.init().then(() => {
    const app = webhookServer.app;
    const server = app.listen(PORT, () => {
      console.log("Express server listening on port " + PORT);
    });

    async function onHealthCheck() {
      return new Date();
    }

    async function beforeShutdown() {
      console.log(`waiting ${SIGTERM_GRACE_PERIOD} seconds before shutdown.`);
      await new Promise((resolve) => {
        setTimeout(resolve, SIGTERM_GRACE_PERIOD);
      });
    }

    createTerminus(server, {
      signal: "SIGTERM",
      healthChecks: { "/ping": onHealthCheck },
      // onSignal,
      beforeShutdown
    });

    return resolve({
      app,
      server
    });
  });
});
