import { create } from 'zustand';
import AppState, { Loadable, UserStats } from './Types';
import User from './codeforces/User';
import Contest from './codeforces/Contest';
import Submission from './codeforces/Submission';
import { FilteredProblems, initializeFilters } from './filters/problemFilters';

type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, unknown>
    ? T[K] extends ArrayLike<unknown>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;

export type PathValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<T[K]>
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;

interface StoreState extends AppState {
  setUser: (user: User) => void;
  setSubmissions: (submissions: Loadable<Array<Submission>>) => void;
  setContests: (contests: Loadable<Array<Contest>>) => void;
  setFilters: (filters: Loadable<FilteredProblems>) => void;

  // Generic task management
  startLoadable: (path: Path<StoreState>) => number;
  finishLoadable: <TData>(path: Path<StoreState>, taskId: number, data: TData) => void;
  failLoadable: (path: Path<StoreState>, taskId: number, error: string) => void;
  updateLoadable: <TData>(path: Path<StoreState>, updater: (current: Loadable<TData>) => Loadable<TData>) => void;
}

const initialUserStats: UserStats = {
  submissions: { status: 'idle' },
  contests: { status: 'idle' },
};

const initialFilters: Loadable<FilteredProblems> = {
  status: 'idle'
};

type NestedObject = {
  [key: string]: NestedObject | unknown;
};

const getNestedValue = (obj: NestedObject, path: string): unknown => {
  return path.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object') {
      return (acc as NestedObject)[part];
    }
    return undefined;
  }, obj);
};

const setNestedValue = (obj: NestedObject, path: string, value: unknown): NestedObject => {
  if (path.includes('.')) {
    const [head, ...rest] = path.split('.');
    return {
      ...obj,
      [head]: setNestedValue((obj[head] as NestedObject) || {}, rest.join('.'), value)
    };
  }
  return { ...obj, [path]: value };
};

const useStore = create<StoreState>((set) => ({
  userObject: {} as User,
  userStats: initialUserStats,
  filters: initialFilters,

  setUser: (user) => set({ userObject: user }),

  setSubmissions: (submissions) =>
    set((state) => ({
      userStats: {
        ...state.userStats,
        submissions,
      }
    })),

  setContests: (contests) =>
    set((state) => ({
      userStats: {
        ...state.userStats,
        contests,
      }
    })),

  setFilters: (filters) => set({ filters }),

  startLoadable: (path) => {
    const taskId = Date.now();
    set((state) => {
      const current = getNestedValue(state, path as string);
      return setNestedValue(state, path as string, {
        status: 'loading',
        taskId,
        prevData: (current as Loadable<unknown>)?.status === 'success' 
          ? (current as Loadable<unknown>).data 
          : undefined
      });
    });
    return taskId;
  },

  finishLoadable: (path, taskId, data) => {
    set((state) => {
      const current = getNestedValue(state, path as string) as Loadable<unknown>;
      if (current?.status !== 'loading' || current?.taskId !== taskId) {
        return state;
      }
      return setNestedValue(state, path as string, {
        status: 'success',
        data,
        prevData: current.prevData || data,
      });
    });
  },

  failLoadable: (path, taskId, error) => {
    set((state) => {
      const current = getNestedValue(state, path as string) as Loadable<unknown>;
      if (current?.status !== 'loading' || current?.taskId !== taskId) {
        return state;
      }
      return setNestedValue(state, path as string, {
        status: 'error',
        message: error
      });
    });
  },

  updateLoadable: (path, updater) => {
    set((state) => {
      const current = getNestedValue(state, path as string);
      return setNestedValue(state, path as string, updater(current as Loadable<unknown>));
    });
  },
}));

export default useStore;
