/* 뷰 선언 포멧
*/
lo(function(side_lo, appMgrList, plugin){


    appMgrList('classting').addView('page', 'doc', [], ['btn', 'list'], function(prams){

        /* 필수 */
        var self = this,
        view = plugin.cdom('div'),
        viewType = prams.type,
        viewId = prams.id,
        initData = prams.data,
        appMgr = prams.app; // app 매니저 전신

        /*Ctemplate*/
        var ctemp_main = null;

        /* UI Views */
        var cv = {
            voteCreate : null,  // 투표 생성
            myVote : null // 나의 투표 보기
        };

        /* 외부 */

        /* 정보 */

        /* 필수) 뷰 반환 */
        self.getView = function(){return view;};

        /* 필수) 메인 페이지 초기화 함수*/
        self.init = function(){

            view.$abs().$css({
                width:'100%', height: '100%',
                backgroundColor : 'rgb(230,230,230)',
                overflow : 'auto'
            });

            ctemp_main = plugin.ctemplate(''+
                '<^div css{textAlign:center;backgroundColor:rgb(255,255,255);paddingTop:20px;paddingBottom:20px;}>'+
                    '<^div css{color:rgb(0,200,180);fontWeight:bold;fontSize:50px;}>CLASSTING<^>'+
                    '<^div>투표 프로그램<^>'+
                    '<^div#voteMenu css{textAlign:center;paddingTop:10px;}>'+
                    '<^>'+
                '<^>'+
                '<^div css{textAlign:center;}>'+
                    '<^div>투표 리스트(최신등록순)<^>' +
                    '<^div#voteList css{backgroundColor:rgb(0,200,180);padding:5px;}><^>' +
                '<^>'+
                '<^div#loginState css{position:absolute;color:rgb(0,200,180);top:10px;left:10px;}>로그인 안됨<^>' +
            '', view);


            /* # 투표 메뉴 관련 */
            // 투표 생성
            cv.voteCreate = prams.component.btn({
                block : false, width : 200, text : '투표 생성',
                click : function(){
                    self.login(function(){
                        appMgr.modelTrigger('popCreateVote');
                    });
                }
            });

            // 나의 투표지 보기
            cv.myVote = prams.component.btn({
                block : false, width : 200, text : '나의 투표지',
                click : function(){
                    self.login(function(){
                        appMgr.modelTrigger('popMyVote',{
                            err : function(){
                                alert('err');
                            }
                        });
                    });
                }
            });

            ctemp_main.id.voteMenu[0].$append([
                cv.voteCreate.getView(), cv.myVote.getView()
            ]);
            /* 투표 메뉴 관련 # */

            /* 투표 리스트 작성 */
            cv.voteList = prams.component.list({
                parent : ctemp_main.id.voteList[0],
                width : 600, height : 700,
                click : function(item, result){
                    console.log(item);
                    console.log(result);
                    if(result.played){
                        self.login(function(){

                            appMgr.modelTrigger('popDetailVote', {
                                item : item, played : result.played
                            });

                        });
                    }
                }
            });

            self.voteReload();

        };

        /* 선택) 새로고침 */
        self.refresh = function(data){};
        /* 선택) 히스토리에서 삭제시 동작 */
        self.onDestroy = function(){};
        /* 선택) 메세지 */
        self.message = function(data){
            console.log(data);
            if(data === 'reload'){
                self.voteReload();
            }
        };

        self.voteReload = function(){
            appMgr.modelTrigger('getVoteList', function(result){
                console.log(result);
                if(result){
                    cv.voteList.init(result);
                }
            });
        };

        self.login = function(callbackFn){
            appMgr.modelTrigger('checkLogin', { // 로그인 여부 확인 후 동작
                afterEvent : function(id){
                    ctemp_main.id.loginState[0].innerHTML = id || '';
                    callbackFn();
                }
            });
        };

    });

});
