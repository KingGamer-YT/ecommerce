
// Initialize an empty array to keep track of the products in stock
let stockArray = [];

// Select all elements with the class "mobile-only" which are used for mobile navigation buttons
let mobileOnly = document.querySelectorAll(".mobile-only"), // This gets a NodeList of all elements with the class "mobile-only"
  nav = document.querySelector("header .logo-nav nav"), // This selects the navigation element within the header
  navLayer = document.querySelector(".black-layer"); // This selects the overlay layer that covers the page when navigation is open

// Loop through each element selected by the ".mobile-only" selector
mobileOnly.forEach((e) => {
  // Add an event listener to each element for the 'click' event
  e.addEventListener("click", (x) => {
    // Check if the clicked element or its parent has the class "nav-btn-open"
    if (
      x.target.parentElement.classList.contains("nav-btn-open") ||
      x.target.classList.contains("nav-btn-open")
    ) {
      // If true, add the class "layer-active" to the overlay layer to show it
      navLayer.classList.add("layer-active");
      // Also, add the class "active" to the navigation element to make it visible
      nav.classList.add("active");
    }
    // Check if the clicked element or its parent has the class "nav-btn-close"
    if (
      x.target.parentElement.classList.contains("nav-btn-close") ||
      x.target.classList.contains("nav-btn-close")
    ) {
      // If true, remove the class "layer-active" to hide the overlay layer
      navLayer.classList.remove("layer-active");
      // Also, remove the class "active" to hide the navigation element
      nav.classList.remove("active");
    }
  });
});

// Add an event listener to the overlay layer for the 'click' event
navLayer.addEventListener("click", (e) => {
  // If the clicked element contains the class "layer-active" (indicating it's the overlay)
  if (e.target.classList.contains("layer-active")) {
    // Remove the class "layer-active" to hide the overlay layer
    e.target.classList.remove("layer-active");
    // Remove the class "active" to hide the navigation menu
    nav.classList.remove("active");
    // If the fullscreen slider preview is open (has class "sliderActive"), close it
    if (sliderPreview.classList.contains("sliderActive")) {
      sliderPreview.classList.remove("sliderActive");
    }
  }
});

// Initialize variables for the mobile slider functionality
let mobileSlider = document.querySelector(".mobile-silder"), // Selects the mobile slider element
  mobileSliderLength =
    document.querySelectorAll(".preview-img .img-box").length - 1, // Gets the total number of images minus one to use as index
  previewImgMobile = mobileSlider.querySelector(".preview-img"), // Selects the container for preview images within the mobile slider
  translateNumber = 0; // Initializes the variable for tracking how much to translate the slider

// Add an event listener to the mobile slider for the 'click' event
mobileSlider.addEventListener("click", (e) => {
  // If the clicked element has the class "next-btn" or is inside an element with that class
  if (
    e.target.classList.contains("next-btn") ||
    e.target.parentElement.classList.contains("next-btn")
  ) {
    // Check if there are more images to display (slider not at the end)
    if (mobileSliderLength > 0) {
      mobileSliderLength--; // Decrease the index of the last image
      translateNumber += 100; // Increase the translate amount to move the slider to the right
      previewImgMobile.style.transform = `translateX(-${translateNumber}%)`; // Apply the transformation to show the next image
    }
  }
  // If the clicked element has the class "previous-btn" or is inside an element with that class
  if (
    e.target.classList.contains("previous-btn") ||
    e.target.parentElement.classList.contains("previous-btn")
  ) {
    // Check if the slider is not at the first image
    if (
      mobileSliderLength <
      document.querySelectorAll(".preview-img .img-box").length - 1
    ) {
      mobileSliderLength++; // Increase the index of the last image
      translateNumber -= 100; // Decrease the translate amount to move the slider to the left
      previewImgMobile.style.transform = `translateX(-${translateNumber}%)`; // Apply the transformation to show the previous image
    }
  }
});

