#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
E-MARKET Project - Daily Progress Report (Email + SMS)
Combined script to send both email and SMS
"""

import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from send_daily_email import send_email
from send_daily_sms import send_sms
from datetime import datetime

def send_daily_report():
    """
    Send daily progress report via both email and SMS
    """
    print("\n" + "="*80)
    print("E-MARKET 프로젝트 - 일일 진행 보고 시작")
    print("="*80)
    print(f"실행 시간: {datetime.now().strftime('%Y년 %m월 %d일 %H:%M:%S')}")
    print("="*80 + "\n")

    results = {
        'email': False,
        'sms': False
    }

    # Send email
    print("\n[1/2] 이메일 발송")
    print("-"*80)
    try:
        results['email'] = send_email()
    except Exception as e:
        print(f"❌ 이메일 발송 중 오류 발생: {e}")
        results['email'] = False

    # Send SMS
    print("\n[2/2] SMS 발송")
    print("-"*80)
    try:
        results['sms'] = send_sms()
    except Exception as e:
        print(f"❌ SMS 발송 중 오류 발생: {e}")
        results['sms'] = False

    # Summary
    print("\n" + "="*80)
    print("📊 일일 보고 발송 결과 요약")
    print("="*80)
    print(f"이메일: {'✅ 성공' if results['email'] else '❌ 실패'}")
    print(f"SMS:    {'✅ 성공' if results['sms'] else '❌ 실패'}")
    print("="*80)

    if results['email'] and results['sms']:
        print("✅ 모든 보고가 성공적으로 전송되었습니다!")
    elif results['email'] or results['sms']:
        print("⚠️  일부 보고가 전송되었습니다. 실패한 항목을 확인해주세요.")
    else:
        print("❌ 모든 보고 전송이 실패했습니다. 로그를 확인해주세요.")

    print("="*80 + "\n")

    # Return exit code
    if results['email'] and results['sms']:
        return 0  # Success
    elif results['email'] or results['sms']:
        return 1  # Partial success
    else:
        return 2  # Total failure

if __name__ == "__main__":
    exit_code = send_daily_report()
    sys.exit(exit_code)
