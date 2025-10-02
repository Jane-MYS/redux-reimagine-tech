import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fallback values for development/demo purposes
const fallbackUrl = 'https://pftfxvxyffqufypmsjen.supabase.co'
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdGZ4dnh5ZmZxdWZ5cG1zamVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNTYxNjcsImV4cCI6MjA3NDkzMjE2N30.T5Pp9lsGzUC1RNOZcVnjxdyNE7PAXl1BN2nxweqgyDQ'

// Use environment variables if available, otherwise use fallback
const finalUrl = supabaseUrl || fallbackUrl
const finalKey = supabaseAnonKey || fallbackKey

export const supabase = createClient(finalUrl, finalKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          user_id: string
          company_name: string
          contact_email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          contact_email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          contact_email?: string
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          client_id: string
          title: string
          description: string
          status: 'pending' | 'in_progress' | 'completed'
          start_date: string
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          title: string
          description: string
          status?: 'pending' | 'in_progress' | 'completed'
          start_date: string
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          title?: string
          description?: string
          status?: 'pending' | 'in_progress' | 'completed'
          start_date?: string
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tickets: {
        Row: {
          id: string
          client_id: string
          title: string
          description: string
          status: 'open' | 'in_progress' | 'resolved' | 'closed'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          title: string
          description: string
          status?: 'open' | 'in_progress' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          title?: string
          description?: string
          status?: 'open' | 'in_progress' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          client_id: string
          invoice_number: string
          amount: number
          status: 'draft' | 'sent' | 'paid' | 'overdue'
          due_date: string
          pdf_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          invoice_number: string
          amount: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue'
          due_date: string
          pdf_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          invoice_number?: string
          amount?: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue'
          due_date?: string
          pdf_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
