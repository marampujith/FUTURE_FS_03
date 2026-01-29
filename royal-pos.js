// Unified Royal POS System - One System, Two Modes
// RAYALASEEMA RUCHULU - Enterprise Grade Restaurant Management

// Global Variables
let currentMode = 'staff'; // 'staff' or 'customer'
let currentCategory = '';
let cart = [];
let orderQueue = [];
let orderIdCounter = 1;
let customerOrderIdCounter = 1;

// Initialize System
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    updateOrderId();
    selectCategory('starters');
    
    // Setup event listeners
    document.getElementById('serviceCharge').addEventListener('change', calculateTotals);
    document.getElementById('orderType').addEventListener('change', updateTableDisplay);
    
    // Initialize customer mode
    selectCustomerCategory('starters');
});

// Menu Database - Now loaded from menu-data.js

// Create floating particles effect
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Gold particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
    
    // Spicy chili particles
    const spicyEmojis = ['🌶️', '🔥', '👻', '💥', '⚡'];
    for (let i = 0; i < 15; i++) {
        const chili = document.createElement('div');
        chili.className = 'chili-particle';
        chili.textContent = spicyEmojis[Math.floor(Math.random() * spicyEmojis.length)];
        chili.style.left = Math.random() * 100 + '%';
        chili.style.animationDelay = Math.random() * 25 + 's';
        chili.style.animationDuration = (20 + Math.random() * 15) + 's';
        chili.style.fontSize = (16 + Math.random() * 12) + 'px';
        particlesContainer.appendChild(chili);
    }
}

// Update current time
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Switch between Staff and Customer modes
function switchMode(mode) {
    currentMode = mode;
    
    // Update mode toggle UI
    document.querySelectorAll('.mode-option').forEach(option => {
        option.classList.remove('active');
    });
    event.target.closest('.mode-option').classList.add('active');
    
    // Show/hide appropriate sections
    if (mode === 'staff') {
        document.getElementById('staffPOS').classList.remove('hidden');
        document.getElementById('customerPOS').classList.add('hidden');
    } else {
        document.getElementById('staffPOS').classList.add('hidden');
        document.getElementById('customerPOS').classList.remove('hidden');
    }
    
    // Clear carts when switching modes
    clearCart();
    clearCustomerCart();
}

// Staff POS Functions
function selectCategory(category) {
    currentCategory = category;
    
    // Update category button states
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    event.target.closest('.category-card').classList.add('active');
    
    // Display menu items
    displayMenuItems(category);
}

