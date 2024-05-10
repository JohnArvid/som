//Controllingarrays

// $.each is a simple iteration construct to loop
// over an array, collection or object

//Edge function, don't think it's used since 2022. Then only in gbg ca Q3001

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

    if (checkBoxLabels.length > 0) {
      let controlledClass = '.controlled';
      let clickableItems = Array.from(
        document.querySelectorAll('.cbController .cellAnsweralternatives')
      ).filter((node) => node.querySelector('label.typeOther'));
      let allAnchors = document.querySelectorAll('.cbController a.fakeInput');
      let checkBoxIds = [];
      let inputIds = [];

      let responsiveClass = isMobile.matches
        ? '.responsiveMatrixCell'
        : '.responsiveMatrixWeb';

      let elements =
        document.querySelectorAll(controlledClass + responsiveClass) ||
        document.querySelectorAll(controlledClass);

      const toggleControlledItems = () => {
        elements.forEach((element) => {
          element.classList.toggle('hidden');
        });
      };

      checkBoxLabels.forEach((item) => {
        checkBoxIds.push("[name='setvalue" + item.getAttribute('for') + "']");
        inputIds.push(item.getAttribute('for'));
      });

      // add the eventlisteners on the checkboxes and use e.target in handler
      const changeHandler = () => {
        inputIds.forEach((input, i) => {
          // if checkbox has class 'activeCheckbox'
          toggleControlledItems();
        });
      };

      function checkBoxActive() {
        // needs to check for checked prop instead?
        for (let i = 0; i > inputIds.length; i++) {
          if (document.getElementById(inputIds[i]).checked) {
            return true;
          }
        }
        return false;
      }

      function initialCheck() {
        if (checkBoxActive()) {
          toggleControlledItems();
        }
      }

      clickableItems.forEach((item) =>
        item.addEventListener('click', changeHandler)
      );
      allAnchors.forEach((a) => a.addEventListener('click', changeHandler));

      initialCheck();
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
    debugger;
    let i = 0;
    let desktopQuestions = [];
    let mobileQuestions = [];
    let activeQid;
    let passiveQid;
    let qindex;

    function pushQuestionIds(type) {
      let className =
        type === 'desktop' ? '.responsiveMatrixWeb' : '.responsiveMatrixCell';
      let questionArray =
        type === 'desktop' ? desktopQuestions : mobileQuestions;

      document
        .querySelectorAll(className + ' a.reference')
        .forEach((element) => {
          questionArray.push(element.getAttribute('name').replace('ref', ''));
        });
    }

    pushQuestionIds('desktop');
    pushQuestionIds('mobile');

    function escapeSpecialCharacters(id) {
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
          $(
            escapeSpecialCharacters(e.target.id.replace(activeQid, passiveQid))
          ).attr('checked', false);
        } else if (e.target.checked == true) {
          $(
            escapeSpecialCharacters(e.target.id.replace(activeQid, passiveQid))
          ).attr('checked', true);
        }
      }
    );
  },
};
