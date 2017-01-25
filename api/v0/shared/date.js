module.exports.new = function(local){
	local = local || 6;
	var d = new Date;
	d.setHours(d.getHours()-local);
	return d;
};