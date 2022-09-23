let leadsArray = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leadsArray"));

if (leadsFromLocalStorage) {
    leadsArray = leadsFromLocalStorage;
    renderLeads(leadsArray);
}


function renderLeads(leads) {
    let leadsItem = "";
    for(let i = 0; i < leads.length; i++) {
        leadsItem += `
            <li>
                <a target="_blank" href="${leads[i]}">${leads[i]}</a>
            </li>`;
    }
    ulEl.innerHTML = leadsItem;
}


inputBtn.addEventListener("click", function() {
    leadsArray.push(inputEl.value);
    localStorage.setItem("leadsArray", JSON.stringify(leadsArray));
    inputEl.value = "";
    renderLeads(leadsArray);
})



tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        let currentTab = tabs[0].url;
        leadsArray.push(currentTab);
        renderLeads(leadsArray);
        localStorage.setItem("leadsArray", JSON.stringify(leadsArray));
    });
    
})



deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    leadsArray = [];
    renderLeads(leadsArray);
})




