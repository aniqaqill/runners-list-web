import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import events from "../../data/events-manual.json"; // Import the JSON data
  import { Button } from "@/components/ui/button"

  export function ButtonGhost() {
    return <Button variant="ghost">Ghost</Button>
  }
  


import { Link } from 'lucide-react';
  
  export default function EventsTable() {
    return (
      <div className="container mx-auto mt-5 max-w-4xl shadow-md overflow-hidden">
        <Table className="min-w-full border border-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead className="border-b border-gray-200">Event Name</TableHead>
              <TableHead className="border-b border-gray-200">Location</TableHead>
              <TableHead className="border-b border-gray-200">Date</TableHead>
              <TableHead className="border-b border-gray-200 text-right">Registration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index} className="border-b border-gray-200">
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell className="text-right">
                  <a
                    href={event.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost"><Link/></Button>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }