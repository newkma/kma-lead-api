
(function () {

    function appendInputToForm(form, name, value) {
        let children = form.children;
        if (typeof value === "object") value = JSON.stringify(value);
        for (let item = 0; item < children.length; item++) {
            if (children[item].getAttribute("name") === name) {
                children[item].value = value;
                return false;
            }
        }
        let input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
        return true;
    }

    function appendInputToAllForms(name, value) {
        let forms = document.getElementsByTagName("form");
        for (let form = 0; form < forms.length; form++) {
            appendInputToForm(forms[form], name, value);
        }
    }

    function findGetParameter(item) {
        let result = "",
            items = [];
        let query = location.search.substr(1).split("&");
        for (let i = 0; i < query.length; i++) {
            items = query[i].split("=");
            if (items[0] === item) result = decodeURIComponent(items[1]);
        }
        return result;
    }

    function getReferrer() {
        appendInputToAllForms("referrer", document.referrer);
    }

    function getClick() {
        const xhr = new XMLHttpRequest();
        let utm_source = findGetParameter("utm_source");
        let utm_medium = findGetParameter("utm_medium");
        let utm_campaign = findGetParameter("utm_campaign");
        let utm_content = findGetParameter("utm_content");
        let utm_term = findGetParameter("utm_term");

        let query = "data1=" + utm_source + "&data2=" + utm_medium + "&data3=" + utm_campaign + "&data4=" + utm_content + "&data5=" + utm_term;
        xhr.open("GET", "/api/success.php?" + query, true);
        xhr.setRequestHeader('X-Kma-Api', 'click');
        xhr.setRequestHeader('X-Referer', document.referrer);
        xhr.send();
        xhr.onload = function () {
            let array;
            try { array = JSON.parse(this.response); } catch (e) { return; }
            if (array.click === 'undefined') return;
            appendInputToAllForms("click", array.click);
        };
    }

    getReferrer();
    getClick();

}());
