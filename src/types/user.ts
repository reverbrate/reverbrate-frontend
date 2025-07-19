import { ReviewsResponse } from "./reviews";

export interface User {
    id: string;
    name: string;
    nickname: string;
    email: string;
    image: string;
    bio: string;
    reviews: ReviewsResponse;
}
