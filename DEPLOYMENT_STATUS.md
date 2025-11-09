# E-MARKET 배포 및 연동 상태

작성일: 2025-11-09
**최종 테스트**: 2025-11-09 13:50 (KST)
상태: 🔴 **긴급: WordPress 백엔드 다운** (Frontend는 정상)

---

## 🔴 긴급 이슈 (2025-11-09 13:50 발견)

### WordPress 백엔드 완전 다운

**증상**:
- WordPress URL 접근 불가: `https://wp-emarket.whmarketing.org`
- HTTP 상태 코드: **530** (Origin DNS Error)
- Cloudflare 에러: **1033** (Argo Tunnel Error)
- Vercel API 응답: `{"error":"Failed to fetch products"}`

**영향**:
- ✅ Frontend (Vercel): 정상 작동 (UI, 네비게이션, 레이아웃)
- ❌ Backend (WordPress): 완전 다운
- ❌ 제품 데이터 로딩 실패 → "No products found" 표시
- ❌ WooCommerce API 호출 실패
- ❌ 이미지 로딩 실패 (WordPress 이미지)

**원인 추정**:
1. **Cloudflare Tunnel 데몬 중지됨** (가장 가능성 높음)
   - 로컬 서버에서 `cloudflared` 프로세스가 실행 중이지 않음
   - 서버 재부팅 후 자동 시작 실패 가능성

2. **로컬 WordPress 서버 다운**
   - Apache/Nginx 웹서버 중지
   - MySQL 데이터베이스 중지

3. **Cloudflare DNS/설정 문제**
   - Tunnel 설정 변경 또는 삭제

**긴급 조치 필요**:
→ **Perplexity Comet Task #8** (신규 생성됨) 참조

**테스트 결과** (2025-11-09 13:50):
```bash
# WordPress 백엔드 테스트
$ curl -I https://wp-emarket.whmarketing.org/
HTTP/2 530
server: cloudflare
cf-ray: 99bab003ad3211f1-LAX

# WooCommerce API 테스트
$ curl https://wp-emarket.whmarketing.org/wp-json/wc/v3/products
error code: 1033

# Vercel Frontend 테스트
$ curl -I https://emarket-frontend-one.vercel.app/
HTTP/2 200 ✅
```

---

## 🏗️ 아키텍처 개요

```
사용자
  ↓
Vercel (Next.js Frontend)
  ↓ HTTPS API 호출
Cloudflare Tunnel (WordPress/WooCommerce Backend)
  ↓
WordPress + WooCommerce (로컬 서버)
```

---

## 🌐 배포 환경

### 1. Frontend - Vercel

**플랫폼**: Vercel
**프레임워크**: Next.js 14 (App Router)
**빌드**: Automatic (GitHub Push 트리거)

**URL**:
- **프로덕션**: https://emarket-frontend-one.vercel.app
- **GitHub**: https://github.com/jyongchul/emarket-frontend

**환경 변수** (vercel.json):
```json
{
  "WORDPRESS_API_URL": "https://wp-emarket.whmarketing.org/wp-json/wp/v2",
  "WOOCOMMERCE_API_URL": "https://wp-emarket.whmarketing.org/wp-json/wc/v3"
}
```

**Vercel 설정**:
- Region: `icn1` (Seoul)
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**캐싱 전략**:
```json
{
  "/api/*": "s-maxage=60, stale-while-revalidate",
  "/api/image/*": "public, max-age=31536000, immutable"
}
```

---

### 2. Backend - Cloudflare Tunnel

**플랫폼**: Cloudflare Tunnel
**서비스**: WordPress + WooCommerce
**로컬 서버**: Localhost

**URL**:
- **공개 URL**: https://wp-emarket.whmarketing.org
- **WordPress Admin**: https://wp-emarket.whmarketing.org/wp-admin
- **REST API**: https://wp-emarket.whmarketing.org/wp-json
- **WooCommerce API**: https://wp-emarket.whmarketing.org/wp-json/wc/v3

**Cloudflare Tunnel 특징**:
- ✅ Zero Trust 보안
- ✅ 자동 SSL/TLS
- ✅ DDoS 보호
- ✅ 글로벌 CDN
- ✅ 포트 포워딩 불필요

---

## 🔗 연동 방식

### API 연동

