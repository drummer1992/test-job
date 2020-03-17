create table todousers (
  id serial not null primary key,
  login text not null unique,
  hash text null,
  salt text null,
  isadmin boolean not null default false,
  token text null
);


create table todoitems (
  id serial not null primary key,
  userid integer not null,
  subject text not null,
  note text not null,
  foreign key (userid) references todousers (id)
);
