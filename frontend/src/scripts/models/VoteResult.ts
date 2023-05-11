export default class VoteResult {
    constructor(
        public userName: string | null,
        public taskTitle: string,
        public taskDescription: string,
        public storyPoint: number,
    ){}
}