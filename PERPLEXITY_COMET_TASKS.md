# Perplexity Comet 작업 지시서

작성일: 2025-11-08
**최종 업데이트**: 2025-11-09 13:50 (KST)
프로젝트: E-MARKET (Headless WooCommerce + Next.js)
담당: Perplexity Comet

## 🔴 긴급 알림

**WordPress 백엔드 완전 다운 상태** (발견: 2025-11-09 13:50)
→ **작업 #8 (WordPress 백엔드 긴급 복구)를 즉시 최우선으로 진행하세요**

---

## 📋 배경 정보

### 프로젝트 개요
- **프론트엔드**: Next.js 14 (App Router) @ Vercel ✅ **정상**
- **백엔드**: WordPress + WooCommerce @ Cloudflare Tunnel ❌ **다운**
- **상태**: 🔴 **긴급** - 백엔드 완전 다운, 즉시 복구 필요

### 완료된 작업 (Claude Code)
1. ✅ 이미지 로딩 수정 (Cloudflare Tunnel URL 적용)
2. ✅ 계좌 정보 표시 기능 추가
3. ✅ 환경 변수 문서화
4. ✅ GitHub 푸시 완료
5. ✅ Vercel 자동 배포 완료

### 완료된 검증 (Perplexity Comet - 이전)
1. ✅ 이미지 로딩: 정상
2. ✅ 성능: PageSpeed 100/100
3. ✅ 계좌 정보: 정상 표시
4. ✅ 장바구니: 정상 작동
5. ✅ 모바일 반응형: 완벽

---

## 🎯 의뢰 작업 목록

Claude Code가 직접 수행할 수 없는 작업들을 Perplexity Comet에게 의뢰합니다.

---

### 작업 #1: 실제 주문 프로세스 전체 테스트

**목적**: 실제 사용자 관점에서 처음부터 끝까지 주문 프로세스 검증

**테스트 시나리오**:

1. **홈페이지 접속**
   - Vercel 배포 URL 접속
   - 초기 로딩 속도 체감 확인
   - 제품 목록 정상 표시 확인

2. **제품 탐색**
   - 여러 제품 클릭하여 상세 페이지 이동
   - 이미지 로딩 품질 확인
   - 제품 설명 가독성 확인

3. **장바구니 추가**
   - 최소 3개 이상 제품 추가
   - 수량 변경 테스트 (1→3→2)
   - 제품 삭제 테스트

4. **체크아웃 프로세스**
   - 배송 정보 입력 (한글/영문 혼합)
   - 결제 방법 선택 (무통장 입금)
   - **계좌 정보 표시 확인** (국민은행 805901-04-314273)
   - 주문 완료 메시지 확인

5. **예외 처리 테스트**
   - 빈 장바구니 상태에서 체크아웃 시도
   - 필수 입력 필드 누락 시 에러 메시지 확인
   - 잘못된 이메일 형식 입력

**검증 항목**:
- [ ] 전체 프로세스 완료 가능 여부
- [ ] 각 단계 로딩 시간 (3초 이내)
- [ ] 에러 메시지 명확성
- [ ] 계좌 정보 정확성 및 가시성
- [ ] UI/UX 직관성

**결과 보고 형식**:
```
## 실제 주문 프로세스 테스트 결과

### 성공 단계
1. ✅/❌ 홈페이지 접속 (로딩 시간: X초)
2. ✅/❌ 제품 탐색
3. ✅/❌ 장바구니 추가/수정
4. ✅/❌ 체크아웃 완료
5. ✅/❌ 예외 처리

### 발견된 문제
- 문제 1: [상세 설명]
- 문제 2: [상세 설명]

### UX 개선 제안
- 제안 1: [구체적 제안]
- 제안 2: [구체적 제안]

### 스크린샷
[중요 화면 캡처 첨부]
```

---

### 작업 #2: 다양한 디바이스 실제 테스트

**목적**: 반응형 디자인의 실제 디바이스 호환성 검증

**테스트 디바이스**:
1. **데스크톱**
   - Chrome (최신)
   - Firefox (최신)
   - Safari (가능한 경우)
   - Edge (최신)

2. **태블릿** (가능한 경우)
   - iPad / Android 태블릿
   - 가로/세로 모드 전환

3. **모바일**
   - iPhone (iOS)
   - Android 스마트폰
   - 가로/세로 모드 전환

**검증 항목**:
- [ ] 레이아웃 깨짐 없음
- [ ] 터치 인터랙션 정상 작동
- [ ] 버튼 크기 적절 (최소 44x44px)
- [ ] 텍스트 가독성 (최소 16px)
- [ ] 이미지 비율 유지
- [ ] 스크롤 성능

**결과 보고 형식**:
```
## 디바이스 호환성 테스트 결과

| 디바이스 | 브라우저 | 레이아웃 | 인터랙션 | 성능 | 이슈 |
|---------|---------|---------|---------|------|-----|
| Desktop | Chrome  | ✅      | ✅      | ✅   | -   |
| Desktop | Firefox | ✅      | ✅      | ✅   | -   |
| Mobile  | Safari  | ✅      | ✅      | ⚠️   | 로딩 느림 |

### 발견된 문제
[상세 설명 + 스크린샷]

### 개선 제안
[구체적 제안]
```

