import { Input } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useStore } from "../../utils/store";
import styled from "@emotion/styled";
import { ArrowForwardIcon, AtSignIcon, ChatIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Head from "next/head";
import { Background } from "..";

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
  const [responses, setResponses] = useState<any[]>([]);
  const [greeting, setGreeting] = useState<string>("");
  const [chats, setChats] = useState<ChatOne[]>();
  const [loading, setLoading] = useState(false);
  const { question, uid, answer } = useStore();

  useEffect(() => {
    // setResponses();
  }, []);

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
    return "Shut up!";
  };

  const submitChat = async (text: string) => {
    console.log("채팅을 보낸다.", text);
    if (text.length < 2) return;
    if (chats && chats.length > 5) return;
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

    const response = await callApi();

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
        <ImageWrapper>
          <Image
            src="/potter.jpeg"
            alt="we"
            width={55}
            height={55}
            style={{ borderRadius: "200px" }}
          />
        </ImageWrapper>
        {/* <ResponseBox>
          <span className="tail"></span>
          <p
            className="greeting"
            dangerouslySetInnerHTML={{
              __html: greeting,
            }}></p>
        </ResponseBox> */}
        <br />
        <Background img="castle.jpeg" />
        {chats?.map((item, i) => {
          if (item.type === ChatType.client) {
            return (
              <ChatBubble key={i}>
                <div>{item.text}</div>
              </ChatBubble>
            );
          } else {
            return (
              <ChatBubble left key={i}>
                <div>
                  <Image src="/king.png" alt="we" width={20} height={15} />
                  <span>{item.text}</span>
                </div>
              </ChatBubble>
            );
          }
        })}

        <InputWrapperFixed
          onSubmit={(e: any) => {
            submitChat(text);
            e.preventDefault();
          }}>
          <CustomInput
            isDisabled={chats && chats.length > 5 ? true : false}
            placeholder="Have a chit-chat"
            p="24px 15px"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <span className="icon" onClick={(e) => submitChat(text)}>
            <ArrowForwardIcon color="whiteAlpha.800" />
          </span>
        </InputWrapperFixed>
        {/*   <Input value={text} onChange={(e) => setText(e.currentTarget.value)} /> */}
      </AnswerContainer>
    </>
  );
};

export default Answer;

const CustomInput = styled(Input)`
  border: 2px solid rgba(0, 0, 0, 0.6);
  background: rgba(0, 0, 0, 0.2);
  color: white;

  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.6);
  }
  &:focus {
    border: 2px solid rgba(0, 0, 0, 0.9);
  }
`;

const InputWrapperFixed = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: ${({ theme }) => theme.purple03};
    width: 32px;
    height: 32px;
    border-radius: 50px;
    z-index: 1;
    cursor: pointer;
  }
`;
const AnswerContainer = styled.div`
  padding: 30px 30px 50px 30px;
  color: ${({ theme }) => theme.color};
`;

const Response = styled.div`
  display: flex;
  flex-direction: column;

  .solution {
    border-radius: 8px;
    padding: 8px 10px;
    margin-top: 15px;
    font-weight: 700;

    span{
      color${({ theme }) => theme.blue02};
    }
  }

  .desc {
    padding: 5px 10px;
  }

  .link{
    padding: 5px 10px;

  }

  .label {
    padding-right: 7px;
    font-weight: 700;
  }
`;

const ResponseBox = styled.div`
  padding: 12px;
  padding-top: 25px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.darkGrey};
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.color};
  font-size: 16px;
  max-width: 90%;
  margin-top: 20px;
  position: relative;
  z-index: 2;

  .greeting {
    padding: 0px 12px;
    margin-bottom: 10px;
    font-size: 1.1em;
  }

  .tail {
    z-index: 1;
    background: ${({ theme }) => theme.grey};
    width: 25px;
    height: 25px;
    position: absolute;
    transform: rotate(45deg);
    top: -5px;
    left: 25px;
  }
  @media (max-width: 420px) {
    max-width: 98%;
    font-size: 14px;
  }
`;

const ImageWrapper = styled.div`
  margin-top: 30px;
  padding: 10px;
  border-radius: 50px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.grey};
  box-shadow: 4px 4px 15px rgba(0, 0, 20, 0.3);
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

    span {
      margin-left: 8px;
    }
  }
`;
