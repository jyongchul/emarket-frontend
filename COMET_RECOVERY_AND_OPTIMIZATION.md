# Perplexity Comet 복구 검증 및 최적화 측정 통합 작업 지시서

**프로젝트**: E-MARKET
**작성일**: 2025-11-09 20:25 (KST)
**작성자**: Claude Code
**실행자**: Perplexity Comet
**현재 상태**: 🔴 WordPress Backend 복구 대기 중
**목표**: 복구 검증 → 성능 측정 → 96-98/100 달성

---

## 📋 작업 개요

### 목적
1. **Phase 1**: 복구 스크립트 실행 후 시스템 정상화 검증 (5분)
2. **Phase 2**: 성능 및 보안 상세 측정 → 96-98/100 달성 방안 도출 (25-30분)

### 총 예상 소요 시간
**30-35분**

### 실행 시점
⚠️ **서버 관리자가 복구 스크립트 실행 완료 후 즉시 시작**

```bash
# 서버 관리자 수행 (필수 선행 작업)
cd /mnt/c/EMARKET
sudo ./scripts/cloudflare_tunnel_fix.sh
# 복구 완료 후 → Perplexity Comet 작업 시작
```

---

## 🚨 Phase 1: 긴급 복구 검증 (5분)

### 목적
복구 스크립트 실행 후 WordPress Backend와 Frontend가 정상화되었는지 브라우저로 직접 확인

### Task 1-1: WordPress Backend 직접 접근 확인 (2분)

**절차**:
```
1. 브라우저 새 탭 열기 (시크릿 모드 권장)

2. WordPress 메인 URL 접속
   https://wp-emarket.whmarketing.org/

3. 결과 확인:
   ✅ 정상: WordPress 로그인 페이지 또는 메인 페이지 표시
   ❌ 에러: 여전히 Cloudflare Error 1033 또는 HTTP 530

4. WordPress API 접속
   https://wp-emarket.whmarketing.org/wp-json/

5. 결과 확인:
   ✅ 정상: JSON 데이터 표시 {"name":"E-MARKET",...}
   ❌ 에러: 에러 페이지 또는 빈 화면

6. WooCommerce API 접속
   https://wp-emarket.whmarketing.org/wp-json/wc/v3/products

7. 결과 확인:
   ✅ 정상: 제품 목록 JSON 데이터 표시
   ❌ 에러: 401 Unauthorized (정상, 인증 필요)

8. F12 → Network 탭에서 HTTP 상태 코드 확인
   - 200: 완벽
   - 401: 정상 (인증 필요)
   - 530/1033: 복구 실패
```

**기록할 내용**:
```markdown
## WordPress Backend 복구 검증

### WordPress 메인 페이지
- URL: https://wp-emarket.whmarketing.org/
- 상태: ✅ 정상 / ❌ 에러
- HTTP 코드: [200/530/1033]
- 스크린샷: [첨부]

### WordPress API
- URL: https://wp-emarket.whmarketing.org/wp-json/
- 상태: ✅ 정상 / ❌ 에러
- HTTP 코드: [200/530]
- 응답 내용: [JSON 일부 복사]

### WooCommerce API
- URL: https://wp-emarket.whmarketing.org/wp-json/wc/v3/products
- 상태: ✅ 정상 / ❌ 에러
- HTTP 코드: [200/401/530]
```

---

### Task 1-2: Frontend 정상 작동 확인 (2분)

**절차**:
```
1. Frontend 메인 페이지 접속
   https://emarket-frontend-one.vercel.app/

2. 페이지 로딩 확인:
   ✅ 정상: 메인 페이지 표시
   ❌ 에러: "Application error" 또는 빈 화면

3. 제품 페이지 접속
   https://emarket-frontend-one.vercel.app/products

4. 제품 데이터 로딩 확인:
   ✅ 정상: 4개 이상의 제품 카드 표시
   ❌ 에러: "Loading..." 상태 고정 또는 에러 메시지

5. 제품 이미지 로딩 확인:
   ✅ 정상: 모든 제품 이미지 표시
   ❌ 에러: 이미지 깨짐 또는 placeholder

6. F12 → Console 탭 확인:
   ✅ 정상: 에러 메시지 없음
   ❌ 에러: 빨간색 에러 메시지 (복사)

7. F12 → Network 탭 → Fetch/XHR 필터:
   - wp-json 관련 요청 확인
   - 상태 코드: 200 (정상) / 530 (에러)
```

