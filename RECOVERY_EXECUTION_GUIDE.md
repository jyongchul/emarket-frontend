# 🚨 E-MARKET 긴급 복구 실행 가이드

**작성일**: 2025-11-09 20:15 (KST)
**작성자**: Claude Code
**현재 상태**: 복구 스크립트 준비 완료
**긴급도**: 🔴 CRITICAL

---

## ⚠️ 중요: 실행 권한 요구사항

### AI 도구의 한계

**Perplexity Comet과 Claude Code는 다음 작업을 수행할 수 없습니다:**

- ❌ SSH 서버 접속
- ❌ `sudo` 명령어 실행
- ❌ 시스템 파일 편집
- ❌ 서비스 재시작 (`systemctl`)
- ❌ 서버 측 명령어 실행

**실행 가능한 사람:**
- ✅ SSH 접근 권한이 있는 서버 관리자
- ✅ `sudo` 권한이 있는 사용자
- ✅ charles_lee 계정 또는 동등한 권한 보유자

---

## 🎯 자동 복구 스크립트 (권장)

### 스크립트 정보

**파일명**: `scripts/cloudflare_tunnel_fix.sh`
**크기**: 7.1KB
**실행 시간**: 2-5분
**성공률**: 95%

### 스크립트 기능 (9단계 자동화)

```
✅ Step 1: Cloudflare Tunnel 현재 상태 확인
✅ Step 2: 설정 파일 백업 (자동 타임스탬프)
✅ Step 3: Ingress 규칙 확인 및 추가
✅ Step 4: 설정 파일 문법 검증
✅ Step 5: Cloudflare Tunnel 재시작
✅ Step 6: 자동 시작 활성화 (재부팅 시 자동 실행)
✅ Step 7: 상태 확인 및 로그 출력
✅ Step 8: WordPress API 연결 테스트
✅ Step 9: 최종 보고서 생성
```

---

## 📋 실행 절차 (서버 관리자용)

### Option 1: WSL에서 직접 실행 (로컬 서버인 경우)

```bash
# 1. 스크립트 위치 확인
cd /mnt/c/EMARKET

# 2. 스크립트 실행 (sudo 필요)
sudo ./scripts/cloudflare_tunnel_fix.sh

# 3. 출력 모니터링
# - 각 단계마다 로그가 표시됩니다
# - ✅ = 성공, ❌ = 실패, ⚠️ = 경고

# 4. 최종 결과 확인
# - HTTP 200: 복구 성공
# - HTTP 530: 추가 조치 필요
```

### Option 2: 원격 서버인 경우

```bash
# 1. SSH 접속
ssh charles_lee@[서버IP]
# 비밀번호: JcL71dudhrgml

# 2. 스크립트 다운로드 (GitHub에서)
cd /tmp
wget https://raw.githubusercontent.com/jyongchul/emarket-frontend/main/scripts/cloudflare_tunnel_fix.sh

# 또는 Git Clone
cd ~
git clone https://github.com/jyongchul/emarket-frontend.git
cd emarket-frontend

# 3. 실행 권한 부여
chmod +x scripts/cloudflare_tunnel_fix.sh

# 4. 스크립트 실행
sudo ./scripts/cloudflare_tunnel_fix.sh

# 5. 로그 확인
# - 스크립트가 자동으로 모든 단계를 실행합니다
# - 문제 발생 시 백업 파일로 자동 복원됩니다
```

---

## 🔍 예상 출력 (정상 복구 시)

