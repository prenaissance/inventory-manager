import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
  Text,
  useToast,
  FormControl,
  FormLabel,
  Select,
  Tooltip,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addItem, fetchItemTemplates } from "@/entities/item/api";

const schema = z.object({
  templateId: z.string().min(1, {
    message: "Please select an item template",
  }),
  stacks: z.number().nullish(),
});

type FormValues = z.infer<typeof schema>;

const LABEL = "Add item to inventory";

export const AddItemFormButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["itemTemplates"],
    queryFn: fetchItemTemplates,
  });
  const toast = useToast();
  const addItemMutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });

      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error adding item",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const itemTemplates = data ?? [];
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onChange" });
  const onSubmit = async (data: FormValues) => {
    const itemTemplate = itemTemplates.find(
      (template) => template._id === data.templateId,
    );
    if (!itemTemplate) {
      return;
    }

    await addItemMutation.mutateAsync(data);

    toast({
      title: "Item added",
      description: `Item ${itemTemplate.name} added to inventory`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Tooltip label={LABEL}>
        <IconButton onClick={onOpen} aria-label={LABEL}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <AlertDialog
        colorScheme="gray"
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent as="form" onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <Text>Add item to inventory</Text>
              <FormControl isInvalid={!!errors.templateId}>
                <FormLabel>Item</FormLabel>
                <Select {...register("templateId")}>
                  {itemTemplates.map((template) => (
                    <option key={template._id} value={template._id}>
                      {template.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.templateId?.message}
                </FormErrorMessage>
              </FormControl>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="gray" ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={addItemMutation.isPending}
                colorScheme="gray"
                type="submit"
                ml={3}
              >
                Add Item
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
