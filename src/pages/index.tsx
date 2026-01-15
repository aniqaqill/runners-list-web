import React from "react";
import EventsGrid from "@/components/events-grid";
import { HeroSection } from "@/components/hero-section";
import { loadEvents } from '@/utils/loadEvents';
import type { Event } from "@/types/event";

interface HomeProps {
  events: Event[];
}

export default function Home({ events }: HomeProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Stats */}
      <HeroSection events={events} />

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16 max-w-5xl -mt-4">
        {/* Events Section */}
        <section id="events">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Upcoming Events
          </h2>
          <EventsGrid events={events} />
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const events = loadEvents();
  return {
    props: {
      events,
    },
    revalidate: 3600, // ISR: revalidate every hour
  };
}