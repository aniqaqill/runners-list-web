import type { Event } from '@/types/event';

/**
 * Load events from the API
 * Sorts by date (upcoming first) and filters out past events optionally
 */
export const loadEvents = async (): Promise<Event[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Helper to sort events
  const sortEvents = (data: Event[]) => {
    return data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  };

  // Try fetching from API if URL is present
  if (apiUrl) {
    try {
      // Append /events if the URL doesn't already end with it, just to be safe
      // but assuming the var is the base API v1 url: http://IP:8080/api/v1
      const res = await fetch(`${apiUrl}/events`, { next: { revalidate: 60 } });
      if (res.ok) {
        const remoteEvents = await res.json();
        if (Array.isArray(remoteEvents)) {
          return sortEvents(remoteEvents);
        }
      }
      console.error('API returned non-array:', res.statusText);
    } catch (err) {
      console.error('Failed to fetch events from API:', err);
    }
  }

  // Return empty array if API fails or no URL
  return [];
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