//Controllingarrays


// $.each is a simple iteration construct to loop
// over an array, collection or object

function controllingArrays( desktopControllers, mobileControllers, hideClass, hideClassOnly ){

    var controlIsActive = 0;
    //uppdatera controlIsActive
    $.each( desktopControllers, function( index, value ) {
        if( $( "[name='setvalue"+ value + "']" )
          .hasClass( "activeRadio" )||
          $( "[name='setvalue" + value + "']" )
          .hasClass( "activeRadiocustom" ) ) {
            controlIsActive += 1;
        }
    });

    //visa dölj beroende på controlIsActive  
    if ( controlIsActive > 0 ) {
        $( isMobile.matches ?
          ".responsiveMatrixCell" + hideClass + "," + hideClassOnly
          :".responsiveMatrixWeb" + hideClass + ", " + hideClassOnly )
          .hide();
    } else {
        $( isMobile.matches ?
          ".responsiveMatrixCell" + hideClass + ", " + hideClassOnly
          :".responsiveMatrixWeb" + hideClass + ", " + hideClassOnly)
          .show();
    }
    
    //när formuläret uppdateras
    $( "form" ).change( function() {
      controlIsActive = 0;
        if ( isMobile.matches ) {
            $.each( mobileControllers, function( index, value ) {
                if( $( "[name='setvalue"+value+"']" )
                .hasClass( "activeRadio" ) ||
                $( "[name='setvalue" + value + "']" )
                .hasClass("activeRadiocustom") ) {
                    $( "[name='setvalue"+desktopControllers[index]+"']" )
                    .addClass( "activeRadio" );
                    $( "[name='"+desktopControllers[index]+"']" )
                    .prop( "checked", "true" );
                } else {
                    $( "[name='setvalue" + desktopControllers[index] + "']" )
                    .removeClass( ["activeRadio", "activeRadiocustom"] );
                    $("[name='" + desktopControllers[index] + "']" )
                    .prop( "checked", "false" );
                }
            });
        } else {
            $.each( desktopControllers, function( index, value ) {
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
// Styr att frågor visas/döljs med checkbox
// Refactor till att själv kolla upp id på items genom ett klassnamn
// Det blir bättre interface att bara lägga en klass på de checkboxar
// som ska kontrollera något annat
function controlledCheckbox( qids ) {
    let checkBox = [], //array med checkboxar som styr
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

    $( "form" ).change( function() {
        $.each(checkBox, function(index, value) {
            if( $( value ).hasClass( "activeCheckbox" ) ){
                $( isMobile.matches ?
                  mobileClass + controlled
                  :desktopClass + controlled )
                  .hide();
                return 
            } else {
                $( isMobile.matches ?
                  mobileClass + controlled
                  :desktopClass + controlled)
                  .show();
                return
            }
        });
    });
}


// New refactored checkBox function WIP :)

function checkBoxFilters() {
  // italicAlternative can be changed for something better and more semantic
  let checkBoxLabels = document.querySelectorAll('.italicAlternative label.typeOther');
  if (checkBoxLabels) {
    let checkBoxIds = [];
    checkBoxLabels.forEach( (item) => {
      checkBoxIds.push( "[name='setvalue" + item.getAttribute('for') + "']" );
    })

  }
}

//END  2022controlledCheckBox.js


// Refactored below!
const indikator = {
  updateResponsiveInputs: function (){
    let desktopInput = document.querySelector("input[type='text'].responsiveMatrixWeb");
    let mobileInput = document.querySelector("input[type='text'].responsiveMatrixCell");

    function updateCorrespondingInput() {
      isMobile.matches ? 
      desktopInput.val(mobileInput.val())
      :mobileInput.val(desktopInput.val());
    }
    
    document.querySelector("input[type='text'].responsiveInput")
    .addEventListener("input", updateCorrespondingInput());

    document.querySelector(".responsiveInput")
    .addEventListener("change", updateCorrespondingInput());
  },

  //Säkerställ att frågor med klassen removeZebra inte blir zebratable
  removeZebra: function () {
    const elements = document.querySelectorAll(".removeZebra .StripedRow");
    for (let element in elements) {
        element.classList.remove('StripedRow');
    }
  },

  // Always show open fields
  alwaysShowOpenFields: function (){
    const elements = document.querySelectorAll("input[type='text']");
    for (let element in elements) {
      element.setAttribute('disabled', false);
      element.classList.add('activeConnection');
      element.classList.remove('passiveConnection');
    }
  }
}