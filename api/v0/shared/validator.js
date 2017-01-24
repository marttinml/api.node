var self = module.exports;
self.modelBySchema = function(model, scheme){
	var result = {
		valid:true,
		errors:[]
	};
	var _isValid = function(propertiesModel, propertiesSchema){
		for(var i in propertiesSchema){
					if(propertiesModel.hasOwnProperty(i)){
						if(propertiesSchema[i].type === typeof(propertiesModel[i])){
							if(propertiesSchema[i].required){
								switch(propertiesSchema[i].type){
									case 'string': 
										if(propertiesModel[i] === ''){
											result.errors.push("ERROR: Property of Schema '"+i+"' is required");
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
												result.errors.push("ERROR: Property of Schema '"+i+"' is required");
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
					}else{
						result.errors.push("ERROR: Was found '"+typeof(propertiesModel[i])+"' type in property '"+i+"' and '"+propertiesSchema[i].type+"' type is needed ");
						result.valid =  false;
					}
				}else{
					if(propertiesSchema[i].required){
						result.errors.push("ERROR: Property of Schema '"+i+"' not found");
						result.valid =  false;
					}
				}
				
		}
	};

	_isValid(model, scheme.properties);
	return result;
};