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
        "https://jorgeporras94n8n.app.n8n.cloud/webhook/b75b2e60-0a13-40c9-b33e-289b8ed435af/chat",
      target: chatContainer.current,
      mode: "manual",
      showTriggerButton: false,
      language: "es",
      initialMessages: [
        "¡Hola! 👋",
        "Mi nombre es FarmaIA. ¿En qué puedo ayudarte hoy?",
      ],
      i18n: {
        es: {
          title: "¡Hola! 👋",
          subtitle: "Estamos aquí para ayudarte las 24 horas, todos los días.",
          getStarted: "Nueva conversación",
          placeholder: "Escribe tu pregunta...",
          inputPlaceholder: "Escribe tu pregunta...",
          sendButtonLabel: "Enviar",
        },
      },
      theme: {
        colorScheme: "light",
        primaryColor: "#2563eb", // Azul principal
        headerBackgroundColor: "#2563eb",
        headerTextColor: "#ffffff",
        userMessageColor: "#dbeafe", // Fondo del usuario (azul claro)
        userMessageTextColor: "#1e3a8a", // Texto del usuario
        botMessageColor: "#f1f5f9", // Fondo del bot (gris azulado)
      },
      enableStreaming: false,
    });
  }, []);

  return (
    <div
      ref={chatContainer}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 320,
        height: 420,
      }}
    />
  );
}