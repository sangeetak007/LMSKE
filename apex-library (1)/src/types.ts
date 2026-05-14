export type UserRole = 'Student' | 'Employee' | 'Admin';

export type PageType = 'dashboard' | 'profile' | 'impact' | 'research' | 'library' | 'blog' | 'users' | 'inventory' | 'settings';

export interface StudentProfile {
  name: string;
  avatarUrl?: string;
  rollNumber: string;
  branch: string;
}

export interface EmployeeProfile {
  name: string;
  avatarUrl?: string;
  employeeId: string;
  department: string;
  designation: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  status: 'Available' | 'Borrowed' | 'Reserved';
  coverUrl: string;
  year: number;
}
