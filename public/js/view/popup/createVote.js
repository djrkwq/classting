/* 뷰 선언 포멧
*/
lo(function(side_lo, appMgrList, plugin){


    appMgrList('classting').addView('popup', 'createVote', [], ['btn'], function(prams){

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
        var isUpdateMode = viewId === 'updateVote',
        updateDatas = initData.updateDatas || {},
        updateItem = updateDatas.result;

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
                        '<^div css{'+css_center+'}>'+(isUpdateMode ? '투표 수정' : '투표 생성')+'<^>'+
                        '<^input#title css{'+css_input+'} atr{placeholder:제목;value:'+
                            (isUpdateMode ? updateItem.title : '')+
                        ';}><^>'+
                        '<^input.sel css{'+css_input+'} atr{placeholder:선택1;value:'+
                            (isUpdateMode ? updateItem.vote[0].qes : '')+
                        ';}><^>'+
                        '<^input.sel css{'+css_input+'} atr{placeholder:선택2;value:'+
                            (isUpdateMode ? updateItem.vote[1].qes : '')+
                        ';}><^>'+
                        '<^input.sel css{'+css_input+'} atr{placeholder:선택3;value:'+
                            (isUpdateMode ? updateItem.vote[2].qes : '')+
                        ';}><^>'+
                        '<^input#startTime css{'+css_input+'} atr{placeholder:시작시간(YYYY/MM/DD);value:'+
                            (isUpdateMode ? new Date(updateItem.startTime).getCusDay('/') : '')+
                        ';}><^>'+
                        '<^input#endTime css{'+css_input+'} atr{placeholder:종료시간(YYYY/MM/DD);value:'+
                            (isUpdateMode ? new Date(updateItem.endTime).getCusDay('/') : '')+
                        ';}><^>'+
                        '<^div#btn css{textAlign:center;}><^>'+
                    '<^>'+
                '<^>'+
            '', view);


            /*#로그인 및 나기기 버튼 설정*/
            cv.ok = prams.component.btn({
                block : false, text : isUpdateMode ? '수정하기' : '생성 하기',
                click : function(){
                    var title = ctemp_main.id.title[0].value,
                    sel = ctemp_main.class.sel,
                    startTime = ctemp_main.id.startTime[0].value,
                    endTime = ctemp_main.id.endTime[0].value,
                    failedAlert = null;


                    if(2 > title.length || title.length > 30){
                        failedAlert = '제목의 입력 범위 오류 (2~30 자 입력)';
                    }else{
                        for(var i in sel){
                            var item = sel[i].value;
                            if(2 > item.length || item.length > 10){
                                failedAlert = '선택지['+(i+1)+']의 입력 범위 오류 (2~10 자 입력)';
                                break;
                            }
                        }
                        if(!failedAlert){
                            if( !startTime.match(/^(19|20)\d{2}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[0-1])$/) ){
                                failedAlert = '시작 시간의 형식 오류';
                            }else if(!endTime.match(/^(19|20)\d{2}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[0-1])$/)){
                                failedAlert = '끝 시간의 형식 오류';
                            }
                        }
                    }

                    if(failedAlert){
                        alert(failedAlert);
                    }else{
                        console.log('투표지 입력');

                        startTime = new Date(startTime).getTime();
                        endTime = new Date(endTime).getTime();

                        if(startTime >= endTime){// 시작시간이 끝 시간보다 크거나 같으면 안된다.
                            alert('시작 시간이 끝 시간보다 큽니다. 다시 설정 하세요.');
                        }else{

                            if(isUpdateMode){

                                appMgr.modelTrigger('updateVote', {
                                    result : {
                                        '_id': updateItem['_id'],
                                        title : title,
                                        vote : [
                                            {qes:sel[0].value, value:0},
                                            {qes:sel[1].value, value:0},
                                            {qes:sel[2].value, value:0}
                                        ],
                                        startTime : startTime,
                                        endTime : endTime
                                    },
                                    suc : function(){
                                        alert('투표지 생성 성공!');
                                        appMgr.removeViewHistory(viewType, viewId);
                                        updateDatas.suc();
                                    },
                                    err : function(){
                                        alert('err');
                                    }
                                });

                            }else{

                                appMgr.modelTrigger('createVote', {
                                    result : {
                                        title : title,
                                        vote : [
                                            {qes:sel[0].value, value:0},
                                            {qes:sel[1].value, value:0},
                                            {qes:sel[2].value, value:0}
                                        ],
                                        startTime : startTime,
                                        endTime : endTime
                                    },
                                    suc : function(){
                                        alert('투표지 생성 성공!');
                                        appMgr.removeViewHistory(viewType, viewId).apply();
                                        appMgr.message('page', 'start', 'reload');
                                    },
                                    err : function(){
                                        alert('err');
                                    }
                                });

                            }

                        }

                    }
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
