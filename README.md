# som

__JS och CSS för SOM-undersökningarna__

Klasser att lägga till manuellt i RA:
- `responsiveMatrixCell` - precis som tidigare
- `responsiveMatrixWeb` - precis som tidigare
- `cbController` läggs på frågenivå i kombination med att sätta `type = other` på checkboxalternativ för visa/dölja en annan fråga
- `controlled` läggs på frågan som ska kontrolleras av frågan med klassen `cbController` + `type = other`
- om frågan som ska kontrolleras inte har någon av - responsive-klasserna, använd istället `controlledOpen`
- `ejDragspel` på gridfrågor som inte ska inkluderas i dragspelsfunktionalitet, hade tidigare klassen `cellOnly`
