import eventsData from '../../data/events.json';
import type { Event } from '@/types/event';

/**
 * Load events from the static JSON file
 * Sorts by date (upcoming first) and filters out past events optionally
 */
export const loadEvents = (): Event[] => {
  const events = eventsData as Event[];
  
  // Sort by date ascending (upcoming events first)
  return events.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
};

/**
 * Get unique states from events for filter dropdown
 */
export const getUniqueStates = (events: Event[]): string[] => {
  const states = events
    .map((e) => e.state)
    .filter((s) => s && s.trim() !== '');
  return [...new Set(states)].sort();
};

/**
 * Get unique distances from events for filter chips
 */
export const getUniqueDistances = (events: Event[]): string[] => {
  const distances = events
    .map((e) => e.distance)
    .filter((d) => d && d.trim() !== '');
  return [...new Set(distances)].sort((a, b) => {
    // Sort by numeric value
    const numA = parseInt(a) || 999;
    const numB = parseInt(b) || 999;
    return numA - numB;
  });
};

/**
 * Check if event has ended
 */
export const isEventEnded = (dateString: string): boolean => {
  const eventDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate < today;
};

/**
 * Check if event is this week
 */
export const isThisWeek = (dateString: string): boolean => {
  const eventDate = new Date(dateString);
  const today = new Date();
  const weekFromNow = new Date(today);
  weekFromNow.setDate(today.getDate() + 7);
  return eventDate >= today && eventDate <= weekFromNow;
};

/**
 * Check if event is this month
 */
export const isThisMonth = (dateString: string): boolean => {
  const eventDate = new Date(dateString);
  const today = new Date();
  return (
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Format date for display
 */
export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-MY', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get days until event
 */
export const getDaysUntil = (dateString: string): number => {
  const eventDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = eventDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};