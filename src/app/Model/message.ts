import { User } from './user';
import { Project } from './project';

export interface Message {
    message: string | null | undefined;
    date: string | null | undefined;
}