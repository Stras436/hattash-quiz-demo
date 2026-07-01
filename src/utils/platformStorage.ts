import type { PlatformState, StudentProfile } from '../types/platform';

const PLATFORM_KEY = 'hattash_platform_state';
const DEFAULT_STUDENT: StudentProfile = { name: 'طالب هتّاش', email: 'student@hattash.test', password: '123456' };

const safeParse = <T>(value: string | null): T | null => { try { return value ? JSON.parse(value) as T : null; } catch { return null; } };

export const defaultPlatformState = (): PlatformState => ({ student: DEFAULT_STUDENT, isLoggedIn: false, completedLessons: ['signs-rule', 'operations-order'], lastLessonId: 'large-numbers' });
export const loadPlatformState = () => safeParse<PlatformState>(localStorage.getItem(PLATFORM_KEY)) ?? defaultPlatformState();
export const savePlatformState = (state: PlatformState) => localStorage.setItem(PLATFORM_KEY, JSON.stringify(state));
export const clearPlatformSession = () => { const state = loadPlatformState(); savePlatformState({ ...state, isLoggedIn: false }); };
