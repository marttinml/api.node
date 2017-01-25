module.exports = {
	type:"object",
	properties:{
		testId 			: { type: "number" },
		name 			: { type: "string", required:true },
		description 	: { type: "string", required:true },
		data 			: { type: "object", required: true,
			properties 	: {
				id: { type: "number", required: true }
			}
		}
	}
};