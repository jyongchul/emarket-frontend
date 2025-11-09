# 🎯 Perplexity Comet 통합 작업 지시서

작성일: 2025-11-09 15:00 (KST)
프로젝트: E-MARKET (Headless WooCommerce + Next.js)
담당: Perplexity Comet
작성자: Claude Code

---

## 🔴 긴급 알림

**WordPress 백엔드 완전 다운 상태**
- 발견: 2025-11-09 13:50 (KST)
- 상태: HTTP 530, Cloudflare Error 1033
- 영향: 전체 사이트 기능 100% 중단

**최우선 작업**: Task #1 (WordPress 백엔드 긴급 복구)

---

## 📋 작업 우선순위

```
🔴 긴급 (즉시)    : Task #1 - WordPress 백엔드 복구
🟡 높음 (복구 후) : Task #2 - 전체 시스템 검증
🟢 중간 (안정 후) : Task #3~#6 - 기능 테스트 및 최적화
🔵 낮음 (선택)    : Task #7 - 경쟁사 분석
```

---

# 🔴 Task #1: WordPress 백엔드 긴급 복구 (최우선)

**중요도**: 🔴🔴🔴 **CRITICAL**
**예상 소요 시간**: 30분 ~ 1시간
**필수 권한**: Cloudflare Dashboard 접근, 로컬 서버 SSH 접근

---

## 1-1. 복구 전 준비사항

### 필요한 접근 권한

1. **Cloudflare Dashboard**
   - URL: https://dash.cloudflare.com/
   - 계정: [Cloudflare 계정 정보 확인 필요]
   - 필요 메뉴: Zero Trust → Access → Tunnels

2. **로컬 WordPress 서버 SSH**
   - 서버 IP 또는 호스트명 확인 필요
   - SSH 인증 정보 확인 필요
   - 필수 권한: sudo

3. **복구 도구 위치**
   - 자동 복구 스크립트: `/mnt/c/EMARKET/scripts/wordpress_auto_recovery.sh`
   - 복구 가이드: `/mnt/c/EMARKET/scripts/RECOVERY_GUIDE.md`
   - 긴급 상황 보고서: `/mnt/c/EMARKET/URGENT_STATUS_REPORT.md`

---

## 1-2. 복구 절차 (단계별)

### Step 1: Cloudflare Dashboard 확인 (5분)

**목적**: Tunnel 상태 확인 및 설정 검증

**절차**:
1. https://dash.cloudflare.com/ 접속
2. Zero Trust → Access → Tunnels 메뉴 선택
3. Tunnel 이름 `wp-emarket` 찾기
4. 다음 정보 확인 및 스크린샷 캡처:

```
[확인 사항]
- [ ] Tunnel 상태: 🟢 Healthy / 🟡 Warning / 🔴 Down
- [ ] Connector 상태: Connected / Disconnected
- [ ] Last Seen 시간: [시간 기록]
- [ ] Public Hostname: wp-emarket.whmarketing.org
- [ ] Service 설정: HTTP, localhost:[포트번호]
```

**스크린샷 필수**:
- Tunnel 상태 화면
- Public Hostname 설정 화면
- Connector 정보 화면

---

### Step 2: DNS 설정 확인 (5분)

**목적**: Cloudflare DNS 레코드 검증

**절차**:
1. Cloudflare Dashboard → DNS → Records 메뉴
2. 다음 레코드 확인:

```
[확인 사항]
- [ ] Type: CNAME
- [ ] Name: wp-emarket
- [ ] Target: [tunnel-id].cfargotunnel.com
- [ ] Proxy status: 🟠 Proxied (반드시 활성화되어야 함)
- [ ] TTL: Auto
```

**스크린샷 필수**:
- DNS 레코드 목록

---

### Step 3: 로컬 서버 접속 및 진단 (10분)

**목적**: 로컬 WordPress 서버 상태 확인

**절차**:
1. SSH로 WordPress 서버 접속
   ```bash
   ssh user@wordpress-server-ip
   ```

2. 서비스 상태 확인
   ```bash
   # Cloudflare Tunnel 상태
   sudo systemctl status cloudflared

   # 웹서버 상태 (Apache 또는 Nginx)
   sudo systemctl status apache2
   sudo systemctl status nginx

   # MySQL 상태
   sudo systemctl status mysql

   # 프로세스 확인
   ps aux | grep cloudflared
   ps aux | grep apache
   ps aux | grep mysql
   ```

3. 결과 기록
   ```
   [서비스 상태]
   - [ ] cloudflared: 🟢 active / 🔴 inactive / ⚫ not found
   - [ ] apache2/nginx: 🟢 active / 🔴 inactive / ⚫ not found
   - [ ] mysql: 🟢 active / 🔴 inactive / ⚫ not found
   ```

**스크린샷 필수**:
- 각 서비스 status 명령 출력

---

### Step 4: 자동 복구 실행 (3분)

**목적**: 자동 복구 스크립트로 서비스 재시작

**절차**:
1. 복구 스크립트 실행
   ```bash
   # 스크립트 위치로 이동
   cd /mnt/c/EMARKET/scripts/

   # 실행 권한 확인
   ls -l wordpress_auto_recovery.sh

   # 스크립트 실행 (sudo 필수)
   sudo ./wordpress_auto_recovery.sh
   ```

