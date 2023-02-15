import type { NextPage } from "next";
import Head from "next/head";
import { Button, Input, Textarea } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

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
        <MainTitle>
          <div className="text text-4">Welcome To The Hogwarts!</div>
        </MainTitle>
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

const MainTitle = styled.div`
  font-size: 4em;
  font-weight: 700;
  color: white;
  font-family: "Montserrat", sans-serif;
  margin-top: 200px;

  .text-4 {
    animation: text-shadow 1.5s ease-in-out infinite;
  }

  /*animation*/
  @keyframes text-shadow {
    0% {
      transform: translateY(0);
      text-shadow: 0 0 0 #0c2ffb, 0 0 0 #2cfcfd, 0 0 0 #fb203b, 0 0 0 #fefc4b;
    }

    20% {
      transform: translateY(-10px);
      text-shadow: 0 0.125px 0 #0c2ffb, 0 0.25px 0 #2cfcfd, 0 -0.125px 0 #fb203b,
        0 -0.25px 0 #fefc4b;
    }

    40% {
      transform: translateY(5px);
      text-shadow: 0 -0.0625em 0 #0c2ffb, 0 -0.125em 0 #2cfcfd,
        0 0.0625em 0 #fb203b, 0 0.125em 0 #fefc4b;
    }

    60% {
      transform: translateY(-0.25px);
      text-shadow: 0 0.03125em 0 #0c2ffb, 0 0.0625em 0 #2cfcfd,
        0 -0.03125em 0 #fb203b, 0 -0.0625em 0 #fefc4b;
    }

    80% {
      transform: translateY(0);
      text-shadow: 0 0 0 #0c2ffb, 0 0 0 #2cfcfd, 0 0 0 #fb203b, 0 0 0 #fefc4b;
    }
  }
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