// Initialize variables for the desktop image slider
let previewImgDesk = document.querySelector(".slider-area .preview-img"), // Selects the container for the preview image in the desktop slider
  sliderImagesDesk = document.querySelectorAll(
    ".slider-area .images-container .img-box:not(.slected-image)"
  ), // Selects all image boxes in the slider that are not currently selected
  sliderImagesDeskAll = document.querySelectorAll(
    ".slider-area .images-container .img-box"
  ), // Selects all image boxes in the desktop slider
  imagesContainer = document.querySelector(".slider-area .images-container"); // Selects the container for the images

// Add an event listener to the images container for the 'click' event
imagesContainer.addEventListener("click", (x) => {
  // If the clicked element is an image box and is not currently selected
  if (
    x.target.parentElement.classList.contains("slected-image") == false &&
    x.target.parentElement.classList.contains("img-box")
  ) {
    // Update the source of the preview image to the clicked image's source
    previewImgDesk.querySelector("img").src = x.target.dataset.src;
    // Remove the "slected-image" class from all image boxes
    sliderImagesDeskAll.forEach((z) => z.classList.remove("slected-image"));
    // Add the "slected-image" class to the clicked image box
    x.target.parentElement.classList.add("slected-image");
  }
});

// Initialize variables for the fullscreen desktop slider preview
let imagePreview = document.querySelector(
    "section .slider-area .preview-img img"
  ), // Selects the image in the preview area of the desktop slider
  sliderPreview = document.querySelector(".slider-preview"); // Selects the element for the fullscreen slider preview

// Add an event listener to the image preview for opening the fullscreen slider preview
imagePreview.addEventListener("click", (_) => {
  sliderPreview.classList.add("sliderActive"); // Show the fullscreen slider preview
  navLayer.classList.add("layer-active"); // Show the overlay layer
  // Add an event listener to the fullscreen slider preview for image selection
  sliderPreview.addEventListener("click", (x) => {
    // If the clicked element is an image box and is not currently selected
    if (
      x.target.parentElement.classList.contains("slected-image") == false &&
      x.target.parentElement.classList.contains("img-box")
    ) {
      // Update the fullscreen image preview source to the clicked image's source
      fullScreenImagePreview.src = x.target.dataset.src;
      // Remove the "slected-image" class from all images
      sliderImagesDeskFullScreenAll.forEach((z) =>
        z.classList.remove("slected-image")
      );
      // Add the "slected-image" class to the clicked image
      x.target.parentElement.classList.add("slected-image");
    }
  });
});

// Initialize variable for the close button of the fullscreen slider preview
let sliderClose = document.querySelector(".slider-preview .slider-close");

// Add an event listener to the close button for hiding the fullscreen slider preview
sliderClose.addEventListener("click", (_) => {
  sliderPreview.classList.remove("sliderActive"); // Hide the fullscreen slider preview
  navLayer.classList.remove("layer-active"); // Hide the overlay layer
});

// Initialize variables for navigating images in the fullscreen slider
let sliderImagesDeskFullScreen = document.querySelectorAll(
    ".slider-preview .images-container .img-box:not(.slected-image)"
  ), // Selects all fullscreen image boxes that are not currently selected
  sliderImagesDeskFullScreenAll = document.querySelectorAll(
    ".slider-preview .images-container .img-box"
  ), // Selects all fullscreen image boxes
  fullScreenImagePreview = document.querySelector(
    ".slider-preview .preview-img .preview-img-Element"
  ); // Selects the element showing the fullscreen image preview

// Create an array to store image URLs for navigating through the fullscreen slider
let imagesArray = [],
  currentIndex = 0; // Initialize the index of the current image

// Populate the imagesArray with image URLs from all fullscreen images
for (let i = 0; i < sliderImagesDeskFullScreenAll.length; i++) {
  imagesArray.push(
    sliderImagesDeskFullScreenAll[i].querySelector("img").dataset.src
  );
}

