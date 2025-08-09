'use client';

import { Heading, Box, Flex, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react"
import DayBlock from "./DayBlock";
import ModalForm from "../modal-form/ModalForm";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


const LandingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return(
    <Flex width ={"100%"} align="center" justify={"center"} mt="5%" direction="column">
      <Box mb={4} border = "1px solid red" padding = "3%" width = "50%" display="flex" justifyContent="center" alignItems="center" borderRadius="30" >
        <Heading>Email Reminders</Heading>
      </Box>
      <Box mb={4} border = "1px solid red" padding = "1%" width = "80%" borderRadius="30" >
        <Heading size="md">Your Weekly Schedule: </Heading>
        <Flex direction="row">
          {days.map((day, idx) => (
            <DayBlock day={day} key = {idx} width = "25%"/>
          ))}
        </Flex>
      </Box>
      <Box mb={4} border = "1px solid red" padding = "1%" width = "80%" borderRadius="30">
        <Heading size="md">Special Tasks: </Heading>
      </Box>
      <Button colorScheme="teal" mt={4} onClick={onOpen}>
        Add Reminders
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default LandingPage;