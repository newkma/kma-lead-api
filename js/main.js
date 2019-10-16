$(document).ready(function() {
    $(".scroll_to_form").on("click", function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: $("form").offset().top + "px" });
        return false;
    });
    
    setInterval(function() {
        var int1 = parseInt($(".int1").html());
        var int2 = parseInt($(".int2").html());
        if (int1 == 0 && int2 == 0) {
            return false;
        } else {
            if (int2 == 0) {
                $(".int1").html("0");
                $(".int2").html("9");
            } else {
                int2--;
                $(".int2").html(int2);
            }
        }
    }, 10000);
    $('button').on("click", function (e) {
        //e.preventDefault();
		var hasError = false;
        $('form input').removeClass("error");
        $(".error_block_text").hide();
        $('form input').each(function () {
            if(($(this).val() != "")||(!$(this).prop("required"))){
                console.log(this);
                $(this).addClass("okey");
            } else {
                console.log(this);
                $(this).addClass("error");
                $(this).next().show();
				hasError = true;
            }
        });
        $('select option').each(function() {
          if ($(this).prop('selected') == true) {
            $(this).parent("select").addClass("okey");
        } else {
            $(this).parent("select").addClass("error");
			hasError = true;
        }
		});
		return !hasError;
    });
	
	$("a[data-toggle=modal]").on("click", function(e){
		e.preventDefault();
		var modal=$(this).attr("href");
		$(modal).show();		
	});
	
	$(".modal .icon-close").on("click", function(e){
		$(this).parents(".modal").hide();		
	});
});