2. 스크립트 출력 전체 복사 (로그 파일 생성됨)

3. 완료 대기 (약 2-3분)

**스크린샷 필수**:
- 스크립트 실행 화면
- 최종 결과 화면

**대안**: 스크립트 실행 불가 시 수동 복구
```bash
# MySQL 재시작
sudo systemctl restart mysql
sudo systemctl enable mysql

# 웹서버 재시작
sudo systemctl restart apache2  # 또는 nginx
sudo systemctl enable apache2

# Cloudflare Tunnel 재시작
sudo systemctl restart cloudflared
sudo systemctl enable cloudflared

# 60초 대기
sleep 60
```

---

### Step 5: 복구 후 검증 (10분)

**목적**: 모든 서비스 정상 작동 확인

#### 5-1. 서비스 상태 재확인

```bash
# 모든 서비스 상태 확인
sudo systemctl status cloudflared
sudo systemctl status apache2  # 또는 nginx
sudo systemctl status mysql

# 자동 시작 설정 확인
systemctl is-enabled cloudflared
systemctl is-enabled apache2
systemctl is-enabled mysql
```

**기대 결과**: 모두 "active (running)" 및 "enabled"

#### 5-2. API 엔드포인트 테스트

```bash
# WordPress REST API
curl -I https://wp-emarket.whmarketing.org/
curl https://wp-emarket.whmarketing.org/wp-json/wp/v2

# WooCommerce API
curl https://wp-emarket.whmarketing.org/wp-json/wc/v3/products

# 응답 시간 측정
time curl -s https://wp-emarket.whmarketing.org/wp-json/wp/v2 > /dev/null
```

**기대 결과**:
- HTTP 200 응답
- JSON 데이터 반환 (에러 아님)
- 응답 시간 3초 이내

#### 5-3. Cloudflare Dashboard 재확인

1. https://dash.cloudflare.com/ 다시 접속
2. Tunnel 상태 확인

**기대 결과**:
- Tunnel 상태: 🟢 Healthy
- Last Seen: "Just now" 또는 최근 시간

#### 5-4. Frontend 테스트

**브라우저에서**:
1. https://emarket-frontend-one.vercel.app 접속
2. 제품 목록 표시 확인
3. 이미지 로딩 확인
4. 제품 클릭 → 상세 페이지 확인
5. 장바구니 추가 테스트

**기대 결과**:
- [ ] 제품 목록 표시됨
- [ ] 이미지 정상 로딩
- [ ] 상세 페이지 작동
- [ ] 장바구니 추가 작동

**스크린샷 필수**:
- 복구 전: "No products found" 화면
- 복구 후: 제품 목록 화면

---

### Step 6: 로그 수집 및 원인 분석 (10분)

**목적**: 다운 원인 규명 및 재발 방지

```bash
# cloudflared 로그 (최근 100줄)
sudo journalctl -u cloudflared -n 100 --no-pager > /tmp/cloudflared.log

# Apache 에러 로그 (최근 100줄)
sudo tail -100 /var/log/apache2/error.log > /tmp/apache_error.log

# MySQL 에러 로그 (최근 100줄)
sudo tail -100 /var/log/mysql/error.log > /tmp/mysql_error.log

# 복구 스크립트 로그
ls -lh /var/log/wordpress_recovery_*.log
cat /var/log/wordpress_recovery_*.log | tail -200
```

**로그 분석**:
- [ ] cloudflared 중지 원인 확인
- [ ] 웹서버/DB 중지 원인 확인
- [ ] 에러 메시지 기록
- [ ] 재발 패턴 확인

---

## 1-3. 복구 후 보고

### 보고 형식

