#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
E-MARKET 프로젝트 일일 진행 보고 이메일 발송 스크립트
매일 오전 09:00에 자동 실행
"""

import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime
from pathlib import Path

# 이메일 설정
EMAIL_USER = "jyongchul@gmail.com"
EMAIL_APP_PASSWORD = "yhue jeul amhv uwno"  # 또는 "jojy grev vhxj bvvz"

# 수신자 정보
CLIENT_NAME = "최지호"
CLIENT_COMPANY = "주식회사 이마켓 (E-MARKET)"
CLIENT_EMAIL = "jhosi@naver.com"  # 계약서상의 이메일 (확인 필요)
CC_EMAIL = "jyongchul@naver.com"

# 프로젝트 정보
PROJECT_NAME = "외국인 바이어 대상 중고거래 중개 배송 플랫폼"
CONTRACT_AMOUNT_SUBTOTAL = "4,208,806"  # 부가세 별도
CONTRACT_AMOUNT_TOTAL = "4,629,687"  # 부가세 포함
DEPOSIT_AMOUNT = "2,310,000"  # 선급금 (부가세 포함)
BALANCE_AMOUNT = "2,319,687"  # 잔금 (부가세 포함)
CONTRACT_START = "2025년 7월 16일"
CONTRACT_END = "2025년 8월 31일"

# 진행 상황 (동적으로 업데이트 가능)
CURRENT_PROGRESS = """
<li><strong>보안 헤더 구현 완료</strong>
    <ul style="margin-top: 5px; padding-left: 20px; line-height: 1.8;">
        <li>CSP (Content Security Policy) 적용</li>
        <li>X-Frame-Options, X-Content-Type-Options 설정</li>
        <li>SecurityHeaders.com 등급: <strong style="color: #27ae60;">Grade A</strong></li>
    </ul>
</li>
<li><strong>성능 최적화 진행 중</strong>
    <ul style="margin-top: 5px; padding-left: 20px; line-height: 1.8;">
        <li>Lighthouse Performance: <strong>100/100 (Desktop)</strong></li>
        <li>모바일 최적화: <strong>90/100</strong></li>
        <li>평균 성능 점수: <strong>95.75/100</strong></li>
    </ul>
</li>
<li><strong>프론트엔드 배포 완료</strong>
    <ul style="margin-top: 5px; padding-left: 20px; line-height: 1.8;">
        <li>Vercel 클라우드 플랫폼에 배포</li>
        <li>URL: <a href="https://emarket-frontend-one.vercel.app/" style="color: #3498db; text-decoration: none;">https://emarket-frontend-one.vercel.app/</a></li>
        <li>3단계 캐싱 시스템 구현으로 빠른 로딩 속도 확보</li>
    </ul>