function displayMenuItems(category) {
    const menuItemsContainer = document.getElementById('menuItems');
    const items = menuDatabase[category] || [];
    
    menuItemsContainer.innerHTML = items.map(item => `
        <div class="menu-item" onclick="addToCart('${item.name}', ${item.price})">
            <div class="flex justify-between items-center">
                <div class="flex-1">
                    <h4 class="font-semibold text-white">${item.name}</h4>
                    <p class="text-xs text-gray-300 mt-1">${item.description}</p>
                    <p class="text-xs text-yellow-200 mt-1"><strong>Ingredients:</strong> ${item.ingredients}</p>
                    <p class="text-yellow-400 font-bold mt-2">₹${item.price}</p>
                </div>
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="event.stopPropagation(); addToCart('${item.name}', ${item.price})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCartDisplay();
    showAddToCartAnimation();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-400 text-center">No items in cart</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                        <h5 class="font-semibold text-white">${item.name}</h5>
                        <p class="text-yellow-400">₹${item.price}</p>
                    </div>
                    <button onclick="removeFromCart('${item.name}')" class="text-red-400 hover:text-red-300">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="flex justify-between items-center">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                        <span class="font-bold text-white px-3">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    </div>
                    <div class="font-bold text-yellow-400">
                        ₹${item.price * item.quantity}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    calculateTotals();
}

function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== name);
        }
        updateCartDisplay();
    }
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.05;
    const serviceCharge = document.getElementById('serviceCharge').checked ? subtotal * 0.1 : 0;
    const grandTotal = subtotal + gst + serviceCharge;
    
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('gst').textContent = `₹${gst.toFixed(2)}`;
    document.getElementById('serviceAmount').textContent = `₹${serviceCharge.toFixed(2)}`;
    document.getElementById('grandTotal').textContent = `₹${grandTotal.toFixed(2)}`;
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}

function generateBill() {
    const tableNumber = document.getElementById('tableNumber').value;
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const orderType = document.getElementById('orderType').value;
    const paymentMode = document.getElementById('paymentMode').value;
    
    if (!tableNumber && orderType === 'dinein') {
        showNotification('Please select a table number', 'error');
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Please add items to the cart', 'error');
        return;
    }
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.05;
    const serviceCharge = document.getElementById('serviceCharge').checked ? subtotal * 0.1 : 0;
    const grandTotal = subtotal + gst + serviceCharge;
    
    // Create order object
    const order = {
        id: document.getElementById('orderId').textContent,
        table: tableNumber || (orderType === 'pickup' ? 'Pickup' : 'Delivery'),
        customerName: customerName || 'Walk-in Customer',
        customerPhone: customerPhone || '-',
        orderType: orderType,
        paymentMode: paymentMode,
        items: [...cart],
        subtotal: subtotal,
        gst: gst,
        serviceCharge: serviceCharge,
        grandTotal: grandTotal,
        status: 'preparing',
        timestamp: new Date().toISOString()
    };
    
    // Add to order queue
    orderQueue.unshift(order);
    updateOrderQueue();
    
    // Generate bill content
    const billContent = generateBillContent(order);
    
    // Create print window and send to printer
    printBillDirectly(billContent);
    
    // Show success message
    showSuccessModal(`Bill sent to printer! Order ID: ${order.id}`);
    
    // Clear cart and update order number
    clearCart();
    updateOrderId();
    
    // Clear form fields
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('tableNumber').value = '';
}

function printBillDirectly(billContent) {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Write the bill content to the new window
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Bill - RAYALASEEMA RUCHULU</title>
            <style>
                body {
                    font-family: 'Courier New', monospace;
                    font-size: 12px;
                    line-height: 1.2;
                    margin: 20px;
                    white-space: pre;
                }
                @media print {
                    body {
                        margin: 0;
                        font-size: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <pre>${billContent}</pre>
            <script>
                window.onload = function() {
                    window.print();
                    window.close();
                }
            </script>
        </body>
        </html>
    `);
    
    printWindow.document.close();
}

function generateBillContent(order) {
    let content = `╔════════════════════════════════════════╗\n`;
    content += `║         RAYALASEEMA RUCHULU           ║\n`;
    content += `║      AUTHENTIC FINE DINING            ║\n`;
    content += `╚════════════════════════════════════════╝\n\n`;
    content += `BILL RECEIPT\n`;
    content += `─────────────────────────────────────\n`;
    content += `Order ID: ${order.id}\n`;
    content += `Table: ${order.table}\n`;
    content += `Customer: ${order.customerName}\n`;
    content += `Phone: ${order.customerPhone}\n`;
    content += `Order Type: ${order.orderType.toUpperCase()}\n`;
    content += `Payment: ${order.paymentMode.toUpperCase()}\n`;
    content += `Date: ${new Date().toLocaleDateString()}\n`;
    content += `Time: ${new Date().toLocaleTimeString()}\n\n`;
    content += `ORDER DETAILS\n`;
    content += `─────────────────────────────────────\n`;
    content += `Qty   Item                    Price    Total\n`;
    content += `─────────────────────────────────────\n`;
    
    order.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const itemName = item.name.padEnd(23);
        const price = `₹${item.price}`.padStart(7);
        const total = `₹${itemTotal}`.padStart(8);
        content += `${item.quantity.toString().padStart(3)}   ${itemName} ${price} ${total}\n`;
    });
    
    content += `─────────────────────────────────────\n\n`;
    content += `BILL SUMMARY\n`;
    content += `─────────────────────────────────────\n`;
    content += `Subtotal:                    ₹${order.subtotal.toFixed(2)}\n`;
    content += `GST (5%):                    ₹${order.gst.toFixed(2)}\n`;
    if (order.serviceCharge > 0) {
        content += `Service Charge (10%):        ₹${order.serviceCharge.toFixed(2)}\n`;
    }
    content += `─────────────────────────────────────\n`;
    content += `GRAND TOTAL:                 ₹${order.grandTotal.toFixed(2)}\n\n`;
    content += `─────────────────────────────────────\n`;
    content += `Thank you for dining with us!\n`;
    content += `Visit again for authentic Rayalaseema flavors\n`;
    content += `╔════════════════════════════════════════╗\n`;
    content += `║   RAYALASEEMA RUCHULU - FINE DINING   ║\n`;
    content += `╚════════════════════════════════════════╝`;
    
    return content;
}

