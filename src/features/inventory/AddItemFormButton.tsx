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
import { useItems, useItemTemplates } from "@/entities/item/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Item } from "@/entities/item/model/item";

const schema = z.object({
  templateId: z.string().min(1, {
    message: "Please select an item template",
  }),
  stacks: z.number().nullish(),
});

type FormValues = z.infer<typeof schema>;

const getMinAvailableOrder = (items: Item[]) => {
  const bitMap = new Array(items.length + 1).fill(false);
  for (const item of items) {
    bitMap[item.order] = true;
  }
  return bitMap.indexOf(false);
};

const LABEL = "Add item to inventory";

export const AddItemFormButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { items, setItems } = useItems();
  const itemTemplates = useItemTemplates((state) => state.itemTemplates);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onChange" });
  const onSubmit = (data: FormValues) => {
    const id = crypto.randomUUID();
    const itemTemplate = itemTemplates.find(
      (template) => template.id === data.templateId,
    );
    if (!itemTemplate) {
      return;
    }
    const order = getMinAvailableOrder(items);
    const newItem: Item = {
      id,
      template: itemTemplate,
      order,
    };
    setItems([...items, newItem]);
    toast({
      title: "Item added",
      description: `Item ${itemTemplate.name} added to inventory`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
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
                    <option key={template.id} value={template.id}>
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
              <Button colorScheme="gray" type="submit" ml={3}>
                Add Item
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
