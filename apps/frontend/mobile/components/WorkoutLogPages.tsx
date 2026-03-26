import { useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import { useTheme, DataTable } from 'react-native-paper';

import {
  useWorkoutLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';
import { formatDuration, chunk } from '@cwt/utils';
import { useWorkoutLogDetailContextMobile } from '@cwt/hooks';
import { WorkoutLogResponse } from '@cwt/schema/workouts';

import { CustomTheme } from '../theme';
import { Text } from '../customText';
import CardButton from '../components/common/CardButton';
import WorkoutLogDetailOverlay from './WorkoutLogDetailOverlay';

export default function WorkoutLogPages() {
  const theme = useTheme() as CustomTheme;

  const scrollRef = useRef<ScrollView>(null);

  const workoutLogs = useWorkoutLibraryStore(
    (state) => state.displayedWorkoutLogs,
  );
  const [activePage, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([6, 2, 3]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );

  const setMode = useWorkoutDraftStore((state) => state.setMode);
  const setWorkoutData = useWorkoutDraftStore((state) => state.setWorkoutData);

  const setVisible =
    useWorkoutLogDetailContextMobile().mobileOverlayHandlers
      .setIsOverlayVisible!;
  const setDetailWorkout = useWorkoutLogDetailContextMobile().setWorkout;

  const data = chunk(workoutLogs, itemsPerPage);

  const handlePageChangePress = (page: number) => {
    setPage(page);

    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleWorkoutLogPress = (workoutLog: WorkoutLogResponse) => {
    setDetailWorkout(workoutLog);
    setMode('read');
    setWorkoutData(workoutLog.workout_data.data);
    setVisible(true);
  };

  const items = data[activePage - 0].map((wo, i) => {
    const date = new Date(wo.date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const duration = formatDuration(wo.duration!);
    return (
      <DataTable.Row
        key={wo.workout_build_id}
        style={{
          borderBottomWidth: 0,
        }}
      >
        <DataTable.Cell>
          <CardButton
            handlePress={() => handleWorkoutLogPress(wo as WorkoutLogResponse)}
          >
            <Text
              variant="headlineMedium"
              style={{ color: theme.colors.light }}
            >
              {wo.title}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.light }}>
              {date}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.light }}>
              {wo.goal}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.light }}>
              {wo.description}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.light }}>
              {duration}
            </Text>
          </CardButton>
        </DataTable.Cell>
      </DataTable.Row>
    );
  });

  const from = activePage * itemsPerPage;
  const to = Math.min((activePage + 1) * itemsPerPage, workoutLogs.length);

  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: theme.colors.dark900,
        }}
      >
        <DataTable>{items}</DataTable>
      </ScrollView>
      <DataTable.Pagination
        page={activePage}
        numberOfPages={Math.ceil(workoutLogs.length / itemsPerPage)}
        // onPageChange={(page) => setPage(page)}
        onPageChange={(page) => handlePageChangePress(page)}
        label={`${from + 1}-${to} of ${workoutLogs.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls={false}
        selectPageDropdownLabel={'Rows per page'}
        style={{ borderTopColor: theme.colors.light, borderTopWidth: 1 }}
        theme={{
          colors: {
            onSurface: theme.colors.light,
            // surface: theme.colors.dark800,
            elevation: {
              level2: theme.colors.dark800,
            },
          },
        }}
      />
      <WorkoutLogDetailOverlay />
    </>
  );
}
