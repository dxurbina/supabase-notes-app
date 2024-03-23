export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          id: number
          created_at: string
          email: boolean | null
          note: string | null
          user_id: string
        }
        Insert: {
            id: number
            created_at: string
            email: boolean | null
            note: string | null
            user_id: string
        }
        Update: {
            id: number
            created_at: string
            email: boolean | null
            note: string | null
            user_id: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}