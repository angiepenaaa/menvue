/*
  # Add Repository Sync Schema

  1. New Tables
    - `repository_syncs`: Tracks repository synchronization status
      - Includes sync status, last sync time, and error tracking
      - Implements soft delete pattern
      - Uses enum for sync status tracking

  2. Security
    - Enables Row Level Security (RLS)
    - Implements policies for authenticated users
*/

-- Create enum for sync status
CREATE TYPE repository_sync_status AS ENUM (
    'pending',
    'in_progress',
    'completed',
    'failed'
);

-- Create repository syncs table
CREATE TABLE IF NOT EXISTS repository_syncs (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    repository_url text NOT NULL,
    branch text NOT NULL DEFAULT 'main',
    status repository_sync_status NOT NULL DEFAULT 'pending',
    last_sync_at timestamptz,
    error_message text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    deleted_at timestamptz
);

-- Enable RLS
ALTER TABLE repository_syncs ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own syncs
CREATE POLICY "Users can view their own repository syncs"
    ON repository_syncs
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid() AND deleted_at IS NULL);

-- Create policy for users to insert their own syncs
CREATE POLICY "Users can create repository syncs"
    ON repository_syncs
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Create policy for users to update their own syncs
CREATE POLICY "Users can update their own repository syncs"
    ON repository_syncs
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid() AND deleted_at IS NULL)
    WITH CHECK (user_id = auth.uid());

-- Create index for faster lookups
CREATE INDEX repository_syncs_user_id_idx ON repository_syncs (user_id) WHERE deleted_at IS NULL;
CREATE INDEX repository_syncs_status_idx ON repository_syncs (status) WHERE deleted_at IS NULL;