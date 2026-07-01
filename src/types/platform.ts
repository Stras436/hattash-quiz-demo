export interface StudentProfile { name: string; email: string; password: string; }
export interface PlatformState { student: StudentProfile; isLoggedIn: boolean; completedLessons: string[]; lastLessonId: string; }
