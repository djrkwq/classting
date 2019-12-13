/* js 로드 리스트 및 트리거 스타트
    - slide_lo.loadOn() 을 통한 js 리스트 동적 로드를 한다.
*/
lo(function(side_lo, n, pl){
    /* jsList 배열
        -배열안의 스트링은 파일을 뜻하고 객체는 폴더를 뜻한다.
    */
    var jsList =  [
        'main',
        {lib : [
            'util'
        ]},
        {model : [              //각 폴더 구조를 따름 []
            'defaultModel'   // -> 이유 : html에 파일 임포트를 최소화, 관리 용이
        ]},
        {baseComponent : [
            'ajax'
        ]},
        {component : [
            'api'
        ]}
    ];

    /* 동적 로드
        - jsList 배열를 loadOn 메소드를 통하여 js 를 모두 로드한뒤에
    */
    side_lo.loadOn('js', jsList/*string enable : 'main.js'*/, '.js', function(){
        console.log('jsList Load success');
        /* main.js 의 start 트리거 */
        side_lo.global.function.trigger('start');
    });

});
