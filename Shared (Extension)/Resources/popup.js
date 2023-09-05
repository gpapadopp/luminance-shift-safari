// popup.js
function readTranslations(){
    const userLanguage = navigator.language;
    const filePath = "_locales/" + userLanguage + "/messages.json"
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          console.log("Error !")
        }
        return response.json();
      })
      .then((jsonData) => {
          translateContent(jsonData)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
}

function translateContent(translations){
    document.getElementById("lss_title").innerText = translations['extension_name']['message']
    document.getElementById("lss_subtitle").innerText = translations['subtitle_text']['message']
    document.getElementById("lss_reading_mode_active_title").innerText = translations['activate_reading_mode']['message']
}

document.addEventListener("DOMContentLoaded", function() {
  readTranslations();
});

