# Walkie Doggie

## 프로젝트 기획 의도

---

![](/readme.assets/Untitled.png)

- 반려동물 양육가구는 늘어가는 추세
- 그 중 제일 많은 수를 차지하는 강아지를 위한, 강아지 입장에서 쓸 수 있는 서비스를 만들고자 함
- 산책의 중요성
    - 스트레스 해소
    - 사회성 기르기
    - 건강 유지 및 체력 기르기
    - 주인과의 유대관계 형성

## 프로젝트 소개

---

- **진행 기간** : 2021. 04. 12 ~ 2021. 05. 28
- **Daily Scrum :** 매일 오전 오후 30분
- **프로젝트 설명**

    강아지들과 견주들을 위한 위치기반 종합 서비스

    **일기장, 산책, 성분분석 등**

## 실행방법

---

```bash
frontend/final
> npm install
> npm run serve

backend
> ./mvnw spring-boot:run
```

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/npm_run_serve.PNG)

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/Spring.png)

## 폴더 구조

---

### 📦backend

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/%EB%B0%B1%EC%97%94%EB%93%9C%EA%B5%AC%EC%A1%B0.PNG)

### 📦frontend

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/%ED%94%84%EB%A1%A0%ED%8A%B8%EA%B5%AC%EC%A1%B0.PNG)

## 시스템 아키텍처

---

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/Untitled%201.png)

## ERD

---

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/ERD.PNG)

## 와이어프레임

---

### 1. 로그인/ 회원가입 UI

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/Untitled%202.png)

### 2. 일기 UI

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/Untitled%203.png)

### 3. 산책 UI

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/Untitled%204.png)

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/Untitled%205.png)

### 4. 성분 분석 UI

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/Untitled%206.png)

### 5. 마이페이지 UI

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/Untitled%207.png)

### 6. 건강/ 통계 UI

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/Untitled%208.png)

## 주요 기능 설명 및 실제 화면

---

### 🌈 **기록일지**

- 강아지별 일기 작성
- 산책기록 확인

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/%EA%B8%B0%EB%A1%9D%EC%9D%BC%EC%A7%80.png)

### 🛴 **산책**

- 실시간 산책 경로 표시 및 현재 위치 좋아요 후 사진 업로드
- 다른 사람들의 게시글도 지도에서 위치와 함께 확인 가능

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/%EC%82%B0%EC%B1%851.png)

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/%EC%82%B0%EC%B1%852.png)

### ⚡**성분분석**

- 사료, 간식 등의 성분표 사진을 OCR을 사용해 분석
- 강아지가 가지고 있는 알러지와 매치시켜 보여줌
- 유해성분 포함여부와 설명

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/%EC%84%B1%EB%B6%84%EB%B6%84%EC%84%9D.png)

### 👶 마이페이지

- 최대 세마리 반려견 등록가능
- 일기에서 기록한 날짜별 건강사항 확인
- 나와 지역내 평균 산책 데이터 차트로 확인

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/%EB%A1%9C%EA%B7%B8%EC%9D%B8_%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.png)

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80.png)

## 팀원 소개

![](https://lab.ssafy.com/s04-final/s04p31c106/raw/backend/readme.assets/%ED%8C%80%EC%9B%90%EC%86%8C%EA%B0%9C.PNG)
