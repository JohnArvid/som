// Containerfunction for all invoked onload
function som() {
  'use strict';
  console.log('som() running');
  indikator.setNumericKeyboard();
  indikator.excludeFromAccordion();
  indikator.updateTextInputs();
  indikator.removeZebra();
  indikator.alwaysShowOpenFields();
  indikator.checkBoxFilters();
  indikator.accordion();
  indikator.controllingArrays();
  console.log('scripts ran');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', som);
} else {
  som();
}
