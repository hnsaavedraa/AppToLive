var sampleButtonActive = false;
var sampleSlider = document.getElementById("sample_slider");

var sampleSliderOutput = document.getElementById("sample_slider_output");
sampleSlider.oninput = function () {
    getSliderImportanceTxt(this.value, sampleSliderOutput);
};

getSliderImportanceTxt(sampleSlider.value, sampleSliderOutput);

$("#sample_title_conatiner").click(function () {
    if (sampleButtonActive) {
        sampleButtonActive = false;
        $(".sample_filter_button").css("background-color", "transparent");
        $("#sample_title_conatiner").css("height", "100%");
        $("#sample_check_message").css("color", "var(--secondary_color)");
        $("#sample_button_icon").removeClass('fas fa-times').addClass('fas fa-');
        sample_check_message.innerHTML = "";
        $("#sample_button_icon_container").css("background-color", "var(--secondary_color)");
        $("#sample_button_icon").css("color", "var(--background_color)");
        $("#sample_button_title").css("color", "var(--secondary_color)");
        $("#sample_slider_title").css("display", "none");
        $("#sample_slider").css("display", "none");
        $("#sample_slider_output").css("display", "none");

    } else {
        sampleButtonActive = true;
        $(".sample_filter_button").css("background-color", "var(--secondary_color)");
        $("#sample_title_conatiner").css("height", "46%");
        $("#sample_check_message").css("color", "white");
        $("#sample_button_icon").removeClass('fas fa-check').addClass('fas fa-');
        sample_check_message.innerHTML = "";
        $("#sample_button_icon_container").css("background-color", "white");
        $("#sample_button_icon").css("color", "var(--secondary_color)");
        $("#sample_button_title").css("color", "white");
        $("#sample_slider_title").css("display", "inline");
        $("#sample_slider").css("display", "inline");
        $("#sample_slider_output").css("display", "inline");

    }
});

$("#sample_title_conatiner").hover(function () {
    if (!sampleButtonActive) {
        $("#sample_button_icon").removeClass('fas fa-').addClass('fas fa-check');
        sample_check_message.innerHTML = "Activar?";
    } else {
        $("#sample_button_icon").removeClass('fas fa-').addClass('fas fa-times');
        sample_check_message.innerHTML = "Desactivar?";
    }
}, function () {
    sample_check_message.innerHTML = "";
    if (!sampleButtonActive) {
        $("#sample_button_icon").removeClass('fas fa-check').addClass('fas fa-');
    } else {
        $("#sample_button_icon").removeClass('fas fa-times').addClass('fas fa-');
    }
});
