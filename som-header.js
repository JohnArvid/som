//Controllingarrays

// $.each is a simple iteration construct to loop
// over an array, collection or object

function controllingArrays(
  desktopControllers,
  mobileControllers,
  hideClass,
  hideClassOnly
) {
  var controlIsActive = 0;
  //uppdatera controlIsActive
  $.each(desktopControllers, function (index, value) {
    if (
      $("[name='setvalue" + value + "']").hasClass('activeRadio') ||
      $("[name='setvalue" + value + "']").hasClass('activeRadiocustom')
    ) {
      controlIsActive += 1;
    }
  });

  //visa dölj beroende på controlIsActive
  if (controlIsActive > 0) {
    $(
      isMobile.matches
        ? '.responsiveMatrixCell' + hideClass + ', ' + hideClassOnly
        : '.responsiveMatrixWeb' + hideClass + ', ' + hideClassOnly
    ).hide();
  } else {
    $(
      isMobile.matches
        ? '.responsiveMatrixCell' + hideClass + ', ' + hideClassOnly
        : '.responsiveMatrixWeb' + hideClass + ', ' + hideClassOnly
    ).show();
  }

  //när formuläret uppdateras
  $('form').change(function () {
    controlIsActive = 0;
    if (isMobile.matches) {
      $.each(mobileControllers, function (index, value) {
        if (
          $("[name='setvalue" + value + "']").hasClass('activeRadio') ||
          $("[name='setvalue" + value + "']").hasClass('activeRadiocustom')
        ) {
          $("[name='setvalue" + desktopControllers[index] + "']").addClass(
            'activeRadio'
          );
          $("[name='" + desktopControllers[index] + "']").prop(
            'checked',
            'true'
          );
        } else {
          $("[name='setvalue" + desktopControllers[index] + "']").removeClass([
            'activeRadio',
            'activeRadiocustom',
          ]);
          $("[name='" + desktopControllers[index] + "']").prop(
            'checked',
            'false'
          );
        }
      });
    } else {
      $.each(desktopControllers, function (index, value) {
        if (
          $("[name='setvalue" + value + "']").hasClass('activeRadio') ||
          $("[name='setvalue" + value + "']").hasClass('activeRadiocustom')
        ) {
          $("[name='setvalue" + mobileControllers[index] + "']").addClass(
            'activeRadio'
          );
          $("[name='" + mobileControllers[index] + "']").prop(
            'checked',
            'true'
          );
        } else {
          $("[name='setvalue" + mobileControllers[index] + "']").removeClass([
            'activeRadio',
            'activeRadiocustom',
          ]);
          $("[name='" + mobileControllers[index] + "']").prop(
            'checked',
            'false'
          );
        }
      });
    }

    $.each(desktopControllers, function (index, value) {
      if (
        $("[name='setvalue" + value + "']").hasClass('activeRadio') ||
        $("[name='setvalue" + value + "']").hasClass('activeRadiocustom')
      ) {
        controlIsActive += 1;
      }
    });

    if (controlIsActive > 0) {
      $(
        isMobile.matches
          ? '.responsiveMatrixCell' + hideClass + ',' + hideClassOnly
          : '.responsiveMatrixWeb' + hideClass + ', ' + hideClassOnly
      ).hide();
    } else {
      $(
        isMobile.matches
          ? '.responsiveMatrixCell' + hideClass + ',' + hideClassOnly
          : '.responsiveMatrixWeb' + hideClass + ', ' + hideClassOnly
      ).show();
    }
  });
}

// Refactored below!

const isMobile = window.matchMedia(
  'only screen and(max-device-width: 568px), only screen and (max-width: 568px)'
);

