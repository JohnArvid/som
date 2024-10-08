// Containerfunction for all invoked onload
function som() {
  setTimeout(() => {
    'use strict';
    indikator.setNumericKeyboard();
    indikator.excludeFromAccordion();
    indikator.updateTextInputs();
    indikator.removeZebra();
    indikator.checkBoxFilters();
    indikator.accordion();
    indikator.samePageFilters();
    indikator.alwaysShowOpenFields();
  }, 200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', som);
} else {
  som();
}
