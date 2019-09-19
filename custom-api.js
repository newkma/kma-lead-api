(function () {
    function appendInputToForm(form, name, value) {
        var children = form.children;
        if (typeof value === "object") value = JSON.stringify(value);
        for (var item = 0; item < children.length; item++) {
            if (children[item].getAttribute("name") === name) {
                children[item].value = value;
                return false;
            }
        }
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
        return true;
    }

    function appendInputToAllForms(name, value) {
        var forms = document.getElementsByTagName("form");
        for (var form = 0; form < forms.length; form++) {
            appendInputToForm(forms[form], name, value);
        }
    }

    function findGetParameter(item) {
        var result = "", items = [];
        var query = location.search.substr(1).split("&");
        for (var i = 0; i < query.length; i++) {
            items = query[i].split("=");
            if (items[0] === item) result = decodeURIComponent(items[1]);
        }
        return result;
    }

    function appendReferrer() {
        if (!!document.referrer) appendInputToAllForms("referer", document.referrer);
    }

    function appendClick() {
        if (!!sessionStorage.getItem('kma-click')) {
            return appendInputToAllForms("click", sessionStorage.getItem('kma-click'));
        }
        var utm_source = findGetParameter("utm_source");
        var utm_medium = findGetParameter("utm_medium");
        var utm_campaign = findGetParameter("utm_campaign");
        var utm_content = findGetParameter("utm_content");
        var utm_term = findGetParameter("utm_term");
        var fbp = findGetParameter("fbp");
        var query = "data1=" + utm_source + "&data2=" + utm_medium + "&data3=" + utm_campaign + "&data4=" + utm_content + "&data5=" + utm_term + "&fbp=" + fbp;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "api/success.php?" + query, true);
        xhr.setRequestHeader('X-Kma-Api', 'click');
        if (!!document.referrer) xhr.setRequestHeader('X-Referer', document.referrer);
        xhr.send();
        xhr.onload = function () {
            var array;
            try {
                array = JSON.parse(this.response);
            } catch (e) {
                return;
            }
            console.log(array.click);
            if (array.click === undefined) return;
            sessionStorage.setItem('kma-click', array.click);
            appendInputToAllForms("click", array.click);
        };
    }

    appendReferrer();
    appendClick();
}());