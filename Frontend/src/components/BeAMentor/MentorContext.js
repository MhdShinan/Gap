import React, { createContext, useState } from "react";

export const MentorContext = createContext();

export const MentorProvider = ({ children }) => {
  const [mentorDecision, setMentorDecision] = useState(null);

  return (
    <MentorContext.Provider value={{ mentorDecision, setMentorDecision }}>
      {children}
    </MentorContext.Provider>
  );
};
