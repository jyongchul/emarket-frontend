# WordPress 백엔드 긴급 복구 가이드

작성일: 2025-11-09
대상: 로컬 WordPress 서버 관리자 또는 SSH 접근 가능한 운영자

---

## 🔴 긴급 상황 개요

**현재 상태** (2025-11-09 13:50 발견):
- WordPress 백엔드: ❌ **완전 다운** (HTTP 530, Cloudflare Error 1033)
- Cloudflare Tunnel: ❌ 연결 실패
- Vercel Frontend: ✅ 정상 (UI만 표시, 데이터 없음)

**영향**:
- 전체 사이트 기능 중단
- 제품 데이터 로딩 불가
- 주문 접수 불가
- 이미지 로딩 실패

---

## 🚀 빠른 복구 절차 (3분 소요)

### 1단계: SSH 접속

로컬 WordPress 서버에 SSH로 접속하세요.

```bash
# 예시 (실제 IP/호스트명으로 교체)
ssh user@your-server-ip
```

### 2단계: 자동 복구 스크립트 실행

```bash
# 스크립트 위치로 이동 (또는 절대 경로 사용)
cd /path/to/EMARKET/scripts/

# 스크립트 실행 (sudo 권한 필요)
sudo ./wordpress_auto_recovery.sh
```

**스크립트가 자동으로 수행하는 작업**:
1. ✅ 시스템 진단 (cloudflared, Apache/Nginx, MySQL)
2. ✅ 중지된 서비스 자동 재시작
3. ✅ 자동 시작 설정 활성화
4. ✅ 60초 대기 후 API 엔드포인트 테스트
5. ✅ 복구 결과 로그 저장

**예상 소요 시간**: 약 2-3분

### 3단계: 복구 확인

스크립트 실행 후 다음 명령어로 서비스 상태를 확인하세요:

```bash
# Cloudflare Tunnel 상태
sudo systemctl status cloudflared

# 웹서버 상태
sudo systemctl status apache2
# 또는
sudo systemctl status nginx

# MySQL 상태
sudo systemctl status mysql
```

**모든 서비스가 "active (running)" 상태여야 합니다.**

### 4단계: API 테스트

```bash
# WordPress REST API 테스트
curl https://wp-emarket.whmarketing.org/wp-json/wp/v2

# WooCommerce API 테스트
curl https://wp-emarket.whmarketing.org/wp-json/wc/v3/products
```

**기대 결과**: JSON 응답 (에러 아님)

### 5단계: Frontend 확인

브라우저에서 다음 URL을 열고 제품이 표시되는지 확인:

**Frontend URL**: https://emarket-frontend-one.vercel.app

**확인 사항**:
- [ ] 제품 목록이 표시되는가?
- [ ] 이미지가 로딩되는가?
- [ ] 제품 클릭 시 상세 페이지가 열리는가?

---

## 🔧 수동 복구 절차 (스크립트 실행 불가 시)

### 시나리오 A: Cloudflare Tunnel만 다운

```bash
# 1. Tunnel 상태 확인
sudo systemctl status cloudflared

# 2. Tunnel 재시작
sudo systemctl restart cloudflared

# 3. 자동 시작 활성화
sudo systemctl enable cloudflared

# 4. 로그 확인 (문제 발생 시)
sudo journalctl -u cloudflared -n 50 --no-pager

# 5. 60초 대기 후 테스트
sleep 60
curl https://wp-emarket.whmarketing.org/wp-json/wp/v2
```

### 시나리오 B: WordPress 서버도 다운

```bash
# 1. MySQL 시작
sudo systemctl start mysql
sudo systemctl enable mysql

# 2. Apache 또는 Nginx 시작
sudo systemctl start apache2
sudo systemctl enable apache2
# 또는
sudo systemctl start nginx
sudo systemctl enable nginx

# 3. WordPress 로컬 접근 확인
curl http://localhost/wp-admin/

# 4. Cloudflare Tunnel 재시작 (위 시나리오 A 참조)
sudo systemctl restart cloudflared
sudo systemctl enable cloudflared

# 5. 60초 대기 후 테스트
sleep 60
curl https://wp-emarket.whmarketing.org/wp-json/wp/v2
```

