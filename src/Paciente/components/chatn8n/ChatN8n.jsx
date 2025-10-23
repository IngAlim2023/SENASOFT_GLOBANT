import { useEffect, useRef } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";

export default function ChatN8n() {
  const chatContainer = useRef(null);
  const chatInstance = useRef(null);

  useEffect(() => {
    if (!chatContainer.current) return;
    if (chatInstance.current) return;

    chatInstance.current = createChat({
      webhookUrl:
        "https://jorgeporras94n8n.app.n8n.cloud/webhook/f0e42214-f29d-4ea7-bdc6-5658fe511fcc/chat",
      target: chatContainer.current,
      mode: "manual",
      showTriggerButton: false,
      initialMessages: [
        "¡Hola! 👋",
        "Mi nombre es FarmaIA. ¿En qué puedo ayudarte hoy?",
      ],
      i18n: {
        es: {
          title: '¡Hola! 👋',
          subtitle: 'Inicia un chat. Estamos aquí para ay udarte 24/7.',
          footer: '',
          getStarted: 'Nueva conversación',
          Placeholder: 'Escribe tu pregunta...',
        },
      },
      enableStreaming: false,
    });
  }, []);

  return (
    <div
      ref={chatContainer}
      style={{ position: "fixed", bottom: 20, right: 20, width: 300, height: 400 }}
    />
  );
}
