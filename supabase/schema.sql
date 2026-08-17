-- igroprofi: схема базы данных для Supabase
-- Запустите этот скрипт в Supabase Dashboard -> SQL Editor (New query).

create extension if not exists pgcrypto;

-- Пользователи и подписки
create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  login         text not null unique,
  password_hash text not null,
  subscription  text check (subscription in ('month', 'forever')) default null,
  is_admin      boolean not null default false,
  expires_at    timestamptz default null,
  created_at    timestamptz not null default now()
);

-- Сессии (токен хранится хешем sha256)
create table if not exists public.sessions (
  token_hash text primary key,
  user_id    uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists sessions_user_idx on public.sessions (user_id);

-- Безопасность: включаем RLS. Сервер обращается через service_role ключ
-- (обходит RLS), клиент базу напрямую не трогает, поэтому политики не нужны.
alter table public.users enable row level security;
alter table public.sessions enable row level security;