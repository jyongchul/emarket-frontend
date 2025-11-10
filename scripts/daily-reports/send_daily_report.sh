#!/bin/bash

# E-MARKET 프로젝트 일일 보고 통합 스크립트
# 매일 오전 09:00에 이메일과 문자 발송

# 스크립트 디렉토리
SCRIPT_DIR="/mnt/c/EMARKET/scripts/daily-reports"

# 로그 파일
LOG_DIR="/mnt/c/EMARKET/scripts/daily-reports/logs"
mkdir -p "$LOG_DIR"

LOG_FILE="$LOG_DIR/daily_report_$(date +%Y%m%d).log"

# 로그 시작
echo "========================================" >> "$LOG_FILE"
echo "일일 보고 발송 시작: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"

# Python 가상환경 활성화
cd /mnt/c/EMARKET
source venv/bin/activate

# 이메일 발송
echo "이메일 발송 시작..." >> "$LOG_FILE"
python3 "$SCRIPT_DIR/send_daily_email.py" >> "$LOG_FILE" 2>&1
EMAIL_STATUS=$?

if [ $EMAIL_STATUS -eq 0 ]; then
    echo "✅ 이메일 발송 완료" >> "$LOG_FILE"
else
    echo "❌ 이메일 발송 실패 (Exit Code: $EMAIL_STATUS)" >> "$LOG_FILE"
fi

echo "" >> "$LOG_FILE"

# SMS 발송
echo "SMS 발송 시작..." >> "$LOG_FILE"
python3 "$SCRIPT_DIR/send_daily_sms.py" >> "$LOG_FILE" 2>&1
SMS_STATUS=$?

if [ $SMS_STATUS -eq 0 ]; then
    echo "✅ SMS 발송 완료" >> "$LOG_FILE"
else
    echo "❌ SMS 발송 실패 (Exit Code: $SMS_STATUS)" >> "$LOG_FILE"
fi

# 가상환경 비활성화
deactivate

# 로그 종료
echo "========================================" >> "$LOG_FILE"
echo "일일 보고 발송 종료: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# 결과 출력 (cron 이메일로 전송됨)
if [ $EMAIL_STATUS -eq 0 ] && [ $SMS_STATUS -eq 0 ]; then
    echo "✅ 일일 보고 발송 완료: $(date '+%Y-%m-%d %H:%M:%S')"
    exit 0
else
    echo "⚠️  일일 보고 발송 중 오류 발생: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "로그 파일 확인: $LOG_FILE"
    exit 1
fi
