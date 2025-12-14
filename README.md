# BibJotz Frontend

A Next.js application for creating and managing Bible study guides.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

### App Routes
```
app/
├── (auth)/
│   ├── layout.tsx          # Auth layout wrapper
│   └── login/
│       └── page.tsx        # Login page
├── create-guide/
│   └── page.tsx            # Create guide route (wraps CreateGuidePage)
├── layout.tsx              # Root layout with providers
└── page.tsx                # Home page
```

### Features

## Bible Reader (`features/bible/components/bible-reader/`)
**Components:**
- `BibleReader.tsx` - Main reader container
- `BibleReaderModal.tsx` - Modal wrapper for Bible reader
- `BibleReaderControls.tsx` - Panel management controls
- `ReadingPanel/`
  - `ReadingPannel.tsx` - Individual reading panel
  - `ReadingPannelContent.tsx` - Panel content display
  - `ReadingPanelControls.tsx` - Panel controls (book, chapter, translation selectors)
- `ScripturePanel/`
  - `ScriptureSelectionPanel.tsx` - Selected verses display
  - `Scripures.tsx` - Individual verse component
  - `ScripturePanelSkeleton.tsx` - Loading skeleton
  - `ScriptureSelectionBadge.tsx` - Verse selection badge component
  - `ScriptureSelectionBadgeColors.tsx` - Badge color schemes

**Context:**
- `VerseSelectionProvider.tsx` - Verse selection state provider

**Hooks:**
- `useReadingPanels.ts` - Panel state management
- `useReadingPanel.ts` - Individual panel data fetching
- `useVerseSelection.ts` - Verse selection state
- `useVersSelectionDisplay.ts` - Verse selection display logic
- `useFontSize.ts` - Font size control
- `useTranslations.ts` - Translation management

## Guide Creation (`features/guide/creation-form/`)
**Components:**
- `CreateGuidePage.tsx` - Main guide creation page component
- `CreateGuideHeader.tsx` - Guide creation header
- `GuideHeader.tsx` - Guide header component
- `GuideSections.tsx` - Guide sections management
- `GuideSectionCard.tsx` - Individual section card
- `GuideBiblicalReference.tsx` - Biblical references component
- `TitleSectionInput.tsx` - Title input component
- `BiblicalReference/`
  - `BiblicalReferenceComponent.tsx` - Main reference component
  - `BiblicalReferenceHeader.tsx` - References section header
  - `BiblicalReferenceList.tsx` - List of references
  - `EmptyBiblicalReferenceCard.tsx` - Empty state card
  - `InlineEditableReference.tsx` - Editable reference component
  - `Inputs/`
    - `ChapterDropdown.tsx` - Chapter selection dropdown
    - `VerseDropdown.tsx` - Verse selection dropdown
    - `NumberDropdown.tsx` - Number selection dropdown

**Context Providers:**
- `GuideForm/Provider.tsx` - Main guide creation context
- `GuideMetaData/Provider.tsx` - Guide metadata state
- `GuideSection/Provider.tsx` - Sections state
- `GuideBiblicalReferences/Provider.tsx` - Biblical references state
- `GuideBiblicalReferencesLists/Provider.tsx` - References lists state

**Hooks:**
- `useCreateGuideForm.ts` - Form state management
- `useGuideFormData.ts` - Form data aggregation

## Guide Drafts (`features/guide/drafts/`)
**API:**
- `api/index.ts` - Drafts API service

**Hooks:**
- `useDraftsApi.ts` - Drafts API queries
- `useDraftHydration.ts` - Draft data hydration

**Types:**
- `types/index.ts` - Draft-related type definitions

**Utilities:**
- `utility.ts` - Draft utility functions

## Book Autocomplete (`features/bible/components/book-autocomplete/`)
- `component/BookAutocomplete.tsx` - Book search/autocomplete component
- `hooks/useBookAutocomplete.ts` - Autocomplete logic

## Shared Components (`components/`)

**Layout:**
- `ConditionalLayout.tsx` - Conditional layout wrapper
- `AppHeader.tsx` - Application header
- `AppSideBar/`
  - `components/AppSideBar.tsx` - Sidebar navigation
  - `components/DraftItems.tsx` - Draft items display
  - `hooks/useAppSideBar.ts` - Sidebar state management
- `MainContent.tsx` - Main content wrapper
- `NavLink.tsx` - Navigation link component

**Providers:**
- `QueryProvider.tsx` - React Query provider

**UI Components:**
- `ui/` - Reusable UI components built on Radix UI primitives:
  - `badge.tsx` - Badge component
  - `button.tsx` - Button component
  - `Card/` - Card components
  - `Collapsible/` - Collapsible component
  - `Dialogue/` - Dialog component
  - `Form/` - Form components (form, input, label, switch, textArea)
  - `ScrollArea/` - Scroll area component
  - `Select/` - Select component
  - `separator.tsx` - Separator component
  - `SideBar/` - Sidebar components (sidebar, sidebarContent, sidebarGroup, etc.)

### API & Types

**Bible API** (`features/bible/api/`)
- `index.ts` - BibleApiService, TranslationApiService

**Bible Hooks** (`features/bible/hooks/`)
- `useBibleApi.ts` - Shared Bible API queries
- `useTypeMappers.ts` - Type mapping utilities

**Bible Utils** (`features/bible/utils/`)
- `passageColorSchemes.ts` - Color scheme utilities for passages

**Types:**
- `features/bible/types/` - Bible-related type definitions
- `features/bible/components/bible-reader/types/` - ReadingPanel, Verse, BookInfo types
- `features/guide/types/` - Guide-related type definitions

### Shared Hooks
- `hooks/use-mobile.tsx` - Mobile device detection hook

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **State Management:** React Context, React Query (TanStack Query)
- **Authentication:** Clerk
- **UI Components:** Custom components built on Radix UI primitives
- **Form Management:** React Hook Form with Zod validation
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Bible API:** biblesdk
