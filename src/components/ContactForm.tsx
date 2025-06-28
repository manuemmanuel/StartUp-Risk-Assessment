"use client";

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("myyaenyj");
  
  if (state.succeeded) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Thank you for your message!</h3>
        <p className="text-foreground/70">We'll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email" 
          name="email"
          required
          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          placeholder="Enter your email address"
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
          className="text-red-500 text-sm mt-1"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
          placeholder="Tell us about your startup or ask us a question..."
        />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
          className="text-red-500 text-sm mt-1"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={state.submitting}
        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
} 