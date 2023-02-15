import { ArrowForwardIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

const AppBar = () => {
  return (
    <AppBarContainer>
      <span>See what other people asked!</span>
      <span onClick={() => {}}>
        Do you have any feedback? ✋🏻
        <ArrowForwardIcon />
      </span>
    </AppBarContainer>
  );
};

export default React.memo(AppBar);

const AppBarContainer = styled.div`
  z-index: 2;
  width: 100%;
  background: black;
  color: white;
  padding: 14px 4vw;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 600px) {
    font-size: 10px;
  }
`;
