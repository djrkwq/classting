lo(function(side_lo, appMgrList, plugin){

    side_lo.component.set('api', ['ajax'], function(prams){

        var self = this;

        // 포멧
        self.format = function(sendData, sucFn, errFn){

            return self.ajax('api/activate', sendData, 'GET', function(status, result){
                sucFn();
            }, function(status, result){
                errFn();
            }, {});

        };

        // 가입 및 로그인
        self.activate = function(sendData, sucFn, errFn){

            return self.ajax('api/activate', sendData, 'GET', function(status, result){

                if(status === 202){ // 로그인 성공
                    sucFn(1);
                }else if(status === 201){ // 아이디가 존재하지않아 가입 로그인
                    sucFn(2);
                }else if(status === 203){ // 비밀번호 불일치
                    errFn(1);
                }else{
                    errFn();
                }

            }, function(status, result){
                console.log('err');
                errFn();
            }, {});

        };

        // 가입 및 로그인
        self.createVote = function(sendData, sucFn, errFn){

            return self.ajax('api/createVote', sendData, 'POST', function(status, result){
                sucFn();
            }, function(status, result){
                errFn();
            }, {
                inputJson : true
            });

        };

        self.updateVote = function(sendData, sucFn, errFn){

            return self.ajax('api/updateVote', sendData, 'POST', function(status, result){
                sucFn();
            }, function(status, result){
                errFn();
            }, {
                inputJson : true
            });

        };


        self.getVoteList = function(sucFn, errFn){

            return self.ajax('api/getVoteList', null, 'GET', function(status, result){
                sucFn(result);
            }, function(status, result){
                errFn();
            }, {});

        };

        self.getMyVote = function(id, sucFn, errFn){

            return self.ajax('api/getMyVote', {id:id}, 'GET', function(status, result){
                sucFn(result);
            }, function(status, result){
                errFn();
            }, {});

        };

        // 투표지 삭제
        self.deleteVote = function(sendData, sucFn, errFn){

            return self.ajax('api/deleteVote', sendData, 'get', function(status, result){
                sucFn();
            }, function(status, result){
                errFn();
            }, {

            });

        };

        self.checkVote = function(sendData, sucFn, errFn){

            return self.ajax('api/checkVote', sendData, 'POST', function(status, result){
                if(status === 200){ // 참여한 투표
                    sucFn(true, result[0]);
                }else if(status === 201){ // 불참여 투표
                    sucFn(false, result[0]);
                }
            }, function(status, result){
                errFn();
            }, {
                inputJson : true
            });

        };

        // 투표하기
        self.vote = function(sendData, sucFn, errFn){

            return self.ajax('api/vote', sendData, 'get', function(status, result){
                sucFn();
            }, function(status, result){
                errFn();
            }, {
                // inputJson : true
            });
        };

    });

});
