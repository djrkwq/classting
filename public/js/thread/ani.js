importScripts('../lib/locationMVM.slim.js');


lo(function(side_lo){

    var actions = {
        titleBB : function(datas){
            postMessage({
                text : datas.maxWidth > datas.width ? 'TROLL<br>TOOLs' :'TROLL TOOLs',
                side1 : ['pw/2-'+side_lo.getRandom(3,7), 'ph/2-'+side_lo.getRandom(3,7)],
                side2 : ['pw/2+'+side_lo.getRandom(3,7), 'ph/2+'+side_lo.getRandom(3,7)]
            });
        }
    };

    onmessage = function(e) {
        try {
            var data = e.data;
            actions[data.name](data.datas);
        } catch (e) {
            console.log(e);
        }
    };

});
