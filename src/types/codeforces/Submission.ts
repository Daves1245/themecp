/*
 *
 * Submission
 *
 */

import Problem from '@/types/codeforces/Problem';

export enum Verdict {
    FAILED = "FAILED",
    OK = "OK",
    PARTIAL = "PARTIAL",
    COMPILATION_ERROR = "COMPILATION_ERROR",
    RUNTIME_ERROR = "RUNTIME_ERROR",
    WRONG_ANSWER = "WRONG_ANSWER",
    TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED",
    MEMORY_LIMIT_EXCEEDED = "MEMORY_LIMIT_EXCEEDED",
    IDLENESS_LIMIT_EXCEEDED = "IDLENESS_LIMIT_EXCEEDED",
    SECURITY_VIOLATED = "SECURITY_VIOLATED",
    CRASHED = "CRASHED",
    INPUT_PREPARATION_CRASHED = "INPUT_PREPARATION_CRASHED",
    CHALLENGED = "CHALLENGED",
    SKIPPED = "SKIPPED",
    TESTING = "TESTING",
    REJECTED = "REJECTED",
    SUBMITTED = "SUBMITTED"
};

// Map from Codeforces API verdict strings to our Verdict enum
export const mapApiVerdict = (apiVerdict: string): Verdict => {
    // Direct mappings from Codeforces API verdicts
    const verdictMap: { [key: string]: Verdict } = {
        "OK": Verdict.OK,
        "FAILED": Verdict.FAILED,
        "PARTIAL": Verdict.PARTIAL,
        "COMPILATION_ERROR": Verdict.COMPILATION_ERROR,
        "RUNTIME_ERROR": Verdict.RUNTIME_ERROR,
        "WRONG_ANSWER": Verdict.WRONG_ANSWER,
        "TIME_LIMIT_EXCEEDED": Verdict.TIME_LIMIT_EXCEEDED,
        "MEMORY_LIMIT_EXCEEDED": Verdict.MEMORY_LIMIT_EXCEEDED,
        "IDLENESS_LIMIT_EXCEEDED": Verdict.IDLENESS_LIMIT_EXCEEDED,
        "SECURITY_VIOLATED": Verdict.SECURITY_VIOLATED,
        "CRASHED": Verdict.CRASHED,
        "INPUT_PREPARATION_CRASHED": Verdict.INPUT_PREPARATION_CRASHED,
        "CHALLENGED": Verdict.CHALLENGED,
        "SKIPPED": Verdict.SKIPPED,
        "TESTING": Verdict.TESTING,
        "REJECTED": Verdict.REJECTED,
        "SUBMITTED": Verdict.SUBMITTED
    };

    return verdictMap[apiVerdict] || Verdict.FAILED;
};

enum Testset {
    SAMPLES = "SAMPLES",
    PRETESTS = "PRETESTS",
    TESTS = "TESTS",
    CHALLENGES = "CHALLENGES",
    TESTS1 = "TESTS1",
    TESTS2 = "TESTS2",
    TESTS3 = "TESTS3",
    TESTS4 = "TESTS4",
    TESTS5 = "TESTS5",
    TESTS6 = "TESTS6",
    TESTS7 = "TESTS7",
    TESTS8 = "TESTS8",
    TESTS9 = "TESTS9",
    TESTS10 = "TESTS10"
};

export default interface Submission {
    id: number;
    contestId?: number;
    creationTimeSeconds: number;
    relativeTimeSeconds: number;
    problem: Problem;  // Problem object
    // author: Party;     // Party object
    programmingLanguage: string;
    verdict?: Verdict;
    testset: Testset;
    passedTestCount: number;
    timeConsumedMillis: number;
    memoryConsumedBytes: number;
    points?: number;   // For IOI-like contests
};