```markdown
# WordPress 백엔드 복구 결과 보고

## 요약
- **발견 시간**: 2025-11-09 13:50 (KST)
- **복구 완료 시간**: YYYY-MM-DD HH:MM (KST)
- **총 다운 시간**: X시간 X분
- **복구 방법**: 자동 스크립트 / 수동 복구

## 진단 결과

### Cloudflare Dashboard 상태 (복구 전)
- Tunnel 상태: 🟢/🟡/🔴
- Connector 상태: Connected/Disconnected
- Last Seen: [시간]

### 로컬 서버 상태 (복구 전)
- cloudflared: 🟢 active / 🔴 inactive
- Apache/Nginx: 🟢 active / 🔴 inactive
- MySQL: 🟢 active / 🔴 inactive

### 다운 원인
[주요 원인 1~3가지 기술]
1. [원인 1]: [상세 설명]
2. [원인 2]: [상세 설명]
3. [원인 3]: [상세 설명]

## 복구 조치

### 수행한 작업
1. [조치 1]: [결과]
2. [조치 2]: [결과]
3. [조치 3]: [결과]

### 사용한 도구
- [ ] wordpress_auto_recovery.sh (자동 스크립트)
- [ ] 수동 systemctl 명령어
- [ ] Cloudflare Dashboard 설정 변경
- [ ] 기타: [설명]

## 복구 후 검증 결과

### 서비스 상태
- [ ] cloudflared: ✅ active + enabled / ❌ 실패
- [ ] Apache/Nginx: ✅ active + enabled / ❌ 실패
- [ ] MySQL: ✅ active + enabled / ❌ 실패

### API 테스트
- [ ] WordPress REST API: ✅ 정상 (응답 시간: XXXms) / ❌ 실패
- [ ] WooCommerce API: ✅ 정상 (응답 시간: XXXms) / ❌ 실패
- [ ] 제품 데이터: ✅ XX개 제품 로딩됨 / ❌ 로딩 실패

### Frontend 테스트
- [ ] 제품 목록: ✅ 표시됨 / ❌ 표시 안 됨
- [ ] 이미지 로딩: ✅ 정상 / ❌ 실패
- [ ] 상세 페이지: ✅ 작동 / ❌ 오류
- [ ] 장바구니: ✅ 작동 / ❌ 오류

### Cloudflare Dashboard (복구 후)
- Tunnel 상태: 🟢 Healthy / 🟡 Warning / 🔴 Down
- Last Seen: [시간]

## 로그 분석

### cloudflared 로그 주요 내용
[주요 에러 또는 경고 메시지 발췌]

### 웹서버 로그 주요 내용
[주요 에러 또는 경고 메시지 발췌]

### MySQL 로그 주요 내용
[주요 에러 또는 경고 메시지 발췌]

## 재발 방지 조치

### 즉시 적용
- [ ] 모든 서비스 자동 시작 설정 확인 (systemctl enable)
- [ ] 복구 스크립트 cron job 등록
- [ ] 외부 모니터링 설정 (UptimeRobot 등)

### 향후 계획
- [ ] 정기 헬스체크 스크립트 실행
- [ ] 로그 정기 점검 일정 수립
- [ ] 백업 시스템 강화
- [ ] 알림 시스템 구축

## 스크린샷

### 복구 전
1. Cloudflare Dashboard - Tunnel Down
2. Frontend - No products found

### 복구 후
3. Cloudflare Dashboard - Tunnel Healthy
4. Frontend - 제품 목록 표시
5. systemctl status - 모든 서비스 active

## 추가 권장 사항

[필요 시 추가 개선 사항 기술]

---

**보고 작성자**: Perplexity Comet
**검토 필요**: Claude Code
**보고 일시**: YYYY-MM-DD HH:MM (KST)
```

---

## 1-4. 긴급 연락

복구 중 문제 발생 시:
- **이메일**: jyongchul@gmail.com
- **전화**: 010-9333-2028
- **카카오톡**: jyongchul

---

# 🟡 Task #2: 전체 시스템 검증 (복구 완료 후)

