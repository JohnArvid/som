
// Mobilfrågor med klassen "cellOnly" exkluderas från dragspelsgrejen, 
// dvs, är alltid uppfällda
$(".cellOnly .simpleQuestionGridItem").removeClass("simpleQuestionGridItem");


//Numeriskt tangentbord på numeriska frågor
$(function(){
    $("input.numeric0").attr("type", "text").attr("pattern", "[0-9]*");
});


//Dragspelsfunktionalitet
var i = 0,
desktopQuestions = [], 
mobileQuestions = [],
activeQid,
passiveQid,
qindex,
isMobile = window.matchMedia(
    "only screen and(max-device-width: 568px), only screen and (max-width: 568px)"
    );

$(".responsiveMatrixWeb a.reference").each( function(index) {
    desktopQuestions.push($(this).attr("name").replace("ref",""))}
    );
$(".responsiveMatrixCell a.reference").each( function(index) {
    mobileQuestions.push($(this).attr("name").replace("ref",""))
});

function jq( id ) {
    return "#" + id.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );
}

if ($(".simpleQuestionGridItem").length > 1 && mobileQuestions.length > 0) {
$(".simpleQuestionGridItem").first().addClass("activeItem");//Ge klassen activeItem till första frågan
$(".simpleQuestionGridItem:not(.activeItem)").find(".QuestionTable").slideUp("slow");//Göm alla andra frågor
$(".simpleQuestionGridItem").each(function( index ) {
    $(this).attr("id", "gridQuestion" + index);
});

$(".simpleQuestionGridItem").click(function() {
    if ($(this).hasClass("activeItem")){
        $(this).removeClass("activeItem").find(".QuestionTable").slideUp("slow");
        var currentId = $(this).attr("id");
        var currentIndex = Number(currentId.slice(12));
        var nextIndex = currentIndex + 1;
        $("#gridQuestion" + nextIndex).addClass("activeItem");
        $("#gridQuestion" + nextIndex).find(".QuestionTable").slideDown("slow");
        //$(".activeItem")[0].scrollIntoView();
    }
    else {
        $(".activeItem").find(".QuestionTable").slideUp("slow"); 
        $(".activeItem").removeClass("activeItem");
        $(this).addClass("activeItem").find(".QuestionTable").slideDown("slow");
        //$(".activeItem")[0].scrollIntoView();
    } 
    return
});

$(".simpleQuestionGridItem a").click( function() {
    $(".activeItem").click();
    });
}

$(isMobile.matches ? ".responsiveMatrixCell" : ".responsiveMatrixWeb" ).on('change', function(e) { 
    let changedVar = e.target.id.match(/^Q[0-9]+/g)[0];
    isMobile.matches ? qindex = mobileQuestions.indexOf(changedVar) : qindex = desktopQuestions.indexOf(changedVar);
    i++;
    isMobile.matches ? activeQid = mobileQuestions[qindex] : activeQid = desktopQuestions[qindex];
    isMobile.matches ? passiveQid = desktopQuestions[qindex] : passiveQid = mobileQuestions[qindex];
    if (e.target.checked == false) {
        $(jq(e.target.id.replace(activeQid,passiveQid))).attr("checked", false)
    }
    else if (e.target.checked == true){
        $(jq(e.target.id.replace(activeQid,passiveQid))).attr("checked", true);
    }
});
//END DRAGSPEL




// Containerfunction for all invoked onload
document.addEventListener('DOMContentLoaded', () => {
  updateResponsiveInputs();
  removeZebra();
  alwaysShowOpenFields();
});