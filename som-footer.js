// Containerfunction for all invoked onload
document.addEventListener('DOMContentLoaded', () => {
  indikator.setNumericKeyboard();
  indikator.excludeCellOnlyFromAccordion();
  indikator.updateTextInputs();
  indikator.removeZebra();
  indikator.alwaysShowOpenFields();
  indikator.accordion();
});