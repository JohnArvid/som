//Controllingarrays

// const isMobile = window.matchMedia(
//   'only screen and(max-device-width: 568px), only screen and (max-width: 568px)'
// );

function controllingArrays() {
  // desktopControllers,
  // mobileControllers,
  // hideClass,
  // hideClassOnly
  console.log('controllingArrays ran');
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

  //////////////////////////////////////

  let controlIsActive = false
  //uppdatera controlIsActive
  desktopControllers.forEach( controller => {
    if (
      $("[name='setvalue" + controller + "']").hasClass('activeRadio') ||
      $("[name='setvalue" + controller + "']").hasClass('activeRadiocustom')
    ) {
      controlIsActive = true;
    }
  });

  //visa dölj beroende på controlIsActive
  if (controlIsActive) {
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
    controlIsActive = false;
    if (isMobile.matches) {
      mobileControllers.forEach( (controller, index) => {
        if (
          $("[name='setvalue" + controller + "']").hasClass('activeRadio') ||
          $("[name='setvalue" + controller + "']").hasClass('activeRadiocustom')
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
      desktopControllers.forEach( (controller, index) => {
        if (
          $("[name='setvalue" + controller + "']").hasClass('activeRadio') ||
          $("[name='setvalue" + controller + "']").hasClass('activeRadiocustom')
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

    desktopControllers.forEach( (controller, index) => {
      if (
        $("[name='setvalue" + controller + "']").hasClass('activeRadio') ||
        $("[name='setvalue" + controller + "']").hasClass('activeRadiocustom')
      ) {
        controlIsActive = true;
      }
    });

    if (controlIsActive) {
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
