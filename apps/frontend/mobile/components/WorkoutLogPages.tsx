import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useTheme, DataTable } from 'react-native-paper';

import { useWorkoutLibraryStore } from '@cwt/state/stores';
import { formatDuration } from '@cwt/utils';

import { CustomTheme } from '../theme';
import { Text } from '../customText';
import CardButton from '../components/common/CardButton';

export default function WorkoutLogPages() {
  const theme = useTheme() as CustomTheme;

  const workoutLogs = useWorkoutLibraryStore(
    (state) => state.displayedWorkoutLogs,
  );
  // console.log('workout logs', workoutLogs);
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([1, 2, 3]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );

  const [exampleItems] = useState([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, exampleItems.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <ScrollView>
      <DataTable>
        {/* <DataTable.Header>
          <DataTable.Title>Dessert</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
          <DataTable.Title numeric>Fat</DataTable.Title>
        </DataTable.Header> */}

        {exampleItems.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>
              <CardButton key={item.key}>
                <Text
                  variant="headlineMedium"
                  style={{ color: theme.colors.light }}
                >
                  {item.name}
                </Text>
              </CardButton>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(exampleItems.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${exampleItems.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
      {workoutLogs.map((wo) => {
        const date = new Date(wo.date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const duration = formatDuration(wo.duration!);
        return (
          <CardButton key={wo.workout_build_id}>
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
        );
      })}
    </ScrollView>
  );
}