**기록할 내용**:
```markdown
## Frontend 정상 작동 확인

### 메인 페이지
- URL: https://emarket-frontend-one.vercel.app/
- 상태: ✅ 정상 / ❌ 에러
- 로딩 시간: __초

### 제품 페이지
- URL: https://emarket-frontend-one.vercel.app/products
- 표시된 제품 수: __개
- 이미지 로딩: ✅ 정상 / ❌ 에러
- 스크린샷: [첨부]

### Console 에러
- ✅ 에러 없음
- ❌ 에러 발견: [복사]

### API 요청 상태
| API 엔드포인트 | HTTP 코드 | 응답 시간 |
|---------------|----------|----------|
| /wp-json/wc/v3/products | [200/530] | __ms |
| /api/products | [200/500] | __ms |
```

---

### Task 1-3: 장바구니 및 체크아웃 재검증 (1분)

**절차**:
```
1. 제품 페이지에서 "Add to Cart" 클릭

2. 장바구니 카운트 증가 확인:
   ✅ 정상: 우측 상단 카운트 +1
   ❌ 에러: 카운트 변화 없음

3. Cart 페이지 접속
   https://emarket-frontend-one.vercel.app/cart

4. 장바구니 항목 표시 확인:
   ✅ 정상: 추가한 제품 표시
   ❌ 에러: 빈 장바구니

5. "Proceed to Checkout" 클릭

6. 체크아웃 폼 표시 확인:
   ✅ 정상: 이름/주소/결제 정보 입력 폼
   ❌ 에러: 에러 메시지 또는 빈 화면
```

**기록할 내용**:
```markdown
## 장바구니 및 체크아웃 재검증

### 장바구니 기능
- "Add to Cart" 작동: ✅ 정상 / ❌ 에러
- 카운트 증가: ✅ 정상 / ❌ 에러
- Cart 페이지: ✅ 정상 / ❌ 에러

### 체크아웃 기능
- "Proceed to Checkout" 작동: ✅ 정상 / ❌ 에러
- 입력 폼 표시: ✅ 정상 / ❌ 에러

### 스크린샷
1. Cart 페이지 (제품 표시)
2. Checkout 페이지 (입력 폼)
```

---

## 📊 Phase 2: 성능 및 보안 상세 측정 (25-30분)

### 목적
**복구 완료 후** 시스템 성능과 보안을 정밀 측정하여 96-98/100 달성을 위한 구체적인 최적화 항목 도출

⚠️ **Phase 1 완료 및 복구 성공 확인 후 진행**

---

### Task 2-1: Lighthouse 전체 측정 (Desktop + Mobile) (10분)

**절차**:
```
1. Chrome 시크릿 모드 열기

2. https://emarket-frontend-one.vercel.app 접속

3. F12 → Lighthouse 탭

4. Desktop 측정:
   - Device: Desktop
   - Categories: Performance, Accessibility, Best Practices, SEO 모두 선택
   - "Analyze page load" 클릭
   - 결과 대기 (1-2분)
   - 전체 화면 스크린샷 저장

5. Mobile 측정:
   - Device: Mobile
   - Categories: 모두 선택
   - "Analyze page load" 클릭
   - 결과 대기 (1-2분)
   - 전체 화면 스크린샷 저장

6. Performance 세부 지표 기록:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Total Blocking Time (TBT)
   - Cumulative Layout Shift (CLS)
   - Speed Index

7. Opportunities 섹션 확인:
   - 개선 기회 항목 (예: 이미지 최적화, JS 최소화)
   - 예상 절감 시간
```

