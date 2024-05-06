//2022controlledCheckBox.js
// Styr att frågor visas/döljs med checkbox
// Refactor till att själv kolla upp id på items genom ett klassnamn
// Det blir bättre interface att bara lägga en klass på de checkboxar
// som ska kontrollera något annat
function controlledCheckbox(qids) {
  let checkBox = [], //array med checkboxar som styr
    mobileClass = '.responsiveMatrixCell',
    desktopClass = '.responsiveMatrixWeb',
    controlled = '.controlled, .controlledOpen';
  // controlled ges till frågor som ska döljas/visas,
  // controlledOpen ges till öppna frågor som ska döljas/visas

  $.each(qids, function (index, value) {
    checkBox.push("[name='setvalue" + value + "']");
  });

  // Below needs to be refactored and moved into checkBoxFilters()
  // Loops over each checkbox when page loads
  $.each(checkBox, function (index, value) {
    // if checkbox has class 'activeCheckbox'
    if ($(value).hasClass('activeCheckbox')) {
      // This should be a separate function hideControlledItems()
      $(
        isMobile.matches ? mobileClass + controlled : desktopClass + controlled
      ).hide();
    }
  });

  // Loops over each checkbox when form changes
  $('form').change(function () {
    $.each(checkBox, function (index, value) {
      // if checkbox has class 'activeCheckbox'
      if ($(value).hasClass('activeCheckbox')) {
        $(
          isMobile.matches
            ? mobileClass + controlled
            : desktopClass + controlled
        ).hide();
        return;
      } else {
        $(
          isMobile.matches
            ? mobileClass + controlled
            : desktopClass + controlled
        ).show();
        return;
      }
    });
  });
}