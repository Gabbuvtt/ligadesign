-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Table: LEADS
create table public.leads (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    email text not null,
    phone text,
    status text not null default 'NUEVO', -- NUEVO, CONTACTADO, COTIZANDO, CERRADO, PERDIDO
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: PROJECTS
create table public.projects (
    id uuid default uuid_generate_v4() primary key,
    lead_id uuid references public.leads(id) on delete set null,
    name text not null,
    status text not null default 'PLANOS', -- PLANOS, COTIZANDO, APROBADO, PRODUCCION, INSTALACION, ENTREGADO
    budget numeric,
    quotation_params jsonb default '{}'::jsonb, -- Ej: {"type": "METRAJE", "value": 25.5}
    cutting_list jsonb default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: BOARDS_INVENTORY (Tableros)
create table public.boards_inventory (
    id uuid default uuid_generate_v4() primary key,
    material text not null,
    color text not null,
    width numeric not null,
    height numeric not null,
    thickness numeric not null,
    cost numeric not null,
    available_quantity integer not null default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: HARDWARE_INVENTORY (Herrajes Premium)
create table public.hardware_inventory (
    id uuid default uuid_generate_v4() primary key,
    type text not null, -- Bisagra, Corredera, etc
    brand text not null, -- Blum, Hettich, etc
    model text,
    available_quantity integer not null default 0,
    unit_cost numeric not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: PROJECT_HARDWARE (Relación Proyectos - Herrajes)
create table public.project_hardware (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references public.projects(id) on delete cascade,
    hardware_id uuid references public.hardware_inventory(id) on delete restrict,
    quantity_used integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Configurar Row Level Security (RLS)
-- Queremos que el usuario anónimo (la landing page) pueda insertar en LEADS,
-- pero sólo los administradores autenticados puedan leer/editar todo.

alter table public.leads enable row level security;
alter table public.projects enable row level security;
alter table public.boards_inventory enable row level security;
alter table public.hardware_inventory enable row level security;
alter table public.project_hardware enable row level security;

-- Políticas para LEADS
create policy "Permitir insertar leads a usuarios anónimos"
on public.leads for insert
to anon
with check (true);

create policy "Permitir todo a administradores autenticados"
on public.leads for all
to authenticated
using (true);

-- Políticas para el resto (sólo administradores autenticados)
create policy "Permitir todo a administradores autenticados en proyectos"
on public.projects for all to authenticated using (true);

create policy "Permitir todo a administradores autenticados en tableros"
on public.boards_inventory for all to authenticated using (true);

create policy "Permitir todo a administradores autenticados en herrajes"
on public.hardware_inventory for all to authenticated using (true);

create policy "Permitir todo a administradores autenticados en project_hardware"
on public.project_hardware for all to authenticated using (true);

-- Table: WHATSAPP_CONTACTS
create table public.whatsapp_contacts (
    id uuid default uuid_generate_v4() primary key,
    phone_number text not null unique,
    name text,
    lead_id uuid references public.leads(id) on delete set null,
    last_message_at timestamp with time zone default timezone('utc'::text, now()),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: WHATSAPP_MESSAGES
create table public.whatsapp_messages (
    id uuid default uuid_generate_v4() primary key,
    contact_id uuid references public.whatsapp_contacts(id) on delete cascade not null,
    direction text not null, -- 'inbound' or 'outbound'
    content text not null,
    status text default 'sent', -- 'sent', 'delivered', 'read', 'received'
    meta_message_id text unique, -- to track delivery status from Meta
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
