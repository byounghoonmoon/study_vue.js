## 화재 카 허브

## 사전 설치해야할 프로그램
## 1. node.js 설치
      https://nodejs.org/ko/
      LTS 버전 설치
   2. Visual Studio Code 설치 (notepad 쓰셔도 무방)
      VSE 사용할 경우(하위 플러그인 설치)
		- view-in-browser : html 파일 기본 브라우저로 보기 
		- vetur : vue 문법 강조, 코드 자동 완성, 디버깅, 린팅 기능
		- HTML Snippets: HTML 태그 조각을 빠르게 작성 
		- ESLint : 자바스크립트 문법 체크 기능 제공
   3. 구글 확장 프로그램 (Vue DevTools 설치)
      Vue 개발도구 ! 
   4. vue-cli 설치
      npm install -g @vue-cli
      npm install -g yarn
      ※ yarn : 패키지 매니저

## 프로그램 실행방법
   1. 해당 경로에서(fire_dapp) npm install 명령어 수행
      package.json에 정의한 패키지를 다운로드(node_modules)
   2. yarn serve 
      ※ 기본 포트 8080
      포트 지정하려면 (예시) yarn serve --port 1234
      