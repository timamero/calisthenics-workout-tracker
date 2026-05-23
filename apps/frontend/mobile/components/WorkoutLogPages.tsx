import { useState, useRef } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { useTheme, DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

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
import Pill from './Pill';
// import WorkoutLogDetailOverlay from './WorkoutLogDetailOverlay';

export default function WorkoutLogPages() {
  const navigation = useNavigation<any>();
  const theme = useTheme() as CustomTheme;
  const width = Dimensions.get('window').width;

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
    navigation.navigate('WorkoutDetails');
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
        key={`${wo.date}-${i}`}
        style={{
          borderBottomWidth: 0,
          paddingInline: 24,
          paddingBlock: 8,
        }}
      >
        <DataTable.Cell>
          <CardButton
            handlePress={() => handleWorkoutLogPress(wo as WorkoutLogResponse)}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <Pill
                size="lg"
                textColor={theme.colors.dark7}
                backgroundColor={theme.colors.lime2}
                borderColor={theme.colors.dark7}
                borderRadius={4}
              >
                {date}
              </Pill>
            </View>
            <Text
              variant="headlineMedium"
              style={{ color: theme.colors.onBackground }}
            >
              {wo.title}
            </Text>
            {wo.goal && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 8,
                }}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onBackground,
                    textTransform: 'uppercase',
                  }}
                >
                  Duration:
                </Text>
                <Text
                  variant="labelMedium"
                  style={{ color: theme.colors.onBackground, flexShrink: 1 }}
                >
                  {wo.description}
                </Text>
              </View>
            )}
            {wo.goal && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 8,
                }}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onBackground,
                    textTransform: 'uppercase',
                  }}
                >
                  Workout Goal:
                </Text>
                <Text
                  variant="labelMedium"
                  style={{ color: theme.colors.onBackground }}
                >
                  {wo.goal.toUpperCase()}
                </Text>
              </View>
            )}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 8,
              }}
            >
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onBackground,
                  textTransform: 'uppercase',
                }}
              >
                Duration (HH:MM:SS):
              </Text>
              <Text
                variant="labelMedium"
                style={{ color: theme.colors.onBackground }}
              >
                {duration}
              </Text>
            </View>
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
          backgroundColor: theme.colors.background,
        }}
      >
        <DataTable>{items}</DataTable>
      </ScrollView>
      <DataTable.Pagination
        page={activePage}
        numberOfPages={Math.ceil(workoutLogs.length / itemsPerPage)}
        onPageChange={(page) => handlePageChangePress(page)}
        label={`${from + 1}-${to} of ${workoutLogs.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls={false}
        selectPageDropdownLabel={'Rows per page'}
        style={{ borderTopColor: theme.colors.onBackground, borderTopWidth: 1 }}
        theme={{
          colors: {
            onSurface: theme.colors.onBackground,
          },
        }}
      />
    </>
  );
}
