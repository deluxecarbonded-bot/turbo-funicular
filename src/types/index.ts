export interface Profile {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  from_user_id: string | null;
  to_user_id: string;
  content: string;
  is_anonymous: boolean;
  is_answered: boolean;
  is_public: boolean;
  likes_count: number;
  created_at: string;
  from_profile?: Profile | null;
}

export interface Answer {
  id: string;
  question_id: string;
  user_id: string;
  content: string;
  likes_count: number;
  created_at: string;
}

export interface QuestionLike {
  user_id: string;
  question_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'new_question' | 'new_answer' | 'new_like' | 'new_follower';
  data: {
    question_id?: string;
    answer_id?: string;
    from_user_id?: string;
    from_username?: string;
  };
  is_read: boolean;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}
