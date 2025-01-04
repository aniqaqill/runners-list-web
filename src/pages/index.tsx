// filepath: /Users/aniqaqil.azrai/code/runners-list-web/src/pages/index.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import EventsTable from "@/components/events-table";
import LogoAnimation from "@/components/lottie/logo-animation";
import { loadEvents } from '@/utils/loadEvents';

interface Event {
  name: string;
  location: string;
  date: string;
  registration_url: string;
}

interface HomeProps {
  events: Event[];
}

export default function Home({ events }: HomeProps) {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-20 px-4">
        {/* Hero Section */}
        <div className="container mx-auto text-center mt-20">
          <LogoAnimation />
          <h1 className="mt-5 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Your Gateway to Running Adventures in Malaysia
          </h1>
          <p className="text-lg mb-8 animate-pulse">
            Discover, Join, and Conquer the Best Running Events Across the Country
          </p>
          <a href="#list-events">
            <Button>Explore Upcoming Events</Button>
          </a>
        </div>

        {/* Events Section */}
        <div className="container mx-auto mt-16 max-w-4xl">
          <h2 id="list-events" className="text-2xl font-bold text-foreground mb-6 text-center">
            Upcoming Events
          </h2>
          <EventsTable events={events} />
        </div>

        {/* Inspirational Quote */}
        <div className="container mx-auto text-center mt-20">
          <blockquote className="pl-6 mb-8 italic text-xl">
            &quot;The only way to define your limits is by going beyond them.&quot;
          </blockquote>
        </div>
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
  };
}