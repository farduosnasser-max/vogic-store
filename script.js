console.log("VOGIC is working!");

const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productCard = button.parentElement;

        const productName = productCard.querySelector("h3").textContent;

        const productDescription = productCard.querySelector("p").textContent;

        const productImage = productCard.querySelector("img").getAttribute("src");

        const productPrice = 50;

        const productURL = "product.html?name=" +
            encodeURIComponent(productName) +
            "&description=" + encodeURIComponent(productDescription) +
            "&image=" + encodeURIComponent(productImage) +
            "&price=" + productPrice;

        window.location.href = productURL;

    });

});
const customizationForm = document.getElementById("customization-form");

if (customizationForm) {

    customizationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const order = {
            product: document.getElementById("product-name").textContent,
            name: document.getElementById("customer-name").value,
            date: document.getElementById("event-date").value,
            color: designColor.value === "other"
    ? customColor.value
    : designColor.value,
            text: document.getElementById("design-text").value
        };

        localStorage.setItem("vogicOrder", JSON.stringify(order));

        alert("تم حفظ تفاصيل طلبك بنجاح 🤎");

    });

}
const dateOption = document.getElementById("date-option");
const eventDate = document.getElementById("event-date");

if (dateOption) {

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

}
const designColor = document.getElementById("design-color");
const customColor = document.getElementById("custom-color");

if (designColor) {

    designColor.addEventListener("change", function() {

        if (designColor.value === "other") {
            customColor.style.display = "block";
        } else {
            customColor.style.display = "none";
            customColor.value = "";
        }

    });

}

