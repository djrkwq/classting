/* 뷰 선언 포멧
*/
lo(function(side_lo, appMgrList, plugin){


    appMgrList('tt').addView('page', 'cdomtest', [], [], function(prams){

        /* 필수 */
        var self = this,
        view = new plugin.cdom('div'),
        viewType = prams.type,
        viewId = prams.id,
        initData = prams.data,
        appMgr = prams.app; // app 매니저 전신

        /* UI Views */

        /* 외부 */

        /* 정보 */

        /* 필수) 뷰 반환 */
        self.getView = function(){return view;};

        /* 필수) 메인 페이지 초기화 함수*/
        self.init = function(){
            view.$abs().$css({width:'100%', height: '100%'});

            view.$tossCss = {
                // position : 'absolute',
                backgroundColor : 'gray'
            };

            var test = new plugin.ctemplate(`
                <^div css{textAlign:center;}>
                    cTemplate 테스트
                <^>
                <^div css{} ccss{backgroundColor:red;}>
                    box
                    <^div cdv{width:50;}>a<^>
                    <^div$test cdv{width:100;} ccss{backgroundColor:rgb(0,200,255);}>
                        b
                    <^>
                    <^div$inbox cdv{width:150;} ccss{backgroundColor:pink;}>
                        c
                    <^>
                <^>
            `, view);

            console.log(test);

            var testIn = new plugin.ctemplate(`
                <^div>
                    b-1
                <^>
                <^div css{backgroundColor:blue;} cs{}>
                    b-2
                <^>
                <^div>
                    b-3
                <^>
            `, test.$id['test'][0]);

            console.log(testIn);


            var testInbox = new plugin.ctemplate(`
                <^div>inbox<^>
            `, test.$id['inbox'][0]);


            // cdf cdv 테스트
            var abstest = new plugin.ctemplate(`
                <^div$test css{cursor:pointer;}>
                    test
                <^>
            `,view);

            console.log(abstest);

            test.$id['test'][0].$append(abstest.$id['test'][0]);
            test.$id['test'][0].$append(abstest.$id['test'][0]);
            test.$id['inbox'][0].$append(abstest.$id['test'][0]);

            abstest.$id['test'][0].$setMouseEvent('', '', {test:0}, {
                click : ['test', function(datas){
                    console.log(datas.prams.test++);
                    console.log('클릭');
                }]
            });

            // abstest.$id['test'][0].addEventListener('click', function(){
            //     console.log('이벤트 리스트 클릭');
            // });

        };

        /* 선택) 새로고침 */
        self.refresh = function(data){};
        /* 선택) 히스토리에서 삭제시 동작 */
        self.onDestroy = function(){};
        /* 선택) 메세지 */
        self.message = function(data){};


    });

});