**WordPress REST API**:
```typescript
// src/lib/wordpress.ts
const WP_API_URL = process.env.WORDPRESS_API_URL ||
  'http://wordpress/wp-json/wp/v2';

// Vercel 프로덕션 환경
// → https://wp-emarket.whmarketing.org/wp-json/wp/v2
```

**WooCommerce REST API**:
```typescript
// vercel.json
"WOOCOMMERCE_API_URL": "https://wp-emarket.whmarketing.org/wp-json/wc/v3"
```

**이미지 프록시**:
```typescript
// src/app/api/image/[...path]/route.ts
const WORDPRESS_BASE_URL = process.env.WORDPRESS_IMAGE_URL ||
  'https://wp-emarket.whmarketing.org';

// Next.js API Route가 WordPress 이미지를 프록시
// /api/image/uploads/2024/11/product.jpg
// → https://wp-emarket.whmarketing.org/wp-content/uploads/2024/11/product.jpg
```

---

## 📊 현재 상태 체크 (2025-11-09 13:50 업데이트)

### ✅ 정상 작동 항목

1. **Frontend (Vercel)** - 모두 정상 ✅
   - ✅ 배포 완료: https://emarket-frontend-one.vercel.app
   - ✅ 빌드 성공
   - ✅ 자동 배포 파이프라인 작동
   - ✅ HTTPS 적용
   - ✅ 환경 변수 설정 완료
   - ✅ UI 렌더링 정상 (헤더, 네비게이션, 푸터)
   - ✅ 다국어 지원 (EN/FR/KO) 작동

### 🔴 다운 항목 (긴급)

2. **Backend (Cloudflare Tunnel)** - 완전 다운 ❌
   - ❌ WordPress 접근 불가 (HTTP 530)
   - ❌ REST API 응답 없음 (Error 1033)
   - ❌ WooCommerce API 작동 안 함
   - ❌ SSL/TLS 연결 실패
   - ❌ 이미지 로딩 불가

3. **연동 상태** - 백엔드 다운으로 인한 전체 실패 ❌
   - ❌ Next.js → WordPress API 통신 실패
   - ❌ 제품 목록 로딩 실패 ("No products found")
   - ❌ 이미지 프록시 작동 안 함 (원본 서버 다운)
   - ❌ 장바구니 기능 사용 불가
   - ❌ 주문 생성 기능 사용 불가

4. **성능**
   - ✅ Frontend 성능: 정상 (백엔드 독립적)
   - ⚠️ 전체 사용자 경험: 심각한 저하 (제품 데이터 없음)

---

## 🔍 검증이 필요한 항목

Perplexity Comet에게 다음 항목 검증 요청:

### 1. Cloudflare 설정 검증
- [ ] Tunnel 상태 확인
- [ ] SSL/TLS 등급 확인
- [ ] DNS 설정 확인
- [ ] 보안 규칙 확인
- [ ] WAF (Web Application Firewall) 설정 확인

### 2. Vercel 설정 검증
- [ ] 배포 로그 확인
- [ ] 환경 변수 올바르게 적용되었는지 확인
- [ ] 빌드 최적화 상태 확인
- [ ] Edge 네트워크 상태 확인
- [ ] 함수 실행 로그 확인

### 3. 연동 테스트
- [ ] API 응답 시간 측정
- [ ] 에러 핸들링 테스트
- [ ] 네트워크 중단 시 동작 확인
- [ ] 캐싱 동작 확인
- [ ] 이미지 최적화 검증

### 4. 보안 검증
- [ ] HTTPS 강제 리다이렉트 확인
- [ ] CORS 설정 확인
- [ ] API 키 노출 여부 확인
- [ ] SQL Injection 방어 확인
- [ ] XSS 방어 확인

---

## 📋 환경별 설정 비교

| 항목 | 로컬 개발 | 프로덕션 (Vercel) |
|------|----------|------------------|
| **Frontend URL** | http://localhost:3000 | https://emarket-frontend-one.vercel.app |
| **WordPress API** | http://wordpress/wp-json/wp/v2 | https://wp-emarket.whmarketing.org/wp-json/wp/v2 |
| **WooCommerce API** | http://wordpress/wp-json/wc/v3 | https://wp-emarket.whmarketing.org/wp-json/wc/v3 |
| **이미지 URL** | http://wordpress | https://wp-emarket.whmarketing.org |
| **SSL** | ❌ | ✅ (자동) |
| **CDN** | ❌ | ✅ (Cloudflare + Vercel) |

