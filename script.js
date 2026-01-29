// Menu Data with Prices
const menuData = {
    starters: [
        { name: "Rayalaseema Chicken Vepudu", price: 220 },
        { name: "Naatu Kodi Fry", price: 250 },
        { name: "Chicken 65 (Rayalaseema Style)", price: 200 },
        { name: "Kodi Pakodi", price: 180 },
        { name: "Mutton Sukka", price: 280 },
        { name: "Royyala Vepudu", price: 320 },
        { name: "Fish Fry (Andhra Masala)", price: 240 },
        { name: "Egg Pakodi", price: 160 },
        { name: "Paneer 65", price: 180 },
        { name: "Mushroom Pepper Fry", price: 170 },
        { name: "Chicken Lollipop", price: 210 },
        { name: "Ghee Roast Prawns", price: 350 }
    ],
    breads: [
        { name: "Tandoori Roti", price: 30 },
        { name: "Butter Roti", price: 40 },
        { name: "Plain Naan", price: 50 },
        { name: "Butter Naan", price: 60 },
        { name: "Garlic Naan", price: 70 },
        { name: "Chilli Garlic Naan", price: 80 },
        { name: "Rumali Roti", price: 45 },
        { name: "Lachha Paratha", price: 55 },
        { name: "Pudina Paratha", price: 60 },
        { name: "Andhra Parotta", price: 65 },
        { name: "Kulcha (Plain)", price: 70 },
        { name: "Kulcha (Stuffing)", price: 85 }
    ],
    biryani: [
        { name: "Rayalaseema Chicken Biryani", price: 280 },
        { name: "Rayalaseema Mutton Biryani", price: 350 },
        { name: "Naatu Kodi Biryani", price: 320 },
        { name: "Gongura Chicken Biryani", price: 300 },
        { name: "Gongura Mutton Biryani", price: 380 },
        { name: "Ulavacharu Chicken Biryani", price: 340 },
        { name: "Kodi Pulao", price: 260 },
        { name: "Keema Biryani", price: 290 },
        { name: "Prawns Biryani", price: 420 },
        { name: "Egg Dum Biryani", price: 220 },
        { name: "Veg Dum Biryani", price: 200 },
        { name: "Hyderabadi Biryani", price: 310 }
    ],
    specials: [
        { name: "Ragi Sangati with Naatu Kodi Pulusu", price: 380 },
        { name: "Ragi Sangati with Mutton Pulusu", price: 450 },
        { name: "Ulavacharu Chicken Curry", price: 420 },
        { name: "Ulavacharu Mutton Curry", price: 480 },
        { name: "Naatu Kodi Pulusu", price: 350 },
        { name: "Rayalaseema Mutton Kura", price: 400 },
        { name: "Gongura Chicken Curry", price: 320 },
        { name: "Gongura Mutton Curry", price: 380 },
        { name: "Pachi Pulusu", price: 180 },
        { name: "Royyala Pulusu", price: 360 },
        { name: "Fish Pulusu (Andhra Style)", price: 340 },
        { name: "Traditional Chutney & Gunpowder Combo", price: 120 }
    ],
    desserts: [
        { name: "Pootharekulu", price: 150 },
        { name: "Bobbatlu", price: 120 },
        { name: "Ariselu", price: 100 },
        { name: "Bellam Gavvalu", price: 110 },
        { name: "Semiya Payasam", price: 90 },
        { name: "Paramannam", price: 85 },
        { name: "Gulab Jamun", price: 95 },
        { name: "Double Ka Meetha", price: 130 },
        { name: "Carrot Halwa", price: 105 },
        { name: "Badam Payasam", price: 140 },
        { name: "Rasmalai", price: 125 },
        { name: "Kheer", price: 80 }
    ],
    drinks: [
        { name: "Mineral Water", price: 30 },
        { name: "Sweet Lassi", price: 60 },
        { name: "Salt Lassi", price: 55 },
        { name: "Majjiga (Buttermilk)", price: 40 },
        { name: "Badam Milk", price: 80 },
        { name: "Rose Milk", price: 70 },
        { name: "Fresh Lime Water", price: 45 },
        { name: "Lime Soda", price: 50 },
        { name: "Masala Soda", price: 55 },
        { name: "Tender Coconut Water", price: 65 },
        { name: "Aam Panna", price: 60 },
        { name: "Jaljeera", price: 40 }
    ],
    mocktails: [
        { name: "Virgin Mojito", price: 120 },
        { name: "Blue Lagoon", price: 140 },
        { name: "Green Apple Mojito", price: 130 },
        { name: "Watermelon Cooler", price: 110 },
        { name: "Pineapple Punch", price: 125 },
        { name: "Orange Blast", price: 105 },
        { name: "Strawberry Cooler", price: 135 },
        { name: "Mint Lemonade", price: 95 },
        { name: "Virgin Pina Colada", price: 145 },
        { name: "Peach Iced Tea", price: 115 },
        { name: "Classic Cold Coffee", price: 100 },
        { name: "Mango Delight", price: 150 }
    ]
};

