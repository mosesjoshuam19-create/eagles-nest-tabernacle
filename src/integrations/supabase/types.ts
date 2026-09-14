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
      activities: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          status: Database["public"]["Enums"]["status_type"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: Database["public"]["Enums"]["status_type"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: Database["public"]["Enums"]["status_type"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          content: string
          created_at: string | null
          created_by: string
          id: string
          is_published: boolean | null
          publish_date: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by: string
          id?: string
          is_published?: boolean | null
          publish_date?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string
          id?: string
          is_published?: boolean | null
          publish_date?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      archived_services: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          duration_seconds: number | null
          id: string
          is_published: boolean | null
          service_date: string
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_seconds?: number | null
          id?: string
          is_published?: boolean | null
          service_date: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_seconds?: number | null
          id?: string
          is_published?: boolean | null
          service_date?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      bible_verses: {
        Row: {
          created_at: string | null
          created_by: string
          date: string
          id: string
          reference: string
          verse: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          date: string
          id?: string
          reference: string
          verse: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          date?: string
          id?: string
          reference?: string
          verse?: string
        }
        Relationships: []
      }
      daily_quotations: {
        Row: {
          author: string | null
          created_at: string | null
          created_by: string
          date: string
          id: string
          quote: string
          scripture_reference: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          created_by: string
          date: string
          id?: string
          quote: string
          scripture_reference?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          created_by?: string
          date?: string
          id?: string
          quote?: string
          scripture_reference?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          event_date: string
          event_type: string | null
          id: string
          is_published: boolean | null
          location: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          event_date: string
          event_type?: string | null
          id?: string
          is_published?: boolean | null
          location?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          event_date?: string
          event_type?: string | null
          id?: string
          is_published?: boolean | null
          location?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      financial_entries: {
        Row: {
          amount: number
          created_at: string | null
          date: string
          description: string | null
          id: string
          pledge_category_id: string | null
          recorded_by: string
          type: Database["public"]["Enums"]["financial_type"]
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          pledge_category_id?: string | null
          recorded_by: string
          type: Database["public"]["Enums"]["financial_type"]
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          pledge_category_id?: string | null
          recorded_by?: string
          type?: Database["public"]["Enums"]["financial_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_entries_pledge_category_id_fkey"
            columns: ["pledge_category_id"]
            isOneToOne: false
            referencedRelation: "pledge_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      live_chat_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      leaders: {
        Row: {
          biography: string
          category: string
          created_at: string
          created_by: string
          description: string | null
          id: string
          image_url: string | null
          is_published: boolean
          name: string
          position: string
          responsibility: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          biography: string
          category?: string
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          name: string
          position: string
          responsibility?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          biography?: string
          category?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          name?: string
          position?: string
          responsibility?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          body: string | null
          created_at: string
          created_by: string | null
          id: string
          image_url: string | null
          is_published: boolean
          link_url: string | null
          page_key: string
          section_key: string
          sort_order: number
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          link_url?: string | null
          page_key: string
          section_key: string
          sort_order?: number
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          link_url?: string | null
          page_key?: string
          section_key?: string
          sort_order?: number
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_content: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          duration: number | null
          file_url: string | null
          id: string
          is_published: boolean | null
          media_type: string
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          duration?: number | null
          file_url?: string | null
          id?: string
          is_published?: boolean | null
          media_type: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          duration?: number | null
          file_url?: string | null
          id?: string
          is_published?: boolean | null
          media_type?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      music_categories: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      music_ministry_opportunities: {
        Row: {
          contact_info: string | null
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          is_active: boolean | null
          requirements: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          contact_info?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          requirements?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          contact_info?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          requirements?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      music_tracks: {
        Row: {
          artist: string | null
          category_id: string | null
          created_at: string | null
          created_by: string
          date_recorded: string | null
          duration: number | null
          file_url: string | null
          id: string
          is_published: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          artist?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by: string
          date_recorded?: string | null
          duration?: number | null
          file_url?: string | null
          id?: string
          is_published?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          artist?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string
          date_recorded?: string | null
          duration?: number | null
          file_url?: string | null
          id?: string
          is_published?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "music_tracks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "music_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_subscriptions: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          subscription_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          subscription_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          subscription_type?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      pledge_categories: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      practice_schedules: {
        Row: {
          created_at: string | null
          created_by: string
          day_of_week: number
          duration_minutes: number | null
          group_name: string
          id: string
          is_active: boolean | null
          location: string | null
          time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          day_of_week: number
          duration_minutes?: number | null
          group_name: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          day_of_week?: number
          duration_minutes?: number | null
          group_name?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          time?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          budget: number | null
          created_at: string | null
          created_by: string
          description: string | null
          end_date: string | null
          id: string
          start_date: string | null
          status: Database["public"]["Enums"]["status_type"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          created_by: string
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["status_type"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["status_type"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      questions_answers: {
        Row: {
          answer: string | null
          answered_at: string | null
          answered_by: string | null
          asked_at: string | null
          asked_by: string
          id: string
          is_published: boolean | null
          question: string
          status: Database["public"]["Enums"]["qa_status"] | null
        }
        Insert: {
          answer?: string | null
          answered_at?: string | null
          answered_by?: string | null
          asked_at?: string | null
          asked_by: string
          id?: string
          is_published?: boolean | null
          question: string
          status?: Database["public"]["Enums"]["qa_status"] | null
        }
        Update: {
          answer?: string | null
          answered_at?: string | null
          answered_by?: string | null
          asked_at?: string | null
          asked_by?: string
          id?: string
          is_published?: boolean | null
          question?: string
          status?: Database["public"]["Enums"]["qa_status"] | null
        }
        Relationships: []
      }
      service_schedules: {
        Row: {
          created_at: string | null
          created_by: string
          day_of_week: number
          description: string | null
          duration_minutes: number | null
          id: string
          is_active: boolean | null
          is_live_streamed: boolean | null
          service_name: string
          time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          day_of_week: number
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          is_live_streamed?: boolean | null
          service_name: string
          time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          day_of_week?: number
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          is_live_streamed?: boolean | null
          service_name?: string
          time?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "pastor"
        | "trustee"
        | "deacon"
        | "music_director"
        | "media_director"
        | "member"
      financial_type: "tithe" | "offering" | "pledge"
      qa_status: "pending" | "answered" | "published" | "private"
      status_type: "pending" | "active" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "pastor",
        "trustee",
        "deacon",
        "music_director",
        "media_director",
        "member",
      ],
      financial_type: ["tithe", "offering", "pledge"],
      qa_status: ["pending", "answered", "published", "private"],
      status_type: ["pending", "active", "completed", "cancelled"],
    },
  },
} as const