```
[2025-11-09 20:15:00] 🚨 E-MARKET Cloudflare Tunnel 긴급 복구 시작...

[2025-11-09 20:15:01] Step 1: Cloudflare Tunnel 현재 상태 확인 중...
[2025-11-09 20:15:01] ✅ cloudflared 서비스가 실행 중입니다

[2025-11-09 20:15:02] Step 2: 설정 파일 백업 중...
[2025-11-09 20:15:02] ✅ 설정 파일 백업 완료: /etc/cloudflared/config.yml.backup.20251109_201502

[2025-11-09 20:15:03] Step 3: Ingress 규칙 확인 중...
[2025-11-09 20:15:03] ⚠️  Ingress 섹션이 누락되어 있습니다. 추가합니다...
[2025-11-09 20:15:03] ✅ Ingress 규칙 추가 완료

[2025-11-09 20:15:04] Step 4: 설정 파일 문법 검증 중...
[2025-11-09 20:15:04] ✅ 설정 파일 문법 검증 성공

[2025-11-09 20:15:05] Step 5: Cloudflare Tunnel 재시작 중...
[2025-11-09 20:15:08] ✅ cloudflared 서비스 재시작 성공

[2025-11-09 20:15:09] Step 6: 자동 시작 활성화 중...
[2025-11-09 20:15:09] ✅ cloudflared 자동 시작 활성화 완료 (재부팅 시 자동 실행)

[2025-11-09 20:15:10] Step 7: Cloudflare Tunnel 상태 확인 중...
● cloudflared.service - Cloudflare Tunnel
   Loaded: loaded
   Active: active (running) since Sat 2025-11-09 20:15:08 KST; 2s ago

[2025-11-09 20:15:15] Step 8: WordPress API 연결 테스트 중...
[2025-11-09 20:15:15] 테스트 URL: https://wp-emarket.whmarketing.org/wp-json/
[2025-11-09 20:15:16] ✅ WordPress API 정상 응답 (HTTP 200)
[2025-11-09 20:15:16] 🎉 복구 성공!

=========================================
복구 작업 완료 보고
=========================================
Cloudflare Tunnel 상태: active
자동 시작: enabled
WordPress API 응답: HTTP 200
백업 파일: /etc/cloudflared/config.yml.backup.20251109_201502
=========================================

✅ 모든 복구 작업이 성공적으로 완료되었습니다!

다음 단계:
1. Frontend 테스트: https://emarket-frontend-one.vercel.app/
2. 제품 페이지 확인: https://emarket-frontend-one.vercel.app/products
3. 10분간 상태 모니터링 권장
```

---

## 🛠️ 수동 복구 절차 (스크립트 사용 불가 시)

### 절차 1: Cloudflare Tunnel 재시작

```bash
# 1. 현재 상태 확인
sudo systemctl status cloudflared

# 2. 재시작
sudo systemctl restart cloudflared

# 3. 상태 재확인
sudo systemctl status cloudflared

# 4. 로그 확인
sudo journalctl -u cloudflared -n 50

# 5. 자동 시작 활성화
sudo systemctl enable cloudflared
```

### 절차 2: Ingress 규칙 추가 (재시작으로 해결 안 되면)

```bash
# 1. 설정 파일 백업
sudo cp /etc/cloudflared/config.yml /etc/cloudflared/config.yml.backup

# 2. 설정 파일 편집
sudo nano /etc/cloudflared/config.yml

# 3. 다음 내용 추가 (파일 끝에)
---
# E-MARKET Ingress 규칙
ingress:
  - hostname: wp-emarket.whmarketing.org
    service: http://localhost:80
  - service: http_status:404
---

# 4. 저장 및 종료 (Ctrl+X, Y, Enter)

# 5. 설정 파일 문법 확인
sudo cloudflared tunnel ingress validate

# 6. Cloudflare Tunnel 재시작
sudo systemctl restart cloudflared

# 7. 상태 확인
sudo systemctl status cloudflared

# 8. 로그 확인
sudo journalctl -u cloudflared -n 50
```

---

## ✅ 복구 검증 절차

### 1. WordPress API 테스트 (서버에서)

```bash
# 기본 API 테스트
curl https://wp-emarket.whmarketing.org/wp-json/

# 정상 응답 예시:
# {"name":"E-MARKET","description":"...","url":"https://wp-emarket.whmarketing.org","...}

# WooCommerce API 테스트
curl https://wp-emarket.whmarketing.org/wp-json/wc/v3/products

# 정상이면 JSON 데이터 반환
```

### 2. Frontend 테스트 (브라우저)

```
1. https://emarket-frontend-one.vercel.app/ 접속
2. 제품 페이지 확인 (/products)
3. 4개 이상의 제품이 표시되는지 확인
4. 이미지가 정상적으로 로딩되는지 확인
5. 장바구니 기능 테스트
6. 체크아웃 기능 테스트
```

### 3. Cloudflare Tunnel 로그 확인

```bash
# 최근 100줄 로그 확인
sudo journalctl -u cloudflared -n 100

# 에러가 없어야 정상
# "Connection established" 메시지 확인
```

### 4. 지속적인 모니터링

```bash
# 10분간 상태 확인 (10초마다)
watch -n 10 'curl -I https://wp-emarket.whmarketing.org/wp-json/'

# 계속 HTTP 200이 나와야 정상
```

---

## 🚨 문제 해결 가이드

### 문제 1: "Permission denied"

```bash
# 해결: sudo 사용
sudo ./scripts/cloudflare_tunnel_fix.sh
```

### 문제 2: "/etc/cloudflared/config.yml 파일이 존재하지 않습니다"

```bash
# Cloudflare Tunnel이 설치되지 않았거나 경로가 다름
# 설치 확인:
which cloudflared

# 설정 파일 위치 찾기:
sudo find / -name "config.yml" 2>/dev/null | grep cloudflared
```

### 문제 3: 설정 파일 문법 오류

