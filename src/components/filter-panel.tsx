'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, X, Archive, Sparkles } from 'lucide-react';
import type { EventFilters } from '@/types/event';

interface FilterPanelProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
  states: string[];
  distances: string[];
  totalEvents: number;
  filteredCount: number;
  showArchived: boolean;
  onToggleArchived: () => void;
  archivedCount: number;
}

const MONTHS = [
  { value: '', label: 'All Months' },
  { value: '0', label: 'Jan' },
  { value: '1', label: 'Feb' },
  { value: '2', label: 'Mar' },
  { value: '3', label: 'Apr' },
  { value: '4', label: 'May' },
  { value: '5', label: 'Jun' },
  { value: '6', label: 'Jul' },
  { value: '7', label: 'Aug' },
  { value: '8', label: 'Sep' },
  { value: '9', label: 'Oct' },
  { value: '10', label: 'Nov' },
  { value: '11', label: 'Dec' },
];

/**
 * Clean, minimal filter panel
 */
export default function FilterPanel({
  filters,
  onFiltersChange,
  states,
  distances,
  filteredCount,
  showArchived,
  onToggleArchived,
  archivedCount,
}: FilterPanelProps) {
  const hasActiveFilters =
    filters.search ||
    filters.state ||
    filters.distance ||
    filters.month;

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar - Clean & Prominent */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search events..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors shadow-sm"
        />
        {filters.search && (
          <button
            onClick={() => onFiltersChange({ ...filters, search: '' })}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </motion.div>

      {/* Filters Row - Compact chips style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-2"
      >
        {/* Quick Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
          <button
            onClick={() => onFiltersChange({ ...filters, quickFilter: 'upcoming' })}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filters.quickFilter === 'upcoming'
                ? 'bg-white dark:bg-gray-700 text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1" />
            Upcoming
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, quickFilter: 'thisWeek' })}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filters.quickFilter === 'thisWeek'
                ? 'bg-white dark:bg-gray-700 text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, quickFilter: 'thisMonth' })}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filters.quickFilter === 'thisMonth'
                ? 'bg-white dark:bg-gray-700 text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, quickFilter: 'all' })}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filters.quickFilter === 'all'
                ? 'bg-white dark:bg-gray-700 text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />

        {/* Dropdown Filters - Compact */}
        <select
          value={filters.state}
          onChange={(e) => onFiltersChange({ ...filters, state: e.target.value })}
          className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        >
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select
          value={filters.distance}
          onChange={(e) => onFiltersChange({ ...filters, distance: e.target.value })}
          className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        >
          <option value="">All Distances</option>
          {distances.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          value={filters.month}
          onChange={(e) => onFiltersChange({ ...filters, month: e.target.value })}
          className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={() => onFiltersChange({ search: '', state: '', distance: '', month: '', quickFilter: 'upcoming' })}
            className="px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Clear
          </button>
        )}
      </motion.div>

      {/* Results count & Archive toggle */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredCount}</span> events
        </span>

        {archivedCount > 0 && (
          <button
            onClick={onToggleArchived}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              showArchived
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                : 'text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Archive className="w-4 h-4" />
            {showArchived ? 'Hide' : 'Show'} past events ({archivedCount})
          </button>
        )}
      </div>
    </div>
  );
}
