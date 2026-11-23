import { ActivityCalendar } from 'react-activity-calendar';
import type { Activity } from 'react-activity-calendar';

export { ActivityCalendar };
export type Contribution = Activity;

/**
 * Keeps only the trailing 12 months and sorts ascending by date.
 * Ported from devfolio-v2 `lib/github.ts` — the `next/dynamic` wrapper is
 * dropped because Vite needs no SSR escape hatch.
 */
export const filterLastYear = (
  contributions: Contribution[]
): Contribution[] => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  oneYearAgo.setHours(0, 0, 0, 0);

  const startDate = [
    oneYearAgo.getFullYear(),
    String(oneYearAgo.getMonth() + 1).padStart(2, '0'),
    String(oneYearAgo.getDate()).padStart(2, '0'),
  ].join('-');

  const endDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  return contributions
    .filter(({ date }) => date >= startDate && date <= endDate)
    .sort((a, b) => a.date.localeCompare(b.date));
};
