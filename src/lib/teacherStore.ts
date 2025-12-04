export type ActivityType = "clase" | "taller" | "concierto";

export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  dayOfWeek?: number;
  date?: string;
  startTime: string;
  durationMinutes: number;
  location?: string;
  description?: string;
  participants?: string[];
  fixed?: boolean;
};

export type AttendanceItem = {
  name: string;
  present: boolean;
  comment?: string;
};

export type AttendanceRecord = {
  id: string;
  activityId: string;
  date: string;
  items: AttendanceItem[];
};

export type GradeRecord = {
  id: string;
  student: string;
  progress: number;
  comment?: string;
  updatedAt: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  requirements: string[];
  assignedTo: string; // grupo/clase
  reminders: boolean;
  createdAt: string;
};

const KEY_ACTIVITIES = "teacher_activities";
const KEY_ADMIN_SCHEDULE = "admin_base_schedule";
const KEY_ATTENDANCE = "teacher_attendance";
const KEY_GRADES = "teacher_grades";
const KEY_TASKS = "teacher_tasks";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const TeacherStore = {
  getActivities(): Activity[] {
    return read<Activity[]>(KEY_ACTIVITIES, []);
  },
  saveActivities(items: Activity[]) {
    write(KEY_ACTIVITIES, items);
  },
  getAttendance(): AttendanceRecord[] {
    return read<AttendanceRecord[]>(KEY_ATTENDANCE, []);
  },
  saveAttendance(items: AttendanceRecord[]) {
    write(KEY_ATTENDANCE, items);
  },
  getGrades(): GradeRecord[] {
    return read<GradeRecord[]>(KEY_GRADES, []);
  },
  saveGrades(items: GradeRecord[]) {
    write(KEY_GRADES, items);
  },
  getTasks(): Task[] {
    return read<Task[]>(KEY_TASKS, []);
  },
  saveTasks(items: Task[]) {
    write(KEY_TASKS, items);
  },
  getAdminSchedule(): Activity[] {
    return read<Activity[]>(KEY_ADMIN_SCHEDULE, []);
  },
  saveAdminSchedule(items: Activity[]) {
    write(KEY_ADMIN_SCHEDULE, items);
  },
};

export function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