**기록할 내용**:
```markdown
## Lighthouse 점수

| 항목 | Desktop | Mobile | 평균 |
|------|---------|--------|------|
| Performance | __/100 | __/100 | __/100 |
| Accessibility | __/100 | __/100 | __/100 |
| Best Practices | __/100 | __/100 | __/100 |
| SEO | __/100 | __/100 | __/100 |

### Desktop Performance 세부 지표
- First Contentful Paint: __s
- Largest Contentful Paint: __s
- Total Blocking Time: __ms
- Cumulative Layout Shift: __
- Speed Index: __s

### Mobile Performance 세부 지표
- First Contentful Paint: __s
- Largest Contentful Paint: __s
- Total Blocking Time: __ms
- Cumulative Layout Shift: __
- Speed Index: __s

### 개선 기회 (Opportunities)
1. [항목명]: 예상 절감 __s
2. [항목명]: 예상 절감 __s
3. [항목명]: 예상 절감 __s

### 진단 (Diagnostics)
1. [이슈명]: [설명]
2. [이슈명]: [설명]

### 스크린샷
- Desktop Lighthouse 결과 (전체 화면)
- Mobile Lighthouse 결과 (전체 화면)
```

---

### Task 2-2: Network 성능 측정 (10분)

**절차**:
```
1. Chrome DevTools → Network 탭

2. "Disable cache" 체크 (중요!)

3. 페이지 새로고침 (Cmd+Shift+R / Ctrl+Shift+R)

4. 로딩 완료 대기

5. 하단 Summary 확인:
   - DOMContentLoaded 시간
   - Load 시간
   - 총 요청 수
   - 총 다운로드 크기

6. Fetch/XHR 필터 클릭:
   - API 요청 목록 확인
   - 각 요청의 응답 시간 기록

7. Img 필터 클릭:
   - 이미지 요청 목록
   - 큰 이미지 (>500KB) 확인

8. Waterfall 뷰 스크린샷:
   - 전체 로딩 타임라인
   - 병목 지점 확인

9. 느린 리소스 확인:
   - Time 열 기준 정렬
   - 1000ms 이상 소요된 리소스 확인
```

**기록할 내용**:
```markdown
## Network 성능 측정

### 전체 로딩 시간
- DOMContentLoaded: __ms
- Load: __ms
- Finish: __ms
- 총 요청 수: __개
- 총 다운로드 크기: __MB

### API 응답 시간
| API 엔드포인트 | 크기 | 시간 | 상태 |
|---------------|------|------|------|
| /wp-json/wc/v3/products | __KB | __ms | [200] |
| /api/products | __KB | __ms | [200] |
| /api/image/... | __KB | __ms | [200] |

### 느린 리소스 (>1000ms)
| 파일명 | 크기 | 시간 | 타입 |
|--------|------|------|------|
| [파일명] | __KB | __ms | [JS/CSS/Image] |
| [없으면 "없음"이라고 기재] |

### 큰 리소스 (>500KB)
| 파일명 | 크기 | 시간 | 타입 |
|--------|------|------|------|
| [파일명] | __MB | __ms | [Image/JS] |
| [없으면 "없음"이라고 기재] |

### 스크린샷
- Network Waterfall (전체 타임라인)
- API 요청 상세
```

---

### Task 2-3: 보안 측정 (Mozilla Observatory) (5-10분)

**절차**:
```
1. https://observatory.mozilla.org/ 접속

2. URL 입력란에 다음 입력:
   emarket-frontend-one.vercel.app

3. "Scan Me" 버튼 클릭

4. 스캔 대기 (1-2분)

5. 결과 확인:
   - 전체 점수 (0-100)
   - 등급 (A+, A, B, C, D, F)

6. 실패한 테스트 확인:
   - Content Security Policy
   - Cookies
   - Cross-origin Resource Sharing
   - HTTP Strict Transport Security
   - Referrer Policy
   - Subresource Integrity
   - X-Content-Type-Options
   - X-Frame-Options

7. 각 테스트 항목 클릭하여 상세 설명 확인

8. 전체 화면 스크린샷 저장

9. Chrome DevTools → Security 탭 확인:
   - Certificate 상태
   - Protocol (TLS 버전)
   - Mixed Content 확인
```

