/*
 *
 * Problems
 *
 */
enum ProblemType {
    PROGRAMMING, QUESTION,
};

export default interface Problem {
    contestId?: number; // Can be absent. Id of the contest, containing the problem.
    problemsetName?: string; // Can be absent. Short name of the problemset the problem belongs to.
    index: string; // Usually, a letter or letter with digit(s) indicating the problem index in a contest.
    name?: string; // Localized.
    type: ProblemType; // PROGRAMMING, QUESTION.
    points?: number; // floting point value. Can be absent. Maximum amount of points for the problem.
    rating?: number; // Can be absent. Problem rating (difficulty).
    tags: Array<string>; // list. Problem tags.
};


/*
 * If type is PRELIMINARY then points can decrease (if, for example, solution will fail during system test). 
 * Otherwise, party can only increase points for this problem by submitting better solutions.
 */
enum ProblemResultType {
    PRELIMINARY, FINAL,
};

export interface ProblemResult {
    points: number;
    penalty?: number; // penalty (in ICPC meaning) of the party for this problem. Can be absent
    rejectedAttemptCount: number; // Number of incorrect submissions
    type: ProblemResultType;
    bestSubmissionTimeSeconds?: number; // Number of seconds after the start of the contest before the submission, that brought maximal amount of points for this problem. Can be absent
};
