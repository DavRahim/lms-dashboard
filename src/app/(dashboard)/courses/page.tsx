"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MailCheck, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi"

// const data: Payment[] = [
//   // mock data for testing;
//   {
//     id: "124894389894",
//     title: "A control that allows the user to toggle between checked and not checked",
//     rating: "4.3",
//     purchased: "10",

//   },
//   {
//     id: "124894389894",
//     title: "A control that allows the user to toggle between checked and not checked",
//     rating: "4.3",
//     purchased: "10",

//   },
//   {
//     id: "124894389894",
//     title: "A control that allows the user to toggle between checked and not checked",
//     rating: "4.3",
//     purchased: "10",

//   },
//   {
//     id: "124894389894",
//     title: "A control that allows the user to toggle between checked and not checked",
//     rating: "4.3",
//     purchased: "10",

//   },
//   {
//     id: "124894389894",
//     title: "A control that allows the user to toggle between checked and not checked",
//     rating: "4.3",
//     purchased: "10",

//   },
//   {
//     id: "124894389894",
//     title: "A control that allows the user to toggle between checked and not checked",
//     rating: "4.3",
//     purchased: "10",

//   },
//   {
//     id: "124894389894",
//     title: "A control that allows the user to toggle between checked and not checked",
//     rating: "4.3",
//     purchased: "10",

//   },
//   {
//     id: "124894389894",
//     title: "A control that allows the user to toggle between checked and not checked",
//     rating: "4.3",
//     purchased: "10",

//   },
//   {
//     id: "124894389894",
//     title: "Lucide is available as a package for all major package managers",
//     rating: "4.3",
//     purchased: "10",

//   },
//   {
//     id: "124894389894",
//     title: "A control that allows the user to toggle between checked and not checked",
//     rating: "4.3",
//     purchased: "11",

//   },
//   {
//     id: "124894389894",
//     title: "A control that allows the user to toggle between checked and not checked",
//     rating: "4.3",
//     purchased: "10",
//   },
// ]

export type Payment = {
  id: string
  name: string
  rating: string
  purchased: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("_id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-right">Course Name</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>
  },
  {
    accessorKey: "rating",
    header: () => <div className="text-right">Rating</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("rating")}</div>
  },
  {
    accessorKey: "purchased",
    header: () => <div className="text-right">Purchased</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("purchased")}</div>
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right">UpdatedAt</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("updatedAt")}</div>
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              <span>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a
                href={`mailto:mdabdurrahim196679@gmail.com`}>
                {/* href={`mailto:${params.row.email}`}> */}
                <MailCheck
                  className="dark:text-white text-black h-4 w-4"
                />
                Edit
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

type Props = {};


const Page = (props: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Payment[]>([]);
  // get admin course
  const { isLoading, data: courseData, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  React.useEffect(() => {
    setData(courseData?.data)
  }, [courseData])


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <section className="col-span-10">
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter course name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows?.length} of{" "}
            {table.getFilteredRowModel().rows?.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page;