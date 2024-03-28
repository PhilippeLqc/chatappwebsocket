import { Project } from "./project";
import { Task } from "./task";

export interface User {
    id: number | null | undefined;
    username: string | null | undefined;
    password: string | null | undefined;
    email: string | null | undefined;
    isEnable: boolean | null | undefined;
    role: string | null | undefined;
    token: string | null | undefined;
    tasks: Task[];
    projects: Project[];
}