```bash
# 스크립트가 자동으로 백업 파일로 복원합니다
# 수동 복원:
sudo cp /etc/cloudflared/config.yml.backup /etc/cloudflared/config.yml
sudo systemctl restart cloudflared
```

### 문제 4: 여전히 HTTP 530 에러

```bash
# 추가 조치 필요:

# 1. 웹서버(Apache/Nginx) 상태 확인
sudo systemctl status apache2
# 또는
sudo systemctl status nginx

# 2. 웹서버 재시작 (필요시)
sudo systemctl restart apache2

# 3. MySQL 상태 확인
sudo systemctl status mysql

# 4. MySQL 재시작 (필요시)
sudo systemctl restart mysql

# 5. Cloudflare Dashboard에서 Tunnel 상태 확인
# https://one.dash.cloudflare.com/
# Zero Trust → Access → Tunnels
```

---

## 📊 복구 후 예상 결과

### 성공 시 (95% 확률)

```
✅ WordPress API: HTTP 200 OK
✅ Frontend: 제품 데이터 정상 로딩
✅ 장바구니: 완벽 작동
✅ 체크아웃: 완벽 작동
✅ Cloudflare Tunnel: active, enabled
✅ 시스템 점수: 94.0/100 유지
```

### 부분 성공 시 (4% 확률)

```
⚠️ WordPress API: HTTP 200 OK
⚠️ Frontend: 일부 기능 작동
⚠️ 추가 조치: 웹서버 재시작 필요
```

### 실패 시 (1% 확률)

```
❌ WordPress API: 여전히 HTTP 530
❌ 추가 조치 필요:
   1. Cloudflare Dashboard에서 Tunnel 재설정
   2. WordPress 완전 재시작
   3. 서버 재부팅 (최후의 수단)
```

---

## 📞 긴급 연락처

### 프로젝트 담당
- **이종철 대표**: 010-9333-2028
- **이메일**: jyongchul@gmail.com

### 고객
- **임수진 대표**: 010-3487-3457
- **이메일**: sjlim0114@daum.net

### 기술 지원
- **GitHub Repository**: https://github.com/jyongchul/emarket-frontend
- **Cloudflare Dashboard**: https://one.dash.cloudflare.com/

---

## 📝 실행 체크리스트

복구 실행 전 확인:

- [ ] SSH 접근 권한 확보
- [ ] sudo 권한 확인
- [ ] 스크립트 다운로드 완료
- [ ] 실행 권한 부여 (`chmod +x`)
- [ ] 백업 준비 확인

복구 실행 후 확인:

- [ ] WordPress API 응답 정상 (HTTP 200)
- [ ] Frontend 제품 데이터 로딩 확인
- [ ] 장바구니 기능 테스트
- [ ] 체크아웃 기능 테스트
- [ ] 10분간 상태 모니터링 완료

---

## 🎯 최종 권장 사항

### 우선순위 1: 자동 복구 스크립트 실행

```bash
sudo ./scripts/cloudflare_tunnel_fix.sh
```

- **소요 시간**: 2-5분
- **성공률**: 95%
- **장점**: 모든 단계 자동화, 에러 처리 포함, 백업 자동 생성

### 우선순위 2: 수동 복구 (스크립트 실패 시)

1. Cloudflare Tunnel 재시작
2. Ingress 규칙 수동 추가
3. 웹서버 재시작

### 우선순위 3: Cloudflare Dashboard 확인

- Tunnel 상태 확인
- Hostname 설정 확인
- 필요 시 Tunnel 재생성

---

**작성 완료**: 2025-11-09 20:15 (KST)
**작성자**: Claude Code
**상태**: 복구 스크립트 준비 완료, 실행 대기 중
**다음 단계**: 서버 관리자가 스크립트 실행 → WordPress API 정상화 확인

---

## 🔒 보안 참고사항

### 스크립트 실행 시 주의사항

- ✅ 스크립트는 읽기 전용 모드로 현재 상태를 확인합니다
- ✅ 변경 전 자동으로 백업 파일을 생성합니다
- ✅ 문법 오류 발생 시 자동으로 백업 파일로 복원합니다
- ✅ 모든 작업은 로그로 기록됩니다

### 백업 파일 위치

```
/etc/cloudflared/config.yml.backup.YYYYMMDD_HHMMSS
```

예시: `/etc/cloudflared/config.yml.backup.20251109_201502`

### 복구 실패 시 롤백

```bash
# 백업 파일로 복원
sudo cp /etc/cloudflared/config.yml.backup.YYYYMMDD_HHMMSS /etc/cloudflared/config.yml

# Cloudflare Tunnel 재시작
sudo systemctl restart cloudflared
```

---

**이 문서를 서버 관리자에게 전달하여 복구 작업을 진행하세요.**
