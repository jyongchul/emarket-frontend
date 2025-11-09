# E-MARKET 프로젝트 - 일일 진행 보고 자동화

## 개요

E-MARKET 프로젝트의 진행 상황을 매일 자동으로 고객(임수진 대표)에게 이메일과 SMS로 전송하는 자동화 시스템입니다.

## 파일 구성

```
email-automation/
├── send_daily_email.py      # 이메일 발송 스크립트
├── send_daily_sms.py         # SMS 발송 스크립트
├── send_daily_report.py      # 통합 발송 스크립트 (이메일 + SMS)
└── README.md                 # 이 파일
```

## 설정 정보

### 수신자
- **이름**: 임수진 대표
- **이메일**: sjlim0114@daum.net
- **전화번호**: 010-3487-3457

### 발신자
- **이름**: 하얀모자마케팅 이종철
- **이메일**: jyongchul@gmail.com
- **참조**: jyongchul@naver.com
- **전화번호**: 010-9333-2028

### 프로젝트 정보
- **프로젝트명**: E-MARKET (외국인 바이어 대상 중고거래 중개 배송 플랫폼)
- **계약 금액**: 4,208,806원 (부가세 별도)
- **계약금**: 2,310,000원 (부가세 포함)
- **Vercel URL**: https://emarket-frontend-one.vercel.app
- **GitHub**: https://github.com/jyongchul/emarket-frontend

## 사용 방법

### 1. 이메일만 발송

```bash
python3 /mnt/c/EMARKET/email-automation/send_daily_email.py
```

### 2. SMS만 발송

```bash
python3 /mnt/c/EMARKET/email-automation/send_daily_sms.py
```

### 3. 이메일 + SMS 동시 발송 (권장)

```bash
python3 /mnt/c/EMARKET/email-automation/send_daily_report.py
```

## Cron 설정

매일 오전 9시에 자동 발송되도록 설정:

```bash
# Crontab 편집
crontab -e

# 아래 라인 추가 (매일 09:00 KST)
0 9 * * * /usr/bin/python3 /mnt/c/EMARKET/email-automation/send_daily_report.py >> /mnt/c/EMARKET/email-automation/cron.log 2>&1
```

### Cron 로그 확인

```bash
tail -f /mnt/c/EMARKET/email-automation/cron.log
```

## 이메일 형식

- **형식**: HTML (inline CSS)
- **너비**: 최대 1000px
- **반응형**: 모바일 최적화
- **첨부**: 회사 로고 (자동 리사이징)
- **내용**:
  - 프로젝트 진행 상황
  - 완료된 작업 목록
  - 진행 중인 작업
  - 향후 계획
  - 계약금 안내
  - 추가 서비스 (SNS/SEO)
  - 회사 정보 및 숨고 리뷰 링크

## SMS 형식

- **유형**: 자동 판단 (SMS/LMS)
  - 90 bytes 이하: SMS (단문)
  - 91-2000 bytes: LMS (장문)
- **특징**:
  - "?" 기호 사용 금지 (사용자 요청사항)
  - 간결한 진행 상황 요약
  - 계약금 안내
  - 이메일 확인 요청

## API 설정

### Gmail SMTP
- **서버**: smtp.gmail.com
- **포트**: 587 (TLS)
- **인증**: App Password 사용

### Aligo SMS API
- **API 키**: ef5c198fjdlguiw8ee8gzxjlle704m2o
- **사용자 ID**: jyongchul
- **발신번호**: 010-9333-2028

## 주의사항

### ⚠️ 고객 대면 콘텐츠 규칙

이메일과 SMS는 고객에게 직접 전송되므로, **절대로** AI 사용 흔적을 남기지 않습니다:

- ❌ "🤖 Generated with Claude Code" **사용 금지**
- ❌ "AI generated" 등의 표현 **사용 금지**
- ❌ 자동화 관련 언급 **사용 금지**

### ✅ 허용 사항

- 회사 정보: (주)하얀모자마케팅
- 대표자 정보: 이종철
- 연락처 및 숨고 리뷰 링크
- 전문적인 진행 보고 내용

## 테스트

### 테스트 이메일 발송

실제 고객에게 발송하기 전에 반드시 테스트:

```bash
# send_daily_email.py의 RECIPIENT_EMAIL을 임시 변경
RECIPIENT_EMAIL = "jyongchul@gmail.com"  # 테스트용

# 발송 후 확인
python3 /mnt/c/EMARKET/email-automation/send_daily_email.py
```

## 문제 해결

### 이메일 발송 실패

1. Gmail App Password 확인
2. 네트워크 연결 확인
3. 로고 파일 경로 확인: `/mnt/c/하얀모자마케팅-로고 251021.png`

### SMS 발송 실패

1. Aligo API 키 확인
2. 전화번호 형식 확인 (하이픈 제거됨)
3. 메시지 길이 확인 (최대 2000 bytes)

### Cron 실행 안됨

1. Cron 서비스 상태 확인:
   ```bash
   sudo service cron status
   ```

2. Python 경로 확인:
   ```bash
   which python3
   ```

3. 권한 확인:
   ```bash
   chmod +x /mnt/c/EMARKET/email-automation/*.py
   ```

## 연락처

**문제 발생 시 연락처:**
- 이메일: jyongchul@naver.com
- 전화: 010-9333-2028
- 카카오톡: jyongchul
