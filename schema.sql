create table users (

    id serial primary key,
    email varchar(500),
    username varchar(200),
    password varchar(500)
);

create table books (

    id serial primary key,
    title varchar(500),
    author varchar(400),
    genre varchar(100)
);

create table owned (
    id serial primary key,
    user_id integer references users(id),
    book_id integer references books(id)
);
