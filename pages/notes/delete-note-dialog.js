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

export default function DeleteNoteDialog({ setUpdateNotes, noteData }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = react.useRef();

  const [isSubmitting, setIsSubmitting] = react.useState(false);

  const HandleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const respond = await fetch(
        `https://service.pace-unv.cloud/api/notes/delete/${noteData.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await respond.json();
      if (result?.success) {
        toast({
          title: "Notes deleted",
          description: "Your note erased from list!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        setUpdateNotes(result);
      } else {
        toast({
          title: "Opps There's an error",
          description: result?.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      onClose();
      setIsSubmitting(false);
    } catch (error) {
      toast({
        title: "Opps There's an error",
        description: error.messege,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button variant="ghost" colorScheme="red" width="100%" onClick={onOpen}>
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Note
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={HandleSubmit}
                isDisabled={isSubmitting}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
