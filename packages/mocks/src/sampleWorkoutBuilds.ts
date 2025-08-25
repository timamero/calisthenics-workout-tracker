import { WorkoutBuild } from "@cwt/schema/workouts";

export const sampleWorkoutBuilds: WorkoutBuild[] = [
  {
    id: 3,
    created_at: "2025-08-14T20:06:21.040461+00:00",
    user_id: "57b33f04-60a7-46a2-959a-35a29ff35f61",
    title: "workout build 1",
    description: "first workout build",
    goal: "function",
    duration: null,
    workout_data: {
      exercises: [
        {
          sets: [
            {
              fields: {
                reps: 5,
              },
              completed: false,
              completed_at: null,
            },
            {
              fields: {
                reps: 5,
                rest: "00:00:30",
              },
              completed: false,
              completed_at: null,
            },
          ],
          tracked: ["reps"],
          exercise_id: 1,
        },
        {
          sets: [
            {
              fields: {
                reps: 10,
                weight: 20,
              },
              completed: false,
              completed_at: null,
            },
            {
              fields: {
                reps: 10,
                rest: "00:00:30",
                weight: 20,
              },
              completed: false,
              completed_at: null,
            },
          ],
          tracked: ["reps", "weight"],
          exercise_id: 9,
        },
      ],
    },
    source: "manual",
    status: "draft",
    updated_at: null,
    notes: null,
  },
  {
    id: 1,
    created_at: "2025-08-14T01:43:50.237628+00:00",
    user_id: "57b33f04-60a7-46a2-959a-35a29ff35f61",
    title: "workout build 1",
    description: "first workout build",
    goal: "function",
    duration: null,
    workout_data: {
      exercises: [
        {
          sets: [
            {
              fields: {
                reps: 5,
              },
              completed: false,
              completed_at: null,
            },
            {
              fields: {
                reps: 5,
                rest: "00:00:30",
              },
              completed: false,
              completed_at: null,
            },
          ],
          tracked: ["reps"],
          exercise_id: 1,
        },
        {
          sets: [
            {
              fields: {
                reps: 10,
                weight: 20,
              },
              completed: false,
              completed_at: null,
            },
            {
              fields: {
                reps: 10,
                rest: "00:00:30",
                weight: 20,
              },
              completed: false,
              completed_at: null,
            },
          ],
          tracked: ["reps", "weight"],
          exercise_id: 9,
        },
      ],
    },
    source: "manual",
    status: "draft",
    updated_at: null,
    notes: null,
  },
  {
    id: 2,
    created_at: "2025-08-14T06:10:53.510628+00:00",
    user_id: "57b33f04-60a7-46a2-959a-35a29ff35f61",
    title: "workout build 2",
    description: "another workout build",
    goal: "endurance",
    duration: null,
    workout_data: {
      exercises: [
        {
          sets: [
            {
              fields: {
                duration: "00:00:30",
              },
              completed: false,
              completed_at: null,
            },
            {
              fields: {
                rest: "00:00:30",
                duration: "00:00:30",
              },
              completed: false,
              completed_at: null,
            },
          ],
          tracked: ["duration"],
          exercise_id: 16,
        },
        {
          sets: [
            {
              fields: {
                reps: 10,
                weight: 20,
              },
              completed: false,
              completed_at: null,
            },
            {
              fields: {
                reps: 10,
                rest: "00:00:30",
                weight: 20,
              },
              completed: false,
              completed_at: null,
            },
          ],
          tracked: ["reps", "weight"],
          exercise_id: 9,
        },
      ],
    },
    source: "manual",
    status: "finalized",
    updated_at: null,
    notes: null,
  },
  {
    id: 4,
    created_at: "2025-08-15T05:22:30.521586+00:00",
    user_id: "57b33f04-60a7-46a2-959a-35a29ff35f61",
    title: null,
    description: "created in backend",
    goal: "function",
    duration: "00:15:01",
    workout_data: {
      exercises: [
        {
          sets: [
            {
              fields: {
                reps: 10,
                rest: "PT30S",
                weight: 60,
                duration: "PT1M",
              },
              completed: false,
              completed_at: null,
            },
          ],
          tracked: ["reps"],
          exercise_id: 0,
        },
      ],
    },
    source: "default",
    status: "draft",
    updated_at: "2025-08-15T03:18:18.675+00:00",
    notes: null,
  },
  {
    id: 5,
    created_at: "2025-08-15T06:29:36.15493+00:00",
    user_id: "57b33f04-60a7-46a2-959a-35a29ff35f61",
    title: "workout log 4",
    description: "created in backend",
    goal: "function",
    duration: "00:15:01",
    workout_data: {
      exercises: [
        {
          sets: [
            {
              fields: {
                reps: 10,
                rest: "PT30S",
                weight: 60,
                duration: "PT1M",
              },
              completed: false,
              completed_at: null,
            },
          ],
          tracked: ["reps"],
          exercise_id: 0,
        },
      ],
    },
    source: "default",
    status: "draft",
    updated_at: "2025-08-15T03:18:18.675+00:00",
    notes: null,
  },
];