**기록할 내용**:
```markdown
## 보안 측정 (Mozilla Observatory)

### 전체 점수
- **점수**: __/100
- **등급**: [A+/A/B/C/D/F]

### 통과한 테스트
1. [테스트명]
2. [테스트명]

### 실패한 테스트
1. [테스트명]: [설명 및 권장 조치]
2. [테스트명]: [설명 및 권장 조치]

### 경고 (Warning)
1. [경고명]: [설명]

### Chrome Security 탭
- **Certificate**: Valid / Invalid
- **Protocol**: TLS 1.3 / TLS 1.2
- **Mixed Content**: ✅ 없음 / ❌ 있음

### 누락된 보안 헤더
- [ ] Content-Security-Policy
- [ ] X-Frame-Options
- [ ] X-Content-Type-Options
- [ ] Referrer-Policy
- [ ] Permissions-Policy
- [ ] 모두 존재

### 스크린샷
- Mozilla Observatory 결과 (전체 화면)
- Chrome Security 탭
```

---

## 📋 최종 통합 보고서 양식

```markdown
# E-MARKET 복구 검증 및 성능 측정 최종 보고서

**작성일**: 2025-11-09 __:__ (KST)
**작성자**: Perplexity Comet
**소요 시간**: __분

---

## 🚨 Phase 1: 복구 검증 결과

### WordPress Backend 복구 상태
- WordPress 메인 페이지: ✅ 정상 / ❌ 에러
- WordPress API: ✅ 정상 / ❌ 에러
- WooCommerce API: ✅ 정상 / ❌ 에러

### Frontend 복구 상태
- 메인 페이지: ✅ 정상 / ❌ 에러
- 제품 페이지: ✅ 정상 / ❌ 에러
- 장바구니: ✅ 정상 / ❌ 에러
- 체크아웃: ✅ 정상 / ❌ 에러

### 복구 성공 여부
- [ ] ✅ 완전 복구 성공 (모든 기능 정상)
- [ ] 🟡 부분 복구 (일부 기능만 정상)
- [ ] ❌ 복구 실패 (여전히 에러)

---

## 📊 Phase 2: 성능 및 보안 측정 결과

### Lighthouse 점수 요약
| 항목 | Desktop | Mobile | 평균 |
|------|---------|--------|------|
| Performance | __/100 | __/100 | __/100 |
| Accessibility | __/100 | __/100 | __/100 |
| Best Practices | __/100 | __/100 | __/100 |
| SEO | __/100 | __/100 | __/100 |

### Network 성능 요약
- 페이지 로딩: __ms
- API 평균 응답: __ms
- 느린 리소스: __개
- 큰 리소스: __개

### 보안 점수
- Mozilla Observatory: __/100 (등급: __)
- 실패한 테스트: __개
- 누락된 보안 헤더: __개

---

## 🎯 현재 시스템 점수 분석

### 강점 (95점 이상)
1. [항목]: __/100
2. [항목]: __/100

### 개선 필요 (95점 미만)
1. [항목]: __/100
   - 원인: [설명]
   - 해결책: [설명]
2. [항목]: __/100
   - 원인: [설명]
   - 해결책: [설명]

---

## 💡 Top 5 최적화 제안

### 1. [최적화 항목] ⭐⭐⭐⭐⭐
- **현재 점수**: __/100
- **예상 개선**: +__점
- **방법**:
  - [ ] [단계 1]
  - [ ] [단계 2]
- **소요 시간**: __시간
- **난이도**: 낮음/중간/높음
- **ROI**: 높음/중간/낮음

### 2. [최적화 항목] ⭐⭐⭐⭐
- **현재 점수**: __/100
- **예상 개선**: +__점
- **방법**:
  - [ ] [단계 1]
  - [ ] [단계 2]
- **소요 시간**: __시간
- **난이도**: 낮음/중간/높음
- **ROI**: 높음/중간/낮음

### 3. [최적화 항목] ⭐⭐⭐⭐
- **현재 점수**: __/100
- **예상 개선**: +__점
- **방법**:
  - [ ] [단계 1]
  - [ ] [단계 2]
- **소요 시간**: __시간
- **난이도**: 낮음/중간/높음
- **ROI**: 높음/중간/낮음

### 4. [최적화 항목] ⭐⭐⭐
- **현재 점수**: __/100
- **예상 개선**: +__점
- **방법**:
  - [ ] [단계 1]
  - [ ] [단계 2]
- **소요 시간**: __시간
- **난이도**: 낮음/중간/높음
- **ROI**: 높음/중간/낮음

### 5. [최적화 항목] ⭐⭐⭐
- **현재 점수**: __/100
- **예상 개선**: +__점
- **방법**:
  - [ ] [단계 1]
  - [ ] [단계 2]
- **소요 시간**: __시간
- **난이도**: 낮음/중간/높음
- **ROI**: 높음/중간/낮음

---

## 📈 예상 점수 향상

### 현재 상태
- **전체 시스템**: 94.0/100 (복구 전 점수)
- **복구 후 점수**: __/100
- **Desktop Performance**: __/100
- **Mobile Performance**: __/100
- **Security**: __/100

### 개선 후 예상 (Top 5 적용 시)
- **Top 1 적용 시**: __/100
- **Top 1+2 적용 시**: __/100
- **Top 1+2+3 적용 시**: __/100
- **Top 1~5 모두 적용 시**: __/100

**총 예상 개선**: +__점

**96-98/100 달성 가능성**:
- [ ] ✅ 매우 높음 (Top 3만 적용)
- [ ] 🟡 보통 (Top 5 모두 적용)
- [ ] ❌ 어려움 (추가 최적화 필요)

---

## 📸 첨부 스크린샷 목록

### Phase 1: 복구 검증
1. WordPress 메인 페이지
2. WordPress API 응답
3. Frontend 제품 페이지
4. Cart 페이지
5. Checkout 페이지

### Phase 2: 성능 측정
6. Desktop Lighthouse 결과
7. Mobile Lighthouse 결과
8. Network Waterfall
9. Mozilla Observatory 결과
10. Chrome Security 탭

**총 스크린샷**: 10장

---

## ✅ 즉시 적용 가능한 최적화 (ROI 높음)

### 1-2시간 이내 적용 가능
1. [최적화 항목]
2. [최적화 항목]

### 1일 이내 적용 가능
1. [최적화 항목]
2. [최적화 항목]

### 권장하지 않음 (ROI 낮음)
1. [항목] - 이유: [설명]
2. [항목] - 이유: [설명]

---

## 🎯 최종 결론

### 복구 상태
- WordPress Backend: [완전 복구/부분 복구/복구 실패]
- Frontend: [정상/부분 정상/에러]
- 전체 시스템: [정상 작동/부분 작동/다운]

### 성능 상태
- Desktop: [우수/양호/보통/개선 필요]
- Mobile: [우수/양호/보통/개선 필요]
- 보안: [우수/양호/보통/개선 필요]

### 96-98/100 달성을 위한 권장 조치
1. [즉시 적용]: [항목]
2. [단기 적용]: [항목]
3. [중기 적용]: [항목]

---

**보고서 작성 완료**: 2025-11-09 __:__
**검토자**: Claude Code
**다음 단계**: Claude Code가 최적화 방법 구체적으로 제시
```

