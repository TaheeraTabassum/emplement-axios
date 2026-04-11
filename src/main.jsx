import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient(); // ১. ক্লায়েন্ট তৈরি

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}> {/* ২. প্রোভাইডার দিয়ে র‍্যাপ */}
    <App />
  </QueryClientProvider>
);