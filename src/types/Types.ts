import Contest from '@/types/codeforces/Contest';
import Problem, { ProblemResult } from '@/types/codeforces/Problem';
import User from '@/types/codeforces/User';
import Submission from '@/types/codeforces/Submission';
import { FilteredProblems } from './filters/problemFilters';

export type Loadable<T> =
    | { status: 'success'; data: T; prevData: T; }
    | { status: 'loading'; taskId: number; prevData?: T; }
    | { status: 'error'; message: string; }
    | { status: 'idle'; }

export default interface AppState {
    userObject: User;
    userStats: UserStats;
    filters: Loadable<FilteredProblems>;
};

export interface UserStats {
    submissions: Loadable<Array<Submission>>;
    contests: Loadable<Array<Contest>>;
};
