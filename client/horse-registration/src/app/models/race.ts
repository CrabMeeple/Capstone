import { Member } from "./member";

export interface Race {
    RaceId: number;
    TrackName: string;
    SponsorName: string;
    SponsorPhone: string;
    SponsorEmail: string;
    MaxGroupSize: number;
    Members: Member[];
}