// Global Variables
let posCart = [];
let onlineCart = [];
let currentPOSCategory = '';
let billNumberCounter = 1;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderMenu();
    renderOnlineMenu();
    updateBillNumber();
});

// Section Navigation
function showSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Menu Rendering
function renderMenu() {
    const menuContent = document.getElementById('menuContent');
    if (!menuContent) return;
    
    const sections = [
        { id: 'starters', title: 'STARTERS', icon: '🌶️', items: menuData.starters },
        { id: 'breads', title: 'BREAD SPECIALS', icon: '🫓', items: menuData.breads },
        { id: 'biryani', title: 'BIRYANI & PULAO', icon: '🍚', items: menuData.biryani },
        { id: 'specials', title: 'AUTHENTIC RAYALASEEMA CORE SPECIALS', icon: '🌶️', items: menuData.specials },
        { id: 'desserts', title: 'DESSERTS', icon: '🍮', items: menuData.desserts },
        { id: 'drinks', title: 'DRINKS', icon: '🥤', items: menuData.drinks },
        { id: 'mocktails', title: 'MOCKTAILS', icon: '🍹', items: menuData.mocktails }
    ];
    
    menuContent.innerHTML = sections.map(section => `
        <div class="menu-section">
            <h3 class="heading-font text-2xl font-bold mb-6 text-orange-600">
                ${section.icon} ${section.title}
            </h3>
            <div class="space-y-1">
                ${section.items.map((item, index) => `
                    <div class="menu-item">
                        <span class="menu-item-name">${index + 1}. ${item.name}</span>
                        <span class="menu-item-price">₹${item.price}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderOnlineMenu() {
    const onlineMenuContent = document.getElementById('onlineMenuContent');
    if (!onlineMenuContent) return;
    
    const sections = [
        { id: 'starters', title: 'STARTERS', icon: '🌶️', items: menuData.starters },
        { id: 'breads', title: 'BREAD SPECIALS', icon: '🫓', items: menuData.breads },
        { id: 'biryani', title: 'BIRYANI & PULAO', icon: '🍚', items: menuData.biryani },
        { id: 'specials', title: 'AUTHENTIC RAYALASEEMA CORE SPECIALS', icon: '🌶️', items: menuData.specials },
        { id: 'desserts', title: 'DESSERTS', icon: '🍮', items: menuData.desserts },
        { id: 'drinks', title: 'DRINKS', icon: '🥤', items: menuData.drinks },
        { id: 'mocktails', title: 'MOCKTAILS', icon: '🍹', items: menuData.mocktails }
    ];
    
    onlineMenuContent.innerHTML = sections.map(section => `
        <div class="menu-card-modern">
            <h3 class="heading-font text-2xl font-bold mb-6 text-orange-600">
                ${section.icon} ${section.title}
            </h3>
            <div class="grid md:grid-cols-2 gap-4">
                ${section.items.map(item => `
                    <div class="menu-item-card">
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-800">${item.name}</h4>
                            <p class="text-orange-600 font-bold text-lg mt-1">₹${item.price}</p>
                        </div>
                        <button onclick="addToOnlineCart('${item.name}', ${item.price})" class="add-to-cart-btn ripple">
                            <i class="fas fa-plus"></i>
                            <span>Add</span>
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// POS Functions
function selectPOSCategory(category) {
    currentPOSCategory = category;
    
    // Update button states
    document.querySelectorAll('.pos-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.pos-button').classList.add('active');
    
    // Render menu items
    renderPOSMenuItems(category);
}

function renderPOSMenuItems(category) {
    const posMenuItems = document.getElementById('posMenuItems');
    if (!posMenuItems) return;
    
    const items = menuData[category] || [];
    
    posMenuItems.innerHTML = items.map(item => `
        <button onclick="addToPOSCart('${item.name}', ${item.price})" class="pos-menu-item bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-orange-400 hover:bg-orange-50 transition text-center ripple">
            <div class="font-semibold text-sm">${item.name}</div>
            <div class="text-orange-600 font-bold mt-2">₹${item.price}</div>
        </button>
    `).join('');
}

function addToPOSCart(name, price) {
    const existingItem = posCart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        posCart.push({ name, price, quantity: 1 });
    }
    
    updatePOSCart();
}

function updatePOSCart() {
    const posCartItems = document.getElementById('posCartItems');
    if (!posCartItems) return;
    
    if (posCart.length === 0) {
        posCartItems.innerHTML = '<p class="text-gray-500 text-center">No items in cart</p>';
    } else {
        posCartItems.innerHTML = posCart.map(item => `
            <div class="cart-item">
                <div>
                    <div class="font-semibold">${item.name}</div>
                    <div class="text-sm text-gray-600">₹${item.price} x ${item.quantity}</div>
                </div>
                <div class="quantity-controls">
                    <button onclick="updatePOSQuantity('${item.name}', -1)" class="quantity-btn">-</button>
                    <span class="mx-2 font-semibold">${item.quantity}</span>
                    <button onclick="updatePOSQuantity('${item.name}', 1)" class="quantity-btn">+</button>
                </div>
            </div>
        `).join('');
    }
    
    calculatePOSTotal();
}

function updatePOSQuantity(name, change) {
    const item = posCart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            posCart = posCart.filter(item => item.name !== name);
        }
        updatePOSCart();
    }
}

function calculatePOSTotal() {
    const subtotal = posCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.05;
    const serviceCharge = document.getElementById('serviceCharge').checked ? subtotal * 0.1 : 0;
    const grandTotal = subtotal + gst + serviceCharge;
    
    document.getElementById('posSubtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('posGST').textContent = `₹${gst.toFixed(2)}`;
    document.getElementById('posServiceCharge').textContent = `₹${serviceCharge.toFixed(2)}`;
    document.getElementById('posGrandTotal').textContent = `₹${grandTotal.toFixed(2)}`;
}

function clearPOSCart() {
    posCart = [];
    updatePOSCart();
}

function generatePOSBill() {
    const tableNumber = document.getElementById('tableNumber').value;
    const paymentMode = document.getElementById('paymentMode').value;
    
    if (!tableNumber) {
        alert('Please select a table number');
        return;
    }
    
    if (posCart.length === 0) {
        alert('Please add items to the cart');
        return;
    }
    
    // Calculate totals
    const subtotal = posCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.05;
    const serviceCharge = document.getElementById('serviceCharge').checked ? subtotal * 0.1 : 0;
    const grandTotal = subtotal + gst + serviceCharge;
    
    // Generate detailed bill content
    let billContent = `╔════════════════════════════════════════╗\n`;
    billContent += `║         RAYALASEEMA RUCHULU           ║\n`;
    billContent += `║      Authentic Fine Dine Restaurant    ║\n`;
    billContent += `╚════════════════════════════════════════╝\n\n`;
    billContent += `BILL RECEIPT\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Bill Number: ${document.getElementById('billNumber').textContent}\n`;
    billContent += `Table: ${tableNumber}\n`;
    billContent += `Date: ${new Date().toLocaleDateString()}\n`;
    billContent += `Time: ${new Date().toLocaleTimeString()}\n`;
    billContent += `Payment Mode: ${paymentMode.toUpperCase()}\n\n`;
    billContent += `ORDER DETAILS\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Qty   Item                    Price    Total\n`;
    billContent += `─────────────────────────────────────\n`;
    
    posCart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const itemName = item.name.padEnd(23);
        const price = `₹${item.price}`.padStart(7);
        const total = `₹${itemTotal}`.padStart(8);
        billContent += `${item.quantity.toString().padStart(3)}   ${itemName} ${price} ${total}\n`;
    });
    
    billContent += `─────────────────────────────────────\n\n`;
    billContent += `BILL SUMMARY\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Subtotal:                    ₹${subtotal.toFixed(2)}\n`;
    billContent += `GST (5%):                    ₹${gst.toFixed(2)}\n`;
    if (serviceCharge > 0) {
        billContent += `Service Charge (10%):        ₹${serviceCharge.toFixed(2)}\n`;
    }
    billContent += `─────────────────────────────────────\n`;
    billContent += `GRAND TOTAL:                 ₹${grandTotal.toFixed(2)}\n\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Thank you for dining with us!\n`;
    billContent += `Visit again for authentic Rayalaseema flavors\n`;
    billContent += `╔════════════════════════════════════════╗\n`;
    billContent += `║   RAYALASEEMA RUCHULU - FINE DINING   ║\n`;
    billContent += `╚════════════════════════════════════════╝`;
    
    // Create and download printable bill
    createPrintableBill(billContent, `POS_Bill_${document.getElementById('billNumber').textContent}.txt`);
    
    // Show success message
    alert('Bill generated and downloaded successfully!');
    
    // Clear cart and update bill number
    clearPOSCart();
    updateBillNumber();
}

