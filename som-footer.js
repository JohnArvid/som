// Containerfunction for all invoked onload
function som() {
  'use strict';
  indikator.setNumericKeyboard();
  indikator.excludeFromAccordion();
  indikator.updateTextInputs();
  indikator.removeZebra();
  indikator.alwaysShowOpenFields();
  indikator.checkBoxFilters();
  indikator.accordion();
  indikator.samePageFilters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', som);
} else {
  som();
}
setTimeout(indikator.alwaysShowOpenFields, 0);
