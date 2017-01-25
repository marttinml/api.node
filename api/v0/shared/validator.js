var self = module.exports;
self.modelBySchema = function(model, scheme){
	var result = {
		valid:true,
		errors:[]
	},
	string		= "string",
	number 		= "number",
	object  	= "object",
	array 		= "array",
	date 		= "date",
	bolean 		= "boolean",
	emptyString = "";

	var _isValid = function(propertiesModel, propertiesSchema){
		for(var key in propertiesSchema){
			var typeModel = typeof(propertiesModel[key]),
				typeSchema = propertiesSchema[key].type,
				modelItem = propertiesModel[key],
				schemeItem = propertiesSchema[key],
				required = propertiesSchema[key].required;
			
			typeModel = Array.isArray(modelItem) ? array : typeModel;

			if(propertiesModel.hasOwnProperty(key)){
				if( typeSchema === typeModel ) {
					if(required){
						switch(typeSchema){
							case string: 
								if(modelItem === emptyString){
									result.errors.push("Property of Schema '"+ key +"' is required");
									result.valid =  false;
								}
								break;
							case array:
									for(var i in schemeItem){
										_isValid(modelItem[i], schemeItem.properties);
									}
								break;
							case date: 
									var d = new Date(modelItem);
									if(isNaN(d.getTime())){
										result.errors.push("Property of Schema '"+ key +"' is required");
										result.valid =  false;
									}
								break;
							case object: 
								_isValid(modelItem, schemeItem.properties);
								break;
							case number: break;
							case boolean: break;
							default: break;
						}
					}
				}else{
					result.errors.push("Was found '"+ typeModel +"' type in the property '"+key+"', and '"+typeSchema+"' type is needed.");
					result.valid =  false;
				}
			}else{
				if(required){
					result.errors.push("Property of Schema '"+key+"' not found");
					result.valid =  false;
				}
			}
				
		}
	};

	_isValid(model, scheme.properties);
	return result;
};