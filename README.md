# FrontQuiz

프론트엔드 개발자를 위한 퀴즈 학습 플랫폼

 JavaScript, React, TypeScript 등 다양한 기술 스택에 대한 퀴즈를 풀고, 학습 통계를 확인하며, 커뮤니티에서 정보를 공유할 수 있는 웹 애플리케이션입니다.

---

## 배포사이트

[사이트로 이동하기](https://www.front-quiz-pro.store/)

## ✨ 주요 기능

### 1. 퀴즈 풀기

#### meta-llama/llama-4-maverick 모델을 사용하여 문제를 AI를 통해 생성 및 채점

- 다양한 프론트엔드 토픽 선택후 문제풀기 (React, TypeScript, JavaScript 등)

- 난이도를 선택가능하여 난이도별 퀴즈 제공 

- 채점 및 해설제공

- 오답문제 저장 기능을 통해 마이페이지에서 확인가능

### 2. 마이페이지 풀었던 문제 통계

- 전체/카테고리별/난이도별 통계 확인

### 3. 마이페이지 오답노트

- 저장된 오답문제의 내가 선택했던 답, 정답 , 해설을 확인가능

- 카테고리 및 난이도별 필터링

- 오답 삭제 기능

- 질문하고싶은 오답문제를 바로 커뮤니티에 질문가능

### 4. 마이페이지 유저정보수정

- 닉네임 및 프로필이미지 변경기능

### 5. 커뮤니티

- 게시글 작성/수정/삭제

- 댓글 작성/삭제

- 정보/질문 카테고리별 게시글 필터링

- Debounce를 적용한 검색 기능



## 🛠 기술 스택

### Core

- **React 19** - UI 라이브러리

- **TypeScript** - 타입 안정성

- **Vite** - 빌드 도구 및 개발 서버

### 라우팅

- **React Router v7** - 클라이언트 사이드 라우팅

### 상태 관리

- **Zustand** - 경량 전역 상태 관리


- **TanStack React Query v5** - 서버 상태 관리 및 캐싱

### HTTP 클라이언트

- **Axios** - HTTP 요청 처리

  - Public API 인스턴스 (재시도 로직 포함)

  - Private API 인스턴스 (토큰 자동 갱신)

  - Kakao OAuth 인스턴스

### 스타일링

- **Tailwind CSS v4** - 유틸리티 기반 CSS 프레임워크

- **Motion (Framer Motion)** - 애니메이션 라이브러리

### 폼 관리

- **React Hook Form** - 폼 상태 관리 및 유효성 검사

### 기타

- **React Markdown** - 마크다운 렌더링

- **Rehype Highlight** - 코드 하이라이팅

## 📁 프로젝트 구조

```

front-quiz/

├── src/

│   ├── apis/              # API 인스턴스

│   │   ├── instance.ts           # Public API

│   │   ├── privateInstance.ts    # Private API (인증 필요)

│   │   └── kakaoAuthInstance.ts  # Kakao OAuth

│   ├── assets/            # 정적 리소스

│   ├── components/        # 공통 컴포넌트

│   │   ├── ui/            # UI 컴포넌트

│   │   ├── Modal/         # 모달 컴포넌트

│   │   ├── Dropdown/      # 드롭다운 컴포넌트

│   │   └── ...

│   ├── constants/         # 상수 정의

│   ├── contexts/          # React Context

│   ├── features/          # 기능별 모듈

│   │   ├── quizComp/      # 퀴즈 기능

│   │   ├── Community/     # 커뮤니티 기능

│   │   └── myPage/        # 마이페이지 기능

│   ├── hooks/             # 커스텀 훅

│   ├── page/              # 페이지 컴포넌트

│   ├── store/             # Zustand 스토어

│   ├── types/             # TypeScript 타입 정의

│   ├── utils/             # 유틸리티 함수

│   ├── App.tsx            # 라우팅 설정

│   └── main.tsx           # 진입점

├── public/                # 정적 파일

└── package.json

```



## 📖 주요 기능 상세

### 1. 퀴즈 풀기 기능

**핵심 스택:**

- **Zustand** (`useQuizStore`, `useOptionStore`) - 퀴즈 상태 및 옵션 관리

- **Axios** (`instance`) - 퀴즈 생성 및 채점 API 호출

- **Axios** (`privateInstance`) - 통계 저장 API 호출

- **React Query** - 서버 상태 캐싱 및 관리

**주요 기능:**

- 카테고리 및 난이도 선택

- AI 기반 퀴즈 생성

- 실시간 채점 및 피드백

- 오답 자동 저장

- 통계 데이터 자동 업데이트

**관련 파일:**

- `src/features/quizComp/QuizScreen.tsx`

- `src/features/quizComp/hooks/useQuiz.ts`

- `src/store/useQuizStore.ts`

- `src/store/useOptionStore.ts`

### 2. 커뮤니티 기능

**핵심 스택:**

- **React Query** - 게시글 데이터 페칭 및 캐싱

- **Axios** (`instance`) - CRUD API 호출

- **Zustand** (`useToastStore`) - 알림 메시지 관리

- **React Hook Form** - 게시글 작성/수정 폼 관리

- **React Markdown** - 마크다운 게시글 렌더링

- **Rehype Highlight** - 코드 블록 하이라이팅


**관련 파일:**

- `src/features/Community/CommunityMain.tsx`

- `src/features/Community/CommunityDetail.tsx`

- `src/features/Community/CommunityForm.tsx`

- `src/features/Community/hooks/useCommunity.ts`

### 3. 학습 통계 기능



**주요 기능:**

- 전체 통계 조회

- 카테고리별 통계

- 난이도별 통계

- 시각화된 통계 차트

**관련 파일:**

- `src/features/myPage/UserStatistics/UserStatistics.tsx`

- `src/features/quizComp/hooks/useQuiz.ts` (getUserStatistics)

### 4. 오답노트 기능



**주요 기능:**

- 오답 자동 저장

- 오답 목록 조회 (무한 스크롤)

- 카테고리/난이도 필터링

- 오답 삭제

- 오답 문제 재풀기

**관련 파일:**

- `src/features/myPage/IncorrectAnswers/IncorrectAnswer.tsx`

- `src/features/quizComp/hooks/useQuiz.ts` (getIncorrectAnswers, handleDeleteIncorrect)

### 5. 사용자 인증 기능



**주요 기능:**

- 카카오 OAuth 로그인

- 자동 토큰 갱신

- 로그아웃

- 보호된 라우트 접근 제어

**관련 파일:**

- `src/page/KakaoCallback.tsx`

- `src/apis/kakaoAuthInstance.ts`

- `src/apis/privateInstance.ts`

- `src/components/ProtectedRoute.tsx`

- `src/store/useUserStore.ts`

### 6. UI 컴포넌트 시스템


**주요 컴포넌트:**

- Modal (Context 기반 컴포넌트 조합)

- Dropdown (Context 기반 컴포넌트 조합)

- Toast (전역 알림 시스템)

- Skeleton (로딩 상태 UI)

- Button, Card 등 재사용 가능한 UI 컴포넌트

**관련 파일:**

- `src/components/Modal/`

- `src/components/ui/Dropdown/`

- `src/components/ui/Toast/`

- `src/contexts/ModalContext.tsx`

- `src/contexts/DropdownContext.tsx`
