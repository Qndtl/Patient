# React Setting
@babel/core, @babel/preset-env, @babel/preset-react, babel-loader, html-webpack-plugin, webpack, webpack-dev-server, react, react-dom, webpack-cli, @babel/plugin-transform-regenerator, @babel/plugin-transform-runtime을 npm을 이용해 받아준 후 .babelrc와 webpack.config.js 파일을 작성해 준다.

# Api 호출
Api 호출은 axios를 사용하였다. src/axios/index.js에 baseURL을 설정해 주었다.

# Styled Components
전체적인 스타일링은 styled-components를 사용하였다.
src/styles/GlobalStyles.js에 global style을 작성하고 src/index.js에서 불러와 global style을 적용시켰다.

# 환자 정보 탐색 테이블
 - /api/patient/list를 통해 받아온 정보를 이용하여 테이블을 만든다. map 메서드를 이용하여 환자의 수 만큼 테이블의 행을 만들었다.
 - 한 행에는 환자 ID, 성별, 생년월일, 나이, 인종, 민족, 사망 여부가 적혀있다.
 - /api/patient/list의 totalLength와 한 페이지당 row의 갯수(length)를 이용하여 총 페이지의 수를 알아냈다.(Math.ceil(patient?.totalLength / length))

# 테이블의 필터 기능
 - 테이블의 필터는 select option을 통해 선택한 값들을 이용하여 필터링이 되도록 하였다.(성별, 나이, 인종, 민족, 사망 여부)
 - 특정 컬럼으로 정렬하는 기능과 오름차순, 내림차순 정렬 기능도 필터 기능에 같이 작성하였다.

# 환자의 상세 정보
 - /api/patient/list를 통해 만든 테이블의 환자 한명을 클릭하면 그 환자의 id를 이용하여 /api/patient/brief/{person_id}를 호출하여 환자의 상세정보를 불러온다.
 - 불러온 환자의 상세 정보를 바로 밑에 보여지게 하였고 다시 클릭을 하면 상세 정보가 없어진다.
 - 상세 정보의 conditionList를 map을 통하여 나열해 주었다.

# 그래프 추가
 - 그래프는 react-google-charts를 이용하였고 /api/patient/stats를 통해 얻은 정보를 이용하여 성별, 인종별, 민족별, (성별 + 인종), (성별 + 민족)별 그래프를 만들었다.
 - 성별 그래프의 경우 위에서 받아온 정보와(stats) gender의 필터 값을 받아와 gender인 것만 필터링 해주고 map을 통하여 count만 가져온 뒤 reduce 메서드를 이용하여 count 값을 전부 더한 값을 data에 넣어주어 gender 필터 값에 따라 성별 그래프가 바뀌도록 해준다.(src/components/chart)
 - 다른 그래프 들도 필터의 값을 받아와 경우에 따라 다른 data를 Chart에 넣어준다.

# 실행 가이드
 - git clone https://github.com/Qndtl/Patient.git
 - cd Patient
 - npm install
 - npm run dev