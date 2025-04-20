# 장애인희망복지과 주문 관리 시스템

## 프로젝트 소개
장애인희망복지과의 주문 관리를 위한 웹 기반 시스템입니다. 상품 주문, 장바구니 관리, 주문 내역 관리 등의 기능을 제공합니다.

## 주요 기능
- 3단계 카테고리 기반 상품 선택
- 장바구니 기능
- 주문 저장 및 관리
- 일일/주간 주문 내역 자동 이메일 발송

## 기술 스택
- Frontend: HTML, CSS, JavaScript
- 데이터 저장: LocalStorage
- 이메일 발송: 자동화된 스케줄링

## 설치 및 실행 방법
1. 저장소 클론
```bash
git clone https://github.com/[username]/jahwal-shop.git
cd jahwal-shop
```

2. 웹 서버 실행
- 로컬 웹 서버를 사용하여 index.html 실행
- 또는 Live Server 등의 개발 도구 사용

## 자동화된 이메일 발송
- 일일 주문 내역: 매일 23:59 발송
- 주간 주문 내역: 매주 목요일 20:00 발송
- 수신자: ezowie@naver.com, chan0109@gmail.com

## 시스템 문의
장애인희망복지과: 062-360-7641

## 파일 구조
```
jahwal-shop/
├── index.html          # 메인 페이지
├── styles.css          # 스타일시트
├── script.js           # 메인 스크립트
├── config.js           # 설정 파일
├── emailService.js     # 이메일 서비스
└── README.md          # 문서
```

## 라이선스
이 프로젝트는 비공개로 운영되며, 장애인희망복지과 전용 시스템입니다. 