---

## ⚠️ 중요 사항

### 측정 환경 설정

**필수 조건**:
- Chrome 최신 버전 사용
- 시크릿 모드 권장 (확장 프로그램 영향 배제)
- 안정적인 인터넷 연결
- 백그라운드 탭 최소화
- **"Disable cache" 반드시 체크** (Network 탭)

### 정확한 측정을 위해

**권장 사항**:
- 각 측정을 2-3회 반복하여 평균값 기록
- 다른 대역폭 사용 프로그램 중지 (스트리밍, 다운로드 등)
- 측정 간 5분 간격 두기 (서버 부하 분산)

### 스크린샷 요구사항

**품질 기준**:
- 점수와 세부 지표가 모두 보이게
- 해상도 최소 1280x720
- 총 10장 필요 (Phase 1: 5장, Phase 2: 5장)
- 파일 형식: PNG 또는 JPG

---

## 🔄 작업 흐름

```
Step 1: 서버 관리자가 복구 스크립트 실행
        ↓
Step 2: 복구 완료 확인 (로그에서 "HTTP 200" 확인)
        ↓
Step 3: Perplexity Comet Phase 1 시작 (복구 검증, 5분)
        ↓
Step 4: 복구 성공 확인 → Phase 2 진행
        복구 실패 → Claude Code에게 보고 후 중단
        ↓
Step 5: Perplexity Comet Phase 2 진행 (성능 측정, 25-30분)
        ↓
Step 6: 최종 보고서 작성 및 Claude Code에게 전달
        ↓
Step 7: Claude Code가 최적화 방법 구체적으로 제시
        ↓
Step 8: 96-98/100 달성
```

