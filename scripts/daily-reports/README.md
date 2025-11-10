# E-MARKET 일일 진행 보고 자동화 시스템

## 개요
E-MARKET 프로젝트의 진행 상황을 매일 자동으로 고객에게 이메일과 문자로 보고하는 시스템입니다.

## 파일 구조
```
/mnt/c/EMARKET/scripts/daily-reports/
├── send_daily_email.py      # 이메일 발송 스크립트
├── send_daily_sms.py         # SMS 발송 스크립트
├── send_daily_report.sh      # 통합 실행 스크립트
├── logo.png                  # 하얀모자마케팅 로고
├── logs/                     # 발송 로그 디렉토리
└── README.md                 # 이 파일
```

## 설정 방법

### 1. 이메일 설정 (`send_daily_email.py`)

**고객 이메일 주소 설정:**
```python
CLIENT_EMAIL = "jhosi@naver.com"  # 최지호 대표님 이메일로 변경 필요
```

**진행 상황 업데이트:**
`CURRENT_PROGRESS` 변수를 수정하여 현재 진행 상황을 업데이트하세요.

```python
CURRENT_PROGRESS = """
<li><strong>새로운 작업 내용</strong>
    <ul style="margin-top: 5px; padding-left: 20px; line-height: 1.8;">
        <li>상세 내용 1</li>
        <li>상세 내용 2</li>
    </ul>
</li>
"""
```

**향후 계획 업데이트:**
`NEXT_PLAN` 변수를 수정하여 다음 작업 계획을 업데이트하세요.

### 2. SMS 설정 (`send_daily_sms.py`)

**SMS API 설정 필요:**
1. 알리고(https://smartsms.aligo.in/) 또는 CoolSMS 가입
2. API 키 발급
3. `send_daily_sms.py`에서 다음 설정:

```python
SMS_API_KEY = "발급받은_API_키"
SMS_USER_ID = "알리고_사용자_ID"
SMS_SENDER = "010-9333-2028"  # 발신번호 (사전 등록 필요)
CLIENT_PHONE = "010-XXXX-XXXX"  # 고객 전화번호
```

**중요:** 발신번호는 통신사에 사전 등록되어 있어야 합니다.

### 3. Cron 설정

**현재 설정:** 매일 오전 09:00에 자동 실행

```bash
# crontab 확인
crontab -l | grep E-MARKET

# 출력:
# 0 9 * * * /mnt/c/EMARKET/scripts/daily-reports/send_daily_report.sh
```

**시간 변경이 필요한 경우:**
```bash
crontab -e
```

시간 형식: `분 시 일 월 요일`
- 예: `0 9 * * *` = 매일 오전 9시
- 예: `30 10 * * *` = 매일 오전 10시 30분

## 사용 방법

### 수동 실행 (테스트용)

**이메일만 발송:**
```bash
source /mnt/c/EMARKET/venv/bin/activate
python3 /mnt/c/EMARKET/scripts/daily-reports/send_daily_email.py
deactivate
```

**SMS만 발송:**
```bash
source /mnt/c/EMARKET/venv/bin/activate
python3 /mnt/c/EMARKET/scripts/daily-reports/send_daily_sms.py
deactivate
```

**통합 실행 (이메일 + SMS):**
```bash
/mnt/c/EMARKET/scripts/daily-reports/send_daily_report.sh
```

### 로그 확인

**마스터 로그:**
```bash
tail -f /mnt/c/EMARKET/scripts/daily-reports/logs/cron_master.log
```

**일별 로그:**
```bash
cat /mnt/c/EMARKET/scripts/daily-reports/logs/daily_report_20251110.log
```

## 이메일 템플릿 수정

`send_daily_email.py`의 `create_html_email()` 함수에서 HTML 템플릿을 수정할 수 있습니다.

**주의사항:**
1. **Inline CSS 사용 필수** - 일부 이메일 클라이언트는 `<style>` 태그를 지원하지 않습니다.
2. **반응형 디자인** - 모바일과 데스크톱 모두 고려
3. **Width 1000px** - 최대 너비를 1000px로 제한
4. **AI 생성 문구 절대 금지** - "🤖 Generated with Claude Code" 같은 문구 삭제

## 보안 주의사항

**절대 금지:**
- ❌ Git에 API 키, 비밀번호 커밋
- ❌ 이메일 비밀번호 평문 저장 (현재 스크립트 내 하드코딩)

**권장사항:**
- ✅ 환경 변수 (.env) 사용
- ✅ .gitignore에 설정 파일 추가
- ✅ 정기적으로 비밀번호 변경

## 문제 해결

### 이메일 발송 실패

**원인 1: Gmail 보안 설정**
- Google 계정에서 "보안 수준이 낮은 앱의 액세스" 허용
- 또는 "앱 비밀번호" 사용 (2단계 인증 필요)

**원인 2: 네트워크 문제**
```bash
# SMTP 서버 연결 확인
telnet smtp.gmail.com 465
```

### Cron 실행 안 됨

**Cron 서비스 상태 확인:**
```bash
service cron status
```

**Cron 재시작:**
```bash
sudo service cron restart
```

**Cron 로그 확인:**
```bash
grep CRON /var/log/syslog
```

## 고객 정보 업데이트

프로젝트 정보나 고객 정보가 변경될 경우 다음 변수를 수정하세요:

**`send_daily_email.py`:**
- `CLIENT_NAME` - 고객 이름
- `CLIENT_COMPANY` - 회사명
- `CLIENT_EMAIL` - 이메일 주소
- `PROJECT_NAME` - 프로젝트명
- `CONTRACT_AMOUNT_*` - 계약 금액

**`send_daily_sms.py`:**
- `CLIENT_NAME` - 고객 이름
- `CLIENT_PHONE` - 전화번호
- `PROJECT_NAME` - 프로젝트명

## 지원

문제가 발생하거나 수정이 필요한 경우:
- 📧 이메일: jyongchul@gmail.com
- 📞 전화: 010-9333-2028
- 💬 카카오톡: jyongchul

---

**마지막 업데이트:** 2025년 11월 10일
**버전:** 1.0.0
