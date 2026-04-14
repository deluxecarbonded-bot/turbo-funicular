# Exotic - Anonymous Q&A Platform Specification

## 1. Project Overview

**Project Name:** Exotic  
**Type:** Full-stack Anonymous Q&A Social Media Application (AskFM, CuriousCat, Tellonym Clone)  
**Core Functionality:** Anonymous question-and-answer platform where users can receive questions from the public and answer them publicly or anonymously  
**Target Users:** Social media users who want to engage in anonymous Q&A interactions

## 2. Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + Custom CSS Variables
- **Animations:** Framer Motion + @reactbits/animations
- **Database:** Supabase (Schema ready, user will connect)
- **Real-time:** Supabase Realtime Subscriptions
- **Package Manager:** Bun

## 3. Color Palette

### Light Mode
- **Background:** #FFFFFF
- **Text:** #000000
- **Button Background:** #000000
- **Button Text:** #FFFFFF
- **Logo/Icons:** #000000

### Dark Mode
- **Background:** #000000
- **Text:** #FFFFFF
- **Button Background:** #FFFFFF
- **Button Text:** #000000
- **Logo/Icons:** #FFFFFF

## 4. UI/UX Design Requirements

### Layout
- **Desktop:** Sidebar navigation (left), Main content (center), Suggestions/Who to follow (right)
- **Tablet:** Collapsed sidebar, full-width content
- **Mobile:** Bottom navigation bar, full-width content

### Design Principles
- No borders anywhere
- No outlines on focus states
- No emojis anywhere
- No gradients anywhere
- Clean, minimal, high-contrast design
- Smooth animations with Framer Motion
- Use AnimatePresence for page transitions

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 5. Pages & Routes

1. **Home Feed** (`/`) - Display questions received
2. **Ask Page** (`/ask/[username]`) - Ask someone a question
3. **Profile Page** (`/[username]`) - User profile with Q&A
4. **Notifications** (`/notifications`) - Real-time notifications
5. **Settings** (`/settings`) - Account settings
6. **Auth Pages** (`/login`, `/register`) - Authentication

## 6. Core Features

### Authentication
- Email/password registration and login
- Username selection
- Profile creation with avatar and bio

### Q&A System
- Anonymous question asking
- Public/Private answer toggle
- Question reveal/reveal count
- Like/Heart questions
- Share questions

### Profile
- Username and display name
- Avatar (custom upload, no emoji)
- Bio/About section
- Link to social media
- Stats (questions received, answered, likes)

### Real-time Features
- New question notifications (instant)
- New answer notifications
- Like counts update live
- New follower notifications
- Typing indicators

### Interactions
- Ask Question modal/page
- Answer question inline
- Like/Unlike questions
- Report inappropriate content
- Share to other platforms
- Copy link

## 7. Components Required

### UI Components
- Button (primary, secondary, ghost variants)
- Input (text, textarea, password)
- Card (for questions)
- Avatar (custom, no emoji)
- Modal
- Dropdown
- Toggle/Switch
- Badge
- Skeleton/Loader
- Toast/Notification

### Layout Components
- Navbar (desktop)
- Sidebar (desktop)
- MobileNav (mobile/tablet)
- Container
- PageWrapper

### Feature Components
- QuestionCard
- AnswerEditor
- AskForm
- ProfileHeader
- StatsDisplay
- NotificationItem
- FollowButton
- LikeButton
- ShareButton

## 8. Animations & Effects

### Page Transitions
- Fade in/out with slight slide
- Stagger children elements
- Use AnimatePresence for route changes

### Micro-interactions
- Button hover: scale(1.02), slight shadow
- Button click: scale(0.98)
- Card hover: subtle lift effect
- Like: heart pop animation
- Notification: slide in from right
- Modal: fade + scale from center

### Loading States
- Skeleton shimmer animation
- Spinner for actions in progress

## 9. Database Schema (Supabase Ready)

### Tables

```sql
-- Users
profiles (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Questions
questions (
  id UUID PRIMARY KEY,
  from_user_id UUID (anonymous = null),
  to_user_id UUID,
  content TEXT,
  is_anonymous BOOLEAN,
  is_answered BOOLEAN,
  is_public BOOLEAN,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP
)

-- Answers
answers (
  id UUID PRIMARY KEY,
  question_id UUID,
  user_id UUID,
  content TEXT,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP
)

-- Likes
question_likes (
  user_id UUID,
  question_id UUID,
  created_at TIMESTAMP,
  PRIMARY KEY (user_id, question_id)
)

-- Notifications
notifications (
  id UUID PRIMARY KEY,
  user_id UUID,
  type TEXT,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP
)
```

### RLS Policies
- Public read for profiles
- Users can only read/write own data
- Questions readable by recipient and public if answered

## 10. Real-time Subscriptions

```typescript
// Subscribe to new questions
supabase.channel('questions')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'questions' }, callback)

// Subscribe to new answers
supabase.channel('answers')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'answers' }, callback)

// Subscribe to likes update
supabase.channel('likes')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'questions' }, callback)

// Subscribe to notifications
supabase.channel('notifications')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, callback)
```

## 11. Logo & Icons

### Logo (Animated SVG)
- Name: Exotic
- Design: Stylized "E" with flowing, modern design
- Animation: Subtle pulse or flow effect
- Colors: Follow theme (black in light mode, white in dark mode)

### Icons (Custom SVG)
- Home, Ask (question mark), Profile, Notifications, Settings, Search, Like (heart), Share, Reply, Menu, Close, Edit, Delete, Check, Arrow
- All custom SVG, no emoji
- Stroke-based design for consistency

## 12. Exclusions

- ❌ No emojis anywhere
- ❌ No gradients
- ❌ No borders
- ❌ No outlines
- ❌ No mock data (user will connect real Supabase)
- ❌ No seed data

## 13. File Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (main)/
│   │   ├── layout.tsx
│   │   ├── page.tsx (home feed)
│   │   ├── ask/[username]/page.tsx
│   │   ├── [username]/page.tsx
│   │   ├── notifications/page.tsx
│   │   └── settings/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── providers.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Avatar.tsx
│   │   ├── Modal.tsx
│   │   ├── Toggle.tsx
│   │   └── Skeleton.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MobileNav.tsx
│   │   └── Container.tsx
│   ├── features/
│   │   ├── QuestionCard.tsx
│   │   ├── AnswerEditor.tsx
│   │   ├── AskForm.tsx
│   │   ├── ProfileHeader.tsx
│   │   ├── StatsDisplay.tsx
│   │   ├── NotificationItem.tsx
│   │   ├── LikeButton.tsx
│   │   └── FollowButton.tsx
│   └── icons/
│       └── index.tsx
├── hooks/
│   ├── useSupabase.ts
│   ├── useRealtime.ts
│   └── useTheme.ts
├── lib/
│   ├── supabase.ts (client setup)
│   └── utils.ts
└── types/
    └── index.ts
```

## 14. Acceptance Criteria

- [ ] Light/Dark mode works correctly with specified colors
- [ ] All pages render without errors
- [ ] Navigation works without page refresh
- [ ] Real-time subscriptions ready for connection
- [ ] Framer Motion animations on all interactions
- [ ] Responsive on mobile, tablet, desktop
- [ ] No borders, outlines, emojis, or gradients
- [ ] Custom animated SVG logo
- [ ] Custom SVG icons throughout
- [ ] TypeScript passes typecheck
- [ ] ESLint passes
