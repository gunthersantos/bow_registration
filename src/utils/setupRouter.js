// Suppress React Router future flag warnings
import { startTransition } from 'react';

// This is a temporary fix until React Router v7 is stable
if (typeof window !== 'undefined') {
  window.__reactRouterVersion = '6';
}