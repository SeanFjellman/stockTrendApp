document.addEventListener("DOMContentLoaded", function() {
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        data.data.forEach(imageInfo => {
          // Find elements that match the stockID
          const elements = document.querySelectorAll(`[data-stock-id="${imageInfo.stockID}"]`);
          elements.forEach(element => {
            // Apply styles from JSON
            element.style.backgroundImage = `url('${imageInfo.url}')`;
            element.style.backgroundPosition = "center";
            element.style.backgroundRepeat = "no-repeat";
  
            // Apply specific zoom for Nvidia
            if (imageInfo.stockID === "Nvidia") {
              element.style.backgroundSize = "150%";
            } else {
              // Optional: Set a default background size for other elements if needed
              element.style.backgroundSize = "contain"; // Or any other default value you prefer
            }
          });
        });
      })
      .catch(error => console.error('Error loading the JSON data:', error));
  });
  