drop table if exists general."Scanned";
drop table if exists general."QrCode";
drop table if exists general."User";
drop schema if exists general;
drop database if exists tdot_casino;

create database tdot_casino;

-- Select the database

create schema general;

create table  general."User"
(
    id     uuid    default gen_random_uuid() not null
        constraint "User_pk"
            primary key,
    name   varchar                           not null
        constraint "User_unique_name"
            unique,
    points integer default 0                 not null
);

create table  general."QrCode"
(
    id     uuid    default gen_random_uuid() not null
        constraint "QrCode_pk"
            primary key,
    name   varchar                           not null
        constraint "QrCode_unique_name"
            unique,
    points integer default 0                 not null
);

create table general."Scanned"
(
    user_id    uuid not null,
    qr_code_id uuid not null,
    constraint "Scanned_pk"
        primary key (user_id, qr_code_id)
);