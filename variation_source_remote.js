module.exports = function(RED) {

	function variation_source_remoteNode(config) {
		RED.nodes.createNode(this,config);
		
        this.source_value = config.source_value;
        this.time_meter = config.time_meter;
        this.repeat = config.repeat;


		var node = this;
		
		node.on('input', function(msg) {
			var globalContext = node.context().global;
            var file = globalContext.get("exportFile");

            var command = {
                action: "variation_source_remote",
                payload: {
                    attributes: [
                        { name: "source_value", value: parseInt(node.source_value) },
                        { name: "time_meter", value: parseInt(node.time_meter) },
                        { name: "repeat", value: parseInt(node.repeat) },
                    ],
                }
            };
       
            file.instructions.push(command);
            
			globalContext.set("exportFile", file);
			node.send(msg);
		});
	}
	RED.nodes.registerType("variation_source_remote", variation_source_remoteNode);
}