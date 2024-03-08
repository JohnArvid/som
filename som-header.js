//Controllingarrays
function controllingArrays(desktopControllers, mobileControllers, hideClass, hideClassOnly ){

    var controlIsActive = 0;
    //uppdatera controlIsActive
    $.each(desktopControllers, function(index, value) {
        if($("[name='setvalue"+value+"']").hasClass("activeRadio")||$("[name='setvalue"+value+"']").hasClass("activeRadiocustom")){
            controlIsActive+=1;
        }
        else {
        }
    });
    //visa dölj beroende på controlIsActive  
    if(controlIsActive>0){
        $(isMobile.matches ? ".responsiveMatrixCell"+hideClass + "," + hideClassOnly: ".responsiveMatrixWeb"+hideClass+ ", " + hideClassOnly).hide();
    }
    else {
        $(isMobile.matches ? ".responsiveMatrixCell"+hideClass + "," + hideClassOnly: ".responsiveMatrixWeb"+hideClass+ ", " + hideClassOnly).show();
    }
    
    //när formuläret uppdateras
    $("form").change(function(){
    controlIsActive = 0;
        if(isMobile.matches){
            $.each(mobileControllers, function(index, value) {
                if($("[name='setvalue"+value+"']").hasClass("activeRadio")||$("[name='setvalue"+value+"']").hasClass("activeRadiocustom")){
                    $("[name='setvalue"+desktopControllers[index]+"']").addClass("activeRadio");
                    $("[name='"+desktopControllers[index]+"']").prop("checked", "true");
                }
                else {
                    $("[name='setvalue"+desktopControllers[index]+"']").removeClass(["activeRadio", "activeRadiocustom"]);
                    $("[name='"+desktopControllers[index]+"']").prop("checked", "false");
                }
            });
        }
        else{
            $.each(desktopControllers, function(index, value) {
                if($("[name='setvalue"+value+"']").hasClass("activeRadio")||$("[name='setvalue"+value+"']").hasClass("activeRadiocustom")){
                    $("[name='setvalue"+mobileControllers[index]+"']").addClass("activeRadio");
                    $("[name='"+mobileControllers[index]+"']").prop("checked", "true");
                }
                else {
                    $("[name='setvalue"+mobileControllers[index]+"']").removeClass(["activeRadio", "activeRadiocustom"]);
                    $("[name='"+mobileControllers[index]+"']").prop("checked", "false");
                 }
            });
        }
        $.each(desktopControllers, function(index, value) {
            if($("[name='setvalue"+value+"']").hasClass("activeRadio")||$("[name='setvalue"+value+"']").hasClass("activeRadiocustom")){
                controlIsActive+=1;    
            }
        });
    if(controlIsActive>0){
        $(isMobile.matches ? ".responsiveMatrixCell"+hideClass + "," + hideClassOnly: ".responsiveMatrixWeb"+hideClass+ ", " + hideClassOnly).hide();
    }
    else {
        $(isMobile.matches ? ".responsiveMatrixCell"+hideClass + "," + hideClassOnly: ".responsiveMatrixWeb"+hideClass+ ", " + hideClassOnly).show();
    }
    });
}

//END  Controllingarrays

//2022controlledCheckBox.js
//Styr att frågor visas/döljs med checkbox
function controlledCheckbox(qids){
    checkBox = [], //array med checkboxar som styr
    mobileClass = ".responsiveMatrixCell",
    desktopClass = ".responsiveMatrixWeb",
    controlled = ".controlled, .controlledOpen"; //controlled ges till frågor som ska döljas/visas, controlledOpen ges till öppna frågor som ska döljas/visas

    $.each(qids, function(index, value) {
        checkBox.push("[name='setvalue"+value+"']")
    });

    $.each(checkBox, function(index, value) {
        if($(value).hasClass("activeCheckbox")){
            $(isMobile.matches ? mobileClass+controlled : desktopClass+controlled).hide();
        }
    });

    $("form").change(function(){
        $.each(checkBox, function(index, value) {
            if($(value).hasClass("activeCheckbox")){
                $(isMobile.matches ? mobileClass+controlled : desktopClass+controlled).hide();
                return 
            }
            else{
                $(isMobile.matches ? mobileClass+controlled : desktopClass+controlled).show();
                return
            }
        });
    });
}

//END  2022controlledCheckBox.js

//2022updateResponsiveInputs.js
function updateResponsiveInputs(){
    let desktopInput = $("input[type='text'].responsiveMatrixWeb"),
    mobileInput = $("input[type='text'].responsiveMatrixCell");
$("input[type='text'].responsiveInput").on("input", function(){
    isMobile.matches ? 
    desktopInput.val(mobileInput.val())
    :mobileInput.val(desktopInput.val());
    });
$(".responsiveInput").on("change", function(){
    isMobile.matches ? 
    desktopInput.val(mobileInput.val())
    :mobileInput.val(desktopInput.val());
    });
}

//Säkerställ att frågor med klassen removeZebra inte blir zebratable
function removeZebra() {
  const elements = document.querySelectorAll(".removeZebra .StripedRow");
  for (let element in elements) {
      element.classList.remove('StripedRow');
  }
}
