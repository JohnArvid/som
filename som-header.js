
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
      // console.log(
      //   `setNumericKeyBoard says: elements.length is ${elements.length}`
      // );
    }
  },

  // Previous class name was 'cellOnly' updated to 'ejDragspel'
  excludeFromAccordion: function () {
    const elements = document.querySelectorAll(
      '.ejDragspel .simpleQuestionGridItem'
    );
    elements.forEach((element) => {
      element.classList.remove('simpleQuestionGridItem');
    });
  },

  accordion: function () {
    // debugger;
    // let i = 0;
    let desktopQuestionIds = [];
    let mobileQuestionIds = [];
    let simpleQuestionGridItems = document.querySelectorAll(
      '.simpleQuestionGridItem'
    );
    let activeQid;
    let passiveQid;
    let qindex;

    function pushQuestionIds(type) {
      let className =
        type === 'desktop' ? '.responsiveMatrixWeb' : '.responsiveMatrixCell';
      let questionArray =
        type === 'desktop' ? desktopQuestionIds : mobileQuestionIds;

      document
        .querySelectorAll(className + ' a.reference')
        .forEach((element) => {
          questionArray.push(element.getAttribute('name').replace('ref', ''));
        });
    }

    // create arrays of questionIDs for desktop/mobile
    pushQuestionIds('desktop');
    pushQuestionIds('mobile');

    // utility for escaping special css-selector characters
    function escapeSpecialCharacters(id) {
      return '#' + id.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1');
    }

    if (
      simpleQuestionGridItems.length > 1 &&
      mobileQuestionIds.length > 0
    ) {
      //Ge klassen activeItem till första frågan
      simpleQuestionGridItems[0].classList.add('activeItem');

      //jQuery animation slideUp
      $('.simpleQuestionGridItem:not(.activeItem)')
        .find('.QuestionTable')
        .slideUp();

      // assign comprehensive ids to all mobilequestions
      simpleQuestionGridItems.forEach( (node, index) => {
        node.setAttribute('id', 'gridQuestion' + index);
      });

      // eventListener click 
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
        } else {
          $('.activeItem').find('.QuestionTable').slideUp('slow');
          $('.activeItem').removeClass('activeItem');
          $(this)
            .addClass('activeItem')
            .find('.QuestionTable')
            .slideDown('slow');
        }
        return;
      });

      // fix to catch when anchor is clicked instead?
      // it looks like it would trigger click on active if ANY 'a' is clicked which can't be right. 
      $('.simpleQuestionGridItem a').click(function () {
        $('.activeItem').click();
      });
    }

    //  add change listener on desktop or mobile questions
    $(isMobile.matches ? '.responsiveMatrixCell' : '.responsiveMatrixWeb').on(
      'change',
      function (e) {
        let changedVar = e.target.id.match(/^Q[0-9]+/g)[0];
        isMobile.matches
          ? (qindex = mobileQuestionIds.indexOf(changedVar))
          : (qindex = desktopQuestionIds.indexOf(changedVar));

        // now this is some mysterious stuff...
        // i++;

        isMobile.matches
          ? (activeQid = mobileQuestionIds[qindex])
          : (activeQid = desktopQuestionIds[qindex]);

        isMobile.matches
          ? (passiveQid = desktopQuestionIds[qindex])
          : (passiveQid = mobileQuestionIds[qindex]);

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
