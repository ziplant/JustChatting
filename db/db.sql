create database JustChatting character set utf8 collate utf8_general_ci;

use JustChatting;

create table `User` (
	user_id int auto_increment primary key,
	username varchar(30) unique not null,
	password varchar(64) not null,
	portrait_filename varchar(255)
);

create table `Group` (
	group_id int auto_increment primary key,
	title varchar(100) unique not null,
	description varchar(255) not null,
	password varchar(64),
	logo_filename varchar(255),
	date_created datetime not null,
	owner_id int not null,
	foreign key (owner_id) references `User`(user_id) on delete cascade on update cascade
);

create table `Message` (
	message_id int auto_increment primary key,
	user_id int not null,
	group_id int not null,
	message_text varchar(1000) not null,
	date_of_writing datetime not null,
	foreign key (user_id) references `User`(user_id) on delete cascade on update cascade,
	foreign key (group_id) references `Group`(group_id) on delete cascade on update cascade
);