### 시나리오 C: systemd를 사용하지 않는 경우

```bash
# cloudflared 수동 실행
cloudflared tunnel run wp-emarket

# 백그라운드 실행
nohup cloudflared tunnel run wp-emarket > /var/log/cloudflared.log 2>&1 &
```

---

## 📊 복구 후 보고 양식

복구 완료 후 다음 정보를 기록하세요:

```markdown
## WordPress 백엔드 복구 결과

### 진단 결과
- **발견 시간**: 2025-11-09 13:50 (KST)
- **복구 완료 시간**: [YYYY-MM-DD HH:MM]
- **다운 원인**: [Cloudflare Tunnel / WordPress 서버 / MySQL / 기타]
- **다운 시간**: [X시간 X분]

### 복구 조치
1. [수행한 조치 1]
2. [수행한 조치 2]
3. [수행한 조치 3]

### 복구 후 테스트 결과
- [ ] Cloudflare Tunnel: ✅ Healthy / ❌ Down
- [ ] WordPress API: ✅ 정상 (응답 시간: XXXms) / ❌ 실패
- [ ] WooCommerce API: ✅ 정상 (응답 시간: XXXms) / ❌ 실패
- [ ] Vercel Frontend: ✅ 제품 표시 정상 / ❌ 표시 안 됨
- [ ] 이미지 로딩: ✅ 정상 / ❌ 실패

### 자동 재시작 설정
- [ ] cloudflared: ✅ systemd 자동 시작 활성화됨 / ❌ 수동 실행 필요
- [ ] Apache/Nginx: ✅ 자동 시작 활성화됨 / ❌ 수동 실행 필요
- [ ] MySQL: ✅ 자동 시작 활성화됨 / ❌ 수동 실행 필요

### 로그 파일 위치
- cloudflared: /var/log/wordpress_recovery_[날짜시간].log
- Apache: /var/log/apache2/error.log
- Nginx: /var/log/nginx/error.log
- MySQL: /var/log/mysql/error.log

### 재발 방지 조치
- [ ] 모니터링 설정 (예: UptimeRobot, StatusCake)
- [ ] 알림 설정 (이메일/SMS)
- [ ] 자동 재시작 cron job 설정
- [ ] 로그 정기 점검 일정 수립

### 스크린샷
- [ ] Cloudflare Dashboard - Tunnel 상태 (복구 전/후)
- [ ] Frontend - 제품 목록 (복구 전/후)
- [ ] systemctl status 출력 (모든 서비스)
```

---

## 🛡️ 재발 방지 조치

### 1. 자동 재시작 설정 확인

```bash
# 모든 서비스가 부팅 시 자동 시작되는지 확인
systemctl is-enabled cloudflared
systemctl is-enabled apache2  # 또는 nginx
systemctl is-enabled mysql

# 비활성화된 경우 활성화
sudo systemctl enable cloudflared
sudo systemctl enable apache2
sudo systemctl enable mysql
```

### 2. 모니터링 설정 (권장)

