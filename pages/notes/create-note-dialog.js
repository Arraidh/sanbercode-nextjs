import { useMutation } from "@/hooks/useMutation";
import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Button,
  Input,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import react from "react";

export default function CreateNoteDialog({ setUpdateNotes }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = react.useRef();

  const [createNotes, setCreateNotes] = react.useState({
    title: "",
    description: "",
  });

  const [createNotesValidation, setNotesValidation] = react.useState(true);

  const { data, isError, mutates } = useMutation();

  const HandleSubmit = async () => {
    setNotesValidation(true);
    if (!createNotes.title || !createNotes.description) {
      setNotesValidation(false);
    } else {
      const response = mutates({
        url: "https://service.pace-unv.cloud/api/notes",
        payload: createNotes,
      });
      if (!isError) {
        toast({
          title: "Notes Created",
          description: "Your new notes has been added!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
        setUpdateNotes(true);
      }
    }
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Add Note
      </Button>{" "}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Add Note
            </AlertDialogHeader>

            <AlertDialogBody>
              <Stack spacing={3}>
                <Input
                  variant="outline"
                  placeholder="Note Title"
                  type="text"
                  onChange={(event) =>
                    setCreateNotes({
                      ...createNotes,
                      title: event.target.value,
                    })
                  }
                />
                <Textarea
                  placeholder="Note Description"
                  onChange={(event) =>
                    setCreateNotes({
                      ...createNotes,
                      description: event.target.value,
                    })
                  }
                />
                {createNotesValidation ? (
                  ""
                ) : (
                  <Alert status="error">
                    <AlertIcon />
                    Opps you need to fill all the form
                  </Alert>
                )}
              </Stack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={HandleSubmit} ml={3}>
                Add
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
