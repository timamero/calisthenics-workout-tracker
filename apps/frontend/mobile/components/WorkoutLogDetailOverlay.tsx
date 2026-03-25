import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';

import { Text } from '../customText';
import { CustomTheme } from '../theme';
import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

export default function ExerciseDetailOverlay() {
  const hideModal = React.useContext(ExerciseDetailContext)?.hideModal;
  const visible = React.useContext(ExerciseDetailContext)?.visible;
  const exercise = React.useContext(ExerciseDetailContext)?.exercise;
  const theme = useTheme() as CustomTheme;
  const styles = getStyles(theme);

  const containerStyle = {
    backgroundColor: theme.colors.background,
    paddingBlock: 20,
    marginInline: 16,
  };

  return (
    <Portal>
      <Modal
        visible={visible || false}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <View style={{ paddingInline: 16 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: 12,
            }}
          >
            <Button
              mode="outlined"
              textColor={theme.colors.light}
              onPress={hideModal}
            >
              Back to Exercises
            </Button>
          </View>
          <Text variant="headlineLarge" style={{ color: theme.colors.light }}>
            {exercise?.name}
          </Text>
          <ScrollView style={{ height: 660 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 12,
                marginBlock: 24,
              }}
            >
              <View>
                <Text variant="bodyLarge" style={styles.metadataTitle}>
                  Target Muscles
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    metadataTitle: {
      fontWeight: 700,
      textTransform: 'uppercase',
      color: theme.colors.grey,
      marginBottom: 4,
    },
    flexRowStart: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    pillsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
  });
