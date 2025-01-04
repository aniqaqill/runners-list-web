//load data from data/events folder
import fs from 'fs';
import path from 'path';

export const loadEvents = () => {
  const eventsDirectory = path.join(process.cwd(), 'data/events');
  const filenames = fs.readdirSync(eventsDirectory);
  const events = filenames.flatMap((filename) => {
    const filePath = path.join(eventsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  });
  return events;
};