import { useEffect, useRef, useState } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css"; // Asegúrate de importar esto

export default function ChatN8n() {
  const chatContainer = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatError, setChatError] = useState(null);

  useEffect(() => {
    if (chatContainer.current && isChatOpen) {
      try {
        const chat = createChat({
          webhookUrl: "https://jorgeporras94n8n.app.n8n.cloud/webhook/f0e42214-f29d-4ea7-bdc6-5658fe511fcc/chat",
          target: chatContainer.current,
          mode: "embedded",
          webhookConfig: {
            method: "POST",
            headers: {},
          },
          chatInputKey: "chatInput",
          chatSessionKey: "sessionId",
          loadPreviousSession: true,
          metadata: {},
          showWelcomeScreen: false,
          defaultLanguage: "es",
          initialMessages: [
            "¡Hola! 👋",
            "Mi nombre es FarmaIA. ¿En qué puedo ayudarte hoy?",
          ],
          i18n: {
            es: {
              title: "¡Hola! 👋",
              subtitle: "Inicia un chat. Estamos aquí para ayudarte 24/7.",
              footer: "",
              getStarted: "Nueva Conversación",
              inputPlaceholder: "Escribe tu pregunta...",
            },
          },
          enableStreaming: false,
          theme: {
            primaryColor: "#3B82F6",
            backgroundColor: "#FFFFFF",
            textColor: "#1F2937",
            userMessage: {
              backgroundColor: "#3B82F6",
              textColor: "#FFFFFF",
            },
            botMessage: {
              backgroundColor: "#F3F4F6",
              textColor: "#1F2937",
            },
          },
        });

        console.log("Chat inicializado correctamente:", chat);
      } catch (error) {
        console.error("Error al inicializar el chat:", error);
        setChatError("No se pudo cargar el chat. Intenta recargar la página.");
      }
    }
  }, [isChatOpen]);

  return (
    <>
      {chatError && (
        <div className="fixed bottom-6 right-6 z-[1001] max-w-sm text-sm bg-red-50 text-red-800 border border-red-200 px-4 py-2 rounded-lg shadow-md">
          {chatError}
        </div>
      )}

      {/* Contenedor del Chat con animación */}
      <div
        ref={chatContainer}
        className={`fixed bottom-6 right-6 z-[1000] w-[350px] h-[500px] bg-white rounded-xl border border-gray-200 shadow-xl transition-transform duration-300 ease-in-out ${
          isChatOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      />

      {/* Botón de Toggle */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-[1001] w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform duration-300 ease-in-out focus:outline-none"
        aria-label="Abrir o cerrar chat"
      >
        {isChatOpen ? "✖" : "💬"}
      </button>
    </>
  );
}
