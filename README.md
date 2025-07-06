# Min Auth 프로젝트

이 프로젝트는 Next.js 기반의 최소한의 인증 기능을 구현한 웹 애플리케이션입니다.

## 개발 환경 설정

### 기술 스택

- **프레임워크**: Next.js 15.3.2 (App Router)  
- **언어**: TypeScript 5.x
- **스타일링**: TailwindCSS 4.x
- **인증**: NextAuth.js 4.24.11
- **데이터베이스**: Supabase
- **테스트**: Playwright 1.53.2

### 필수 환경 변수

`.env.local` 파일에 다음 환경 변수를 설정해야 합니다:

```
NEXTAUTH_URL=http://localhost:3100
NEXTAUTH_SECRET=your-secret-key

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

KAKAO_CLIENT_ID=your-kakao-client-id
KAKAO_CLIENT_SECRET=your-kakao-client-secret
```

### 설치 및 실행

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npm run dev
```

3. 브라우저에서 [http://localhost:3100](http://localhost:3100) 접속

### 테스트

```bash
# 모든 테스트 실행
npm run test

# UI 모드로 테스트 실행
npm run test:ui

# 디버그 모드로 테스트 실행
npm run test:debug

# 테스트 리포트 확인
npm run test:report
```

## 구현된 기능

### 인증 기능

- **이메일/비밀번호 로그인**: Supabase 인증을 통한 자격 증명 로그인
- **소셜 로그인**: 카카오 로그인 연동
- **회원가입**: 이메일/비밀번호를 통한 회원가입
- **로그아웃**: 세션 종료 및 홈페이지 리디렉션
- **인증 상태 관리**: NextAuth.js를 활용한 세션 관리

### UI/UX 기능

- **모달 로그인**: 인터셉트 라우팅을 통한 모달 형태의 로그인 UI
- **반응형 디자인**: 모바일 및 데스크톱 환경 지원
- **에러 처리**: 로그인 실패 시 사용자 친화적인 에러 메시지 표시
- **로딩 상태**: 로그인 진행 중 로딩 상태 표시

### 테스트

- **E2E 테스트**: Playwright를 활용한 종단간 테스트
- **로그인 테스트**: 유효한/유효하지 않은 자격 증명 테스트
- **UI 요소 테스트**: 모달, 버튼, 에러 메시지 등 UI 요소 테스트
- **인증 흐름 테스트**: 로그인, 로그아웃 등 인증 흐름 테스트

## 배포 가이드

이 프로젝트는 Vercel을 통해 간편하게 배포할 수 있습니다.

### Vercel 배포 방법

1. [Vercel 플랫폼](https://vercel.com/new)에 로그인합니다.
2. 이 레포지토리를 연결하고 임포트합니다.
3. 필요한 환경 변수를 추가합니다.
   - `NEXTAUTH_URL`: 배포된 도메인 URL
   - `NEXTAUTH_SECRET`: 안전한 랜덤 문자열
   - `NEXT_PUBLIC_SUPABASE_URL`: Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key
   - `KAKAO_CLIENT_ID`: 카카오 앱 클라이언트 ID
   - `KAKAO_CLIENT_SECRET`: 카카오 앱 클라이언트 시크릿
4. 배포를 시작합니다.

자세한 배포 정보는 [Next.js 배포 문서](https://nextjs.org/docs/deployment)를 참조하세요.
