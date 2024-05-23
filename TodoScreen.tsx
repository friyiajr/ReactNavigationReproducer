import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Input,
  InputField,
  SafeAreaView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { useColorScheme } from "react-native";

import { data$ } from "./HomeScreen";
import { useNavigation } from "@react-navigation/native";

export const TodoScreen = () => {
  const scheme = useColorScheme();
  const { pop } = useNavigation<any>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView backgroundColor={scheme === "light" ? "white" : "black"}>
      <Box
        height="100%"
        paddingHorizontal={20}
        paddingVertical={20}
        justifyContent="space-between"
      >
        <VStack gap={20}>
          <VStack gap={8}>
            <Text>Title</Text>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                placeholder="Enter Title here"
                onChangeText={setTitle}
                value={title}
              />
            </Input>
          </VStack>
          <VStack gap={8}>
            <Text>Description</Text>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                placeholder="Enter Description here"
                onChangeText={setDescription}
                value={description}
              />
            </Input>
          </VStack>
        </VStack>
        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          height={60}
          onPress={() => {
            data$.value.set((oldData) => {
              return [
                ...oldData,
                {
                  title,
                  description,
                  completed: false,
                },
              ];
            });
            pop();
          }}
        >
          <ButtonText>Add </ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>
      </Box>
    </SafeAreaView>
  );
};
