/*
 *
 * Contests
 *
 */

// Scoring system used for the contest
enum ContestType {
    CF,
        IOI,
        ICPC,
};

enum ContestPhase {
    BEFORE, CODING, PENDING_SYSTEM_TEST, SYSTEM_TEST, FINISHED,
};

export default interface Contest {
    id: number; // contest id
    name: string; //	String. Localized.
    type:	ContestType;
    phase: ContestPhase;
    frozen:	boolean; // If true, then the ranklist for the contest is frozen and shows only submissions, created before freeze.
    durationSeconds: number; // Duration of the contest in seconds.
    freezeDurationSeconds?: number; // Can be absent. The ranklist freeze duration of the contest in seconds if any.
    startTimeSeconds?: number;// Can be absent. Contest start time in unix format.
    relativeTimeSeconds?: number; // Can be absent. Number of seconds, passed after the start of the contest. Can be negative.
    preparedBy?: string; // Can be absent. Handle of the user, how created the contest.
    websiteUrl?:	string; // Can be absent. URL for contest-related website.
    description?: string; // Localized. Can be absent.
    difficulty?: number; // Can be absent. From 1 to 5. Larger number means more difficult problems.
    kind?: string; // Localized. Can be absent. Human-readable type of the contest from the following categories: Official ICPC Contest, Official School Contest, Opencup Contest, School/University/City/Region Championship, Training Camp Contest, Official International Personal Contest, Training Contest.
    icpcRegion?: string; // Localized. Can be absent. Name of the Region for official ICPC contests.
    country?: string; // Localized. Can be absent.
    city?: string; // Localized. Can be absent.
    season?: string; // Can be absent.
};
