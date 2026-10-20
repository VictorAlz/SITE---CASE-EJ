export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  linkedin_url: string | null;
  email: string | null;
  photo_url: string | null;
  display_order: number;
}
