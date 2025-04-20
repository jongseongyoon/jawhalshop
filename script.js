// 주문 목록을 저장할 배열
let orders = [];
let currentUser = null;

// 장바구니 배열
let cart = [];

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // localStorage에서 저장된 주문 불러오기
    loadOrders();
    
    // 상위 카테고리 목록 표시
    displayMainCategories();
    
    // 장바구니 데이터 불러오기
    loadCart();
    
    // 엔터키 이벤트 추가
    document.getElementById('phoneLogin').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });

    // QR 코드 생성
    generateQRCode();
});

// QR 코드 생성
function generateQRCode() {
    const currentURL = window.location.href;
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: currentURL,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// 상위 카테고리 목록 표시
function displayMainCategories() {
    const mainCategorySelect = document.getElementById('mainCategory');
    mainCategorySelect.innerHTML = '<option value="">선택하세요</option>';
    
    const mainCategories = [
        "내친구김",
        "드림공방",
        "산타떡볶이",
        "세차&새차",
        "슬림샐러드",
        "화이트세탁",
        "희망이네두부"
    ];
    
    mainCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        mainCategorySelect.appendChild(option);
    });
}

// 카테고리 선택 시 하위 카테고리(품목) 업데이트
function updateSubCategories() {
    const mainCategory = document.getElementById('mainCategory').value;
    const subCategorySelect = document.getElementById('subCategory');
    
    // 품목 초기화
    subCategorySelect.innerHTML = '<option value="">선택하세요</option>';
    
    if (mainCategory) {
        // 선택된 상호의 품목만 필터링
        const items = config.products
            .filter(product => product.mainCategory === mainCategory)
            .map(product => product.name)
            .filter((value, index, self) => self.indexOf(value) === index);
        
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            subCategorySelect.appendChild(option);
        });
    }
    
    // 상품 목록 업데이트
    updateProducts();
}