function createPrintableBill(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function updateBillNumber() {
    document.getElementById('billNumber').textContent = `BILL-${String(billNumberCounter++).padStart(3, '0')}`;
}

// Online Order Functions
function addToOnlineCart(name, price) {
    const existingItem = onlineCart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        onlineCart.push({ name, price, quantity: 1 });
    }
    
    updateOnlineCart();
    showCartNotification();
}

function updateOnlineCart() {
    const onlineCartItems = document.getElementById('onlineCartItems');
    const cartCount = document.getElementById('cartCount');
    
    if (!onlineCartItems || !cartCount) return;
    
    const totalItems = onlineCart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (onlineCart.length === 0) {
        onlineCartItems.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Your cart is empty</p>
                <p class="text-sm text-gray-400 mt-2">Add delicious items to get started!</p>
            </div>
        `;
    } else {
        onlineCartItems.innerHTML = onlineCart.map(item => `
            <div class="cart-item-card">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                        <h5 class="font-semibold text-gray-800">${item.name}</h5>
                        <p class="text-orange-600 font-bold">₹${item.price}</p>
                    </div>
                    <button onclick="removeFromOnlineCart('${item.name}')" class="text-red-500 hover:text-red-700 transition">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                <div class="flex justify-between items-center">
                    <div class="quantity-control-modern">
                        <button onclick="updateOnlineQuantity('${item.name}', -1)" class="quantity-btn-modern">-</button>
                        <span class="font-semibold px-3">${item.quantity}</span>
                        <button onclick="updateOnlineQuantity('${item.name}', 1)" class="quantity-btn-modern">+</button>
                    </div>
                    <div class="font-bold text-gray-800">
                        ₹${item.price * item.quantity}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    calculateOnlineTotal();
}

function updateOnlineQuantity(name, change) {
    const item = onlineCart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            onlineCart = onlineCart.filter(item => item.name !== name);
        }
        updateOnlineCart();
    }
}

