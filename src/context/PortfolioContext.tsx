'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import type {
  Bio,
  Certificate,
  PortfolioData,
  Project,
  Skill,
} from '@/types/portfolio';
import defaultData from '@/data/portfolio.json';

/* ─── Types ──────────────────────────────────────────────────────── */
interface PortfolioState extends PortfolioData {
  isEditMode: boolean;
}

type PortfolioAction =
  | { type: 'TOGGLE_EDIT_MODE' }
  | { type: 'SET_EDIT_MODE'; payload: boolean }
  | { type: 'UPDATE_BIO'; payload: Partial<Bio> }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: Skill }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'ADD_CERTIFICATE'; payload: Certificate }
  | { type: 'UPDATE_CERTIFICATE'; payload: Certificate }
  | { type: 'DELETE_CERTIFICATE'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'RESET_TO_DEFAULTS' }
  | { type: 'HYDRATE'; payload: Omit<PortfolioState, 'isEditMode'> };

interface PortfolioContextValue extends PortfolioState {
  toggleEditMode: () => void;
  setEditMode: (val: boolean) => void;
  updateBio: (bio: Partial<Bio>) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (skill: Skill) => void;
  deleteSkill: (id: string) => void;
  addCertificate: (cert: Certificate) => void;
  updateCertificate: (cert: Certificate) => void;
  deleteCertificate: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  resetToDefaults: () => void;
}

/* ─── Initial State ──────────────────────────────────────────────── */
const defaultPortfolioData = defaultData as PortfolioData;

const initialState: PortfolioState = {
  ...defaultPortfolioData,
  isEditMode: false,
};

/* ─── Reducer ────────────────────────────────────────────────────── */
function reducer(state: PortfolioState, action: PortfolioAction): PortfolioState {
  switch (action.type) {
    case 'TOGGLE_EDIT_MODE':
      return { ...state, isEditMode: !state.isEditMode };
    case 'SET_EDIT_MODE':
      return { ...state, isEditMode: action.payload };
    case 'UPDATE_BIO':
      return { ...state, bio: { ...state.bio, ...action.payload } };
    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, action.payload] };
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case 'DELETE_SKILL':
      return {
        ...state,
        skills: state.skills.filter((s) => s.id !== action.payload),
      };
    case 'ADD_CERTIFICATE':
      return {
        ...state,
        certificates: [...state.certificates, action.payload],
      };
    case 'UPDATE_CERTIFICATE':
      return {
        ...state,
        certificates: state.certificates.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case 'DELETE_CERTIFICATE':
      return {
        ...state,
        certificates: state.certificates.filter((c) => c.id !== action.payload),
      };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.payload),
      };
    case 'RESET_TO_DEFAULTS':
      return { ...defaultPortfolioData, isEditMode: state.isEditMode };
    case 'HYDRATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

/* ─── Context ────────────────────────────────────────────────────── */
const PortfolioContext = createContext<PortfolioContextValue | null>(null);

const STORAGE_KEY = 'portfolio_data_v2';

/** IDs that indicate stale / placeholder data from older builds */
const STALE_PROJECT_IDS = ['securevault', 'netscan-pro', 'cloudops', 'forensicskit', 'devlink', 'osint-cli'];
const STALE_CERT_TITLES = ['CEH', 'CompTIA', 'LFCS', 'CKA', 'Meta Front-End'];

function isStaleData(data: Omit<PortfolioState, 'isEditMode'>): boolean {
  const hasStaleProject = data.projects?.some((p) =>
    STALE_PROJECT_IDS.includes(p.id)
  );
  const hasStaleCert = data.certificates?.some((c) =>
    STALE_CERT_TITLES.some((kw) => c.title.includes(kw))
  );
  return !!(hasStaleProject || hasStaleCert);
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount — auto-purge legacy placeholder data
  useEffect(() => {
    try {
      // Also clear the old key if it exists
      localStorage.removeItem('subharup-portfolio-data');
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Omit<PortfolioState, 'isEditMode'>;
        if (isStaleData(parsed)) {
          // Stale mock data detected — purge and use fresh defaults
          localStorage.removeItem(STORAGE_KEY);
        } else {
          dispatch({ type: 'HYDRATE', payload: parsed });
        }
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever data changes
  useEffect(() => {
    if (!hydrated) return;
    const { isEditMode: _, ...data } = state;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage errors
    }
  }, [state, hydrated]);

  const toggleEditMode = useCallback(() => dispatch({ type: 'TOGGLE_EDIT_MODE' }), []);
  const setEditMode = useCallback((val: boolean) => dispatch({ type: 'SET_EDIT_MODE', payload: val }), []);
  const updateBio = useCallback((bio: Partial<Bio>) => dispatch({ type: 'UPDATE_BIO', payload: bio }), []);
  const addSkill = useCallback((skill: Skill) => dispatch({ type: 'ADD_SKILL', payload: skill }), []);
  const updateSkill = useCallback((skill: Skill) => dispatch({ type: 'UPDATE_SKILL', payload: skill }), []);
  const deleteSkill = useCallback((id: string) => dispatch({ type: 'DELETE_SKILL', payload: id }), []);
  const addCertificate = useCallback((cert: Certificate) => dispatch({ type: 'ADD_CERTIFICATE', payload: cert }), []);
  const updateCertificate = useCallback((cert: Certificate) => dispatch({ type: 'UPDATE_CERTIFICATE', payload: cert }), []);
  const deleteCertificate = useCallback((id: string) => dispatch({ type: 'DELETE_CERTIFICATE', payload: id }), []);
  const addProject = useCallback((project: Project) => dispatch({ type: 'ADD_PROJECT', payload: project }), []);
  const updateProject = useCallback((project: Project) => dispatch({ type: 'UPDATE_PROJECT', payload: project }), []);
  const deleteProject = useCallback((id: string) => dispatch({ type: 'DELETE_PROJECT', payload: id }), []);
  const resetToDefaults = useCallback(() => dispatch({ type: 'RESET_TO_DEFAULTS' }), []);

  const value: PortfolioContextValue = {
    ...state,
    toggleEditMode,
    setEditMode,
    updateBio,
    addSkill,
    updateSkill,
    deleteSkill,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    addProject,
    updateProject,
    deleteProject,
    resetToDefaults,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