function downloadBill(content, filename) {
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

function updateOrderQueue() {
    const orderQueueContainer = document.getElementById('orderQueue');
    
    if (orderQueue.length === 0) {
        orderQueueContainer.innerHTML = '<p class="text-gray-400 text-center">No active orders</p>';
    } else {
        orderQueueContainer.innerHTML = orderQueue.map(order => `
            <div class="order-queue-item ${order.status === 'preparing' ? 'new' : ''}">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h4 class="font-bold text-yellow-400">${order.id}</h4>
                        <p class="text-white">${order.customerName}</p>
                        <p class="text-sm text-gray-300">Table: ${order.table} | ${order.orderType}</p>
                    </div>
                    <span class="order-status status-${order.status}">
                        ${order.status}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-sm text-gray-300">
                        ${order.items.length} items | ₹${order.grandTotal.toFixed(2)}
                    </div>
                    <div class="flex gap-2">
                        ${order.status === 'preparing' ? `
                            <button onclick="updateOrderStatus('${order.id}', 'ready')" class="text-xs bg-green-600 text-white px-3 py-1 rounded">
                                Mark Ready
                            </button>
                        ` : ''}
                        ${order.status === 'ready' ? `
                            <button onclick="updateOrderStatus('${order.id}', 'completed')" class="text-xs bg-yellow-600 text-white px-3 py-1 rounded">
                                Complete
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function updateOrderStatus(orderId, newStatus) {
    const order = orderQueue.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        updateOrderQueue();
        showNotification(`Order ${orderId} marked as ${newStatus}`, 'success');
    }
}

function updateOrderId() {
    document.getElementById('orderId').textContent = `ORD-${String(orderIdCounter++).padStart(3, '0')}`;
}

function updateTableDisplay() {
    const orderType = document.getElementById('orderType').value;
    const tableSelect = document.getElementById('tableNumber');
    
    if (orderType === 'dinein') {
        tableSelect.disabled = false;
        tableSelect.style.opacity = '1';
    } else {
        tableSelect.disabled = true;
        tableSelect.style.opacity = '0.5';
        tableSelect.value = '';
    }
}

// Customer POS Functions
function selectCustomerCategory(category) {
    currentCategory = category;
    
    // Update category button states
    document.querySelectorAll('#customerPOS .royal-btn-secondary').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Display menu items
    displayCustomerMenuItems(category);
}

function displayCustomerMenuItems(category) {
    const menuItemsContainer = document.getElementById('customerMenuItems');
    const items = menuDatabase[category] || [];
    
    menuItemsContainer.innerHTML = items.map(item => `
        <div class="glass-panel p-6 hover:border-yellow-400 transition-all duration-300">
            <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                    <h4 class="font-semibold text-white text-lg">${item.name}</h4>
                    <p class="text-sm text-gray-300 mt-2">${item.description}</p>
                    <p class="text-xs text-yellow-200 mt-2"><strong>Ingredients:</strong> ${item.ingredients}</p>
                    <p class="text-yellow-400 font-bold text-xl mt-3">₹${item.price}</p>
                </div>
            </div>
            <button onclick="addToCustomerCart('${item.name}', ${item.price})" class="royal-btn w-full">
                <i class="fas fa-plus mr-2"></i>Add to Cart
            </button>
        </div>
    `).join('');
}

function addToCustomerCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCustomerCartDisplay();
    showAddToCartAnimation();
}

function updateCustomerCartDisplay() {
    const cartItemsContainer = document.getElementById('customerCartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-400 text-center">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                        <h5 class="font-semibold text-white">${item.name}</h5>
                        <p class="text-yellow-400">₹${item.price}</p>
                    </div>
                    <button onclick="removeFromCustomerCart('${item.name}')" class="text-red-400 hover:text-red-300">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="flex justify-between items-center">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateCustomerQuantity('${item.name}', -1)">-</button>
                        <span class="font-bold text-white px-3">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCustomerQuantity('${item.name}', 1)">+</button>
                    </div>
                    <div class="font-bold text-yellow-400">
                        ₹${item.price * item.quantity}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    calculateCustomerTotals();
}

function updateCustomerQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== name);
        }
        updateCustomerCartDisplay();
    }
}

function removeFromCustomerCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCustomerCartDisplay();
}

function calculateCustomerTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.05;
    const orderType = document.getElementById('custOrderType').value;
    const deliveryCharge = orderType === 'delivery' ? 50 : 0;
    const total = subtotal + gst + deliveryCharge;
    
    document.getElementById('custSubtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('custGST').textContent = `₹${gst.toFixed(2)}`;
    document.getElementById('custTotal').textContent = `₹${total.toFixed(2)}`;
    
    // Show/hide delivery charge
    const deliveryElement = document.getElementById('custDeliveryCharge');
    if (deliveryCharge > 0) {
        deliveryElement.style.display = 'flex';
    } else {
        deliveryElement.style.display = 'none';
    }
}

function clearCustomerCart() {
    cart = [];
    updateCustomerCartDisplay();
}

function toggleAddressField() {
    const orderType = document.getElementById('custOrderType').value;
    const addressField = document.getElementById('addressField');
    
    if (orderType === 'delivery') {
        addressField.style.display = 'block';
    } else {
        addressField.style.display = 'none';
    }
    
    calculateCustomerTotals();
}

function placeCustomerOrder() {
    const customerName = document.getElementById('custName').value;
    const customerPhone = document.getElementById('custPhone').value;
    const customerAddress = document.getElementById('custAddress').value;
    const orderType = document.getElementById('custOrderType').value;
    const paymentMode = document.getElementById('custPaymentMode').value;
    const specialInstructions = document.getElementById('custInstructions').value;
    
    if (!customerName || !customerPhone) {
        showNotification('Please fill in customer name and phone number', 'error');
        return;
    }
    
    if (orderType === 'delivery' && !customerAddress) {
        showNotification('Please provide delivery address', 'error');
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Please add items to your cart', 'error');
        return;
    }
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.05;
    const deliveryCharge = orderType === 'delivery' ? 50 : 0;
    const total = subtotal + gst + deliveryCharge;
    
    // Generate order ID
    const orderId = document.getElementById('onlineOrderNumber').textContent;
    
    // Create order object
    const order = {
        id: orderId,
        table: orderType === 'delivery' ? 'Delivery' : 'Pickup',
        customerName: customerName,
        customerPhone: customerPhone,
        customerAddress: customerAddress || '-',
        orderType: orderType,
        paymentMode: paymentMode,
        specialInstructions: specialInstructions,
        items: [...cart],
        subtotal: subtotal,
        gst: gst,
        deliveryCharge: deliveryCharge,
        grandTotal: total,
        status: 'preparing',
        timestamp: new Date().toISOString(),
        isCustomerOrder: true
    };
    
    // Add to staff POS order queue (real-time sync)
    orderQueue.unshift(order);
    
    // Generate bill content
    const billContent = generateCustomerBillContent(order);
    
    // Send to printer directly
    printBillDirectly(billContent);
    
    // Show success message
    showSuccessModal(`Order placed successfully! Order ID: ${orderId}. Bill sent to printer!`);
    
    // Clear cart and form
    clearCustomerCart();
    updateOnlineOrderNumber();
    
    // Clear form fields
    document.getElementById('custName').value = '';
    document.getElementById('custPhone').value = '';
    document.getElementById('custAddress').value = '';
    document.getElementById('custInstructions').value = '';
    
    // If in staff mode, refresh the order queue
    if (currentMode === 'staff') {
        updateOrderQueue();
    }
}

