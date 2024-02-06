import { Skeleton } from "@/components/ui/skeleton";
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table";

export function SkeletonRow({ ncolumns, mrows }) {
  // Crear un array de filas con la cantidad especificada por mrows
  const rows = [];

  for (let i = 0; i < mrows; i++) {
    const cells = [];
    // Crear celdas para cada columna
    for (let j = 0; j < ncolumns; j++) {
      const uniqueKey = `${i}-${j}`;
      cells.push(
        <TableCell key={uniqueKey}>
          <Skeleton className="h-4 w-40"/>
        </TableCell>
      );
    }
    // Agregar fila con las celdas creadas
    rows.push(<TableRow key={i}> {cells} </TableRow>);
  }

  return rows;
}