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
  function makeControllerArray(arr, className) {
    debugger;
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

  makeControllerArray(desktopControllers, '.desktopController');
  makeControllerArray(mobileControllers, '.mobileController');

  console.log('desktopControllers: ', desktopControllers);
  console.log('mobileControllers: ', mobileControllers);
  //////////////////////////////////////

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