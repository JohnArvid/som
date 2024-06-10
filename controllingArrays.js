//Controllingarrays

function controllingArrays() {

  let desktopControllers = [];
  let mobileControllers = [];
  // Populera desktopControllers med frågeid + svarsalternativ
  document
    .querySelectorAll('.desktopController')
    .forEach((controller) =>
      controller
        .querySelectorAll('.typeOther a')
        .forEach((alternative) =>
          desktopControllers.push(
            controller.children[0].text + '.1:' + alternative.text
          )
        )
    );

  // Populera mobileControllers med frågeid + svarsalternativ
  document
    .querySelectorAll('.mobileController')
    .forEach((controller) =>
      controller
        .querySelectorAll('label.typeOther')
        .forEach((alternative) => mobileControllers.push(alternative.htmlFor))
    );

  if (desktopControllers.length > 0 || mobileControllers.length > 0) {
    let controlledClass = '.controlled';
    let hideClassOnly = '';
    let controlIsActive = false;
    let responsiveClass = isMobile.matches
      ? '.responsiveMatrixCell'
      : '.responsiveMatrixWeb';

    let elements =
      document.querySelectorAll(controlledClass + responsiveClass) ||
      document.querySelectorAll(controlledClass);

    const hideControlledItems = () => {
      elements.forEach((element) => {
          element.classList.add('hidden');
        }
      );
    };

    const showControlledItems = () => {
      elements.forEach((element) => {
          element.classList.remove('hidden');
        }
      );
    };
    //uppdatera controlIsActive

    desktopControllers.forEach((controller) => {
      if (
        document
          .querySelector("[name='setvalue" + controller + "']")
          .classList.contains('activeRadio' || 'activeRadiocustom')
      ) {
        controlIsActive = true;
      }
    });

    //visa dölj initialt beroende på controlIsActive
    // gör logik och flöde tydligare
    if (controlIsActive) {
      hideControlledItems();
    }

    //när formuläret uppdateras
    $('form').change(function () {
      debugger;
      controlIsActive = false;
      if (isMobile.matches) {
        mobileControllers.forEach((controller, index) => {
          if (
            $("[name='setvalue" + controller + "']").hasClass(
              'activeRadio' || 'activeRadiocustom'
            )
          ) {
            $("[name='setvalue" + desktopControllers[index] + "']").addClass(
              'activeRadio'
            );
            $("[name='" + desktopControllers[index] + "']").prop(
              'checked',
              'true'
            );
          } else {
            $("[name='setvalue" + desktopControllers[index] + "']").removeClass(
              ['activeRadio', 'activeRadiocustom']
            );
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

      desktopControllers.forEach((controller) => {
        if (
          $("[name='setvalue" + controller + "']").hasClass(
            'activeRadio' || 'activeRadiocustom'
          )
        ) {
          controlIsActive = true;
        }
      });

      if (controlIsActive) {
        hideControlledItems();
      } else {
        showControlledItems();
      }
    });
  }
}
