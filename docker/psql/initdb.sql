-- Drop existing tables with same name
drop table if exists suppliers cascade;
drop table if exists projects cascade;
drop table if exists manufacturers cascade;
drop table if exists parts cascade;

--- define auto trigger event for timestamp fields
--- function def must stay as one line to pass regex
create or replace function trigger_set_timestamp()
returns trigger
language plpgsql as
'BEGIN NEW.updated_at = now(); RETURN NEW; END;';

--- create 'suppliers' table
create table if not exists suppliers (
    id int not null primary key generated always as identity,
    name varchar(255) not null,
    website varchar(255) null,
    updated_at timestamp not null default now(),
    created_at timestamp not null default now()
);

--- create 'projects' table
create table if not exists projects (
    id int not null primary key generated always as identity,
    name varchar(255) not null,
    description varchar(255) null,
    updated_at timestamp not null default now(),
    created_at timestamp not null default now()
);

--- create 'manufacturers' table
create table if not exists manufacturers (
    id int not null primary key generated always as identity,
    name varchar(255) not null,
    updated_at timestamp not null default now(),
    created_at timestamp not null default now()
);

--- create 'parts' table
create table if not exists parts (
    id int not null primary key generated always as identity,
    name varchar(255) not null,
    manufacturer_id int,
    supplier_id int,
    unit_price decimal(10,2) not null,
    description varchar(255) null,
    constraint fk_manufacturer
        foreign key(manufacturer_id)
            references manufacturers(id)
            on delete set null,
    constraint fk_suppliers
        foreign key(supplier_id)
            references suppliers(id)
            on delete set null,
    updated_at timestamp not null default now(),
    created_at timestamp not null default now()
);

--- create 'bom' table (for many to many parts and projects resolution)
--- composite primary key (the pair must be unique)
create table if not exists bom (
    project_id int not null,
    part_id int not null,
    quantity int not null,
    net_price decimal(10,2) not null,
    primary key (project_id, part_id),
    foreign key (project_id) references projects(id) on update cascade on delete cascade,
    foreign key (part_id) references parts(id) on update cascade,
    updated_at timestamp not null default now(),
    created_at timestamp not null default now()
);

--- drop triggers if exists
drop trigger if exists set_timestamp on manufacturers;
drop trigger if exists set_timestamp on suppliers;
drop trigger if exists set_timestamp on parts;
drop trigger if exists set_timestamp on bom;
drop trigger if exists set_timestamp on projects;


--- register trigger function for all tables
create trigger set_timestamp
before update on manufacturers
for each row
execute procedure trigger_set_timestamp();

create trigger set_timestamp
before update on suppliers
for each row
execute procedure trigger_set_timestamp();

create trigger set_timestamp
before update on parts
for each row
execute procedure trigger_set_timestamp();

create trigger set_timestamp
before update on bom
for each row
execute procedure trigger_set_timestamp();

create trigger set_timestamp
before update on projects
for each row
execute procedure trigger_set_timestamp();