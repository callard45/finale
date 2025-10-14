import React, { useState, useEffect, useRef } from "react";
import { NavigationSection } from "../Dashboard/sections/NavigationSection";
import { Button } from "../../components/ui/button";
import { 
  SendIcon, 
  RefreshCw,
  AlertCircleIcon
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";

// Initial message from the career agent
const initialMessages = [
  {
    sender: "ai",
    content: "Hello! I'm your AI career agent, and I'm here to help you build a comprehensive professional profile. I'll ask you a series of questions to understand your background, skills, and career aspirations. Let's start with your name - what should I call you?"
  }
];

export const AIInterview = (): JSX.Element => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [interviewProgress, setInterviewProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Calculate dynamic progress based on conversation depth and quality
  const calculateProgress = (conversationLength: number, isCompleted: boolean) => {
    if (isCompleted) return 100;
    
    // Base progress calculation
    // We expect around 8-12 meaningful exchanges for a complete profile
    const expectedExchanges = 10;
    const baseProgress = Math.min((conversationLength / expectedExchanges) * 85, 85);
    
    // Add bonus progress for longer, more detailed responses
    const userMessages = messages.filter(msg => msg.sender === "user");
    const avgResponseLength = userMessages.reduce((acc, msg) => acc + msg.content.length, 0) / Math.max(userMessages.length, 1);
    
    // Bonus for detailed responses (50+ characters average)
    const detailBonus = avgResponseLength > 50 ? Math.min((avgResponseLength - 50) / 20, 10) : 0;
    
    return Math.min(Math.round(baseProgress + detailBonus), 90);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isComplete) return;
    
    // Clear any previous errors
    setError(null);
    
    // Add user message
    const newUserMessage = { sender: "user", content: inputText };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputText("");
    
    // Calculate and update progress immediately
    const newProgress = calculateProgress(updatedMessages.filter(msg => msg.sender === "user").length, false);
    setInterviewProgress(newProgress);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Prepare conversation history for API
      const conversationHistory = updatedMessages.map(msg => ({
        role: msg.sender === "ai" ? "assistant" : "user",
        content: msg.content
      }));

      // System message to define the AI's role and behavior
      const systemMessage = {
        role: "system",
        content: `You are a professional career agent designed to help users build comprehensive professional profiles. Your goal is to ask concise, single-sentence questions that gather key information about their career aspirations, educational background, skills, work experience, achievements, and preferences. 

Guidelines:
- Ask only ONE question per response
- Keep questions concise (1 sentence maximum)
- Focus on gathering specific, actionable information
- Ask about: career goals, education, skills, work experience, achievements, industry preferences, strengths, areas for development, certifications, and work environment preferences
- Do not provide explanations or conversational filler
- Be professional but friendly
- Each question should help build a complete professional profile
- When you believe you have gathered enough information to build a comprehensive professional profile (typically after 8-12 meaningful exchanges), conclude your response by stating: 'Profile interview complete. You can now proceed to generate your documents.' Do not ask further questions after this statement.`
      };

      // Simulate API call with a timeout
      setTimeout(() => {
        // Simulate AI response
        const aiResponses = [
          "What specific skills or technical competencies do you possess that are relevant to your desired career path?",
          "Could you tell me about your educational background, including degrees, institutions, and graduation years?",
          "What work experience do you have, including internships or part-time roles?",
          "What are your short-term and long-term career goals?",
          "Can you describe a significant professional achievement you're proud of?",
          "What industries or sectors are you most interested in working in?",
          "What are your key strengths that set you apart from other candidates?",
          "Do you have any certifications or specialized training relevant to your field?",
          "What type of work environment do you thrive in?",
          "Profile interview complete. You can now proceed to generate your documents."
        ];
        
        // Get next response based on conversation length
        const responseIndex = Math.min(updatedMessages.filter(msg => msg.sender === "user").length - 1, aiResponses.length - 1);
        const aiResponseContent = aiResponses[responseIndex];
        
        // Check if the AI has completed the interview
        const isInterviewComplete = aiResponseContent.includes("Profile interview complete. You can now proceed to generate your documents.");
        
        let displayContent = aiResponseContent;
        if (isInterviewComplete) {
          // Remove the completion phrase from the displayed message
          displayContent = aiResponseContent.replace("Profile interview complete. You can now proceed to generate your documents.", "").trim();
          setIsComplete(true);
          setInterviewProgress(100);
        } else {
          // Recalculate progress with the new AI response
          const finalProgress = calculateProgress(updatedMessages.filter(msg => msg.sender === "user").length, false);
          setInterviewProgress(finalProgress);
        }

        // Add AI response (with cleaned content if interview is complete)
        const newAiMessage = { sender: "ai", content: displayContent };
        setMessages(prev => [...prev, newAiMessage]);
        
        // If interview is complete, add a completion message after a delay
        if (isInterviewComplete) {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              sender: "ai",
              content: "Thank you for completing the profile interview! I've gathered comprehensive information about your professional background and career goals. You can now proceed to generate your personalized documents."
            }]);
          }, 1000);
        }
        
        setIsTyping(false);
      }, 1500);

    } catch (error) {
      console.error("Error in interview process:", error);
      setError("I'm having trouble connecting right now. Please try again.");
      setMessages(prev => [...prev, { 
        sender: "ai", 
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later." 
      }]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
    setIsComplete(false);
    setInterviewProgress(0);
    setError(null);
    setShowResetModal(false);
  };

  const handleResetClick = () => {
    setShowResetModal(true);
  };

  const handleCancelReset = () => {
    setShowResetModal(false);
  };
  
  return (
    <main className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 overflow-hidden">
      <aside className="h-full w-60 flex-shrink-0">
        <NavigationSection />
      </aside>
      
      <div className="flex-1 flex flex-col h-full">
        {/* Enhanced Header with Full Width */}
        <div className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
          <div className="w-full px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent tracking-tight">
                  AI Career Interview
                </h1>
                <p className="text-slate-600 font-medium">
                  Let our AI career agent help you build a comprehensive professional profile
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetClick}
                className="gap-2 bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </Button>
            </div>
            
            {/* Enhanced Progress Bar - Full Width */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-700 tracking-wide">Interview Progress</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    interviewProgress > 0 ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'
                  }`}></div>
                  <span className="text-sm font-bold text-slate-800 min-w-[3rem] text-right">
                    {Math.round(interviewProgress)}%
                  </span>
                </div>
              </div>
              
              <div className="relative w-full bg-slate-200/60 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 h-4 rounded-full transition-all duration-700 ease-out relative shadow-sm"
                  style={{ width: `${interviewProgress}%` }}
                >
                  {/* Enhanced shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-indigo-500/50 rounded-full blur-sm"></div>
                </div>
              </div>
              
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span className={`transition-colors duration-300 ${interviewProgress > 10 ? 'text-blue-600' : ''}`}>
                  Getting started
                </span>
                <span className={`transition-colors duration-300 ${interviewProgress > 50 ? 'text-blue-600' : ''}`}>
                  Building profile
                </span>
                <span className={`transition-colors duration-300 ${interviewProgress >= 100 ? 'text-emerald-600 font-semibold' : ''}`}>
                  Complete
                </span>
              </div>
            </div>

            {/* Enhanced Error Display - Full Width */}
            {error && (
              <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/60 rounded-2xl flex items-center gap-3 shadow-sm animate-slideIn">
                <AlertCircleIcon className="w-5 h-5 text-red-500" />
                <span className="text-red-700 font-medium">{error}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setError(null)}
                  className="ml-auto bg-white/60 border-red-200 text-red-600 hover:bg-red-50"
                >
                  Dismiss
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced Chat Area - Full Width */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full w-full flex flex-col">
            {/* Messages Container with Full Width */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex animate-fadeIn ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {message.sender === 'ai' && (
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-blue-100">
                        <img 
                          src="/logo.png" 
                          alt="AI" 
                          className="w-7 h-7"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/28x28/white/blue?text=AI";
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                    <div className={`p-5 rounded-3xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-tr-lg shadow-blue-200/50' 
                        : 'bg-white/90 text-slate-800 rounded-tl-lg border border-white/40 shadow-slate-200/50'
                    }`}>
                      <p className="leading-relaxed text-base font-medium">{message.content}</p>
                    </div>
                    <div className={`text-xs text-slate-400 mt-2 font-medium ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {message.sender === 'user' ? 'You' : 'AI Career Agent'}
                    </div>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 ml-4 order-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg ring-2 ring-slate-200">
                        U
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Enhanced Typing indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-blue-100">
                      <img 
                        src="/logo.png" 
                        alt="AI" 
                        className="w-7 h-7"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/28x28/white/blue?text=AI";
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="p-5 bg-white/90 backdrop-blur-sm text-slate-800 rounded-3xl rounded-tl-lg border border-white/40 shadow-lg">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef}></div>
            </div>

            {/* Enhanced Input Area - Full Width */}
            <div className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-t border-white/20 px-8 py-8">
              {isComplete ? (
                <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border border-emerald-200/60 p-8 rounded-3xl shadow-lg backdrop-blur-sm w-full">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-emerald-100">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-emerald-800 text-xl mb-3 tracking-tight">Interview Complete!</h3>
                      <p className="text-emerald-700 font-medium leading-relaxed">
                        You've successfully completed the profile interview. Your comprehensive profile information has been gathered and is ready for document generation.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 w-full">
                  <Input
                    className="flex-1 h-16 rounded-3xl bg-white/90 backdrop-blur-sm border-white/40 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 px-8 text-base placeholder:text-slate-400 shadow-lg font-medium transition-all duration-300"
                    placeholder="Type your response here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)} 
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                  />
                  <Button 
                    className="h-16 w-16 rounded-3xl bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-blue-100 hover:ring-blue-200"
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                  >
                    <SendIcon className="w-6 h-6 text-white" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md mx-4 shadow-2xl border border-white/40 animate-slideIn">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center shadow-sm">
                <AlertCircleIcon className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Reset Interview</h3>
                <p className="text-slate-600 text-sm font-medium">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-8 leading-relaxed font-medium">
              Are you sure you want to reset the interview? All your progress and responses will be lost.
            </p>
            
            <div className="flex gap-3 justify-end">
              <Button 
                variant="outline" 
                onClick={handleCancelReset}
                className="px-8 h-12 rounded-2xl bg-white/60 border-slate-200 hover:bg-slate-50 font-semibold transition-all duration-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleClearChat}
                className="px-8 h-12 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Reset Interview
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};