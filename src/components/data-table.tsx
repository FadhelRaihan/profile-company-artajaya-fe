import React, { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  SortingState,
  ColumnFiltersState,
  Column,
  PaginationState,
} from '@tanstack/react-table';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DebouncedInput from './debounced-input';
import Filter from './filter';

// Interfaces
interface ColumnSizing {
  [key: string]: {
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
  };
}

interface DataTableProps<TData extends Record<string, any>, TValue = any> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // State props
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  // Pagination props
  serverSide?: boolean;
  totalRows?: number;
  currentPage?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  showEntriesPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  // Filtering & Sorting props
  enableGlobalFilter?: boolean;
  enableColumnFilters?: boolean;
  enableSorting?: boolean;
  // Virtualization props
  enableVirtualization?: boolean;
  virtualizedHeight?: string;
  estimateRowHeight?: number;
  overscan?: number;
  // Column sizing props
  enableColumnResize?: boolean;
  columnSizing?: ColumnSizing;
  defaultColumnWidth?: string | number;
  // Styling props
  tableClass?: string;
  tableContainerClass?: string;
  tableStyle?: React.CSSProperties;
  tableContainerStyle?: React.CSSProperties;
  // Events
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onGlobalFilterChange?: (filter: string) => void;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  onColumnResize?: (columnId: string, width: number) => void;
  onRetry?: () => void;
}

// Minimal UI primitives
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}> = ({ children, variant = 'default', size = 'default', className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${variant === 'outline' ? 'border border-input hover:bg-accent hover:text-accent-foreground' :
      variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' :
        'bg-primary text-primary-foreground hover:bg-primary/90'
      } ${size === 'sm' ? 'h-9 px-3 rounded-md' :
        size === 'lg' ? 'h-11 px-8 rounded-md' :
          'h-10 px-4 py-2'
      } ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({ className = '', ...props }) => (
  <table className={`w-full caption-bottom text-sm ${className}`} {...props} />
);

const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className = '', ...props }) => (
  <thead className={`[&_tr]:border-b ${className}`} {...props} />
);

const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className = '', ...props }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
);

const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ className = '', ...props }) => (
  <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted text-inter ${className}`} {...props} />
);

const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ className = '', ...props }) => (
  <th className={`bg-[#2C4031] h-12 px-4 text-left align-middle font-medium text-inter text-white [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
);

const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ className = '', ...props }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 text-inter text-[#2C4031] ${className}`} {...props} />
);

