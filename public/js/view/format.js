/* 뷰 선언 포멧
*/
lo(function(side_lo, appMgrList, plugin){

    console.log(appMgrList('appName'));

    appMgrList('appName').addView('page', 'format', [], [], function(prams){

        /* 필수 */
        var self = this,
        view = new side_lo.$$('div').setId('test'),
        viewType = prams.type,
        viewId = prams.id,
        initData = prams.data,
        app_mgr = prams.app; // app 매니저 전신

        /* UI Views */

        /* 외부 */

        /* 정보 */

        /* 필수) 뷰 반환 */
        self.getView = function(){return view;};

        /* 필수) 메인 페이지 초기화 함수*/
        self.init = function(){
            view.abs().setBackColor('rgba(255,0,0,1)').setSize('pw-50', 'ph-50').center();
            /* 키 세팅 */
            app_mgr.setKeyEvent(viewType, viewId, {
                back : ['backHistory']
            }, true);

        };

        /* 선택) 새로고침 */
        self.refresh = function(data){};
        /* 선택) 히스토리에서 삭제시 동작 */
        self.onDestroy = function(){};
        /* 선택) 메세지 */
        self.message = function(data){};


    });

});
