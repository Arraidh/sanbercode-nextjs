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

export default function UpdateNoteDialog({ setUpdateNotes, noteData }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = react.useRef();

  const [updateNotes, setupdateNotes] = react.useState({
    title: noteData.title,
    description: noteData.description,
  });

  const [updateNotesValidation, setNotesValidation] = react.useState(true);

  const HandleSubmit = async () => {
    setNotesValidation(true);
    if (!updateNotes.title || !updateNotes.description) {
      setNotesValidation(false);
    } else {
      try {
        const respond = await fetch(
          `https://service.pace-unv.cloud/api/notes/update/${noteData.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateNotes),
          }
        );
        const result = await respond.json();
        if (result?.success) {
          toast({
            title: "Notes updated",
            description: "Your note data has been updated!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          onClose();
          setUpdateNotes(result);
        }
      } catch (error) {}
    }
  };

  return (
    <>
      <Button variant="ghost" colorScheme="blue" width="100%" onClick={onOpen}>
        Edit
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Update Note
            </AlertDialogHeader>

            <AlertDialogBody>
              <Stack spacing={3}>
                <Input
                  variant="outline"
                  placeholder="Note Title"
                  type="text"
                  defaultValue={updateNotes.title}
                  onChange={(event) =>
                    setupdateNotes({
                      ...updateNotes,
                      title: event.target.value,
                    })
                  }
                />
                <Textarea
                  placeholder="Note Description"
                  defaultValue={updateNotes.description}
                  onChange={(event) =>
                    setupdateNotes({
                      ...updateNotes,
                      description: event.target.value,
                    })
                  }
                />
                {updateNotesValidation ? (
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
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