const indikator = {
  checkBoxFilters: function () {
    // CSS class  'cbController' is added to item with check box that is controlling other question
    // plus the alternative is marked as 'other' in GUI
    let checkBoxClass = '.cbController label.typeOther';
    let checkBoxLabels = document.querySelectorAll(checkBoxClass);

    if (checkBoxLabels) {
      let controlledClass = '.controlled';
      let allAnchors = document.querySelectorAll('.cbController a.fakeInput');
      let checkBoxIds = [];
      let inputIds = [];

      let responsiveClass = isMobile.matches
        ? '.responsiveMatrixCell'
        : '.responsiveMatrixWeb';

      //  det här funkar väl inte?
      let elements =
        document.querySelectorAll(controlledClass + responsiveClass) ||
        document.querySelectorAll(controlledClass);

      const hideControlledItems = () => {
        elements.forEach((element) => {
          element.classList.add('hidden');
        });
      };

      const showControlledItems = () => {
        elements.forEach((element) => {
          element.classList.remove('hidden');
        });
      };

      checkBoxLabels.forEach((item) => {
        checkBoxIds.push("[name='setvalue" + item.getAttribute('for') + "']");
        inputIds.push(item.getAttribute('for'));
      });

      // add the eventlisteners on the checkboxes and use e.target in handler
      let changeHandler = () => {
        inputIds.forEach((input, i) => {
          // if checkbox has class 'activeCheckbox'
          if (
            document.getElementById(input).checked ||
            document
              .querySelector(checkBoxIds[i])
              .classList.contains('activeCheckbox')
          ) {
            console.log('hide them');
            hideControlledItems();
          } else {
            console.log('show them');
            showControlledItems();
          }
        });
      };

      checkBoxLabels.forEach((item) => item.addEventListener('click', changeHandler));
      allAnchors.forEach((a) => a.addEventListener('click', changeHandler));

      changeHandler();
    }
  },

  updateTextInputs: function () {
    let desktopClass = '.responsiveMatrixWeb';
    let mobileClass = '.responsiveMatrixCell';
    let inputType = "input[type='text']";
    let desktopInput = document.querySelector(inputType + desktopClass);
    let mobileInput = document.querySelector(inputType + mobileClass);

    function updateCorrespondingInput() {
      isMobile.matches
        ? desktopInput.val(mobileInput.val())
        : mobileInput.val(desktopInput.val());
    }

    let inputTarget = document.querySelector(
      "input[type='text'].responsiveInput"
    );
    if (inputTarget) {
      inputTarget.addEventListener('input', updateCorrespondingInput);
    }
    let changeTarget = document.querySelector('.responsiveInput');
    if (changeTarget) {
      changeTarget.addEventListener('change', updateCorrespondingInput);
    }
  },

  removeZebra: function () {
    const elements = document.querySelectorAll('.removeZebra .StripedRow');
    elements.forEach((element) => {
      element.classList.remove('StripedRow');
    });
  },

  alwaysShowOpenFields: function () {
    const elements = document.querySelectorAll("input[type='text']");
    elements.forEach((element) => {
      element.setAttribute('disabled', false);
      element.classList.add('activeConnection');
      element.classList.remove('passiveConnection');
    });
  },

  setNumericKeyboard: function () {
    const elements = document.querySelectorAll('input.numeric0');
    if (elements.length > 0) {
      elements.forEach((element) => {
        element.setAttribute('type', 'text');
        element.setAttribute('pattern', '[0-9]*');
      });
    } else {
      console.log(
        `setNumericKeyBoard says: elements.length is ${elements.length}`
      );
    }
  },

  excludeCellOnlyFromAccordion: function () {
    const elements = document.querySelectorAll(
      '.cellOnly .simpleQuestionGridItem'
    );
    elements.forEach((element) => {
      element.classList.remove('simpleQuestionGridItem');
    });
  },

  // In need of refactoring!
  accordion: function () {
    let i = 0;
    let desktopQuestions = [];
    let mobileQuestions = [];
    let activeQid;
    let passiveQid;
    let qindex;

    document
      .querySelectorAll('.responsiveMatrixWeb a.reference')
      .forEach((element) => {
        desktopQuestions.push(element.getAttribute('name').replace('ref', ''));
      });

    // $(".responsiveMatrixWeb a.reference").each( function(index) {
    // desktopQuestions.push($(this).attr("name").replace("ref",""))
    // });
    $('.responsiveMatrixCell a.reference').each(function (index) {
      mobileQuestions.push($(this).attr('name').replace('ref', ''));
    });

    function jq(id) {
      return '#' + id.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1');
    }

    if ($('.simpleQuestionGridItem').length > 1 && mobileQuestions.length > 0) {
      //Ge klassen activeItem till första frågan
      $('.simpleQuestionGridItem').first().addClass('activeItem');
      $('.simpleQuestionGridItem:not(.activeItem)')
        .find('.QuestionTable')
        .slideUp('slow');
      //Göm alla andra frågor
      $('.simpleQuestionGridItem').each(function (index) {
        $(this).attr('id', 'gridQuestion' + index);
      });

      $('.simpleQuestionGridItem').click(function () {
        if ($(this).hasClass('activeItem')) {
          $(this)
            .removeClass('activeItem')
            .find('.QuestionTable')
            .slideUp('slow');
          var currentId = $(this).attr('id');
          var currentIndex = Number(currentId.slice(12));
          var nextIndex = currentIndex + 1;
          $('#gridQuestion' + nextIndex).addClass('activeItem');
          $('#gridQuestion' + nextIndex)
            .find('.QuestionTable')
            .slideDown('slow');
          //$(".activeItem")[0].scrollIntoView();
        } else {
          $('.activeItem').find('.QuestionTable').slideUp('slow');
          $('.activeItem').removeClass('activeItem');
          $(this)
            .addClass('activeItem')
            .find('.QuestionTable')
            .slideDown('slow');
          //$(".activeItem")[0].scrollIntoView();
        }
        return;
      });

      $('.simpleQuestionGridItem a').click(function () {
        $('.activeItem').click();
      });
    }

    $(isMobile.matches ? '.responsiveMatrixCell' : '.responsiveMatrixWeb').on(
      'change',
      function (e) {
        let changedVar = e.target.id.match(/^Q[0-9]+/g)[0];
        isMobile.matches
          ? (qindex = mobileQuestions.indexOf(changedVar))
          : (qindex = desktopQuestions.indexOf(changedVar));

        i++;

        isMobile.matches
          ? (activeQid = mobileQuestions[qindex])
          : (activeQid = desktopQuestions[qindex]);

        isMobile.matches
          ? (passiveQid = desktopQuestions[qindex])
          : (passiveQid = mobileQuestions[qindex]);

        if (e.target.checked == false) {
          $(jq(e.target.id.replace(activeQid, passiveQid))).attr(
            'checked',
            false
          );
        } else if (e.target.checked == true) {
          $(jq(e.target.id.replace(activeQid, passiveQid))).attr(
            'checked',
            true
          );
        }
      }
    );
  },
};
