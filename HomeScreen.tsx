import {
  Box,
  Card,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  HStack,
  SafeAreaView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { observable } from "@legendapp/state";
import { observer, useSelector } from "@legendapp/state/react";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, useColorScheme } from "react-native";

export const data$ = observable({
  value: [
    {
      title: "Sample Title 1",
      description: "Sample Description",
      completed: false,
    },
    {
      title: "Sample Title 2",
      description: "Sample Description",
      completed: false,
    },
    {
      title: "Sample Title 3",
      description: "Sample Description",
      completed: false,
    },
  ],
});

export const HomeScreen = observer(function Component() {
  const { navigate } = useNavigation<any>();
  const scheme = useColorScheme();

  const listData = useSelector(() => data$.value.get());
  return (
    <SafeAreaView backgroundColor={scheme === "light" ? "white" : "black"}>
      <Box
        backgroundColor={scheme === "light" ? "white" : "black"}
        height="100%"
      >
        <FlatList
          data={listData}
          renderItem={(item) => {
            return (
              <Card p="$6" borderRadius="$lg" m="$3">
                <HStack justifyContent="space-between">
                  <VStack>
                    <Text fontWeight="$bold">{item.item.title}</Text>
                    <Text>{item.item.description}</Text>
                  </VStack>
                  <Checkbox
                    size="md"
                    isInvalid={false}
                    isDisabled={false}
                    value={"ok"}
                    aria-label="ok"
                    isChecked={item.item.completed}
                    onPress={() => {
                      data$.set((oldData) => {
                        const mutableCopy = [...oldData.value];
                        mutableCopy[item.index].completed =
                          !mutableCopy[item.index].completed;
                        return { value: mutableCopy };
                      });
                    }}
                  >
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                  </Checkbox>
                </HStack>
              </Card>
            );
          }}
        />
      </Box>
    </SafeAreaView>
  );
});
