#!/bin/bash

#####################################################################
# E-MARKET Cloudflare Tunnel 긴급 복구 스크립트
# 작성일: 2025-11-09
# 작성자: Claude Code
# 목적: Cloudflare Tunnel Error 1033 자동 복구
# 사용법: sudo ./cloudflare_tunnel_fix.sh
#####################################################################

set -e  # 에러 발생 시 즉시 중단

# 색상 코드
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 로그 함수
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Root 권한 확인
if [[ $EUID -ne 0 ]]; then
   error "이 스크립트는 root 권한이 필요합니다. 'sudo ./cloudflare_tunnel_fix.sh'로 실행하세요."
   exit 1
fi

log "🚨 E-MARKET Cloudflare Tunnel 긴급 복구 시작..."

#####################################################################
# Step 1: 현재 상태 확인
#####################################################################

log "Step 1: Cloudflare Tunnel 현재 상태 확인 중..."

if systemctl is-active --quiet cloudflared; then
    log "✅ cloudflared 서비스가 실행 중입니다"
    TUNNEL_STATUS="running"
else
    warning "⚠️  cloudflared 서비스가 중지되어 있습니다"
    TUNNEL_STATUS="stopped"
fi

systemctl status cloudflared --no-pager || true

#####################################################################
# Step 2: 설정 파일 백업
#####################################################################

log "Step 2: 설정 파일 백업 중..."

CONFIG_FILE="/etc/cloudflared/config.yml"
BACKUP_FILE="/etc/cloudflared/config.yml.backup.$(date +%Y%m%d_%H%M%S)"

if [ -f "$CONFIG_FILE" ]; then
    cp "$CONFIG_FILE" "$BACKUP_FILE"
    log "✅ 설정 파일 백업 완료: $BACKUP_FILE"
else
    error "❌ 설정 파일이 존재하지 않습니다: $CONFIG_FILE"
    error "Cloudflare Tunnel이 설치되지 않았거나 설정 파일 경로가 다릅니다."
    exit 1
fi

#####################################################################
# Step 3: Ingress 규칙 확인 및 추가
#####################################################################

log "Step 3: Ingress 규칙 확인 중..."

# ingress 섹션이 있는지 확인
if grep -q "^ingress:" "$CONFIG_FILE"; then
    log "✅ Ingress 섹션이 이미 존재합니다"

    # wp-emarket.whmarketing.org hostname이 있는지 확인
    if grep -q "wp-emarket.whmarketing.org" "$CONFIG_FILE"; then
        log "✅ wp-emarket.whmarketing.org ingress 규칙이 이미 존재합니다"
    else
        warning "⚠️  wp-emarket.whmarketing.org ingress 규칙이 누락되어 있습니다"
        log "Ingress 규칙 추가를 건너뜁니다 (수동으로 추가하세요)"
    fi
else
    warning "⚠️  Ingress 섹션이 누락되어 있습니다. 추가합니다..."

    # 설정 파일 끝에 ingress 규칙 추가
    cat >> "$CONFIG_FILE" <<'EOF'

# E-MARKET Ingress 규칙 (자동 추가됨)
ingress:
  - hostname: wp-emarket.whmarketing.org
    service: http://localhost:80
  - service: http_status:404
EOF

    log "✅ Ingress 규칙 추가 완료"
fi

#####################################################################
# Step 4: 설정 파일 검증
#####################################################################

log "Step 4: 설정 파일 문법 검증 중..."

if cloudflared tunnel ingress validate 2>/dev/null; then
    log "✅ 설정 파일 문법 검증 성공"
else
    error "❌ 설정 파일 문법 오류가 있습니다"
    error "백업 파일로 복원합니다: $BACKUP_FILE"
    cp "$BACKUP_FILE" "$CONFIG_FILE"
    exit 1
fi

#####################################################################
# Step 5: Cloudflare Tunnel 재시작
#####################################################################

log "Step 5: Cloudflare Tunnel 재시작 중..."

systemctl restart cloudflared

sleep 3  # 재시작 대기

if systemctl is-active --quiet cloudflared; then
    log "✅ cloudflared 서비스 재시작 성공"
else
    error "❌ cloudflared 서비스 재시작 실패"
    log "로그 확인:"
    journalctl -u cloudflared -n 20 --no-pager
    exit 1
fi

#####################################################################
# Step 6: 자동 시작 활성화
#####################################################################

log "Step 6: 자동 시작 활성화 중..."

systemctl enable cloudflared

log "✅ cloudflared 자동 시작 활성화 완료 (재부팅 시 자동 실행)"

#####################################################################
# Step 7: 상태 확인
#####################################################################

log "Step 7: Cloudflare Tunnel 상태 확인 중..."

systemctl status cloudflared --no-pager || true

log "최근 로그 (20줄):"
journalctl -u cloudflared -n 20 --no-pager

#####################################################################
# Step 8: WordPress API 테스트
#####################################################################

log "Step 8: WordPress API 연결 테스트 중..."

sleep 5  # Tunnel 완전히 연결될 때까지 대기

# WordPress API 테스트
API_URL="https://wp-emarket.whmarketing.org/wp-json/"

log "테스트 URL: $API_URL"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL" || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
    log "✅ WordPress API 정상 응답 (HTTP $HTTP_CODE)"
    log "🎉 복구 성공!"
elif [ "$HTTP_CODE" = "530" ] || [ "$HTTP_CODE" = "000" ]; then
    error "❌ WordPress API 여전히 접근 불가 (HTTP $HTTP_CODE)"
    warning "추가 조치가 필요할 수 있습니다:"
    warning "1. Cloudflare Dashboard에서 Tunnel 상태 확인"
    warning "2. 웹서버(Apache/Nginx) 상태 확인: systemctl status apache2"
    warning "3. MySQL 상태 확인: systemctl status mysql"
else
    warning "⚠️  예상치 못한 응답 코드: HTTP $HTTP_CODE"
    log "추가 확인이 필요합니다"
fi

#####################################################################
# Step 9: 최종 보고
#####################################################################

log "========================================="
log "복구 작업 완료 보고"
log "========================================="
log "Cloudflare Tunnel 상태: $(systemctl is-active cloudflared)"
log "자동 시작: $(systemctl is-enabled cloudflared)"
log "WordPress API 응답: HTTP $HTTP_CODE"
log "백업 파일: $BACKUP_FILE"
log "========================================="

if [ "$HTTP_CODE" = "200" ]; then
    log "✅ 모든 복구 작업이 성공적으로 완료되었습니다!"
    log ""
    log "다음 단계:"
    log "1. Frontend 테스트: https://emarket-frontend-one.vercel.app/"
    log "2. 제품 페이지 확인: https://emarket-frontend-one.vercel.app/products"
    log "3. 10분간 상태 모니터링 권장"
    exit 0
else
    error "⚠️  복구가 완료되었으나 WordPress API가 아직 정상이 아닙니다"
    error "추가 조치가 필요합니다"
    exit 1
fi
