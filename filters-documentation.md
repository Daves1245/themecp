# Codeforces Problem Filter System Documentation

## Overview

The filter system manages and organizes Codeforces problem data for efficient querying and visualization. It processes user submissions and contest data to create various indices that power the application's features like the heatmap, problem statistics, and problem browsing.

## Data Structure Design

### Core Indices

1. **Status Index (`byStatus`)**
   - Purpose: Track solved/unsolved problems
   - Implementation: Two Sets of problem IDs
   - Why necessary: Core feature for tracking progress
   - Performance: O(1) lookups
   ```typescript
   byStatus: {
     solved: Set<string>,    // Problems successfully solved
     unsolved: Set<string>   // Problems attempted but not solved
   }
   ```

2. **Tag Index (`byTag`)**
   - Purpose: Group problems by their topic tags
   - Implementation: Map of tag -> Set of problem IDs
   - Why necessary: Enables topic-based problem discovery
   - Performance: O(1) lookups for tag queries
   ```typescript
   byTag: Map<string, Set<string>>
   ```

3. **Rating Index (`byRating`)**
   - Purpose: Group problems by difficulty rating
   - Implementation: Map of rating bucket -> Set of problem IDs
   - Why necessary: Powers difficulty distribution visualizations
   - Performance: O(1) lookups for rating queries
   - Note: Ratings are bucketed by 100s for efficient grouping
   ```typescript
   byRating: Map<number, Set<string>>
   ```

4. **Contest Index (`byContest`)**
   - Purpose: Track problems by their contest
   - Implementation: Map of contest ID -> Set of problem IDs
   - Why necessary: Contest-based problem grouping
   - Performance: O(1) lookups for contest queries
   ```typescript
   byContest: Map<number, Set<string>>
   ```

5. **Time Index (`byTime`)**
   - Purpose: Chronological tracking of submissions
   - Implementation: Array of submission entries
   - Why necessary: Powers time-based visualizations
   - Performance: O(n) for time range queries
   ```typescript
   byTime: {
     submissions: Array<{
       problemId: string,
       timestamp: number,
       contestId?: number,
       verdict?: Verdict
     }>
   }
   ```

6. **Date Index (`byDate`)**
   - Purpose: Daily problem-solving tracking
   - Implementation: Map of date strings -> problem sets and max rating
   - Why necessary: Powers the heatmap visualization
   - Performance: O(1) lookups for date queries
   ```typescript
   byDate: {
     [date: string]: {
       problems: Set<string>,
       maxRating: number
     }
   }
   ```

## Filter Initialization Process

1. **Validation Phase**
   - Validates submission data integrity
   - Filters out invalid submissions
   - Creates unique problem IDs

2. **Initial Classification**
   - Marks all problems as unsolved initially
   - Creates problem status tracking objects
   - Initializes contest timing data

3. **Chronological Processing**
   - Sorts submissions by timestamp
   - Updates problem statuses
   - Builds indices progressively
   - Handles status transitions (unsolved -> solved)

## Performance Optimizations

1. **Data Structure Choices**
   - Uses Sets for O(1) lookups
   - Maintains unique problem IDs
   - Optimizes memory usage with shared references

2. **Processing Efficiency**
   - Single-pass submission processing
   - Minimal data duplication
   - Efficient date string handling
   - Rating bucket optimization

3. **Memory Considerations**
   - Shared problem ID references
   - Efficient index structures
   - Minimal redundant data

## Usage Examples

1. **Getting Problems by Tag**
   ```typescript
   const dpProblems = filters.byTag.get('dp') || new Set();
   ```

2. **Checking Problem Status**
   ```typescript
   const isSolved = filters.byStatus.solved.has(problemId);
   ```

3. **Getting Daily Statistics**
   ```typescript
   const dayStats = filters.byDate[dateString];
   const problemCount = dayStats?.problems.size || 0;
   const maxRating = dayStats?.maxRating || 0;
   ```

## Validation and Error Handling

1. **Submission Validation**
   ```typescript
   function validateSubmission(submission: Submission): boolean {
     return !!(
       submission &&
       submission.problem &&
       typeof submission.creationTimeSeconds === 'number' &&
       submission.verdict !== undefined
     );
   }
   ```

2. **Date Handling**
   ```typescript
   function getDateString(timestamp: number): string {
     const date = new Date(timestamp * 1000);
     return date.toISOString().split('T')[0];
   }
   ```

## Performance Monitoring

The system includes comprehensive performance monitoring:
- Initialization timing
- Submission processing timing
- Filter operation timing
- Statistics logging

Example statistics:
```typescript
{
  totalSubmissions: number,
  invalidSubmissions: number,
  uniqueProblems: number,
  solvedProblems: number,
  unsolvedProblems: number,
  uniqueTags: number,
  ratingBuckets: number,
  contests: number,
  dates: number
}
```

## Integration Points

1. **Problem Heatmap**
   - Uses byDate index
   - Shows daily problem-solving activity
   - Color-codes by max rating

2. **Problem Statistics**
   - Uses byRating and byTag indices
   - Shows problem distribution
   - Tracks solving progress

3. **Problem Lists**
   - Uses all indices for filtering
   - Supports complex queries
   - Enables efficient problem discovery