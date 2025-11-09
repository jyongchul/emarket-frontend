#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
E-MARKET Project - Daily Progress Email Script
Sends HTML email with project status to client (임수진 대표)
"""

import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email import utils
from datetime import datetime
from PIL import Image
import io

# Configuration
SENDER_EMAIL = "jyongchul@gmail.com"
SENDER_NAME = "하얀모자마케팅 이종철"
CC_EMAIL = "jyongchul@naver.com"
RECIPIENT_EMAIL = "sjlim0114@daum.net"
RECIPIENT_NAME = "임수진"
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_PASSWORD = "yhue jeul amhv uwno"  # App password

# File paths
LOGO_PATH = "/mnt/c/하얀모자마케팅-로고 251021.png"

# Project information
PROJECT_NAME = "E-MARKET (외국인 바이어 대상 중고거래 중개 배송 플랫폼)"
CONTRACT_AMOUNT = "4,208,806원 (부가세 별도)"
DEPOSIT_AMOUNT = "2,310,000원 (부가세 포함)"
VERCEL_URL = "https://emarket-frontend-one.vercel.app"
GITHUB_REPO = "https://github.com/jyongchul/emarket-frontend"

def resize_logo(logo_path, max_width=400):
    """
    Resize logo to max width while maintaining aspect ratio
    """
    try:
        with Image.open(logo_path) as img:
            # Convert RGBA to RGB if necessary
            if img.mode == 'RGBA':
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3])
                img = background

            # Calculate new dimensions
            width, height = img.size
            if width > max_width:
                ratio = max_width / width
                new_height = int(height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

            # Save to bytes
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format='JPEG', quality=95)
            img_byte_arr.seek(0)
            return img_byte_arr.read()
    except Exception as e:
        print(f"Warning: Could not resize logo - {e}")
        # Return original file if resize fails
        with open(logo_path, 'rb') as f:
            return f.read()

def create_email_html():
    """
    Create responsive HTML email with inline CSS
    """
    today = datetime.now().strftime('%Y년 %m월 %d일')

    html = f"""
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-MARKET 프로젝트 진행 상황 보고</title>
    <style>
        @media only screen and (max-width: 600px) {{
            .container {{
                width: 100% !important;
                padding: 15px !important;
            }}
            .header {{
                padding: 20px 15px !important;
            }}
            .content {{
                padding: 20px 15px !important;
            }}
            h1 {{
                font-size: 20px !important;
            }}
            h2 {{
                font-size: 18px !important;
            }}
            .status-item {{
                padding: 12px !important;
            }}
        }}
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, 'Noto Sans KR', sans-serif; background-color: #f5f5f5; word-break: keep-all;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width: 1000px; width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">

                    <!-- Header with Logo and Gradient -->
                    <tr>
                        <td class="header" style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center;">
                            <img src="cid:logo" alt="하얀모자마케팅 로고" style="max-width: 200px; height: auto; margin-bottom: 15px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">E-MARKET 프로젝트 진행 상황</h1>
                            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.95;">{today}</p>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td class="content" style="padding: 40px;">
                            <!-- Greeting -->
                            <p style="margin: 0 0 25px 0; color: #333333; font-size: 16px; line-height: 1.8; word-break: keep-all;">
                                안녕하세요, <strong style="color: #059669;">{RECIPIENT_NAME}</strong> 대표님.
                            </p>

                            <p style="margin: 0 0 30px 0; color: #555555; font-size: 16px; line-height: 1.8; word-break: keep-all;">
                                <strong>(주)하얀모자마케팅 이종철</strong>입니다.<br>
                                <strong>{PROJECT_NAME}</strong> 개발 진행 상황을 보고드립니다.
                            </p>

                            <!-- Progress Section -->
                            <div style="background-color: #f8fafc; border-left: 4px solid #059669; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                                <h2 style="margin: 0 0 20px 0; color: #059669; font-size: 20px; font-weight: 700;">📊 진행 상황</h2>

                                <div class="status-item" style="background-color: #ffffff; padding: 15px; margin-bottom: 12px; border-radius: 6px; border: 1px solid #e5e7eb;">
                                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                        <span style="color: #10b981; font-size: 20px; margin-right: 10px;">✓</span>
                                        <strong style="color: #333333; font-size: 15px;">프론트엔드 개발 완료</strong>
                                    </div>
                                    <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6; padding-left: 30px;">
                                        • Next.js 14 기반 웹 플랫폼 구축<br>
                                        • 다국어 지원 (영어, 불어, 한국어)<br>
                                        • 반응형 모바일 최적화<br>
                                        • 상품 등록/검색/장바구니 기능 구현
                                    </p>
                                </div>

                                <div class="status-item" style="background-color: #ffffff; padding: 15px; margin-bottom: 12px; border-radius: 6px; border: 1px solid #e5e7eb;">
                                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                        <span style="color: #10b981; font-size: 20px; margin-right: 10px;">✓</span>
                                        <strong style="color: #333333; font-size: 15px;">백엔드 연동 완료</strong>
                                    </div>
                                    <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6; padding-left: 30px;">
                                        • WordPress + WooCommerce REST API 연동<br>
                                        • Cloudflare Tunnel 보안 통신 구축<br>
                                        • 이미지 프록시 API 구현
                                    </p>
                                </div>

                                <div class="status-item" style="background-color: #ffffff; padding: 15px; margin-bottom: 12px; border-radius: 6px; border: 1px solid #e5e7eb;">
                                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                        <span style="color: #10b981; font-size: 20px; margin-right: 10px;">✓</span>
                                        <strong style="color: #333333; font-size: 15px;">Vercel 배포 완료</strong>
                                    </div>
                                    <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6; padding-left: 30px;">
                                        • 프로덕션 환경 배포<br>
                                        • HTTPS 보안 인증서 적용<br>
                                        • 자동 빌드/배포 파이프라인 구축<br>
                                        • URL: <a href="{VERCEL_URL}" style="color: #059669; text-decoration: none;">{VERCEL_URL}</a>
                                    </p>
                                </div>

                                <div class="status-item" style="background-color: #fffbeb; padding: 15px; border-radius: 6px; border: 1px solid #fbbf24;">
                                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                        <span style="color: #f59e0b; font-size: 20px; margin-right: 10px;">⏳</span>
                                        <strong style="color: #92400e; font-size: 15px;">현재 진행중</strong>
                                    </div>
                                    <p style="margin: 0; color: #78350f; font-size: 14px; line-height: 1.6; padding-left: 30px;">
                                        • 결제 시스템 통합 테스트<br>
                                        • 성능 최적화 및 버그 수정<br>
                                        • 관리자 페이지 기능 보강
                                    </p>
                                </div>
                            </div>

                            <!-- Next Steps -->
                            <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                                <h2 style="margin: 0 0 15px 0; color: #1e40af; font-size: 20px; font-weight: 700;">🎯 향후 계획</h2>
                                <ul style="margin: 0; padding-left: 20px; color: #1e3a8a; font-size: 15px; line-height: 1.8;">
                                    <li>최종 사용자 테스트 및 피드백 반영</li>
                                    <li>SEO 최적화 및 성능 튜닝</li>
                                    <li>사용자 매뉴얼 및 관리자 가이드 작성</li>
                                    <li>최종 검수 및 프로젝트 완료</li>
                                </ul>
                            </div>

                            <!-- Payment Reminder -->
                            <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                                <h2 style="margin: 0 0 15px 0; color: #dc2626; font-size: 20px; font-weight: 700;">💳 계약금 안내</h2>
                                <p style="margin: 0 0 12px 0; color: #991b1b; font-size: 15px; line-height: 1.8; word-break: keep-all;">
                                    프로젝트가 순조롭게 진행되고 있습니다. 계약서에 따라 <strong>계약금 {DEPOSIT_AMOUNT}</strong>을 아래 계좌로 입금 부탁드립니다.
                                </p>
                                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin-top: 15px;">
                                    <p style="margin: 0 0 8px 0; color: #666666; font-size: 14px;">
                                        <strong style="color: #333333;">은행:</strong> 국민은행
                                    </p>
                                    <p style="margin: 0 0 8px 0; color: #666666; font-size: 14px;">
                                        <strong style="color: #333333;">계좌번호:</strong> 805901-04-314273
                                    </p>
                                    <p style="margin: 0; color: #666666; font-size: 14px;">
                                        <strong style="color: #333333;">예금주:</strong> (주)하얀모자마케팅
                                    </p>
                                </div>
                            </div>

                            <!-- Additional Services -->
                            <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                                <h2 style="margin: 0 0 15px 0; color: #16a34a; font-size: 20px; font-weight: 700;">🚀 추가 서비스 안내</h2>
                                <p style="margin: 0 0 15px 0; color: #166534; font-size: 15px; line-height: 1.8; word-break: keep-all;">
                                    웹사이트 완성 후, 아래 서비스들을 통해 더 많은 고객에게 다가갈 수 있습니다.
                                </p>
                                <ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 14px; line-height: 1.8;">
                                    <li><strong>SNS 마케팅:</strong> 인스타그램, 페이스북 광고 운영 (별도 비용 발생)</li>
                                    <li><strong>SEO 최적화:</strong> 구글 검색 노출 향상 서비스 (별도 비용 발생)</li>
                                    <li><strong>블로그 자동 동기화:</strong> 웹사이트 게시글을 블로그에 자동 업로드</li>
                                </ul>
                                <p style="margin: 15px 0 0 0; color: #166534; font-size: 14px;">
                                    자세한 상담은 언제든지 연락 주시기 바랍니다.
                                </p>
                            </div>

                            <!-- Closing -->
                            <p style="margin: 30px 0 0 0; color: #555555; font-size: 15px; line-height: 1.8; word-break: keep-all;">
                                궁금하신 사항이나 추가 요청사항이 있으시면 언제든지 연락 주시기 바랍니다.
                            </p>

                            <p style="margin: 20px 0 0 0; color: #555555; font-size: 15px; line-height: 1.8;">
                                감사합니다.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 30px; border-top: 1px solid #e5e7eb;">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <p style="margin: 0 0 15px 0; color: #059669; font-size: 18px; font-weight: 700;">
                                    🌟 숨고 리뷰 부탁드립니다
                                </p>
                                <p style="margin: 0; font-size: 14px;">
                                    <a href="https://soomgo.com/review/users/3422867" style="color: #059669; text-decoration: none; margin-right: 15px;">리뷰 작성하기</a>
                                    <a href="https://soomgo.com/profile/users/3422867" style="color: #059669; text-decoration: none;">프로필 보기</a>
                                </p>
                            </div>

                            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
                                <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px; font-weight: 600;">
                                    (주)하얀모자마케팅
                                </p>
                                <p style="margin: 0 0 8px 0; color: #999999; font-size: 13px;">
                                    대표: 이종철 | 이메일: jyongchul@naver.com
                                </p>
                                <p style="margin: 0 0 8px 0; color: #999999; font-size: 13px;">
                                    전화: 010-9333-2028 | 카카오톡: jyongchul
                                </p>
                                <p style="margin: 0; color: #999999; font-size: 13px;">
                                    주소: 서울 성동구 용답동 238-2 오르세오피스텔 201호
                                </p>
                            </div>

                            <p style="margin: 20px 0 0 0; text-align: center; color: #999999; font-size: 12px; line-height: 1.6;">
                                문의사항이나 추가 수정 요청이 있으시면 언제든지 연락 주시기 바랍니다.<br>
                                감사합니다.
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
    """
    Send HTML email with embedded logo
    """
    try:
        print("\n" + "="*70)
        print("E-MARKET 프로젝트 진행 보고 이메일 발송 시작")
        print("="*70)
        print(f"시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"발신자: {SENDER_NAME} <{SENDER_EMAIL}>")
        print(f"수신자: {RECIPIENT_NAME} ({RECIPIENT_EMAIL})")
        print(f"참조: {CC_EMAIL}")
        print("-"*70)

        # Create message
        msg = MIMEMultipart('related')
        msg['Subject'] = f"[E-MARKET] 프로젝트 진행 상황 보고 - {datetime.now().strftime('%Y년 %m월 %d일')}"
        msg['From'] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
        msg['To'] = f"{RECIPIENT_NAME} <{RECIPIENT_EMAIL}>"
        msg['Cc'] = CC_EMAIL
        msg['Date'] = utils.formatdate(localtime=True)

        # Attach HTML body
        html_body = create_email_html()
        msg_alternative = MIMEMultipart('alternative')
        msg.attach(msg_alternative)
        msg_alternative.attach(MIMEText(html_body, 'html', 'utf-8'))

        # Attach logo as inline image
        try:
            logo_data = resize_logo(LOGO_PATH, max_width=400)
            logo = MIMEImage(logo_data)
            logo.add_header('Content-ID', '<logo>')
            logo.add_header('Content-Disposition', 'inline', filename='logo.jpg')
            msg.attach(logo)
            print("✓ 로고 이미지 첨부 완료")
        except Exception as e:
            print(f"⚠ 로고 첨부 실패 (계속 진행): {e}")

        # Send email
        print("이메일 전송 중...")
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.set_debuglevel(0)
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(SENDER_EMAIL, EMAIL_PASSWORD)

            # Send to recipient and CC
            recipients = [RECIPIENT_EMAIL, CC_EMAIL]
            server.send_message(msg, to_addrs=recipients)

        print("="*70)
        print("✅ 이메일 전송 성공!")
        print("="*70)
        print(f"수신자: {RECIPIENT_NAME} ({RECIPIENT_EMAIL}) ✓")
        print(f"참조: {CC_EMAIL} ✓")
        print("="*70 + "\n")

        return True

    except Exception as e:
        print("="*70)
        print("❌ 이메일 전송 실패")
        print("="*70)
        print(f"오류: {str(e)}")
        print("="*70 + "\n")
        return False

if __name__ == "__main__":
    send_email()
