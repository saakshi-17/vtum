import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Target, BookOpen, AlertCircle, Zap, Trophy, Star } from 'lucide-react';

interface AIPredictorTabProps {
  selectedScheme: string;
  selectedBranch: string;
  selectedSem: string;
  branches: Record<string, string>;
  schemes: string[];
  semesters: string[];
  subjectsData: any;
}

const AIPredictorTab: React.FC<AIPredictorTabProps> = ({
  selectedScheme,
  selectedBranch,
  selectedSem,
  branches,
  schemes,
  semesters,
  subjectsData
}) => {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showFlashcardGame, setShowFlashcardGame] = useState(false);
  const [gameStats, setGameStats] = useState<any>(null);

  const styles = {
    container: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #333'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #333'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '700' as const,
      color: '#ffffff'
    },
    subtitle: {
      color: '#888',
      margin: 0
    },
    tabContainer: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      borderBottom: '1px solid #333'
    },
    tab: {
      padding: '0.75rem 1.5rem',
      background: 'transparent',
      border: 'none',
      color: '#888',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500' as const,
      borderBottom: '2px solid transparent',
      transition: 'all 0.3s ease'
    },
    activeTab: {
      padding: '0.75rem 1.5rem',
      background: 'transparent',
      border: 'none',
      color: '#667eea',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500' as const,
      borderBottom: '2px solid #667eea',
      transition: 'all 0.3s ease'
    },
    predictButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#ffffff',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600' as const,
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'transform 0.2s ease'
    },
    predictionCard: {
      background: '#2a2a3e',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #444',
      marginBottom: '1rem'
    },
    probabilityBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600' as const,
      marginBottom: '0.5rem'
    },
    highProbability: {
      background: 'rgba(34, 197, 94, 0.2)',
      color: '#22c55e',
      border: '1px solid rgba(34, 197, 94, 0.3)'
    },
    mediumProbability: {
      background: 'rgba(251, 191, 36, 0.2)',
      color: '#fbbf24',
      border: '1px solid rgba(251, 191, 36, 0.3)'
    },
    lowProbability: {
      background: 'rgba(239, 68, 68, 0.2)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.3)'
    },
    gameContainer: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      borderRadius: '12px',
      marginTop: '2rem',
      color: '#ffffff'
    },
    flashcardContainer: {
      background: '#ffffff',
      color: '#000000',
      padding: '2rem',
      borderRadius: '12px',
      minHeight: '300px',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center' as const,
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      marginBottom: '1rem'
    },
    gameStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '1rem',
      borderRadius: '8px',
      textAlign: 'center' as const
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: 'bold' as const,
      marginBottom: '0.25rem'
    },
    statLabel: {
      fontSize: '0.875rem',
      opacity: 0.9
    }
  };

  const [activeSubTab, setActiveSubTab] = useState('predictor');
  const [currentFlashcard, setCurrentFlashcard] = useState<any>(null);
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);

  const generateMockPredictions = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockPredictions = [
        {
          type: 'high-probability',
          topic: 'Data Structures - Trees',
          probability: 85,
          reason: 'Appeared in 8 out of 10 previous papers',
          suggestedPreparation: 'Focus on Binary Trees, BST, and Tree Traversals'
        },
        {
          type: 'high-probability',
          topic: 'Algorithms - Sorting',
          probability: 78,
          reason: 'Consistently asked in external exams',
          suggestedPreparation: 'Practice Quick Sort, Merge Sort implementations'
        },
        {
          type: 'module-based',
          module: 'Module 3',
          probability: 72,
          reason: '35% of questions from this module',
          suggestedPreparation: 'Complete revision of Module 3 concepts'
        },
        {
          type: 'difficulty-trend',
          difficulty: 'medium',
          probability: 68,
          reason: 'Medium difficulty questions are most common',
          suggestedPreparation: 'Focus on medium-level problem solving'
        }
      ];

      const mockAnalysis = {
        confidence: 'high',
        basedOnPapers: 8,
        frequentTopics: [
          { keyword: 'Binary Trees', frequency: 12 },
          { keyword: 'Sorting Algorithms', frequency: 10 },
          { keyword: 'Graph Algorithms', frequency: 8 }
        ],
        moduleDistribution: [
          { module: 'Module 3', count: 15, percentage: '35' },
          { module: 'Module 2', count: 12, percentage: '28' },
          { module: 'Module 1', count: 10, percentage: '23' }
        ]
      };

      setPredictions(mockPredictions);
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 1500);
  };

  const generateMockFlashcards = () => {
    const subjects = subjectsData[selectedScheme]?.[selectedBranch]?.[selectedSem] || [];
    if (subjects.length === 0) return [];

    const mockFlashcards = [
      {
        question: "What is the time complexity of Binary Search?",
        answer: "O(log n) - Binary search divides the search space in half with each comparison.",
        difficulty: "medium",
        subject: subjects[0]?.name || "Data Structures"
      },
      {
        question: "Explain the difference between Stack and Queue",
        answer: "Stack follows LIFO (Last In First Out) principle, while Queue follows FIFO (First In First Out) principle.",
        difficulty: "easy",
        subject: subjects[0]?.name || "Data Structures"
      },
      {
        question: "What is a Binary Search Tree?",
        answer: "A BST is a binary tree where left child < parent < right child for all nodes.",
        difficulty: "medium",
        subject: subjects[0]?.name || "Data Structures"
      },
      {
        question: "How does Quick Sort work?",
        answer: "Quick Sort uses divide-and-conquer by selecting a pivot and partitioning elements around it.",
        difficulty: "hard",
        subject: subjects[0]?.name || "Data Structures"
      }
    ];

    return mockFlashcards;
  };

  const startFlashcardGame = () => {
    const cards = generateMockFlashcards();
    setFlashcards(cards);
    setCurrentCardIndex(0);
    setCurrentFlashcard(cards[0]);
    setShowAnswer(false);
    setScore(0);
    setGameInProgress(true);
  };

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      const nextIndex = currentCardIndex + 1;
      setCurrentCardIndex(nextIndex);
      setCurrentFlashcard(flashcards[nextIndex]);
      setShowAnswer(false);
    } else {
      // Game completed
      completeGame();
    }
  };

  const completeGame = () => {
    const finalScore = Math.round((score / flashcards.length) * 100);
    setGameInProgress(false);
    
    // Mock API call to save score
    setGameStats({
      totalPoints: (gameStats?.totalPoints || 0) + finalScore,
      streakCount: (gameStats?.streakCount || 0) + 1,
      lastScore: finalScore
    });

    alert(`Game completed! You scored ${finalScore} points!`);
  };

  const markCorrect = () => {
    setScore(score + 1);
    nextCard();
  };

  const markIncorrect = () => {
    nextCard();
  };

  const getProbabilityStyle = (probability: number) => {
    if (probability >= 75) return styles.highProbability;
    if (probability >= 50) return styles.mediumProbability;
    return styles.lowProbability;
  };

  const getProbabilityLabel = (probability: number) => {
    if (probability >= 75) return 'High';
    if (probability >= 50) return 'Medium';
    return 'Low';
  };

  useEffect(() => {
    // Mock game stats
    setGameStats({
      totalPoints: 1250,
      streakCount: 5,
      lastScore: 85
    });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Brain size={24} color="#667eea" />
        <div>
          <h2 style={styles.title}>AI Question Predictor & Flashcard Game</h2>
          <p style={styles.subtitle}>
            AI-powered exam predictions and interactive learning games
          </p>
        </div>
      </div>

      <div style={styles.tabContainer}>
        <button
          style={activeSubTab === 'predictor' ? styles.activeTab : styles.tab}
          onClick={() => setActiveSubTab('predictor')}
        >
          <Target size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
          Question Predictor
        </button>
        <button
          style={activeSubTab === 'flashcards' ? styles.activeTab : styles.tab}
          onClick={() => setActiveSubTab('flashcards')}
        >
          <Zap size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
          Flashcard Game
        </button>
      </div>

      {activeSubTab === 'predictor' && (
        <>
          <button
            style={styles.predictButton}
            onClick={generateMockPredictions}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Brain size={20} />
            {loading ? 'Analyzing...' : 'Generate AI Predictions'}
          </button>

          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
              <Brain size={48} style={{ animation: 'pulse 2s infinite', marginBottom: '1rem' }} />
              <p>AI is analyzing previous question papers...</p>
            </div>
          )}

          {predictions.length > 0 && !loading && (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={20} />
                  Predicted Questions ({analysis?.confidence} confidence)
                </h3>
                
                {predictions.map((prediction, index) => (
                  <div key={index} style={styles.predictionCard}>
                    <div style={{
                      ...styles.probabilityBadge,
                      ...getProbabilityStyle(prediction.probability)
                    }}>
                      {getProbabilityLabel(prediction.probability)} Probability ({prediction.probability}%)
                    </div>
                    
                    <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                      {prediction.topic || prediction.module || `${prediction.difficulty} Questions`}
                    </h4>
                    
                    <p style={{ color: '#bbb', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      {prediction.reason}
                    </p>
                    
                    <div style={{
                      background: 'rgba(102, 126, 234, 0.1)',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(102, 126, 234, 0.2)'
                    }}>
                      <strong style={{ color: '#667eea', fontSize: '0.875rem' }}>Preparation Tip: </strong>
                      <span style={{ color: '#bbb', fontSize: '0.875rem' }}>
                        {prediction.suggestedPreparation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {analysis && (
                <div style={{
                  background: '#2a2a3e',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #444'
                }}>
                  <h4 style={{ color: '#ffffff', marginBottom: '1rem' }}>Analysis Summary</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <h5 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Top Topics</h5>
                      {analysis.frequentTopics.slice(0, 3).map((topic: any, index: number) => (
                        <div key={index} style={{ color: '#bbb', fontSize: '0.875rem' }}>
                          {topic.keyword} ({topic.frequency} times)
                        </div>
                      ))}
                    </div>
                    <div>
                      <h5 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Module Distribution</h5>
                      {analysis.moduleDistribution.slice(0, 3).map((module: any, index: number) => (
                        <div key={index} style={{ color: '#bbb', fontSize: '0.875rem' }}>
                          {module.module}: {module.percentage}%
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {activeSubTab === 'flashcards' && (
        <div style={styles.gameContainer}>
          <div style={styles.header}>
            <Trophy size={24} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Flashcard Challenge</h3>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '0.875rem' }}>
                Complete modules to earn up to 100 points each!
              </p>
            </div>
          </div>

          {gameStats && (
            <div style={styles.gameStats}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{gameStats.totalPoints}</div>
                <div style={styles.statLabel}>Total Points</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{gameStats.streakCount}</div>
                <div style={styles.statLabel}>Day Streak</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{gameStats.lastScore || 0}</div>
                <div style={styles.statLabel}>Last Score</div>
              </div>
            </div>
          )}

          {!gameInProgress ? (
            <div style={{ textAlign: 'center' }}>
              <button
                style={{
                  background: '#ffffff',
                  color: '#667eea',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  margin: '0 auto'
                }}
                onClick={startFlashcardGame}
              >
                <Star size={20} />
                Start Flashcard Game
              </button>
              <p style={{ marginTop: '1rem', opacity: 0.9 }}>
                Answer questions correctly to earn points and maintain your streak!
              </p>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Card {currentCardIndex + 1} of {flashcards.length}</span>
                <span>Score: {score}/{flashcards.length}</span>
              </div>

              {currentFlashcard && (
                <div
                  style={styles.flashcardContainer}
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  {!showAnswer ? (
                    <div>
                      <h3 style={{ marginBottom: '1rem', color: '#333' }}>Question</h3>
                      <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                        {currentFlashcard.question}
                      </p>
                      <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#666' }}>
                        Click to reveal answer
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3 style={{ marginBottom: '1rem', color: '#333' }}>Answer</h3>
                      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                        {currentFlashcard.answer}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                          style={{
                            background: '#22c55e',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            markCorrect();
                          }}
                        >
                          Correct ✓
                        </button>
                        <button
                          style={{
                            background: '#ef4444',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            markIncorrect();
                          }}
                        >
                          Incorrect ✗
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIPredictorTab;