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

function checkSwitchChecked(){
    const toggleElement = document.getElementById("lss_reading_mode_toggle_switch");
    getActiveTab().then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id,
                {
                    action: "checkToggle"
                }).then((response) => {
                    if (response.has_overlay){
                        toggleElement.checked = true;
                    } else {
                        toggleElement.checked = false;
                    }
                console.log(response)
            });
        });
}

document.addEventListener("DOMContentLoaded", function() {
  readTranslations();
  checkSwitchChecked()
});

function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
}

function onSwitchToggle(){
    const toggleElement = document.getElementById("lss_reading_mode_toggle_switch");
    getActiveTab().then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id,
                {
                    action: (toggleElement.checked) ? "displayOverlay": "hideOverlay"
                }
            );
        });
}
document.getElementById("lss_reading_mode_toggle_switch").addEventListener("click", onSwitchToggle);

