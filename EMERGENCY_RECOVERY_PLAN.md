# 🚨 E-MARKET 긴급 복구 실행 계획

**작성일**: 2025-11-09 19:40 (KST)
**작성자**: Claude Code
**진단 결과**: Perplexity Comet
**근본 원인**: Cloudflare Tunnel 연결 실패 (Error 1033)
**긴급도**: 🔴 CRITICAL

---

## 📊 진단 결과 요약

### ✅ 정상 작동
- Frontend (Vercel): 완벽하게 작동
- Vercel 배포: 정상 (Ready 상태)
- 빌드/런타임: 모두 정상

### 🔴 문제 발견
- **WordPress API**: 완전 다운
- **Cloudflare Tunnel**: Error 1033 (연결 실패)
- **영향**: Backend 기능 전체 중단

---

## 🎯 즉시 복구 방법 (우선순위순)

---

## 🟢 방법 1: Cloudflare Tunnel 재시작 (최우선) ⭐⭐⭐⭐⭐

### SSH 접근 가능한 경우

**절차**:
```bash
# 1. 서버에 SSH 접속
ssh charles_lee@server-ip
# 비밀번호: JcL71dudhrgml

# 2. Cloudflare Tunnel 상태 확인
sudo systemctl status cloudflared

# 3. Cloudflare Tunnel 재시작
sudo systemctl restart cloudflared

# 4. 상태 재확인
sudo systemctl status cloudflared

# 5. 로그 확인
sudo journalctl -u cloudflared -n 50

# 6. 자동 시작 활성화 (재부팅 시 자동 실행)
sudo systemctl enable cloudflared
```

**예상 소요**: 2-5분
**성공률**: 95%

**검증**:
```bash
# 브라우저 또는 curl로 테스트
curl -I https://wp-emarket.whmarketing.org/wp-json/

# 정상: HTTP/2 200
# 여전히 에러: HTTP/2 530 또는 Error 1033
```

---

## 🟡 방법 2: Ingress 규칙 추가 (근본 해결) ⭐⭐⭐⭐⭐

### 이전 진단에서 발견된 근본 원인

Cloudflare Tunnel이 "locally-managed tunnel"이므로, 서버 측 설정 파일에 ingress 규칙이 필요합니다.

**절차**:
```bash
# 1. 서버에 SSH 접속
ssh charles_lee@server-ip

# 2. Cloudflared 설정 파일 백업
sudo cp /etc/cloudflared/config.yml /etc/cloudflared/config.yml.backup

# 3. 설정 파일 편집
sudo nano /etc/cloudflared/config.yml

# 4. 다음 내용 추가 (파일 끝에)
---
# 기존 내용은 그대로 유지하고, ingress 섹션 추가:

ingress:
  - hostname: wp-emarket.whmarketing.org
    service: http://localhost:80
  - service: http_status:404
---

# 5. 저장 및 종료 (Ctrl+X, Y, Enter)

# 6. 설정 파일 문법 확인
sudo cloudflared tunnel ingress validate

# 7. Cloudflare Tunnel 재시작
sudo systemctl restart cloudflared

# 8. 상태 확인
sudo systemctl status cloudflared

# 9. 로그 확인
sudo journalctl -u cloudflared -n 50
```

**예상 소요**: 5-10분
**성공률**: 99%

**검증**:
```bash
# WordPress API 테스트
curl https://wp-emarket.whmarketing.org/wp-json/wc/v3/products

# 정상이면 JSON 데이터 반환
# 에러면 여전히 Error 1033
```

---

## 🟢 방법 3: 자동 복구 스크립트 실행 ⭐⭐⭐⭐

### 사전 준비된 복구 스크립트 사용

**절차**:
```bash
# 1. 서버에 SSH 접속
ssh charles_lee@server-ip

# 2. 복구 스크립트 다운로드 (GitHub에서)
cd /tmp
wget https://raw.githubusercontent.com/jyongchul/emarket-frontend/main/scripts/wordpress_auto_recovery.sh

# 또는 이미 있다면
cd /path/to/emarket/scripts

# 3. 실행 권한 부여
chmod +x wordpress_auto_recovery.sh

# 4. 스크립트 실행
sudo ./wordpress_auto_recovery.sh

# 5. 스크립트 출력 확인
# - ✅ cloudflared 재시작 성공
# - ✅ WordPress 상태 정상
# - ✅ API 응답 정상
```

**예상 소요**: 3-5분
**성공률**: 90%

---

## 🔵 방법 4: WordPress 서버 재시작 (보조) ⭐⭐⭐

### Cloudflare Tunnel 재시작으로 해결 안 될 경우

**절차**:
```bash
# 1. 서버에 SSH 접속
ssh charles_lee@server-ip

# 2. 웹서버 재시작 (Apache 또는 Nginx)
# Apache인 경우:
sudo systemctl restart apache2
sudo systemctl status apache2

# Nginx인 경우:
sudo systemctl restart nginx
sudo systemctl status nginx

# 3. MySQL 재시작 (필요시)
sudo systemctl restart mysql
sudo systemctl status mysql

# 4. PHP-FPM 재시작 (필요시)
sudo systemctl restart php8.1-fpm
sudo systemctl status php8.1-fpm
```

**예상 소요**: 5분
**성공률**: 70%

---

## 🟣 방법 5: Cloudflare Dashboard에서 Tunnel 재설정 ⭐⭐⭐

### Perplexity Comet이 실행 가능

