"use client";
import React, { FormEvent, useCallback, useLayoutEffect, useRef, useState } from "react";
import { Button } from "./Button";
import ProfileImage from "./ProfileImage";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

function updateTextArea(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "auto";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

const NewTweetForm = () => {
  const session = useSession();
  if (session.status !== "authenticated") return null;

  return <Form/>
};

const Form = () => {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextArea(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextArea(textAreaRef.current);
  }, [inputValue]);

  if (session.status !== "authenticated") return;
 

  const createTweet = api.tweet.create.useMutation()

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    const result = createTweet.mutate({content:inputValue})
    console.log(result);
    
    setInputValue("")
    
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <img />
        <ProfileImage
          src={`https://lh3.googleusercontent.com/a/ACg8ocKml2pTXLvQtJ921YCbLphCwp1FT95HNWZYixIFp5m7BQ=s576-c-no`}
        />
        <textarea
          ref={inputRef}
          style={{height:0}}
          value={inputValue}
          onChange={(e)=>setInputValue(e.target.value)}
          className="flex-grow resize-none overflow-hidden px-4 text-lg outline-none "
          placeholder="What's happening"
        />
        
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
    );
}
export default NewTweetForm;
