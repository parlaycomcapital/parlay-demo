'use client';

import { ReactNode } from 'react';

interface TableProps {
  headers: { key: string; label: string; sortable?: boolean }[];
  children: ReactNode;
  className?: string;
}

export default function Table({ headers, children, className = '' }: TableProps) {
  return (
    <div className={`rounded-2xl bg-card/70 backdrop-blur-lg border border-slate-800/60 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50 border-b border-slate-800">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="px-4 py-3 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export function TableRow({ children, className = '' }: TableRowProps) {
  return (
    <tr className={`hover:bg-slate-900/30 transition-colors ${className}`}>
      {children}
    </tr>
  );
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export function TableCell({ children, className = '' }: TableCellProps) {
  return (
    <td className={`px-4 py-3 text-sm text-textPrimary ${className}`}>
      {children}
    </td>
  );
}

