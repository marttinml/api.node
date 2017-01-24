var self = module.exports;
self.modelBySchema = function(model, scheme){
	var result = {
		valid:true,
		errors:[]
	};
	var _isValid = function(propertiesModel, propertiesSchema){
		for(var i in scheme){
				
					if(propertiesSchema[i].required && !propertiesModel.hasOwnProperty(i)){
						result.errors.push("ERROR: Property of Schema 'propertiesSchema["+i+"].type' is required");
						result.valid =  false;
					}
					if(propertiesSchema[i].type === typeof(propertiesModel[i])){
					if(propertiesSchema[i].required && propertiesModel.hasOwnProperty(i)){
						switch(propertiesSchema[i].type){
							case 'string': 
								if(propertiesModel[i] === ''){
									result.errors.push("ERROR: Property of Schema 'propertiesSchema["+i+"].type' is required");
									result.valid =  false;
								}
								break;
							case 'array':
									for(var j in propertiesSchema[i]){
										_isValid(propertiesModel[i][j], propertiesSchema[i].properties);
									}
								break;
							case 'Date': 
									var d = new Date(propertiesModel);
									if(isNaN(d.getTime())){
										result.errors.push("ERROR: Property of Schema 'propertiesSchema["+i+"].type' is required");
										result.valid =  false;
									}
								break;
							case 'object': 
								_isValid(propertiesModel[i], propertiesSchema[i].properties);
								break;
							case 'object': break;
							case 'number': break;
							case 'boolean': break;
							default: break;
						}
					}
				}
				else{
					result.errors.push("ERROR: Property of Schema 'propertiesSchema["+i+"].type' no match whit 'propertiesModel["+i+"]'");
					result.valid =  false;
				}
		}
	};

	_isValid(model, scheme);
	return result;
};