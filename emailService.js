// 이메일 발송 서비스 설정
const EMAIL_CONFIG = {
    recipients: ['ezowie@naver.com', 'chan0109@gmail.com'],
    dailyScheduleTime: '23:59',
    weeklyScheduleTime: '20:00',
    weeklyScheduleDay: 4, // 목요일 (0: 일요일, 4: 목요일)
    dailySubject: '일일 주문 내역 취합',
    weeklySubject: '주간 주문 내역 취합'
};

// 스프레드시트 형식으로 주문 데이터 변환
function convertOrdersToCSV(orders) {
    // CSV 헤더
    const headers = [
        '주문일시',
        '주문자명',
        '부서',
        '연락처',
        '상호',
        '품목',
        '수량',
        '단가',
        '합계금액'
    ];

    // CSV 데이터 행 생성
    const rows = orders.flatMap(order => {
        return order.items.map(item => [
            new Date(order.orderDate).toLocaleString(),
            order.customerName,
            order.department,
            order.phoneNumber,
            item.mainCategory,
            item.name,
            item.quantity,
            typeof item.price === 'number' ? item.price.toLocaleString() : item.price,
            typeof item.price === 'number' ? (item.price * item.quantity).toLocaleString() : '가격협의'
        ]);
    });

    // CSV 문자열 생성
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    return csvContent;
}

// 특정 기간의 주문 데이터 가져오기
function getOrdersByDateRange(startDate, endDate) {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    return savedOrders.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= startDate && orderDate <= endDate;
    });
}

// 오늘의 주문 데이터 가져오기
function getTodayOrders() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return getOrdersByDateRange(today, tomorrow);
}

// 지난 주의 주문 데이터 가져오기
function getLastWeekOrders() {
    const today = new Date();
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);
    lastWeekStart.setHours(0, 0, 0, 0);
    
    const lastWeekEnd = new Date(today);
    lastWeekEnd.setHours(23, 59, 59, 999);
    
    return getOrdersByDateRange(lastWeekStart, lastWeekEnd);
}

// 이메일 발송 스케줄러
function scheduleEmailDelivery() {
    scheduleDailyEmail();
    scheduleWeeklyEmail();
}

// 일일 이메일 발송 스케줄러
function scheduleDailyEmail() {
    const now = new Date();
    const scheduledTime = new Date();
    const [hours, minutes] = EMAIL_CONFIG.dailyScheduleTime.split(':');
    
    scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // 이미 지난 시간이면 다음 날로 설정
    if (now > scheduledTime) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
    }
    
    const timeUntilSchedule = scheduledTime - now;
    
    // 예약 실행
    setTimeout(() => {
        sendDailyOrderSummary();
        // 다음 날을 위한 재귀 호출
        scheduleDailyEmail();
    }, timeUntilSchedule);
}

// 주간 이메일 발송 스케줄러
function scheduleWeeklyEmail() {
    const now = new Date();
    const scheduledTime = new Date();
    const [hours, minutes] = EMAIL_CONFIG.weeklyScheduleTime.split(':');
    
    scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // 다음 목요일로 설정
    const daysUntilThursday = (EMAIL_CONFIG.weeklyScheduleDay - scheduledTime.getDay() + 7) % 7;
    scheduledTime.setDate(scheduledTime.getDate() + daysUntilThursday);
    
    // 이미 지난 시간이면 다음 주로 설정
    if (now > scheduledTime) {
        scheduledTime.setDate(scheduledTime.getDate() + 7);
    }
    
    const timeUntilSchedule = scheduledTime - now;
    
    // 예약 실행
    setTimeout(() => {
        sendWeeklyOrderSummary();
        // 다음 주를 위한 재귀 호출
        scheduleWeeklyEmail();
    }, timeUntilSchedule);
}

// 일일 주문 내역 이메일 발송
function sendDailyOrderSummary() {
    const todayOrders = getTodayOrders();
    
    if (todayOrders.length === 0) {
        console.log('오늘의 주문 내역이 없습니다.');
        return;
    }
    
    const csvData = convertOrdersToCSV(todayOrders);
    const date = new Date().toLocaleDateString();
    
    // 이메일 발송 요청
    const emailData = {
        to: EMAIL_CONFIG.recipients,
        subject: `${EMAIL_CONFIG.dailySubject} (${date})`,
        attachments: [{
            filename: `일일주문내역_${date}.csv`,
            content: csvData
        }]
    };
    
    // 여기에 실제 이메일 발송 API 호출 코드 추가
    console.log('일일 이메일 발송 데이터:', emailData);
}

// 주간 주문 내역 이메일 발송
function sendWeeklyOrderSummary() {
    const weeklyOrders = getLastWeekOrders();
    
    if (weeklyOrders.length === 0) {
        console.log('지난 주 주문 내역이 없습니다.');
        return;
    }
    
    const csvData = convertOrdersToCSV(weeklyOrders);
    const date = new Date().toLocaleDateString();
    
    // 이메일 발송 요청
    const emailData = {
        to: EMAIL_CONFIG.recipients,
        subject: `${EMAIL_CONFIG.weeklySubject} (${date})`,
        attachments: [{
            filename: `주간주문내역_${date}.csv`,
            content: csvData
        }]
    };
    
    // 여기에 실제 이메일 발송 API 호출 코드 추가
    console.log('주간 이메일 발송 데이터:', emailData);
}

// 페이지 로드 시 스케줄러 시작
document.addEventListener('DOMContentLoaded', function() {
    scheduleEmailDelivery();
    console.log('이메일 발송 스케줄러가 시작되었습니다.');
}); 