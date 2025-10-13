export interface IUserData {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    token: string,
}


export interface IProfile {
    id: number,
    user: IUserData,
    created_at: string,
    posts: IPost[],
    votes: IPost[],
}


export interface IPost {
    id: number,
    question: string,
    option1: string,
    option1_votes: number,
    option2: string,
    option2_votes: number,
    author: string,
    author_id: number
}