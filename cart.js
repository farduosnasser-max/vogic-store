function displayCart() {

    const cart = JSON.parse(localStorage.getItem("vogicCart")) || [];

    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-btn");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">سلتك فارغة حالياً 🤎</p>';
        totalElement.textContent = "0";
        checkoutButton.disabled = true;
        return;
    }

    checkoutButton.disabled = false;

    cart.forEach(function(item, index) {

        total += Number(item.price);

        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        itemDiv.innerHTML =
            '<img src="' + item.image + '" alt="صورة المنتج">' +
            '<div class="cart-info">' +
            '<h3>' + item.name + '</h3>' +
            '<p>السعر: ' + item.price + ' ر.ق</p>' +
            '<p>الاسم: ' + item.customerName + '</p>' +
            '<p>التاريخ: ' + item.date + '</p>' +
            '<p>اللون: ' + item.color + '</p>' +
            '<p>العبارة: ' + (item.text || "لم تحدد") + '</p>' +
            '<p>الملف: ' + item.fileName + '</p>' +
            '</div>' +
            '<button class="remove-btn" data-index="' + index + '">حذف</button>';

        cartItems.appendChild(itemDiv);

    });

    totalElement.textContent = total;

    document.querySelectorAll(".remove-btn").forEach(function(button) {

        button.addEventListener("click", function() {

            const index = Number(button.dataset.index);

            cart.splice(index, 1);

            localStorage.setItem("vogicCart", JSON.stringify(cart));

            displayCart();

        });

    });

}

// إعداد رقم الجوال الدولي

const phoneInput = document.getElementById("customer-phone");

const iti = window.intlTelInput(phoneInput, {
    initialCountry: "qa",
    separateDialCode: true,
    nationalMode: false,
    countrySearch: true,
    loadUtils: () =>
        import("https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.8/dist/js/utils.js")
});


// إرسال الطلب عبر واتساب

document.getElementById("checkout-btn").addEventListener("click", async function() {

    const cart = JSON.parse(localStorage.getItem("vogicCart")) || [];

    const customerName = document.getElementById("customer-fullname").value.trim();

    if (cart.length === 0) {
        alert("السلة فارغة!");
        return;
    }

    if (!customerName || !phoneInput.value.trim()) {
        alert("فضلاً أدخلي الاسم ورقم الجوال.");
        return;
    }

    await iti.promise;

    if (!iti.isValidNumber()) {
        alert("رقم الجوال غير صحيح، تأكدي من الدولة والرقم.");
        return;
    }

    const customerPhone = iti.getNumber();

    let message = "مرحباً VOGIC Studio 🤎\n\nأرغب في طلب التصاميم التالية:\n\n";

    cart.forEach(function(item, index) {
        message += "التصميم " + (index + 1) + ": " + item.name + "\n";
        message += "الاسم: " + item.customerName + "\n";
        message += "التاريخ: " + item.date + "\n";
        message += "اللون: " + item.color + "\n";
        message += "العبارة: " + (item.text || "لم أحدد") + "\n";
        message += "الملف: " + item.fileName + "\n";
        message += "السعر المبدئي: " + item.price + " ر.ق\n\n";
    });

    const total = cart.reduce(function(sum, item) {
        return sum + Number(item.price);
    }, 0);

    message += "اسم العميلة: " + customerName + "\n";
    message += "رقم الجوال: " + customerPhone + "\n";
    message += "الإجمالي المبدئي: " + total + " ر.ق\n";
    message += "أرجو تأكيد السعر النهائي وموعد التسليم.";

    const vogicNumber = "97430259640";

    const whatsappURL =
        "https://wa.me/" + vogicNumber +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

});

displayCart();
