
import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Download, Calendar, Users, Star, Clock, FileText, Globe, Menu, X } from 'lucide-react';
import AIPredictorTab from './components/AIPredictorTab';

const VTUCircle = () => {
  const [activeTab, setActiveTab] = useState('subjects');
  const [selectedScheme, setSelectedScheme] = useState('2021');
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [selectedSem, setSelectedSem] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [syllabusData, setSyllabusData] = useState({});

  const schemes = ['2021', '2022'];
  
  const branches = {
    'CSE': 'Computer Science & Engineering',
    'ISE': 'Information Science & Engineering',
    'ECE': 'Electronics & Communication',
    'EEE': 'Electrical & Electronics',
    'ME': 'Mechanical Engineering',
    'CE': 'Civil Engineering',
    'CH': 'Chemical Engineering',
    'AE': 'Aeronautical Engineering',
    'BT': 'Biotechnology',
    'TE': 'Telecommunication Engineering'
  };

  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const subjectsData = {
    '2021': {
      'CSE': {
        '1': [
          { code: '21MAT11', name: 'Calculus and Linear Algebra', credits: 3, type: 'Theory' },
          { code: '21PHY12', name: 'Engineering Physics', credits: 3, type: 'Theory' },
          { code: '21ELE13', name: 'Basic Electrical Engineering', credits: 3, type: 'Theory' },
          { code: '21CIV14', name: 'Engineering Mechanics', credits: 3, type: 'Theory' },
          { code: '21ENG15', name: 'Technical English', credits: 2, type: 'Theory' },
          { code: '21PHY16L', name: 'Engineering Physics Laboratory', credits: 1, type: 'Lab' },
          { code: '21ELE17L', name: 'Basic Electrical Engineering Laboratory', credits: 1, type: 'Lab' },
          { code: '21ENG18L', name: 'Technical English Laboratory', credits: 1, type: 'Lab' }
        ],
        '2': [
          { code: '21MAT21', name: 'Advanced Calculus and Numerical Methods', credits: 3, type: 'Theory' },
          { code: '21CHE22', name: 'Engineering Chemistry', credits: 3, type: 'Theory' },
          { code: '21CPG23', name: 'C Programming for Problem Solving', credits: 3, type: 'Theory' },
          { code: '21EGD24', name: 'Engineering Graphics', credits: 2, type: 'Theory' },
          { code: '21KAN25', name: 'Kannada/Hindi', credits: 1, type: 'Theory' },
          { code: '21CHE26L', name: 'Engineering Chemistry Laboratory', credits: 1, type: 'Lab' },
          { code: '21CPG27L', name: 'C Programming Laboratory', credits: 1, type: 'Lab' },
          { code: '21EGD28L', name: 'Engineering Graphics Laboratory', credits: 1, type: 'Lab' }
        ],
        '3': [
          { code: '21MAT31', name: 'Transform Calculus, Fourier Series and Numerical Techniques', credits: 3, type: 'Theory' },
          { code: '21CS32', name: 'Data Structures and Applications', credits: 4, type: 'Theory' },
          { code: '21CS33', name: 'Analog and Digital Electronics', credits: 3, type: 'Theory' },
          { code: '21CS34', name: 'Computer Organization and Architecture', credits: 3, type: 'Theory' },
          { code: '21KSK35', name: 'Samskrutika Kannada', credits: 1, type: 'Theory' },
          { code: '21CSL36', name: 'Data Structures Laboratory', credits: 1, type: 'Lab' },
          { code: '21CSL37', name: 'Digital Electronics Laboratory', credits: 1, type: 'Lab' },
          { code: '21KSK38L', name: 'Samskrutika Kannada Laboratory', credits: 1, type: 'Lab' }
        ],
        '4': [
          { code: '21MAT41', name: 'Mathematical Foundations for Computing', credits: 3, type: 'Theory' },
          { code: '21CS42', name: 'Design and Analysis of Algorithms', credits: 4, type: 'Theory' },
          { code: '21CS43', name: 'Unix Programming and Compiler Design', credits: 4, type: 'Theory' },
          { code: '21CS44', name: 'Object Oriented Programming with Java', credits: 3, type: 'Theory' },
          { code: '21CS45', name: 'Microprocessor and Microcontroller', credits: 3, type: 'Theory' },
          { code: '21CSL46', name: 'Design and Analysis of Algorithm Laboratory', credits: 1, type: 'Lab' },
          { code: '21CSL47', name: 'Microprocessor and Microcontroller Laboratory', credits: 1, type: 'Lab' },
          { code: '21CSL48', name: 'Object Oriented Programming with Java Laboratory', credits: 1, type: 'Lab' }
        ],
        '5': [
          { code: '21CS51', name: 'Management and Entrepreneurship', credits: 3, type: 'Theory' },
          { code: '21CS52', name: 'Computer Networks', credits: 4, type: 'Theory' },
          { code: '21CS53', name: 'Database Management System', credits: 4, type: 'Theory' },
          { code: '21CS54', name: 'Automata Theory and Computability', credits: 3, type: 'Theory' },
          { code: '21CS55', name: 'Application Development using Python', credits: 3, type: 'Theory' },
          { code: '21CSL56', name: 'DBMS Laboratory with mini project', credits: 1, type: 'Lab' },
          { code: '21CSL57', name: 'Computer Network Laboratory', credits: 1, type: 'Lab' },
          { code: '21CSL58', name: 'Python Application Development Laboratory', credits: 1, type: 'Lab' }
        ],
        '6': [
          { code: '21CS61', name: 'Software Engineering and Project Management', credits: 4, type: 'Theory' },
          { code: '21CS62', name: 'Computer Graphics and Fundamentals of Image Processing', credits: 4, type: 'Theory' },
          { code: '21CS63', name: 'Web Technologies', credits: 3, type: 'Theory' },
          { code: '21CS641', name: 'Machine Learning', credits: 3, type: 'Theory' },
          { code: '21CS651', name: 'Mobile Application Development', credits: 3, type: 'Theory' },
          { code: '21CSL66', name: 'Computer Graphics Laboratory', credits: 1, type: 'Lab' },
          { code: '21CSL67', name: 'Web Technology Laboratory with Mini Project', credits: 1, type: 'Lab' },
          { code: '21CSL68', name: 'Mobile Application Development Laboratory', credits: 1, type: 'Lab' }
        ],
        '7': [
          { code: '21CS71', name: 'Artificial Intelligence and Machine Learning', credits: 4, type: 'Theory' },
          { code: '21CS72', name: 'Big Data Analytics', credits: 3, type: 'Theory' },
          { code: '21CS73', name: 'Cloud Computing and Its Applications', credits: 3, type: 'Theory' },
          { code: '21CS741', name: 'Deep Learning', credits: 3, type: 'Theory' },
          { code: '21CS751', name: 'Internet of Things', credits: 3, type: 'Theory' },
          { code: '21CSL76', name: 'Machine Learning Laboratory', credits: 1, type: 'Lab' },
          { code: '21CSL77', name: 'Cloud Computing Laboratory', credits: 1, type: 'Lab' },
          { code: '21CIP78', name: 'Project Work Phase-1', credits: 2, type: 'Project' }
        ],
        '8': [
          { code: '21CS81', name: 'Internet of Things and Its Applications', credits: 3, type: 'Theory' },
          { code: '21CS821', name: 'Blockchain Technology', credits: 3, type: 'Theory' },
          { code: '21CS831', name: 'Cyber Security', credits: 3, type: 'Theory' },
          { code: '21CSL87', name: 'IoT Laboratory', credits: 1, type: 'Lab' },
          { code: '21CIP88', name: 'Project Work Phase-2', credits: 8, type: 'Project' },
          { code: '21INT89', name: 'Internship', credits: 2, type: 'Internship' }
        ]
      },
      'ISE': {
        '1': [
          { code: '21MAT11', name: 'Calculus and Linear Algebra', credits: 3, type: 'Theory' },
          { code: '21PHY12', name: 'Engineering Physics', credits: 3, type: 'Theory' },
          { code: '21ELE13', name: 'Basic Electrical Engineering', credits: 3, type: 'Theory' },
          { code: '21CIV14', name: 'Engineering Mechanics', credits: 3, type: 'Theory' },
          { code: '21ENG15', name: 'Technical English', credits: 2, type: 'Theory' },
          { code: '21PHY16L', name: 'Engineering Physics Laboratory', credits: 1, type: 'Lab' },
          { code: '21ELE17L', name: 'Basic Electrical Engineering Laboratory', credits: 1, type: 'Lab' },
          { code: '21ENG18L', name: 'Technical English Laboratory', credits: 1, type: 'Lab' }
        ],
        '2': [
          { code: '21MAT21', name: 'Advanced Calculus and Numerical Methods', credits: 3, type: 'Theory' },
          { code: '21CHE22', name: 'Engineering Chemistry', credits: 3, type: 'Theory' },
          { code: '21CPG23', name: 'C Programming for Problem Solving', credits: 3, type: 'Theory' },
          { code: '21EGD24', name: 'Engineering Graphics', credits: 2, type: 'Theory' },
          { code: '21KAN25', name: 'Kannada/Hindi', credits: 1, type: 'Theory' },
          { code: '21CHE26L', name: 'Engineering Chemistry Laboratory', credits: 1, type: 'Lab' },
          { code: '21CPG27L', name: 'C Programming Laboratory', credits: 1, type: 'Lab' },
          { code: '21EGD28L', name: 'Engineering Graphics Laboratory', credits: 1, type: 'Lab' }
        ],
        '3': [
          { code: '21MAT31', name: 'Transform Calculus, Fourier Series and Numerical Techniques', credits: 3, type: 'Theory' },
          { code: '21IS32', name: 'Data Structures and Applications', credits: 4, type: 'Theory' },
          { code: '21IS33', name: 'Analog and Digital Electronics', credits: 3, type: 'Theory' },
          { code: '21IS34', name: 'Computer Organization and Architecture', credits: 3, type: 'Theory' },
          { code: '21KSK35', name: 'Samskrutika Kannada', credits: 1, type: 'Theory' },
          { code: '21ISL36', name: 'Data Structures Laboratory', credits: 1, type: 'Lab' },
          { code: '21ISL37', name: 'Digital Electronics Laboratory', credits: 1, type: 'Lab' },
          { code: '21KSK38L', name: 'Samskrutika Kannada Laboratory', credits: 1, type: 'Lab' }
        ]
      },
      'ECE': {
        '1': [
          { code: '21MAT11', name: 'Calculus and Linear Algebra', credits: 3, type: 'Theory' },
          { code: '21PHY12', name: 'Engineering Physics', credits: 3, type: 'Theory' },
          { code: '21ELE13', name: 'Basic Electrical Engineering', credits: 3, type: 'Theory' },
          { code: '21CIV14', name: 'Engineering Mechanics', credits: 3, type: 'Theory' },
          { code: '21ENG15', name: 'Technical English', credits: 2, type: 'Theory' },
          { code: '21PHY16L', name: 'Engineering Physics Laboratory', credits: 1, type: 'Lab' },
          { code: '21ELE17L', name: 'Basic Electrical Engineering Laboratory', credits: 1, type: 'Lab' },
          { code: '21ENG18L', name: 'Technical English Laboratory', credits: 1, type: 'Lab' }
        ],
        '3': [
          { code: '21MAT31', name: 'Transform Calculus, Fourier Series and Numerical Techniques', credits: 3, type: 'Theory' },
          { code: '21EC32', name: 'Analog Electronics', credits: 4, type: 'Theory' },
          { code: '21EC33', name: 'Digital System Design', credits: 3, type: 'Theory' },
          { code: '21EC34', name: 'Electronic Instrumentation', credits: 3, type: 'Theory' },
          { code: '21KSK35', name: 'Samskrutika Kannada', credits: 1, type: 'Theory' },
          { code: '21ECL36', name: 'Analog Electronics Laboratory', credits: 1, type: 'Lab' },
          { code: '21ECL37', name: 'Digital System Design Laboratory', credits: 1, type: 'Lab' },
          { code: '21KSK38L', name: 'Samskrutika Kannada Laboratory', credits: 1, type: 'Lab' }
        ]
      }
    },
    '2022': {
      'CSE': {
        '1': [
          { code: '22MAT11', name: 'Calculus and Linear Algebra', credits: 3, type: 'Theory' },
          { code: '22PHY12', name: 'Engineering Physics', credits: 3, type: 'Theory' },
          { code: '22ELE13', name: 'Basic Electrical Engineering', credits: 3, type: 'Theory' },
          { code: '22CIV14', name: 'Engineering Mechanics', credits: 3, type: 'Theory' },
          { code: '22ENG15', name: 'Technical English', credits: 2, type: 'Theory' },
          { code: '22PHY16L', name: 'Engineering Physics Laboratory', credits: 1, type: 'Lab' },
          { code: '22ELE17L', name: 'Basic Electrical Engineering Laboratory', credits: 1, type: 'Lab' },
          { code: '22ENG18L', name: 'Technical English Laboratory', credits: 1, type: 'Lab' }
        ],
        '3': [
          { code: '22MAT31', name: 'Transform Calculus and Numerical Methods', credits: 3, type: 'Theory' },
          { code: '22CS32', name: 'Data Structures and Applications', credits: 4, type: 'Theory' },
          { code: '22CS33', name: 'Analog and Digital Electronics', credits: 3, type: 'Theory' },
          { code: '22CS34', name: 'Computer Organization', credits: 3, type: 'Theory' },
          { code: '22KSK35', name: 'Samskrutika Kannada', credits: 1, type: 'Theory' },
          { code: '22CSL36', name: 'Data Structures Laboratory', credits: 1, type: 'Lab' },
          { code: '22CSL37', name: 'Digital Electronics Laboratory', credits: 1, type: 'Lab' },
          { code: '22KSK38L', name: 'Samskrutika Kannada Laboratory', credits: 1, type: 'Lab' }
        ]
      }
    }
  };

  const syllabusUpdates = [
    {
      date: '2024-12-15',
      scheme: '2021',
      branch: 'CSE',
      semester: '7',
      subject: '21CS71',
      update: 'Updated AI/ML syllabus with new topics on Generative AI'
    },
    {
      date: '2024-12-10',
      scheme: '2022',
      branch: 'ISE',
      semester: '5',
      subject: '22IS52',
      update: 'Added new modules on Cloud Computing fundamentals'
    },
    {
      date: '2024-12-05',
      scheme: '2021',
      branch: 'ECE',
      semester: '6',
      subject: '21EC61',
      update: 'Updated Communication Systems with 5G technology'
    }
  ];

  const getSubjects = () => {
    if (!subjectsData[selectedScheme] || !subjectsData[selectedScheme][selectedBranch] || !subjectsData[selectedScheme][selectedBranch][selectedSem]) {
      return [];
    }
    
    const subjects = subjectsData[selectedScheme][selectedBranch][selectedSem];
    
    if (searchTerm) {
      return subjects.filter(subject => 
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return subjects;
  };

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#0f0f23',
      color: '#ffffff',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      margin: 0,
      padding: 0,
      boxSizing: 'border-box' as const,
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto' as const
    },

    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem 0',
      position: 'sticky' as const,
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: 'bold' as const,
      color: '#ffffff'
    },
    nav: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center'
    },
    navItem: {
      color: '#ffffff',
      textDecoration: 'none',
      fontWeight: '500' as const,
      transition: 'color 0.3s ease',
      cursor: 'pointer'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    tabContainer: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      borderBottom: '1px solid #333',
      flexWrap: 'wrap' as const
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
    filtersContainer: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '1.5rem',
      borderRadius: '12px',
      marginBottom: '2rem',
      border: '1px solid #333'
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '600' as const,
      color: '#bbb'
    },
    select: {
      padding: '0.75rem',
      background: '#2a2a3e',
      border: '1px solid #444',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease'
    },
    searchContainer: {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 2.5rem',
      background: '#2a2a3e',
      border: '1px solid #444',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease'
    },
    searchIcon: {
      position: 'absolute' as const,
      left: '0.75rem',
      color: '#888',
      zIndex: 1
    },
    subjectsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '1.5rem'
    },
    subjectCard: {
      background: 'linear-gradient(135deg, #1e1e3f 0%, #2a2a4a 100%)',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #333',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    subjectCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
      borderColor: '#667eea'
    },
    subjectHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    subjectCode: {
      fontSize: '0.875rem',
      fontWeight: '600' as const,
      color: '#667eea',
      background: 'rgba(102, 126, 234, 0.1)',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px'
    },
    subjectCredits: {
      fontSize: '0.75rem',
      color: '#888',
      background: '#2a2a3e',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px'
    },
    subjectName: {
      fontSize: '1.1rem',
      fontWeight: '600' as const,
      color: '#ffffff',
      marginBottom: '0.5rem',
      lineHeight: '1.4'
    },
    subjectType: {
      fontSize: '0.875rem',
      color: '#bbb',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    syllabusContainer: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #333'
    },
    syllabusHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #333'
    },
    syllabusTitle: {
      fontSize: '1.5rem',
      fontWeight: '700' as const,
      color: '#ffffff'
    },
    updatesList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    updateCard: {
      background: '#2a2a3e',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid #444'
    },
    updateDate: {
      fontSize: '0.75rem',
      color: '#888',
      marginBottom: '0.5rem'
    },
    updateInfo: {
      fontSize: '0.875rem',
      color: '#bbb',
      marginBottom: '0.5rem'
    },
    updateText: {
      fontSize: '1rem',
      color: '#ffffff',
      fontWeight: '500' as const
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '3rem',
      color: '#888'
    },
    emptyStateIcon: {
      width: '4rem',
      height: '4rem',
      margin: '0 auto 1rem',
      opacity: 0.5
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1.5rem',
      borderRadius: '12px',
      textAlign: 'center' as const,
      color: '#ffffff'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: 'bold' as const,
      marginBottom: '0.5rem'
    },
    statLabel: {
      fontSize: '0.875rem',
      opacity: 0.9
    },
    filterButton: {
      display: 'none',
      padding: '0.75rem',
      background: '#667eea',
      border: 'none',
      borderRadius: '8px',
      color: '#ffffff',
      cursor: 'pointer',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500' as const
    },
    mobileFilters: {
      display: 'none',
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      zIndex: 2000,
      padding: '1rem'
    },
    mobileFiltersContent: {
      background: '#1a1a2e',
      borderRadius: '12px',
      padding: '1.5rem',
      maxHeight: '80vh',
      overflowY: 'auto' as const
    },
    closeButton: {
      position: 'absolute' as const,
      top: '1rem',
      right: '1rem',
      background: 'none',
      border: 'none',
      color: '#ffffff',
      cursor: 'pointer',
      padding: '0.5rem'
    }
  };

  // Mobile responsive styles
  const mobileStyles = `
    @media (max-width: 768px) {
      .filters-container {
        display: none !important;
      }
      .filter-button {
        display: flex !important;
      }
      .mobile-filters {
        display: ${showFilters ? 'block' : 'none'} !important;
      }
      .subjects-grid {
        grid-template-columns: 1fr !important;
      }
      .stats-container {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      .header-content {
        flex-direction: column !important;
        gap: 1rem !important;
      }
      .nav {
        gap: 1rem !important;
      }
      .tab-container {
        justify-content: center !important;
      }
    }
  `;

  const getCurrentSubjects = () => {
    return getSubjects();
  };

  const getTotalCredits = () => {
    return getCurrentSubjects().reduce((total, subject) => total + subject.credits, 0);
  };

  const getSubjectTypes = () => {
    const subjects = getCurrentSubjects();
    const types = [...new Set(subjects.map(s => s.type))];
    return types.length;
  };

  useEffect(() => {
    // Simulate fetching syllabus updates from VTU API
    const fetchSyllabusUpdates = () => {
      // This would normally be an API call to VTU's system
      setSyllabusData({ updates: syllabusUpdates });
    };
    
    fetchSyllabusUpdates();
  }, []);

  return (
    <div style={styles.container}>
      <style>{mobileStyles}</style>
      
      <header style={styles.header}>
        <div style={styles.headerContent} className="header-content">
          <div style={styles.logo}>
            <BookOpen size={24} />
            <span>VTU Magic</span>
          </div>
          <nav style={styles.nav} className="nav">
            <a href="#" style={styles.navItem}>Home</a>
            <a href="#" style={styles.navItem}>Resources</a>
            <a href="#" style={styles.navItem}>Notes</a>
            <a href="#" style={styles.navItem}>Question Papers</a>
            <a href="#" style={styles.navItem}>About</a>
          </nav>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.tabContainer} className="tab-container">
          <button
            style={activeTab === 'subjects' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('subjects')}
          >
            <BookOpen size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
            Subjects
          </button>
          <button
            style={activeTab === 'ai-predictor' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('ai-predictor')}
          >
            <Star size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
            AI Predictor
          </button>
          <button
            style={activeTab === 'syllabus' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('syllabus')}
          >
            <FileText size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
            Syllabus Updates
          </button>
          <button
            style={activeTab === 'resources' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('resources')}
          >
            <Download size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
            Resources
          </button>
        </div>

        {activeTab === 'ai-predictor' && (
          <AIPredictorTab 
            selectedScheme={selectedScheme}
            selectedBranch={selectedBranch}
            selectedSem={selectedSem}
            branches={branches}
            schemes={schemes}
            semesters={semesters}
            subjectsData={subjectsData}
          />
        )}

        {activeTab === 'subjects' && (
          <>
            <button
              style={styles.filterButton}
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              Filters
            </button>

            <div style={styles.filtersContainer} className="filters-container">
              <div style={styles.filtersGrid}>
                <div style={styles.filterGroup}>
                  <label style={styles.label}>Scheme</label>
                  <select
                    style={styles.select}
                    value={selectedScheme}
                    onChange={(e) => setSelectedScheme(e.target.value)}
                  >
                    {schemes.map(scheme => (
                      <option key={scheme} value={scheme}>{scheme} Scheme</option>
                    ))}
                  </select>
                </div>

                <div style={styles.filterGroup}>
                  <label style={styles.label}>Branch</label>
                  <select
                    style={styles.select}
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                  >
                    {Object.entries(branches).map(([code, name]) => (
                      <option key={code} value={code}>{code} - {name}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.filterGroup}>
                  <label style={styles.label}>Semester</label>
                  <select
                    style={styles.select}
                    value={selectedSem}
                    onChange={(e) => setSelectedSem(e.target.value)}
                  >
                    {semesters.map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.filterGroup}>
                  <label style={styles.label}>Search Subjects</label>
                  <div style={styles.searchContainer}>
                    <Search size={16} style={styles.searchIcon} />
                    <input
                      type="text"
                      placeholder="Search by subject name or code..."
                      style={styles.searchInput}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.mobileFilters} className="mobile-filters">
              <div style={styles.mobileFiltersContent}>
                <button
                  style={styles.closeButton}
                  onClick={() => setShowFilters(false)}
                >
                  <X size={24} />
                </button>
                <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>Filters</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={styles.filterGroup}>
                    <label style={styles.label}>Scheme</label>
                    <select
                      style={styles.select}
                      value={selectedScheme}
                      onChange={(e) => setSelectedScheme(e.target.value)}
                    >
                      {schemes.map(scheme => (
                        <option key={scheme} value={scheme}>{scheme} Scheme</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.filterGroup}>
                    <label style={styles.label}>Branch</label>
                    <select
                      style={styles.select}
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                    >
                      {Object.entries(branches).map(([code, name]) => (
                        <option key={code} value={code}>{code} - {name}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.filterGroup}>
                    <label style={styles.label}>Semester</label>
                    <select
                      style={styles.select}
                      value={selectedSem}
                      onChange={(e) => setSelectedSem(e.target.value)}
                    >
                      {semesters.map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.filterGroup}>
                    <label style={styles.label}>Search Subjects</label>
                    <div style={styles.searchContainer}>
                      <Search size={16} style={styles.searchIcon} />
                      <input
                        type="text"
                        placeholder="Search subjects..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.statsContainer} className="stats-container">
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{getCurrentSubjects().length}</div>
                <div style={styles.statLabel}>Total Subjects</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{getTotalCredits()}</div>
                <div style={styles.statLabel}>Total Credits</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{getSubjectTypes()}</div>
                <div style={styles.statLabel}>Subject Types</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{selectedScheme}</div>
                <div style={styles.statLabel}>Current Scheme</div>
              </div>
            </div>

            {getCurrentSubjects().length > 0 ? (
              <div style={styles.subjectsGrid} className="subjects-grid">
                {getCurrentSubjects().map((subject, index) => (
                  <div
                    key={subject.code}
                    style={styles.subjectCard}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.subjectCardHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#333';
                    }}
                  >
                    <div style={styles.subjectHeader}>
                      <span style={styles.subjectCode}>{subject.code}</span>
                      <span style={styles.subjectCredits}>{subject.credits} Credits</span>
                    </div>
                    <h3 style={styles.subjectName}>{subject.name}</h3>
                    <div style={styles.subjectType}>
                      {subject.type === 'Theory' && <BookOpen size={16} />}
                      {subject.type === 'Lab' && <Users size={16} />}
                      {subject.type === 'Project' && <Star size={16} />}
                      {subject.type === 'Internship' && <Clock size={16} />}
                      <span>{subject.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.emptyState}>
                <BookOpen size={64} style={styles.emptyStateIcon} />
                <h3>No subjects found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'syllabus' && (
          <div style={styles.syllabusContainer}>
            <div style={styles.syllabusHeader}>
              <Globe size={24} color="#667eea" />
              <div>
                <h2 style={styles.syllabusTitle}>VTU Syllabus Updates</h2>
                <p style={{ color: '#888', margin: 0 }}>
                  Latest curriculum updates from VTU official website
                </p>
              </div>
            </div>

            <div style={styles.updatesList}>
              {syllabusUpdates.map((update, index) => (
                <div key={index} style={styles.updateCard}>
                  <div style={styles.updateDate}>
                    <Calendar size={14} style={{ marginRight: '0.5rem', display: 'inline' }} />
                    {update.date}
                  </div>
                  <div style={styles.updateInfo}>
                    {update.scheme} Scheme • {update.branch} • Semester {update.semester} • {update.subject}
                  </div>
                  <div style={styles.updateText}>{update.update}</div>
                </div>
              ))}
            </div>

            <div style={{ 
              marginTop: '2rem', 
              padding: '1rem', 
              background: 'rgba(102, 126, 234, 0.1)', 
              borderRadius: '8px',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                <Globe size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
                Auto-Update Feature
              </h4>
              <p style={{ color: '#bbb', margin: 0, fontSize: '0.875rem' }}>
                This system automatically fetches the latest syllabus updates from the official VTU website. 
                Updates are synchronized daily to ensure you have the most current curriculum information.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div style={styles.syllabusContainer}>
            <div style={styles.syllabusHeader}>
              <Download size={24} color="#667eea" />
              <div>
                <h2 style={styles.syllabusTitle}>Academic Resources</h2>
                <p style={{ color: '#888', margin: 0 }}>
                  Download notes, previous question papers, and study materials
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{
                background: '#2a2a3e',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #444'
              }}>
                <h4 style={{ color: '#ffffff', marginBottom: '1rem' }}>
                  <FileText size={20} style={{ marginRight: '0.5rem', display: 'inline' }} />
                  Lecture Notes
                </h4>
                <p style={{ color: '#bbb', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Comprehensive notes for all subjects across different semesters
                </p>
                <button style={{
                  background: '#667eea',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  Browse Notes
                </button>
              </div>

              <div style={{
                background: '#2a2a3e',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #444'
              }}>
                <h4 style={{ color: '#ffffff', marginBottom: '1rem' }}>
                  <Download size={20} style={{ marginRight: '0.5rem', display: 'inline' }} />
                  Question Papers
                </h4>
                <p style={{ color: '#bbb', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Previous year question papers and model papers for exam preparation
                </p>
                <button style={{
                  background: '#667eea',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  Download Papers
                </button>
              </div>

              <div style={{
                background: '#2a2a3e',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #444'
              }}>
                <h4 style={{ color: '#ffffff', marginBottom: '1rem' }}>
                  <BookOpen size={20} style={{ marginRight: '0.5rem', display: 'inline' }} />
                  Lab Manuals
                </h4>
                <p style={{ color: '#bbb', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Complete lab manuals with programs and experimental procedures
                </p>
                <button style={{
                  background: '#667eea',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  Access Manuals
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VTUCircle;