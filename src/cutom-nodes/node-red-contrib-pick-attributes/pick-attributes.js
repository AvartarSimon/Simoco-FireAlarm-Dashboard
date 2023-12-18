module.exports = function (RED) {
  function customeNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function (msg) {
      const selectedAttributes = config["selected_attributes"];
      selectedAttributes.split(",").map((attribute) => {
        msg[attribute] = msg.payload[attribute];
      });
      node.send(msg);
    });
  }
  RED.nodes.registerType("pick-attributes", customeNode);
};
