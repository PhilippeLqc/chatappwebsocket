export interface UserDto {
    id: number;
    username: string;
    email: string;
    role: string;
    taskIds: number[];
    projectIds: number[];
    messageIds: number[];
}