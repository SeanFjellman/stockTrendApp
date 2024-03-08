document.addEventListener("DOMContentLoaded", function() {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      data.data.forEach(imageInfo => {
        // Find elements that match the stockID for setting the background
        const elements = document.querySelectorAll(`[data-stock-id="${imageInfo.stockID}"]`);
        elements.forEach(element => {
          // Apply styles from JSON for the background image
          element.style.backgroundImage = `url('${imageInfo.url}')`;
          element.style.backgroundPosition = imageInfo.backgroundPosition || "center";
          element.style.backgroundRepeat = imageInfo.backgroundRepeat || "no-repeat";
          // Apply specific style attributes if they exist in the JSON
          if (imageInfo.backgroundSize) {
            element.style.backgroundSize = imageInfo.backgroundSize;
          } else {
            // Optional: Set a default background size for other elements if needed
            element.style.backgroundSize = "contain"; // Or any other default value you prefer
          }

          // Update description
          // Assuming the structure of your HTML, the description element is a sibling of the background image container
          // Find the parent container of the current stock element
          const parent = element.closest('.text-center');
          // Within the parent container, find the element where the description should be inserted
          const descriptionElement = parent.querySelector('.lead');
          if (descriptionElement && imageInfo.description) { // Ensure this matches your JSON property name
            descriptionElement.textContent = imageInfo.description; // This must match the JSON property name exactly
          }
          
        });
      });
    })
    .catch(error => console.error('Error loading the JSON data:', error));
});