function calculateOnlineTotal() {
    const subtotal = onlineCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.05;
    const deliveryCharge = document.getElementById('orderType')?.value === 'delivery' ? 50 : 0;
    const total = subtotal + gst + deliveryCharge;
    
    const onlineSubtotal = document.getElementById('onlineSubtotal');
    const onlineGST = document.getElementById('onlineGST');
    const onlineTotal = document.getElementById('onlineTotal');
    
    if (onlineSubtotal) onlineSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    if (onlineGST) onlineGST.textContent = `₹${gst.toFixed(2)}`;
    if (onlineTotal) onlineTotal.textContent = `₹${total.toFixed(2)}`;
    
    // Show delivery charge if applicable
    const deliveryElement = document.getElementById('deliveryCharge');
    if (deliveryElement) {
        if (deliveryCharge > 0) {
            deliveryElement.style.display = 'flex';
            deliveryElement.querySelector('span:last-child').textContent = `₹${deliveryCharge.toFixed(2)}`;
        } else {
            deliveryElement.style.display = 'none';
        }
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
}

function removeFromOnlineCart(name) {
    onlineCart = onlineCart.filter(item => item.name !== name);
    updateOnlineCart();
}

function showCartNotification() {
    const cartCount = document.getElementById('cartCount');
    cartCount.classList.add('success-animation');
    setTimeout(() => {
        cartCount.classList.remove('success-animation');
    }, 500);
}

function proceedToCheckout() {
    if (onlineCart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    // Update checkout summary
    const checkoutSummary = document.getElementById('checkoutOrderSummary');
    if (checkoutSummary) {
        const subtotal = onlineCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const gst = subtotal * 0.05;
        const deliveryCharge = 50;
        const total = subtotal + gst + deliveryCharge;
        
        checkoutSummary.innerHTML = onlineCart.map(item => `
            <div class="flex justify-between text-sm">
                <span>${item.name} x${item.quantity}</span>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `).join('');
        
        checkoutSummary.innerHTML += `
            <div class="border-t pt-2 mt-2">
                <div class="flex justify-between text-sm font-semibold">
                    <span>Subtotal:</span>
                    <span>₹${subtotal.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-sm font-semibold">
                    <span>GST (5%):</span>
                    <span>₹${gst.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-sm font-semibold">
                    <span>Delivery:</span>
                    <span>₹${deliveryCharge.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-base font-bold text-orange-600">
                    <span>Total:</span>
                    <span>₹${total.toFixed(2)}</span>
                </div>
            </div>
        `;
    }
    
    // Show checkout modal
    document.getElementById('checkoutModal').classList.remove('hidden');
    toggleCart();
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.add('hidden');
}

function placeOrder() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const orderType = document.getElementById('orderType').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const specialInstructions = document.getElementById('specialInstructions').value;
    
    if (!customerName || !customerPhone) {
        alert('Please fill in required fields');
        return;
    }
    
    if (orderType === 'delivery' && !customerAddress) {
        alert('Please provide delivery address');
        return;
    }
    
    // Calculate final totals
    const subtotal = onlineCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.05;
    const deliveryCharge = orderType === 'delivery' ? 50 : 0;
    const total = subtotal + gst + deliveryCharge;
    
    // Generate order ID
    const orderId = 'ORD-' + Date.now().toString().slice(-8);
    
    // Generate detailed bill content
    let billContent = `╔════════════════════════════════════════╗\n`;
    billContent += `║         RAYALASEEMA RUCHULU           ║\n`;
    billContent += `║      ONLINE ORDER RECEIPT            ║\n`;
    billContent += `╚════════════════════════════════════════╝\n\n`;
    billContent += `ORDER DETAILS\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Order ID: ${orderId}\n`;
    billContent += `Date: ${new Date().toLocaleDateString()}\n`;
    billContent += `Time: ${new Date().toLocaleTimeString()}\n`;
    billContent += `Order Type: ${orderType.toUpperCase()}\n`;
    billContent += `Payment: ${paymentMethod.toUpperCase()}\n\n`;
    billContent += `CUSTOMER INFORMATION\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Name: ${customerName}\n`;
    billContent += `Phone: ${customerPhone}\n`;
    if (orderType === 'delivery') {
        billContent += `Address: ${customerAddress}\n`;
        billContent += `Delivery Area: ${customerAddress.split(',').pop().trim()}\n`;
    }
    billContent += `\n`;
    billContent += `ORDER ITEMS\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Qty   Item                    Price    Total\n`;
    billContent += `─────────────────────────────────────\n`;
    
    onlineCart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const itemName = item.name.padEnd(23);
        const price = `₹${item.price}`.padStart(7);
        const total = `₹${itemTotal}`.padStart(8);
        billContent += `${item.quantity.toString().padStart(3)}   ${itemName} ${price} ${total}\n`;
    });
    
    billContent += `─────────────────────────────────────\n\n`;
    billContent += `BILL SUMMARY\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Subtotal:                    ₹${subtotal.toFixed(2)}\n`;
    billContent += `GST (5%):                    ₹${gst.toFixed(2)}\n`;
    if (deliveryCharge > 0) {
        billContent += `Delivery Charge:             ₹${deliveryCharge.toFixed(2)}\n`;
    }
    billContent += `─────────────────────────────────────\n`;
    billContent += `TOTAL AMOUNT:                ₹${total.toFixed(2)}\n\n`;
    
    if (specialInstructions) {
        billContent += `SPECIAL INSTRUCTIONS\n`;
        billContent += `─────────────────────────────────────\n`;
        billContent += `${specialInstructions}\n\n`;
    }
    
    billContent += `DELIVERY INFORMATION\n`;
    billContent += `─────────────────────────────────────\n`;
    if (orderType === 'delivery') {
        billContent += `Estimated Delivery: 30-45 minutes\n`;
        billContent += `Delivery Partner: Rayalaseema Ruchulu\n`;
        billContent += `Contact: +91-XXXXXXXXXX\n`;
    } else {
        billContent += `Pickup Time: 15-20 minutes\n`;
        billContent += `Pickup Location: Rayalaseema Ruchulu\n`;
        billContent += `Address: Restaurant Address\n`;
    }
    billContent += `\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Thank you for ordering from Rayalaseema Ruchulu!\n`;
    billContent += `Enjoy the authentic flavors of Rayalaseema!\n`;
    billContent += `╔════════════════════════════════════════╗\n`;
    billContent += `║   RAYALASEEMA RUCHULU - ONLINE ORDER  ║\n`;
    billContent += `╚════════════════════════════════════════╝`;
    
    // Create and download printable bill
    createPrintableBill(billContent, `Online_Order_${orderId}.txt`);
    
    // Show confirmation with bill details
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('checkoutModal').classList.add('hidden');
    document.getElementById('confirmationModal').classList.remove('hidden');
    
    // Display bill details in confirmation
    const confirmationDiv = document.querySelector('#confirmationModal .text-gray-600');
    if (confirmationDiv) {
        confirmationDiv.innerHTML = `
            <p>Your order has been successfully placed.</p>
            <p class="mt-2 font-semibold">Total Amount: ₹${total.toFixed(2)}</p>
            <p class="text-sm">Order ID: ${orderId}</p>
            <p class="text-sm">Estimated ${orderType === 'delivery' ? 'delivery' : 'pickup'}: ${orderType === 'delivery' ? '30-45 minutes' : '15-20 minutes'}</p>
            <p class="text-xs mt-2 text-orange-600">Bill downloaded successfully!</p>
        `;
    }
    
    // Log order and bill (in real app, this would be sent to server)
    console.log('Order Placed:', {
        orderId,
        customer: { name: customerName, phone: customerPhone, address: customerAddress },
        orderType,
        paymentMethod,
        items: onlineCart,
        total: total.toFixed(2),
        specialInstructions
    });
    
    console.log('Generated Bill:\n', billContent);
    
    // Clear cart
    onlineCart = [];
    updateOnlineCart();
}

