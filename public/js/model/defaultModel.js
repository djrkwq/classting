lo(function(side_lo, appMgrList){

    /*
        기능, 키 모델 정의
        - olo App에 기본적으로 필요한 모델을 정의하였다.
        - 직접 로드(jsList)를 하거나
        - appMgr.loadModel(['파일 이름'], function(){}) 로 동적로드를 시도 해야한다.
    */

    /* 앱 매니저 로드 */
    var appMgr = appMgrList('classting'), globals = side_lo.global,
    gArray = globals.array, gObject = globals.object, gVariable = globals.variable,
    status = {
        login : false, id : null
    };


    appMgr.setModel({
        test : function(datas){ // 왼쪽 방향 키
            console.log('click');
        },
        checkLogin : function(datas){ // 로그인 확인 및 로그인 프로세스 실행
            if(status.login){ // 로그인 되어있으면 콜백 실행
                try {
                    datas.afterEvent(status.id);
                } catch (e) {}
            }else{ // 로그인 안되어 있으면 로그인 창 띄우기
                appMgr.addViewHistory('popup', 'login', 'login', datas).apply();
            }
            return true;
        },
        login : function(datas){

            gObject.get('api').activate(datas.result, function(result){
                status.login = true;
                status.id = datas.result.id;
                status.pw = datas.result.pw;
                datas.suc(result, status.id);
            }, function(result){
                datas.err(result);
            });

        },
        getUserInfo : function(){ // 유저 정보 반환
            return { id : status.id, pw : status.pw };
        },
        popCreateVote : function(){ // 투표 생성
            appMgr.addViewHistory('popup', 'createVote', 'createVote', {
                id : status.id, pw : status.pw
            }).apply();
        },
        createVote : function(datas){

            datas.result.id = status.id;
            datas.result.pw = status.pw;

            gObject.get('api').createVote(datas.result, function(result){
                datas.suc(result);
            }, function(result){
                datas.err(result);
            });
        },
        getVoteList : function(callbackFn){

            gObject.get('api').getVoteList(function(result){
                callbackFn(result);
            }, function(result){
                callbackFn(false);
            });

        },
        popDetailVote : function(datas){
            datas.item.userId = status.id;
            gObject.get('api').checkVote(datas.item, function(applyVote, applyResult){
                datas.applyVote = applyVote;
                datas.item = applyResult;
                appMgr.addViewHistory('popup', 'detail', 'detailVote', datas).apply();
            }, function(result){
                alert('err');
            });

        },
        vote : function(datas){

            datas.result.id = status.id;

            gObject.get('api').vote(datas.result, function(){
                datas.suc();
            }, function(){
                datas.err();
            });

        },
        popMyVote : function(datas){

            gObject.get('api').getMyVote(status.id, function(result){
                appMgr.addViewHistory('popup', 'myVote', 'myVote', {
                    voteList : result,
                    id : status.id
                }).apply();
            }, function(result){
                datas.err();
            });

        },
        deleteVote : function(datas){

            gObject.get('api').deleteVote(datas.result, function(result){
                datas.suc();
            }, function(result){
                datas.err();
            });

        },
        editVote : function(datas){
            appMgr.addViewHistory('popup', 'updateVote', 'createVote', {
                id : status.id, pw : status.pw,
                updateDatas : datas
            }).apply();
        },
        updateVote : function(datas){

            datas.result.id = status.id;
            datas.result.pw = status.pw;

            gObject.get('api').updateVote(datas.result, function(result){
                datas.suc(result);
            }, function(result){
                datas.err(result);
            });

        }
    });

});