function generateCustomerBillContent(order) {
    let content = `╔════════════════════════════════════════╗\n`;
    content += `║         RAYALASEEMA RUCHULU           ║\n`;
    content += `║      ONLINE ORDER RECEIPT            ║\n`;
    content += `╚════════════════════════════════════════╝\n\n`;
    content += `ORDER DETAILS\n`;
    content += `─────────────────────────────────────\n`;
    content += `Order ID: ${order.id}\n`;
    content += `Customer: ${order.customerName}\n`;
    content += `Phone: ${order.customerPhone}\n`;
    if (order.customerAddress !== '-') {
        content += `Address: ${order.customerAddress}\n`;
    }
    content += `Order Type: ${order.orderType.toUpperCase()}\n`;
    content += `Payment: ${order.paymentMode.toUpperCase()}\n`;
    content += `Date: ${new Date().toLocaleDateString()}\n`;
    content += `Time: ${new Date().toLocaleTimeString()}\n\n`;
    content += `ORDER ITEMS\n`;
    content += `─────────────────────────────────────\n`;
    content += `Qty   Item                    Price    Total\n`;
    content += `─────────────────────────────────────\n`;
    
    order.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const itemName = item.name.padEnd(23);
        const price = `₹${item.price}`.padStart(7);
        const total = `₹${itemTotal}`.padStart(8);
        content += `${item.quantity.toString().padStart(3)}   ${itemName} ${price} ${total}\n`;
    });
    
    content += `─────────────────────────────────────\n\n`;
    content += `BILL SUMMARY\n`;
    content += `─────────────────────────────────────\n`;
    content += `Subtotal:                    ₹${order.subtotal.toFixed(2)}\n`;
    content += `GST (5%):                    ₹${order.gst.toFixed(2)}\n`;
    if (order.deliveryCharge > 0) {
        content += `Delivery Charge:             ₹${order.deliveryCharge.toFixed(2)}\n`;
    }
    content += `─────────────────────────────────────\n`;
    content += `TOTAL AMOUNT:                ₹${order.grandTotal.toFixed(2)}\n\n`;
    
    if (order.specialInstructions) {
        content += `SPECIAL INSTRUCTIONS\n`;
        content += `─────────────────────────────────────\n`;
        content += `${order.specialInstructions}\n\n`;
    }
    
    content += `─────────────────────────────────────\n`;
    content += `Estimated ${order.orderType} time: 30-45 minutes\n`;
    content += `Thank you for ordering from Rayalaseema Ruchulu!\n`;
    content += `╔════════════════════════════════════════╗\n`;
    content += `║   RAYALASEEMA RUCHULU - ONLINE ORDER  ║\n`;
    content += `╚════════════════════════════════════════╝`;
    
    return content;
}

// UI Helper Functions
function showAddToCartAnimation() {
    // Visual feedback for adding to cart
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cartIcon) {
        cartIcon.classList.add('success-animation');
        setTimeout(() => {
            cartIcon.classList.remove('success-animation');
        }, 600);
    }
}

function showSuccessModal(message) {
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successModal').classList.remove('hidden');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.add('hidden');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-8 glass-panel p-4 z-50 slide-in-right ${
        type === 'error' ? 'border-red-400' : 'border-green-400'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle text-red-400' : 'fa-check-circle text-green-400'} mr-3"></i>
            <span class="text-white">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Keyboard shortcuts for staff POS
document.addEventListener('keydown', function(e) {
    if (currentMode === 'staff') {
        // Ctrl+G to generate bill
        if (e.ctrlKey && e.key === 'g') {
            e.preventDefault();
            generateBill();
        }
        // Ctrl+C to clear cart
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            clearCart();
        }
        // Number keys for categories
        if (e.key >= '1' && e.key <= '6') {
            const categories = ['starters', 'breads', 'biryani', 'specials', 'desserts', 'drinks'];
            const categoryIndex = parseInt(e.key) - 1;
            if (categories[categoryIndex]) {
                selectCategory(categories[categoryIndex]);
            }
        }
    }
});