</li>
"""

NEXT_PLAN = """
<li><strong>WordPress 백엔드 복구</strong> - 실시간 데이터 로딩 활성화</li>
<li><strong>이미지 최적화</strong> - Next.js Image 컴포넌트 적용</li>
<li><strong>SEO 작업</strong> - 검색 엔진 최적화 진행</li>
<li><strong>접근성 개선</strong> - 웹 접근성 가이드라인 준수</li>
<li><strong>최종 QA 테스트</strong> - 전체 기능 점검 및 버그 수정</li>
"""


def create_html_email():
    """HTML 이메일 템플릿 생성"""

    today = datetime.now().strftime("%Y년 %m월 %d일")

    html = f"""
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>[E-MARKET 프로젝트] 중간 진행 보고서 - {today}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; background-color: #f4f4f4; word-break: keep-all;">

        <!-- 메인 컨테이너 -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px 0;">
            <tr>
                <td align="center">

                    <!-- 이메일 본문 -->
                    <table width="1000" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; max-width: 1000px; width: 100%; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

                        <!-- 헤더 -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                                <img src="cid:logo" alt="하얀모자마케팅" style="max-width: 200px; height: auto; margin-bottom: 20px;">
                                <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700;">
                                    {PROJECT_NAME}
                                </h1>
                                <p style="color: #ffffff; font-size: 16px; margin: 10px 0 0 0; opacity: 0.9;">
                                    중간 진행 보고서
                                </p>
                            </td>
                        </tr>

                        <!-- 날짜 및 인사말 -->
                        <tr>
                            <td style="padding: 30px;">
                                <p style="font-size: 14px; color: #7f8c8d; margin: 0 0 10px 0;">
                                    발송일: {today}
                                </p>
                                <p style="font-size: 16px; color: #2c3e50; line-height: 1.8; margin: 0;">
                                    안녕하세요, <strong>{CLIENT_NAME}</strong> 대표님.<br>
                                    <strong>(주)하얀모자마케팅 이종철</strong>입니다.
                                </p>
                                <p style="font-size: 16px; color: #2c3e50; line-height: 1.8; margin: 20px 0 0 0;">
                                    {PROJECT_NAME} 프로젝트의 현재 진행 상황을 보고드립니다.
                                </p>
                            </td>
                        </tr>

                        <!-- 진행 상황 -->
                        <tr>
                            <td style="padding: 0 30px 30px 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ecf0f1; border-radius: 8px; overflow: hidden;">
                                    <tr>
                                        <td style="background-color: #3498db; padding: 15px; text-align: center;">
                                            <h2 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">
                                                📊 현재 진행 상황
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 25px;">
                                            <ul style="margin: 0; padding-left: 20px; line-height: 2.0; font-size: 15px; color: #34495e;">
                                                {CURRENT_PROGRESS}
                                            </ul>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- 향후 계획 -->
                        <tr>
                            <td style="padding: 0 30px 30px 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ecf0f1; border-radius: 8px; overflow: hidden;">
                                    <tr>
                                        <td style="background-color: #e74c3c; padding: 15px; text-align: center;">
                                            <h2 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">
                                                🎯 향후 작업 계획
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 25px;">
                                            <ul style="margin: 0; padding-left: 20px; line-height: 2.0; font-size: 15px; color: #34495e;">
                                                {NEXT_PLAN}
                                            </ul>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- 중요 안내 -->
                        <tr>
                            <td style="padding: 0 30px 30px 30px;">
                                <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; border-radius: 4px;">
                                    <p style="margin: 0 0 15px 0; font-size: 16px; color: #856404; font-weight: 700;">
                                        ⚠️ 현재 샘플 단계입니다
                                    </p>
                                    <p style="margin: 0; font-size: 14px; color: #856404; line-height: 1.8;">
                                        현재 구현된 기능은 <strong>참고용 샘플</strong>이며, 대표님께서 원하시는 대로 수정 및 보완해드릴 예정입니다.
                                        개발 기간은 넉넉히 잡고 있으며, 품질 확보를 최우선으로 진행하고 있습니다.
                                    </p>
                                </div>
                            </td>
                        </tr>

                        <!-- 계약금 안내 -->
                        <tr>
                            <td style="padding: 0 30px 30px 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #e8f5e9; border-radius: 8px; overflow: hidden;">
                                    <tr>
                                        <td style="background-color: #27ae60; padding: 15px; text-align: center;">
                                            <h2 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">
                                                💰 계약금 입금 안내
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 25px;">
                                            <table width="100%" cellpadding="8" cellspacing="0" border="0" style="font-size: 15px; color: #2c3e50;">
                                                <tr>
                                                    <td style="width: 200px; font-weight: 700; background-color: #ffffff; border: 1px solid #d5d8dc; padding: 12px;">총 계약금액</td>
                                                    <td style="background-color: #ffffff; border: 1px solid #d5d8dc; padding: 12px;">{CONTRACT_AMOUNT_SUBTOTAL}원 (부가세 별도)</td>
                                                </tr>
                                                <tr>
                                                    <td style="font-weight: 700; background-color: #ffffff; border: 1px solid #d5d8dc; padding: 12px;">부가세 포함 금액</td>
                                                    <td style="background-color: #ffffff; border: 1px solid #d5d8dc; padding: 12px;"><strong style="color: #e74c3c; font-size: 17px;">{CONTRACT_AMOUNT_TOTAL}원</strong></td>
                                                </tr>
                                                <tr>
                                                    <td style="font-weight: 700; background-color: #fef9e7; border: 1px solid #d5d8dc; padding: 12px;">선급금 (50%)</td>
                                                    <td style="background-color: #fef9e7; border: 1px solid #d5d8dc; padding: 12px;"><strong style="color: #27ae60; font-size: 18px;">{DEPOSIT_AMOUNT}원</strong></td>
                                                </tr>
                                                <tr>
                                                    <td style="font-weight: 700; background-color: #ffffff; border: 1px solid #d5d8dc; padding: 12px;">잔금 (50%)</td>
                                                    <td style="background-color: #ffffff; border: 1px solid #d5d8dc; padding: 12px;">{BALANCE_AMOUNT}원 (최종 인도 시)</td>
                                                </tr>
                                            </table>

                                            <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-radius: 4px; border: 2px solid #27ae60;">
                                                <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 700; color: #27ae60;">
                                                    입금 계좌 정보
                                                </p>
                                                <p style="margin: 0; font-size: 15px; color: #2c3e50; line-height: 1.8;">
                                                    <strong>은행:</strong> 국민은행<br>
                                                    <strong>계좌번호:</strong> 805901-04-314273<br>
                                                    <strong>예금주:</strong> (주)하얀모자마케팅
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- 추가 서비스 안내 -->
                        <tr>
                            <td style="padding: 0 30px 30px 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #e3f2fd; border-radius: 8px; overflow: hidden;">
                                    <tr>
                                        <td style="background-color: #2196f3; padding: 15px; text-align: center;">
                                            <h2 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">
                                                ✨ 추가 제공 가능 서비스
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 25px;">
                                            <ul style="margin: 0; padding-left: 20px; line-height: 2.0; font-size: 15px; color: #34495e;">
                                                <li><strong>SEO 작업:</strong> 검색 엔진 최적화로 구글, 네이버 등 검색 노출 향상</li>
                                                <li><strong>SNS 관리:</strong> 블로그 포스팅 및 SNS 자동 연동 (별도 요금 발생 가능)</li>
                                                <li><strong>블로그 자동 연동:</strong> 블로그 글 작성 시 웹사이트에 자동 포스팅</li>
                                            </ul>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- 접속 정보 -->
                        <tr>
                            <td style="padding: 0 30px 30px 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8f9fa; border-radius: 8px; overflow: hidden;">
                                    <tr>
                                        <td style="background-color: #6c757d; padding: 15px; text-align: center;">
                                            <h2 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">
                                                🌐 접속 정보
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 25px;">
                                            <p style="margin: 0; font-size: 15px; color: #2c3e50; line-height: 1.8;">
                                                <strong>개발 URL:</strong><br>
                                                <a href="https://emarket-frontend-one.vercel.app/" style="color: #3498db; text-decoration: none; font-size: 16px; font-weight: 700;">
                                                    https://emarket-frontend-one.vercel.app/
                                                </a>
                                            </p>
                                            <p style="margin: 15px 0 0 0; font-size: 14px; color: #7f8c8d;">
                                                * 언제 어디서든 접속 가능하며, 실시간으로 업데이트됩니다.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- 숨고 리뷰 요청 -->
                        <tr>
                            <td style="padding: 0 30px 30px 30px;">
                                <div style="background-color: #fff9e6; border-left: 4px solid #f39c12; padding: 20px; border-radius: 4px;">
                                    <p style="margin: 0 0 15px 0; font-size: 16px; color: #7d6608; font-weight: 700;">
                                        🌟 숨고 리뷰 부탁드립니다
                                    </p>
                                    <p style="margin: 0 0 15px 0; font-size: 14px; color: #7d6608; line-height: 1.8;">
                                        이번 상담을 위해 실제 구동 가능한 데모 사이트를 제작했고, 클라우드 환경까지 세팅하여
                                        언제 어디서든 접속 가능하도록 준비했습니다. 또한 이번 상담을 위해 숨고 광고비(1만 원)를
                                        저희가 직접 지출했습니다.
                                    </p>
                                    <p style="margin: 0; font-size: 14px; color: #7d6608; line-height: 1.8;">
                                        프로젝트 진행 여부와 관계없이 상담이 조금이라도 도움이 되셨다면,
                                        숨고에 짧게라도 좋은 리뷰를 남겨주시면 큰 힘이 됩니다.
                                    </p>
                                    <p style="margin: 15px 0 0 0; font-size: 14px;">
                                        <a href="https://soomgo.com/profile/users/3422867" style="color: #3498db; text-decoration: none; font-weight: 700;">
                                            👉 하얀모자마케팅 프로필 바로가기
                                        </a>
                                    </p>
                                </div>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #2c3e50; padding: 30px; text-align: center;">
                                <p style="color: #ecf0f1; font-size: 14px; margin: 0 0 10px 0; line-height: 1.8;">
                                    문의사항이나 추가 수정 요청이 있으시면 언제든지 연락 주시기 바랍니다.
                                </p>
                                <div style="border-top: 1px solid #34495e; margin: 20px 0; padding-top: 20px;">
                                    <p style="color: #bdc3c7; font-size: 14px; margin: 0; line-height: 1.8;">
                                        <strong style="color: #ffffff;">회사:</strong> (주)하얀모자마케팅 (Whitehat Marketing)<br>
                                        <strong style="color: #ffffff;">대표:</strong> 이종철<br>
                                        <strong style="color: #ffffff;">이메일:</strong> jyongchul@naver.com<br>
                                        <strong style="color: #ffffff;">카카오톡:</strong> jyongchul<br>
                                        <strong style="color: #ffffff;">카카오톡 채널:</strong> <a href="https://pf.kakao.com/_KxmFcn" style="color: #3498db; text-decoration: none;">하얀모자마케팅 검색</a><br>
                                        <strong style="color: #ffffff;">휴대폰:</strong> 010-9333-2028<br>
                                        <strong style="color: #ffffff;">주소:</strong> 서울 성동구 용답동 238-2 오르세오피스텔 201호<br>
                                        <strong style="color: #ffffff;">WEB:</strong> <a href="http://whmarketing.org" style="color: #3498db; text-decoration: none;">http://whmarketing.org</a>
                                    </p>
                                </div>
                                <p style="color: #95a5a6; font-size: 12px; margin: 15px 0 0 0;">
                                    © 2025 (주)하얀모자마케팅. All rights reserved.
                                </p>
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    """

    return html


def send_email():
    """이메일 발송"""

    try:
        # 이메일 메시지 생성
        msg = MIMEMultipart('related')
        msg['Subject'] = f"[E-MARKET 프로젝트] 중간 진행 보고서 - {datetime.now().strftime('%Y년 %m월 %d일')}"
        msg['From'] = f"하얀모자마케팅 이종철 <{EMAIL_USER}>"
        msg['To'] = CLIENT_EMAIL
        msg['Cc'] = CC_EMAIL

        # HTML 본문 추가
        html_content = create_html_email()
        msg_alternative = MIMEMultipart('alternative')
        msg.attach(msg_alternative)

        html_part = MIMEText(html_content, 'html', 'utf-8')
        msg_alternative.attach(html_part)

        # 로고 이미지 첨부
        logo_path = Path(__file__).parent / "logo.png"
        if logo_path.exists():
            with open(logo_path, 'rb') as f:
                logo_data = f.read()

            # 이미지 리사이즈 (Pillow 사용)
            try:
                from PIL import Image
                from io import BytesIO

                img = Image.open(BytesIO(logo_data))
                # 로고를 적당한 크기로 조정 (가로 200px 기준)
                img.thumbnail((200, 200), Image.Resampling.LANCZOS)

                # 리사이즈된 이미지를 바이트로 변환
                img_byte_arr = BytesIO()
                img.save(img_byte_arr, format=img.format or 'PNG')
                logo_data = img_byte_arr.getvalue()
            except Exception as e:
                print(f"이미지 리사이즈 실패 (원본 사용): {e}")

            logo_img = MIMEImage(logo_data)
            logo_img.add_header('Content-ID', '<logo>')
            logo_img.add_header('Content-Disposition', 'inline', filename='logo.png')
            msg.attach(logo_img)

        # SMTP 서버 연결 및 발송
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_USER, EMAIL_APP_PASSWORD)

            # 수신자 리스트 (To + Cc)
            recipients = [CLIENT_EMAIL, CC_EMAIL]

            smtp.send_message(msg, from_addr=EMAIL_USER, to_addrs=recipients)

        print(f"✅ 이메일 발송 성공: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"   수신자: {CLIENT_EMAIL}")
        print(f"   참조: {CC_EMAIL}")

        return True

    except Exception as e:
        print(f"❌ 이메일 발송 실패: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    send_email()
