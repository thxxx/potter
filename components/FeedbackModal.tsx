import { Box, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { CustomButton } from "../pages";
import { dbService } from "../utils/fbase";
import styled from "@emotion/styled";

type FeedbackModelProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  problem?: string;
};

const FeedbackModal = ({
  isOpen,
  onOpen,
  onClose,
  problem,
}: FeedbackModelProps) => {
  const options = [1, 2, 3, 4, 5];
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(1);

  const sendFeedback = () => {
    const body = {
      createdAt: new Date(),
      rating: rating,
      content: feedback,
      problemId: problem,
    };
    dbService.collection("feedback").add(body);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <CustomModalContent>
        <ModalHeader>Thank you for Feedback</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>If you have any feedback, please let us know.</p>
          <RadioBox>
            {options.map((value) => {
              return (
                <Radio
                  className="radio"
                  key={value}
                  onClick={() => setRating(value)}
                  isClicked={rating === value}>
                  {value}
                </Radio>
              );
            })}
          </RadioBox>

          <Textarea
            value={feedback}
            mt={5}
            rows={4}
            onChange={(e) => setFeedback(e.currentTarget.value)}
            resize="none"
          />
        </ModalBody>
        <ModalFooter>
          <CustomButton onClick={() => sendFeedback()}>Send</CustomButton>
        </ModalFooter>
      </CustomModalContent>
    </Modal>
  );
};

export default React.memo(FeedbackModal);

const CustomModalContent = styled(ModalContent)`
  border: 2px solid rgba(0, 0, 0, 0.8);
  font-size: 1.1em;
  color: rgba(0, 0, 0, 0.9);
`;

const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  width: 100%;
`;

const Radio = styled.button<{ isClicked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border: 1px solid ${({ theme }) => theme.grey};
  background: ${({ isClicked }) => (isClicked ? "black" : "white")};

  &:focus {
    outline: 2.5px solid ${({ theme }) => theme.darkGrey + "44"};
  }
`;