---

## 🚀 배포 프로세스

### 자동 배포 플로우

```
1. 코드 수정 (로컬)
   ↓
2. Git Commit
   ↓
3. Git Push (GitHub)
   ↓
4. Vercel 자동 감지
   ↓
5. 빌드 시작
   ↓
6. 환경 변수 주입 (vercel.json)
   ↓
7. Next.js 빌드 (npm run build)
   ↓
8. 배포 (Vercel Edge Network)
   ↓
9. 배포 완료 (1-2분 소요)
```

### 배포 확인 방법

```bash
# 최근 커밋 확인
git log -1 --oneline

# Vercel 배포 상태 확인 (웹)
https://vercel.com/dashboard

# 프로덕션 URL 테스트
curl -I https://emarket-frontend-one.vercel.app

# API 연결 테스트
curl https://wp-emarket.whmarketing.org/wp-json/wp/v2
```

---

## 🛠️ 문제 해결

### 일반적인 문제

**1. Vercel 빌드 실패**
```bash
# 로컬에서 빌드 테스트
npm run build

# 에러 확인
vercel logs
```

**2. API 연결 실패**
```bash
# WordPress API 상태 확인
curl https://wp-emarket.whmarketing.org/wp-json/wp/v2

# Cloudflare Tunnel 상태 확인
# → Cloudflare Dashboard에서 확인 필요 (Perplexity Comet)
```

**3. 이미지 로딩 실패**
```bash
# 이미지 프록시 API 테스트
curl https://emarket-frontend-one.vercel.app/api/image/uploads/2024/11/test.jpg

# WordPress 직접 이미지 확인
curl https://wp-emarket.whmarketing.org/wp-content/uploads/2024/11/test.jpg
```

---

## 📞 연락처 및 액세스

### Vercel
- **대시보드**: https://vercel.com/dashboard
- **프로젝트**: emarket-frontend-one
- **계정**: jyongchul@gmail.com

### Cloudflare
- **대시보드**: https://dash.cloudflare.com/
- **도메인**: whmarketing.org
- **Tunnel**: wp-emarket

### GitHub
- **Repository**: https://github.com/jyongchul/emarket-frontend
- **계정**: jyongchul

---

## ✅ 다음 단계

### 🔴 긴급 작업 (즉시 조치 필요)

**Task #8**: WordPress 백엔드 복구 (최우선)
→ Perplexity Comet에게 위임 (PERPLEXITY_COMET_TASKS.md 참조)

1. **Cloudflare Tunnel 복구** (1순위)
   - 로컬 서버에서 `cloudflared` 프로세스 상태 확인
   - Cloudflare Dashboard에서 Tunnel 상태 확인
   - 필요시 Tunnel 재시작 또는 재생성

2. **WordPress 서버 복구** (2순위)
   - Apache/Nginx 웹서버 상태 확인 및 시작
   - MySQL 데이터베이스 상태 확인 및 시작
   - WordPress 정상 작동 확인

3. **연동 테스트** (3순위)
   - API 엔드포인트 응답 확인
   - 제품 데이터 로딩 테스트
   - 이미지 프록시 작동 확인

### 📋 후속 작업 (백엔드 복구 후)

**즉시 필요한 작업** (Perplexity Comet):
1. Vercel 배포 설정 검증 (Task #7-2)
2. End-to-end 통합 테스트 (Task #7-3)
3. 보안 검증 (SSL, CORS, Headers) (Task #7-4)
4. 모니터링 및 로깅 설정 (Task #7-5)

**향후 개선 사항** (선택):
1. CDN 캐싱 최적화
2. API 응답 시간 단축
3. 이미지 최적화 강화
4. **자동 재시작 설정** (서버 재부팅 시 Cloudflare Tunnel 자동 시작)

---

**작성자**: Claude Code
**긴급 조치 필요**: Perplexity Comet (Task #8: WordPress 백엔드 복구)
**마지막 업데이트**: 2025-11-09 13:50 (KST)
**상태**: 🔴 긴급 - WordPress 백엔드 다운
