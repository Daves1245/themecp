import { Problem, ProblemType } from '../codeforces/Problem';
import Submission, { Verdict } from '../codeforces/Submission';
import Contest from '../codeforces/Contest';

export interface ProblemStatus {
  solved: boolean;
  attempts: number;
  lastSubmission: number;
  duringContest: boolean;
  lastVerdict?: Verdict;
  problemType?: ProblemType;
  rating?: number;
  tags: string[];
}

export interface DailyProblemMap {
  [date: string]: {
    problems: Set<string>;  // Changed from array to Set for O(1) lookups
    maxRating: number;
  }
}

export interface FilteredProblems {
  byStatus: {
    solved: Set<string>;
    unsolved: Set<string>;
  };
  byTag: Map<string, Set<string>>;
  byRating: Map<number, Set<string>>;
  byContest: Map<number, Set<string>>;
  byTime: {
    submissions: Array<{
      problemId: string;
      timestamp: number;
      contestId?: number;
      verdict?: Verdict;
    }>;
  };
  byDate: DailyProblemMap;
}

function getDateString(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toISOString().split('T')[0];
}

function validateSubmission(submission: Submission): boolean {
  return !!(
    submission &&
    submission.problem &&
    typeof submission.creationTimeSeconds === 'number' &&
    submission.verdict !== undefined
  );
}

function getRatingBucket(rating: number): number {
  return Math.round(rating / 100) * 100;
}

export function initializeFilters(submissions: Submission[], contests: Contest[]): FilteredProblems {

  console.log("Initialize filters called with submissions: ", submissions);

  console.time('filter-initialization');

  const filters: FilteredProblems = {
    byStatus: {
      solved: new Set(),
      unsolved: new Set()
    },
    byTag: new Map(),
    byRating: new Map(),
    byContest: new Map(),
    byTime: {
      submissions: []
    },
    byDate: {}
  };

  const contestTimes = new Map(
    contests
      .filter(contest => contest.startTimeSeconds && contest.durationSeconds)
      .map(contest => [
        contest.id,
        {
          start: contest.startTimeSeconds!,
          end: contest.startTimeSeconds! + contest.durationSeconds!
        }
      ])
  );

  const processedProblems = new Map<string, ProblemStatus>();
  let invalidSubmissions = 0;

  for (const submission of submissions) {
    if (!validateSubmission(submission)) {
      invalidSubmissions++;
      continue;
    }

    const problemId = submission.contestId
      ? `${submission.contestId}-${submission.problem.index}`
      : `${submission.problem.index}`;

    if (!processedProblems.has(problemId)) {
      filters.byStatus.unsolved.add(problemId);
      processedProblems.set(problemId, {
        solved: false,
        attempts: 0,
        lastSubmission: 0,
        duringContest: false,
        tags: submission.problem.tags || [],
        problemType: submission.problem.type,
        rating: submission.problem.rating
      });
    }
  }

  console.time('submission-processing');
  const sortedSubmissions = [...submissions]
    .filter(validateSubmission)
    .sort((a, b) => a.creationTimeSeconds - b.creationTimeSeconds);

  for (const submission of sortedSubmissions) {
    const problemId = submission.contestId
      ? `${submission.contestId}-${submission.problem.index}`
      : `${submission.problem.index}`;

    const status = processedProblems.get(problemId)!;

    status.attempts++;
    status.lastSubmission = submission.creationTimeSeconds;
    status.lastVerdict = submission.verdict;

    console.log("Comparing verdict to verdict OK: ", submission.verdict === Verdict.OK);

    if (submission.verdict === Verdict.OK && !status.solved) {
      status.solved = true;
      filters.byStatus.unsolved.delete(problemId);
      filters.byStatus.solved.add(problemId);

      if (submission.contestId) {
        const contestTime = contestTimes.get(submission.contestId);
        if (contestTime) {
          status.duringContest =
            submission.creationTimeSeconds >= contestTime.start &&
            submission.creationTimeSeconds <= contestTime.end;
        }
      }

      const date = getDateString(submission.creationTimeSeconds);
      if (!filters.byDate[date]) {
        filters.byDate[date] = {
          problems: new Set(),
          maxRating: 0
        };
      }
      filters.byDate[date].problems.add(problemId);
      if (submission.problem.rating) {
        filters.byDate[date].maxRating = Math.max(
          filters.byDate[date].maxRating,
          submission.problem.rating
        );
      }
    }

    filters.byTime.submissions.push({
      problemId,
      timestamp: submission.creationTimeSeconds,
      contestId: submission.contestId,
      verdict: submission.verdict
    });

    if (submission.problem.tags) {
      for (const tag of submission.problem.tags) {
        const problemsWithTag = filters.byTag.get(tag) || new Set();
        problemsWithTag.add(problemId);
        filters.byTag.set(tag, problemsWithTag);
      }
    }

    if (submission.problem.rating !== undefined) {
      const ratingBucket = getRatingBucket(submission.problem.rating);
      const problemsInBucket = filters.byRating.get(ratingBucket) || new Set();
      problemsInBucket.add(problemId);
      filters.byRating.set(ratingBucket, problemsInBucket);
    }

    if (submission.contestId) {
      const problemsInContest = filters.byContest.get(submission.contestId) || new Set();
      problemsInContest.add(problemId);
      filters.byContest.set(submission.contestId, problemsInContest);
    }
  }
  console.timeEnd('submission-processing');

  console.log('Filter initialization stats:', {
    totalSubmissions: submissions.length,
    invalidSubmissions,
    uniqueProblems: processedProblems.size,
    solvedProblems: filters.byStatus.solved.size,
    unsolvedProblems: filters.byStatus.unsolved.size,
    uniqueTags: filters.byTag.size,
    ratingBuckets: filters.byRating.size,
    contests: filters.byContest.size,
    dates: Object.keys(filters.byDate).length
  });

  console.timeEnd('filter-initialization');
  return filters;
}

export function getTagCounts(filters: FilteredProblems, solved: boolean): Record<string, number> {
  console.time('tag-counting');
  const tagCounts: Record<string, number> = {};
  const relevantProblems = solved ? filters.byStatus.solved : filters.byStatus.unsolved;

  for (const [tag, problems] of filters.byTag.entries()) {
    const count = Array.from(problems)
      .filter(id => relevantProblems.has(id))
      .length;
    if (count > 0) {
      tagCounts[tag] = count;
    }
  }

  console.timeEnd('tag-counting');
  return tagCounts;
}

export function getRatingCounts(filters: FilteredProblems, solved: boolean): Record<number, number> {
  console.time('rating-counting');
  const ratingCounts: Record<number, number> = {};
  const relevantProblems = solved ? filters.byStatus.solved : filters.byStatus.unsolved;

  for (const [rating, problems] of filters.byRating.entries()) {
    const count = Array.from(problems)
      .filter(id => relevantProblems.has(id))
      .length;
    if (count > 0) {
      ratingCounts[rating] = count;
    }
  }

  console.timeEnd('rating-counting');
  return ratingCounts;
}
