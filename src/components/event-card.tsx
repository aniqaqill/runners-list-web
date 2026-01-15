'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Timer } from 'lucide-react';
import type { Event } from '@/types/event';
import { formatEventDate, getDaysUntil, isEventEnded } from '@/utils/loadEvents';

interface EventCardProps {
  event: Event;
  index: number;
}

/**
 * Get color scheme for distance badge
 */
const getDistanceColor = (distance: string): string => {
  if (!distance) return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
  if (distance.includes('5km')) return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400';
  if (distance.includes('10km')) return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
  if (distance.includes('21km')) return 'bg-purple-500/20 text-purple-600 dark:text-purple-400';
  if (distance.includes('42km')) return 'bg-orange-500/20 text-orange-600 dark:text-orange-400';
  if (distance.includes('50km') || distance.includes('Ultra')) return 'bg-red-500/20 text-red-600 dark:text-red-400';
  return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
};

/**
 * Premium Event Card with glassmorphism design
 */
export default function EventCard({ event, index }: EventCardProps) {
  const ended = isEventEnded(event.date);
  const daysUntil = getDaysUntil(event.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300 ${
        ended
          ? 'bg-gray-100/50 dark:bg-gray-900/50 opacity-60'
          : 'bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/10'
      }`}
    >
      {/* Gradient Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-5">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-lg text-foreground leading-tight line-clamp-2">
            {event.name}
            {ended && (
              <span className="ml-2 text-xs text-red-500 font-normal">(Ended)</span>
            )}
          </h3>

          {/* Days Until Badge */}
          {!ended && daysUntil <= 14 && daysUntil > 0 && (
            <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
              {daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
            </span>
          )}
        </div>

        {/* Info Row */}
        <div className="space-y-2 mb-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{formatEventDate(event.date)}</span>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Distance Badge */}
          {event.distance && (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getDistanceColor(event.distance)}`}
            >
              <Timer className="w-3 h-3" />
              {event.distance}
            </span>
          )}

          {/* State Badge */}
          {event.state && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {event.state}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <a
          href={event.registration_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            ended
              ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed pointer-events-none'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg hover:shadow-purple-500/25'
          }`}
        >
          <ExternalLink className="w-4 h-4" />
          {ended ? 'Event Ended' : 'Register Now'}
        </a>
      </div>
    </motion.div>
  );
}
