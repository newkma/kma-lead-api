
(function() {
    const referer = document.referrer;
    let forms = document.getElementsByTagName("form");
    for (let i = 0; i < forms.length; i++) {
        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "referer";
        input.value = referer;
        forms[i].appendChild(input);
    }
}());

(function() {
    const xhr = new XMLHttpRequest();
    // TODO: добавить маппинг utm меток в data1-data5
    let query = "data1=test";
    xhr.open("GET", "/api/success.php?" + query, true);
    xhr.setRequestHeader('X-Kma-Api', 'click');
    xhr.setRequestHeader('X-Referer', document.referrer);
    xhr.send();
    xhr.onload = function() {
        let array;
        try { array = JSON.parse(this.response); } catch (e) { return; }
        if (array.click === 'undefined') return;
        let forms = document.getElementsByTagName("form");
        for (let i = 0; i < forms.length; i++) {
            let input = document.createElement("input");
            input.type = "hidden";
            input.name = "click";
            input.value = array.click;
            forms[i].appendChild(input);
        }
    };
}());
