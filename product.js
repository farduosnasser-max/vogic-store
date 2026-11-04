// قراءة معلومات المنتج من الرابط

const params = new URLSearchParams(window.location.search);

const productName = params.get("name") || "تصميم VOGIC";
const productDescription = params.get("description") || "";
const productImage = params.get("image") || "";
const productPrice = Number(params.get("price")) || 50;

document.getElementById("product-name").textContent = productName;
document.getElementById("product-description").textContent = productDescription;
document.getElementById("product-image").src = productImage;

document.getElementById("product-price").textContent =
    "السعر: " + productPrice + " ر.ق";


// اختيار التاريخ

const dateOption = document.getElementById("date-option");
const eventDate = document.getElementById("event-date");

dateOption.addEventListener("change", function() {

    if (dateOption.value === "with-date") {
        eventDate.style.display = "block";
        eventDate.required = true;
    } else {
        eventDate.style.display = "none";
        eventDate.required = false;
        eventDate.value = "";
    }

});


// اختيار لون مخصص

const designColor = document.getElementById("design-color");
const customColor = document.getElementById("custom-color");

designColor.addEventListener("change", function() {

    if (designColor.value === "other") {
        customColor.style.display = "block";
        customColor.required = true;
    } else {
        customColor.style.display = "none";
        customColor.required = false;
        customColor.value = "";
    }

});


// إضافة المنتج إلى السلة

const customizationForm = document.getElementById("customization-form");

customizationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const customerName = document.getElementById("customer-name").value.trim();

    const selectedColor = designColor.value === "other"
        ? customColor.value.trim()
        : designColor.value;

    const uploadedFile = document.getElementById("design-file").files[0];

    const order = {
        name: productName,
        price: productPrice,
        image: productImage,
        customerName: customerName,
        date: dateOption.value === "with-date"
            ? eventDate.value
            : "بدون تاريخ",
        color: selectedColor,
        text: document.getElementById("design-text").value,
        fileName: uploadedFile ? uploadedFile.name : "لا يوجد ملف"
    };

    let cart = JSON.parse(localStorage.getItem("vogicCart")) || [];

    cart.push(order);

    localStorage.setItem("vogicCart", JSON.stringify(cart));

    alert("تمت إضافة تصميمك إلى السلة بنجاح 🤎");

    window.location.assign("cart.html");

});
