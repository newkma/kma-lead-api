
(function(referer) {
    if (referer == '') return;

    let forms = document.getElementsByTagName("form");
    for (let i = 0; i < forms.length; i++) {
        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "referer";
        input.value = referer;
        forms[i].appendChild(input);
    }
}(document.referrer));

(function(channel) {
    if (channel == '') return;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://kshop5.pro/" + channel);
    xhr.setRequestHeader('X-Kma-Api', 'click');
    xhr.send();
    xhr.onload = function() {
        let click = this.responseText;
        if (!Number.isInteger(+click)) return;

        let forms = document.getElementsByTagName("form");
        for (let i = 0; i < forms.length; i++) {
            let input = document.createElement("input");
            input.type = "hidden";
            input.name = "click";
            input.value = click;
            forms[i].appendChild(input);
        }
    };
}('9yJqn3'));
