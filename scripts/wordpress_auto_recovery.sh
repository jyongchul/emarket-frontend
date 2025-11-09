#!/bin/bash
################################################################################
# WordPress 백엔드 자동 복구 스크립트
# E-MARKET 프로젝트
# 작성일: 2025-11-09
#
# 용도: Cloudflare Tunnel + WordPress 백엔드 자동 진단 및 복구
# 실행 위치: 로컬 WordPress 서버 (SSH 접속 후)
################################################################################

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 파일
LOG_FILE="/var/log/wordpress_recovery_$(date +%Y%m%d_%H%M%S).log"

# 설정
WORDPRESS_URL="https://wp-emarket.whmarketing.org"
TUNNEL_NAME="wp-emarket"
MAX_WAIT_TIME=60  # 최대 대기 시간 (초)

################################################################################
# 유틸리티 함수
################################################################################

log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

check_command() {
    if ! command -v "$1" &> /dev/null; then
        error "명령어를 찾을 수 없습니다: $1"
        return 1
    fi
    return 0
}

wait_for_service() {
    local service=$1
    local max_wait=$2
    local elapsed=0

    info "서비스 시작 대기 중: $service (최대 ${max_wait}초)"

    while [ $elapsed -lt $max_wait ]; do
        if systemctl is-active --quiet "$service"; then
            log "✅ $service 서비스가 시작되었습니다 (${elapsed}초 소요)"
            return 0
        fi
        sleep 2
        elapsed=$((elapsed + 2))
        echo -n "."
    done

    echo ""
    error "❌ $service 서비스 시작 타임아웃 (${max_wait}초 초과)"
    return 1
}

################################################################################
# 진단 함수
################################################################################

check_cloudflared() {
    info "1️⃣  Cloudflare Tunnel 상태 확인 중..."

    if systemctl is-active --quiet cloudflared; then
        log "✅ cloudflared 서비스가 실행 중입니다"
        systemctl status cloudflared --no-pager | head -10 | tee -a "$LOG_FILE"
        return 0
    else
        warning "⚠️  cloudflared 서비스가 중지되어 있습니다"
        return 1
    fi
}

check_webserver() {
    info "2️⃣  웹서버 상태 확인 중..."

    # Apache 확인
    if systemctl list-units --type=service --all | grep -q apache2; then
        if systemctl is-active --quiet apache2; then
            log "✅ Apache 웹서버가 실행 중입니다"
            return 0
        else
            warning "⚠️  Apache 웹서버가 중지되어 있습니다"
            return 1
        fi
    fi

    # Nginx 확인
    if systemctl list-units --type=service --all | grep -q nginx; then
        if systemctl is-active --quiet nginx; then
            log "✅ Nginx 웹서버가 실행 중입니다"
            return 0
        else
            warning "⚠️  Nginx 웹서버가 중지되어 있습니다"
            return 1
        fi
    fi

    error "❌ 웹서버를 찾을 수 없습니다 (Apache 또는 Nginx)"
    return 2
}

check_mysql() {
    info "3️⃣  MySQL 데이터베이스 상태 확인 중..."

    if systemctl is-active --quiet mysql; then
        log "✅ MySQL 데이터베이스가 실행 중입니다"
        return 0
    else
        warning "⚠️  MySQL 데이터베이스가 중지되어 있습니다"
        return 1
    fi
}

check_api_endpoint() {
    info "4️⃣  API 엔드포인트 테스트 중..."

    # WordPress REST API
    if curl -s --max-time 10 "$WORDPRESS_URL/wp-json/wp/v2" > /dev/null 2>&1; then
        log "✅ WordPress REST API 응답 정상"
    else
        warning "⚠️  WordPress REST API 응답 없음"
        return 1
    fi

    # WooCommerce API
    if curl -s --max-time 10 "$WORDPRESS_URL/wp-json/wc/v3/products" > /dev/null 2>&1; then
        log "✅ WooCommerce API 응답 정상"
    else
        warning "⚠️  WooCommerce API 응답 없음"
        return 1
    fi

    return 0
}

################################################################################
# 복구 함수
################################################################################

restart_mysql() {
    info "MySQL 재시작 중..."

    if ! sudo systemctl restart mysql; then
        error "MySQL 재시작 실패"
        sudo systemctl status mysql --no-pager | tee -a "$LOG_FILE"
        return 1
    fi

    wait_for_service mysql 30

    # 자동 시작 활성화
    sudo systemctl enable mysql
    log "✅ MySQL 자동 시작 활성화됨"

    return 0
}