**중요도**: 🟡 **HIGH** (Task #1 완료 후 즉시 진행)
**예상 소요 시간**: 1~2시간
**필수 권한**: 브라우저, 개발자 도구

---

## 2-1. End-to-End 통합 테스트

### 테스트 시나리오: 전체 주문 프로세스

**목적**: 실제 사용자 관점에서 처음부터 끝까지 검증

#### Step 1: 홈페이지 접속 및 성능 측정

1. **브라우저 접속**
   - URL: https://emarket-frontend-one.vercel.app
   - 브라우저: Chrome (최신 버전)
   - 개발자 도구 Network 탭 열기

2. **성능 측정**
   - [ ] 초기 로딩 시간: ___ 초
   - [ ] First Contentful Paint (FCP): ___ ms
   - [ ] Largest Contentful Paint (LCP): ___ ms
   - [ ] Total Blocking Time (TBT): ___ ms

3. **화면 확인**
   - [ ] 헤더 네비게이션 표시
   - [ ] 제품 목록 로딩 (개수: ___ 개)
   - [ ] 이미지 정상 표시
   - [ ] 다국어 전환 버튼 (EN/FR/KO) 작동

**스크린샷**:
- 홈페이지 전체 화면
- Network 탭 (로딩 시간)
- Performance 탭 (Core Web Vitals)

---

#### Step 2: 제품 탐색

1. **제품 카드 클릭** (최소 3개)
   - [ ] 제품 A: 상세 페이지 로딩 정상
   - [ ] 제품 B: 상세 페이지 로딩 정상
   - [ ] 제품 C: 상세 페이지 로딩 정상

2. **상세 페이지 확인 사항**
   - [ ] 제품 이미지 고해상도 로딩
   - [ ] 제품 설명 표시
   - [ ] 가격 정보 표시
   - [ ] 수량 선택 UI 작동
   - [ ] "Add to Cart" 버튼 표시

3. **다국어 테스트**
   - [ ] 영어(EN) → 프랑스어(FR) → 한국어(KO) 전환
   - [ ] 각 언어에서 제품명/설명 변경 확인

**스크린샷**:
- 제품 상세 페이지 (EN/FR/KO)

---

#### Step 3: 장바구니 기능 테스트

1. **제품 추가** (3개 이상)
   - [ ] 제품 A: 수량 2개 추가
   - [ ] 제품 B: 수량 1개 추가
   - [ ] 제품 C: 수량 3개 추가

2. **장바구니 페이지 확인**
   - [ ] 총 3개 품목 표시
   - [ ] 각 제품 정보 정확 (이름, 가격, 수량)
   - [ ] 총 금액 계산 정확

3. **수량 변경 테스트**
   - [ ] 제품 A: 2 → 3 → 2
   - [ ] 수량 변경 시 금액 자동 업데이트

4. **제품 삭제 테스트**
   - [ ] 제품 C 삭제
   - [ ] 총 금액 재계산 정확

**스크린샷**:
- 장바구니 전체 화면
- 수량 변경 전/후

---

#### Step 4: 체크아웃 프로세스

1. **배송 정보 입력**
   ```
   First Name: Test
   Last Name: User
   Email: test@example.com
   Phone: 010-1234-5678
   Address: 서울시 강남구 테헤란로 123
   City: Seoul
   Postal Code: 12345
   Notes: Test order - please ignore
   ```

2. **입력 필드 확인**
   - [ ] 모든 필드에 텍스트 입력 가능
   - [ ] 텍스트 색상 가시성 확인 (흰색 바탕에 검은 글씨)
   - [ ] 필수 필드 표시 정확

3. **결제 방법 선택**
   - [ ] "무통장 입금" 선택
   - [ ] 계좌 정보 표시 확인:
     ```
     은행: 국민은행
     계좌번호: 805901-04-314273
     예금주: (주)하얀모자마케팅
     ```

4. **주문 완료**
   - [ ] "Place Order" 버튼 클릭
   - [ ] 로딩 표시 확인
   - [ ] 주문 완료 메시지 표시
   - [ ] 주문 번호 생성 확인

**스크린샷**:
- 체크아웃 폼 (입력 전)
- 체크아웃 폼 (입력 후)
- 계좌 정보 표시 부분
- 주문 완료 화면

---

#### Step 5: 예외 처리 테스트

1. **빈 장바구니 체크아웃**
   - [ ] 장바구니 비우기
   - [ ] "Proceed to Checkout" 클릭
   - [ ] 적절한 에러 메시지 표시

2. **필수 입력 누락**
   - [ ] Email 필드 비우고 주문 시도
   - [ ] 브라우저 기본 검증 또는 커스텀 에러 표시

3. **잘못된 이메일 형식**
   - [ ] Email에 "invalid-email" 입력
   - [ ] 이메일 형식 오류 메시지 표시

**스크린샷**:
- 각 에러 메시지

---

## 2-2. 디바이스 호환성 테스트

### Desktop (1920x1080)

**브라우저별 테스트**:

1. **Chrome (최신)**
   - [ ] 레이아웃 정상
   - [ ] 기능 모두 작동
   - [ ] 성능: ___ 점

2. **Firefox (최신)**
   - [ ] 레이아웃 정상
   - [ ] 기능 모두 작동
   - [ ] 성능: ___ 점

3. **Safari (최신)**
   - [ ] 레이아웃 정상
   - [ ] 기능 모두 작동
   - [ ] 성능: ___ 점

4. **Edge (최신)**
   - [ ] 레이아웃 정상
   - [ ] 기능 모두 작동
   - [ ] 성능: ___ 점

**스크린샷**:
- 각 브라우저별 홈페이지

---

### Mobile (375x667 - iPhone SE)

**테스트 항목**:

1. **반응형 레이아웃**
   - [ ] 헤더 모바일 메뉴 (햄버거 아이콘)
   - [ ] 제품 그리드 1열로 표시
   - [ ] 이미지 자동 리사이징
   - [ ] 버튼 터치 가능 크기 (최소 44x44px)

2. **터치 인터랙션**
   - [ ] 스와이프 가능
   - [ ] 제품 카드 탭 반응
   - [ ] 장바구니 추가 버튼 작동

3. **입력 폼 (체크아웃)**
   - [ ] 키보드 나타날 때 레이아웃 유지
   - [ ] 입력 필드 확대 없이 포커스
   - [ ] 자동완성 작동

**스크린샷**:
- 모바일 홈페이지
- 모바일 제품 상세
- 모바일 장바구니
- 모바일 체크아웃

---

### Tablet (768x1024 - iPad)

**테스트 항목**:

1. **레이아웃**
   - [ ] 제품 그리드 2열 또는 3열
   - [ ] 네비게이션 데스크톱/모바일 혼합
   - [ ] 적절한 간격 및 여백

2. **가로/세로 전환**
   - [ ] Portrait 모드 정상
   - [ ] Landscape 모드 정상
   - [ ] 전환 시 레이아웃 깨짐 없음

**스크린샷**:
- 태블릿 Portrait
- 태블릿 Landscape

---

## 2-3. 성능 최적화 검증

### PageSpeed Insights 테스트

**테스트 URL**: https://pagespeed.web.dev/

1. **Desktop 테스트**
   - URL 입력: https://emarket-frontend-one.vercel.app
   - 테스트 실행 대기 (1-2분)
   - 결과 기록:
     ```
     Performance: ___ / 100
     Accessibility: ___ / 100
     Best Practices: ___ / 100
     SEO: ___ / 100

     Core Web Vitals:
     - FCP: ___ s
     - LCP: ___ s
     - TBT: ___ ms
     - CLS: ___
     - Speed Index: ___ s
     ```

2. **Mobile 테스트**
   - 동일 URL Mobile 모드 테스트
   - 결과 기록 (위와 동일 형식)

**스크린샷**:
- Desktop 결과 전체
- Mobile 결과 전체

**개선 필요 항목**:
[90점 미만인 항목의 개선 제안 작성]

---

### Lighthouse 테스트 (Chrome DevTools)

1. **브라우저 개발자 도구** (F12)
   - Lighthouse 탭 선택
   - Mode: Desktop / Mobile 선택
   - Categories: 모두 선택
   - "Analyze page load" 클릭

2. **결과 분석**
   - [ ] Performance 경고 항목 확인
   - [ ] Accessibility 위반 사항 확인
   - [ ] Best Practices 개선 사항 확인
   - [ ] SEO 누락 항목 확인

**스크린샷**:
- Lighthouse 전체 결과

---

## 2-4. 보안 검증

### SSL/TLS 테스트

**테스트 URL**: https://www.ssllabs.com/ssltest/

1. **Frontend (Vercel)**
   - URL: https://emarket-frontend-one.vercel.app
   - 테스트 실행 (3-5분 소요)
   - 결과:
     ```
     Overall Rating: [A+/A/B/C/F]
     Certificate: [유효/만료/오류]
     Protocol Support: TLS 1.2, TLS 1.3
     Cipher Strength: [비트]
     ```

2. **Backend (Cloudflare)**
   - URL: https://wp-emarket.whmarketing.org
   - 결과 기록 (동일 형식)

**스크린샷**:
- SSL Labs 결과 (Frontend)
- SSL Labs 결과 (Backend)

---

### 보안 헤더 확인

**테스트 URL**: https://securityheaders.com/

1. **Frontend 테스트**
   - URL 입력 및 테스트
   - 결과:
     ```
     Overall Rating: [A+/A/B/C/D/F]

     Headers:
     - [ ] Content-Security-Policy
     - [ ] X-Frame-Options
     - [ ] X-Content-Type-Options
     - [ ] Strict-Transport-Security
     - [ ] Referrer-Policy
     ```

2. **Backend 테스트** (동일)

**스크린샷**:
- Security Headers 결과

---

### CORS 테스트

**브라우저 개발자 도구**:

1. **Network 탭 열기**
2. **API 요청 확인**
   - https://wp-emarket.whmarketing.org/wp-json/wc/v3/products
3. **Response Headers 확인**
   ```
   Access-Control-Allow-Origin: [값 확인]
   Access-Control-Allow-Methods: [값 확인]
   Access-Control-Allow-Headers: [값 확인]
   ```

**스크린샷**:
- API 요청 Headers
- API 응답 Headers

---

## 2-5. 보고 형식

```markdown
# 전체 시스템 검증 결과 보고

## 테스트 개요
- **테스트 일시**: YYYY-MM-DD HH:MM (KST)
- **테스트 환경**: [OS, 브라우저, 버전]
- **총 테스트 시간**: X시간 X분

## End-to-End 통합 테스트

### 주문 프로세스
- [ ] 홈페이지 접속: ✅ 정상 / ❌ 오류
- [ ] 제품 탐색: ✅ 정상 / ❌ 오류
- [ ] 장바구니 기능: ✅ 정상 / ❌ 오류
- [ ] 체크아웃 완료: ✅ 정상 / ❌ 오류
- [ ] 예외 처리: ✅ 정상 / ❌ 오류

**발견된 문제**:
[문제 1]: [설명]
[문제 2]: [설명]

## 디바이스 호환성

### Desktop
- Chrome: ✅ / ❌
- Firefox: ✅ / ❌
- Safari: ✅ / ❌
- Edge: ✅ / ❌

### Mobile
- 반응형 레이아웃: ✅ / ❌
- 터치 인터랙션: ✅ / ❌
- 입력 폼: ✅ / ❌

### Tablet
- Portrait: ✅ / ❌
- Landscape: ✅ / ❌

## 성능 검증

### PageSpeed Insights
- Desktop Performance: ___ / 100
- Mobile Performance: ___ / 100
- Core Web Vitals: 모두 Green / 일부 Amber / Red 있음

### Lighthouse
- Performance: ___ / 100
- Accessibility: ___ / 100
- Best Practices: ___ / 100
- SEO: ___ / 100

## 보안 검증

### SSL/TLS
- Frontend Rating: [A+/A/B/C/F]
- Backend Rating: [A+/A/B/C/F]

### 보안 헤더
- Frontend: [A+/A/B/C/D/F]
- Backend: [A+/A/B/C/D/F]

### CORS
- 설정: ✅ 정상 / ❌ 오류

## 개선 권장 사항

### 즉시 조치 필요 (High)
1. [항목 1]: [설명 및 해결 방법]
2. [항목 2]: [설명 및 해결 방법]

### 향후 개선 (Medium)
1. [항목 1]: [설명]
2. [항목 2]: [설명]

### 선택 사항 (Low)
1. [항목 1]: [설명]
2. [항목 2]: [설명]

## 스크린샷 목록

[각 섹션별 스크린샷 번호 및 설명]

---

**보고 작성자**: Perplexity Comet
**검토 필요**: Claude Code
**보고 일시**: YYYY-MM-DD HH:MM (KST)
```

---

# 🟢 Task #3: 다국어 기능 테스트

**중요도**: 🟢 **MEDIUM**
**예상 소요 시간**: 30분

---

## 3-1. 언어 전환 테스트

### 테스트 절차

1. **홈페이지에서 언어 전환**
   - [ ] 기본 언어 확인: [EN/FR/KO]
   - [ ] EN → FR 전환
   - [ ] FR → KO 전환
   - [ ] KO → EN 전환

2. **각 언어에서 확인 사항**
   - [ ] 헤더/푸터 텍스트 변경
   - [ ] 제품명 변경
   - [ ] 제품 설명 변경
   - [ ] 버튼 텍스트 변경
   - [ ] 가격 표시 형식 (통화 기호)

3. **언어별 콘텐츠 품질**
   - [ ] 번역 정확성
   - [ ] 오타/문법 오류 확인
   - [ ] 문화적 적절성

**스크린샷**:
- 각 언어별 홈페이지
- 각 언어별 제품 상세 페이지

---

## 3-2. URL 및 SEO 테스트

### 언어별 URL 확인

```
English: /en/products/[slug]
French: /fr/products/[slug]
Korean: /ko/products/[slug]
```

### meta 태그 확인 (각 언어)

개발자 도구 → Elements → `<head>` 확인:

```html
<html lang="en/fr/ko">
<meta name="description" content="...">
<meta property="og:locale" content="en_US/fr_FR/ko_KR">
```

**스크린샷**:
- 각 언어별 HTML `<head>` 태그

---

# 🟢 Task #4: UX 개선 사항 발굴

**중요도**: 🟢 **MEDIUM**
**예상 소요 시간**: 1시간

---

## 4-1. 사용성 테스트

### 첫인상 테스트 (5초 테스트)

1. **홈페이지 5초 보기**
   - 5초 후 페이지 닫기
   - 다음 질문에 답하기:
     - [ ] 이 사이트가 무엇을 파는지 알겠는가?
     - [ ] 주요 행동 유도(CTA)가 무엇인가?
     - [ ] 신뢰할 수 있어 보이는가?

### 네비게이션 테스트

1. **정보 찾기 테스트**
   - [ ] 특정 카테고리 제품 찾기 (소요 시간: ___ 초)
   - [ ] 장바구니 찾기 (소요 시간: ___ 초)
   - [ ] 연락처 정보 찾기 (소요 시간: ___ 초)

2. **네비게이션 명확성**
   - [ ] 메뉴 구조가 직관적인가?
   - [ ] 현재 위치 표시 (Breadcrumb)
   - [ ] 뒤로가기 버튼 작동

### 콘텐츠 가독성

1. **텍스트 가독성**
   - [ ] 폰트 크기 적절 (최소 16px)
   - [ ] 줄간격 적절 (1.5 이상)
   - [ ] 색상 대비 충분 (WCAG AA 이상)

2. **한국어 단어 줄바꿈** (중요)
   - [ ] 단어가 중간에 끊기지 않는가?
   - [ ] `word-break: keep-all` 적용 확인

**스크린샷**:
- 가독성 문제가 있는 부분

---

## 4-2. 개선 제안

### UI 개선

```markdown
### 개선 제안 1: [제목]
- **현재 상태**: [설명]
- **문제점**: [설명]
- **개선 방안**: [설명]
- **예상 효과**: [설명]
- **우선순위**: High / Medium / Low
```

### UX 개선

```markdown
### 개선 제안 2: [제목]
- **현재 상태**: [설명]
- **문제점**: [설명]
- **개선 방안**: [설명]
- **예상 효과**: [설명]
- **우선순위**: High / Medium / Low
```

---

# 🟢 Task #5: 이미지 최적화 검증

**중요도**: 🟢 **MEDIUM**
**예상 소요 시간**: 30분

---

## 5-1. 이미지 로딩 테스트

### Network 분석

1. **개발자 도구 → Network 탭**
   - [ ] Img 필터 선택
   - [ ] 페이지 새로고침
   - [ ] 이미지 로딩 시간 확인

2. **각 이미지 확인**
   ```
   이미지 1: [URL]
   - 파일 크기: ___ KB
   - 로딩 시간: ___ ms
   - 형식: [WebP/JPEG/PNG]
   - 해상도: ___ x ___
   ```

3. **이미지 최적화 상태**
   - [ ] WebP 형식 사용
   - [ ] 적절한 해상도 (2x retina 지원)
   - [ ] Lazy loading 적용
   - [ ] 압축 수준 적절

**스크린샷**:
- Network 탭 (이미지 필터)

---

## 5-2. Next.js Image 최적화 확인

### `<Image>` 컴포넌트 사용 확인

1. **소스 코드 확인** (개발자 도구 → Elements)
   ```html
   <img src="/_next/image?url=..." />
   ```
   - [ ] Next.js Image 컴포넌트 사용 확인
   - [ ] srcset 속성 확인 (반응형)
   - [ ] loading="lazy" 속성 확인

2. **이미지 프록시 작동 확인**
   - [ ] `/api/image/uploads/...` 경로 확인
   - [ ] Cloudflare 이미지 로딩 정상

**스크린샷**:
- `<img>` 태그 HTML

---

# 🟢 Task #6: 접근성 (Accessibility) 검증

**중요도**: 🟢 **MEDIUM**
**예상 소요 시간**: 30분

---

## 6-1. 자동 접근성 테스트

### WAVE 테스트

**테스트 URL**: https://wave.webaim.org/

1. **Frontend 테스트**
   - URL 입력: https://emarket-frontend-one.vercel.app
   - 테스트 실행
   - 결과:
     ```
     Errors: ___
     Contrast Errors: ___
     Alerts: ___
     Features: ___
     Structural Elements: ___
     ARIA: ___
     ```

2. **주요 오류 확인**
   - [ ] 이미지 alt 텍스트 누락
   - [ ] 폼 레이블 누락
   - [ ] 색상 대비 부족
   - [ ] 헤딩 구조 오류

**스크린샷**:
- WAVE 결과 화면

---

### axe DevTools 테스트

1. **Chrome 확장 설치**
   - axe DevTools 설치
2. **페이지 스캔**
   - 개발자 도구 → axe DevTools 탭
   - "Scan ALL of my page" 클릭
3. **결과 확인**
   ```
   Critical: ___
   Serious: ___
   Moderate: ___
   Minor: ___
   ```

**스크린샷**:
- axe DevTools 결과

---

## 6-2. 수동 접근성 테스트

### 키보드 네비게이션

1. **Tab 키로 페이지 탐색**
   - [ ] 모든 인터랙티브 요소 접근 가능
   - [ ] 포커스 표시 명확 (outline)
   - [ ] 논리적 순서로 이동

2. **Enter/Space로 버튼 클릭**
   - [ ] "Add to Cart" 버튼 작동
   - [ ] "Proceed to Checkout" 버튼 작동
   - [ ] 링크 네비게이션 작동

### 스크린 리더 테스트 (선택)

**도구**: NVDA (Windows) 또는 VoiceOver (Mac)

1. **스크린 리더 켜기**
2. **페이지 탐색**
   - [ ] 헤딩 구조 논리적
   - [ ] 이미지 alt 텍스트 적절
   - [ ] 버튼/링크 설명 명확

---

# 🔵 Task #7: 경쟁사 분석 (선택)

**중요도**: 🔵 **LOW** (시간 여유 시)
**예상 소요 시간**: 1시간

---

## 7-1. 경쟁사 선정

유사한 기능/타겟의 사이트 3개 선정:

1. **경쟁사 A**: [URL]
2. **경쟁사 B**: [URL]
3. **경쟁사 C**: [URL]

---

## 7-2. 비교 분석

### 기능 비교

| 기능 | E-MARKET | 경쟁사 A | 경쟁사 B | 경쟁사 C |
|------|----------|----------|----------|----------|
| 다국어 지원 | EN/FR/KO | | | |
| 제품 검색 | | | | |
| 필터링 | | | | |
| 장바구니 | ✅ | | | |
| 결제 방법 | 무통장 입금 | | | |
| 모바일 최적화 | ✅ | | | |

### 성능 비교

| 항목 | E-MARKET | 경쟁사 A | 경쟁사 B | 경쟁사 C |
|------|----------|----------|----------|----------|
| PageSpeed (Desktop) | ___ | ___ | ___ | ___ |
| PageSpeed (Mobile) | ___ | ___ | ___ | ___ |
| LCP | ___ | ___ | ___ | ___ |

### UI/UX 비교

**장점**:
- E-MARKET이 우수한 점

**단점**:
- E-MARKET이 부족한 점

**개선 아이디어**:
- 경쟁사에서 배울 점

---

# 📊 최종 통합 보고서

**모든 Task 완료 후 작성**

---

## 보고서 구조

```markdown
# E-MARKET 전체 검증 최종 보고서

작성일: YYYY-MM-DD
작성자: Perplexity Comet
검토자: Claude Code

---

## 요약 (Executive Summary)

### 전체 상태
- **WordPress 백엔드**: ✅ 복구 완료 / ❌ 복구 실패
- **시스템 안정성**: ✅ 안정 / ⚠️ 주의 / ❌ 불안정
- **사용자 경험**: ✅ 우수 / ⚠️ 보통 / ❌ 개선 필요

### 주요 발견 사항 (Top 5)
1. [발견 1]: [설명]
2. [발견 2]: [설명]
3. [발견 3]: [설명]
4. [발견 4]: [설명]
5. [발견 5]: [설명]

### 즉시 조치 필요 (Critical)
1. [항목 1]: [설명]
2. [항목 2]: [설명]

---

## Task #1: WordPress 백엔드 복구

[Task #1 보고 내용 포함]

---

## Task #2: 전체 시스템 검증

[Task #2 보고 내용 포함]

---

## Task #3: 다국어 기능

[Task #3 보고 내용 포함]

---

## Task #4: UX 개선

[Task #4 보고 내용 포함]

---

## Task #5: 이미지 최적화

[Task #5 보고 내용 포함]

---

## Task #6: 접근성

[Task #6 보고 내용 포함]

---

## Task #7: 경쟁사 분석 (선택)

[Task #7 보고 내용 포함 - 수행한 경우]

---

## 종합 점수

### 기능 완성도: ___ / 100
- 주문 프로세스: ___ / 20
- 장바구니: ___ / 20
- 제품 표시: ___ / 20
- 다국어: ___ / 20
- 결제: ___ / 20

### 성능: ___ / 100
- Desktop PageSpeed: ___ / 50
- Mobile PageSpeed: ___ / 50

### 보안: ___ / 100
- SSL/TLS: ___ / 33
- 보안 헤더: ___ / 33
- CORS: ___ / 34

### 접근성: ___ / 100
- WAVE 점수: ___ / 50
- axe 점수: ___ / 50

### 총점: ___ / 400

---

## 개선 로드맵

### 1주일 이내 (Critical)
1. [항목]: [설명]
2. [항목]: [설명]

### 1개월 이내 (High)
1. [항목]: [설명]
2. [항목]: [설명]

### 3개월 이내 (Medium)
1. [항목]: [설명]
2. [항목]: [설명]

### 장기 (Low)
1. [항목]: [설명]
2. [항목]: [설명]

---

## 스크린샷 인덱스

[모든 스크린샷 목록 및 설명]

---

## 부록

### A. 테스트 환경
- OS: [정보]
- 브라우저: [정보]
- 화면 해상도: [정보]

### B. 사용한 도구
- PageSpeed Insights
- Lighthouse
- SSL Labs
- Security Headers
- WAVE
- axe DevTools

### C. API 엔드포인트 목록
- WordPress REST API: https://wp-emarket.whmarketing.org/wp-json/wp/v2
- WooCommerce API: https://wp-emarket.whmarketing.org/wp-json/wc/v3

---

**보고서 완료 일시**: YYYY-MM-DD HH:MM (KST)
**다음 검증 예정일**: YYYY-MM-DD
**담당자**: Perplexity Comet
**승인자**: Claude Code
```

---

# 📞 연락처 및 리소스

## 긴급 연락처

- **이메일**: jyongchul@gmail.com
- **전화**: 010-9333-2028
- **카카오톡**: jyongchul

## 대시보드 URL

- **Cloudflare**: https://dash.cloudflare.com/
- **Vercel**: https://vercel.com/dashboard
- **GitHub**: https://github.com/jyongchul/emarket-frontend

## 프로젝트 URL

- **Frontend**: https://emarket-frontend-one.vercel.app
- **Backend**: https://wp-emarket.whmarketing.org
- **WordPress Admin**: https://wp-emarket.whmarketing.org/wp-admin

## 참고 문서

| 문서명 | 경로 | 용도 |
|--------|------|------|
| **통합 작업 지시서** | `/mnt/c/EMARKET/PERPLEXITY_COMET_MASTER_TASKS.md` | 이 문서 |
| **긴급 상황 보고서** | `/mnt/c/EMARKET/URGENT_STATUS_REPORT.md` | 현재 상태 |
| **자동 복구 스크립트** | `/mnt/c/EMARKET/scripts/wordpress_auto_recovery.sh` | 복구 도구 |
| **복구 가이드** | `/mnt/c/EMARKET/scripts/RECOVERY_GUIDE.md` | 상세 절차 |
| **배포 상태** | `/mnt/c/EMARKET/DEPLOYMENT_STATUS.md` | 아키텍처 |

---

# ✅ 작업 완료 체크리스트

## 우선순위별 진행 상태

### 🔴 긴급 (즉시)
- [ ] Task #1: WordPress 백엔드 복구
  - [ ] 1-1. 복구 전 준비
  - [ ] 1-2. Cloudflare Dashboard 확인
  - [ ] 1-3. 로컬 서버 진단
  - [ ] 1-4. 자동 복구 실행
  - [ ] 1-5. 복구 후 검증
  - [ ] 1-6. 로그 수집
  - [ ] 1-7. 복구 보고서 작성

### 🟡 높음 (복구 후)
- [ ] Task #2: 전체 시스템 검증
  - [ ] 2-1. End-to-End 통합 테스트
  - [ ] 2-2. 디바이스 호환성
  - [ ] 2-3. 성능 최적화 검증
  - [ ] 2-4. 보안 검증
  - [ ] 2-5. 보고서 작성

### 🟢 중간 (안정 후)
- [ ] Task #3: 다국어 기능 테스트
- [ ] Task #4: UX 개선 사항 발굴
- [ ] Task #5: 이미지 최적화 검증
- [ ] Task #6: 접근성 검증

### 🔵 낮음 (선택)
- [ ] Task #7: 경쟁사 분석

### 📊 최종
- [ ] 통합 보고서 작성
- [ ] 스크린샷 정리
- [ ] Claude Code에게 전달

---

# 🎯 성공 기준

## Task #1 성공 기준
- [ ] WordPress 백엔드 정상 작동 (HTTP 200)
- [ ] Cloudflare Tunnel 상태 Healthy
- [ ] 모든 서비스 자동 시작 설정됨
- [ ] API 응답 시간 3초 이내
- [ ] Frontend에서 제품 표시

## Task #2 성공 기준
- [ ] 전체 주문 프로세스 완료 가능
- [ ] Desktop PageSpeed 90점 이상
- [ ] Mobile PageSpeed 80점 이상
- [ ] 모든 브라우저에서 정상 작동
- [ ] SSL A 등급 이상

## 전체 프로젝트 성공 기준
- [ ] 사이트 기능 100% 작동
- [ ] 성능 점수 평균 85점 이상
- [ ] 보안 점수 A 등급 이상
- [ ] 접근성 오류 0개
- [ ] 재발 방지 조치 완료

---

**문서 버전**: 1.0
**최종 업데이트**: 2025-11-09 15:00 (KST)
**작성자**: Claude Code
**담당자**: Perplexity Comet

---

**시작하기**: Task #1부터 순서대로 진행하세요. 각 Task 완료 후 보고서를 작성하고 다음 Task로 이동하세요.

**질문 또는 문제 발생 시**: 즉시 jyongchul@gmail.com으로 연락하세요.

**Good Luck! 🚀**
