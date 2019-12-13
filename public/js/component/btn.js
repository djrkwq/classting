lo(function(side_lo, appMgrList, plugin){

    side_lo.component.set('btn', ['btn'], function(prams){

        var self = this,
        view = self.createBtn(prams);

        self.init = null;

        view.box.$css({
            marginLeft : '5px', marginRight : '5px'
        });

        self.getView = function(){
            return view.box;
        };

    });

});
