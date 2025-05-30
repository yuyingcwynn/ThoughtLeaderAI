import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, RotateCcw, User, Building2 } from "lucide-react";

export default function AIReadiness() {
  const [currentQuiz, setCurrentQuiz] = useState<'selection' | 'personal' | 'enterprise'>('selection');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [personalRatings, setPersonalRatings] = useState<Record<string, number>>({});
  const [enterpriseAnswers, setEnterpriseAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const personalQuestions = [
    {
      id: "capability",
      category: "Technology Capability",
      question: "What is the state of Generative AI technology capability in 2025?",
      description: "As of 2025, key highlights include:",
      bullets: [
        "Multimodal models (text, image, video, audio)",
        "AI agents and autonomous systems", 
        "On-device AI and edge computing",
        "Real-time AI applications",
        "Domain-specific foundation models"
      ],
      context: "Rate your knowledge for each area (0-5): 0 = zero knowledge, 5 = I know it and keep up to date"
    },
    {
      id: "usecases",
      category: "Core Use Cases", 
      question: "What are the core use cases mature enough to deploy Generative AI on right now in 2025?",
      description: "Current top production-ready use cases:",
      bullets: [
        "Content generation and creative automation",
        "Code generation and development assistance",
        "Data analysis and insight extraction", 
        "Customer service and conversational AI",
        "Process automation and workflow optimization"
      ],
      context: "Rate your knowledge for each use case (0-5): 0 = don't know any use case, 5 = know all the best ones and keep up to date"
    },
    {
      id: "risk",
      category: "Legal and Risk",
      question: "What is the current legal and risk landscape for Generative AI in 2025?",
      description: "Top areas of concern:",
      bullets: [
        "AI regulations and compliance requirements",
        "Intellectual property and copyright issues",
        "Data privacy and security concerns",
        "Bias and fairness in AI systems", 
        "Liability and accountability frameworks"
      ],
      context: "Rate your knowledge for each area (0-5): 0 = zero knowledge, 5 = I know it and keep up to date"
    },
    {
      id: "disruption",
      category: "Disruptions",
      question: "What areas are or will quickly be at risk for total disruption from Generative AI?",
      description: "Key disruption areas:",
      bullets: [
        "Content creation and media industries",
        "Software development and IT services", 
        "Professional services and consulting",
        "Education and training sectors",
        "Healthcare and scientific research"
      ],
      context: "Rate your awareness for each area (0-5): 0 = not aware of any disruption, 5 = understand business model and industry disruption with timeline"
    }
  ];

  const enterpriseQuestions = [
    {
      category: "AI Strategy",
      question: "Does your organization have a comprehensive AI strategy?",
      options: [
        "No formal AI strategy exists",
        "Basic AI exploration and pilot projects", 
        "Defined AI strategy with clear objectives",
        "Comprehensive AI strategy with implementation roadmap",
        "Advanced AI-native strategy with continuous evolution"
      ]
    },
    {
      category: "Data Infrastructure",
      question: "How mature is your organization's data infrastructure for AI?",
      options: [
        "Limited data organization and accessibility",
        "Basic data management and some AI-ready datasets",
        "Well-organized data with AI integration capabilities", 
        "Advanced data architecture optimized for AI workloads",
        "AI-native data infrastructure with real-time processing"
      ]
    },
    {
      category: "Technical Capabilities", 
      question: "What is your organization's technical AI implementation capability?",
      options: [
        "No dedicated AI technical resources",
        "Basic AI tools and external vendor reliance",
        "Internal AI development team and capabilities",
        "Advanced AI engineering and custom model development",
        "Cutting-edge AI research and innovation capabilities"
      ]
    },
    {
      category: "Governance & Risk",
      question: "How advanced is your AI governance and risk management?", 
      options: [
        "No formal AI governance framework",
        "Basic AI usage policies and guidelines",
        "Structured AI governance with risk assessment",
        "Comprehensive AI ethics and compliance framework",
        "Advanced AI safety and responsible AI leadership"
      ]
    },
    {
      category: "Culture & Adoption",
      question: "What is your organization's AI adoption and culture maturity?",
      options: [
        "Limited AI awareness and resistance to change",
        "Growing AI interest with isolated adoption",
        "Widespread AI adoption across departments",
        "AI-first culture with systematic integration", 
        "AI-native organization with continuous innovation"
      ]
    },
    {
      category: "Business Impact",
      question: "What level of business impact has AI achieved in your organization?",
      options: [
        "No measurable AI business impact",
        "Limited efficiency gains in specific areas",
        "Significant productivity improvements and cost savings",
        "Transformational business outcomes and new capabilities",
        "AI-driven competitive advantage and market leadership"
      ]
    }
  ];

  const getPersonalScore = () => {
    return Object.values(personalRatings).reduce((sum, rating) => sum + rating, 0);
  };

  const getEnterpriseScore = () => {
    return enterpriseAnswers.reduce((sum, answer) => sum + answer, 0);
  };

  const getTotalBullets = () => {
    return personalQuestions.reduce((total, q) => total + q.bullets.length, 0);
  };

  const getPersonalReadinessLevel = (score: number) => {
    const maxScore = getTotalBullets() * 5;
    const percentage = (score / maxScore) * 100;
    
    if (percentage <= 20) return { level: "Beginner", color: "bg-red-500", description: "Limited AI awareness - Focus on basic education" };
    if (percentage <= 40) return { level: "Developing", color: "bg-orange-500", description: "Growing understanding - Continue learning" };
    if (percentage <= 60) return { level: "Proficient", color: "bg-yellow-500", description: "Good foundation - Ready for implementation" };
    if (percentage <= 80) return { level: "Advanced", color: "bg-blue-500", description: "Strong expertise - Leadership potential" };
    return { level: "Expert", color: "bg-green-500", description: "Comprehensive mastery - Thought leader" };
  };

  const getEnterpriseMaturityLevel = (score: number) => {
    if (score <= 6) return { level: "Exploring", color: "bg-red-500", description: "Early AI exploration phase" };
    if (score <= 12) return { level: "Developing", color: "bg-orange-500", description: "Building AI capabilities" };
    if (score <= 18) return { level: "Scaling", color: "bg-yellow-500", description: "Systematic AI deployment" };
    if (score <= 24) return { level: "Leading", color: "bg-blue-500", description: "AI-driven transformation" };
    return { level: "AI-Native", color: "bg-green-500", description: "AI-first organization" };
  };

  const handlePersonalRating = (bulletId: string, rating: number) => {
    setPersonalRatings(prev => ({
      ...prev,
      [bulletId]: rating
    }));
  };

  const handleEnterpriseAnswer = (answerIndex: number) => {
    const newAnswers = [...enterpriseAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setEnterpriseAnswers(newAnswers);

    if (currentQuestion < enterpriseQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setPersonalRatings({});
    setEnterpriseAnswers([]);
    setShowResults(false);
  };

  const goToQuizSelection = () => {
    setCurrentQuiz('selection');
    resetQuiz();
  };

  const canProceedToResults = () => {
    if (currentQuiz === 'personal') {
      const totalBullets = getTotalBullets();
      return Object.keys(personalRatings).length === totalBullets;
    }
    return false;
  };

  const renderQuizSelection = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          AI Readiness <span className="gradient-text">Assessment</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Evaluate your AI readiness with our comprehensive assessment tools
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
                onClick={() => setCurrentQuiz('personal')}>
            <CardHeader className="text-center p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center">
                  <User className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Personal AI Readiness</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Rate your knowledge across key AI areas using a 0-5 scale for each technology, use case, risk factor, and disruption area
              </p>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <Button className="w-full gradient-bg text-white font-semibold py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Start Personal Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
                onClick={() => setCurrentQuiz('enterprise')}>
            <CardHeader className="text-center p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enterprise AI Maturity</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Evaluate your organization's AI maturity across strategy, infrastructure, capabilities, and culture
              </p>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <Button className="w-full gradient-bg text-white font-semibold py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Start Enterprise Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );

  const renderPersonalQuiz = () => {
    const currentQuestionData = personalQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / personalQuestions.length) * 100;
    
    // Check if all bullets in current question are rated
    const currentQuestionBullets = currentQuestionData.bullets.map((_, index) => 
      `${currentQuestionData.id}-${index}`
    );
    const currentQuestionCompleted = currentQuestionBullets.every(bulletId => 
      personalRatings[bulletId] !== undefined
    );

    const canGoNext = currentQuestionCompleted && currentQuestion < personalQuestions.length - 1;
    const canGoBack = currentQuestion > 0;
    const canViewResults = currentQuestionCompleted && currentQuestion === personalQuestions.length - 1;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              onClick={goToQuizSelection}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Selection
            </Button>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {personalQuestions.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <Card className="bg-white dark:bg-gray-800 shadow-xl">
            <CardHeader className="p-8 text-center">
              <Badge variant="secondary" className="mb-4 text-xs mx-auto w-fit">
                {currentQuestionData.category}
              </Badge>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {currentQuestionData.question}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {currentQuestionData.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                {currentQuestionData.context}
              </p>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-8">
                {currentQuestionData.bullets.map((bullet, bulletIndex) => {
                  const bulletId = `${currentQuestionData.id}-${bulletIndex}`;
                  const currentRating = personalRatings[bulletId];
                  
                  return (
                    <div key={bulletIndex} className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300 font-medium text-center">
                        {bullet}
                      </p>
                      <div className="flex items-center justify-center space-x-4">
                        <span className="text-sm text-gray-500 text-right w-32">
                          {currentQuestionData.id === 'disruption' 
                            ? 'not aware of any disruption' 
                            : 'zero knowledge'}
                        </span>
                        <div className="flex space-x-2">
                          {[0, 1, 2, 3, 4, 5].map(rating => (
                            <Button
                              key={rating}
                              variant={currentRating === rating ? "default" : "outline"}
                              size="sm"
                              className={`w-12 h-12 rounded-full ${
                                currentRating === rating 
                                  ? "bg-primary text-white" 
                                  : "hover:bg-primary/10"
                              }`}
                              onClick={() => handlePersonalRating(bulletId, rating)}
                            >
                              {rating}
                            </Button>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 text-left w-32">
                          {currentQuestionData.id === 'disruption' 
                            ? 'understand business model and industry disruption with timeline' 
                            : 'I know it and keep up to date'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  disabled={!canGoBack}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                <div className="flex space-x-4">
                  {canGoNext && (
                    <Button
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      className="gradient-bg text-white flex items-center"
                    >
                      Next Question
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}

                  {canViewResults && (
                    <Button
                      onClick={() => setShowResults(true)}
                      className="gradient-bg text-white flex items-center"
                    >
                      View My Results
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  };

  const renderEnterpriseQuiz = () => {
    const question = enterpriseQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / enterpriseQuestions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              onClick={goToQuizSelection}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Selection
            </Button>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {enterpriseQuestions.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-xl">
            <CardHeader className="text-center p-8">
              <Badge variant="secondary" className="mb-4 text-xs">
                {question.category}
              </Badge>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {question.question}
              </h2>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start p-4 h-auto min-h-[60px] hover:bg-primary/5 hover:border-primary transition-all duration-200"
                    onClick={() => handleEnterpriseAnswer(index)}
                  >
                    <div className="flex items-center w-full">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-4 flex-shrink-0">
                        {index}
                      </span>
                      <span className="text-sm leading-relaxed">{option}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  };

  const renderResults = () => {
    const isPersonal = currentQuiz === 'personal';
    const score = isPersonal ? getPersonalScore() : getEnterpriseScore();
    const maxScore = isPersonal ? getTotalBullets() * 5 : 30;
    const readiness = isPersonal ? getPersonalReadinessLevel(score) : getEnterpriseMaturityLevel(score);
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-xl">
            <CardHeader className="text-center p-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Your {isPersonal ? 'AI Readiness' : 'AI Maturity'} Results
              </h1>
              
              {/* Score Visualization */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${percentage * 2.51} 251`}
                    className="text-primary transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{score}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">/ {maxScore}</div>
                  </div>
                </div>
              </div>

              <div className={`inline-block px-6 py-3 rounded-full text-white font-semibold text-lg ${readiness.color}`}>
                {readiness.level}
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                {readiness.description}
              </p>
            </CardHeader>

            <CardContent className="p-12 pt-0">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={resetQuiz}
                  variant="outline"
                  className="flex items-center"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Assessment
                </Button>
                <Button 
                  onClick={() => window.location.href = '/contact'}
                  className="gradient-bg text-white"
                >
                  Get Expert Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {currentQuiz === 'selection' && renderQuizSelection()}
        {currentQuiz === 'personal' && !showResults && renderPersonalQuiz()}
        {currentQuiz === 'enterprise' && !showResults && renderEnterpriseQuiz()}
        {showResults && renderResults()}
      </div>
      <Footer />
    </div>
  );
}