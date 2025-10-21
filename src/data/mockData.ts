// Mock data for SIGA-UnDF system

export interface Student {
  id: string;
  name: string;
  registration: string;
  cpf: string;
  course: string;
  currentSemester: number;
  failedSubjects: string[];
  completedSubjects: string[];
  estimatedGraduation: string;
  totalAbsences: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  workload: number;
  failureRate: number;
  failedStudents: number;
  prerequisites: string[];
  semester: number;
}

export interface Course {
  id: string;
  name: string;
  studentsWithFailures: number;
  totalStudents: number;
  failurePercentage: number;
}

export const mockSubjects: Subject[] = [
  {
    id: "1",
    name: "Banco de Dados I",
    code: "BDI301",
    workload: 80,
    failureRate: 42.5,
    failedStudents: 156,
    prerequisites: [],
    semester: 3
  },
  {
    id: "2",
    name: "Banco de Dados II",
    code: "BDII401",
    workload: 80,
    failureRate: 48.3,
    failedStudents: 142,
    prerequisites: ["Banco de Dados I"],
    semester: 4
  },
  {
    id: "17",
    name: "PI V",
    code: "PI501",
    workload: 80,
    failureRate: 45.6,
    failedStudents: 134,
    prerequisites: ["PI IV"],
    semester: 5
  },
  {
    id: "18",
    name: "Segurança e Auditoria de Sistemas",
    code: "SAS501",
    workload: 60,
    failureRate: 44.1,
    failedStudents: 128,
    prerequisites: ["Banco de Dados I"],
    semester: 5
  },
  {
    id: "16",
    name: "PI IV",
    code: "PI401",
    workload: 80,
    failureRate: 40.2,
    failedStudents: 118,
    prerequisites: ["PI III"],
    semester: 4
  },
  {
    id: "12",
    name: "Engenharia de Usabilidade",
    code: "EU401",
    workload: 60,
    failureRate: 38.4,
    failedStudents: 112,
    prerequisites: [],
    semester: 4
  },
  {
    id: "15",
    name: "PI III",
    code: "PI301",
    workload: 80,
    failureRate: 36.8,
    failedStudents: 108,
    prerequisites: ["PI II"],
    semester: 3
  },
  {
    id: "9",
    name: "APE III",
    code: "APE301",
    workload: 60,
    failureRate: 33.2,
    failedStudents: 105,
    prerequisites: ["APE II"],
    semester: 3
  },
  {
    id: "8",
    name: "APE IV",
    code: "APE401",
    workload: 60,
    failureRate: 35.9,
    failedStudents: 98,
    prerequisites: ["APE III"],
    semester: 4
  },
  {
    id: "14",
    name: "PI II",
    code: "PI201",
    workload: 80,
    failureRate: 31.5,
    failedStudents: 94,
    prerequisites: ["PI I"],
    semester: 2
  }
];

export const mockCourses: Course[] = [
  {
    id: "1",
    name: "Engenharia de Software",
    studentsWithFailures: 189,
    totalStudents: 450,
    failurePercentage: 42.0
  },
  {
    id: "2", 
    name: "Ciência da Computação",
    studentsWithFailures: 156,
    totalStudents: 390,
    failurePercentage: 40.0
  },
  {
    id: "3",
    name: "Sistemas de Informação",
    studentsWithFailures: 124,
    totalStudents: 325,
    failurePercentage: 38.1
  },
  {
    id: "4",
    name: "Gestão da Tecnologia da Informação",
    studentsWithFailures: 95,
    totalStudents: 280,
    failurePercentage: 33.9
  },
  {
    id: "5",
    name: "Matemática",
    studentsWithFailures: 78,
    totalStudents: 245,
    failurePercentage: 31.8
  }
];

export const mockKPIs = {
  totalStudentsWithFailures: 1247,
  subjectWithHighestFailureRate: "Banco de Dados II",
  studentsAtRisk: 23.4,
  criticalSubjects: 8
};

export const semesterDistribution = [
  { semester: "1º", failures: 156, percentage: 12.5 },
  { semester: "2º", failures: 324, percentage: 26.0 },
  { semester: "3º", failures: 298, percentage: 23.9 },
  { semester: "4º", failures: 245, percentage: 19.6 },
  { semester: "5º", failures: 145, percentage: 11.6 },
  { semester: "6º", failures: 79, percentage: 6.3 }
];

export const failureEvolution = [
  { semester: "2023.1", rate: 28.5 },
  { semester: "2023.2", rate: 31.2 },
  { semester: "2024.1", rate: 29.8 },
  { semester: "2024.2", rate: 26.4 },
  { semester: "2025.1", rate: 24.8 }
];