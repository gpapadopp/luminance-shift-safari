// popup.js

function updatePopupContent() {
  browser.extension.getLocalizedUserMessage("extension_name", function(message) {
      console.log(message)
//    document.getElementById("welcomeMessage").textContent = message;
  });
}

document.addEventListener("DOMContentLoaded", function() {
  updatePopupContent();
});

