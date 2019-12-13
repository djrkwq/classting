lo(function(side_lo, appMgrList, plugin){

    side_lo.baseComponent.set('btn', null, function(prams){

        var self = this;

        self.createBtn = function(datas){

            var view = null,
            block = (datas.block === false ? 'inline-block' : 'block'),
            width = datas.width,
            height = datas.height,
            click_event = datas.click;

            width = width ? width : 'auto';
            height = height ? height : 'auto';

            view = plugin.ctemplate(''+
                '<^div#innerBox css{backgroundColor:rgb(255,255,255);margin:2px;}>' +
                    (datas.text || '') +
                '<^>'+
            '');

            view.box.$css({
                position : 'relative',
                display : block,
                cursor : 'pointer',
                backgroundColor : 'rgb(0,200,180)', width : width, height : height
            });

            if(click_event){
                view.box.addEventListener('click', function(){
                    try {
                        click_event();
                    } catch (e) {
                        console.log(e);
                    }
                });
            }

            return view;
        };

    });

});