---

### 작업 #3: SEO 및 성능 최적화 검증

**목적**: 검색 엔진 최적화 및 실제 성능 측정

**검증 도구**:
1. **Google PageSpeed Insights**
   - Desktop 점수
   - Mobile 점수
   - Core Web Vitals

2. **Lighthouse (Chrome DevTools)**
   - Performance
   - Accessibility
   - Best Practices
   - SEO

3. **GTmetrix** (선택)
   - 전체 로딩 시간
   - 페이지 크기
   - 요청 수

**검증 항목**:
- [ ] LCP (Largest Contentful Paint) < 2.5초
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Meta tags 적절성
- [ ] Open Graph 설정
- [ ] 이미지 최적화 (WebP, lazy loading)

**결과 보고 형식**:
```
## SEO 및 성능 검증 결과

### PageSpeed Insights
- Desktop: XX/100
  - Performance: XX
  - Accessibility: XX
  - Best Practices: XX
  - SEO: XX

- Mobile: XX/100
  - Performance: XX
  - Accessibility: XX
  - Best Practices: XX
  - SEO: XX

### Core Web Vitals
- LCP: X.X초 (✅/⚠️/❌)
- FID: XXms (✅/⚠️/❌)
- CLS: X.XX (✅/⚠️/❌)

### 개선 권장사항
1. [권장사항 1]
2. [권장사항 2]

### 스크린샷
[Lighthouse 리포트 캡처]
```

---

### 작업 #4: 보안 점검

**목적**: 기본 보안 취약점 및 베스트 프랙티스 준수 확인

**검증 항목**:
1. **HTTPS 설정**
   - [ ] SSL 인증서 유효성
   - [ ] Mixed Content 없음
   - [ ] HSTS 헤더 설정

2. **헤더 보안**
   - [ ] X-Frame-Options
   - [ ] X-Content-Type-Options
   - [ ] Content-Security-Policy
   - [ ] X-XSS-Protection

3. **입력 검증**
   - [ ] XSS 방어 (스크립트 태그 입력 시도)
   - [ ] SQL Injection 방어 (테스트 가능한 범위)
   - [ ] CSRF 토큰 존재

4. **민감 정보 노출**
   - [ ] API 키 노출 없음
   - [ ] 에러 메시지 적절성
   - [ ] 개발 도구 흔적 없음

**검증 도구**:
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- Chrome DevTools Console

**결과 보고 형식**:
```
## 보안 점검 결과

### HTTPS 설정
- SSL 등급: A+ / A / B / C / F
- 문제점: [상세 설명]

### 보안 헤더
| 헤더 | 상태 | 권장 |
|------|------|------|
| X-Frame-Options | ✅/❌ | SAMEORIGIN |
| CSP | ✅/❌ | 설정 필요 |

### 취약점 테스트
- XSS: ✅/❌ (테스트 내용: ...)
- CSRF: ✅/❌
- 정보 노출: ✅/❌

### 심각도별 이슈
- 🔴 High: [이슈 목록]
- 🟡 Medium: [이슈 목록]
- 🟢 Low: [이슈 목록]

### 개선 권장사항
[우선순위별 정리]
```

---

### 작업 #5: 사용자 경험 (UX) 개선점 발굴

**목적**: 실제 사용자 관점에서 불편함 및 개선 기회 식별

**평가 영역**:
1. **첫인상**
   - 홈페이지 직관성
   - 브랜딩 일관성
   - 로딩 경험

2. **네비게이션**
   - 메뉴 찾기 쉬움
   - 검색 기능 (있는 경우)
   - 뒤로 가기 동작

3. **제품 탐색**
   - 제품 정보 충분성
   - 이미지 품질
   - 가격 명확성

4. **구매 프로세스**
   - 단계 명확성
   - 입력 편의성
   - 에러 처리 친절함

5. **전반적 느낌**
   - 신뢰감
   - 전문성
   - 속도감

**평가 방법**:
- 실제로 처음 사용하는 사용자처럼 접근
- 각 동작마다 생각하는 과정 기록
- 혼란스러운 부분 스크린샷 첨부

**결과 보고 형식**:
```
## UX 평가 결과

### 긍정적 요소 (👍)
1. [잘된 부분 1]
2. [잘된 부분 2]

### 개선 필요 요소 (💡)
1. **문제점**: [구체적 설명]
   - **위치**: [페이지/컴포넌트]
   - **영향도**: High / Medium / Low
   - **제안**: [개선 방안]
   - **스크린샷**: [첨부]

2. **문제점**: [구체적 설명]
   ...

### 우선순위별 개선 제안
#### 🔴 High Priority (사용자 이탈 가능)
- [제안 1]
- [제안 2]

#### 🟡 Medium Priority (사용성 개선)
- [제안 1]
- [제안 2]

#### 🟢 Low Priority (Nice-to-have)
- [제안 1]
- [제안 2]

### 전체 사용자 만족도 예상
⭐⭐⭐⭐⭐ (5점 만점)
[이유 설명]
```