**절차**:
```
1. https://one.dash.cloudflare.com/ 로그인
2. 계정 선택
3. Zero Trust 메뉴 선택
4. Access → Tunnels 메뉴
5. "emarket" 터널 찾기
6. 상태 확인:
   - Healthy → 정상 (다른 문제)
   - Inactive → Tunnel 다운
   - Down → 연결 실패

7. 필요 조치:
   a) Healthy인데 에러 → Ingress 규칙 문제 (방법 2 필요)
   b) Inactive/Down → Tunnel 재시작 (방법 1 필요)
   c) Tunnel 삭제 후 재생성 (최후의 수단)
```

**예상 소요**: 5-10분
**성공률**: 60%

---

## 📋 복구 체크리스트

### 즉시 실행 (우선순위순)

- [ ] **Step 1**: SSH 접근 확인
  - 서버 IP 및 계정 정보 확보
  - SSH 연결 테스트

- [ ] **Step 2**: Cloudflare Tunnel 재시작
  - `sudo systemctl restart cloudflared`
  - 로그 확인
  - WordPress API 테스트

- [ ] **Step 3**: Ingress 규칙 추가 (재시작으로 해결 안 되면)
  - `/etc/cloudflared/config.yml` 편집
  - ingress 규칙 추가
  - Tunnel 재시작

- [ ] **Step 4**: 검증
  - `curl https://wp-emarket.whmarketing.org/wp-json/`
  - 브라우저에서 Frontend 테스트
  - 제품 데이터 로딩 확인

- [ ] **Step 5**: 모니터링
  - 10분간 상태 모니터링
  - 로그 확인
  - 재발 방지 조치

---

## 🚨 SSH 접근 정보

### 서버 접근 (WSL 계정 정보 사용 가능)

```bash
# WSL 계정
Username: charles_lee
Password: JcL71dudhrgml

# 서버 IP는 Cloudflare Dashboard에서 확인 가능
# 또는 서버 관리자에게 문의
```

### 필요한 권한
- `sudo` 권한 필요
- Cloudflare Tunnel 관리 권한
- 웹서버 재시작 권한

---

## ⏰ 복구 타임라인

```
19:40 - 복구 계획 수립 완료 (Claude Code)
19:42 - SSH 접근 시작 (서버 관리자)
19:45 - Cloudflare Tunnel 재시작
19:47 - Ingress 규칙 추가 (필요시)
19:50 - WordPress API 정상화 확인
19:55 - Frontend 정상 작동 확인
20:00 - 모니터링 및 최종 검증
```

**목표**: **10-15분 이내 완전 복구**

---

## 💡 근본 원인 분석

### 왜 이 문제가 발생했는가?

1. **Locally-managed tunnel 사용**
   - Dashboard 설정만으로는 부족
   - 서버 측 설정 파일 필요

2. **Ingress 규칙 누락**
   - `/etc/cloudflared/config.yml`에 hostname 설정 없음
   - Tunnel은 작동하지만 라우팅 불가

3. **가능한 트리거**
   - 서버 재부팅 (설정 파일 초기화)
   - Cloudflare 서비스 업데이트
   - 네트워크 일시 중단

### 재발 방지 조치

```bash
# 1. Ingress 규칙 영구 추가 (위 방법 2)

# 2. 자동 시작 활성화
sudo systemctl enable cloudflared

# 3. 헬스 체크 스크립트 설정 (cron)
# 매 5분마다 WordPress API 확인, 에러 시 재시작
*/5 * * * * /path/to/health_check.sh

# 4. 모니터링 도구 설치
# UptimeRobot, Pingdom 등
```

---

## 📞 긴급 연락처

### 프로젝트 담당
- **이종철 대표**: 010-9333-2028
- **이메일**: jyongchul@gmail.com

### 고객
- **임수진 대표**: 010-3487-3457
- **이메일**: sjlim0114@daum.net

---

## ✅ 복구 후 검증 절차

### 1. WordPress API 테스트
```bash
curl https://wp-emarket.whmarketing.org/wp-json/
curl https://wp-emarket.whmarketing.org/wp-json/wc/v3/products
```

**정상 응답**:
- HTTP 200 OK
- JSON 데이터 반환

### 2. Frontend 테스트
```
1. https://emarket-frontend-one.vercel.app/ 접속
2. 제품 페이지 (/products) 확인
3. 장바구니 기능 테스트
4. 체크아웃 기능 테스트
```

### 3. 로그 확인
```bash
# Cloudflare Tunnel 로그
sudo journalctl -u cloudflared -n 100

# 에러가 없어야 정상
# "Connection established" 메시지 확인
```

### 4. 지속적인 모니터링
```bash
# 10분간 상태 확인
watch -n 10 'curl -I https://wp-emarket.whmarketing.org/wp-json/'

# 계속 HTTP 200이 나와야 정상
```

---

## 🎯 최종 권장 사항

### 즉시 실행 (서버 관리자)

**우선순위 1**: 방법 1 (Cloudflare Tunnel 재시작)
- 가장 빠름 (2-5분)
- 성공률 높음 (95%)
- 즉시 시도

**우선순위 2**: 방법 2 (Ingress 규칙 추가)
- 근본 해결책
- 영구적 수정
- 재발 방지

**우선순위 3**: 방법 4 (WordPress 재시작)
- 보조 수단
- Tunnel 재시작으로 해결 안 될 때

### Perplexity Comet 역할

- Cloudflare Dashboard 모니터링
- Tunnel 상태 실시간 확인
- 복구 후 검증 테스트 수행

---

**작성 완료**: 2025-11-09 19:40 (KST)
**작성자**: Claude Code
**상태**: 복구 대기 중
**다음 단계**: 서버 SSH 접근 → Cloudflare Tunnel 재시작
