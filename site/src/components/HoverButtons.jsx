import React, { useRef } from 'react';
import { IconButton, HStack, Button } from '@chakra-ui/react';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BsPlusCircleFill, BsFillEyeFill } from 'react-icons/bs';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react';

function HoverButtons() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <HStack spacing={4} data-testid= "hover-buttons">
        <IconButton
          icon={<BsFillEyeFill style={{ color: "#3e5936" }} />}
          aria-label="Like"
          size="lg"
          variant="unstyled"
          display="flex"
        />
        <IconButton
          icon={<BsPlusCircleFill style={{ color: "#3e5936" }} />}
          aria-label="Comment"
          size="md"
          variant="unstyled"
          display="flex"
        />
        <IconButton
          onClick={onOpen}
          icon={<AiFillDollarCircle style={{ color: "#3e5936" }} />}
          aria-label="Ticket"
          size="md"
          variant="unstyled"
          display="flex"
        />
      </HStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <div>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Free tickets!
              </AlertDialogHeader>
            </div>

            <AlertDialogBody>
              Do you want to redeem free tickets to this movie?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button style={{ backgroundColor: "#3e5936", color: 'white' }} onClick={onClose} ml={3}>
                Purchase
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default HoverButtons;
