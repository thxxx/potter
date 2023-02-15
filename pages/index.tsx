import type { NextPage } from "next";
import Head from "next/head";
import { Button, Input, Textarea, useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

export const LOCAL_ID = "solomon_uuid";

const Home: NextPage = () => {
  const router = useRouter();

  const moveTo = (who: string) => {
    router.push({
      pathname: "/chat",
    });
  };

  return (
    <>
      <Head>
        <title>HarryPotter</title>
        <meta name="description" content="Ask to HarryPotter" />
        <link rel="icon" href="/card.png" />
      </Head>

      <MainContainer>
        <Background img="castle.jpeg" />
        <MainTitle>Welcome To Hogwarts!</MainTitle>
        <CharactersContainer>
          <div
            style={{ background: "url(potter.jpeg)" }}
            onClick={() => moveTo("harry")}
          />
          <div
            style={{ background: "url(malfoy.jpeg)" }}
            onClick={() => moveTo("harry")}
          />
          <div
            style={{ background: "url(doby.jpeg)" }}
            onClick={() => moveTo("harry")}
          />
        </CharactersContainer>
      </MainContainer>
    </>
  );
};

export default Home;

export const Background = styled.div<{ img: string }>`
  background: url("castle.jpeg");
  position: fixed;
  z-index: -1;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-size: cover;
`;

const MainTitle = styled.p`
  font-size: 3em;
  font-weight: 700;
  color: white;
`;

const CharactersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  div {
    width: 150px;
    height: 150px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 300px;
    transition: 0.2s ease;
    opacity: 0.7;
    cursor: pointer;
    margin: 15px;
    background-position: center;
    background-repeat: no-repeat;

    &:hover {
      border: 4px solid rgba(255, 255, 255, 0.5);
      opacity: 0.9;
    }
  }
`;

export const CustomTextarea = styled(Textarea)`
  border: 2px solid rgba(0, 0, 0, 0.6);
  padding: 15px 10px;

  @media (max-width: 500px) {
    padding: 8px 10px;
    font-size: 14px;
  }
  resize: none;
  background: ${({ theme }) => theme.bgColor};

  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.6);
  }
  &:focus {
    border: 2px solid rgba(0, 0, 0, 0.9);
  }
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background: ${({ theme }) => theme.bgColor};
  transition: 3s ease;
  min-height: 100vh;
  padding-bottom: 450px;

  h1 {
    font-weight: 700;
    text-align: center;
    opacity: 0.9;
    transition: 3s ease;

    span {
      color: ${({ theme }) => theme.blue02};
    }
  }

  h2 {
    text-align: center;
    transition: 3s ease;
  }

  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

export const CustomButton = styled(Button)`
  border: 2px solid black;
  border-bottom-width: 4px;
  border-right-width: 4px;
  padding: 20px;
  width: 100%;
  margin-top: 15px;
  // background-color: ${({ theme }) => theme.purple03};
  font-size: 1em;
`;
