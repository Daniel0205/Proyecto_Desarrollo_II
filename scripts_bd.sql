DROP TABLE IF EXISTS client CASCADE;
CREATE TABLE client(
   username         TEXT PRIMARY KEY,
   first_name       TEXT NOT NULL,
   last_name      TEXT NOT NULL,
   date_birth	    DATE NOT NULL,
   type_id          CHAR(2),
   id	          BIGINT NOT NULL,
   password	    TEXT NOT NULL,
   phone_number  	    BIGINT NOT NULL,
   address	    TEXT NOT NULL,
   email 	    TEXT NOT NULL,	
   credit_card_number   BIGINT,
   state 	    BOOLEAN NOT NULL,	
   CHECK (type_id IN ('CC', 'TI','RC','TP'))
);

DROP TABLE IF EXISTS admin CASCADE;
CREATE TABLE admin(
   id	        CHAR(9) PRIMARY KEY,	
   password	    TEXT NOT NULL,
   username	    TEXT NOT NULL
);

DROP TABLE IF EXISTS message CASCADE;
CREATE TABLE message(
   username         TEXT REFERENCES client(username),
   description	    TEXT NOT NULL,	
   solved	    boolean NOT NULL
);

DROP TABLE IF EXISTS category CASCADE;
CREATE TABLE category(
   name_category	CHAR(15) PRIMARY KEY,
   description	    TEXT NOT NULL
);

DROP TABLE IF EXISTS subcategory CASCADE;
CREATE TABLE subcategory(
   name_subcategory	CHAR(15) PRIMARY KEY,
   name_category	CHAR(15),
   description	    TEXT NOT NULL,
CONSTRAINT fk_category FOREIGN KEY (name_category) REFERENCES category (name_category) ON DELETE CASCADE
);

DROP TABLE IF EXISTS book CASCADE;
CREATE TABLE book(
   ISBN         	BIGINT PRIMARY KEY,
   name_subcategory	TEXT REFERENCES subcategory(name_subcategory),	
   publication_year	TEXT NOT NULL,
   synopsis 		TEXT NOT NULL,
   title		TEXT NOT NULL,
   author		TEXT NOT NULL,	
   number_of_pages 		INT NOT NULL,
   price		BIGINT NOT NULL,   
   editorial 		TEXT NOT NULL,
   edition		TEXT NOT NULL,
   lang		TEXT NOT NULL,	
   cover_type 		CHAR(1) NOT NULL,
   recommended_age		TEXT NOT NULL
   CHECK (cover_type IN ('G', 'B'))
);

DROP TABLE IF EXISTS critics CASCADE;
CREATE TABLE critics(
   username         TEXT REFERENCES client(username),
   ISBN		    BIGINT REFERENCES book(ISBN),
   comment	    TEXT NOT NULL,
   score 		INT NOT NULL
);

DROP TABLE IF EXISTS bill CASCADE;
CREATE TABLE bill(
   id_bill          BIGINT PRIMARY KEY,
   username		    TEXT REFERENCES client(username),
   date		    DATE NOT NULL
);

DROP TABLE IF EXISTS bill_book CASCADE;
CREATE TABLE bill_book(
   id_bill      BIGINT REFERENCES bill(id_bill),
   ISBN		    BIGINT REFERENCES book(ISBN),
   quantity	    INT NOT NULL
);

DROP TABLE IF EXISTS distribution_point CASCADE;
CREATE TABLE distribution_point(
   id_dp          SERIAL PRIMARY KEY,
   name_dp		  TEXT NOT NULL,
   address        TEXT NOT NULL,
   telephone 	  INT NOT NULL
);

DROP TABLE IF EXISTS inventario CASCADE;
CREATE TABLE inventario(
   id_dp        INT REFERENCES distribution_point(id_dp),
   ISBN		    BIGINT REFERENCES book(ISBN),
   availability	    INT NOT NULL
);

INSERT INTO category VALUES ('DRAMA','CUALQUIERA PARCE');
INSERT INTO subcategory VALUES ('JUVENIL','DRAMA', 'CUALQUIERA PARCE');


INSERT INTO public.client(
	username, first_name, last_name, date_birth, type_id, id, password, phone_number, address, email, credit_card_number, state)
	VALUES 
	 ('dan', 'Darren', 'Haan', '2000-06-23', 'CC', 116554391, '1234', 3146884001, 'Cl 5 5N-45', 'dar.han@gmail.com' , 333, true), 
	 ('helat', 'Helaine', 'Trussell', '2001-04-20', 'CC', 1757886571, '1234', 3006884001, 'Cra 66 5-44', 'helat@gmail.com' , 332, true), 
	 ('jonpe', 'Jonah', 'Petti', '1998-01-20', 'CC', 2757886001, '1234', 5006667001, 'Avn 6n 8-144', 'jonah-p@gmail.com' , 331, true),
	 ('josette', 'Josette', 'Drouin', '1990-12-22', 'CC', 7757000001, '1234', 7006667099, 'Cll 66 7-14', 'josette_D@gmail.com' , 330, true),
	 ('clehar', 'Clement ', 'Harrelson', '1995-11-22', 'CC', 4447000001, '1234', 5009967092, 'Cra 56 7-184', 'clehar@gmail.com' , 329, true);
	
