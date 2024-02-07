export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      compagny: {
        Row: {
          billing_address: string | null
          company_name: string | null
          id: string
          siren: string | null
          siret: string
          tva: number | null
        }
        Insert: {
          billing_address?: string | null
          company_name?: string | null
          id?: string
          siren?: string | null
          siret: string
          tva?: number | null
        }
        Update: {
          billing_address?: string | null
          company_name?: string | null
          id?: string
          siren?: string | null
          siret?: string
          tva?: number | null
        }
        Relationships: []
      }
      invoice: {
        Row: {
          amount: number | null
          created_at: string
          id: string
          payment_method: string | null
          status: string | null
          tax: number | null
        }
        Insert: {
          amount?: number | null
          created_at: string
          id?: string
          payment_method?: string | null
          status?: string | null
          tax?: number | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: string
          payment_method?: string | null
          status?: string | null
          tax?: number | null
        }
        Relationships: []
      }
      modul: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name_modul: string | null
        }
        Insert: {
          created_at: string
          description?: string | null
          id?: string
          name_modul?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name_modul?: string | null
        }
        Relationships: []
      }
      pack: {
        Row: {
          description: string | null
          id: string
          name_pack: string | null
          price: number | null
        }
        Insert: {
          description?: string | null
          id?: string
          name_pack?: string | null
          price?: number | null
        }
        Update: {
          description?: string | null
          id?: string
          name_pack?: string | null
          price?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          id_company: string | null
          is_active: boolean | null
          last_name: string | null
          password: string | null
          role: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: boolean | null
          update_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          id_company?: string | null
          is_active?: boolean | null
          last_name?: string | null
          password?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: boolean | null
          update_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          id_company?: string | null
          is_active?: boolean | null
          last_name?: string | null
          password?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: boolean | null
          update_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_company_fkey"
            columns: ["id_company"]
            isOneToOne: false
            referencedRelation: "compagny"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rel_modul_pack: {
        Row: {
          id_modul: string
          id_pack: string
        }
        Insert: {
          id_modul: string
          id_pack: string
        }
        Update: {
          id_modul?: string
          id_pack?: string
        }
        Relationships: [
          {
            foreignKeyName: "rel_modul_pack_id_modul_fkey"
            columns: ["id_modul"]
            isOneToOne: false
            referencedRelation: "modul"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rel_modul_pack_id_pack_fkey"
            columns: ["id_pack"]
            isOneToOne: false
            referencedRelation: "pack"
            referencedColumns: ["id"]
          }
        ]
      }
      rel_pack_subscription: {
        Row: {
          id_pack: string | null
          id_subscription: string | null
        }
        Insert: {
          id_pack?: string | null
          id_subscription?: string | null
        }
        Update: {
          id_pack?: string | null
          id_subscription?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rel_pack_subscription_id_pack_fkey"
            columns: ["id_pack"]
            isOneToOne: false
            referencedRelation: "pack"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rel_pack_subscription_id_subscription_fkey"
            columns: ["id_subscription"]
            isOneToOne: false
            referencedRelation: "subscription"
            referencedColumns: ["id"]
          }
        ]
      }
      subscription: {
        Row: {
          end_subscription: string | null
          id: string
          id_profile: string | null
          payment_method: string | null
          start_subscription: string
          status: string | null
        }
        Insert: {
          end_subscription?: string | null
          id?: string
          id_profile?: string | null
          payment_method?: string | null
          start_subscription: string
          status?: string | null
        }
        Update: {
          end_subscription?: string | null
          id?: string
          id_profile?: string | null
          payment_method?: string | null
          start_subscription?: string
          status?: string | null
        }
        Relationships: []
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