// Add an event listener to the fullscreen slider preview for navigating images
sliderPreview.addEventListener("click", (e) => {
  // If the clicked element has the class "next-btn" or is inside an element with that class
  if (
    e.target.classList.contains("next-btn") ||
    e.target.parentElement.classList.contains("next-btn")
  ) {
    // If not at the last image
    if (currentIndex < sliderImagesDeskFullScreenAll.length - 1) {
      currentIndex++; // Move to the next image
      fullScreenImagePreview.src = imagesArray[currentIndex]; // Update the fullscreen preview to the new image
      // Remove the "slected-image" class from all images
      sliderImagesDeskFullScreenAll.forEach((e) =>
        e.classList.remove("slected-image")
      );
      // Add the "slected-image" class to the new image
      sliderImagesDeskFullScreenAll[currentIndex].classList.add(
        "slected-image"
      );
    }
  }
  // If the clicked element has the class "previous-btn" or is inside an element with that class
  if (
    e.target.classList.contains("previous-btn") ||
    e.target.parentElement.classList.contains("previous-btn")
  ) {
    // If not at the first image
    if (currentIndex > 0) {
      currentIndex--; // Move to the previous image
      fullScreenImagePreview.src = imagesArray[currentIndex]; // Update the fullscreen preview to the new image
      // Remove the "slected-image" class from all images
      sliderImagesDeskFullScreenAll.forEach((e) =>
        e.classList.remove("slected-image")
      );
      // Add the "slected-image" class to the new image
      sliderImagesDeskFullScreenAll[currentIndex].classList.add(
        "slected-image"
      );
    }
  }
})
// Add and remove items from the stock and shopping cart
let stockArea = document.querySelector(".stock-and-add-cart"); // Selects the section containing stock controls and the add-to-cart button

// Add an event listener to the stock area for 'click' events
stockArea.addEventListener("click", (e) => {
  // If the clicked element has the class "minus-btn"
  if (e.target.classList.contains("minus-btn")) {
    // Check if the stock length is greater than 0 before decrementing
    if (stockArea.querySelector(".stock-length").innerHTML > 0) {
      // Decrement the stock length
      stockArea.querySelector(".stock-length").innerHTML--;
    }
  }
  // If the clicked element has the class "plus-btn"
  if (e.target.classList.contains("plus-btn")) {
    // Increment the stock length
    stockArea.querySelector(".stock-length").innerHTML++;
  }
  // If the clicked element has the class "add-cart"
  if (e.target.classList.contains("add-cart")) {
    // Check if the stock length is greater than 0 before adding to cart
    if (+stockArea.querySelector(".stock-length").innerHTML > 0) {
      // Call the function to add the item to the cart
      addToCart();
      // Update the cart display after adding the item
      updateCartWhileAdding();
      // Reset the stock length to 0
      stockArea.querySelector(".stock-length").innerHTML = "0";
      // Remove the product from stock (if applicable)
      removeProduct();
      // Show the checkout button if needed
      showCheckOutBtn();
    }
  }
});

// Get product information from the page
let productName = document.querySelector(
    ".element-info .product-title"
  ).innerHTML, // Selects and retrieves the product title
  productPrice = document.querySelector(
    ".element-info .product-price .price"
  ).innerHTML, // Selects and retrieves the product price
  productImg = document.querySelector("section .slider-area .preview-img img"); // Selects and retrieves the product image

// Function to add the current product to the cart
function addToCart() {
  // Generate a unique ID for the product using the current timestamp
  let id = Date.now();
  // Add the product details to the stockArray
  stockArray.push({
    productImg: productImg.dataset.src, // Image source
    name: productName, // Product name
    price: productPrice, // Product price
    stockSize: stockArea.querySelector(".stock-length").innerHTML, // Quantity of the product
    productId: id, // Unique product ID
  });
  // Save the updated stockArray to localStorage
  window.localStorage.stock = JSON.stringify(stockArray);
}

// Function to retrieve items from localStorage and update stockArray
function getItemsFromLocalStorage() {
  // Parse the JSON string from localStorage and assign it to stockArray
  stockArray = JSON.parse(window.localStorage.stock);
}

// Select elements related to the cart and profile box
let cartAndProfileBox = document.querySelector(".cart-profile"), // Selects the cart and profile box
  cartPreview = document.querySelector(".cart-profile .cart-preview"); // Selects the cart preview area

