import { Input } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useStore } from "../../utils/store";
import styled from "@emotion/styled";
import Head from "next/head";
import { Background } from "..";
import router from "next/router";

enum ChatType {
  bot = "bot",
  client = "client",
}

type ChatOne = {
  type: ChatType;
  text: string;
};

const Answer: NextPage = () => {
  const [text, setText] = useState("");
  const [chats, setChats] = useState<ChatOne[]>();
  const [loading, setLoading] = useState(false);
  const [char, setChar] = useState("harry");
  const [magic, setMagic] = useState(1);

  useEffect(() => {
    setChar(router.query.char as string);
  }, [setChar]);

  const callApi = async () => {
    // const body = {
    //   type: "chat",
    //   query: text,
    //   problem: question,
    // };

    // const response = await axios.post("/chat", body, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // });
    // const output = await response;
    return char === "harry"
      ? "Hi I am Harry!"
      : char === "doby"
      ? "Doby is freeee"
      : "Shut up";
  };

  const submitChat = async (text: string) => {
    if (text.length < 2) return;
    if (loading) return;

    setLoading(true);

    if (chats)
      setChats([
        ...chats,
        {
          type: ChatType.client,
          text: text,
        },
        {
          type: ChatType.bot,
          text: "typing..",
        },
      ]);
    else
      setChats([
        {
          type: ChatType.client,
          text: text,
        },
        {
          type: ChatType.bot,
          text: "typing..",
        },
      ]);

    let response = "";
    if (
      text.toLowerCase().includes("magic") &&
      text.toLowerCase().includes("show")
    ) {
      response = "Okay wait a second... nox!";
      setMagic(0.1);
    } else if (text.toLowerCase() === "lumos") {
      setMagic(1);
      response = "Hey that's my magic";
    } else {
      response = await callApi();
    }

    if (chats)
      setChats([
        ...chats,
        {
          type: ChatType.client,
          text: text,
        },
        {
          type: ChatType.bot,
          text: response,
        },
      ]);
    else
      setChats([
        {
          type: ChatType.client,
          text: text,
        },
        {
          type: ChatType.bot,
          text: response,
        },
      ]);

    setText("");
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Harry Potter Chat</title>
        <meta name="description" content="Harry Potter Chat" />
        <link rel="icon" href="/card.png" />
      </Head>
      <AnswerContainer>
        <br />
        <Background img="griff.jpeg" opacity={magic} />
        <ChatContainer>
          {!chats && (
            <ImageWrapper>
              <img
                src={
                  char === "harry"
                    ? "/potter1.png"
                    : char === "malfoy"
                    ? "/malfoy.png"
                    : "/doby.png"
                }
                alt="potter"
              />
            </ImageWrapper>
          )}
          {chats?.map((item, i) => {
            if (item.type === ChatType.client) {
              return (
                <ChatBubble key={i}>
                  <div>{item.text}</div>
                </ChatBubble>
              );
            } else {
              return (
                <>
                  <ImageWrapper>
                    <img
                      src={
                        char === "harry"
                          ? "/potter1.png"
                          : char === "malfoy"
                          ? "/malfoy.png"
                          : "/doby.png"
                      }
                      alt="potter"
                    />
                  </ImageWrapper>
                  <ChatBubble left key={i}>
                    <div>
                      <span>{item.text}</span>
                    </div>
                  </ChatBubble>
                </>
              );
            }
          })}
        </ChatContainer>

        <InputWrapperFixed
          onSubmit={(e: any) => {
            submitChat(text);
            e.preventDefault();
          }}>
          <CustomInput
            // isDisabled={chats && chats.length > 5 ? true : false}
            // placeholder="Have a chit-chat"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <span className="icon" onClick={(e) => submitChat(text)}>
            {/* <img src="wand.png" /> */}
          </span>
        </InputWrapperFixed>
        {/*   <Input value={text} onChange={(e) => setText(e.currentTarget.value)} /> */}
      </AnswerContainer>
    </>
  );
};

export default Answer;

const ChatContainer = styled.div`
  min-height: 60vh;
`;

const CustomInput = styled.input`
  border: 2px solid rgba(0, 0, 0, 0.6);
  background: rgba(250, 250, 250, 0.8);
  color: black;
  padding: 15px;
  border-radius: 8px;

  &:hover {
    // border: 2px solid rgba(150, 0, 0, 0.6);
  }
  &:focus {
    outline: 1px solid rgba(180, 100, 100, 0.9);
  }
`;

const InputWrapperFixed = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  position: relative;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    top: 11px;
    background-color: rgba(255, 255, 255, 0.9);
    width: 35px;
    height: 35px;
    border-radius: 50px;
    z-index: 1;
    cursor: pointer;
    img {
      width: 35px;
      height: 35px;
    }
  }
`;
const AnswerContainer = styled.div`
  padding: 30px 30px 50px 30px;
  color: ${({ theme }) => theme.color};
`;

const ImageWrapper = styled.div`
  margin-top: 30px;
  padding: 2px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.grey};
  box-shadow: 4px 4px 15px rgba(0, 0, 20, 0.3);
  border-radius: 50px;

  img {
    width: 100px;
    border-radius: 150px;
  }
`;

const ChatBubble = styled.div<{ left?: boolean }>`
  width: 100%;
  display: flex;
  margin-top: 12px;
  justify-content: ${({ left }) => (left ? "flex-start" : "flex-end")};

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    border-radius: 8px;
    border-bottom-right-radius: ${({ left }) => (left ? "8px" : "0px")};
    border-bottom-left-radius: ${({ left }) => (left ? "0px" : "8px")};
    color: ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.grey};
    max-width: 90%;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1.5px solid rgba(255, 255, 255, 0.18);

    span {
      margin-left: 2px;
    }
  }
`;