// 품목 선택 시 상품 목록 업데이트
function updateProducts() {
    const mainCategory = document.getElementById('mainCategory').value;
    const selectedItem = document.getElementById('subCategory').value;
    const tbody = document.getElementById('productTableBody');
    tbody.innerHTML = '';
    
    if (mainCategory && selectedItem) {
        // 선택된 상호와 품목에 해당하는 상품 찾기
        const product = config.products.find(p => 
            p.mainCategory === mainCategory && 
            p.name === selectedItem
        );
        
        if (product) {
            const tr = document.createElement('tr');
            const priceDisplay = typeof product.price === 'number' ? 
                product.price.toLocaleString() + '원' : 
                product.price;
            
            tr.innerHTML = `
                <td>${product.name}</td>
                <td>${priceDisplay}</td>
                <td>${product.unit}</td>
                <td>${product.mainCategory}</td>
                <td>
                    <input type="number" class="quantity-input" min="1" value="1">
                </td>
                <td>
                    <button onclick="addToCart(this)" data-product='${JSON.stringify(product)}'>담기</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    }
}

// 장바구니에 상품 추가
function addToCart(button) {
    const product = JSON.parse(button.dataset.product);
    const quantityInput = button.parentElement.parentElement.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value);
    
    if (quantity <= 0) {
        alert('수량을 1개 이상 선택해주세요.');
        return;
    }
    
    // 장바구니에 같은 상품이 있는지 확인
    const existingItem = cart.find(item => 
        item.mainCategory === product.mainCategory && 
        item.name === product.name
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    // 장바구니 업데이트 및 저장
    updateCart();
    saveCart();
    
    // 수량 입력 초기화
    quantityInput.value = 1;
    alert('장바구니에 추가되었습니다.');
}

// 장바구니에서 상품 제거
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// 장바구니 업데이트
function updateCart() {
    const tbody = document.querySelector('#cartTableBody');
    tbody.innerHTML = '';
    
    cart.forEach((item, index) => {
        const tr = document.createElement('tr');
        const total = typeof item.price === 'number' ? 
            item.price * item.quantity : 
            '가격협의';
        
        tr.innerHTML = `
            <td>${item.mainCategory}</td>
            <td>${item.name}</td>
            <td>${typeof item.price === 'number' ? item.price.toLocaleString() : item.price}원</td>
            <td>${item.unit}</td>
            <td>${item.quantity}</td>
            <td>${typeof total === 'number' ? total.toLocaleString() + '원' : total}</td>
            <td>
                <button onclick="removeFromCart(${index})" class="delete-btn">삭제</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // 총 주문 금액 업데이트
    updateTotal();
    
    // 현재 장바구니 상태 저장
    saveCart();
}

// 총 주문 금액 업데이트
function updateTotal() {
    const total = cart.reduce((sum, item) => {
        if (typeof item.price === 'number') {
            return sum + (item.price * item.quantity);
        }
        return sum;
    }, 0);
    document.getElementById('totalAmount').textContent = total.toLocaleString();
}

// 로그인 처리
function login() {
    const phoneNumber = document.getElementById('phoneLogin').value;
    
    if (!phoneNumber) {
        alert('휴대폰 번호를 입력해주세요.');
        return;
    }
    
    // 휴대폰 번호 형식 검증
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert('올바른 휴대폰 번호를 입력해주세요.');
        return;
    }
    
    currentUser = phoneNumber;
    document.getElementById('userPhone').textContent = phoneNumber;
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('orderForm').style.display = 'block';
}

// 로그아웃 처리
function logout() {
    currentUser = null;
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('orderForm').style.display = 'none';
    resetForm();
}

// 수량 업데이트
function updateQuantity(index, quantity) {
    const mainCategoryId = document.getElementById('mainCategory').value;
    const subCategoryId = document.getElementById('subCategory').value;
    const filteredProducts = config.products.filter(product => 
        product.mainCategory === mainCategoryId && 
        product.subCategory === subCategoryId
    );
    
    const product = filteredProducts[index];
    const row = document.getElementById('productTableBody').children[index];
    const totalCell = row.querySelector('.product-total');
    
    quantity = parseInt(quantity) || 0;
    const total = product.price * quantity;
    totalCell.textContent = total.toLocaleString() + '원';
    
    updateOrders();
    updateTotalAmount();
}

// 주문 목록 업데이트
function updateOrders() {
    orders = [];
    const mainCategoryId = document.getElementById('mainCategory').value;
    const subCategoryId = document.getElementById('subCategory').value;
    const filteredProducts = config.products.filter(product => 
        product.mainCategory === mainCategoryId && 
        product.subCategory === subCategoryId
    );
    
    const rows = document.getElementById('productTableBody').children;
    Array.from(rows).forEach((row, index) => {
        const quantity = parseInt(row.querySelector('.quantity-input').value) || 0;
        if (quantity > 0) {
            const product = filteredProducts[index];
            orders.push({
                productName: product.name,
                quantity: quantity,
                price: product.price,
                unit: product.unit,
                businessOwner: product.businessOwner,
                total: product.price * quantity
            });
        }
    });
}

// 총 금액 업데이트
function updateTotalAmount() {
    const total = orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('totalAmount').textContent = total.toLocaleString();
}

// 주문 제출
function submitOrder() {
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다.');
        return;
    }
    
    const customerName = document.getElementById('customerName').value;
    const department = document.getElementById('department').value;
    
    if (!customerName || !department) {
        alert('주문자 정보를 모두 입력해주세요.');
        return;
    }
    
    const orderData = {
        customerName,
        department,
        phoneNumber: currentUser,
        items: [...cart],
        totalAmount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        orderDate: new Date().toISOString()
    };
    
    // 주문 데이터 저장
    saveToLocalStorage(orderData);
    
    // 결제 섹션 표시
    document.getElementById('paymentSection').style.display = 'block';
    
    // 주문 완료 메시지
    alert('주문이 완료되었습니다. 카카오페이 결제를 진행해주세요.');
    
    // 주문자 정보 초기화
    document.getElementById('customerName').value = '';
    document.getElementById('department').value = '';
}

// localStorage에 저장
function saveToLocalStorage(orderData) {
    let savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    savedOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(savedOrders));
}

// 폼 초기화
function resetForm() {
    document.getElementById('customerName').value = '';
    document.getElementById('department').value = '';
    document.getElementById('phoneLogin').value = '';
    document.getElementById('mainCategory').value = '';
    document.getElementById('subCategory').innerHTML = '<option value="">선택하세요</option>';
    document.getElementById('thirdCategory').innerHTML = '<option value="">선택하세요</option>';
    
    cart = [];
    saveCart();
    updateCart();
}

// 저장된 주문 불러오기
function loadOrders() {
    if (config.storageMethod === 'localStorage') {
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        console.log('저장된 주문:', savedOrders);
    }
}

// 장바구니 저장
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartTimestamp', new Date().toISOString());
    } catch (error) {
        console.error('현재 장바구니 저장 중 오류 발생:', error);
    }
}

// 장바구니 불러오기
function loadCart() {
    try {
        // 현재 진행 중인 장바구니 불러오기
        const savedCart = localStorage.getItem('cart');
        const cartTimestamp = localStorage.getItem('cartTimestamp');
        
        if (savedCart && cartTimestamp) {
            const now = new Date();
            const saved = new Date(cartTimestamp);
            const hoursDiff = (now - saved) / (1000 * 60 * 60);
            
            if (hoursDiff < 24) {
                cart = JSON.parse(savedCart);
            } else {
                localStorage.removeItem('cart');
                localStorage.removeItem('cartTimestamp');
                cart = [];
            }
        }
        
        // UI 업데이트
        updateCart();
    } catch (error) {
        console.error('장바구니 불러오기 중 오류 발생:', error);
        cart = [];
        updateCart();
    }
} 