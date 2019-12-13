/* 뷰 선언 포멧
*/
lo(function(side_lo, appMgrList, plugin){


    appMgrList('classting').addView('popup', 'detailVote', [], ['btn', 'list'], function(prams){

        /* 필수 */
        var self = this,
        view = plugin.cdom('div'),
        viewType = prams.type,
        viewId = prams.id,
        initData = prams.data,
        item = initData.item,
        played = initData.played,
        applyVote = initData.applyVote,
        appMgr = prams.app; // app 매니저 전신

        /*Ctemplate*/
        var ctemp_main = null;

        /* UI Views */
        var cv = {
            main : null,
            vote : []
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
            }),
            css_played = plugin.ctemplate('convert', {
                fontSize : '20px',
                backgroundColor : applyVote ? 'rgb(200,0,0)' : (played ? 'rgb(0,100,100)' : 'rgb(200,0,0)'),
                color : 'rgb(255,255,255)'
            });
            /*css#*/


            ctemp_main = plugin.ctemplate(''+
                '<^div#main css{'+css_main+'}>'+
                    '<^div css{backgroundColor:rgb(255,255,255);padding:10px;textAlign:center;}>'+
                        '<^div css{backgroundColor:rgb(0,200,180);color:rgb(255,255,255);fontSize:30px;}>'+
                            item.title +
                        '<^>'+
                        '<^div css{'+css_played+'}>'+
                            (applyVote ? '이미 참여함' : (played ? '진행중' : '기간만료')) +
                        '<^>'+
                        '<^div css{fontSize:10px;backgroundColor:rgb(255,150,0);}>'+
                            new Date(item.startTime).getCusDay('/') + ' ~ ' + new Date(item.endTime).getCusDay('/') +
                        '<^>'+
                        '<^div css{fontSize:12px;backgroundColor:rgb(200,200,200);}>진행자 : '+item.id+'<^>'+
                        '<^div#selList css{}>'+
                        '<^>'+
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


            /*투표 리스트 생성*/
            var selList = ctemp_main.id.selList[0],
            vote = item.vote;


            for(var i in vote){
                self.addSelItem(selList, vote[i], i);
            }

            cv.main = ctemp_main.id.main[0];

            self.resize_etc();
            window.addEventListener('resize', self.resize_etc);

        };

        self.addSelItem = function(selList, voteItem, index){ // 투표 아이템 추가

            var temp = plugin.ctemplate(''+
                '<^div css{marginTop:5px;marginBottom:5px;textAlign:left;paddingTop:5px;paddingBottom:5px;}>'+
                    '<^span css{}>'+voteItem.qes+'<^>'+
                    '<^span#voteBtn css{float:right;}><^>'+
                    '<^span css{float:right;color:rgb(255,100,0);}>['+ voteItem.value +']<^>'+
                '<^>'+
            '', selList);

            var btn = prams.component.btn({
                block : false,
                text : '투표',
                click : function(){
                    if(applyVote){
                        alert('이미 참여하였습니다.');
                    }else{

                        appMgr.modelTrigger('vote', {
                            result : {
                                voteId : item['_id'], voteIndex : index
                            },
                            suc : function(){
                                console.log('갱신');
                                appMgr.removeViewHistory(viewType, viewId);
                                appMgr.modelTrigger('popDetailVote', initData);
                            },
                            err : function(){
                                alert('err');
                            }
                        });

                    }

                }
            });
            temp.id.voteBtn[0].$append(btn.getView());

            cv.vote.push(temp);

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
