module.exports.init = function(val){
    var d   = new Date();
    start   = d.getMilliseconds();

    var _star = function(){
        console.log('\n\n············································································ ' + d);
        console.log(val.controller+'.controller > '+val.method+'()');
        console.log('············································································ ');
        console.log('   D A T A B A S E');
        console.log('   Document:  '+val.controller+' > '+val.method+'()');
        console.log('   >>> Data Request');
        console.log('   ' + JSON.stringify(val.body) || '');
            console.log('   ············································································\n');
    };
    this.end = function(data){
        var dEnd    = new Date();
        var end     = dEnd.getMilliseconds();
        var r   =  end - start;

        console.log('   <<< Data Response');
        console.log('   ' + JSON.stringify(data));
        console.log('············································································ Time: '+r+' ms');
    };
    _star();
    return this;
}