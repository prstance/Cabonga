import Page from "@/components/native/page";
import { getGroup } from "@/stores/api";
import { authStore } from "@/stores/auth";
import { chatGroupType, groupType, messageType, rawMessageType } from "@/types";
import { createEventListener } from "@solid-primitives/event-listener";
import { useNavigate, useParams } from "@solidjs/router";
import { Accessor, Component, For, Setter, Show, createEffect, createResource, createSignal, on, onCleanup } from "solid-js";

const isYou = (email: string) => email === authStore.decodedJWT?.email;

const Chat: Component = () => {
  const params = useParams();
  const [group] = createResource<chatGroupType, {id: number; engineToken: () => string}>({
    id: parseInt(params.id),
    engineToken: () => String(authStore.authTokens?.engine)
  }, getGroup);

  const navigate = useNavigate();

  const [messages, setMessages] = createSignal<messageType[]>([]);
  const [message, setMessage] = createSignal("");

  createEffect(on(() => group.loading, () => {
    if (!group.loading) {
      if (Object.hasOwn(group()!, "length")) return navigate("/groups");
      setMessages(group()!.messages.map((item: rawMessageType) => {
        return {text: item.content, author: item.username, you: isYou(item.email)};
      } ));
    }
  }));

  let chat: HTMLDivElement | undefined;

  return (
    <>
      <Page ref={chat} text={group()?.group.name} protected>
        <Show when={!group.loading}>
          <WSCon group={group()!.group} message={message} setMessage={setMessage} messages={messages} setMessages={setMessages} chatRef={chat} />
        </Show>
      </Page>
    </>
  );
};

const WSCon: Component<{chatRef: HTMLDivElement | undefined; group: groupType; message: Accessor<string>; setMessage: Setter<string>; messages: Accessor<messageType[]>; setMessages: Setter<messageType[]>}> = props => {
  const navigate = useNavigate();
  const [exitClosed, setExitClosed] = createSignal(false);

  const group = () => props.group;
  // eslint-disable-next-line solid/reactivity
  const websocketUrl = "ws://" + "127.0.0.1:8000" + "/chat/" + group().id + "/";
  const chatSocket = new WebSocket(websocketUrl);

  const scrollBottom = () => {
    props.chatRef!.scrollTop =  props.chatRef!.scrollHeight;
  };

  chatSocket.onopen = function () {
    chatSocket.send(
      JSON.stringify({
        type: "auth",
        token: String(authStore.authTokens?.access)
      })
    );
  };

  chatSocket.onclose = function () {
    if (!exitClosed()) {
      navigate("/groups");
    }
  };

  chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    const newMessage = {text: data.message, author: data.username.toUpperCase(), you: isYou(data.email)};
    props.setMessages([...props.messages(), newMessage]);
  };

  const sendMessage = () => {
    if (props.message().trim() === "") {
      props.setMessage("");
    }
    else {
      chatSocket.send(
        JSON.stringify({
          type: "message",
          message: props.message(),
          group: group()
        })
      );
      props.setMessage("");
    }
    return null;
  };

  onCleanup(() => {
    setExitClosed(true);
    chatSocket.close();
  });

  createEffect(on(() => props.messages(), () => {
    // eslint-disable-next-line solid/reactivity
    Promise.resolve().then(() => scrollBottom());
  }));

  return (
    <>
      <ul class="flex flex-col flex-items-start">
        <For each={props.messages()}>
          {message => (
            <>
              <div class="h-9"/>
              <Message text={message.text} author={message.author} you={message.you} />
            </>
          )}
        </For>
      </ul>
      <ChatInput message={props.message} setMessage={props.setMessage} callback={sendMessage} />
    </>
  );
};

export default Chat;

const ChatInput: Component<{message: Accessor<string>; setMessage: Setter<string>; callback: () => void}> = props => {
  const handleSend = () => {
    console.log(`Sending message: %c${props.message()}`, "color:#0069FD;font-style:italic;");
    props.callback();
  };

  let ref!: HTMLInputElement;
  createEventListener(
    () => ref,
    "keypress",
    (e: KeyboardEvent) => {
      if (e.key === "Enter") handleSend();
    },
    { passive: true }
  );

  return (
    <>
      <div class="mt-5 h-10" />
      <div class="absolute bottom-21.5 left-5 right-5 mt-5 h-10 bg-gray2 pb-5">
        <div class="h-full flex justify-between flex-items-center b-rd-5 bg-white">
          <input ref={ref} value={props.message()} onInput={e => props.setMessage(e.currentTarget.value)} class="w-full b-0 bg-transparent px-4 outline-none placeholder:font-2.75 placeholder:c-gray3" placeholder="Envoyer un message..." type="text" />
          <img onClick={handleSend} class="mr-4 min-w-7" src="/assets/send.svg" alt="send" />
        </div>
      </div>
    </>
  );
};


const Message: Component<{text: string; author: string; you: boolean}> = props => {
  return (
    <Show when={!props.you} fallback={
      <div class="relative max-w-[80%] w-auto flex-self-end b-rd-5 bg-primary px-4 py-3 text-3.75 font-400 c-white" style={{"word-wrap": "break-word"}}>
        <small class="absolute right-4 whitespace-nowrap text-2.5 font-500 c-primary -top-4">{props.author.toUpperCase()}</small>
        {props.text}
      </div>
    }>
      <div class="relative w-auto b-rd-5 bg-gray3 px-4 py-3 text-3.75 font-500 c-gray1">
        <small class="absolute left-4 whitespace-nowrap text-2.5 -top-4">{props.author.toUpperCase()}</small>
        {props.text}
      </div>
    </Show>
  );
};
