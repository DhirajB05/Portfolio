import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const USERNAME = process.env.GITHUB_USERNAME || 'DhirajB05';
const TOKEN = process.env.GITHUB_TOKEN;
const OUT_FILE = resolve(process.cwd(), 'public/contributions.json');

const daysAgoIso = (days) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString();
};

const computeLevels = (days) => {
  const positive = days
    .map((d) => d.count)
    .filter((c) => c > 0)
    .sort((a, b) => a - b);
  const quartile = (p) =>
    positive.length > 0 ? positive[Math.min(positive.length - 1, Math.floor(p * positive.length))] : 0;
  const [q1, q2, q3] = [quartile(0.25), quartile(0.5), quartile(0.75)];
  return days.map((d) => ({
    ...d,
    level: d.count === 0 ? 0 : d.count <= q1 ? 1 : d.count <= q2 ? 2 : d.count <= q3 ? 3 : 4,
  }));
};

const fromGraphQL = async () => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query($from: DateTime!, $to: DateTime!) {
        user(login: "${USERNAME}") {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }`,
      variables: { from: daysAgoIso(364), to: new Date().toISOString() },
    }),
  });
  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`);
  }
  const { data, errors } = await response.json();
  if (errors?.length) {
    throw new Error(`GraphQL errors: ${errors.map((e) => e.message).join('; ')}`);
  }
  const calendar = data.user.contributionsCollection.contributionCalendar;
  const days = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date.slice(0, 10),
      count: day.contributionCount,
    }))
  );
  return { total: calendar.totalContributions, days: computeLevels(days), source: 'graphql' };
};

const fromPublicApi = async () => {
  const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`);
  if (!response.ok) {
    throw new Error(`Public API request failed: ${response.status}`);
  }
  const data = await response.json();
  return {
    total: data.total.lastYear,
    days: data.contributions.map((c) => ({ date: c.date, count: c.count, level: c.level })),
    source: 'public-api',
  };
};

const buildSnapshot = TOKEN ? await fromGraphQL() : await fromPublicApi();

const snapshot = {
  username: USERNAME,
  generatedAt: new Date().toISOString(),
  ...buildSnapshot,
};

mkdirSync(dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, `${JSON.stringify(snapshot)}\n`);
console.log(`Wrote ${OUT_FILE} (${snapshot.days.length} days, ${snapshot.total} contributions, via ${snapshot.source})`);
