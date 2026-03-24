import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const PORTFOLIO_CONTEXT = `You are Mokara Durga Prasad's AI portfolio assistant. Answer questions about his skills, projects, education, and experience based on the following:

**About:** Full-Stack Developer specializing in AI Agents & Automation, AI Chatbot Automation, Prompt Engineering, AI & Machine Learning, Full Stack Development, NLP, and LLM.

**Skills:** AI/ML (Artificial Intelligence, Machine Learning, NLP, LLMs, Prompt Engineering), AI Agents & Automation, Full Stack (HTML, CSS, JavaScript, React.js, Node.js, Express.js, REST APIs, SQL), Tools (Git, GitHub, VS Code).

**Education:** B.Tech AI at PIET, Parul University (2022-2026, CGPA 7.10). Intermediate MPC at Sri Basara Junior College (2020-2022). School at Gostani Vidyapeeta High School (88%).

**Contact:** durgamokara15@gmail.com, Phone: 9573308774, GitHub: durgaprasad-mokara, LinkedIn: durga-prasad-mokara.

Keep answers concise, professional, and helpful. If asked something outside the portfolio scope, politely redirect.`;

const getAIResponse = (userMessage: string, history: Message[]): string => {
  const msg = userMessage.toLowerCase();

  if (msg.includes("skill") || msg.includes("tech") || msg.includes("know"))
    return "Durga Prasad specializes in **AI & Machine Learning** (NLP, LLMs, Prompt Engineering), **AI Agents & Automation**, and **Full Stack Development** (React.js, Node.js, Express.js, REST APIs, SQL). He's also proficient with Git, GitHub, and VS Code.";

  if (msg.includes("education") || msg.includes("study") || msg.includes("degree") || msg.includes("college"))
    return "He's pursuing a **B.Tech in Artificial Intelligence** at PIET, Parul University (2022–2026) with a CGPA of 7.10. He completed Intermediate (MPC) at Sri Basara Junior College and schooling at Gostani Vidyapeeta High School with 88%.";

  if (msg.includes("contact") || msg.includes("email") || msg.includes("reach") || msg.includes("hire"))
    return "You can reach Durga Prasad at:\n📧 **durgamokara15@gmail.com**\n📱 **9573308774**\n🔗 [LinkedIn](https://linkedin.com/in/durga-prasad-mokara)\n🐙 [GitHub](https://github.com/durgaprasad-mokara)";

  if (msg.includes("project") || msg.includes("work") || msg.includes("built"))
    return "Durga Prasad has worked on projects spanning **AI chatbot automation**, **full-stack web applications**, and **AI agent systems**. Check the Projects section on the portfolio for detailed demos and source code!";

  if (msg.includes("who") || msg.includes("about") || msg.includes("introduce") || msg.includes("tell me"))
    return "**Mokara Durga Prasad** is a passionate Full-Stack Developer and AI enthusiast. He builds scalable, intelligent digital solutions combining automation, artificial intelligence, and seamless user experiences. Currently pursuing B.Tech in AI at Parul University.";

  if (msg.includes("resume") || msg.includes("cv"))
    return "You can explore Durga Prasad's full portfolio right here! For a downloadable resume, please reach out via email at **durgamokara15@gmail.com**.";

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey"))
    return "Hey there! 👋 I'm Durga Prasad's AI assistant. Ask me about his **skills**, **projects**, **education**, or how to **contact** him!";

  return "Great question! I can tell you about Durga Prasad's **skills**, **projects**, **education**, **certifications**, or **contact info**. What would you like to know?";
};

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm Durga Prasad's AI assistant. Ask me anything about his skills, projects, or experience!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(userMsg.content, messages);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg glow-primary"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle AI Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[480px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden border border-border/50 bg-card/80 backdrop-blur-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border/50 flex items-center gap-3 bg-card/60 backdrop-blur-xl">
              <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Portfolio AI</p>
                <p className="text-xs text-muted-foreground">Ask about Durga Prasad</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-accent" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border/50 bg-card/60 backdrop-blur-xl">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