const DataTable = <TData extends Record<string, any>, TValue = any>({
  columns,
  data,
  loading = false,
  error = '',
  emptyMessage = 'Tidak ada data yang tersedia.',
  serverSide = false,
  totalRows = 0,
  currentPage = 1,
  pageSize = 5,
  pageSizeOptions = [5, 10, 50, 100],
  showEntriesPosition = 'top-left',
  enableGlobalFilter = true,
  enableColumnFilters = true,
  enableSorting = true,
  enableVirtualization = false,
  virtualizedHeight = '600px',
  estimateRowHeight = 52,
  overscan = 5,
  enableColumnResize = false,
  columnSizing = {},
  defaultColumnWidth = 'auto',
  tableClass = '',
  tableContainerClass = '',
  tableStyle = {},
  tableContainerStyle = {},
  onPageChange,
  onPageSizeChange,
  onSortingChange,
  onGlobalFilterChange,
  onColumnFiltersChange,
  onColumnResize,
  onRetry,
}: DataTableProps<TData, TValue>) => {
  // Local state
  const [localPageSize, setLocalPageSize] = useState(pageSize.toString());
  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [localColumnSizing, setLocalColumnSizing] = useState<ColumnSizing>({ ...columnSizing });

  // Virtualization refs
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Column resizing state
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);

  // Pagination state for table (single source of truth for client-side)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: localCurrentPage - 1,
    pageSize: parseInt(localPageSize),
  });

  // Table configuration
  const table = useReactTable({
    data,
    columns,
    enableSorting,
    manualPagination: serverSide,
    manualSorting: serverSide,
    manualFiltering: serverSide,
    enableRowSelection: true,
    pageCount: serverSide ? Math.ceil(totalRows / parseInt(localPageSize)) : undefined,
    state: {
      pagination,
      sorting,
      globalFilter,
      columnFilters,
    },
    onPaginationChange: (updater) => {
      setPagination(prev => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        // Keep local page/pageSize in sync for UI text
        setLocalCurrentPage(next.pageIndex + 1);
        setLocalPageSize(next.pageSize.toString());
        return next;
      });
    },

    onSortingChange: (updater) => {
      setSorting(prev => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        if (serverSide) {
          // kirim ke parent hanya nilai final (server-side)
          onSortingChange?.(next);
        }
        return next;
      });
    },

    onGlobalFilterChange: (updater) => {
      setGlobalFilter(prev => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        if (serverSide) {
          onGlobalFilterChange?.(next as any);
        }
        // Reset to first page when filtering (client-side)
        if (!serverSide) {
          setPagination(prevP => ({ ...prevP, pageIndex: 0 }));
        }
        return next as string;
      });
    },

    onColumnFiltersChange: (updater) => {
      setColumnFilters(prev => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        if (serverSide) {
          onColumnFiltersChange?.(next);
        }
        // Reset to first page when filtering (client-side)
        if (!serverSide) {
          setPagination(prevP => ({ ...prevP, pageIndex: 0 }));
        }
        return next;
      });
    },

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  // === Virtualization setup ===
  // Always read rows directly (no memo) to avoid stale data on first render
  const rows = table.getRowModel().rows;

  const rowVirtualizer = enableVirtualization ? useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current ?? null,
    estimateSize: () => estimateRowHeight,
    overscan,
  }) : null;


  const virtualRows = useMemo<VirtualItem[]>(() =>
    enableVirtualization && rowVirtualizer ? rowVirtualizer.getVirtualItems() : [],
    [enableVirtualization, rowVirtualizer]
  );

  const totalSize = useMemo(() =>
    enableVirtualization && rowVirtualizer ? rowVirtualizer.getTotalSize() : 0,
    [enableVirtualization, rowVirtualizer]
  );

  // Enhanced column sizing calculations
  const columnSizingInfo = useMemo(() => {
    const sizing = { ...columnSizing, ...localColumnSizing };

    let totalFixedWidth = 0;
    let totalMinWidth = 0;
    let flexColumns = 0;

    columns.forEach((col: any) => {
      const columnId = col.accessorKey || col.id;
      const customSize = sizing[columnId];

      const width = customSize?.width || col.size || col.width || null;
      const minWidth = customSize?.minWidth || col.minSize || col.minWidth || 100;

      if (width !== null) {
        const widthPx = typeof width === 'string' ? parseInt(width) : width;
        totalFixedWidth += widthPx;
        totalMinWidth += widthPx;
      } else {
        flexColumns++;
        const minWidthPx = typeof minWidth === 'string' ? parseInt(minWidth) : minWidth;
        totalMinWidth += minWidthPx;
      }
    });

    return {
      totalFixedWidth,
      totalMinWidth,
      flexColumns,
      columns: columns.length
    };
  }, [columns, columnSizing, localColumnSizing]);

  const totalMinWidth = useMemo(() => columnSizingInfo.totalMinWidth, [columnSizingInfo]);

  const parsePixelValue = (value?: string | number | null) => {
    if (value == null) return null;
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string') {
      const v = value.trim();
      // accept '100px' or '100'
      if (v.endsWith('px')) {
        const n = parseInt(v, 10);
        return Number.isFinite(n) ? n : null;
      }
      const f = parseFloat(v);
      return Number.isFinite(f) ? f : null;
    }
    return null;
  };

  // Fallback flex column (to ensure fit-to-width even when all columns are fixed)
  const visibleColumnIds = useMemo(() =>
    columns.map((c: any) => c.accessorKey || c.id).filter(Boolean) as string[],
    [columns]
  );

  const fallbackFlexColumnId = useMemo(() => {
    if (columnSizingInfo.flexColumns === 0 && visibleColumnIds.length > 0) {
      return visibleColumnIds[visibleColumnIds.length - 1]; // let the last column absorb extra space
    }
    return null;
  }, [columnSizingInfo.flexColumns, visibleColumnIds]);

  // Column styling functions
  const getVirtualizedColumnStyle = useCallback((columnId: string): React.CSSProperties => {
    const customSize = { ...columnSizing, ...localColumnSizing }[columnId];
    const column = columns.find((col: any) => (col.accessorKey || col.id) === columnId) as any;

    const widthRaw = customSize?.width ?? column?.size ?? column?.width ?? null;
    const minWidthRaw = customSize?.minWidth ?? column?.minSize ?? column?.minWidth ?? 100;
    const maxWidthRaw = customSize?.maxWidth ?? column?.maxSize ?? column?.maxWidth ?? 'none';

    const widthPx = parsePixelValue(widthRaw);
    const minWidthPx = parsePixelValue(minWidthRaw) ?? 100;
    const maxWidthPx = parsePixelValue(maxWidthRaw);

    if (fallbackFlexColumnId === columnId) {
      // fallback flex column: allow flex but enforce min width
      return {
        flex: '1 1 0%',
        minWidth: `${minWidthPx}px`,
        ...(maxWidthPx ? { maxWidth: `${maxWidthPx}px` } : undefined),
      };
    }

    if (widthPx != null) {
      return {
        width: `${widthPx}px`,
        minWidth: `${widthPx}px`,
        maxWidth: `${widthPx}px`,
        flexShrink: 0,
      };
    } else {
      if (columnSizingInfo.flexColumns > 0) {
        return {
          flex: '1 1 0%',
          minWidth: `${minWidthPx}px`,
          ...(maxWidthPx ? { maxWidth: `${maxWidthPx}px` } : undefined),
        };
      }
    }

    return {
      flex: '1 1 0%',
      minWidth: '100px'
    };
  }, [columns, columnSizing, localColumnSizing, columnSizingInfo, fallbackFlexColumnId]);

  const getNonVirtualizedColumnStyle = useCallback((columnId: string): React.CSSProperties => {
    const customSize = { ...columnSizing, ...localColumnSizing }[columnId];
    const column = columns.find((col: any) => (col.accessorKey || col.id) === columnId) as any;

    const widthRaw = customSize?.width ?? column?.size ?? column?.width ?? null;
    const minWidthRaw = customSize?.minWidth ?? column?.minSize ?? column?.minWidth ?? 100;
    const maxWidthRaw = customSize?.maxWidth ?? column?.maxSize ?? column?.maxWidth ?? 'none';

    const widthPx = parsePixelValue(widthRaw);
    const minWidthPx = parsePixelValue(minWidthRaw) ?? 100;
    const maxWidthPx = parsePixelValue(maxWidthRaw);

    if (widthPx != null) {
      return {
        width: `${widthPx}px`,
        minWidth: `${widthPx}px`,
        maxWidth: `${widthPx}px`
      };
    } else {
      return {
        minWidth: `${minWidthPx}px`,
        ...(maxWidthPx ? { maxWidth: `${maxWidthPx}px` } : undefined),
        width: 'auto'
      };
    }
  }, [columns, columnSizing, localColumnSizing]);


  // Pagination computed values
  const totalPages = useMemo(() => {
    if (serverSide) {
      return Math.ceil(totalRows / parseInt(localPageSize));
    }
    return table.getPageCount();
  }, [serverSide, totalRows, localPageSize, table]);

  const totalEntries = useMemo(() => {
    if (serverSide) {
      return totalRows;
    }
    return table.getFilteredRowModel().rows.length;
  }, [serverSide, totalRows, table]);

  const originalTotalEntries = useMemo(() => {
    return serverSide ? totalRows : data.length;
  }, [serverSide, totalRows, data.length]);

  const startEntry = useMemo(() => {
    if (totalEntries === 0) return 0;
    return (localCurrentPage - 1) * parseInt(localPageSize) + 1;
  }, [totalEntries, localCurrentPage, localPageSize]);

  const endEntry = useMemo(() => {
    const end = localCurrentPage * parseInt(localPageSize);
    return Math.min(end, totalEntries);
  }, [localCurrentPage, localPageSize, totalEntries]);

  const canPreviousPage = useMemo(() => {
    if (serverSide) {
      return localCurrentPage > 1;
    }
    return table.getCanPreviousPage();
  }, [serverSide, localCurrentPage, table]);

  const canNextPage = useMemo(() => {
    if (serverSide) {
      return localCurrentPage < totalPages;
    }
    return table.getCanNextPage();
  }, [serverSide, localCurrentPage, totalPages, table]);

  // Accessibility helpers
  const getAriaSortValue = (column: Column<any, any>) => {
    const sorted = column.getIsSorted();
    if (sorted === 'asc') return 'ascending';
    if (sorted === 'desc') return 'descending';
    return column.getCanSort() ? 'none' : undefined;
  };

  // Column resizing functions
  const getColumnCurrentWidth = useCallback((columnId: string): number => {
    const customSize = localColumnSizing[columnId]?.width;
    if (typeof customSize === 'number') return customSize;
    if (typeof customSize === 'string' && customSize.includes('px')) {
      return parseInt(customSize);
    }

    const column = columns.find((col: any) => (col.accessorKey || col.id) === columnId) as any;
    const columnWidth = column?.size || column?.width;
    if (typeof columnWidth === 'number') return columnWidth;
    if (typeof columnWidth === 'string' && columnWidth.includes('px')) {
      return parseInt(columnWidth);
    }

    return 150; // Default width
  }, [columns, localColumnSizing]);

  const startResize = useCallback((event: React.MouseEvent, columnId: string) => {
    if (!enableColumnResize) return;

    event.preventDefault();
    setIsResizing(true);
    setResizingColumn(columnId);

    const startX = event.clientX;
    const startWidth = getColumnCurrentWidth(columnId);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || resizingColumn !== columnId) return;

      const deltaX = e.clientX - startX;
      const newWidth = Math.max(50, startWidth + deltaX); // Minimum 50px width

      setLocalColumnSizing(prev => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          width: newWidth
        }
      }));

      onColumnResize?.(columnId, newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizingColumn(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [enableColumnResize, isResizing, resizingColumn, getColumnCurrentWidth, onColumnResize]);

  // Navigation methods
  const goToFirstPage = useCallback(() => {
    try {
      if (serverSide) {
        setLocalCurrentPage(1);
        onPageChange?.(1);
      } else {
        table.setPageIndex(0);
      }
    } catch (error) {
      console.error('Error navigating to first page:', error);
    }
  }, [serverSide, onPageChange, table]);

  const goToPreviousPage = useCallback(() => {
    if (canPreviousPage) {
      if (serverSide) {
        const newPage = Math.max(1, localCurrentPage - 1);
        setLocalCurrentPage(newPage);
        onPageChange?.(newPage);
      } else {
        table.previousPage();
      }
    }
  }, [canPreviousPage, serverSide, localCurrentPage, onPageChange, table]);

  const goToNextPage = useCallback(() => {
    if (canNextPage) {
      if (serverSide) {
        const newPage = localCurrentPage + 1;
        setLocalCurrentPage(newPage);
        onPageChange?.(newPage);
      } else {
        table.nextPage();
      }
    }
  }, [canNextPage, serverSide, localCurrentPage, onPageChange, table]);

  const goToLastPage = useCallback(() => {
    try {
      const lastPage = totalPages;
      if (serverSide) {
        setLocalCurrentPage(lastPage);
        onPageChange?.(lastPage);
      } else {
        table.setPageIndex(lastPage - 1);
      }
    } catch (error) {
      console.error('Error navigating to last page:', error);
    }
  }, [totalPages, serverSide, onPageChange, table]);

  const handlePageSizeChange = useCallback((newSize: string) => {
    try {
      setLocalPageSize(newSize);
      if (serverSide) {
        onPageSizeChange?.(parseInt(newSize));
        setLocalCurrentPage(1);
        onPageChange?.(1);
      } else {
        table.setPageSize(parseInt(newSize));
        table.setPageIndex(0);
      }
    } catch (error) {
      console.error('Error changing page size:', error);
    }
  }, [serverSide, onPageSizeChange, onPageChange, table]);

  const handleGlobalFilterChange = useCallback((value: string) => {
    try {
      table.setGlobalFilter(value);
    } catch (error) {
      console.error('Error changing global filter:', error);
    }
  }, [table]);

  const clearGlobalFilter = useCallback(() => {
    try {
      table.setGlobalFilter('');
    } catch (error) {
      console.error('Error clearing global filter:', error);
    }
  }, [table]);

  useLayoutEffect(() => {
    if (!enableVirtualization || !rowVirtualizer) return;
    // measure ulang ketika data / container / ukuran estimasi berubah
    try {
      rowVirtualizer.measure();
    } catch (err) {
      // ignore if measure not available in runtime
    }
  }, [enableVirtualization, rowVirtualizer, rows.length, estimateRowHeight, virtualizedHeight]);


  // Effect to sync pagination state when props change
  // Sync pagination but only when values actually change (prevent infinite loops)
  useEffect(() => {
    setPagination(prev => {
      const newPageIndex = Math.max(0, localCurrentPage - 1);
      const newPageSize = parseInt(localPageSize, 10) || pageSize;
      if (prev.pageIndex === newPageIndex && prev.pageSize === newPageSize) {
        return prev;
      }
      return { pageIndex: newPageIndex, pageSize: newPageSize };
    });
  }, [localCurrentPage, localPageSize, pageSize]);


  // Watch for external prop changes
  useEffect(() => {
    if (currentPage !== localCurrentPage) {
      setLocalCurrentPage(currentPage);
      setPagination(prev => {
        if (prev.pageIndex === currentPage - 1) return prev;
        return { ...prev, pageIndex: currentPage - 1 };
      });
    }
  }, [currentPage]);

  useEffect(() => {
    const pageSizeStr = pageSize.toString();
    if (pageSizeStr !== localPageSize) {
      setLocalPageSize(pageSizeStr);
      setPagination(prev => {
        if (prev.pageSize === pageSize) return prev;
        return { ...prev, pageSize };
      });
    }
  }, [pageSize]);

  // --- safer sync for column sizing to avoid infinite loops ---
  const prevColumnSizingStrRef = useRef<string | null>(null);

  // stable stringify that sorts object keys (to avoid ordering diffs)
  const stableStringify = useCallback((obj: any): string => {
    const seen = new WeakSet();

    const stringifySorted = (value: any): string => {
      if (value !== null && typeof value === 'object') {
        if (seen.has(value)) return '"[Circular]"';
        seen.add(value);

        if (Array.isArray(value)) {
          return '[' + value.map(stringifySorted).join(',') + ']';
        }

        const keys = Object.keys(value).sort();
        return '{' + keys.map(k => JSON.stringify(k) + ':' + stringifySorted(value[k])).join(',') + '}';
      } else {
        return JSON.stringify(value);
      }
    };

    return stringifySorted(obj);
  }, []);

  // Replace previous simple effect with this guarded one
  useEffect(() => {
    try {
      const nextStr = stableStringify(columnSizing);

      // if identical to previous serialized value, do nothing
      if (prevColumnSizingStrRef.current === nextStr) return;

      // update ref first so reentrancy won't loop
      prevColumnSizingStrRef.current = nextStr;

      // update local state only if different from current (double-guard)
      setLocalColumnSizing(prev => {
        const prevStr = stableStringify(prev);
        if (prevStr === nextStr) return prev;
        return { ...columnSizing };
      });
    } catch (err) {
      // fallback: if stringify fails for some reason, still set once
      setLocalColumnSizing(prev => {
        // try prevent unnecessary set if identical by reference
        if (prev === columnSizing) return prev;
        return { ...columnSizing };
      });
    }
  }, [columnSizing, stableStringify]);


  // Setup ResizeObserver
  useEffect(() => {
    if (tableContainerRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        // Reserved for responsive behaviors
      });
      resizeObserverRef.current.observe(tableContainerRef.current);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }

      if (isResizing) {
        setIsResizing(false);
        setResizingColumn(null);
      }
    };
  }, []);

  // Utility to stop header sorting when interacting with inputs
  const stopHeaderSort: React.DOMAttributes<HTMLElement> = {
    onClick: (e) => e.stopPropagation(),
    onMouseDown: (e) => e.stopPropagation(),
    onDoubleClick: (e) => e.stopPropagation(),
    onFocus: (e) => e.stopPropagation(),
    onKeyDown: (e) => e.stopPropagation(),
  };

  // Show Entries Component
  const ShowEntriesControl = () => (
    <div className="flex items-center space-x-2 pointer-events-auto">
      <span className="text-sm text-[#2C4031] whitespace-nowrap">Tampilkan</span>
      <Select value={localPageSize} onValueChange={handlePageSizeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Page Size" />
        </SelectTrigger>
        <SelectContent>
          {pageSizeOptions.map((size) => (
            <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-sm text-[#2C4031] whitespace-nowrap">data</span>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <p>{error}</p>
        <Button onClick={() => onRetry?.()} className="mt-4">
          Ulang
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls Container */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Show Entries - Dynamic Position */}
        {showEntriesPosition === 'top-left' ? (
          <ShowEntriesControl />
        ) : (
          <div className="flex-1"></div>
        )}

        {/* Global Search */}
        {enableGlobalFilter && (
          <div className="flex items-center space-x-2">
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={(value) => {
                setGlobalFilter(String(value));
                handleGlobalFilterChange(String(value));
              }}
              placeholder="Cari..."
              className="max-w-sm flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-[#2C4031] ring-offset-grey placeholder:text-[#2C4031] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Global search"
            />
            {globalFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearGlobalFilter}
                aria-label="Clear search"
                className='bg-[#2C4031] cursor-pointer'
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {showEntriesPosition === 'top-right' && <ShowEntriesControl />}
      </div>

      {/* Table Container with Custom Classes */}
      <div
        className={`rounded-md border border-gray-500 overflow-hidden w-full ${tableContainerClass}`}
        style={{ width: '100%', ...tableContainerStyle }}
      >
        {/* Virtualized Table */}
        {enableVirtualization ? (
          <div
            ref={tableContainerRef}
            className={`overflow-auto relative ${tableClass}`}
            style={{
              height: virtualizedHeight,
              ...tableStyle
            }}
            role="table"
            aria-label="Data table with virtualization"
          >
            <div style={{ height: virtualRows.length > 0 ? `${totalSize}px` : 'auto' }}>
              {/* Using semantic table with CSS Grid for virtualization */}
              <table
                style={{
                  display: 'grid',
                  width: '100%',
                  minWidth: `${totalMinWidth}px`,
                  tableLayout: 'fixed'
                }}
                className="w-full"
              >
                {/* Sticky Header */}
                <thead
                  style={{
                    display: 'grid',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                  }}
                  className="bg-muted/50 backdrop-blur-sm"
                >
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      style={{
                        display: 'flex',
                        width: '100%',
                        minWidth: `${totalMinWidth}px`
                      }}
                      role="row"
                    >
                      {headerGroup.headers.map((header) => {
                        const sortHandler = header.column.getToggleSortingHandler();
                        return (
                          <th
                            key={header.id}
                            colSpan={header.colSpan}
                            style={getVirtualizedColumnStyle(header.column.id)}
                            className={`p-2 text-left text-[#2C4031] font-medium border-r bg-muted/50 relative ${header.column.getCanSort() ? 'hover:bg-muted/70' : ''
                              }`}
                            role="columnheader"
                            aria-sort={getAriaSortValue(header.column)}
                          >
                            <div
                              className={`flex items-center justify-between min-h-[2rem] ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
                              onClick={(e) => { e.stopPropagation(); if (header.column.getCanSort()) sortHandler?.(e as any); }}
                              onKeyDown={(e) => { if (e.key === 'Enter' && header.column.getCanSort()) { e.preventDefault(); sortHandler?.(e as any); } }}
                              tabIndex={header.column.getCanSort() ? 0 : -1}
                              aria-label={header.column.getCanSort() ? 'Toggle sort' : undefined}
                            >
                              {!header.isPlaceholder && (
                                <>
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </>
                              )}
                              {header.column.getCanSort() && (
                                <div className="flex flex-col ml-2">
                                  <ChevronUp
                                    className={`h-3 w-3 transition-colors ${header.column.getIsSorted() === 'asc' ? 'text-foreground' : 'text-muted-foreground'
                                      }`}
                                  />
                                  <ChevronDown
                                    className={`h-3 w-3 transition-colors -mt-1 ${header.column.getIsSorted() === 'desc' ? 'text-foreground' : 'text-muted-foreground'
                                      }`}
                                  />
                                </div>
                              )}
                            </div>
                            {/* Column Filter */}
                            {!header.isPlaceholder && header.column.getCanFilter() && enableColumnFilters && (
                              <div className="mt-2">
                                <Filter column={header.column} table={table} />
                              </div>
                            )}
                            {/* Column Resizer */}
                            {enableColumnResize && (
                              <div
                                className="absolute right-0 top-0 h-full w-1 bg-border cursor-col-resize hover:bg-primary"
                                onMouseDown={(e) => startResize(e, header.column.id)}
                              />
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>

                {/* Virtualized Table Body */}
                <tbody style={{ display: 'grid', position: 'relative' }} role="rowgroup">
                  {virtualRows.length > 0 ? (
                    virtualRows.map((virtualRow) => {
                      const row = rows[virtualRow.index];
                      if (!row) return null;
                      return (
                        <tr
                          key={row.id}
                          data-index={virtualRow.index}
                          style={{
                            display: 'flex',
                            position: 'absolute',
                            transform: `translateY(${virtualRow.start}px)`,
                            width: '100%',
                            minWidth: `${totalMinWidth}px`,
                            height: `${virtualRow.size}px`
                          }}
                          data-state={row.getIsSelected() ? 'selected' : undefined}
                          className={`border-b transition-colors hover:bg-muted/50 ${row.getIsSelected() ? 'bg-muted' : ''}`}
                          role="row"
                          aria-selected={row.getIsSelected()}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} style={getVirtualizedColumnStyle(cell.column.id)} className="p-2 border-r flex items-center overflow-hidden" role="cell">
                              <div className="truncate w-full">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </div>
                            </td>
                          ))}
                        </tr>
                      );
                    })
                  ) : rows.length > 0 ? (
                    // fallback: render normal (non-absolute) rows while virtualizer belum ready
                    rows.map((row) => (
                      <tr key={row.id} style={{ display: 'flex', width: '100%', minWidth: `${totalMinWidth}px` }} data-state={row.getIsSelected() ? 'selected' : undefined} className={`border-b transition-colors hover:bg-muted/50 ${row.getIsSelected() ? 'bg-muted' : ''}`} role="row" aria-selected={row.getIsSelected()}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} style={getVirtualizedColumnStyle(cell.column.id)} className="p-2 border-r flex items-center overflow-hidden" role="cell">
                            <div className="truncate w-full">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
                      <td colSpan={columns.length} className="h-24 text-center text-muted-foreground" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="flex flex-col items-center space-y-2">
                          <div className="text-lg">🔭</div>
                          <div>{emptyMessage}</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Non-Virtualized Table */
          <div className={`overflow-auto ${tableClass}`} style={tableStyle}>
            <Table
              className="relative w-full"
              style={{
                width: '100%',
                minWidth: `${totalMinWidth}px`,
                tableLayout: 'auto'
              }}
            >
              <TableHeader className="bg-muted/50 backdrop-blur-sm sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} role="row">
                    {headerGroup.headers.map((header) => {
                      const sortHandler = header.column.getToggleSortingHandler();
                      return (
                        <TableHead
                          key={header.id}
                          className={`p-2 relative ${header.column.getCanSort() ? 'hover:bg-muted/70' : ''}`}
                          style={getNonVirtualizedColumnStyle(header.column.id)}
                          role="columnheader"
                          aria-sort={getAriaSortValue(header.column)}
                        >
                          <div
                            className={`flex items-center justify-between min-h-[2rem] ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
                            onClick={(e) => { e.stopPropagation(); if (header.column.getCanSort()) sortHandler?.(e as any); }}
                            onKeyDown={(e) => { if (e.key === 'Enter' && header.column.getCanSort()) { e.preventDefault(); sortHandler?.(e as any); } }}
                            tabIndex={header.column.getCanSort() ? 0 : -1}
                            aria-label={header.column.getCanSort() ? 'Toggle sort' : undefined}
                          >
                            {!header.isPlaceholder && (
                              <>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </>
                            )}
                            {header.column.getCanSort() && (
                              <div className="flex flex-col ml-2">
                                <ChevronUp
                                  className={`h-3 w-3 transition-colors ${header.column.getIsSorted() === 'asc' ? 'text-foreground' : 'text-muted-foreground'}`}
                                />
                                <ChevronDown
                                  className={`h-3 w-3 transition-colors -mt-1 ${header.column.getIsSorted() === 'desc' ? 'text-foreground' : 'text-muted-foreground'}`}
                                />
                              </div>
                            )}
                          </div>
                          {/* Column Filter */}
                          {!header.isPlaceholder && header.column.getCanFilter() && enableColumnFilters && (
                            <div className="mt-2">
                              <Filter column={header.column} table={table} />
                            </div>
                          )}
                          {/* Column Resizer */}
                          {enableColumnResize && (
                            <div
                              className="absolute right-0 top-0 h-full w-1 bg-border cursor-col-resize hover:bg-primary"
                              onMouseDown={(e) => startResize(e, header.column.id)}
                            />
                          )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() ? 'selected' : undefined}
                      className={`transition-colors hover:bg-muted/50 ${row.getIsSelected() ? 'bg-muted' : ''}`}
                      role="row"
                      aria-selected={row.getIsSelected()}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="p-2"
                          style={getNonVirtualizedColumnStyle(cell.column.id)}
                          role="cell"
                        >
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
                      colSpan={columns.length}
                      className="h-24 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className="text-lg">🔭</div>
                        <div>{emptyMessage}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-[#2C4031]">
        {/* Show Entries Info & Dynamic Position */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="text-sm text-[#2C4031]">
            Menampilkan {startEntry} sampai {endEntry} dari {totalEntries} seluruh data
            {/* {table.getFilteredRowModel().rows.length !== totalEntries && (
              // <span>
              //   {' '}(filtered from {originalTotalEntries} total entries)
              // </span>
            )} */}
          </div>

          {/* Show Entries - Bottom Left */}
          {showEntriesPosition === 'bottom-left' && <ShowEntriesControl />}
        </div>

        {/* Pagination & Show Entries (Bottom Right) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Show Entries - Bottom Right */}
          {showEntriesPosition === 'bottom-right' && <ShowEntriesControl />}

          {/* Pagination */}
          <nav role="navigation" aria-label="Table pagination">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToFirstPage}
                disabled={!canPreviousPage}
                aria-label="Go to first page"
              >
                Pertama
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={!canPreviousPage}
                aria-label="Go to previous page"
              >
                Sebelumnya
              </Button>
              <span className="flex items-center gap-1">
                <div className="text-sm text-[#2C4031] whitespace-nowrap">
                  Halaman {localCurrentPage} dari {totalPages}
                </div>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={!canNextPage}
                aria-label="Go to next page"
              >
                Selanjutnya
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToLastPage}
                disabled={!canNextPage}
                aria-label="Go to last page"
              >
                Terakhir
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
