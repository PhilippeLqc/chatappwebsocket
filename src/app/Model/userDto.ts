export interface UserDto {
    id: number | null | undefined;
    username: string | null | undefined;
    email: string | null | undefined;
    role: string | null | undefined;
    taskIds: number[];
    projectIds: number[];
    messageIds: number[];
}