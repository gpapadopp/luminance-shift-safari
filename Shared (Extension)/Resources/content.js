function displayOverlay(){
    const readingOverlay = document.createElement("div")
    readingOverlay.id = "lss_reading_mode_overlay"
    readingOverlay.style = "position: fixed; width: 100%; height: 100%; top: 0; left: 0; right:0; bottom: 0; background-color: rgba(255, 210, 124, 0.21); z-index: 2147483647;"
    document.body.appendChild(readingOverlay)
}

function destroyOverlay(){
    const readingOverlay = document.getElementById("lss_reading_mode_overlay")
    readingOverlay.remove();
}

function checkToggle(){
    const readingOverlay = document.getElementById("lss_reading_mode_overlay")
    if (readingOverlay === null){
        return false;
    }
    return true;
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "displayOverlay"){
        displayOverlay();
        sendResponse({status: "success"})
    } else if (request.action === "hideOverlay"){
        destroyOverlay();
        sendResponse({status: "success"})
    } else if (request.action === "checkToggle"){
        const hasOverlay = checkToggle();
        sendResponse({
            status: "success",
            has_overlay: hasOverlay
        })
    }
});
