import styles from "@/styles/Home.module.css";
import indonesianDateFormat from "@/utils/date-format";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import react from "react";
import CreateNoteDialog from "./create-note-dialog";
import UpdateNoteDialog from "./update-note-dialog";
import DeleteNoteDialog from "./delete-note-dialog";
import { useQueries } from "@/hooks/useQueries";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const DynamicLayout = dynamic(() => import("@/layout"));

export default function Notes() {
  const { data, error, isLoading } = useSWR(
    "https://service.pace-unv.cloud/api/notes",
    fetcher,
    { revalidateOnFocus: true }
  );

  const [updateNotes, setUpdateNotes] = react.useState();

  // const { data, isLoading } = useQueries({
  //   prefixUrl: "https://service.pace-unv.cloud/api/notes",
  //   updateNotes,
  // });

  return (
    <>
      <div className={`${styles.page}`}>
        <DynamicLayout
          metaTitle={"Notes"}
          metaDescription={
            "Sanber code intensive Next JS Bootcamp Batch 60 covering intermediate javascript framework practical approach. Made by Kadek Ari Dharmika"
          }
        >
          <div className="w-full text-black flex flex-col items-center">
            <Flex w="100%" justifyContent={"space-between"}>
              <Heading as="h1" size="xl" className="mb-6">
                List of Notes
              </Heading>
              <CreateNoteDialog setUpdateNotes={setUpdateNotes} />
            </Flex>
            {isLoading ? (
              <>
                <Spinner />
              </>
            ) : (
              <>
                <Grid templateColumns="repeat(5, 1fr)" gap={2} w="100%">
                  {data?.data?.map((note) => (
                    <GridItem key={note.id}>
                      <Card maxW="sm">
                        <CardBody>
                          <Stack mt="6" spacing="3">
                            <Heading size="md"> {note?.title}</Heading>
                            <Text>{note?.description}</Text>
                            <Divider />
                            <div className="flex gap-2 justify-between w-full">
                              <Stack spacing="1">
                                {" "}
                                <Heading as="h6" size="xs">
                                  Created:
                                </Heading>
                                <Text fontSize="xs">
                                  {indonesianDateFormat(note?.created_at)}
                                </Text>
                              </Stack>

                              <Stack spacing="1" className="text-end">
                                {" "}
                                <Heading as="h6" size="xs">
                                  Last Updated:
                                </Heading>
                                <Text fontSize="xs">
                                  {indonesianDateFormat(note?.updated_at)}
                                </Text>
                              </Stack>
                            </div>
                          </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                          <ButtonGroup spacing="2" width={"100%"}>
                            <UpdateNoteDialog
                              setUpdateNotes={setUpdateNotes}
                              noteData={note}
                            />
                            <DeleteNoteDialog
                              setUpdateNotes={setUpdateNotes}
                              noteData={note}
                            />
                          </ButtonGroup>
                        </CardFooter>
                      </Card>
                    </GridItem>
                  ))}
                </Grid>
              </>
            )}
          </div>
        </DynamicLayout>
      </div>
    </>
  );
}
