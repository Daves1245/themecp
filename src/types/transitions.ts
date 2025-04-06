import useStore from './store';
import User from './codeforces/User';
import Contest from './codeforces/Contest';
import Submission from './codeforces/Submission';
import { initializeFilters } from './filters/problemFilters';

export async function fetchUserInfo(handle: string): Promise<User> {
  const response = await fetch(`/api/codeforces/user?handle=${handle}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch user info');
  }
  return response.json();
}

export async function fetchUserSubmissions(handle: string): Promise<Array<Submission>> {
  const store = useStore.getState();
  const taskId = store.startLoadable('userStats.submissions');
  
  try {
    const response = await fetch(`/api/codeforces/submissions?handle=${handle}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch submissions');
    }
    const data = await response.json();
    store.finishLoadable('userStats.submissions', taskId, data);
    return data;
  } catch (error) {
    store.failLoadable('userStats.submissions', taskId, error.message);
    throw error;
  }
}

export async function fetchUserContests(handle: string): Promise<Array<Contest>> {
  const store = useStore.getState();
  const taskId = store.startLoadable('userStats.contests');
  
  try {
    const response = await fetch(`/api/codeforces/contests?handle=${handle}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch contests');
    }
    const data = await response.json();
    store.finishLoadable('userStats.contests', taskId, data);
    return data;
  } catch (error) {
    store.failLoadable('userStats.contests', taskId, error.message);
    throw error;
  }
}

export async function loadUserData(handle: string): Promise<void> {
  const store = useStore.getState();
  
  try {
    // Start loading the filters
    const filtersTaskId = store.startLoadable('filters');
    
    // Load user info first
    const user = await fetchUserInfo(handle);
    store.setUser(user);
    
    // Load submissions and contests in parallel
    const [submissions, contests] = await Promise.all([
      fetchUserSubmissions(handle),
      fetchUserContests(handle)
    ]);
    
    // Initialize filters with the actual data arrays
    const filters = initializeFilters(submissions, contests);
    
    // Update app state with filters
    store.finishLoadable('filters', filtersTaskId, filters);
    
  } catch (error) {
    const store = useStore.getState();
    // If there was an error, mark the filters as failed
    if (store.filters.status === 'loading') {
      store.failLoadable('filters', store.filters.taskId, 'Failed to initialize filters');
    }
    console.error('Failed to load user data:', error);
    throw error;
  }
}