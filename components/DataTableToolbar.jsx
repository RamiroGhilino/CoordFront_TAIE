import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTableViewOptions from "@/components/DataTableViewOptions";

import {
  tutorship_statuses,
  postulation_statuses,
} from "@/components/FilterDataValues";
import DataTableFilter from "@/components/DataTableFilter";

function DataTableToolbar({ table, page }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Nombre del Alumno..."
          value={table.getColumn("full_name")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("full_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("status") && (
          <DataTableFilter
            column={table.getColumn("status")}
            title="Estados"
            options={
              page === "tutorships" ? tutorship_statuses : postulation_statuses
            }
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Eliminar Filtros
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

export default DataTableToolbar;