function closeConfirmation() {
    document.getElementById('confirmationModal').classList.add('hidden');
}

// Online POS System Functions
let onlinePOSCart = [];
let currentOnlinePOSCategory = '';
let onlineOrderNumberCounter = 1;

function selectOnlinePOSCategory(category) {
    currentOnlinePOSCategory = category;
    
    // Update button states
    document.querySelectorAll('.pos-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.pos-button').classList.add('active');
    
    // Render menu items
    renderOnlinePOSMenuItems(category);
}

function renderOnlinePOSMenuItems(category) {
    const onlinePOSMenuItems = document.getElementById('onlinePOSMenuItems');
    if (!onlinePOSMenuItems) return;
    
    const items = menuData[category] || [];
    
    onlinePOSMenuItems.innerHTML = items.map(item => `
        <button onclick="addToOnlinePOSCart('${item.name}', ${item.price})" class="pos-menu-item bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-orange-400 hover:bg-orange-50 transition text-center ripple">
            <div class="font-semibold text-sm">${item.name}</div>
            <div class="text-orange-600 font-bold mt-2">₹${item.price}</div>
        </button>
    `).join('');
}

function addToOnlinePOSCart(name, price) {
    const existingItem = onlinePOSCart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        onlinePOSCart.push({ name, price, quantity: 1 });
    }
    
    updateOnlinePOSCart();
}

