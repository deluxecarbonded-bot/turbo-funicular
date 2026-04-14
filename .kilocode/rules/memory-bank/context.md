# Active Context: Exotic - Anonymous Q&A Platform

## Current State

**Project Status**: Completed - Production Ready

Exotic is a full-featured anonymous Q&A platform (AskFM/CuriousCat/Tellonym clone) with real-time subscriptions ready for Supabase connection.

## Recently Completed

- [x] SPEC.md specification document created
- [x] Dependencies installed (framer-motion, @supabase/supabase-js, lucide-react, etc.)
- [x] Global CSS with Tailwind CSS 4 and theme system
- [x] Custom animated SVG logo and icons (24+ icons)
- [x] UI Components (Button, Input, Textarea, Card, Avatar, Modal, Toggle, Skeleton)
- [x] Layout Components (Navbar, Sidebar, MobileNav, Container, PageWrapper)
- [x] Feature Components (QuestionCard, AnswerEditor, AskForm, ProfileHeader, StatsDisplay, NotificationItem, LikeButton, FollowButton)
- [x] Pages (Home, Profile, Ask, Notifications, Settings, Login, Register)
- [x] Real-time subscription hooks (useRealtimeQuestions, useRealtimeAnswers, useRealtimeLikes, useRealtimeNotifications)
- [x] Theme provider with dark/light mode
- [x] Supabase client setup
- [x] All animations with Framer Motion
- [x] TypeScript passes typecheck
- [x] ESLint passes with no errors

## Color Scheme

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background | #FFFFFF | #000000 |
| Text | #000000 | #FFFFFF |
| Button Background | #000000 | #FFFFFF |
| Button Text | #FFFFFF | #000000 |
| Logo/Icons | #000000 | #FFFFFF |

## Design Exclusions (As Required)

- No borders anywhere
- No outlines on focus
- No emojis anywhere
- No gradients anywhere
- No mock data (Supabase ready)

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion for animations
- Supabase (ready for connection)

## File Structure

```
src/
├── app/
│   ├── (auth)/login, register
│   ├── (main)/home, ask/[username], [username], notifications, settings
│   ├── globals.css
│   ├── layout.tsx
│   └── providers.tsx
├── components/
│   ├── ui/ (Button, Input, Textarea, Card, Avatar, Modal, Toggle, Skeleton)
│   ├── layout/ (Navbar, Sidebar, MobileNav, Container)
│   ├── features/ (QuestionCard, AnswerEditor, AskForm, ProfileHeader, etc.)
│   └── icons/ (24+ custom SVG icons)
├── hooks/ (useTheme, useSupabase, useRealtime)
├── lib/ (supabase.ts, utils.ts)
└── types/ (index.ts)
```

## Next Steps

User will connect their own Supabase database using:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## Session History

| Date | Changes |
|------|---------|
| Initial | Base Next.js template |
| 2026-04-14 | Built complete Exotic Q&A application with all features |
