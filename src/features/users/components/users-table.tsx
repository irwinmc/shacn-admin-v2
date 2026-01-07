import { useState } from 'react';
import {
	type SortingState,
	type VisibilityState,
	type ColumnFiltersState,
	type PaginationState,
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTablePagination, DataTableToolbar } from '@/components/data-table';
import { roles } from '../data';
import { type User } from '../schemas';
import { DataTableBulkActions } from './data-table-bulk-actions';
import { usersColumns as columns } from './users-columns';

type DataTableProps = {
	data: User[];
};

export function UsersTable({ data }: DataTableProps) {
	// Local UI-only states
	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data,
		columns: columns as ColumnDef<typeof data[0]>[],
		state: {
			sorting,
			pagination,
			rowSelection,
			columnFilters,
			columnVisibility,
		},
		enableRowSelection: true,
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		getPaginationRowModel: getPaginationRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<div
			className={cn(
				'max-sm:has-[div[role="toolbar"]]:mb-16', // Add margin bottom to the table on mobile when the toolbar is visible
				'flex flex-1 flex-col gap-4'
			)}
		>
			<DataTableToolbar
				table={table}
				searchPlaceholder="Filter users..."
				searchKey="username"
				filters={[
					{
						columnId: 'status',
						title: 'Status',
						options: [
							{ label: 'Active', value: 'active' },
							{ label: 'Inactive', value: 'inactive' },
							{ label: 'Invited', value: 'invited' },
							{ label: 'Suspended', value: 'suspended' },
						],
					},
					{
						columnId: 'role',
						title: 'Role',
						options: roles.map(role => ({ ...role })),
					},
				]}
			/>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id} className="group/row">
								{headerGroup.headers.map(header => {
									// eslint-disable-next-line @typescript-eslint/no-explicit-any
									const { className, thClassName } = (header.column.columnDef.meta as any) || {};
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											className={cn(
												'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
												className,
												thClassName
											)}
										>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className="group/row"
								>
									{row.getVisibleCells().map(cell => {
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										const { className, tdClassName } = (cell.column.columnDef.meta as any) || {};
										return (
											<TableCell
												key={cell.id}
												className={cn(
													'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
													className,
													tdClassName
												)}
											>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										);
									})}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} className="mt-auto" />
			<DataTableBulkActions table={table} />
		</div>
	);
}