**외부 모니터링 서비스 사용**:
- [UptimeRobot](https://uptimerobot.com/) (무료)
- [StatusCake](https://www.statuscake.com/) (무료)
- [Pingdom](https://www.pingdom.com/)

**모니터링 대상 URL**:
- https://wp-emarket.whmarketing.org/wp-json/wp/v2
- https://emarket-frontend-one.vercel.app

**알림 설정**:
- 이메일: jyongchul@gmail.com
- SMS: 010-9333-2028

### 3. 정기 헬스체크 cron job

```bash
# crontab 편집
crontab -e

# 다음 줄 추가 (5분마다 헬스체크)
*/5 * * * * curl -s https://wp-emarket.whmarketing.org/wp-json/wp/v2 > /dev/null || /path/to/wordpress_auto_recovery.sh

# 또는 매시간 정기 점검
0 * * * * /path/to/wordpress_auto_recovery.sh --check-only
```

### 4. 로그 정기 점검

```bash
# cloudflared 로그 확인
sudo journalctl -u cloudflared --since "1 hour ago" --no-pager

# Apache 에러 로그
sudo tail -100 /var/log/apache2/error.log

# MySQL 에러 로그
sudo tail -100 /var/log/mysql/error.log
```

---

## 🆘 문제 해결 (Troubleshooting)

### Q1: cloudflared가 계속 실패합니다

**확인 사항**:
1. Cloudflare Dashboard에서 Tunnel 설정 확인
2. Tunnel 토큰/인증 파일 확인
3. 로컬 WordPress 포트 확인 (8080, 8005 등)

```bash
# cloudflared 설정 확인
cat ~/.cloudflared/config.yml

# 로그 상세 확인
sudo journalctl -u cloudflared -n 100 --no-pager

# 수동 실행 (디버깅 모드)
cloudflared tunnel --loglevel debug run wp-emarket
```

### Q2: MySQL이 시작되지 않습니다

```bash
# MySQL 에러 로그 확인
sudo tail -100 /var/log/mysql/error.log

# MySQL 데이터 디렉토리 권한 확인
ls -ld /var/lib/mysql

# MySQL 복구 시도
sudo mysqld --skip-grant-tables &
```

### Q3: Apache/Nginx가 시작되지 않습니다

```bash
# 포트 사용 확인 (80, 443)
sudo netstat -tlnp | grep ':80\|:443'
sudo lsof -i :80
sudo lsof -i :443

# 설정 파일 검증
sudo apache2ctl configtest
# 또는
sudo nginx -t

# 에러 로그 확인
sudo tail -100 /var/log/apache2/error.log
sudo tail -100 /var/log/nginx/error.log
```

### Q4: API는 작동하지만 Frontend에서 데이터가 안 보입니다

**Vercel 환경 변수 확인**:
1. https://vercel.com/dashboard 접속
2. emarket-frontend-one 프로젝트 선택
3. Settings → Environment Variables 확인:
   - `WORDPRESS_API_URL`: https://wp-emarket.whmarketing.org/wp-json/wp/v2
   - `WOOCOMMERCE_API_URL`: https://wp-emarket.whmarketing.org/wp-json/wc/v3

**Vercel 재배포**:
```bash
# 로컬에서
git commit --allow-empty -m "Trigger Vercel rebuild"
git push origin main
```

---

## 📞 긴급 연락처

**프로젝트 담당**:
- 이메일: jyongchul@gmail.com
- 전화: 010-9333-2028
- 카카오톡: jyongchul

**Cloudflare 대시보드**:
- URL: https://dash.cloudflare.com/
- 계정: [Cloudflare 계정 정보]

**Vercel 대시보드**:
- URL: https://vercel.com/dashboard
- 계정: jyongchul@gmail.com

---

## 📁 관련 파일

- **자동 복구 스크립트**: `/mnt/c/EMARKET/scripts/wordpress_auto_recovery.sh`
- **복구 가이드** (이 파일): `/mnt/c/EMARKET/scripts/RECOVERY_GUIDE.md`
- **배포 상태 문서**: `/mnt/c/EMARKET/DEPLOYMENT_STATUS.md`
- **Perplexity Comet 작업 지시서**: `/mnt/c/EMARKET/PERPLEXITY_COMET_TASKS.md`

---

**작성자**: Claude Code
**최종 업데이트**: 2025-11-09 14:21 (KST)
**긴급도**: 🔴🔴🔴 **CRITICAL**
