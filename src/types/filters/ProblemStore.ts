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

export interface TimeIndexEntry {
  problemId: string;
  timestamp: number;
  contestId?: number;
  verdict?: Verdict;
}

export interface ContestProblemInfo {
  problems: Set<string>;
  startTime: number;
  endTime: number;
  type: Contest['type'];
}

export interface ProblemStore {
  problemStatusMap: Map<string, ProblemStatus>;
  tagIndex: Map<string, Set<string>>;
  ratingBuckets: Map<number, Set<string>>;
  timeIndex: {
    submissions: TimeIndexEntry[];
  };
  contestIndex: Map<number, ContestProblemInfo>;
}

export function createProblemStore(): ProblemStore {
  return {
    problemStatusMap: new Map(),
    tagIndex: new Map(),
    ratingBuckets: new Map(),
    timeIndex: {
      submissions: [],
    },
    contestIndex: new Map(),
  };
}

export function initializeProblemStore(
  submissions: Submission[],
  contests: Contest[]
): ProblemStore {
  const store = createProblemStore();

  // Initialize contest index first
  for (const contest of contests) {
    if (contest.startTimeSeconds && contest.durationSeconds) {
      store.contestIndex.set(contest.id, {
        problems: new Set(),
        startTime: contest.startTimeSeconds,
        endTime: contest.startTimeSeconds + contest.durationSeconds,
        type: contest.type,
      });
    }
  }

  // Process submissions in chronological order
  const sortedSubmissions = [...submissions].sort(
    (a, b) => a.creationTimeSeconds - b.creationTimeSeconds
  );

  for (const submission of sortedSubmissions) {
    if (!submission.problem) continue; // Skip if no problem data

    // Create a unique problem ID using contestId and problem index
    const problemId = submission.contestId 
      ? `${submission.contestId}-${submission.problem.index}`
      : `${submission.problem.index}`;

    // Add to time index
    store.timeIndex.submissions.push({
      problemId,
      timestamp: submission.creationTimeSeconds,
      contestId: submission.contestId,
      verdict: submission.verdict,
    });

    // Update problem status
    const currentStatus = store.problemStatusMap.get(problemId) || {
      solved: false,
      attempts: 0,
      lastSubmission: 0,
      duringContest: false,
      tags: [],
      problemType: submission.problem.type,
      rating: submission.problem.rating,
    };

    // Update status
    currentStatus.attempts++;
    currentStatus.lastSubmission = submission.creationTimeSeconds;
    currentStatus.lastVerdict = submission.verdict;
    
    if (submission.verdict === Verdict.OK) {
      currentStatus.solved = true;
      
      // Check if solved during contest
      const contestInfo = submission.contestId ? store.contestIndex.get(submission.contestId) : undefined;
      if (contestInfo) {
        currentStatus.duringContest = 
          submission.creationTimeSeconds >= contestInfo.startTime &&
          submission.creationTimeSeconds <= contestInfo.endTime;
      }
    }

    // Update tag index if problem has tags
    if (submission.problem.tags) {
      currentStatus.tags = submission.problem.tags;
      for (const tag of submission.problem.tags) {
        const problemsWithTag = store.tagIndex.get(tag) || new Set();
        problemsWithTag.add(problemId);
        store.tagIndex.set(tag, problemsWithTag);
      }
    }

    // Update rating buckets if problem has rating
    if (submission.problem.rating !== undefined) {
      currentStatus.rating = submission.problem.rating;
      // Round to nearest 100
      const ratingBucket = Math.round(submission.problem.rating / 100) * 100;
      const problemsInBucket = store.ratingBuckets.get(ratingBucket) || new Set();
      problemsInBucket.add(problemId);
      store.ratingBuckets.set(ratingBucket, problemsInBucket);
    }

    store.problemStatusMap.set(problemId, currentStatus);
  }

  return store;
}
