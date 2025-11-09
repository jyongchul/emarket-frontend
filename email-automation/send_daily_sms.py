#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
E-MARKET Project - Daily Progress SMS Script
Sends SMS with project status to client (임수진 대표)
Uses Aligo SMS API
"""

import requests
import json
from datetime import datetime

# Configuration
ALIGO_API_KEY = "ef5c198fjdlguiw8ee8gzxjlle704m2o"
ALIGO_USER_ID = "jyongchul"
ALIGO_SENDER = "010-9333-2028"

# Recipient
RECIPIENT_NAME = "임수진"
RECIPIENT_PHONE = "010-3487-3457"

# Project information
PROJECT_NAME = "E-MARKET"
VERCEL_URL = "https://emarket-frontend-one.vercel.app"
DEPOSIT_AMOUNT = "2,310,000원"

def create_sms_message():
    """
    Create SMS message content
    Note: NO "?" characters or question marks allowed per user's instructions
    """
    today = datetime.now().strftime('%Y년 %m월 %d일')

    message = f"""[E-MARKET 진행 보고]

{RECIPIENT_NAME} 대표님, 하얀모자마케팅 이종철입니다.

{today} 진행 상황:

▶ 완료된 작업
- 웹 플랫폼 개발 완료
- Vercel 배포 완료
- 다국어 지원 (영/불/한)
- 반응형 디자인 적용

▶ 현재 진행중
- 결제 시스템 테스트
- 성능 최적화

▶ 계약금 안내
금액: {DEPOSIT_AMOUNT} (부가세 포함)
계좌: 국민은행 805901-04-314273
예금주: (주)하얀모자마케팅

▶ 추가 서비스
- SNS 마케팅 (별도 요금)
- SEO 최적화 (별도 요금)
- 블로그 자동 동기화

상세 내용은 이메일을 확인해 주세요.

문의: 010-9333-2028
감사합니다."""

    return message

def send_sms():
    """
    Send SMS using Aligo API
    """
    try:
        print("\n" + "="*70)
        print("E-MARKET 프로젝트 진행 보고 SMS 발송 시작")
        print("="*70)
        print(f"시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"발신자: {ALIGO_SENDER}")
        print(f"수신자: {RECIPIENT_NAME} ({RECIPIENT_PHONE})")
        print("-"*70)

        # Create message
        message = create_sms_message()

        # Check message length
        message_bytes = message.encode('utf-8')
        byte_length = len(message_bytes)

        if byte_length <= 90:
            msg_type = "SMS"
            print(f"메시지 유형: SMS (단문) - {byte_length} bytes")
        elif byte_length <= 2000:
            msg_type = "LMS"
            print(f"메시지 유형: LMS (장문) - {byte_length} bytes")
        else:
            print(f"❌ 메시지가 너무 깁니다 ({byte_length} bytes, 최대 2000 bytes)")
            return False

        # Prepare API request
        url = "https://apis.aligo.in/send/"

        # Remove hyphens from phone number
        receiver = RECIPIENT_PHONE.replace('-', '').replace('.', '')
        sender = ALIGO_SENDER.replace('-', '').replace('.', '')

        data = {
            'key': ALIGO_API_KEY,
            'user_id': ALIGO_USER_ID,
            'sender': sender,
            'receiver': receiver,
            'msg': message,
            'msg_type': msg_type,
            'title': '[E-MARKET] 진행 보고',  # For LMS
            'testmode_yn': 'N'  # Production mode
        }

        print("\nSMS 전송 중...")
        print(f"API URL: {url}")

        # Send request
        response = requests.post(url, data=data)

        # Parse response
        result = response.json()

        print("-"*70)
        print("API 응답:")
        print(json.dumps(result, indent=2, ensure_ascii=False))
        print("="*70)

        # Check result
        if result.get('result_code') == '1':
            print("✅ SMS 전송 성공!")
            print("="*70)
            print(f"수신자: {RECIPIENT_NAME} ({RECIPIENT_PHONE}) ✓")
            print(f"메시지 ID: {result.get('msg_id', 'N/A')}")
            print(f"전송 건수: {result.get('success_cnt', 0)}")
            print("="*70 + "\n")
            return True
        else:
            print("❌ SMS 전송 실패")
            print("="*70)
            print(f"오류 코드: {result.get('result_code')}")
            print(f"오류 메시지: {result.get('message', 'Unknown error')}")
            print("="*70 + "\n")
            return False

    except Exception as e:
        print("="*70)
        print("❌ SMS 전송 중 오류 발생")
        print("="*70)
        print(f"오류: {str(e)}")
        print("="*70 + "\n")
        return False

def print_message_preview():
    """
    Print message preview for verification
    """
    message = create_sms_message()
    print("\n" + "="*70)
    print("SMS 메시지 미리보기")
    print("="*70)
    print(message)
    print("="*70)
    print(f"메시지 길이: {len(message.encode('utf-8'))} bytes")
    print("="*70 + "\n")

if __name__ == "__main__":
    # Show preview first
    print_message_preview()

    # Ask for confirmation
    response = input("SMS를 전송하시겠습니까? (y/n): ")
    if response.lower() == 'y':
        send_sms()
    else:
        print("SMS 전송이 취소되었습니다.")
