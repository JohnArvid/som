const isMobile = window.matchMedia(
  'only screen and(max-device-width: 568px), only screen and (max-width: 568px)'
);

const indikator = {
  samePageFilters: function () {
    let desktopControllers = [];
    let mobileControllers = [];

    function populateControllerArrays() {
      const bothTypes = () => {
        let controllerElement = document.querySelector('.desktopController');
        if (controllerElement) {
          return controllerElement.classList.contains('responsiveMatrixWeb');
        }
        return null;
      };

      function populateByLabel(arr, className) {
        document
          .querySelectorAll(className)
          .forEach((controller) =>
            controller
              .querySelectorAll('label.typeOther')
              .forEach((alternative) => arr.push(alternative.htmlFor))
          );
      }

      function populateByAlternativeText(arr, className) {
        document
          .querySelectorAll(className)
          .forEach((controller) =>
            controller
              .querySelectorAll('.typeOther a')
              .forEach((alternative) =>
                arr.push(controller.children[0].text + '.1:' + alternative.text)
              )
          );
      }

      if (bothTypes()) {
        populateByAlternativeText(desktopControllers, '.desktopController');
        populateByLabel(mobileControllers, '.mobileController');
      } else {
        populateByLabel(desktopControllers, '.desktopController');
      }
    }

    populateControllerArrays();

    if (desktopControllers.length > 0) {
      const controlIsActive = () => {
        return desktopControllers.some((controller) => {
          const element = document.querySelector(
            "[name='setvalue" + controller + "']"
          );
          return (
            element.classList.contains('activeRadio') ||
            element.classList.contains('activeRadiocustom')
          );
        });
      };
      let controlledClass = '.controlled';
      let responsiveClass = isMobile.matches
        ? '.responsiveMatrixCell'
        : '.responsiveMatrixWeb';

      let elements =
        document.querySelectorAll(controlledClass + responsiveClass).length > 0
          ? document.querySelectorAll(controlledClass + responsiveClass)
          : document.querySelectorAll(controlledClass);

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

      function toggleVisibilityDependingOnControl() {
        if (controlIsActive()) {
          hideControlledItems();
        } else {
          showControlledItems();
        }
      }

      toggleVisibilityDependingOnControl();

      $('form').change(function () {
        // Synka desktop- och mobileControllers när formuläret uppdateras
        // om det finns några mobileControllers
        // de behöver synkas här eftersom filtrerande mobilfrågor är
        // exkluderade från accordion-grejen
        if (mobileControllers.length > 0) {
          if (isMobile.matches) {
            mobileControllers.forEach((controller, index) => {
              if (
                $("[name='setvalue" + controller + "']").hasClass(
                  'activeRadio' || 'activeRadiocustom'
                )
              ) {
                $(
                  "[name='setvalue" + desktopControllers[index] + "']"
                ).addClass('activeRadio');
                $("[name='" + desktopControllers[index] + "']").prop(
                  'checked',
                  'true'
                );
              } else {
                $(
                  "[name='setvalue" + desktopControllers[index] + "']"
                ).removeClass(['activeRadio', 'activeRadiocustom']);
                $("[name='" + desktopControllers[index] + "']").prop(
                  'checked',
                  'false'
                );
              }
            });
          } else {
            desktopControllers.forEach((controller, index) => {
              if (
                $("[name='setvalue" + controller + "']").hasClass(
                  'activeRadio' || 'activeRadiocustom'
                )
              ) {
                $("[name='setvalue" + mobileControllers[index] + "']").addClass(
                  'activeRadio'
                );
                $("[name='" + mobileControllers[index] + "']").prop(
                  'checked',
                  'true'
                );
              } else {
                $(
                  "[name='setvalue" + mobileControllers[index] + "']"
                ).removeClass(['activeRadio', 'activeRadiocustom']);
                $("[name='" + mobileControllers[index] + "']").prop(
                  'checked',
                  'false'
                );
              }
            });
          }
        }

        toggleVisibilityDependingOnControl();
      });
    }
  },

  checkBoxFilters: function () {
    // CSS class  'cbController' is added to item with check box that is controlling other question
    // plus the alternative is marked as 'other' in GUI
    let checkBoxClass = '.cbController label.typeOther';
    let checkBoxLabels = document.querySelectorAll(checkBoxClass);

    if (checkBoxLabels.length > 0) {
      let controlledClass = '.controlled, .controlledOpen';
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
        document.querySelectorAll(responsiveClass + controlledClass) ||
        document.querySelectorAll(controlledClass);

      checkBoxLabels.forEach((item) => {
        checkBoxIds.push("[name='setvalue" + item.getAttribute('for') + "']");
        inputIds.push(item.getAttribute('for'));
      });

      const checkBoxActive = () => {
        for (let i = 0; i < inputIds.length; i++) {
          let checkedAttribute = document.getElementById(inputIds[i]).checked;
          if (checkedAttribute) {
            return true;
          }
        }
        return false;
      };

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

      const toggleControlledItems = () => {
        if (checkBoxActive()) {
          hideControlledItems();
        } else {
          showControlledItems();
        }
      };

      let items = document.getElementById('items');
      items.addEventListener('change', toggleControlledItems);

      allAnchors.forEach((a) =>
        a.addEventListener('click', (e) => {
          e.preventDefault();

          let checkedClass = e.target.classList.contains('activeCheckbox');
          if (checkedClass) {
            hideControlledItems();
          } else {
            showControlledItems();
          }
        })
      );

      toggleControlledItems();
    }
  },

  updateTextInputs: function () {
    let desktopClass = '.responsiveMatrixWeb';
    let mobileClass = '.responsiveMatrixCell';
    let inputType = "input[type='text']";
    let desktopInput = document.querySelector(inputType + desktopClass);
    let mobileInput = document.querySelector(inputType + mobileClass);

    function updateCorrespondingInput() {
      desktopInput.disabled = false;
      mobileInput.disabled = false;

      isMobile.matches
        ? (desktopInput.value = mobileInput.value)
        : (mobileInput.value = desktopInput.value);
    }

    let inputTargets = document.querySelectorAll(
      "input[type='text'].responsiveInput"
    );
    if (inputTargets.length > 0) {
      inputTargets.forEach((input) =>
        input.addEventListener('input', updateCorrespondingInput)
      );
    }
    let changeTargets = document.querySelectorAll('.responsiveInput');
    if (changeTargets.length > 0) {
      changeTargets.forEach((target) =>
        target.addEventListener('change', updateCorrespondingInput)
      );
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
      element.disabled = false;
      element.classList.add('activeConnection');
      element.classList.remove('passiveConnection');
    });
    console.log(document.querySelectorAll("input[type='text']"));
  },

  setNumericKeyboard: function () {
    const elements = document.querySelectorAll('input.numeric0');
    if (elements.length > 0) {
      elements.forEach((element) => {
        element.setAttribute('type', 'text');
        element.setAttribute('pattern', '[0-9]*');
      });
    }
  },

  excludeFromAccordion: function () {
    const elements = document.querySelectorAll(
      '.ejDragspel .simpleQuestionGridItem'
    );
    elements.forEach((element) => {
      element.classList.remove('simpleQuestionGridItem');
    });
  },

  accordion: function () {
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

    if (simpleQuestionGridItems.length > 1 && mobileQuestionIds.length > 0) {
      //Ge klassen activeItem till första frågan
      simpleQuestionGridItems[0].classList.add('activeItem');

      //jQuery animation slideUp
      $('.simpleQuestionGridItem:not(.activeItem)')
        .find('.QuestionTable')
        .slideUp();

      // assign comprehensive ids to all mobilequestions
      simpleQuestionGridItems.forEach((node, index) => {
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
