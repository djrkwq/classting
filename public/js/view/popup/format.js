/* 뷰 선언 포멧
*/
lo(function(side_lo, appMgrList, plugin){


    appMgrList('classting').addView('popup', 'login', [], ['btn', 'list'], function(prams){

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
            main : null
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
            var css_center = plugin.ctemplate('convert', {
                textAlign : 'center',
                fontSize : '30px',
                color : 'rgb(0,200,180)'
            }),
            css_main = plugin.ctemplate('convert', {
                position : 'absolute',
                width : '400px',
                padding : '5px',
                backgroundColor : 'rgb(0,200,180)'
            }),
            css_input = plugin.ctemplate('convert',{
                textAlign : 'center',
                display : 'block', width : '100%',
                marginTop : '10px',
                marginBottom : '30px',
                padding : '0px',
                border : '0px',
                backgroundColor : 'rgb(0,200,180)'
            });
            /*css#*/


            ctemp_main = plugin.ctemplate(''+
                '<^div#main css{'+css_main+'}>'+
                    '<^div css{backgroundColor:rgb(255,255,255);padding:10px;}>'+
                        '<^div css{'+css_center+'}>로그인<^>'+
                        '<^input#id css{'+css_input+'} atr{placeholder:ID}><^>'+
                        '<^input#pw css{'+css_input+'} atr{type:password;placeholder:PW}><^>'+
                        '<^div#btn css{textAlign:center;}><^>'+
                    '<^>'+
                '<^>'+
            '', view);

            /*#로그인 및 나기기 버튼 설정*/
            cv.ok = prams.component.btn({
                block : false, text : '로그인',
                click : function(){
                    var id = ctemp_main.id.id[0].value,
                    pw = ctemp_main.id.pw[0].value;

                    console.log(id);
                    console.log(pw);

                    appMgr.modelTrigger('login', {
                        id : id, pw : pw,
                        suc : function(result, id){
                            appMgr.removeViewHistory(viewType, viewId).apply();
                            initData.afterEvent(id);
                        },
                        err : function(result){
                            if(result){
                                alert('비밀번호가 불일치 입니다.');
                            }else{
                                alert('error');
                            }
                        }
                    });

                }
            });

            cv.cancel = prams.component.btn({
                block : false, text : '나가기',
                click : function(){
                    appMgr.removeViewHistory(viewType, viewId).apply();
                }
            });

            ctemp_main.id.btn[0].$append([
                cv.ok.getView(), cv.cancel.getView()
            ]);
            /*로그인 및 나기기 버튼 설정#*/

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
