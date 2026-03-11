import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useTheme, DataTable } from 'react-native-paper';

import { useWorkoutLibraryStore } from '@cwt/state/stores';
import { formatDuration, chunk } from '@cwt/utils';

import { CustomTheme } from '../theme';
import { Text } from '../customText';
import CardButton from '../components/common/CardButton';

export default function WorkoutLogPages() {
  const theme = useTheme() as CustomTheme;

  const workoutLogs = useWorkoutLibraryStore(
    (state) => state.displayedWorkoutLogs,
  );
  // console.log('workout logs', workoutLogs);
  const [activePage, setPage] = useState<number>(1);
  // const [examplePage, setExamplePage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([6, 6, 3]);
  // const [itemsPerPage, onItemsPerPageChange] = useState(
  //   numberOfItemsPerPageList[0],
  // );

  // const [exampleItems] = useState([
  //   {
  //     key: 1,
  //     name: 'Cupcake',
  //     calories: 356,
  //     fat: 16,
  //   },
  //   {
  //     key: 2,
  //     name: 'Eclair',
  //     calories: 262,
  //     fat: 16,
  //   },
  //   {
  //     key: 3,
  //     name: 'Frozen yogurt',
  //     calories: 159,
  //     fat: 6,
  //   },
  //   {
  //     key: 4,
  //     name: 'Gingerbread',
  //     calories: 305,
  //     fat: 3.7,
  //   },
  // ]);

  const data = chunk(workoutLogs, 6);

  const items = data[activePage - 1].map((wo, i) => {
    const date = new Date(wo.date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const duration = formatDuration(wo.duration!);
    return (
      <DataTable.Row key={wo.workout_build_id}>
        <DataTable.Cell>
          <CardButton>
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

  // const from = examplePage * itemsPerPage;
  // const to = Math.min((examplePage + 1) * itemsPerPage, exampleItems.length);
  const from = activePage * 6;
  const to = Math.min((activePage + 1) * 6, workoutLogs.length);

  // useEffect(() => {
  //   // setExamplePage(0);
  //   setPage(0);
  // }, [itemsPerPage]);

  return (
    <ScrollView>
      <DataTable>
        {/* <DataTable.Header>
          <DataTable.Title>Dessert</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
          <DataTable.Title numeric>Fat</DataTable.Title>
        </DataTable.Header> */}
        {items}

        {/* {exampleItems.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>
              <CardButton>
                <Text
                  variant="headlineMedium"
                  style={{ color: theme.colors.light }}
                >
                  {item.name}
                </Text>
              </CardButton>
            </DataTable.Cell>
          </DataTable.Row>
        ))} */}

        {/* <DataTable.Pagination
          page={examplePage}
          numberOfPages={Math.ceil(exampleItems.length / itemsPerPage)}
          onPageChange={(page) => setExamplePage(page)}
          label={`${from + 1}-${to} of ${exampleItems.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        /> */}
        {/* Need to fix the pagination parameters */}
        <DataTable.Pagination
          page={activePage}
          numberOfPages={Math.ceil(workoutLogs.length / 6)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${workoutLogs.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={6}
          // onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
      {/* {workoutLogs.map((wo) => {
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
      })} */}
    </ScrollView>
  );
}