---

## 📞 문의 및 지원

### 작업 중 문제 발생 시

**Phase 1에서 복구 실패 확인 시**:
- 즉시 작업 중단
- 복구 실패 증거 스크린샷 저장
- Claude Code에게 다음 정보 전달:
  - WordPress 메인 페이지 HTTP 코드
  - WordPress API HTTP 코드
  - Frontend Console 에러 메시지
  - Network 탭 실패한 요청

**Phase 2에서 측정 오류 발생 시**:
- 해당 측정만 건너뛰고 다음 단계 진행
- 오류 내용 기록
- 최종 보고서에 오류 내용 명시

---

## ✅ 작업 체크리스트

### 작업 시작 전 확인

- [ ] 서버 관리자가 복구 스크립트 실행 완료
- [ ] Chrome 브라우저 준비 (최신 버전)
- [ ] 인터넷 연결 안정적
- [ ] 30-35분 시간 확보
- [ ] 스크린샷 도구 준비

### Phase 1 체크리스트

- [ ] WordPress 메인 페이지 접속
- [ ] WordPress API 접속
- [ ] WooCommerce API 접속
- [ ] Frontend 메인 페이지 확인
- [ ] Frontend 제품 페이지 확인
- [ ] 장바구니 기능 테스트
- [ ] 체크아웃 기능 테스트
- [ ] 스크린샷 5장 저장

### Phase 2 체크리스트

- [ ] Lighthouse Desktop 측정
- [ ] Lighthouse Mobile 측정
- [ ] Network 성능 측정
- [ ] Mozilla Observatory 스캔
- [ ] Chrome Security 탭 확인
- [ ] 스크린샷 5장 저장

### 보고서 작성 체크리스트

- [ ] 모든 측정값 기록 완료
- [ ] Top 5 최적화 제안 작성
- [ ] 스크린샷 10장 첨부
- [ ] 예상 점수 향상 계산
- [ ] 96-98/100 달성 가능성 평가

---

## 🎯 이 작업의 목적

### Phase 1: 복구 검증
- WordPress Backend가 정상화되었는지 확인
- Frontend가 실시간 데이터를 로드하는지 확인
- 장바구니/체크아웃 기능이 작동하는지 확인

### Phase 2: 성능 측정
- 정확한 현재 성능 점수 파악 (Desktop/Mobile)
- API 응답 시간 및 로딩 성능 측정
- 보안 등급 확인
- **96-98/100 달성을 위한 구체적인 최적화 항목 도출**

### 최종 목표
**이 데이터를 바탕으로 Claude Code가 정확한 최적화 방법을 제시하여 96-98/100 달성!** 🚀

---

**작업 지시서 버전**: v1.0 (최종 통합본)
**작성일**: 2025-11-09 20:25 (KST)
**작성자**: Claude Code
**예상 소요 시간**: 30-35분 (Phase 1: 5분 + Phase 2: 25-30분)

---

**준비되셨으면 서버 복구 완료 후 즉시 시작해주세요!**

측정 결과를 위의 최종 통합 보고서 양식에 맞춰 작성해주시면,
Claude Code가 96-98/100 달성을 위한 최적화 방법을 구체적으로 제시하겠습니다.