---

### 작업 #6: 경쟁사 벤치마킹 (선택)

**목적**: 유사 서비스와 비교하여 차별화 포인트 및 부족한 부분 파악

**비교 항목**:
- 디자인 트렌드
- 기능 구성
- 성능 비교
- UX 패턴

**대상 사이트**: (유사한 가구/인테리어 쇼핑몰 3개)
1. [사이트 1 URL]
2. [사이트 2 URL]
3. [사이트 3 URL]

**결과 보고 형식**:
```
## 경쟁사 벤치마킹 결과

| 항목 | E-MARKET | 경쟁사 A | 경쟁사 B | 경쟁사 C |
|------|----------|----------|----------|----------|
| 로딩 속도 | X.Xs | X.Xs | X.Xs | X.Xs |
| 제품 정보 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 체크아웃 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

### E-MARKET의 강점
1. [강점 1]
2. [강점 2]

### E-MARKET이 배워야 할 점
1. [개선점 1]
2. [개선점 2]

### 차별화 전략 제안
[구체적 제안]
```

---

### 작업 #7: 🔗 Cloudflare + Vercel 연동 상태 검증 (신규 추가)

**목적**: Headless WordPress (Cloudflare) ↔ Next.js (Vercel) 연동 상태 종합 검증

**중요도**: 🔴 **HIGH** - 시스템 안정성에 직결

