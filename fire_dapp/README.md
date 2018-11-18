## 화재 카 허브

## 사전 설치해야할 프로그램
- 1. node.js 설치
      - https://nodejs.org/ko/
      - LTS 버전 설치
- 2. Visual Studio Code 설치 (notepad 쓰셔도 무방)
      - VSE 사용할 경우(하위 플러그인 설치)
		- view-in-browser : html 파일 기본 브라우저로 보기 
		- vetur : vue 문법 강조, 코드 자동 완성, 디버깅, 린팅 기능
		- HTML Snippets: HTML 태그 조각을 빠르게 작성 
		- ESLint : 자바스크립트 문법 체크 기능 제공
- 3. Vue개발도구 - 구글 확장 프로그램 (Vue DevTools 설치)
      
- 4. vue-cli 설치
     - npm install -g @vue-cli
     - npm install -g yarn
     - ※ yarn : 패키지 매니저

## 프로그램 실행방법
- 1. 해당 경로에서(fire_dapp) npm install 명령어 수행
      - package.json에 정의한 패키지를 다운로드(node_modules)
- 2. yarn serve 
      - ※ 기본 포트 8080
      - 포트 지정하려면 (예시) yarn serve --port 1234
      


## 프로그램 프로세스 

1. 사용자 인증
      1) 인증 안된 사용자의 경우 
         사용자 등록하기 (인증 안된사람만)
      2) 인증된 사용자의 경우
            가. 사용자 -> 본인 사고 현황 (수리요청하기, 신규 사고처리접수)
            나. 센터 -> 본인 센터에 할당된 사고 현황 (수리하기, 수리내용수정, 수리비 청구)
            다. 보험사 -> 본인 보험사에 할당된 사고 현황 (수리비 지금)
