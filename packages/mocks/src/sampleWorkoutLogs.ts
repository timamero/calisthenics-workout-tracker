import { WorkoutLogResponse } from "@cwt/schema/workouts";

export const sampleWorkoutLogs: WorkoutLogResponse[] = [
  {
    id: 1,
    created_at: "2025-09-01T08:00:00.000Z",
    user_id: "57b33f04-60a7-46a2-959a-35a29ff35f61",
    workout_build_id: 3,
    date: "2025-09-01T08:00:00.000Z",
    title: "Morning Push Workout",
    description: "Push day with focus on chest and triceps",
    duration: "00:45:00",
    workout_data: {
      exercises: [
        {
          id: "ex1",
          exercise_id: 1,
          tracked: ["reps"],
          sets: [
            {
              id: "set1",
              fields: { reps: 10 },
              completed: true,
              completed_at: "2025-09-01T08:15:00.000Z",
            },
            {
              id: "set2",
              fields: { reps: 8 },
              completed: true,
              completed_at: "2025-09-01T08:20:00.000Z",
            },
          ],
        },
      ],
    },
    rpe: 7,
    notes: "Felt strong, good form.",
    status: "finalized",
    updated_at: "2025-09-01T09:00:00.000Z",
    goal: "strength",
  },
  {
    id: 2,
    created_at: "2025-09-02T09:00:00.000Z",
    user_id: "57b33f04-60a7-46a2-959a-35a29ff35f61",
    workout_build_id: 1,
    date: "2025-09-02T09:00:00.000Z",
    title: "Leg Day",
    description: "Squats and lunges",
    duration: "00:50:00",
    workout_data: {
      exercises: [
        {
          id: "ex2",
          exercise_id: 9,
          tracked: ["reps", "weight"],
          sets: [
            {
              id: "set3",
              fields: { reps: 12, weight: 40 },
              completed: true,
              completed_at: "2025-09-02T09:20:00.000Z",
            },
            {
              id: "set4",
              fields: { reps: 10, weight: 40 },
              completed: true,
              completed_at: "2025-09-02T09:30:00.000Z",
            },
          ],
        },
      ],
    },
    rpe: 8,
    notes: "Challenging but completed all sets.",
    status: "finalized",
    updated_at: "2025-09-02T10:00:00.000Z",
    goal: "strength",
  },
  {
    id: 3,
    created_at: "2025-09-03T10:00:00.000Z",
    user_id: "57b33f04-60a7-46a2-959a-35a29ff35f61",
    workout_build_id: 2,
    date: "2025-09-03T10:00:00.000Z",
    title: "Core Blast",
    description: "Abs and obliques",
    duration: "00:30:00",
    workout_data: {
      exercises: [
        {
          id: "ex3",
          exercise_id: 16,
          tracked: ["time"],
          sets: [
            {
              id: "set5",
              fields: { time: "00:01:00" },
              completed: true,
              completed_at: "2025-09-03T10:10:00.000Z",
            },
            {
              id: "set6",
              fields: { time: "00:01:00" },
              completed: true,
              completed_at: "2025-09-03T10:15:00.000Z",
            },
          ],
        },
      ],
    },
    rpe: 6,
    notes: "Quick and effective.",
    status: "finalized",
    updated_at: "2025-09-03T11:00:00.000Z",
    goal: "endurance",
  },
  {
    id: 4,
    created_at: "2025-09-04T11:00:00.000Z",
    user_id: "57b33f04-60a7-46a2-959a-35a29ff35f61",
    workout_build_id: 4,
    date: "2025-09-04T11:00:00.000Z",
    title: "Pull Day",
    description: "Back and biceps",
    duration: "00:55:00",
    workout_data: {
      exercises: [
        {
          id: "ex4",
          exercise_id: 5,
          tracked: ["reps"],
          sets: [
            {
              id: "set7",
              fields: { reps: 8 },
              completed: true,
              completed_at: "2025-09-04T11:20:00.000Z",
            },
            {
              id: "set8",
              fields: { reps: 8 },
              completed: true,
              completed_at: "2025-09-04T11:30:00.000Z",
            },
          ],
        },
      ],
    },
    rpe: 7,
    notes: "Good pump, focus on form.",
    status: "finalized",
    updated_at: "2025-09-04T12:00:00.000Z",
    goal: "strength",
  },
  {
    id: 5,
    created_at: "2025-09-05T12:00:00.000Z",
    user_id: "57b33f04-60a7-46a2-959a-35a29ff35f61",
    workout_build_id: 5,
    date: "2025-09-05T12:00:00.000Z",
    title: "Active Recovery",
    description: "Light stretching and mobility",
    duration: "00:20:00",
    workout_data: {
      exercises: [
        {
          id: "ex5",
          exercise_id: 20,
          tracked: ["time"],
          sets: [
            {
              id: "set9",
              fields: { time: "00:02:00" },
              completed: true,
              completed_at: "2025-09-05T12:10:00.000Z",
            },
          ],
        },
      ],
    },
    rpe: 4,
    notes: "Felt refreshed.",
    status: "finalized",
    updated_at: "2025-09-05T13:00:00.000Z",
    goal: "function",
  },
];
