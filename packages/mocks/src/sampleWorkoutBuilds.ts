import { WorkoutBuildResponse } from '@cwt/schema/workouts';

export const sampleWorkoutBuilds: WorkoutBuildResponse[] = [
  {
    id: 3,
    created_at: '2025-08-14T20:06:21.040461+00:00',
    user_id: '57b33f04-60a7-46a2-959a-35a29ff35f61',
    title: 'workout build 1',
    description: 'first workout build',
    goal: 'function',
    estimated_duration: null,
    workout_data: {
      exercises: [
        {
          sets: [
            {
              id: '868d87df-22ef-460d-9ea3-9e09e04cd4f6',
              fields: {
                reps: 5,
              },
              completed: false,
              completed_at: null,
            },
            {
              id: 'f6595387-1249-450a-9af1-bbd29e790de9',
              fields: {
                reps: 5,
                rest: '00:00:30',
              },
              completed: false,
              completed_at: null,
            },
          ],
          id: '4cfd8976-4e08-4305-886a-a282918ee549',
          tracked: ['reps'],
          exercise_id: 1,
        },
        {
          sets: [
            {
              id: '1cfd8976-4e08-4305-886a-a282918ee549',
              fields: {
                reps: 10,
                weight: 20,
              },
              completed: false,
              completed_at: null,
            },
            {
              id: '4cfd8976-4e08-4305-88b6a-a282918ee549',
              fields: {
                reps: 10,
                rest: '00:00:30',
                weight: 20,
              },
              completed: false,
              completed_at: null,
            },
          ],
          id: '4cfd8976-4e08-4325-886a-a282918ee549',
          tracked: ['reps', 'weight'],
          exercise_id: 9,
        },
      ],
    },
    source: 'manual',
    status: 'draft',
    updated_at: null,
    notes: null,
  },
  {
    id: 1,
    created_at: '2025-08-14T01:43:50.237628+00:00',
    user_id: '57b33f04-60a7-46a2-959a-35a29ff35f61',
    title: 'workout build 1',
    description: 'first workout build',
    goal: 'function',
    estimated_duration: null,
    workout_data: {
      exercises: [
        {
          sets: [
            {
              id: '34e6073a-8e96-4365-b038-62702a186dae',
              fields: {
                reps: 5,
              },
              completed: false,
              completed_at: null,
            },
            {
              id: '34e6023a-8e96-4365-b038-62702a186dae',
              fields: {
                reps: 5,
                rest: '00:00:30',
              },
              completed: false,
              completed_at: null,
            },
          ],
          id: '34e6023a-8e96-4365-b038-62702a186dae',
          tracked: ['reps'],
          exercise_id: 1,
        },
        {
          sets: [
            {
              id: 'b4e6073a-8e96-4365-b038-62702a186dae',
              fields: {
                reps: 10,
                weight: 20,
              },
              completed: false,
              completed_at: null,
            },
            {
              id: '34e6073a-8e96-4365-b038-62702ab86dae',
              fields: {
                reps: 10,
                rest: '00:00:30',
                weight: 20,
              },
              completed: false,
              completed_at: null,
            },
          ],
          id: '94e6073a-8e96-4365-b038-62702a186dae',
          tracked: ['reps', 'weight'],
          exercise_id: 9,
        },
      ],
    },
    source: 'manual',
    status: 'draft',
    updated_at: null,
    notes: null,
  },
  {
    id: 2,
    created_at: '2025-08-14T06:10:53.510628+00:00',
    user_id: '57b33f04-60a7-46a2-959a-35a29ff35f61',
    title: 'workout build 2',
    description: 'another workout build',
    goal: 'endurance',
    estimated_duration: null,
    workout_data: {
      exercises: [
        {
          sets: [
            {
              id: 'd4e6073a-8e96-4315-b038-62702a186dae',
              fields: {
                time: '00:00:30',
              },
              completed: false,
              completed_at: null,
            },
            {
              id: 'd4e6073a-8e96-4365-b038-62b02a186dae',
              fields: {
                rest: '00:00:30',
                time: '00:00:30',
              },
              completed: false,
              completed_at: null,
            },
          ],
          id: 'd4e6573a-8e96-4365-b038-62702a186dae',
          tracked: ['time'],
          exercise_id: 16,
        },
        {
          sets: [
            {
              id: 'd4e4073a-8e96-4365-b038-62702a186dae',
              fields: {
                reps: 10,
                weight: 20,
              },
              completed: false,
              completed_at: null,
            },
            {
              id: '34e6073a-8e96-4365-b038-62702a18adae',
              fields: {
                reps: 10,
                rest: '00:00:30',
                weight: 20,
              },
              completed: false,
              completed_at: null,
            },
          ],
          id: '34e6a73a-8e96-4365-b038-62702a186dae',
          tracked: ['reps', 'weight'],
          exercise_id: 9,
        },
      ],
    },
    source: 'manual',
    status: 'finalized',
    updated_at: null,
    notes: null,
  },
  {
    id: 4,
    created_at: '2025-08-15T05:22:30.521586+00:00',
    user_id: '57b33f04-60a7-46a2-959a-35a29ff35f61',
    title: null,
    description: 'created in backend',
    goal: 'function',
    estimated_duration: '00:15:01',
    workout_data: {
      exercises: [
        {
          sets: [
            {
              id: '4cfd8976-4e08-4305-886a-a282918ee549',
              fields: {
                reps: 10,
                rest: 'PT30S',
                weight: 60,
                time: 'PT1M',
              },
              completed: false,
              completed_at: null,
            },
          ],
          id: '4cfd8976-4e08-4305-886a-a282928ee549',
          tracked: ['reps'],
          exercise_id: 0,
        },
      ],
    },
    source: 'default',
    status: 'draft',
    updated_at: '2025-08-15T03:18:18.675+00:00',
    notes: null,
  },
  {
    id: 5,
    created_at: '2025-08-15T06:29:36.15493+00:00',
    user_id: '57b33f04-60a7-46a2-959a-35a29ff35f61',
    title: 'workout log 4',
    description: 'created in backend',
    goal: 'function',
    estimated_duration: '00:15:01',
    workout_data: {
      exercises: [
        {
          sets: [
            {
              id: '4cfd8976-4e08-4305-886a-a222918ee549',
              fields: {
                reps: 10,
                rest: 'PT30S',
                weight: 60,
                time: 'PT1M',
              },
              completed: false,
              completed_at: null,
            },
          ],
          id: '4cfd4976-4e08-4305-886a-a282928ee549',
          tracked: ['reps'],
          exercise_id: 0,
        },
      ],
    },
    source: 'default',
    status: 'draft',
    updated_at: '2025-08-15T03:18:18.675+00:00',
    notes: null,
  },
];