**배경**:
- **Backend**: WordPress + WooCommerce @ Cloudflare Tunnel (https://wp-emarket.whmarketing.org)
- **Frontend**: Next.js 14 @ Vercel (https://emarket-frontend-one.vercel.app)
- **연동 방식**: REST API (WordPress REST API + WooCommerce API)

---

#### 7-1. Cloudflare Tunnel 설정 검증

**검증 항목**:

1. **Tunnel 상태 확인**
   - [ ] Cloudflare Dashboard → Zero Trust → Access → Tunnels
   - [ ] Tunnel 이름: `wp-emarket` (또는 유사 이름)
   - [ ] 상태: 🟢 Healthy / 🔴 Down
   - [ ] Connector 상태 확인
   - [ ] Last Seen 시간 확인

2. **Public Hostname 설정**
   - [ ] Hostname: `wp-emarket.whmarketing.org`
   - [ ] Service Type: HTTP
   - [ ] URL: `http://localhost:포트번호` (WordPress 로컬 서버)
   - [ ] TLS 설정: ✅ Enabled

3. **DNS 설정 확인**
   - [ ] Cloudflare Dashboard → DNS → Records
   - [ ] Type: CNAME
   - [ ] Name: `wp-emarket`
   - [ ] Target: `[tunnel-id].cfargotunnel.com`
   - [ ] Proxy status: 🟠 Proxied (필수)

4. **SSL/TLS 설정**
   - [ ] Cloudflare Dashboard → SSL/TLS
   - [ ] Mode: Full (strict) 권장
   - [ ] SSL Certificate: Valid
   - [ ] HTTPS 리다이렉트: ✅ Always Use HTTPS

5. **보안 설정**
   - [ ] WAF (Web Application Firewall) 상태 확인
   - [ ] DDoS Protection 활성화 확인
   - [ ] Rate Limiting 설정 확인
   - [ ] Bot Fight Mode 상태 확인

**테스트 명령어**:
```bash
# Cloudflare Tunnel 연결 테스트
curl -I https://wp-emarket.whmarketing.org

# WordPress REST API 테스트
curl https://wp-emarket.whmarketing.org/wp-json/wp/v2

# WooCommerce API 테스트 (공개 엔드포인트)
curl https://wp-emarket.whmarketing.org/wp-json/wc/v3/products

# SSL 등급 확인
https://www.ssllabs.com/ssltest/analyze.html?d=wp-emarket.whmarketing.org
```

**보고 형식**:
```
## Cloudflare Tunnel 검증 결과

### Tunnel 상태
- 이름: [tunnel 이름]
- 상태: 🟢 Healthy / 🔴 Down
- Connector ID: [ID]
- Last Seen: [시간]

### DNS 설정
- CNAME 레코드: ✅/❌
- Proxy 상태: 🟠 Proxied / ⚪ DNS only
- 문제점: [있다면 기술]

### SSL/TLS
- Mode: [Full/Full (strict)/Flexible]
- 등급: [A+/A/B/C/F]
- 만료일: [날짜]
- 문제점: [있다면 기술]

### 보안 설정
- WAF: ✅/❌
- DDoS: ✅/❌
- Rate Limiting: ✅/❌
- Bot Protection: ✅/❌

### API 응답 테스트
- WordPress API: ✅/❌ (응답 시간: XXXms)
- WooCommerce API: ✅/❌ (응답 시간: XXXms)
- 이미지 로딩: ✅/❌

### 스크린샷
[Cloudflare Dashboard 캡처]
```

---

#### 7-2. Vercel 배포 설정 검증

**검증 항목**:

1. **프로젝트 설정**
   - [ ] Vercel Dashboard → Projects → emarket-frontend-one
   - [ ] Framework: Next.js
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `.next`
   - [ ] Install Command: `npm install`
   - [ ] Node.js Version: 18.x 이상

2. **환경 변수 확인**
   - [ ] Vercel Dashboard → Settings → Environment Variables
   - [ ] `WORDPRESS_API_URL`: `https://wp-emarket.whmarketing.org/wp-json/wp/v2`
   - [ ] `WOOCOMMERCE_API_URL`: `https://wp-emarket.whmarketing.org/wp-json/wc/v3`
   - [ ] `WORDPRESS_IMAGE_URL`: `https://wp-emarket.whmarketing.org`
   - [ ] Production / Preview / Development 별로 올바르게 설정되었는지 확인

3. **배포 로그 확인**
   - [ ] Vercel Dashboard → Deployments → [최신 배포]
   - [ ] Build Status: ✅ Ready / ❌ Failed
   - [ ] Build Time: [시간]
   - [ ] Build Logs: 에러 없는지 확인
   - [ ] Function Logs: API routes 정상 작동 확인

4. **도메인 및 SSL**
   - [ ] Production URL: `https://emarket-frontend-one.vercel.app`
   - [ ] SSL Certificate: ✅ Valid
   - [ ] HTTPS 강제 리다이렉트: ✅ Enabled

5. **Edge 네트워크 설정**
   - [ ] Region: `icn1` (Seoul) 확인
   - [ ] Edge Functions: 정상 작동 확인
   - [ ] Caching: 설정 확인 (vercel.json)

**테스트 명령어**:
```bash
# Vercel 배포 상태 확인
curl -I https://emarket-frontend-one.vercel.app

# API Route 테스트 (이미지 프록시)
curl -I https://emarket-frontend-one.vercel.app/api/image/test.jpg

# 빌드 로그 확인 (Vercel CLI 필요)
vercel logs [deployment-url]
```

**보고 형식**:
```
## Vercel 배포 검증 결과

### 프로젝트 설정
- Framework: Next.js [버전]
- Build Command: [명령어]
- Node.js Version: [버전]
- 상태: ✅/❌

### 환경 변수
- WORDPRESS_API_URL: ✅/❌ [값 확인]
- WOOCOMMERCE_API_URL: ✅/❌ [값 확인]
- WORDPRESS_IMAGE_URL: ✅/❌ [값 확인]
- 문제점: [있다면 기술]

### 최근 배포
- Deployment ID: [ID]
- Status: ✅ Ready / ❌ Failed
- Build Time: [시간]
- Deploy Time: [시간]
- 에러: [있다면 기술]

### 도메인 및 SSL
- URL: https://emarket-frontend-one.vercel.app
- SSL: ✅/❌ (등급: A+/A/B/C/F)
- HTTPS 리다이렉트: ✅/❌

### Edge 설정
- Region: icn1 (Seoul) ✅/❌
- Functions: [개수] functions deployed
- Caching: ✅/❌

### 스크린샷
[Vercel Dashboard 캡처]
```

---

#### 7-3. 연동 테스트 (End-to-End)

**검증 항목**:

1. **API 통신 플로우**
   - [ ] 사용자 → Vercel (Next.js)
   - [ ] Vercel → Cloudflare Tunnel (WordPress API 호출)
   - [ ] Cloudflare → 로컬 WordPress 서버
   - [ ] 응답 반환: WordPress → Cloudflare → Vercel → 사용자

2. **실제 데이터 로딩 테스트**
   ```
   테스트 1: 제품 목록 로딩
   1. https://emarket-frontend-one.vercel.app/products 접속
   2. 제품 목록이 표시되는지 확인
   3. 로딩 시간 측정 (목표: 3초 이내)
   4. 개발자 도구 → Network 탭에서 API 호출 확인
   5. wp-emarket.whmarketing.org 호출 확인

   테스트 2: 제품 상세 페이지
   1. 아무 제품 클릭
   2. 상세 정보 정상 표시 확인
   3. 이미지 로딩 확인 (/api/image/... 경로)
   4. 응답 시간 측정

   테스트 3: 장바구니 및 주문
   1. 제품을 장바구니에 추가
   2. 체크아웃 페이지 이동
   3. 주문 정보 입력
   4. 주문 생성 (WordPress에 POST 요청)
   5. 주문 완료 메시지 확인
   ```

3. **성능 측정**
   - [ ] API 응답 시간 (목표: 500ms 이내)
   - [ ] 이미지 로딩 시간 (목표: 1초 이내)
   - [ ] 페이지 전체 로딩 시간 (목표: 3초 이내)

4. **에러 핸들링**
   ```
   테스트 1: Cloudflare Tunnel 중단 시나리오
   - (실제 중단은 불가능하므로, 에러 처리 코드 확인)
   - Network 탭에서 500/502 에러 시 동작 확인

   테스트 2: 네트워크 지연 시뮬레이션
   - 개발자 도구 → Network → Throttling
   - Slow 3G로 설정 후 페이지 로딩 확인
   - 로딩 인디케이터 표시 확인
   ```

5. **캐싱 동작 확인**
   ```
   테스트 1: Vercel Edge Caching
   1. 제품 목록 페이지 최초 로딩 (시간 측정: T1)
   2. 새로고침 (시간 측정: T2)
   3. T2 < T1 확인 (캐싱 효과)
   4. Network 탭에서 "from cache" 확인

   테스트 2: 이미지 캐싱
   1. 제품 이미지 최초 로딩
   2. 새로고침 후 "from cache" 확인
   3. Cache-Control 헤더 확인
   ```

**측정 도구**:
- Chrome DevTools (Network, Performance)
- Lighthouse
- WebPageTest (https://www.webpagetest.org/)

**보고 형식**:
```
## End-to-End 연동 테스트 결과

### API 통신 플로우
```
사용자 → Vercel → Cloudflare Tunnel → WordPress
 ✅       ✅           ✅                 ✅
```

### 데이터 로딩 테스트
| 테스트 | 상태 | 로딩 시간 | 비고 |
|--------|------|----------|------|
| 제품 목록 | ✅/❌ | XXXms | [비고] |
| 제품 상세 | ✅/❌ | XXXms | [비고] |
| 이미지 로딩 | ✅/❌ | XXXms | [비고] |
| 장바구니 | ✅/❌ | XXXms | [비고] |
| 주문 생성 | ✅/❌ | XXXms | [비고] |

### 성능 측정
- API 평균 응답: XXXms (목표: <500ms)
- 이미지 로딩: XXXms (목표: <1000ms)
- 페이지 로딩: X.Xs (목표: <3s)
- 평가: ✅ 목표 달성 / ⚠️ 개선 필요 / ❌ 목표 미달

### 에러 핸들링
- 네트워크 지연: ✅/❌ (로딩 인디케이터 표시)
- API 에러: ✅/❌ (에러 메시지 표시)
- 이미지 로딩 실패: ✅/❌ (대체 이미지 표시)

### 캐싱 효과
- Edge Caching: ✅/❌ (개선 비율: XX%)
- 이미지 캐싱: ✅/❌
- Cache-Control 헤더: ✅/❌

### 발견된 이슈
1. [이슈 1]
2. [이슈 2]

### 개선 권장사항
1. [권장사항 1]
2. [권장사항 2]

### 스크린샷
[Network 탭, Performance 결과 등]
```

---

#### 7-4. 보안 검증

**검증 항목**:

1. **HTTPS/SSL**
   - [ ] 강제 HTTPS 리다이렉트 확인
   - [ ] SSL Labs 등급: A+ 목표
   - [ ] Mixed Content 없음 확인

2. **보안 헤더**
   ```bash
   curl -I https://emarket-frontend-one.vercel.app

   확인할 헤더:
   - X-Frame-Options: DENY/SAMEORIGIN
   - X-Content-Type-Options: nosniff
   - X-XSS-Protection: 1; mode=block
   - Strict-Transport-Security: max-age=...
   - Content-Security-Policy: ...
   ```

3. **CORS 설정**
   - [ ] Cloudflare에서 적절한 CORS 헤더 설정
   - [ ] Vercel API Routes의 CORS 처리
   - [ ] 브라우저 Console에 CORS 에러 없음

4. **API 보안**
   - [ ] WooCommerce API Key 노출 여부 확인
   - [ ] 환경 변수가 클라이언트에 노출되지 않는지 확인
   - [ ] 개발자 도구 → Sources에서 API 키 검색

**보고 형식**:
```
## 보안 검증 결과

### SSL/HTTPS
- Vercel SSL: ✅/❌ (등급: A+/A/B)
- Cloudflare SSL: ✅/❌ (등급: A+/A/B)
- HTTPS 강제: ✅/❌
- Mixed Content: ✅ 없음 / ❌ 발견

### 보안 헤더
| 헤더 | 상태 | 값 |
|------|------|-----|
| X-Frame-Options | ✅/❌ | [값] |
| HSTS | ✅/❌ | [값] |
| CSP | ✅/❌ | [값] |
| X-Content-Type | ✅/❌ | [값] |

### CORS
- CORS 설정: ✅/❌
- Preflight 처리: ✅/❌
- 브라우저 에러: ✅ 없음 / ❌ 있음

### API 보안
- API 키 노출: ✅ 없음 / ❌ 발견
- 환경 변수 보호: ✅/❌
- 인증 처리: ✅/❌

### 종합 보안 등급
🟢 양호 / 🟡 보통 / 🔴 취약

### 개선 권장사항
[우선순위별 정리]
```

---

#### 7-5. 모니터링 및 로깅

**검증 항목**:

1. **Vercel 로그**
   - [ ] Function Logs 확인
   - [ ] Error Tracking 설정 확인
   - [ ] Access Logs 확인

2. **Cloudflare Analytics**
   - [ ] Traffic 확인
   - [ ] Bandwidth 사용량
   - [ ] Cache Hit Rate
   - [ ] Security Events

3. **WordPress 로그** (가능한 경우)
   - [ ] API 요청 로그
   - [ ] 에러 로그

**보고 형식**:
```
## 모니터링 검증 결과

### Vercel
- Function 실행: [총 XXX회/일]
- 에러율: X.X%
- 평균 실행 시간: XXXms

### Cloudflare
- 일일 트래픽: XXX requests
- Cache Hit Rate: XX%
- Bandwidth: XXX GB
- Security Events: XXX events

### 이상 징후
- [발견된 이상 징후 또는 "없음"]

### 권장 모니터링 설정
1. [권장사항 1]
2. [권장사항 2]
```

---

#### 📊 통합 보고서 형식

모든 하위 작업 완료 후, 다음 형식으로 통합 보고서 작성:

```
# E-MARKET Cloudflare + Vercel 연동 종합 검증 보고서

작성일: YYYY-MM-DD
작성자: Perplexity Comet

---

## 🎯 검증 요약

| 영역 | 상태 | 점수 | 비고 |
|------|------|------|------|
| Cloudflare Tunnel | ✅/⚠️/❌ | XX/100 | [비고] |
| Vercel 배포 | ✅/⚠️/❌ | XX/100 | [비고] |
| API 연동 | ✅/⚠️/❌ | XX/100 | [비고] |
| 성능 | ✅/⚠️/❌ | XX/100 | [비고] |
| 보안 | ✅/⚠️/❌ | XX/100 | [비고] |

**전체 점수**: XX/100
**전체 평가**: 🟢 양호 / 🟡 보통 / 🔴 개선 필요

---

## 📋 주요 발견 사항

### ✅ 정상 작동 항목
1. [항목 1]
2. [항목 2]
...

### ⚠️ 주의 필요 항목
1. [항목 1] - [이유 및 영향도]
2. [항목 2] - [이유 및 영향도]
...

### ❌ 즉시 수정 필요 항목
1. [항목 1] - [심각도: High/Medium/Low]
2. [항목 2] - [심각도: High/Medium/Low]
...

---

## 🔧 개선 권장사항

### 🔴 High Priority (즉시 조치 필요)
1. [권장사항 1]
   - 현재 상태: [설명]
   - 위험도: [설명]
   - 조치 방법: [구체적 방법]

### 🟡 Medium Priority (1주일 이내)
1. [권장사항 1]
   - 현재 상태: [설명]
   - 개선 효과: [설명]
   - 조치 방법: [구체적 방법]

### 🟢 Low Priority (여유 있을 때)
1. [권장사항 1]
   - 현재 상태: [설명]
   - 개선 효과: [설명]

---

## 📊 성능 벤치마크

| 지표 | 현재 값 | 목표 값 | 상태 |
|------|---------|---------|------|
| API 응답 시간 | XXXms | <500ms | ✅/❌ |
| 페이지 로딩 | X.Xs | <3s | ✅/❌ |
| 이미지 로딩 | XXXms | <1s | ✅/❌ |
| Cache Hit Rate | XX% | >80% | ✅/❌ |

---

## 🔒 보안 평가

| 항목 | 등급 | 상태 |
|------|------|------|
| Vercel SSL | A+/A/B/C/F | ✅/❌ |
| Cloudflare SSL | A+/A/B/C/F | ✅/❌ |
| 보안 헤더 | XX/100 | ✅/❌ |
| CORS 설정 | 적절/부적절 | ✅/❌ |
| API 보안 | 안전/위험 | ✅/❌ |

---

## 📸 증빙 자료

### Cloudflare Dashboard
[스크린샷 1]
[스크린샷 2]

### Vercel Dashboard
[스크린샷 1]
[스크린샷 2]

### Network Analysis
[스크린샷 1]
[스크린샷 2]

### Performance Results
[Lighthouse 리포트]
[WebPageTest 결과]

---

## ✅ 결론 및 다음 단계

### 전체 평가
[전반적인 연동 상태에 대한 종합 평가]

### 즉시 조치 필요 사항
1. [항목 1]
2. [항목 2]

### 장기 개선 계획
1. [항목 1]
2. [항목 2]

---

**검증 완료 일시**: YYYY-MM-DD HH:MM
**작성자**: Perplexity Comet
**검토 필요**: Claude Code
```

---

### 작업 #8: 🔴 WordPress 백엔드 긴급 복구 (최우선)

**목적**: 현재 다운된 WordPress/WooCommerce 백엔드를 긴급 복구

**중요도**: 🔴 **CRITICAL - 최우선** - 현재 전체 사이트 기능 중단 상태

**발견 일시**: 2025-11-09 13:50 (KST)

**현재 상태**:
- ❌ WordPress 백엔드 완전 다운 (HTTP 530 에러)
- ❌ Cloudflare Tunnel 연결 실패 (Error 1033)
- ✅ Vercel Frontend는 정상 작동 (UI만 표시)
- ❌ 모든 제품 데이터 로딩 실패
- ❌ API 호출 전부 실패

---

#### 8-1. 긴급 진단

**즉시 확인해야 할 사항**:

1. **Cloudflare Tunnel 상태** (1순위)
   ```bash
   # Cloudflare Dashboard 접속
   https://dash.cloudflare.com/
   → Zero Trust → Access → Tunnels
   → wp-emarket 터널 상태 확인
   ```

   **확인 사항**:
   - [ ] Tunnel 상태: 🟢 Healthy / 🟡 Warning / 🔴 Down
   - [ ] Connector 연결 상태
   - [ ] Last Seen 시간 (최근인지 확인)
   - [ ] Public Hostname 설정: `wp-emarket.whmarketing.org`

2. **로컬 WordPress 서버 상태** (2순위)

   **⚠️ 주의**: 로컬 서버 접근이 필요합니다. SSH 또는 원격 접속 가능 여부 확인 필요.

   만약 접근 가능하다면:
   ```bash
   # 웹서버 상태 확인 (Apache/Nginx)
   sudo systemctl status apache2
   # 또는
   sudo systemctl status nginx

   # MySQL 상태 확인
   sudo systemctl status mysql

   # WordPress 디렉토리 확인
   ls -la /var/www/html/  # 또는 WordPress 설치 경로

   # Cloudflare Tunnel 데몬 상태
   sudo systemctl status cloudflared
   # 또는
   ps aux | grep cloudflared
   ```

3. **DNS 설정 확인** (3순위)
   ```bash
   # DNS 조회
   nslookup wp-emarket.whmarketing.org
   dig wp-emarket.whmarketing.org

   # Cloudflare Dashboard에서 DNS 레코드 확인
   # CNAME: wp-emarket → [tunnel-id].cfargotunnel.com
   ```

---

#### 8-2. 복구 절차

**시나리오 A: Cloudflare Tunnel만 다운된 경우** (가장 가능성 높음)

1. **로컬 서버 접근 후 Tunnel 재시작**
   ```bash
   # Tunnel 상태 확인
   sudo systemctl status cloudflared

   # Tunnel 재시작
   sudo systemctl restart cloudflared

   # 로그 확인
   sudo journalctl -u cloudflared -n 50 --no-pager

   # 수동 시작 (systemd 사용 안 하는 경우)
   cloudflared tunnel run wp-emarket
   ```

2. **Cloudflare Dashboard에서 확인**
   - Tunnel 상태가 🟢 Healthy로 변경되는지 확인 (30초 대기)
   - Last Seen 시간이 "Just now"인지 확인

3. **테스트**
   ```bash
   curl -I https://wp-emarket.whmarketing.org/
   # 기대 결과: HTTP/2 200 (또는 301/302)

   curl https://wp-emarket.whmarketing.org/wp-json/wp/v2
   # 기대 결과: JSON 응답
   ```

**시나리오 B: WordPress 서버가 다운된 경우**

1. **웹서버 시작**
   ```bash
   # Apache
   sudo systemctl start apache2
   sudo systemctl enable apache2  # 자동 시작 설정

   # 또는 Nginx
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

2. **MySQL 시작**
   ```bash
   sudo systemctl start mysql
   sudo systemctl enable mysql  # 자동 시작 설정
   ```

3. **WordPress 접근 확인**
   ```bash
   # 로컬에서 확인
   curl http://localhost/wp-admin/
   # 또는
   curl http://localhost:8080/wp-admin/  # 포트 확인 필요
   ```

4. **Cloudflare Tunnel 재시작** (위 시나리오 A 참조)

**시나리오 C: DNS/Cloudflare 설정 문제**

1. **Cloudflare Dashboard → DNS**
   - CNAME 레코드 확인: `wp-emarket` → `[tunnel-id].cfargotunnel.com`
   - Proxy 상태: 🟠 Proxied (반드시 활성화)

2. **Tunnel Public Hostname 확인**
   - Cloudflare Dashboard → Zero Trust → Tunnels → wp-emarket
   - Public Hostname: `wp-emarket.whmarketing.org`
   - Service: HTTP, localhost:포트번호

---

#### 8-3. 복구 후 검증

**필수 테스트**:

1. **API 엔드포인트 테스트**
   ```bash
   # WordPress REST API
   curl https://wp-emarket.whmarketing.org/wp-json/wp/v2

   # WooCommerce Products API
   curl https://wp-emarket.whmarketing.org/wp-json/wc/v3/products

   # 이미지 테스트 (실제 이미지 경로로 교체)
   curl -I https://wp-emarket.whmarketing.org/wp-content/uploads/
   ```

2. **Vercel Frontend 테스트**
   ```bash
   # Products API Route
   curl https://emarket-frontend-one.vercel.app/api/products
   # 기대 결과: JSON 배열 (제품 목록)
   ```

3. **브라우저 테스트**
   - https://emarket-frontend-one.vercel.app/ 접속
   - 제품 목록이 정상적으로 표시되는지 확인
   - 이미지 로딩 확인
   - 제품 클릭 → 상세 페이지 확인

---

#### 8-4. 자동 재시작 설정 (복구 후 추가 작업)

**목적**: 서버 재부팅 시 자동으로 Cloudflare Tunnel 시작

**방법 1: systemd 서비스 사용** (권장)

1. **서비스 파일 확인**
   ```bash
   cat /etc/systemd/system/cloudflared.service
   ```

2. **자동 시작 활성화**
   ```bash
   sudo systemctl enable cloudflared
   sudo systemctl status cloudflared
   ```

**방법 2: cron @reboot 사용** (대안)

```bash
crontab -e

# 다음 줄 추가:
@reboot sleep 30 && cloudflared tunnel run wp-emarket
```

---

#### 8-5. 보고 형식

```
## WordPress 백엔드 복구 결과

### 진단 결과
- 발견 시간: 2025-11-09 13:50 (KST)
- 복구 완료 시간: [시간]
- 다운 원인: [Cloudflare Tunnel / WordPress 서버 / DNS / 기타]

### 복구 조치
1. [수행한 조치 1]
2. [수행한 조치 2]
3. [수행한 조치 3]

### 복구 후 테스트 결과
- [ ] WordPress API: ✅/❌ (응답 시간: XXXms)
- [ ] WooCommerce API: ✅/❌ (응답 시간: XXXms)
- [ ] Vercel Frontend: ✅/❌ (제품 표시 정상)
- [ ] 이미지 로딩: ✅/❌

### 자동 재시작 설정
- [ ] systemd 자동 시작 활성화: ✅/❌
- [ ] 재부팅 테스트 완료: ✅/❌

### 재발 방지 조치
- [향후 재발 방지를 위한 모니터링/알림 설정 등]

### 스크린샷
- [Cloudflare Dashboard - Before]
- [Cloudflare Dashboard - After]
- [Frontend - Before (No products)]
- [Frontend - After (Products loaded)]
```

---

**긴급도**: 🔴🔴🔴 **최우선** - 현재 사이트가 완전히 작동하지 않는 상태
**예상 소요 시간**: 30분 ~ 1시간
**필요 권한**: Cloudflare Dashboard 접근, 로컬 서버 SSH 접근 (가능한 경우)

---

## 📝 작업 진행 방법

### 단계별 진행

**🔴 긴급**: 작업 #8 (WordPress 백엔드 복구)를 **즉시** 최우선으로 진행

1. **긴급 복구** (작업 #8) - 🔴 **즉시 조치 필요**
2. **우선순위 작업** (작업 #1, #2, #3)
3. **보안 및 UX** (작업 #4, #5)
4. **연동 검증** (작업 #7)
5. **선택 작업** (작업 #6)

### 보고 주기
- 각 작업 완료 시마다 즉시 보고
- 문제 발견 시 즉시 보고 (심각도 High인 경우)

### 보고 형식
각 작업마다 위에 명시된 형식을 사용하되, 다음 내용 포함:
1. **작업명**
2. **완료 일시**
3. **테스트 환경** (브라우저, OS, 디바이스 등)
4. **결과 요약** (성공/실패/부분 성공)
5. **상세 내용** (작업별 형식 참조)
6. **스크린샷/증빙 자료**
7. **다음 단계 제안**

---

## 🔧 접근 정보

### 프로덕션 환경
- **Vercel URL**: https://emarket-frontend-one.vercel.app
- **GitHub Repository**: https://github.com/jyongchul/emarket-frontend
- **WordPress Backend**: https://wp-emarket.whmarketing.org
  - ⚠️ 백엔드는 직접 접근 불필요, 프론트엔드만 테스트

### 참고 정보
- **프로젝트 구조**: Headless CMS (WordPress) + JAMstack (Next.js)
- **결제 방식**: 무통장 입금만 지원
- **계좌 정보**: 국민은행 805901-04-314273 (주)하얀모자마케팅

---

## ❓ 질문 및 이슈 보고

문제 발견 시:
1. **즉시 보고** (심각도 High)
2. **스크린샷 첨부** 필수
3. **재현 방법** 명확히 기술
4. **브라우저/디바이스 정보** 포함

---

## ✅ 체크리스트

작업 시작 전 확인:
- [ ] Vercel 배포 URL 확인
- [ ] 테스트 환경 준비 완료 (브라우저, 디바이스)
- [ ] 보고 형식 숙지
- [ ] 스크린샷 도구 준비

---

**작업 기한**: 우선순위에 따라 순차 진행
**담당자**: Perplexity Comet
**검토자**: Claude Code

---

*본 문서는 Claude Code가 작성하였으며, Perplexity Comet의 자율적 판단에 따라 작업 순서 조정 가능합니다.*
