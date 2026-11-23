import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { githubConfig } from '@/config/github';
import { ActivityCalendar, filterLastYear } from '@/lib/github';
import type { Contribution } from '@/lib/github';
import { ArrowUpRight } from '@/svgs/essentials/ArrowUpRight';
import { Github as GithubSvg } from '@/svgs/socials/Github';

import { Container } from '../common/Container';
import { Heading } from '../common/Heading';

type SnapshotResponse = {
  contributions?: unknown[];
  days?: unknown[];
};

const isContribution = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/**
 * Port of devfolio-v2 `components/home/Github.tsx`.
 *
 * Stack adaptations:
 *  - `/api/github` (Next route handler) → the committed
 *    `public/contributions.json` snapshot that the repo's
 *    `update-contributions.yml` workflow refreshes daily
 *  - `next/link` → plain <a>
 *  - `WakaTimeData` → dropped (no WakaTime endpoint in this project)
 *  - shadcn <Button> → plain anchor
 */
const Github = () => {
  const { resolvedTheme } = useTheme();

  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const {
    githubLink: gitSrc,
    username,
    loadingState,
    errorState,
    blockSize,
    blockMargin,
    fontSize,
  } = githubConfig;

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await fetch(
          `${import.meta.env.BASE_URL}contributions.json`
        );

        if (!response.ok) {
          throw new Error(`Contributions snapshot returned: ${response.status}`);
        }

        const data: SnapshotResponse = await response.json();
        const raw = data.contributions ?? data.days;

        if (!Array.isArray(raw)) {
          throw new Error('Invalid GitHub contributions response');
        }

        const valid = raw.filter(isContribution).flatMap((item): Contribution[] => {
          if (
            typeof item.date !== 'string' ||
            !/^\d{4}-\d{2}-\d{2}$/.test(item.date) ||
            !Number.isFinite(Number(item.count))
          ) {
            return [];
          }

          return [
            {
              date: item.date,
              count: Number(item.count),
              level: Math.min(
                4,
                Math.max(0, Number(item.level ?? item.intensity ?? 0))
              ) as Contribution['level'],
            },
          ];
        });

        if (!valid.length) {
          throw new Error('No valid GitHub contributions found');
        }

        const lastYear = filterLastYear(valid);

        if (!lastYear.length) {
          throw new Error('No GitHub contributions found for the last year');
        }

        if (!cancelled) {
          setContributions(lastYear);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub contributions:', error);

        if (!cancelled) {
          setHasError(true);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container className="space-y-6">
      <div className="mt-5 mb-1 flex items-end justify-between md:items-center">
        <Heading as="h2" className="flex items-center gap-2">
          <GithubSvg className="size-7" />
          Github Activity
        </Heading>

        <a
          href={gitSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-1 text-[12px] font-medium md:text-lg"
        >
          <span className="relative">
            View Profile
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-right scale-x-0 bg-current transition-all duration-200 ease-out group-hover:origin-left group-hover:scale-x-100" />
          </span>

          <ArrowUpRight className="size-3 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-150 md:size-4" />
        </a>
      </div>

      <div className="flex flex-col justify-between md:flex-row">
        <p className="mb-1">
          <b>{username}</b>&apos;s GitHub contributions
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="border-primary mx-auto mb-4 size-8 animate-spin rounded-full border-2 border-t-transparent" />
            <p className="text-muted-foreground text-sm">
              {loadingState.description}
            </p>
          </div>
        </div>
      )}

      {!isLoading && hasError && (
        <div className="text-muted-foreground border-border rounded-xl border-2 border-dashed p-8 text-center">
          <div className="bg-muted mx-auto mb-4 flex size-16 items-center justify-center rounded-full">
            <GithubSvg className="size-8" />
          </div>

          <p className="mb-2 font-medium">{errorState.title}</p>
          <p className="mb-4 text-sm">{errorState.description}</p>

          <a
            href={gitSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-800 hover:text-white"
          >
            <GithubSvg className="size-4" />
            {errorState.buttonText}
          </a>
        </div>
      )}

      {!isLoading && !hasError && contributions.length > 0 && (
        <div className="relative">
          <div className="bg-background/50 mt-5 rounded-lg border-2 border-dashed border-neutral-200 p-6 backdrop-blur-sm dark:border-neutral-800">
            <div className="w-full overflow-x-auto">
              {/* w-max stops Tailwind's `svg { max-width: 100% }` preflight from
                  shrinking the calendar back down to the container width. */}
              <div className="w-max">
                <ActivityCalendar
                  data={contributions}
                  colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                  maxLevel={githubConfig.maxLevel}
                  blockSize={blockSize}
                  blockMargin={blockMargin}
                  fontSize={fontSize}
                  theme={githubConfig.theme}
                  labels={{
                    months: githubConfig.months,
                    weekdays: githubConfig.weekDays,
                  }}
                  style={{
                    color: 'rgb(139, 148, 158)',
                    margin: '0 auto',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export { Github };
export default Github;
