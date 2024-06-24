$(function () {
  $('.responsiveMatrixCell:not(.exception) .textQAnsweralternative').each(
    function () {
      var text = $(this).text();
      text = text.replace('- ', ' ');
      $(this).text(text);
    }
  );
});
