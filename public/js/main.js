/*
    기본적 요소 제외한 최초 실행 로직
    - config.js, jsList.js 를 제외한 최초 실행 로직
    - deviceManager와 Api, appManger를 이용하여 최초 로드를 시도
*/
lo(function(side_lo, appMgrList){

    /*
        각 기본 side_lo 객체
        - 가독성, 접근성을 위하여 해당 글로벌 변수는 및 컴포넌트 사용은
        아래처럼 변수를 선언하고 사용하자 ( 필수는 아님 )
    */
    var component = side_lo.component, // 컴포넌트 :모듈을 넣어주는 저장객체
    baseComponent = side_lo.baseComponent, // 베이스 컴포넌트 : 모듈의 프로토 타입 저장
    globals = side_lo.global, // 글로벌 리스트 : 글로벌 객체(범위:글로벌하게 쓸려고)
    gObject = globals.object, // 글로벌 오브젝트 : 글로벌 범위의 프로퍼티들
    gArray = globals.array, // 글로벌 오브젝트
    gFunction = globals.function, // 글로벌 함수
    gInstance = globals.instance, // 글로벌 인스턴스 ( new 없이 인스턴스로 생성 )
    gVariable = globals.variable; // 글로벌 변수

    /* 외부 연동용 */
    var app_mgr = null;

    /* jslst.js 의 정적 js 파일들을 모두 로드한뒤에 동작하는 함수 이다. */
    //start 라는 fun 을 글로벌 범위에 정의 > jslist 에서 사용됨 (이미 로드된 상태이므로)
    gFunction.set('start', function(){

        gObject.set('api', component.get('api'));

        console.log(gObject.get('api'));

        /* 기초 변수 선언 */
        app_mgr = appMgrList('classting'); // 앱 매니저 선언(최초 선언)

        app_mgr.init({
            displayData : { // 디스플레이 데이터
                type : 'full'
            }
        });

        // var app_mgr2 = appMgrList('ttt'); // 앱 매니저 선언(최초 선언)
        //
        // app_mgr2.init({
        //     displayData : { // 디스플레이 데이터
        //         type : 'full'
        //     }
        // });

        app_mgr.addViewHistory('page', 'start', 'doc', {
        }).apply(function(){}, true, true);

        // app_mgr2.addViewHistory('page', 'test', 'cdomtest', {}).apply(function(){}, true, true);

    });



});
