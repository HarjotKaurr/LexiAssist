# Overview

LexiAssist (formerly DyslexAI) is a React-based web application designed to assist in the early detection of dyslexia through gamified screening tests. The application provides a 5-minute assessment consisting of three interactive tests: Letter Matching, Word Speed Challenge, and Visual Focus Game. Users can complete these tests in multiple languages (English, Hindi, Tamil) and receive personalized learning recommendations based on their performance.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript built on Vite for fast development and optimized builds
- **UI Library**: Shadcn/ui components built on Radix UI primitives providing accessible, customizable components
- **Styling**: Tailwind CSS with custom color scheme and dyslexia-friendly font support (OpenDyslexic)
- **State Management**: React Context API for global test state, language preferences, and results management
- **Routing**: React Router for client-side navigation between home, screening, and results pages
- **Animations**: Motion library for smooth transitions and engaging user interactions

## Component Structure
- **Layout Components**: Navigation with language selector, responsive layout with dyslexia-friendly design
- **Test Components**: Three specialized components for each screening test (LetterMatch, WordSpeed, VisualFocus)
- **Context Provider**: TestContext manages test progress, results, and language preferences with localStorage persistence
- **UI Components**: Comprehensive set of accessible components from Shadcn/ui for consistent design

## Data Management
- **Local Storage**: User preferences (language selection) and test results persistence
- **Context State**: Real-time test progress tracking, scoring algorithms, and results calculation
- **No Backend**: Fully client-side application with no server dependencies for core functionality

## Accessibility Features
- **Dyslexia-Friendly Design**: Support for OpenDyslexic font, high contrast colors, and clear visual hierarchy
- **Multi-language Support**: Complete localization for English, Hindi, and Tamil languages
- **Responsive Design**: Mobile-first approach ensuring usability across all device sizes
- **Keyboard Navigation**: Full keyboard accessibility throughout the application

## Test Implementation
- **Letter Matching**: Tests ability to distinguish between visually similar letters (b, d, p, q)
- **Word Speed**: Measures reading speed and accuracy with a mix of common and challenging words
- **Visual Focus**: Gamified eye-tracking simulation to assess attention and focus capabilities

# External Dependencies

- **React Ecosystem**: React 18, React Router, React Hook Form for form handling
- **UI Framework**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS for utility-first styling approach
- **State Management**: TanStack Query for potential future API integration
- **Development Tools**: Vite for build tooling, TypeScript for type safety, ESLint for code quality
- **Fonts**: Google Fonts (Inter) and CDN Fonts (OpenDyslexic) for typography
- **Icons**: Lucide React for consistent iconography
- **Animations**: Motion library for smooth user experience transitions

Note: The application is currently designed as a fully client-side solution with no external APIs or databases required for core functionality.