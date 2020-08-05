import React, { createContext, useContext, useState } from "react";

const LanguagesContext = createContext();

export const languages = {
  ptBR: {
    title: "Principal",
    description: "Caixa de entrada",
    fileBtn: "Arquivar",
    date: "Hoje",
    hour: "Hora(s)",
  },
  en: {
    title: "Home",
    description: "Inbox",
    fileBtn: "File",
    date: "Today",
    hour: "Hour(s)",
  }
};

export default function LanguagesProvider({ children }) {
  const [language, setLanguage] = useState(languages.ptBR);

  return (
    <LanguagesContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguagesContext.Provider>
  );
}

export function useLanguages() {
  const context = useContext(LanguagesContext);
  if (!context) throw new Error("useLanguages must be used within a LanguagesProvider");
  const { language, setLanguage } = context;
  return { language, setLanguage };
}