// Add an event listener to the cart and profile box for 'click' events
cartAndProfileBox.addEventListener("click", (e) => {
  // If the clicked element has the class "cart-icon"
  if (e.target.classList.contains("cart-icon")) {
    // Toggle the visibility of the cart preview
    cartPreview.classList.toggle("cart-active");
  }
});

// Function to display products in the cart from stockArray
function showCartProduct() {
  // Selects the container for cart products
  let cartPreview = document.querySelector(
    ".cart-profile .cart-preview .product-box"
  );
  // Loop through each product in the stockArray and create HTML for each
  for (let i = 0; i < stockArray.length; i++) {
    let productArea = `
      <div class="product-area" data-id="${stockArray[i].productId}">
        <div class="img">
          <img src="${stockArray[i].productImg}" alt="">
        </div>  
        <div class="product-info">
          <p class="product-title">${stockArray[i].name}</p>
          <div class="price-area">
            <span class="price">$${
              stockArray[i].price
            }</span> &#10005; <span class="Stock-Size">${
      stockArray[i].stockSize
    }</span> <span class="final-price">$${(
      stockArray[i].price * stockArray[i].stockSize
    ).toFixed(2)}</span>
          </div>
        </div>  
        <div class="remove-product-btn">
          <img src="./images/icon-delete.svg" alt="">
        </div>
      </div>
      `;
    // Append the HTML for each product to the cart preview
    cartPreview.innerHTML += productArea;
  }
}

// Call the function to display cart products initially
showCartProduct();

// Function to update the cart display after adding a new product
function updateCartWhileAdding() {
  // Select all product boxes in the cart preview
  let productBox = document.querySelectorAll(
    ".cart-preview .product-box .product-area"
  );
  // Remove all product boxes from the cart preview
  productBox.forEach((e) => e.remove());
  // Call showCartProduct to refresh the cart display
  showCartProduct();
}

// Function to remove a product from the cart
function removeProduct() {
  // Select all remove buttons in the cart
  let removeBtn = document.querySelectorAll(".remove-product-btn");

  // Add an event listener to each remove button for 'click' events
  removeBtn.forEach((z) => {
    z.addEventListener("click", (e) => {
      // If the clicked element has the class "remove-product-btn"
      if (e.target.classList.contains("remove-product-btn")) {
        // Remove the product from the stockArray based on productId
        stockArray = stockArray.filter(
          (x) => x.productId != +e.target.parentElement.dataset.id
        );
        // Update the localStorage with the modified stockArray
        window.localStorage.stock = JSON.stringify(stockArray);
        // Remove the product from the cart preview
        e.target.parentElement.remove();
        // Update the visibility of the checkout button
        showCheckOutBtn();
      }
    });
  });
}

// Call the function to ensure remove functionality is set up
removeProduct();

// Function to show or hide the checkout button based on cart contents
function showCheckOutBtn() {
  // Select the product box container and checkout button
  let productBox = document.querySelector(".product-box"),
    checkoutBtn = document.querySelector(".checkout-btn"),
    cartLength = document.querySelector(".cart-profile .cart .cart-length");
  // If there are no products in the cart
  if (productBox.children.length === 0) {
    // Hide the checkout button
    checkoutBtn.style.display = "none";
    // Create and display a message indicating the cart is empty
    let cartEmpty = document.createElement("span");
    cartEmpty.innerHTML = "Your cart is empty.";
    cartEmpty.classList.add("cart-empty");
    cartEmpty.classList.add("cart-empty-active");
    cartPreview.appendChild(cartEmpty);
    // Hide the cart length indicator
    cartLength.style.display = "none";
  } else {
    // Show the cart length indicator and update the number of items
    cartLength.style.display = "block";
    cartLength.innerHTML = stockArray.length;
    // Remove the empty cart message if it exists
    let cartEmpty = document.querySelector(".cart-empty");
    if (cartEmpty) {
      cartEmpty.remove();
    }
    // Show the checkout button
    checkoutBtn.style.display = "block";
  }
}

// Call the function to update the visibility of the checkout button initially
showCheckOutBtn();