restart_webserver() {
    info "웹서버 재시작 중..."

    # Apache 확인
    if systemctl list-units --type=service --all | grep -q apache2; then
        if ! sudo systemctl restart apache2; then
            error "Apache 재시작 실패"
            sudo systemctl status apache2 --no-pager | tee -a "$LOG_FILE"
            return 1
        fi
        wait_for_service apache2 30
        sudo systemctl enable apache2
        log "✅ Apache 자동 시작 활성화됨"
        return 0
    fi

    # Nginx 확인
    if systemctl list-units --type=service --all | grep -q nginx; then
        if ! sudo systemctl restart nginx; then
            error "Nginx 재시작 실패"
            sudo systemctl status nginx --no-pager | tee -a "$LOG_FILE"
            return 1
        fi
        wait_for_service nginx 30
        sudo systemctl enable nginx
        log "✅ Nginx 자동 시작 활성화됨"
        return 0
    fi

    error "웹서버를 찾을 수 없습니다"
    return 2
}

restart_cloudflared() {
    info "Cloudflare Tunnel 재시작 중..."

    if ! sudo systemctl restart cloudflared; then
        error "cloudflared 재시작 실패"
        sudo systemctl status cloudflared --no-pager | tee -a "$LOG_FILE"
        return 1
    fi

    wait_for_service cloudflared 30

    # 자동 시작 활성화
    sudo systemctl enable cloudflared
    log "✅ cloudflared 자동 시작 활성화됨"

    # 로그 확인
    info "최근 cloudflared 로그:"
    sudo journalctl -u cloudflared -n 20 --no-pager | tee -a "$LOG_FILE"

    return 0
}

################################################################################
# 메인 복구 프로세스
################################################################################

main() {
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  🔧 WordPress 백엔드 자동 복구 시작"
    echo "  시간: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "  로그: $LOG_FILE"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    # 필수 명령어 확인
    for cmd in systemctl curl journalctl; do
        if ! check_command "$cmd"; then
            error "필수 명령어가 없습니다: $cmd"
            exit 1
        fi
    done

    # 단계 1: 진단
    echo ""
    info "═══════════════════════════════════════════════"
    info "  단계 1: 시스템 진단"
    info "═══════════════════════════════════════════════"
    echo ""

    cloudflared_ok=false
    webserver_ok=false
    mysql_ok=false

    check_cloudflared && cloudflared_ok=true
    check_webserver && webserver_ok=true
    check_mysql && mysql_ok=true

    # 단계 2: 복구 결정
    echo ""
    info "═══════════════════════════════════════════════"
    info "  단계 2: 복구 필요 여부 판단"
    info "═══════════════════════════════════════════════"
    echo ""

    need_recovery=false

    if [ "$mysql_ok" = false ]; then
        warning "MySQL 복구 필요"
        need_recovery=true
    fi

    if [ "$webserver_ok" = false ]; then
        warning "웹서버 복구 필요"
        need_recovery=true
    fi

    if [ "$cloudflared_ok" = false ]; then
        warning "Cloudflare Tunnel 복구 필요"
        need_recovery=true
    fi

    if [ "$need_recovery" = false ]; then
        log "✅ 모든 서비스가 정상 작동 중입니다"
        check_api_endpoint
        exit 0
    fi

    # 단계 3: 복구 실행
    echo ""
    info "═══════════════════════════════════════════════"
    info "  단계 3: 복구 실행"
    info "═══════════════════════════════════════════════"
    echo ""

    # MySQL 복구 (1순위)
    if [ "$mysql_ok" = false ]; then
        if restart_mysql; then
            log "✅ MySQL 복구 완료"
        else
            error "❌ MySQL 복구 실패"
        fi
    fi

    # 웹서버 복구 (2순위)
    if [ "$webserver_ok" = false ]; then
        if restart_webserver; then
            log "✅ 웹서버 복구 완료"
        else
            error "❌ 웹서버 복구 실패"
        fi
    fi

    # Cloudflare Tunnel 복구 (3순위)
    if [ "$cloudflared_ok" = false ]; then
        if restart_cloudflared; then
            log "✅ Cloudflare Tunnel 복구 완료"
        else
            error "❌ Cloudflare Tunnel 복구 실패"
        fi
    fi

    # 단계 4: 복구 후 검증
    echo ""
    info "═══════════════════════════════════════════════"
    info "  단계 4: 복구 후 검증 (60초 대기)"
    info "═══════════════════════════════════════════════"
    echo ""

    info "Cloudflare Tunnel 연결 안정화 대기 중..."
    sleep 60

    check_cloudflared
    check_webserver
    check_mysql
    check_api_endpoint

    # 최종 결과
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  📊 복구 완료"
    echo "  시간: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "  로그: $LOG_FILE"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    log "복구 프로세스 완료"
    log "전체 로그는 다음 위치에 저장되었습니다: $LOG_FILE"

    echo ""
    info "다음 명령어로 서비스 상태를 확인하세요:"
    echo "  sudo systemctl status cloudflared"
    echo "  sudo systemctl status apache2"
    echo "  sudo systemctl status mysql"
    echo ""
    info "API 테스트:"
    echo "  curl $WORDPRESS_URL/wp-json/wp/v2"
    echo "  curl $WORDPRESS_URL/wp-json/wc/v3/products"
    echo ""
}

################################################################################
# 스크립트 실행
################################################################################

main "$@"
