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
      data: [
        {
          id: '4cfd8976-4e08-4305-886a-a282918ee549',
          exercise_id: 1,
          order: 0,
          type: 'exercise',
          tracked: ['reps'],
          sets: [
            {
              id: '868d87df-22ef-460d-9ea3-9e09e04cd4f6',
              fields: {
                reps: 5,
                time: null,
                rest: null,
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
            {
              id: 'f6595387-1249-450a-9af1-bbd29e790de9',
              fields: {
                reps: 5,
                time: null,
                rest: '00:00:30',
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
          ],
        },
        {
          id: '4cfd8976-4e08-4325-886a-a282918ee549',
          exercise_id: 9,
          order: 1,
          type: 'exercise',
          tracked: ['reps'],
          sets: [
            {
              id: '1cfd8976-4e08-4305-886a-a282918ee549',
              fields: {
                reps: 10,
                time: null,
                rest: null,
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
            {
              id: '4cfd8976-4e08-4305-88b6a-a282918ee549',
              fields: {
                reps: 10,
                time: null,
                rest: '00:00:30',
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
          ],
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
      data: [
        {
          id: '34e6023a-8e96-4365-b038-62702a186dae',
          exercise_id: 1,
          order: 0,
          type: 'exercise',
          tracked: ['reps'],
          sets: [
            {
              id: '34e6073a-8e96-4365-b038-62702a186dae',
              fields: {
                reps: 5,
                time: null,
                rest: null,
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
            {
              id: '34e6023a-8e96-4365-b038-62702a186dae',
              fields: {
                reps: 5,
                time: null,
                rest: '00:00:30',
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
          ],
        },
        {
          id: '94e6073a-8e96-4365-b038-62702a186dae',
          exercise_id: 9,
          order: 1,
          type: 'exercise',
          tracked: ['reps'],
          sets: [
            {
              id: 'b4e6073a-8e96-4365-b038-62702a186dae',
              fields: {
                reps: 10,
                time: null,
                rest: null,
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
            {
              id: '34e6073a-8e96-4365-b038-62702ab86dae',
              fields: {
                reps: 10,
                time: null,
                rest: '00:00:30',
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
          ],
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
      data: [
        {
          id: 'd4e6573a-8e96-4365-b038-62702a186dae',
          exercise_id: 16,
          order: 0,
          type: 'exercise',
          tracked: ['time'],
          sets: [
            {
              id: 'd4e6073a-8e96-4315-b038-62702a186dae',
              fields: {
                reps: null,
                time: '00:00:30',
                rest: null,
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
            {
              id: 'd4e6073a-8e96-4365-b038-62b02a186dae',
              fields: {
                reps: null,
                time: '00:00:30',
                rest: '00:00:30',
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
          ],
        },
        {
          id: '34e6a73a-8e96-4365-b038-62702a186dae',
          exercise_id: 9,
          order: 1,
          type: 'exercise',
          tracked: ['reps'],
          sets: [
            {
              id: 'd4e4073a-8e96-4365-b038-62702a186dae',
              fields: {
                reps: 10,
                time: null,
                rest: null,
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
            {
              id: '34e6073a-8e96-4365-b038-62702a18adae',
              fields: {
                reps: 10,
                time: null,
                rest: '00:00:30',
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
          ],
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
      data: [
        {
          id: '4cfd8976-4e08-4305-886a-a282928ee549',
          exercise_id: 0,
          order: 0,
          type: 'exercise',
          tracked: ['reps', 'time'],
          sets: [
            {
              id: '4cfd8976-4e08-4305-886a-a282918ee549',
              fields: {
                reps: 10,
                time: 'PT1M',
                rest: 'PT30S',
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
          ],
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
      data: [
        {
          id: '4cfd4976-4e08-4305-886a-a282928ee549',
          exercise_id: 0,
          order: 0,
          type: 'exercise',
          tracked: ['reps', 'time'],
          sets: [
            {
              id: '4cfd8976-4e08-4305-886a-a222918ee549',
              fields: {
                reps: 10,
                time: 'PT1M',
                rest: 'PT30S',
                setProgressions: null,
              },
              completed: false,
              completed_at: null,
            },
          ],
        },
      ],
    },
    source: 'default',
    status: 'draft',
    updated_at: '2025-08-15T03:18:18.675+00:00',
    notes: null,
  },
];
