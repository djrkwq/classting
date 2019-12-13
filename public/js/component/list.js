lo(function(side_lo, appMgrList, plugin){

    side_lo.component.set('list', ['btn'], function(prams){

        var self = this,
        createBtn = self.createBtn,
        view = null,
        click_event = prams.click,
        custom = prams.custom;

        console.log(prams);
        self.createBtn = null;


        view = plugin.ctemplate(''+
            '<^div#main css{position:relative;width:100%;height:100%;backgroundColor:rgb(240,240,240);overflow:auto;}><^>'+
        '', prams.parent);

        view.box.$css({
            display : 'inline-block',
            width : prams.width, height : prams.height
        });


        self.init = function(voteList){ // 초기화
            var box = view.id.main[0];

            box.$removeChild();

            for(var i=voteList.length-1; i>=0; i--){
                self.addItem(box, voteList[i]);
            }

        };

        self.addItem = function(box, item){ //아이템 추가

            if(!box){
                box = view.id.main[0];
            }

            var result = {},
            btn = createBtn({
                width : '100%',
                // height : 100,
                click : function(){
                    click_event(item, result);
                }
            });

            box.$append(btn.box);

            btn.box.$css({
                paddingBottom : '2px'
            });
            var innerBox = btn.id.innerBox[0];

            innerBox.$css({
                margin : 0,
                // position:'absolute',
                width : '100%', textAlign:'center'
            });
            // .$setSize({
            //     y : 0, height : 'ph-2'
            // });

            var startTime = parseInt(item.startTime),
            endTime = parseInt(item.endTime),
            nowTime = Date.now(),
            cv_info = plugin.ctemplate(''+
                '<^div#played css{fontSize:12px;color:rgb(255,255,255);}>진행<^>'+
                '<^div#time css{fontSize:10px;backgroundColor:rgb(255,150,0);}>'+
                    new Date(startTime).getCusDay('/') + ' ~ ' + new Date(endTime).getCusDay('/') +
                '<^>'+
                '<^div#user css{fontSize:12px;backgroundColor:rgb(200,200,200);}>'+
                    '<^div>진행자 : '+ item.id +'<^>'+
                '<^>'+
                '<^div#title css{fontSize:20px;paddingTop:20px;paddingBottom:20px;}>'+
                    item.title+
                '<^>'+
            '', innerBox);

            // 시간 비교
            var played = cv_info.id.played[0];
            if(startTime <= nowTime && nowTime <= endTime){
                played.innerHTML = '진행중';
                played.$css({
                    backgroundColor : 'rgb(0,100,100)'
                });
                result.played = true;
            }else{
                played.innerHTML = '기간만료';
                played.$css({
                    backgroundColor : 'rgb(200,0,0)'
                });
                result.played = false;

            }

            try{custom(innerBox, item);}catch(e){console.log(e);};

        };

    });

});
