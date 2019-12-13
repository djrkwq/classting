/* 뷰 선언 포멧
*/
lo(function(side_lo, appMgrList, plugin){

    appMgrList('tt').addView('page', 'front', [], [], function(prams){

        /* 필수 */
        var self = this,
        //master div를 생성해준다 (그 안에 이하 뷰 내용 추가됨)
        view = new plugin.cdom('div'), //document.createElement('div')
        view_type = prams.type,
        view_id = prams.id,
        init_data = prams.data,
        app_mgr = prams.app; // app 매니저 전신

        /* UI Views */

        /* 외부 */

        /* 정보 */

        /* 이밴트 */

        /* 필수) 뷰 반환 */
        self.getView = function(){return view;};

        /* 필수) 메인 페이지 초기화 함수*/
        self.init = function(){

            function ListView(){
                var self = this,
                itemList = [];
                // 그외 로직..


                self.init = function(data){
                    // 초기화
                };

                self.addItem = function(count, cssData){ // 카운터 : 추가 될 아이템 수, 아이템들의 공통 css
                    // 뷰 추가 로직..
                    for(var i=0; i<count; i++){
                        var item = new plugin.cdom('div');
                        item.$css(cssData);
                        itemList.push(item);
                    }
                };
            }

            var listView1 = new ListView();

            listView1.init(/* 초기화 데이터 */); // 초기화

            listView1.addItem(10, {width:'100%', height: '50px'});

        };

        /* 선택) 새로고침 */
        self.refresh = function(data){};

        /* 선택) 히스토리에서 삭제시 동작 */
        self.onDestroy = function(){
        };

        /* 선택) 메세지 */
        self.message = function(data){};

    });

});
