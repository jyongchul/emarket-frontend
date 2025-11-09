# 🚨 Perplexity Comet 긴급 진단 작업 지시서

**프로젝트**: E-MARKET
**발생 시각**: 2025-11-09 17:35 (KST)
**작성자**: Claude Code
**실행자**: Perplexity Comet
**심각도**: 🔴 **CRITICAL**
**예상 소요**: **5분**

---

## 🚨 긴급 상황

### 에러 발생
```
URL: https://emarket-frontend-one.vercel.app/
에러: Application error: a server-side exception has occurred
Digest: 4021864006
```

### 영향
- ❌ 프론트엔드 완전 다운
- ❌ 고객 접근 불가
- 🔴 **프로덕션 서비스 중단**

---

## 🎯 긴급 진단 작업 (총 5분)

---

## Task #1: 브라우저 에러 확인 (2분)

### 절차
```
1. https://emarket-frontend-one.vercel.app/ 접속
2. F12 → Console 탭
3. 빨간색 에러 메시지 모두 복사
4. F12 → Network 탭
5. 실패한 요청 (빨간색) 클릭
6. Response 탭 확인
7. 전체 화면 스크린샷
```

### 보고 양식
```markdown
## Browser Console 에러

### Console 메시지
[에러 메시지 전체 복사]

### Network 실패 요청
| URL | 상태 코드 | 에러 메시지 |
|-----|----------|-------------|
| [URL] | [404/500/503] | [메시지] |

### 스크린샷
[에러 화면 전체]
```

---

## Task #2: Vercel 배포 로그 확인 (2분)

### 절차
```
1. https://vercel.com/dashboard 접속
   - 계정: jyongchul@gmail.com
   - 비밀번호: (사용자 제공)

2. emarket-frontend-one 프로젝트 클릭

3. Deployments 탭 → 최신 배포 클릭

4. 배포 상태 확인:
   - Ready (성공)
   - Failed (실패)
   - Building (진행 중)

5. Logs 탭 클릭

6. Build Logs 확인 (빌드 과정 에러)

7. Runtime Logs 확인 (실행 중 에러)

8. 에러 메시지 복사
```

### 보고 양식
```markdown
## Vercel 배포 상태

### 최신 배포
- **상태**: Ready / Failed / Building
- **배포 시각**: [시각]
- **커밋**: [커밋 해시]

### Build Logs
[에러가 있다면 복사]

### Runtime Logs
[에러 메시지 복사]
```

---

## Task #3: WordPress API 확인 (1분)

### 절차
```
1. 새 탭에서 다음 URL 접속:
   https://wp-emarket.whmarketing.org/wp-json/wc/v3/products

2. 응답 확인:
   - JSON 데이터 표시 → 정상
   - 에러 메시지 → 문제 있음

3. HTTP 상태 코드 확인 (개발자 도구 → Network)

4. 추가 테스트:
   https://wp-emarket.whmarketing.org/wp-json/
```

### 보고 양식
```markdown
## WordPress API 상태

### /wp-json/wc/v3/products
- **상태**: 정상 / 에러
- **HTTP 코드**: 200 / 500 / 530
- **응답**: [JSON 데이터 일부 또는 에러 메시지]

### /wp-json/
- **상태**: 정상 / 에러
- **응답**: [내용]
```

---

## 📋 최종 긴급 보고서

```markdown
# E-MARKET 긴급 진단 결과

**진단 시각**: 2025-11-09 __:__
**진단자**: Perplexity Comet
**소요 시간**: __분

---

## 🔍 핵심 발견

### 문제 위치
- [ ] Frontend (Vercel)
- [ ] Backend (WordPress)
- [ ] 네트워크 연결

### 에러 유형
- [ ] 빌드 실패
- [ ] 런타임 에러
- [ ] API 연결 실패
- [ ] 환경 변수 문제

---

## 📊 상세 진단 결과

### Browser Console
[Task #1 결과 복사]

### Vercel 배포
[Task #2 결과 복사]

### WordPress API
[Task #3 결과 복사]

---

## 💡 예상 원인

[가장 가능성 높은 원인 1-3개]

1. [원인 1]
   - 증거: [로그/에러 메시지]
   - 가능성: 높음/중간/낮음

2. [원인 2]
   - 증거: [로그/에러 메시지]
   - 가능성: 높음/중간/낮음

---

## 🔧 즉시 시도 가능한 해결책

### 방법 1: [해결책 이름]
```
[단계별 실행 방법]
```
**예상 소요**: __분

### 방법 2: [해결책 이름]
```
[단계별 실행 방법]
```
**예상 소요**: __분

---

## 📸 스크린샷

1. 에러 화면 (Browser)
2. Vercel 배포 로그
3. WordPress API 응답

---

**진단 완료 시각**: __:__
**다음 단계**: Claude Code에게 전달하여 복구 방법 수립
```

---

## ⚠️ 중요 참고사항

### 시간 제약
- **목표**: 5분 이내 진단 완료
- **우선순위**: Browser Console > Vercel Logs > WordPress API

### 필수 정보
진단 시 다음 정보 반드시 포함:
1. 정확한 에러 메시지 (전체 텍스트)
2. HTTP 상태 코드
3. 에러 발생 위치 (Frontend/Backend)

### 즉시 보고
진단 완료 즉시 Claude Code에게 보고하여 복구 작업 시작

---

## 🎯 예상 복구 시나리오

### 시나리오 A: WordPress API 다운 (가능성 30%)
**증상**: WordPress API 응답 없음 (500/530 에러)
**복구**: WordPress 재시작 (10분)

### 시나리오 B: Vercel 빌드 실패 (가능성 20%)
**증상**: Vercel 배포 상태 Failed
**복구**: 재배포 (5분)

### 시나리오 C: 환경 변수 문제 (가능성 15%)
**증상**: API URL 찾을 수 없음
**복구**: Vercel 환경 변수 재설정 (5분)

### 시나리오 D: Next.js 런타임 에러 (가능성 35%)
**증상**: 특정 컴포넌트에서 에러
**복구**: 코드 수정 필요 (30분-1시간)

---

## ✅ 체크리스트

진단 시작 전:
- [ ] https://emarket-frontend-one.vercel.app/ 접근 가능
- [ ] Vercel 계정 로그인 정보 확보
- [ ] 5분 시간 확보
- [ ] 스크린샷 도구 준비

---

**작업 시작**: 즉시
**예상 소요**: 5분
**목표**: 에러 원인 정확히 파악

**복구는 진단 완료 후 Claude Code가 주도합니다!**

---

**작성 시각**: 2025-11-09 17:37 (KST)
**작성자**: Claude Code
**긴급도**: 🔴 **CRITICAL**
