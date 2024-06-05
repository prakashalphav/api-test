import Pusher from "pusher-js/worker";

const pusherWorker = (() => {

  
// An array of the clients/tabs using this worker
const clients = [];

let pusherInstance = null;
let privateChannelName = null;
// This variable will hold the shared data
let pusherConfig = null;
let sharedData = null;
self.addEventListener("connect", function (evt) {
  // Add the port to the list of connected clients
  const port = evt.ports[0];
  clients.push(port);

  // Start the worker.
  port.start();

  // Handle incoming messages
  port.onmessage = function (event) {
    // Check the type of message
    if (event.data.action === "getData") {
      // Respond with the shared data
      port.postMessage({ type: "pusherConfig", payload: pusherConfig });
    } else if (
      event.data.action === "setData" &&
      event.data.type === "pusherConfig"
    ) {
      // Update the shared data when a new value is received
      pusherConfig = event.data.payload;

      const connectPrivateChannel = (_pusherInstance) => {
        privateChannelName = `private-notification-${pusherConfig.playerChannelId}`;

        port.postMessage({
          type: "msg",
          payload:
            "pusher worker : Subscribe to private channel" +
            `privateChannelName : ${privateChannelName}`,
        });


        // Subscribe to private channel
        const channelPrivate = _pusherInstance.subscribe(privateChannelName);

        // Bind to my event
        channelPrivate.bind("App\\Events\\NewNotification", onReceiveEvent);

        port.postMessage({
          type: "msg",
          payload:
            "pusher worker : Subscribe to private channel END" +
            `privateChannelName : ${privateChannelName}`,
        });
      };
      const createPusherInstance = () => {
        port.postMessage({ type: "msg", payload: "pusher worker :Create" });
        // Connect to Pusher
        const _pusherInstance = new Pusher(pusherConfig.key, pusherConfig);

        // Subscribe to public channel
        const channelPublic = _pusherInstance.subscribe(
          `notificationAll-${pusherConfig.agentChannelId}`
        );

        // Bind to my event
        channelPublic.bind("App\\Events\\NewNotification", onReceiveEvent);

        if (_pusherInstance.playerChannelId) {
          connectPrivateChannel(_pusherInstance);
        }

        return _pusherInstance;
      };
      const onReceiveEvent = async (data) => {
        // Relay the message on to each client
        clients.forEach(function (client) {
          client.postMessage({ type: "receivedData", payload: data });
        });
      };

      if (pusherInstance == null) {
        /*first time website load on browser , no pusher instance*/
        pusherInstance = createPusherInstance();
        if (pusherConfig.playerChannelId) connectPrivateChannel(pusherInstance);
      } else if (
        pusherInstance != null &&
        pusherConfig.playerChannelId &&
        privateChannelName == null
      ) {
        /*website loaded on the browser b4 , has pusher instance created b4*/
        /* check privateChannelName == null, to know if connected to private Channel b4. if none only do below*/
        port.postMessage({
          type: "msg",
          payload: "pusher worker : Disconnect",
        });
        /*disconnect and recreate pusherinstance as need call authendpoint again*/
        pusherInstance.disconnect();
        pusherInstance = createPusherInstance();
        connectPrivateChannel(pusherInstance);
      } else if (
        pusherInstance != null &&
        !pusherConfig.playerChannelId &&
        privateChannelName !== null
      ) {
        /*website loaded on the browser b4 , has pusher instance created b4, however user has logged out */
        port.postMessage({
          type: "msg",
          payload: "pusher worker : UnSubscribe to private channel",
        });

        pusherInstance.unsubscribe(privateChannelName);
        privateChannelName  = null;
      }
    } else {
      // Update the shared data when a new value is received
      sharedData = event.data.payload;
    }
  };

  // Notify that the connection is established
  port.postMessage({ type: "msg", payload: "Connected to Shared Worker" });
});
})();
export default pusherWorker;