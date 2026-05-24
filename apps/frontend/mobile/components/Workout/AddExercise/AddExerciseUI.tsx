import { ScrollView, View } from 'react-native';
import { useTheme, Surface } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomTheme } from '../../../theme';

import ExerciseList from './ExerciseList';
import Filter from '../../Filter';
import SearchBar from '../../SearchBar';
import FilterOverlay from '../../FilterOverlay';
import CustomButton from '../../common/CustomButton';

interface AddExerciseUIProps {
  selectedExerciseIDToAdd: number | null;
  handleAddExercisePress: () => void;
  handleCancelPress: () => void;
}

export default function AddExerciseUI({
  selectedExerciseIDToAdd,
  handleAddExercisePress,
  handleCancelPress,
}: AddExerciseUIProps) {
  const theme = useTheme() as CustomTheme;
  const { top } = useSafeAreaInsets();

  return (
    <>
      <Surface elevation={1} style={{ zIndex: 2 }}>
        <View
          style={{
            paddingBlock: 16,
            paddingInline: 8,
            paddingTop: 16 + top,
            backgroundColor: theme.colors.elevation.level2,
            borderBottomWidth: 1,
            borderColor: theme.colors.gray3,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <SearchBar />
          <Filter />
        </View>
      </Surface>
      <ScrollView
        style={{
          backgroundColor: theme.colors.background,
          paddingInline: 16,
          paddingBlock: 16,
          width: '100%',
          zIndex: 0,
        }}
      >
        <View
          style={{
            paddingBottom: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <ExerciseList />
        </View>
      </ScrollView>
      <View style={{ width: '100%' }}>
        <Surface elevation={3}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
              paddingBlock: 20,
              borderTopWidth: 1,
              borderColor: theme.colors.gray3,
            }}
          >
            <CustomButton
              mode="outlined"
              onPress={() => handleCancelPress()}
              style={{
                borderColor: 'rgb(134, 142, 150)',
                borderRadius: 4,
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              disabled={selectedExerciseIDToAdd === null}
              mode="contained"
              onPress={() => handleAddExercisePress?.()}
              style={{
                borderRadius: 4,
              }}
            >
              Add Exercise
            </CustomButton>
          </View>
        </Surface>
      </View>
      <FilterOverlay />
    </>
  );
}