function updateOnlinePOSCart() {
    const onlinePOSCartItems = document.getElementById('onlinePOSCartItems');
    if (!onlinePOSCartItems) return;
    
    if (onlinePOSCart.length === 0) {
        onlinePOSCartItems.innerHTML = '<p class="text-gray-500 text-center">No items in cart</p>';
    } else {
        onlinePOSCartItems.innerHTML = onlinePOSCart.map(item => `
            <div class="cart-item">
                <div>
                    <div class="font-semibold">${item.name}</div>
                    <div class="text-sm text-gray-600">₹${item.price} x ${item.quantity}</div>
                </div>
                <div class="quantity-controls">
                    <button onclick="updateOnlinePOSQuantity('${item.name}', -1)" class="quantity-btn">-</button>
                    <span class="mx-2 font-semibold">${item.quantity}</span>
                    <button onclick="updateOnlinePOSQuantity('${item.name}', 1)" class="quantity-btn">+</button>
                </div>
            </div>
        `).join('');
    }
    
    calculateOnlinePOSTotal();
}

function updateOnlinePOSQuantity(name, change) {
    const item = onlinePOSCart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            onlinePOSCart = onlinePOSCart.filter(item => item.name !== name);
        }
        updateOnlinePOSCart();
    }
}

function calculateOnlinePOSTotal() {
    const subtotal = onlinePOSCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.05;
    const orderType = document.getElementById('orderTypePOS')?.value || 'delivery';
    const deliveryCharge = orderType === 'delivery' ? 50 : 0;
    const total = subtotal + gst + deliveryCharge;
    
    document.getElementById('onlinePOSSubtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('onlinePOSGST').textContent = `₹${gst.toFixed(2)}`;
    document.getElementById('onlinePOSGrandTotal').textContent = `₹${total.toFixed(2)}`;
    
    // Show/hide delivery charge
    const deliveryElement = document.getElementById('onlinePOSDeliveryCharge');
    if (deliveryElement) {
        if (deliveryCharge > 0) {
            deliveryElement.style.display = 'flex';
            deliveryElement.querySelector('span:last-child').textContent = `₹${deliveryCharge.toFixed(2)}`;
        } else {
            deliveryElement.style.display = 'none';
        }
    }
}

function clearOnlinePOSCart() {
    onlinePOSCart = [];
    updateOnlinePOSCart();
}

function placeOnlinePOSOrder() {
    const customerName = document.getElementById('customerNamePOS').value;
    const customerPhone = document.getElementById('customerPhonePOS').value;
    const customerAddress = document.getElementById('customerAddressPOS').value;
    const orderType = document.getElementById('orderTypePOS').value;
    const paymentMode = document.getElementById('onlinePaymentMode').value;
    const specialInstructions = document.getElementById('onlineSpecialInstructions').value;
    
    if (!customerName || !customerPhone) {
        alert('Please fill in customer name and phone number');
        return;
    }
    
    if (orderType === 'delivery' && !customerAddress) {
        alert('Please provide delivery address');
        return;
    }
    
    if (onlinePOSCart.length === 0) {
        alert('Please add items to the order');
        return;
    }
    
    // Calculate totals
    const subtotal = onlinePOSCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.05;
    const deliveryCharge = orderType === 'delivery' ? 50 : 0;
    const total = subtotal + gst + deliveryCharge;
    
    // Generate order ID
    const orderId = document.getElementById('onlineOrderNumber').textContent;
    
    // Generate bill content
    let billContent = `╔════════════════════════════════════════╗\n`;
    billContent += `║         RAYALASEEMA RUCHULU           ║\n`;
    billContent += `║      ONLINE ORDER (POS)             ║\n`;
    billContent += `╚════════════════════════════════════════╝\n\n`;
    billContent += `ORDER DETAILS\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Order ID: ${orderId}\n`;
    billContent += `Date: ${new Date().toLocaleDateString()}\n`;
    billContent += `Time: ${new Date().toLocaleTimeString()}\n`;
    billContent += `Order Type: ${orderType.toUpperCase()}\n`;
    billContent += `Payment: ${paymentMode.toUpperCase()}\n\n`;
    billContent += `CUSTOMER INFORMATION\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Name: ${customerName}\n`;
    billContent += `Phone: ${customerPhone}\n`;
    if (orderType === 'delivery') {
        billContent += `Address: ${customerAddress}\n`;
    }
    billContent += `\n`;
    billContent += `ORDER ITEMS\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Qty   Item                    Price    Total\n`;
    billContent += `─────────────────────────────────────\n`;
    
    onlinePOSCart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const itemName = item.name.padEnd(23);
        const price = `₹${item.price}`.padStart(7);
        const total = `₹${itemTotal}`.padStart(8);
        billContent += `${item.quantity.toString().padStart(3)}   ${itemName} ${price} ${total}\n`;
    });
    
    billContent += `─────────────────────────────────────\n\n`;
    billContent += `BILL SUMMARY\n`;
    billContent += `─────────────────────────────────────\n`;
    billContent += `Subtotal:                    ₹${subtotal.toFixed(2)}\n`;
    billContent += `GST (5%):                    ₹${gst.toFixed(2)}\n`;
    if (deliveryCharge > 0) {
        billContent += `Delivery Charge:             ₹${deliveryCharge.toFixed(2)}\n`;
    }
    billContent += `─────────────────────────────────────\n`;
    billContent += `TOTAL AMOUNT:                ₹${total.toFixed(2)}\n\n`;
    
    if (specialInstructions) {
        billContent += `SPECIAL INSTRUCTIONS\n`;
        billContent += `─────────────────────────────────────\n`;
        billContent += `${specialInstructions}\n\n`;
    }
    
    billContent += `─────────────────────────────────────\n`;
    billContent += `Order placed successfully!\n`;
    billContent += `Thank you for ordering from Rayalaseema Ruchulu!\n`;
    billContent += `╔════════════════════════════════════════╗\n`;
    billContent += `║   RAYALASEEMA RUCHULU - ONLINE POS   ║\n`;
    billContent += `╚════════════════════════════════════════╝`;
    
    // Create and download bill
    createPrintableBill(billContent, `OnlinePOS_Order_${orderId}.txt`);
    
    // Show success message
    alert(`Order placed successfully!\nOrder ID: ${orderId}\nTotal Amount: ₹${total.toFixed(2)}\n\nBill downloaded successfully!`);
    
    // Clear cart and update order number
    clearOnlinePOSCart();
    updateOnlineOrderNumber();
    
    // Clear form fields
    document.getElementById('customerNamePOS').value = '';
    document.getElementById('customerPhonePOS').value = '';
    document.getElementById('customerAddressPOS').value = '';
    document.getElementById('onlineSpecialInstructions').value = '';
}

function updateOnlineOrderNumber() {
    document.getElementById('onlineOrderNumber').textContent = `ORD-${String(onlineOrderNumberCounter++).padStart(3, '0')}`;
}

// Listen for order type changes
document.addEventListener('DOMContentLoaded', function() {
    const orderTypeSelect = document.getElementById('orderTypePOS');
    if (orderTypeSelect) {
        orderTypeSelect.addEventListener('change', function() {
            // Show/hide address field
            const addressField = document.getElementById('addressFieldPOS');
            if (this.value === 'delivery') {
                addressField.style.display = 'block';
            } else {
                addressField.style.display = 'none';
            }
            calculateOnlinePOSTotal();
        });
    }
    
    // Initialize order number
    updateOnlineOrderNumber();
});
