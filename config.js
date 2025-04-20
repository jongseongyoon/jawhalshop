// 주문 시스템 설정
const config = {
    // 카테고리 구조
    categories: {
        // 상위 카테고리
        mainCategories: [
            { id: 'rice', name: '쌀' },
            { id: 'beans', name: '콩' },
            { id: 'vegetables', name: '채소' },
            { id: 'fruits', name: '과일' }
        ],
        
        // 중위 카테고리
        subCategories: {
            rice: [
                { id: 'white_rice', name: '백미' },
                { id: 'brown_rice', name: '현미' },
                { id: 'glutinous_rice', name: '찹쌀' },
                { id: 'black_rice', name: '흑미' }
            ],
            beans: [
                { id: 'soybean', name: '콩' },
                { id: 'mung_bean', name: '녹두' },
                { id: 'red_bean', name: '팥' }
            ],
            vegetables: [
                { id: 'leafy', name: '잎채소' },
                { id: 'root', name: '뿌리채소' }
            ],
            fruits: [
                { id: 'apple', name: '사과' },
                { id: 'pear', name: '배' }
            ]
        }
    },
    
    // 상품 목록
    products: [
        // 내친구김
        { mainCategory: "내친구김", name: "전장김(1속)", price: 5000, unit: "속" },
        { mainCategory: "내친구김", name: "김자반(1속)", price: 5000, unit: "속" },
        { mainCategory: "내친구김", name: "도시락김(10봉)", price: 5000, unit: "봉" },
        { mainCategory: "내친구김", name: "선물세트(1봉)", price: 20000, unit: "봉" },
        { mainCategory: "내친구김", name: "돌돌이김(1봉)", price: 45000, unit: "봉" },

        // 드림공방
        { mainCategory: "드림공방", name: "목도리(1개)", price: 8000, unit: "개" },
        { mainCategory: "드림공방", name: "방석", price: 8000, unit: "개" },
        { mainCategory: "드림공방", name: "발매트", price: 20000, unit: "개" },
        { mainCategory: "드림공방", name: "손수건", price: 5000, unit: "개" },

        // 산타떡볶이
        { mainCategory: "산타떡볶이", name: "떡볶이/양파/당근", price: 4000, unit: "인분" },
        { mainCategory: "산타떡볶이", name: "치즈떡볶이", price: 8000, unit: "인분" },
        { mainCategory: "산타떡볶이", name: "까르보네떡볶이", price: 14000, unit: "인분" },
        { mainCategory: "산타떡볶이", name: "로제떡볶이1", price: 4000, unit: "인분" },
        { mainCategory: "산타떡볶이", name: "로제떡볶이2", price: 2000, unit: "인분" },
        { mainCategory: "산타떡볶이", name: "고추마요떡볶이", price: 2000, unit: "인분" },
        { mainCategory: "산타떡볶이", name: "짜장떡볶이", price: 2000, unit: "인분" },
        { mainCategory: "산타떡볶이", name: "김말이", price: 2000, unit: "개" },
        { mainCategory: "산타떡볶이", name: "오뎅", price: 2000, unit: "개" },
        { mainCategory: "산타떡볶이", name: "순대", price: 3000, unit: "인분" },
        { mainCategory: "산타떡볶이", name: "모듬튀김", price: 3000, unit: "인분" },
        { mainCategory: "산타떡볶이", name: "떡", price: 1500, unit: "인분" },
        { mainCategory: "산타떡볶이", name: "사이다", price: 1200, unit: "개" },
        { mainCategory: "산타떡볶이", name: "콜라", price: 1200, unit: "개" },

        // 세차&새차
        { mainCategory: "세차&새차", name: "손세차", price: 3000, unit: "회" },
        { mainCategory: "세차&새차", name: "룸클리닝(500ml)", price: 7000, unit: "개" },
        { mainCategory: "세차&새차", name: "매직샴푸(500ml)", price: 2000, unit: "개" },

        // 슬림샐러드
        { mainCategory: "슬림샐러드", name: "닭/새우/계란 샐러드", price: 2000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "닭/새우/계란 튀김", price: 2000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "닭가슴살/로메인", price: 5000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "닭가슴살/로메인 골드", price: 5000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "닭가슴살/로메인 실버", price: 5000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "한우불/로메인", price: 4000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "한우불/치킨", price: 4000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "한우불/돈까스", price: 2000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "닭가슴살 야채 (소)", price: 7000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "닭가슴살 야채 (중)", price: 10000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "닭가슴살 야채 (대)", price: 20000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "닭가슴살 야채 믹스 (소)", price: 15000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "닭가슴살 야채 믹스 (중)", price: 20000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "닭가슴살 야채 믹스 (대)", price: 40000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "기본형-기본 골드", price: 30000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "기본형-기본 실버", price: 40000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "커피", price: 1000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "커피 원두", price: 2000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "커피 믹스", price: 3000, unit: "개" },
        { mainCategory: "슬림샐러드", name: "커피 드립 네티", price: 3000, unit: "개" },

        // 화이트세탁
        { mainCategory: "화이트세탁", name: "셔츠드라이 셀프", price: 8000, unit: "개" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 위탁", price: 8000, unit: "개" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 골드", price: 8000, unit: "개" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 실버", price: 9000, unit: "개" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 일반", price: 8000, unit: "개" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 특수", price: 8000, unit: "개" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 급세탁", price: 9000, unit: "개" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 특급세탁", price: 8000, unit: "개" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 10개/1", price: 78000, unit: "세트" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 프리미엄", price: 3000, unit: "개" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 프리미엄 특세", price: 5000, unit: "개" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 프리미엄 실버", price: 5000, unit: "개" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 프리미엄 1/2", price: 5000, unit: "개" },
        { mainCategory: "화이트세탁", name: "셔츠드라이 프리미엄 세트", price: 3000, unit: "세트" },

        // 희망이네두부
        { mainCategory: "희망이네두부", name: "수수-깨끗 (순두부, 찌개용)", price: 6000, unit: "모" },
        { mainCategory: "희망이네두부", name: "수수-꿀맛 (약간 단단)", price: 6000, unit: "모" },
        { mainCategory: "희망이네두부", name: "약초-깨끗 (순두부, 찌개용)", price: 3000, unit: "모" },
        { mainCategory: "희망이네두부", name: "약초-꿀맛 (약간 단단)", price: 20000, unit: "모" },
        { mainCategory: "희망이네두부", name: "SUV-두부(1kg)", price: 23000, unit: "모" },
        { mainCategory: "희망이네두부", name: "SUV-두부(1.5kg)", price: 27000, unit: "모" },
        { mainCategory: "희망이네두부", name: "SUV-두부(2kg)", price: 32000, unit: "모" },
        { mainCategory: "희망이네두부", name: "SUV-두부(2.5kg)", price: 38000, unit: "모" },
        { mainCategory: "희망이네두부", name: "SUV-두부(3kg)", price: 50000, unit: "모" },
        { mainCategory: "희망이네두부", name: "SUV-두부(기능성) 백태", price: "가격협의", unit: "모" },
        { mainCategory: "희망이네두부", name: "SUV-두부(기능성) 약초", price: 100000, unit: "모" },
        { mainCategory: "희망이네두부", name: "SUV-두부(기능성)", price: 10000, unit: "모" },
        { mainCategory: "희망이네두부", name: "SUV-두부(약초)", price: 5000, unit: "모" }
    ],
    
    // 주문 정보 저장 방식
    storageMethod: 'localStorage',
    
    // 파일 저장 설정 (storageMethod가 'file'일 때 사용)
    fileSettings: {
        fileName: 'orders.json',
        savePath: './orders/'
    },
    
    // 이메일 알림 설정 (선택사항)
    emailNotification: {
        enabled: false,
        adminEmail: 'admin@example.com'
    },
    
    // 기본 상품 목록 (선택사항)
    defaultProducts: [
        { name: '상품1', price: 10000 },
        { name: '상품2', price: 15000 },
        { name: '상품3', price: 20000 }
    ]
}; 