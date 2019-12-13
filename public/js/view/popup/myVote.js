/* 뷰 선언 포멧
*/
lo(function(side_lo, appMgrList, plugin){


    appMgrList('classting').addView('popup', 'myVote', [], ['btn', 'list'], function(prams){

        /* 필수 */
        var self = this,
        view = plugin.cdom('div'),
        viewType = prams.type,
        viewId = prams.id,
        initData = prams.data,
        voteList = initData.voteList,
        userId = initData.id,
        appMgr = prams.app; // app 매니저 전신

        /*Ctemplate*/
        var ctemp_main = null;

        /* UI Views */
        var cv = {
            main : null,
            voteList : null
        };

        /* 외부 */

        /* 정보 */

        /* 필수) 뷰 반환 */
        self.getView = function(){return view;};

        /* 필수) 메인 페이지 초기화 함수*/
        self.init = function(){

            view.$abs().$css({
                width:'100%', height: '100%',
                backgroundColor : 'rgba(0,0,0, 0.6)'
            });

            /*#css*/
            var css_main = plugin.ctemplate('convert', {
                position : 'absolute',
                width : '400px',
                padding : '5px',
                backgroundColor : 'rgb(0,200,180)'
            });
            /*css#*/


            ctemp_main = plugin.ctemplate(''+
                '<^div#main css{'+css_main+'}>'+
                    '<^div css{backgroundColor:rgb(255,255,255);padding:10px;textAlign:center;}>'+
                        '<^div css{backgroundColor:rgb(0,200,180);color:rgb(255,255,255);fontSize:30px;}>'+
                            userId + ' 님의 투표지'+
                        '<^>'+
                        '<^div#voteList css{backgroundColor:rgb(0,200,180);padding:5px;marginTop:10px;marginBottom:10px;}><^>'+
                        '<^div#btn css{textAlign:center;}><^>'+
                    '<^>'+
                '<^>'+
            '', view);

            /*#로그인 및 나기기 버튼 설정*/
            cv.cancel = prams.component.btn({
                block : false, text : '나가기', width : 200,
                click : function(){
                    appMgr.removeViewHistory(viewType, viewId).apply();
                }
            });

            ctemp_main.id.btn[0].$append([
                cv.cancel.getView()
            ]);
            /*로그인 및 나기기 버튼 설정#*/

            cv.voteList = prams.component.list({
                parent : ctemp_main.id.voteList[0],
                width : 300, height : 400,
                click : function(item, result){

                    if(result.played){
                        appMgr.modelTrigger('popDetailVote', {
                            item : item, played : result.played
                        });
                    }
                },
                custom : function(innerBox, item){
                    var cus = plugin.ctemplate(''+
                        '<^div css{position:absolute;left:10px;top:55px;}>'+
                            '<^div#update css{backgroundColor:blue;color:white;marginBottom:10px;}>수정<^>'+
                            '<^div#delete css{backgroundColor:red;color:white;}>삭제<^>'+
                        '<^>'+
                    '', innerBox);
                    console.log(innerBox);

                    cus.id.update[0].addEventListener('click', function(me){
                        console.log(item);
                        appMgr.modelTrigger('editVote',{
                            result : item,
                            suc : function(){
                                appMgr.message('page', 'start', 'reload');
                                appMgr.removeViewHistory(viewType, viewId);
                                appMgr.modelTrigger('popMyVote');
                            },
                            err : function(){
                                alert('err');
                            }
                        });
                        try { me.preventDefault(); } catch (e) { console.log(e); }
                        try { me.stopPropagation(); } catch (e) { console.log(e); }
                        try { me.stopImmediatePropagation(); } catch (e) { console.log(e); }
                    });

                    cus.id.delete[0].addEventListener('click', function(me){
                        console.log(item);

                        appMgr.modelTrigger('deleteVote', {
                            result : {
                                '_id' : item['_id']
                            },
                            suc : function(){
                                appMgr.message('page', 'start', 'reload');
                                appMgr.removeViewHistory(viewType, viewId);
                                appMgr.modelTrigger('popMyVote');
                            },
                            err : function(){
                                alert('err');
                            }
                        });

                        try { me.preventDefault(); } catch (e) { console.log(e); }
                        try { me.stopPropagation(); } catch (e) { console.log(e); }
                        try { me.stopImmediatePropagation(); } catch (e) { console.log(e); }
                    });
                }
            });

            cv.voteList.init(voteList);


            cv.main = ctemp_main.id.main[0];

            self.resize_etc();
            window.addEventListener('resize', self.resize_etc);

        };

        /* 선택) 새로고침 */
        self.refresh = function(data){};
        /* 선택) 히스토리에서 삭제시 동작 */
        self.onDestroy = function(){
            window.removeEventListener('resize', self.resize_etc);
        };
        /* 선택) 메세지 */
        self.message = function(data){};

        self.resize_etc = function(){
            self.resize_center();
        }

        self.resize_center = function(){
            try {
                cv.main.$x = '(ww-w)/2';
                cv.main.$y = '(wh-h)/2';
            } catch (e) {}
        };

    });

});
