# classting
설문조사 과제_임석영

사용 도구 : atom, gulp

프론트엔드 라이브러리 및 프레임워크 : loacationMVM, locationMVM-dom

서버 구성
 - aws window server
 - nodeJS, express
 - mongoDB
 
실행 방법 (1)
1. nodeJS 와 mongoDB 설치
2. 같은 루트에 mongoDB 의 DB 설치
3. server.js 파일에 있는 부분에서 콘솔을 통하여 node server 입력하여 서버 실행
4. http://localhost:9091/classting 으로 접속

실행 방법 (2)
1. 아래의 데모 URL로 접속

제작 기간 : 2일


데모 접속 URL :
http://13.125.141.171:9091/classting

모든 데이터 삭제 :
http://13.125.141.171:9091/api/master/all/drop 호출

투표 정보만 삭제 :
http://13.125.141.171:9091/api/master/vote/drop 호출

유저 정보만 삭제 :
http://13.125.141.171:9091/api/master/user/drop 호출



주의
- SPA 어플리케이션 입니다.
- 로그인 정보는 캐싱하지 않습니다.
