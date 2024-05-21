import * as React from "react";
import { 
    type ColumnDef, 
    type PaginationState, 
    type SortingState, 
    getCoreRowModel, 
    getFilteredRowModel, 
    getSortedRowModel, 
    useReactTable, 
    flexRender, 
    getPaginationRowModel
 } from "@tanstack/react-table";
import { APIResponse } from "../types/global";
import { defaultPaginationSize } from "../utils";
export { type ColumnDef, type PaginationState, type SortingState } from "@tanstack/react-table";
import { mkConfig, generateCsv, download } from "export-to-csv";

type Options<T> = {
    getKey: (data: T) => string,
    title: string,
    pageIndex?: number,
    pageSize?: number,
    sorting?: SortingState,
    filter?: string,
    manual?: boolean,
}

export type TableRows<T> = Parameters<typeof useTable<T>>[0];

const empty: unknown[] = [];

export function useTable<T>(data:  APIResponse<T> | undefined, cols: ColumnDef<T>[], options: Options<T>){
    const [pagination, setPagination] = React.useState<PaginationState>({ 
        pageIndex: options?.pageIndex ?? 0, 
        pageSize: options?.pageSize ?? defaultPaginationSize[0].value 
    });
    const [sorting , setSorting] = React.useState<SortingState>(options?.sorting ?? []);
    const [globalFilter, setGlobalFilter] = React.useState('')
    const [subFilter, setSubFilter] = React.useState<any>(undefined)
    const [fieldSeparator, SetFieldSeparator] = React.useState<string>(";")

    const totalCount = (data?.total ?? (data?.data ?? []).length);
    const totalPage = data?.totalPage
    const _data = data?.data ?? (empty as T[]);
    const manual = options?.manual ?? _data.length !== totalCount;
    const table = useReactTable<T>({
        data: _data,
        pageCount: totalPage ?? 1,
        columns: cols,
        state: {
            pagination : pagination,
            sorting : sorting,
            globalFilter : globalFilter,
        },

        getCoreRowModel: getCoreRowModel(),

        manualPagination: manual,
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),

        manualSorting: manual,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        manualFiltering: manual,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
    });

    const exportTable = () => {
        var milis = new Date().getTime();
        const title = `${options.title}_${milis}_jobm`
        const csvConfig = mkConfig({ 
            filename: title,
            fieldSeparator: fieldSeparator,
            useKeysAsHeaders: true 
        });
        try {
            const csv = generateCsv(csvConfig)(_data as any);
            return download(csvConfig)(csv)
        } catch(e) {
            console.log(e)
        }
    }

    return {
        table: table,
        defaultColumn: cols,
        data: data?.data,
        totalCount: totalCount,
        getKey: options.getKey,
        pagination: pagination,
        setPagination: setPagination,
        sorting : sorting,
        setSorting: setSorting,
        globalFilter : globalFilter,
        setGlobalFilter: setGlobalFilter,
        subFilter: subFilter,
        fieldSeparator: fieldSeparator,
        SetFieldSeparator: SetFieldSeparator,
        setSubFilter: setSubFilter,
        render: flexRender,
        orderDir: <'DESC'|'ASC'>(!!sorting?.[0] ? sorting?.[0]?.desc ? 'DESC' : 'ASC' : 'DESC'),
        orderBy: sorting?.[0]?.id,
        exportTable: exportTable
    }
}