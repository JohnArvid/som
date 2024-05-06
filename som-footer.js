// Containerfunction for all invoked onload
function som() {
  'use strict';
  console.log('som() running');
  debugger;
  indikator.setNumericKeyboard();
  indikator.excludeCellOnlyFromAccordion();
  indikator.updateTextInputs();
  indikator.removeZebra();
  indikator.alwaysShowOpenFields();
  indikator.accordion();
  console.log('scripts ran');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', som);
} else {
  som();
}
