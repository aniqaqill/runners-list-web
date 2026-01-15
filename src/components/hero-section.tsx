'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Calendar, ChevronDown, Zap } from 'lucide-react';
import type { Event } from '@/types/event';
import { isEventEnded, isThisWeek } from '@/utils/loadEvents';

interface HeroWithStatsProps {
  events: Event[];
}

/**
 * Get unique states count from events
 */
const getStatesCount = (events: Event[]): number => {
  const states = events.filter((e) => e.state).map((e) => e.state);
  return new Set(states).size;
};

/**
 * Combined Hero + Stats section with extended gradient
 */
export function HeroSection({ events }: HeroWithStatsProps) {
  const upcomingEvents = events.filter((e) => !isEventEnded(e.date));
  const thisWeekEvents = events.filter((e) => isThisWeek(e.date));
  const statesCount = getStatesCount(events);

  const stats = [
    { label: 'Total', value: events.length, icon: Calendar },
    { label: 'Upcoming', value: upcomingEvents.length, icon: TrendingUp },
    { label: 'This Week', value: thisWeekEvents.length, icon: Zap },
    { label: 'States', value: statesCount, icon: MapPin },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Extended gradient background - flows into events section */}
      <div className="absolute inset-0 h-[600px] md:h-[700px] bg-gradient-to-b from-purple-50 via-purple-50/50 to-transparent dark:from-purple-950/40 dark:via-purple-950/20 dark:to-transparent" />
      
      {/* Decorative blurs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/40 dark:bg-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute top-48 -left-24 w-80 h-80 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Content */}
      <div className="relative pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100/80 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-medium mb-6 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500" />
              </span>
              2026 Events Updated
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-3 text-foreground">
              Malaysia{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Runners List
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto">
              Discover running events across Malaysia. Filter by state, distance, and date.
            </p>

            {/* CTA */}
            <motion.a
              href="#events"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-medium shadow-lg hover:opacity-90 transition-all"
            >
              Browse Events
              <ChevronDown className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>

        {/* Stats - Inside gradient background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="container mx-auto px-4 mt-12 max-w-3xl"
        >
          <div className="flex justify-center gap-8 md:gap-12 p-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <stat.icon className="w-3 h-3" />
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Keep default export for backward compatibility
export default function StatsSection() {
  // Stats are now integrated into HeroSection
  return null;
}
