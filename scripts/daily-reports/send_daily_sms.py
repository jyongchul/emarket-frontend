#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
E-MARKET 프로젝트 일일 진행 보고 SMS 발송 스크립트
매일 오전 09:00에 자동 실행

참고: SMS API 서비스 (알리고, CoolSMS 등) 가입 후 API 키 설정 필요
"""

import requests
from datetime import datetime

# SMS API 설정 (예시: 알리고 API)
# 실제 사용 시 API 키를 발급받아 설정 필요
SMS_API_URL = "https://apis.aligo.in/send/"  # 알리고 API 엔드포인트
SMS_API_KEY = "YOUR_API_KEY_HERE"  # API 키
SMS_USER_ID = "YOUR_USER_ID_HERE"  # 알리고 아이디
SMS_SENDER = "010-9333-2028"  # 발신번호 (사전 등록 필요)

# 수신자 정보 (B2B 파트너)
CLIENT_NAME = "임수진"
CLIENT_TITLE = "과장님"
CLIENT_PHONE = "010-3487-3457"  # 주 연락처
CLIENT_PHONE_2 = "010-3291-4811"  # 보조 연락처

# 프로젝트 정보
PROJECT_NAME = "E-MARKET"


def send_sms():
    """SMS 발송"""

    today = datetime.now().strftime("%Y년 %m월 %d일")

    # SMS 메시지 작성 (90바이트 제한 고려)
    # 주의: "?" 이모티콘/bullet point 대신 사용 금지
    message = f"""[{PROJECT_NAME}] {today} 진행 보고

안녕하세요, {CLIENT_NAME} {CLIENT_TITLE}
하얀모자마케팅 이종철입니다.

현재 진행 상황:
• 보안 헤더 구현 완료
• 성능 최적화 진행 중 (95.75/100)
• 프론트엔드 Vercel 배포 완료

계약금 입금 안내:
선급금 2,310,000원
계좌: 국민 805901-04-314273
예금주: (주)하얀모자마케팅

자세한 내용은 이메일로 발송드렸습니다.
문의: 010-9333-2028

감사합니다."""

    try:
        # 알리고 API 사용 예시
        data = {
            'key': SMS_API_KEY,
            'user_id': SMS_USER_ID,
            'sender': SMS_SENDER,
            'receiver': CLIENT_PHONE,
            'msg': message,
            'msg_type': 'LMS',  # 장문 문자 (Long Message Service)
            'title': f'[{PROJECT_NAME}] 진행 보고'
        }

        # API가 설정되지 않은 경우 메시지만 출력
        if SMS_API_KEY == "YOUR_API_KEY_HERE":
            print("⚠️  SMS API 설정이 필요합니다.")
            print("=" * 60)
            print("발송될 메시지:")
            print("=" * 60)
            print(message)
            print("=" * 60)
            print("\n📱 SMS API 설정 방법:")
            print("1. 알리고(https://smartsms.aligo.in/) 또는 CoolSMS 가입")
            print("2. API 키 발급")
            print("3. send_daily_sms.py에서 API 키, 사용자 ID, 발신번호 설정")
            print("4. 발신번호 사전 등록 필요 (통신사 규정)")
            return False

        # 실제 SMS 발송
        response = requests.post(SMS_API_URL, data=data)

        if response.status_code == 200:
            result = response.json()
            if result.get('result_code') == '1':
                print(f"✅ SMS 발송 성공: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
                print(f"   수신자: {CLIENT_PHONE}")
                return True
            else:
                print(f"❌ SMS 발송 실패: {result.get('message')}")
                return False
        else:
            print(f"❌ SMS API 호출 실패: HTTP {response.status_code}")
            return False

    except Exception as e:
        print(f"❌ SMS 발송 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    send_sms()
