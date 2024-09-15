DROP TABLE NEWSTOMEDIA;-----------------------

DROP TABLE DISCUSSIONABOUTMEDIA;-----------------------

DROP TABLE REVIEWABOUTPRODUCT;-----------------------

DROP TABLE REVIEWABOUTMEDIA;-----------------------

DROP TABLE USERGIVEREVIEW;-----------------------

DROP TABLE REVIEWRATING;-----------------------

DROP TABLE PRODUCTBASEDONMEDIA;-----------------------

DROP TABLE USERORDERSPRODUCT;-----------------------

DROP TABLE MERCHPRODUCEPROD;-----------------------

DROP TABLE COLLABoRATE;-----------------------

DROP TABLE COMPANYGIVENEWS;-----------------------

DROP TABLE COMPANYHASMEDIA;-----------------------

DROP TABLE MEDIAHASROLE;-----------------------

DROP TABLE USERSTARTDISCUSSION;-----------------------

DROP TABLE USERWATCHANDFAVORITE;-----------------------

DROP TABLE PREFERREDGENRE;-----------------------

DROP TABLE PREFERENCEFORROLE;-----------------------

DROP TABLE PREFERENCEFORMEDIA;-----------------------

DROP TABLE ROLE;-----------------------

DROP TABLE NEWSANDUPDATES;-----------------------

DROP TABLE PRODUCTS;-----------------------

DROP TABLE LOGIN;-----------------------

DROP TABLE DISCUSSION;-----------------------

DROP TABLE COMPANY;-----------------------

DROP TABLE MERCHANDISER;-----------------------

DROP TABLE MEDIA;-----------------------

DROP TABLE ADMIN; -----------------------

DROP TABLE USERS;-----------------------


CREATE TABLE USERS(
    USER_ID INT NOT NULL,
    USER_NAME VARCHAR2(255),
    NAME VARCHAR2(255),
    DOB DATE,
    EMAIL VARCHAR2(255),
    CITY VARCHAR2(255),
    STREET VARCHAR2(255),
    HOUSE VARCHAR2(255),
    PHONE VARCHAR2(255),
    PRIMARY KEY(USER_ID)
);

CREATE TABLE ADMIN(
    ADMIN_ID INT NOT NULL,
    USER_NAME VARCHAR2(255),
    NAME VARCHAR2(255),
    DOB DATE,
    -- AGE GENERATED ALWAYS AS (EXTRACT(YEAR FROM SYSDATE) - EXTRACT(YEAR FROM DOB)) VIRTUAL,
    EMAIL VARCHAR2(255),
    CITY VARCHAR2(255),
    STREET VARCHAR2(255),
    HOUSE VARCHAR2(255),
    PHONE VARCHAR2(255),
    PRIMARY KEY(ADMIN_ID)
);

CREATE TABLE MERCHANDISER(
    MER_ID INT NOT NULL,
    USER_NAME VARCHAR2(255),
    NAME VARCHAR2(255),
    DESCRIPTION VARCHAR2(4000),
    EMAIL VARCHAR2(255),
    CITY VARCHAR2(255),
    STREET VARCHAR2(255),
    HOUSE VARCHAR2(255),
    PHONE VARCHAR2(255),
    PRIMARY KEY(MER_ID)
);

CREATE TABLE COMPANY(
    COM_ID INT NOT NULL,
    USER_NAME VARCHAR2(255),
    NAME VARCHAR2(255),
    IMG VARCHAR2(255),
    DESCRIPTION VARCHAR2(4000),
    EMAIL VARCHAR2(255),
    PRIMARY KEY(COM_ID)
);

CREATE TABLE MEDIA (
    MEDIA_ID INT NOT NULL,
    TITLE VARCHAR2(255),
    DESCRIPTION VARCHAR2(4000),
    RATING INT,
    RATING_COUNT INT,
    TYPE VARCHAR2(50),
    GENRE VARCHAR2(1000),
    TRAILER VARCHAR2(255),
    POSTER VARCHAR2(255),
    DURATION VARCHAR2(50),
    RELEASE_DATE DATE,
    EPISODE INT,
    CONSTRAINT MEDIA_PK PRIMARY KEY (MEDIA_ID),
    CONSTRAINT TYPE_CHECK CHECK (TYPE IN ('MOVIE', 'TV_SHOW', 'DOCUMENTARY', 'ANIME'))
);

CREATE TABLE DISCUSSION(
    DIS_ID INT NOT NULL,
    DESCRIPTION VARCHAR2(4000),
    TOPIC VARCHAR2(4000),
    REPLY_COUNT INT,
    PARENT_TOPIC INT,
    PRIMARY KEY(DIS_ID)
);

CREATE TABLE LOGIN (
    LOGIN_ID INT NOT NULL,
    PASSWORD VARCHAR2(255),
    ROLE VARCHAR2(50),
    ID INT,
    PRIMARY KEY(LOGIN_ID),
    CONSTRAINT ROLE_CHECK CHECK (ROLE IN ('ADMIN', 'USER', 'MERCHANDISER', 'COMPANY'))
);

CREATE TABLE PRODUCTS(
    PRO_ID INT NOT NULL,
    NAME VARCHAR2(255),
    DESCRIPTION VARCHAR2(4000),
    IMAGE VARCHAR2(255),
    RATING_COUNT INT,
    RATING INT,
    PRICE INT,
    QUANTITY INT,
    PRIMARY KEY(PRO_ID)
);

CREATE TABLE NEWSANDUPDATES(
    NEWS_ID INT NOT NULL,
    DESCRIPTION VARCHAR2(4000),
    HEADLINE VARCHAR2(4000),
    PRIMARY KEY(NEWS_ID)
);

CREATE TABLE ROLE(
    ROLE_ID INT NOT NULL,
    NAME VARCHAR2(255),
    IMG VARCHAR2(4000),
    ROLE_TYPE VARCHAR2(255),
    PRIMARY KEY (ROLE_ID),
    CONSTRAINT ROLE_TYPE_CHECK CHECK (ROLE_TYPE IN ('DIRECTOR', 'PRODUCER', 'WRITER', 'ACTOR', 'ACTRESS'))
);

CREATE TABLE PREFERREDGENRE(
    USER_ID INT NOT NULL,
    GENRES VARCHAR2(1000)
);

CREATE TABLE PREFERENCEFORMEDIA(
    USER_ID INT NOT NULL,
    MEDIA_ID INT NOT NULL,
    CONSTRAINT PREFERENCEFORMEDIA_AK_1 UNIQUE(MEDIA_ID)
);

CREATE TABLE PREFERENCEFORROLE(
    USER_ID INT NOT NULL,
    ROLE_ID INT NOT NULL
);

CREATE TABLE USERWATCHANDFAVORITE (
    USER_ID INT NOT NULL,
    MEDIA_ID INT NOT NULL,
    FAVORITE CHAR(1) CHECK (FAVORITE IN ('Y', 'N')),
    STATUS VARCHAR2(50),
    CONSTRAINT USERWATCHANDFAVORITE_AK_1 UNIQUE (USER_ID, MEDIA_ID),
    CONSTRAINT STATUS_CHECK CHECK (STATUS IN ('WATCHED', 'PLAN_TO_WATCH'))
);

CREATE TABLE USERSTARTDISCUSSION(
    DIS_ID INT NOT NULL,
    USER_ID INT NOT NULL
);

CREATE TABLE MEDIAHASROLE(
    ROLE_ID INT NOT NULL,
    MEDIA_ID INT NOT NULL
);

CREATE TABLE COMPANYHASMEDIA(
    MEDIA_ID INT NOT NULL,
    COM_ID INT NOT NULL
);

CREATE TABLE COMPANYGIVENEWS (
    NEWS_ID INT NOT NULL,
    COM_ID INT NOT NULL,
    NEWS_DATE DATE,
    PRIMARY KEY (NEWS_ID, COM_ID)
);

CREATE TABLE COLLABORATE (
    PRO_ID INT NOT NULL,
    COM_ID INT NOT NULL,
    MER_ID INT NOT NULL,
    DESCRIPTION VARCHAR2(4000),
    C_STATUS VARCHAR2(50),
    CONSTRAINT COLLABORATE_AK_1 UNIQUE (PRO_ID, COM_ID, MER_ID),
    CONSTRAINT C_STATUS_CHECK CHECK (C_STATUS IN ('ACCEPTED', 'WAITING','REJECTED'))
);

CREATE TABLE MERCHPRODUCEPROD(
    PRO_ID INT NOT NULL,
    MER_ID INT NOT NULL
);

CREATE TABLE USERORDERSPRODUCT (
    USER_ID INT NOT NULL,
    PRO_ID INT NOT NULL,
    DELIVERY_STATUS VARCHAR2(50),
    ORDER_DATE DATE,
    ORDER_TIME VARCHAR2(50),
    ORDER_QUANTITY INT,
    CONSTRAINT DELIVERY_STATUS_CHECK CHECK (DELIVERY_STATUS IN ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'))
);

CREATE TABLE PRODUCTBASEDONMEDIA(
    PRO_ID INT NOT NULL,
    MEDIA_ID INT NOT NULL
);

CREATE TABLE REVIEWRATING (
    R_ID INT NOT NULL,
    DESCRIPTION VARCHAR2(4000),
    RATING INT,
    REVIEW_FOR VARCHAR2(50),
    REVIEW_DATE DATE,
    PRIMARY KEY (R_ID),
    CONSTRAINT REVIEW_FOR_CHECK CHECK (REVIEW_FOR IN ('PRODUCT', 'MEDIA'))
);

CREATE TABLE USERGIVEREVIEW(
    USER_ID INT NOT NULL,
    R_ID INT NOT NULL
);

CREATE TABLE REVIEWABOUTMEDIA(
    R_ID INT NOT NULL,
    MEDIA_ID INT NOT NULL
);

CREATE TABLE REVIEWABOUTPRODUCT(
    R_ID INT NOT NULL,
    PRO_ID INT NOT NULL
);

CREATE TABLE DISCUSSIONABOUTMEDIA (
    DIS_ID INT NOT NULL,
    MEDIA_ID INT NOT NULL,
    DIS_DATE DATE
);

CREATE TABLE NEWSTOMEDIA (
    MEDIA_ID INT NOT NULL,
    NEWS_ID INT NOT NULL,
    NEWS_DATE DATE
);


ALTER TABLE PREFERENCEFORMEDIA ADD CONSTRAINT FK_MEDIA_ID_PREFERENCEFORMEDIA FOREIGN KEY (MEDIA_ID) REFERENCES MEDIA (MEDIA_ID);

ALTER TABLE PREFERENCEFORMEDIA ADD CONSTRAINT FK_USER_ID_PREFERENCEFORMEDIA FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID);

ALTER TABLE PREFERENCEFORROLE ADD CONSTRAINT FK_USER_ID_PREFERENCEFORROLE FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID);

ALTER TABLE USERWATCHANDFAVORITE ADD CONSTRAINT FK_USER_ID_USERWATCHANDFAVORITE FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID);

ALTER TABLE USERWATCHANDFAVORITE ADD CONSTRAINT FK_MEDIA_ID_USERWATCHANDFAVORITE FOREIGN KEY (MEDIA_ID) REFERENCES MEDIA (MEDIA_ID);

ALTER TABLE USERSTARTDISCUSSION ADD CONSTRAINT FK_DIS_ID_USERSTARTDISCUSSION FOREIGN KEY (DIS_ID) REFERENCES DISCUSSION (DIS_ID);

ALTER TABLE USERSTARTDISCUSSION ADD CONSTRAINT FK_USER_ID_USERSTARTDISCUSSION FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID);

ALTER TABLE PREFERENCEFORROLE ADD CONSTRAINT FK_ROLE_ID_PREFERENCEFORROLE FOREIGN KEY (ROLE_ID) REFERENCES ROLE (ROLE_ID);

ALTER TABLE MEDIAHASROLE ADD CONSTRAINT FK_MEDIA_ID_MEDIAHASROLE FOREIGN KEY (MEDIA_ID) REFERENCES MEDIA (MEDIA_ID);

ALTER TABLE MEDIAHASROLE ADD CONSTRAINT FK_ROLE_ID_MEDIAHASROLE FOREIGN KEY (ROLE_ID) REFERENCES ROLE (ROLE_ID);

ALTER TABLE COMPANYHASMEDIA ADD CONSTRAINT FK_COM_ID_COMPANYHASMEDIA FOREIGN KEY (COM_ID) REFERENCES COMPANY (COM_ID);

ALTER TABLE COMPANYHASMEDIA ADD CONSTRAINT FK_MEDIA_ID_COMPANYHASMEDIA FOREIGN KEY (MEDIA_ID) REFERENCES MEDIA (MEDIA_ID);

ALTER TABLE COMPANYGIVENEWS ADD CONSTRAINT FK_COM_ID_COMPANYGIVENEWS FOREIGN KEY (COM_ID) REFERENCES COMPANY (COM_ID);

ALTER TABLE COMPANYGIVENEWS ADD CONSTRAINT FK_NEWS_ID_COMPANYGIVENEWS FOREIGN KEY (NEWS_ID) REFERENCES NEWSANDUPDATES (NEWS_ID);

ALTER TABLE COLLABORATE ADD CONSTRAINT FK_PRO_ID_COLLABORATE FOREIGN KEY (PRO_ID) REFERENCES PRODUCTS (PRO_ID);

ALTER TABLE COLLABORATE ADD CONSTRAINT FK_COM_ID_COLLABORATE FOREIGN KEY (COM_ID) REFERENCES COMPANY (COM_ID);

ALTER TABLE COLLABORATE ADD CONSTRAINT FK_MER_ID_COLLABORATE FOREIGN KEY (MER_ID) REFERENCES MERCHANDISER (MER_ID);

ALTER TABLE MERCHPRODUCEPROD ADD CONSTRAINT FK_MER_ID_MERCHPRODUCEPROD FOREIGN KEY (MER_ID) REFERENCES MERCHANDISER (MER_ID);

ALTER TABLE MERCHPRODUCEPROD ADD CONSTRAINT FK_PRO_ID_MERCHPRODUCEPROD FOREIGN KEY (PRO_ID) REFERENCES PRODUCTS (PRO_ID);

ALTER TABLE USERORDERSPRODUCT ADD CONSTRAINT FK_USER_ID_USERORDERSPRODUCT FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID);

ALTER TABLE USERORDERSPRODUCT ADD CONSTRAINT FK_PRO_ID_USERORDERSPRODUCT FOREIGN KEY (PRO_ID) REFERENCES PRODUCTS (PRO_ID);

ALTER TABLE PRODUCTBASEDONMEDIA ADD CONSTRAINT FK_PRO_ID_PRODUCTBASEDONMEDIA FOREIGN KEY (PRO_ID) REFERENCES PRODUCTS (PRO_ID);

ALTER TABLE PRODUCTBASEDONMEDIA ADD CONSTRAINT FK_MEDIA_ID_PRODUCTBASEDONMEDIA FOREIGN KEY (MEDIA_ID) REFERENCES MEDIA (MEDIA_ID);

ALTER TABLE USERGIVEREVIEW ADD CONSTRAINT FK_USER_ID_USERGIVEREVIEW FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID);

ALTER TABLE USERGIVEREVIEW ADD CONSTRAINT FK_R_ID_USERGIVEREVIEW FOREIGN KEY (R_ID) REFERENCES REVIEWRATING (R_ID);

ALTER TABLE REVIEWABOUTPRODUCT ADD CONSTRAINT FK_R_ID_REVIEWABOUTPRODUCT FOREIGN KEY (R_ID) REFERENCES REVIEWRATING (R_ID);

ALTER TABLE REVIEWABOUTMEDIA ADD CONSTRAINT FK_R_ID_REVIEWABOUTMEDIA FOREIGN KEY (R_ID) REFERENCES REVIEWRATING (R_ID);

ALTER TABLE REVIEWABOUTPRODUCT ADD CONSTRAINT FK_PRO_ID_REVIEWABOUTPRODUCT FOREIGN KEY (PRO_ID) REFERENCES PRODUCTS (PRO_ID);

ALTER TABLE REVIEWABOUTMEDIA ADD CONSTRAINT FK_MEDIA_ID_REVIEWABOUTMEDIA FOREIGN KEY (MEDIA_ID) REFERENCES MEDIA (MEDIA_ID);

ALTER TABLE DISCUSSIONABOUTMEDIA ADD CONSTRAINT FK_DIS_ID_DISCUSSIONABOUTMEDIA FOREIGN KEY (DIS_ID) REFERENCES DISCUSSION (DIS_ID);

ALTER TABLE DISCUSSIONABOUTMEDIA ADD CONSTRAINT FK_MEDIA_ID_DISCUSSIONABOUTMEDIA FOREIGN KEY (MEDIA_ID) REFERENCES MEDIA (MEDIA_ID);

ALTER TABLE NEWSTOMEDIA ADD CONSTRAINT FK_NEWS_ID_NEWSTOMEDIA FOREIGN KEY (NEWS_ID) REFERENCES NEWSANDUPDATES (NEWS_ID);

ALTER TABLE NEWSTOMEDIA ADD CONSTRAINT FK_MEDIA_ID_NEWSTOMEDIA FOREIGN KEY (MEDIA_ID) REFERENCES MEDIA (MEDIA_ID);




















INSERT INTO USERS (USER_ID, USER_NAME, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE) 
            VALUES (1234, 'Siifu', 'Sifat Bin Asad', TO_DATE('01/01/1999', 'MM/DD/YYYY'), 'meow@gmail.com', 'Dhaka', 'Dhanmondi', '12', '01700000000');

INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
            VALUES (1234, '1234', 'USER', 1234);

INSERT INTO PREFERREDGENRE (USER_ID, GENRES)
            VALUES (1234, 'ACTION,SCI-FI,COMEDY,HORROR');



INSERT INTO ADMIN (ADMIN_ID, USER_NAME, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE) 
            VALUES (1248, 'admin', 'Sifat Bin Asad', TO_DATE('01/01/1999', 'MM/DD/YYYY'), 'meow@gmail.com', 'Dhaka', 'Dhanmondi', '12', '01700000000');

INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
            VALUES (1258, '1234', 'ADMIN', 1248);
            


INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
            VALUES (1226, '1234', 'COMPANY', 1);


--MERCHANDISERs--------------------------------------------------------------------------------------------------------------------------------

INSERT INTO MERCHANDISER (MER_ID,USER_NAME, NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE)
            VALUES (1235, 'mer2', 'SIFAT', 'We sell merch', 'chikachika@gmail.com', 'Dhaka', 'Dhanmondi', '12', '01700000000');

INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
            VALUES (1235, '1234', 'MERCHANDISER', 1235);

INSERT INTO MERCHANDISER (MER_ID,USER_NAME, NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE)
            VALUES (1236, 'mer3', 'SIFAT', 'We sell merch', 'chikachika@gmail.com', 'Dhaka', 'Dhanmondi', '12', '01700000000');

INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
            VALUES (1236, '1234', 'MERCHANDISER', 1236);

INSERT INTO MERCHANDISER (MER_ID,USER_NAME, NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE)
            VALUES (1237, 'mer4', 'SIFAT', 'We sell merch', 'chikachika@gmail.com', 'Dhaka', 'Dhanmondi', '12', '01700000000');

INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
            VALUES (1237, '1234', 'MERCHANDISER', 1237);

INSERT INTO MERCHANDISER (MER_ID,USER_NAME, NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE)
            VALUES (1238, 'mer5', 'SIFAT', 'We sell merch', 'chikachika@gmail.com', 'Dhaka', 'Dhanmondi', '12', '01700000000');

INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
            VALUES (1238, '1234', 'MERCHANDISER', 1238);

INSERT INTO MERCHANDISER (MER_ID,USER_NAME, NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE)
            VALUES (1239, 'mer6', 'SIFAT', 'We sell merch', 'chikachika@gmail.com', 'Dhaka', 'Dhanmondi', '12', '01700000000');

INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
            VALUES (1239, '1234', 'MERCHANDISER', 1239);

INSERT INTO MERCHANDISER (MER_ID,USER_NAME, NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE)
            VALUES (1240, 'mer1', 'SIFAT', 'We sell merch', 'chikachika@gmail.com', 'Dhaka', 'Dhanmondi', '12', '01700000000');

INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
            VALUES (1240, '1234', 'MERCHANDISER', 1240);

 

























------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- MEDIA DATA
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    1,
    'The Avengers',
    'Earth''s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
    8,
    10,
    'MOVIE',
    'ACTION, SCI-FI',
    'https://youtu.be/eOrNdBpGMv8?si=Tp27b8QNmWcnex6p',
    'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    '2h 23m',
    TO_DATE('05/04/2012', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    2,
    'Avengers: Infinity War',
    'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    8,
    10,
    'MOVIE',
    'ACTION, ADVENTURE, SCI-FI',
    'https://youtu.be/6ZfuNTqbHE8?si=zKfQwyjw9ryFeygb',
    'https://m.media-amazon.com/images/I/71d8Iw9uVCL._AC_UF894,1000_QL80_.jpg',
    '2h 29m',
    TO_DATE('04/27/2018', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    3,
    'Avengers: Endgame',
    'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos'' actions and restore balance to the universe.',
    8,
    10,
    'MOVIE',
    'ACTION, ADVENTURE, DRAMA',
    'https://youtu.be/TcMBFSGVi1c?si=W6KzacCFkdZR4_q-',
    'https://wallpapers.com/images/hd/avengers-endgame-iphone-3ou9gbq83nsfw8c9.jpg',
    '3h 1m',
    TO_DATE('04/26/2019', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    4,
    'Thor: Ragnarok',
    'Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.',
    8,
    10,
    'MOVIE',
    'ACTION, ADVENTURE, DRAMA',
    'https://youtu.be/ue80QwXMRHg?si=GFREUdqQ1xVb-e03',
    'https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_.jpg',
    '2h 10m',
    TO_DATE('11/03/2017', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    5,
    'Doctor Strange',
    'While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.',
    7,
    10,
    'MOVIE',
    'ACTION, ADVENTURE, FANTASY',
    'https://youtu.be/aWzlQ2N6qqg?si=3FGgMK0-_Lrb6UYh',
    'https://c7.alamy.com/comp/PMBTYY/doctor-strange-2016-poster-PMBTYY.jpg',
    '1h 55m',
    TO_DATE('11/04/2016', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    6,
    'Interstellar',
    'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    9,
    10,
    'MOVIE',
    'ADVENTURE, DRAMA, SCI-FI',
    'https://youtu.be/zSWdZVtXT7E?si=uMdKxv36T26fVZEU',
    'https://m.media-amazon.com/images/I/91vIHsL-zjL._AC_SY879_.jpg',
    '2h 49m',
    TO_DATE('11/07/2014', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    7,
    'Inception',
    'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    9,
    10,
    'MOVIE',
    'ACTION, ADVENTURE, SCI-FI',
    'https://youtu.be/YoHD9XEInc0?si=B7hUAbokf8pyeHOt',
    'https://image.tmdb.org/t/p/original/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    '2h 28m',
    TO_DATE('07/16/2010', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    8,
    'Inside Out',
    'After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.',
    8,
    10,
    'MOVIE',
    'ADVENTURE, COMEDY',
    'https://youtu.be/yRUAzGQ3nSY?si=eaw9sjCpe_eIEcme',
    'https://m.media-amazon.com/images/I/41MhGPg-N7L._AC_.jpg',
    '1h 35m',
    TO_DATE('06/19/2015', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    9,
    'Mad Max: Fury Road',
    'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshipper and a drifter named Max.',
    8,
    10,
    'MOVIE',
    'ACTION, ADVENTURE, SCI-FI',
    'https://youtu.be/hEJnMQG9ev8?si=tWLU_QpmTDX6239r',
    'https://d27csu38upkiqd.cloudfront.net/eyJidWNrZXQiOiJmZGMtc2l0ZXB1YmxpYy1tZWRpYS1wcm9kIiwia2V5IjoidXBsb2Fkc1wvMjAyNFwvMDVcLzE3MDg0MS1zY2FsZWQuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxNjAwLCJmaXQiOiJjb3ZlciJ9fX0=',
    '2h',
    TO_DATE('05/15/2015', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    10,
    'Fantastic Beasts: The Secrets of Dumbledore',
    'Albus Dumbledore knows that Gellert Grindelwald is moving to take control of the wizarding world. Unable to stop him alone, he asks Newt Scamander to lead an intrepid team on a dangerous mission.',
    6,
    10,
    'MOVIE',
    'ADVENTURE, FANTASY',
    'https://youtu.be/Y9dr2zw-TXQ?si=LWaEbXn9GF8C9Iw0',
    'https://m.media-amazon.com/images/M/MV5BZGQ1NjQyNDMtNzFlZS00ZGIzLTliMWUtNGJkMGMzNTBjNDg0XkEyXkFqcGdeQXVyMTE1NDI5MDQx._V1_.jpg',
    '2h 22m',
    TO_DATE('04/15/2022', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    41,
    'Ittefaq',
    'A police officer, is investigating a double murder case that has only two witnesses, who are also the prime suspects. The suspects - Vikram, an acclaimed writer, and Maya, a young homemaker, have different narratives about the events of that fateful night.',
    7,
    10,
    'MOVIE',
    'MYSTERY',
    'https://www.youtube.com/watch?v=QiQAW4ylha4',
    'https://stat5.bollywoodhungama.in/wp-content/uploads/2017/11/Ittefaq-19.jpg',
    '1h 45m',
    TO_DATE('11/03/2017', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    42,
    'Badla',
    'Naina Sethi a successful entrepreneur finds herself locked in a hotel room.When she gains conscious she finds herself lying to corpse of her lover Arjun she is arrested for the murder.But left on bail her lawyer Jimmy hires a defense lawyer Badal Gupta who hasn''t lost a case since last 40 years.Badal and Naina discuss about the events that happened during that day.But Badal feels that there are lot many loopholes in Naina''s story',
    8,
    10,
    'MOVIE',
    'MYSTERY',
    'https://www.youtube.com/watch?v=xHWQiok-ei0',
    'https://m.media-amazon.com/images/M/MV5BYjZiMzIzYTctNDViZi00OWNmLWFmN2YtMmI2OWJiZWViMmY3XkEyXkFqcGdeQXVyNTYwMzA0MTM@._V1_.jpg',
    '1h 58m',
    TO_DATE('03/08/2019', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    43,
    'Chehre',
    'CHEHRE is the story of a man who faces a tough time when faced with retired law professionals. Sameer Mehra (Emraan Hashmi) is the chief of an ad agency called Paradoy. He goes to a hill station somewhere in the North for an ad shoot. But due to a work commitment in Delhi, he leaves from the hill town despite heavy snow. On the way, he takes a short cut to Delhi but due to a tree fall, he gets stuck. On top of it, his car suddenly breaks down. He then meets Paramjeet Singh Bhullar (Annu Kapoor) who advises him to join him to a friend’s place till it’s safe to go.',
    7,
    10,
    'MOVIE',
    'MYSTERY',
    'https://www.youtube.com/watch?v=W4WTPps4zM8',
    'https://m.media-amazon.com/images/M/MV5BNGFlOTVkMmMtOWE1OC00Y2Q1LThmNTctM2IxMWVkY2EyYjBlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
    '2h 19m',
    TO_DATE('08/27/2021', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    44,
    'Raat Akeli Hai ',
    'An aged and rich politician is found dead on his wedding night with a very young girl. A local cop is assigned the task to investigate the crime. As all circumstantial evidence points towards the young bride, our cop is hell bent on opening the Pandora''s box and digs in to an old unresolved case putting him at risk.',
    8,
    10,
    'MOVIE',
    'MYSTERY',
    'https://www.youtube.com/watch?v=uc78PxSxXMg',
    'https://upload.wikimedia.org/wikipedia/en/c/cd/Raat_Akeli_Hai_film_poster.jpg',
    '2h 29m',
    TO_DATE('07/31/2020', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    45,
    'Talaash',
    'Seeing reflections of Mumbai under the red light, Talaash is a tale of love lost, fatal attraction and above all the quest to solve a perfect crime. Suspense at its core, Talaash explores Mumbai''s underbelly like never before. Aamir Khan plays an investigation officer, Inspector Shekhawat who receives a phone call early in the morning informing him about death and an accident and how everything starts to unfold from there. The case turns into a life altering chase for Inspector Shekhawat when he is forced to reel under the repercussions of a broken married life with his wife Roshni played by Rani Mukherji and come face to face with his suppressed grief. Being on his investigational quest and fighting it out with personal struggle, Inspector Shekhawat meets a sex worker Rosie played by Kareena Kapoor who further adds shades of mystery to the puzzle. What looks like a simple car accident investigation turns into a haunting mystery as further investigations show many anomalies stringed to the death of the victim.',
    8,
    10,
    'MOVIE',
    'MYSTERY',
    'https://www.youtube.com/watch?v=M97P3zoUIos',
    'https://stat4.bollywoodhungama.in/wp-content/uploads/2016/03/Talaash-1.jpg',
    '2h 20m',
    TO_DATE('11/30/2012', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    46,
    'The Silence of the Lambs',
    'F.B.I. trainee Clarice Starling (Jodie Foster) works hard to advance her career, while trying to hide or put behind her West Virginia roots, of which if some knew, would automatically classify her as being backward or white trash. After graduation, she aspires to work in the agency''s Behavioral Science Unit under the leadership of Jack Crawford (Scott Glenn). While she is still a trainee, Crawford asks her to question Dr. Hannibal Lecter (Sir Anthony Hopkins), a psychiatrist imprisoned, thus far, for eight years in maximum security isolation for being a serial killer who cannibalized his victims. Clarice is able to figure out the assignment is to pick Lecter''s brains to help them solve another serial murder case, that of someone coined by the media as "Buffalo Bill" (Ted Levine), who has so far killed five victims, all located in the eastern U.S., all young women, who are slightly overweight (especially around the hips), all who were drowned in natural bodies of water, and all who were stripped of large swaths of skin. She also figures that Crawford chose her, as a woman, to be able to trigger some emotional response from Lecter. After speaking to Lecter for the first time, she realizes that everything with him will be a psychological game, with her often having to read between the very cryptic lines he provides. She has to decide how much she will play along, as his request in return for talking to him is to expose herself emotionally to him. The case takes a more dire turn when a sixth victim is discovered, this one from who they are able to retrieve a key piece of evidence, if Lecter is being forthright as to its meaning. A potential seventh victim is high profile Catherine Martin (Brooke Smith), the daughter of Senator Ruth Martin (Diane Baker), which places greater scrutiny on the case as they search for a hopefully still alive Catherine. Who may factor into what happens is Dr. Frederick Chilton (Anthony Heald), the warden at the prison, an opportunist who sees the higher profile with Catherine, meaning a higher profile for himself if he can insert himself successfully into the proceedings.',
    9,
    10,
    'MOVIE',
    'PSYCHOLOGICAL',
    'https://www.youtube.com/watch?v=6iB21hsprAQ',
    'https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781839023675.jpg',
    '1h 58m',
    TO_DATE('02/14/1991', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    47,
    'Red Lights',
    'The skeptical psychologist Dr. Margaret Matheson and her assistant, physicist Tom Buckley, are specialists in disclosing fraudulent paranormal phenomena. When the famous psychic Simon Silver reappears to his public after many years of absence, Tom becomes singularly obsessed in determining whether Silver is a fraud or not.',
    7,
    10,
    'MOVIE',
    'PSYCHOLOGICAL',
    'https://www.youtube.com/watch?v=7fPOplL8KTI',
    'https://m.media-amazon.com/images/M/MV5BMTQzMjYwNTc2M15BMl5BanBnXkFtZTcwMTY0Mjc4Nw@@._V1_.jpg',
    '1h 54m',
    TO_DATE('03/22/2012', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    48,
    'Black Swan',
    'Nina (Portman) is a ballerina in a New York City ballet company whose life, like all those in her profession, is completely consumed with dance. She lives with her obsessive former ballerina mother Erica (Hershey) who exerts a suffocating control over her. When artistic director Thomas Leroy (Cassel) decides to replace prima ballerina Beth MacIntyre (Ryder) for the opening production of their new season, Swan Lake, Nina is his first choice. But Nina has competition: a new dancer, Lily (Kunis), who impresses Leroy as well. Swan Lake requires a dancer who can play both the White Swan with innocence and grace, and the Black Swan, who represents guile and sensuality. Nina fits the White Swan role perfectly but Lily is the personification of the Black Swan. As the two young dancers expand their rivalry into a twisted friendship, Nina begins to get more in touch with her dark side - a recklessness that threatens to destroy her.',
    8,
    10,
    'MOVIE',
    'PSYCHOLOGICAL',
    'https://www.youtube.com/watch?v=5jaI1XOB-bs',
    'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8236892_p_v8_ar.jpg',
    '1h 48m',
    TO_DATE('12/17/2010', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    49,
    'Hide and Seek',
    'After her mother commits suicide in the bathtub, Emily Callaway is taken to live upstate in new surroundings to forget her traumatic past. Psychologist David, her father, learns that his daughter has a new friend, the enigmatic, never to be seen, imaginary (or not?) Charlie. A deadly game of hide-and-seek ensues. Who is Charlie? And what is troubling David in his dreams?',
    6,
    10,
    'MOVIE',
    'PSYCHOLOGICAL',
    'https://www.youtube.com/watch?v=mgmjpk-mv2s',
    'https://m.media-amazon.com/images/I/61dP1MSEgcL._AC_UF1000,1000_QL80_.jpg',
    '1h 41m',
    TO_DATE('12/08/2005', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    50,
    'The Killing Room',
    'Four individuals sign up for a psychological research study only to discover that they are now subjects of a brutal, classified government program.',
    6,
    10,
    'MOVIE',
    'PSYCHOLOGICAL',
    'https://www.youtube.com/watch?v=VoqAszG5EYc',
    'https://m.media-amazon.com/images/M/MV5BOTBmYTk5ZmMtMjFhNS00Yzc4LWJiZTAtNjUxNzFmMjIwM2IwXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_.jpg',
    '1h 33m',
    TO_DATE('11/14/2009', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    51,
    'Titanic',
    '84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.',
    8,
    10,
    'MOVIE',
    'ROMANCE',
    'https://www.youtube.com/watch?v=LuPB43YSgCs',
    'https://c8.alamy.com/comp/PXNB80/titanic-original-movie-poster-PXNB80.jpg',
    '3h 14m',
    TO_DATE('12/19/1997', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    52,
    'Pretty Woman',
    'Replete with extreme wealth and suave good looks, Edward Lewis could seemingly have any woman he wants, a committed significant other needed on his arm at social events to further how he makes his money as a corporate raider, but since he focuses more on his corporate-raiding pursuits with his lawyer of 10 years and partner-in-crime Philip Stuckey than any woman, every significant other he''s had in his life has felt neglected and eventually left him, the fact of which he is just realizing. In Beverly Hills, still in need of a woman on his arm as he and Philip work toward taking over a company owned by the increasingly insolvent James Morse, he decides, from a chance encounter, to hire Hollywood Boulevard hooker Vivian Ward as his escort for the week. It makes sense: a professional who would be committed to the work without having any relationship issues after the week is done. Beyond their chance encounter, he also makes this decision because she surprises him about how unhookerish she is in certain respects. Vivian, relatively new to Los Angeles and the business, must still look and act the part, with Edward, beyond giving her money, leaving her largely to her own devices to do so. She finds a somewhat-unlikely Henry Higgins in Barney Thompson, manager of the Beverly Wilshire Hotel where Edward is staying. Barney draws that fine line of keeping the hotel''s upscale clients happy while maintaining the posh decorum of the upper class, which does not include people to the hotel looking for rooms with hourly rates. As Barney and his associates are able to transform Vivian into a Cinderella, the questions become whether Vivian can go back to her Hollywood Boulevard life and whether she does have her Prince Charming beyond this week in the form of Edward (or anyone else) who truly does see her as Cinderella as opposed to a Hollywood Boulevard streetwalker.',
    8,
    10,
    'MOVIE',
    'ROMANCE',
    'https://www.youtube.com/watch?v=jvd3TjJaf3c',
    'https://m.media-amazon.com/images/M/MV5BMTk1NjYzMTQ5NV5BMl5BanBnXkFtZTYwNDEyMDM5._V1_QL75_UX820_.jpg',
    '1h 59m',
    TO_DATE('03/23/1990', 'MM/DD/YYYY'),
    NULL
);


INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    55,
    'Love at First Sight',
    'When a 20 year old woman, named Hadley, misses her scheduled flight from JFK to London, on her rescheduled flight, she meets a British man, named Oliver, who happens to be in her row on the airplane. When Hadley and Oliver lose each other once they arrive at the airport in London, will fate bring them together or will they be torn apart forever?',
    7,
    10,
    'MOVIE',
    'ROMANCE',
    'https://www.youtube.com/watch?v=j0kro6SuwxM',
    'https://m.media-amazon.com/images/M/MV5BYmE0MWJhNDgtMTIwNy00YTE0LWIwMTQtY2QzZDRkZjI3OTNhXkEyXkFqcGdeQXVyMTQ4MDUxMTk1._V1_.jpg',
    '1h 31m',
    TO_DATE('09/15/2023', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    56,
    'Extinction',
    'A family man is plagued by dreams of loss, but his dreams turn out to be more prophetic than paranoid when the planet is attacked by an offworld invasion. As he fights to protect the people he loves, he discovers a hidden strength that can keep them safe from harm.',
    6,
    10,
    'MOVIE',
    'SCI-FI',
    'https://www.youtube.com/watch?v=bTvi7wcmyi4',
    'https://m.media-amazon.com/images/M/MV5BMTU5OTYzMzcwOF5BMl5BanBnXkFtZTgwNTkzMzk4NTM@._V1_QL75_UX190_CR0,0,190,281_.jpg',
    '1h 35m',
    TO_DATE('07/27/2018', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    57,
    'Spider-Man: Homecoming',
    'A young Peter Parker/Spider-Man begins to navigate his newfound identity as web-slinging superhero Spider-Man. Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark. Peter tries to fall back into his normal daily routine--distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man--but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened.',
    8,
    10,
    'MOVIE',
    'SCI-FI',
    'https://www.youtube.com/watch?v=rk-dF1lIbIg',
    'https://m.media-amazon.com/images/M/MV5BODY2MTAzOTQ4M15BMl5BanBnXkFtZTgwNzg5MTE0MjI@._V1_FMjpg_UX1000_.jpg',
    '2h 13m',
    TO_DATE('07/07/2017', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    58,
    'Total Recall',
    'The planet has been decimated by chemical war in the late 21st century, leaving only two nations -- the United Federation of Britain and the Colony. Douglas Quaid (Farrell) is a factory worker with a stable job and a loving wife (Beckinsale), but upon learning that a company named Rekall could grant him the memory of the ultimate espionage adventure, he decides to take a virtual vacation. But in the midst of having the new memories implanted, something goes haywire. He''s branded a spy, the authorities close in, and he quickly flees for his life. Later, Quaid discovers that his life and memories were implanted. He joins forces with rebel soldier Melina (Jessica Biel) on a mission to track down Matthias (Bill Nighy), the head of a resistance movement that''s been labeled a terrorist organization by the tyrannical Chancellor Cohaagen (Bryan Cranston). Cohaagen seeks to control the entire free world. The harder Quaid fights to defeat him, the clearer it becomes that his memory had been altered long before he walked into Rekall',
    7,
    10,
    'MOVIE',
    'SCI-FI',
    'https://www.youtube.com/watch?v=GljhR5rk5eY',
    'https://upload.wikimedia.org/wikipedia/en/a/a5/TotalRecall2012Poster.jpg',
    '1h 58m',
    TO_DATE('08/31/2012', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    59,
    'Avatar',
    'When his brother is killed in a robbery, paraplegic Marine Jake Sully decides to take his place in a mission on the distant world of Pandora. There he learns of greedy corporate figurehead Parker Selfridge''s intentions of driving off the native humanoid "Na''vi" in order to mine for the precious material scattered throughout their rich woodland. In exchange for the spinal surgery that will fix his legs, Jake gathers knowledge, of the Indigenous Race and their Culture, for the cooperating military unit spearheaded by gung-ho Colonel Quaritch, while simultaneously attempting to infiltrate the Na''vi people with the use of an "avatar" identity. While Jake begins to bond with the native tribe and quickly falls in love with the beautiful alien Neytiri, the restless Colonel moves forward with his ruthless extermination tactics, forcing the soldier to take a stand - and fight back in an epic battle for the fate of Pandora.',
    8,
    10,
    'MOVIE',
    'SCI-FI',
    'https://www.youtube.com/watch?v=5PSNL1qE6VY',
    'https://images.moviesanywhere.com/7fbdd5c310d10623af2d040a726c4447/850a4464-275c-458f-a26a-fa6fdd4ab18c.jpg',
    '2h 42m',
    TO_DATE('12/18/2009', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    60,
    'The 5th Wave',
    'Four waves of increasingly-deadly attacks have left most of Earth in ruins. Against a backdrop of fear and distrust, Cassie is on the run, desperately trying to save her younger brother. As she prepares for the inevitable and lethal fifth wave, Cassie teams up with a young man who may become her final hope--if she can only trust him.1',
    6,
    10,
    'MOVIE',
    'SCI-FI',
    'https://www.youtube.com/watch?v=kmxLybfGNC4',
    'https://m.media-amazon.com/images/M/MV5BMTUxMTAxYzktZjE0NC00Y2E1LWI1MjktYzc5N2ZlMDk2ODEyXkEyXkFqcGdeQXVyMTQyMTMwOTk0._V1_.jpg',
    '1h 52m',
    TO_DATE('12/22/2016', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    61,
    'Ju-on: The Grudge',
    'In Japan, when the volunteer social assistant Rika Nishina is assigned to visit a family, she is cursed and chased by two revengeful fiends: Kayako, a woman brutally murdered by her husband and her son Toshio. Each person that lives in or visits the haunted house is murdered or disappears.',
    7,
    10,
    'MOVIE',
    'SUPERNATURAL',
    'https://www.youtube.com/watch?v=BxbBdEA7ZCQ',
    'https://m.media-amazon.com/images/M/MV5BYjNjMWNhZjctYmQzYS00M2ZmLWEzZTktZTJjZDI0NmM0MmMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
    '1h 32m',
    TO_DATE('01/25/2003', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    62,
    'Ringu',
    'Reiko Asakawa is researching into a ''Cursed Video'' interviewing teenagers about it. When her niece Tomoko dies of ''sudden heart failure'' with an unnaturally horrified expression on her face, Reiko investigates. She finds out that some of Tomoko''s friends, who had been on a holiday with Tomoko the week before, had died on exactly the same night at the exact same time in the exact same way. Reiko goes to the cabin where the teens had stayed and finds an ''unlabeled'' video tape. Reiko watched the tape to discover to her horror it is in fact the ''cursed videotape''. Ex-Husband Ryuji helps Reiko solve the mystery, Reiko makes him a copy for further investigation. Things become more tense when their son Yoichi watches the tape saying Tomoko had told him to. Their discovery takes them to a volcanic island where they discover that the video has a connection to a psychic who died 30 years ago, and her child Sadako..',
    8,
    10,
    'MOVIE',
    'SUPERNATURAL',
    'https://www.youtube.com/watch?v=0_f3vfflnOE',
    'https://m.media-amazon.com/images/M/MV5BMTI5NzcyNDQyOF5BMl5BanBnXkFtZTYwMTcyNDQ5._V1_.jpg',
    '1h 36m',
    TO_DATE('01/31/1998', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    63,
    'The Exorcist',
    'A visiting actress in Washington, D.C., notices dramatic and dangerous changes in the behavior and physical make-up of her 12-year-old daughter. Meanwhile, a young priest at nearby Georgetown University begins to doubt his faith while dealing with his mother''s terminal sickness. And a frail, elderly priest recognizes the necessity for a show-down with an old demonic enemy.',
    9,
    10,
    'MOVIE',
    'SUPERNATURAL',
    'https://www.youtube.com/watch?v=YDGw1MTEe9k',
    'https://upload.wikimedia.org/wikipedia/en/7/7b/Exorcist_ver2.jpg',
    '2h 2m',
    TO_DATE('12/26/1973', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    64,
    'Shutter',
    'A young photographer Thun and his girlfriend Jane discover mysterious shadows in their photographs after fleeing the scene of an accident. As they investigate the phenomenon, they find other photographs contain similar supernatural images, that Thun''s best friends are being haunted as well, and Jane discovers that her boyfriend has not told her everything. It soon becomes clear that you can not escape your past.',
    7,
    10,
    'MOVIE',
    'SUPERNATURAL',
    'https://www.youtube.com/watch?v=CZ6a5tLA8o4',
    'https://upload.wikimedia.org/wikipedia/en/7/7b/Exorcist_ver2.jpg',
    '1h 37m',
    TO_DATE('09/09/2004', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    65,
    ' Poltergeist',
    'A young family are visited by ghosts in their home. At first the ghosts appear friendly, moving objects around the house to the amusement of everyone, then they turn nasty and start to terrorise the family before they "kidnap" the youngest daughter.',
    8,
    10,
    'MOVIE',
    'SUPERNATURAL',
    'https://www.youtube.com/watch?v=9eZgEKjYJqA',
    'https://m.media-amazon.com/images/I/81BA9xFIB2L._AC_UF894,1000_QL80_.jpg',
    '1h 54m',
    TO_DATE('06/04/1982', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    66,
    'The Iron Claw',
    'The true story of the inseparable Von Erich brothers, who made history in the intensely competitive world of professional wrestling in the early 1980s. Through tragedy and triumph, under the shadow of their domineering father and coach, the brothers seek larger-than-life immortality on the biggest stage in sports.',
    8,
    10,
    'MOVIE',
    'SPORTS',
    'https://www.youtube.com/watch?v=8KVsaoveTbw',
    'https://m.media-amazon.com/images/M/MV5BOGE5NjllZTEtMGJjNy00ZTFmLThlNDItNmNiZTgyOTQ4OTA2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
    '2h 12m',
    TO_DATE('6/14/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    67,
    'Chandu Champion',
    '"Chottu Tiger," an absolutely terrific true story of a man who has lived possibly the most incredible life unknown to the world. An unbelievable tale of a man who kept bouncing back from one adversity after another with grit, determination and undying spirit. From wrestling in the rustic interiors of Maharashtra as a teenager, to representing India at the prestigious International Services Meet held in Tokyo, to fighting a War against Pakistan and getting disabled in that, to finally making it to the Grand Munich Olympics of 1972 and facing the Black September Terrorist attack.',
    9,
    10,
    'MOVIE',
    'SPORTS',
    'https://www.youtube.com/watch?v=IHQQK_Wn5DM',
    'https://assets-in.bmscdn.com/discovery-catalog/events/et00363650-emsultwpym-landscape.jpg',
    '2h 22m',
    TO_DATE('06/14/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    68,
    'Challengers',
    'From visionary filmmaker Luca Guadagnino, Challengers stars Zendaya as Tashi Duncan, a former tennis prodigy turned coach and a force of nature who makes no apologies for her game on and off the court. Married to a champion on a losing streak (Mike Faist - West Side Story), Tashi''s strategy for her husband''s redemption takes a surprising turn when he must face off against the washed-up Patrick (Josh O''Connor - The Crown) - his former best friend and Tashi''s former boyfriend. As their pasts and presents collide, and tensions run high, Tashi must ask herself, what will it cost to win.',
    8,
    10,
    'MOVIE',
    'SPORTS',
    'https://www.youtube.com/watch?v=AXEK7y1BuNQ',
    'https://upload.wikimedia.org/wikipedia/en/b/b4/Challengers_2024_poster.jpeg',
    '2h 11m',
    TO_DATE('6/14/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    69,
    'The Boys in the Boat',
    'The Boys in the Boat is a sports drama based on the #1 New York Times bestselling non-fiction novel written by Daniel James Brown. The film, directed by George Clooney, is about the 1936 University of Washington rowing team that competed for gold at the Summer Olympics in Berlin. This inspirational true story follows a group of underdogs at the height of the Great Depression as they are thrust into the spotlight and take on elite rivals from around the world.',
    7,
    10,
    'MOVIE',
    'SPORTS',
    'https://www.youtube.com/watch?v=dfEA-udzjjQ',
    'https://m.media-amazon.com/images/M/MV5BNGU1Nzc4YWMtZmZiYi00NzFkLTk2MDUtOGRlNGU1Njk0ZTdkXkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_FMjpg_UX1000_.jpg',
    '2h 3m',
    TO_DATE('12/25/2023', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    70,
    'Ferrari',
    'Set during the summer of 1957. Ex-racecar driver, Ferrari, is in crisis. Bankruptcy stalks the company he and his wife, Laura, built from nothing ten years earlier. Their tempestuous marriage struggles with the mourning for one son and the acknowledgement of another. He decides to counter his losses by rolling the dice on one race - 1,000 miles across Italy, the iconic Mille Migl!',
    7,
    10,
    'MOVIE',
    'SPORTS',
    'https://www.youtube.com/watch?v=ERIBTIlVVJQ',
    'https://m.media-amazon.com/images/M/MV5BNTM0YTBlMjctZjJjZS00MDU4LTg5YmQtMDY5Y2FhMWZiMjQ2XkEyXkFqcGdeQXVyNzU0NzQxNTE@._V1_FMjpg_UX1000_.jpg',
    '2h 10m',
    TO_DATE('12/25/2023', 'MM/DD/YYYY'),
    NULL
);


INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    72,
    'Chinatown',
    'In 1937 Los Angeles, private investigator Jake ''J.J.'' Gittes specializes in cheating-spouse cases. His current target is Hollis Mulwray, high-profile chief engineer for the Los Angeles Department of Water and Power, whose wife suspects him of infidelity. In following Mulwray, Gittes witnesses some usual business dealings, such as a public meeting for construction of a new dam to create additional water supply for Los Angeles, as fresh water is vital to the growing community during the chronic drought; Mulwray opposes the dam. Eventually Gittes sees Mulwray meeting with an unknown young woman who isn''t his wife. Once news of the supposed tryst between Mulwray and this woman hits the media, additional information comes to light that makes Gittes believe that Mulwray is being framed for something and that he himself is being set up. In his investigation of the issue behind Mulwray''s framing and his own setup, Gittes is assisted by Mulwray''s wife Evelyn, but he thinks she isn''t being forthright with him. The further he gets into the investigation, the more secrets he uncovers about the Mulwrays'' professional and personal dealings, including Mulwray''s former business-partnership with Evelyn''s father, Noah Cross. The identity of the unknown woman may be the key to uncovering the whole story.',
    8,
    10,
    'MOVIE',
    'THRILLER',
    'https://www.youtube.com/watch?v=T37QkBc4IGY',
    'https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTkyNjQ4MDA0NzE5NjE3NDYw/should-i-watch-chinatown.jpg',
    '2h 10m',
    TO_DATE('06/20/1974', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    73,
    'The Tenant',
    'In Paris, the shy bureaucrat Trelkovsky rents an old apartment without bathroom where the previous tenant, the Egyptologist Simone Choule, committed suicide. The unfriendly concierge (Shelley Winters) and the tough landlord Mr. Zy establish stringent rules of behavior and Trelkovsky feels ridden by his neighbors. Meanwhile he visits Simone in the hospital and befriends her girlfriend Stella. After the death of Simone, Trelkovsky feels obsessed for her and believes his landlord and neighbors are plotting a scheme to force him to also commit suicide.',
    8,
    10,
    'MOVIE',
    'THRILLER',
    'https://www.youtube.com/watch?v=2Y-4rJJw554',
    'https://upload.wikimedia.org/wikipedia/en/a/a6/Locataire.jpg',
    '2h 6m',
    TO_DATE('05/26/1976', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    74,
    'The Name of the Rose',
    '14. century Franciscan monk William of Baskerville and his young novice arrive at a conference to find that several monks have been murdered under mysterious circumstances. To solve the crimes, William must rise up against the Church''s authority and fight the shadowy conspiracy of monastery monks using only his intelligence which is considerable.',
    8,
    10,
    'MOVIE',
    'THRILLER',
    'https://www.youtube.com/watch?v=0h6j8T5bGoA',
    'https://m.media-amazon.com/images/M/MV5BZjEyZTdhNDMtMWFkMS00ZmRjLWEyNmEtZDU3MWFkNDEzMDYwXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
    '2h 10m',
    TO_DATE('09/24/1986', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    75,
    'Blue Velvet',
    'College student Jeffrey Beaumont returns to his idyllic hometown of Lumberton to manage his father''s hardware store while his father is hospitalized. Walking though a grassy meadow near the family home, Jeffrey finds a severed human ear. After an initial investigation, lead police Detective John Williams advises Jeffrey not to speak to anyone about the case as they investigate further. Detective Williams also tells Jeffrey that he cannot divulge any information about what the police know. Detective Williams'' high school aged daughter, Sandy Williams, tells Jeffrey what she knows about the case from overhearing her father''s private conversations on the matter: that it has to do with a nightclub singer named Dorothy Vallens, who lives in an older apartment building near the Beaumont home. His curiosity getting the better of him, Jeffrey, with Sandy''s help, decides to find out more about the woman at the center of the case by breaking into Dorothy''s apartment while he knows she''s at work. What Jeffrey finds is a world unfamiliar to him, one that he doesn''t truly understand but one that he is unable to deny the lure of despite the inherent dangers of being associated with a possible murder. Still, he is torn between this world and the prospect of a relationship with Sandy, the two who are falling for each other, despite Sandy already being in a relationship with Mike, the school''s star football player.',
    8,
    10,
    'MOVIE',
    'THRILLER',
    'https://www.youtube.com/watch?v=00Mq6N5AsjE',
    'https://m.media-amazon.com/images/M/MV5BNjg0OWE0YWUtMGRlMi00Y2QzLTgzMjQtZGY4YTRlZWYxMmQxXkEyXkFqcGdeQW1pYnJ5YW50._V1_.jpg',
    '2h',
    TO_DATE('10/23/1986', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    11,
    'Hit Man',
    'A professor moonlighting as a hit man of sorts for his city police department, descends into dangerous, dubious territory when he finds himself attracted to a woman who enlists his services.',
    7,
    10,
    'MOVIE',
    'COMEDY, ROMANCE',
    'https://youtu.be/0g4cJ4NE8HA?si=_ieCJ03jE7FSt5fQ',
    'https://m.media-amazon.com/images/M/MV5BMDlmMmZhZjQtZDhlMi00MzU0LWIwYjMtNDRhOGE5YzczYjBmXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_.jpg',
    '1h 55m',
    TO_DATE('06/07/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    12,
    'Barbie',
    'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
    7,
    10,
    'MOVIE',
    'ADVENTURE, COMEDY, FANTASY',
    'https://youtu.be/pBk4NYhWNMM?si=la093vKRkygsK9F6',
    'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
    '1h 54m',
    TO_DATE('06/21/2023', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    13,
    'Bad Boys: Ride or Die',
    'This Summer, the world''s favorite Bad Boys are back with their iconic mix of edge-of-your seat action and outrageous comedy but this time with a twist: Miami''s finest are now on the run.',
    7,
    10,
    'MOVIE',
    'ACTION, ADVENTURE, COMEDY',
    'https://youtu.be/CVxi3m2h3Q8?si=GtQOOUW-1fU5xV6g',
    'https://m.media-amazon.com/images/M/MV5BY2U5YmQ3YjgtM2I2OC00YmM5LTkyM2MtN2I5Zjg2MDE0ODkwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
    '1h 55m',
    TO_DATE('06/07/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    14,
    'Mean Girls',
    'Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.',
    7,
    10,
    'MOVIE',
    'COMEDY',
    'https://youtu.be/oDU84nmSDZY?si=syVMvkSixkz2k_8q',
    'https://m.media-amazon.com/images/M/MV5BNDExMGMyN2QtYjRkZC00Yzk1LTkzMDktMTliZTI5NjQ0NTNkXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg',
    '1h 37m',
    TO_DATE('04/30/2004', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    15,
    'Deadpool',
    'A wisecracking mercenary gets experimented on and becomes immortal yet hideously scarred, and sets out to track down the man who ruined his looks.',
    8,
    10,
    'MOVIE',
    'ACTION, COMEDY',
    'https://youtu.be/Xithigfg7dA?si=Gx5t67hstKDEetED',
    'https://m.media-amazon.com/images/I/71pInEHoevL._AC_UF1000,1000_QL80_.jpg',
    '1h 48m',
    TO_DATE('02/12/2016', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    16,
    'Forrest Gump',
    'The history of the United States from the 1950s to the ''70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.',
    9,
    10,
    'MOVIE',
    'DRAMA, ROMANCE',
    'https://youtu.be/bLvqoHBptjg?si=FRVf720bWMkV3FRq',
    'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
    '2h 22m',
    TO_DATE('07/06/1994', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    17,
    'The Shawshank Redemption',
    'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
    9,
    10,
    'MOVIE',
    'DRAMA',
    'https://youtu.be/6hB3S9bIaco?si=YztWhZySr4mGUCWL',
    'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    '2h 22m',
    TO_DATE('10/14/1994', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    18,
    'Pulp Fiction ',
    'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    9,
    10,
    'MOVIE',
    'DRAMA',
    'https://youtu.be/s7EdQ4FqbhY?si=eihQP0rVwia3PjJe',
    'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    '2h 34m',
    TO_DATE('10/14/1994', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    19,
    'The Lord of the Rings: The Fellowship of the Ring',
    'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    9,
    10,
    'MOVIE',
    'ACTION, ADVENTURE, DRAMA',
    'https://youtu.be/V75dMMIW2B4?si=bXRxzZ8QjQk7P1nG',
    'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UX1000_.jpg',
    '2h 58m',
    TO_DATE('12/19/2001', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    20,
    'Citizen Kane',
    'Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance: ''Rosebud.''',
    8,
    10,
    'MOVIE',
    'DRAMA, MYSTERY',
    'https://youtu.be/8dxh3lwdOFw?si=_4rDsGPNUoXiaCob',
    'https://pics.filmaffinity.com/citizen_kane-217208961-mmed.jpg',
    '1h 59m',
    TO_DATE('09/05/1941', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    21,
    'Damsel',
    'A dutiful damsel agrees to marry a handsome prince, only to find the royal family has recruited her as a sacrifice to repay an ancient debt.',
    6,
    10,
    'MOVIE',
    'ACTION, ADVENTURE, FANTASY',
    'https://youtu.be/iM150ZWovZM?si=iaXjJsA6_-cqtla1',
    'https://m.media-amazon.com/images/M/MV5BODRiMTA4NGMtOTQzZC00OWFjLWFmODctMjY2ZTcwYjI5NDMyXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg',
    '1h 50m',
    TO_DATE('03/08/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    22,
    'Beauty and the Beast',
    'A selfish Prince is cursed to become a monster for the rest of his life, unless he learns to fall in love with a beautiful young woman he keeps prisoner.',
    7,
    10,
    'MOVIE',
    'ADVENTURE, FANTASY',
    'https://youtu.be/OvW_L8sTu5E?si=AN60372iqhrO6S7t',
    'https://pics.filmaffinity.com/beauty_and_the_beast-399141417-mmed.jpg',
    '2h 9m',
    TO_DATE('03/17/2017', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    23,
    'The School for Good and Evil',
    'Best friends Sophie and Agatha find themselves on opposing sides of an epic battle when they''re swept away into an enchanted school where aspiring heroes and villains are trained to protect the balance between Good and Evil.',
    6,
    10,
    'MOVIE',
    'ACTION, COMEDY, DRAMA, FANTASY',
    'https://youtu.be/aftysDQ4hpI?si=0jpufwwmd-Np9j7a',
    'https://pics.filmaffinity.com/the_school_for_good_and_evil-366146357-mmed.jpg',
    '2h 27m',
    TO_DATE('10/19/2022', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    24,
    'Harry Potter and the Sorcerer''s Stone',
    'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.',
    8,
    10,
    'MOVIE',
    'ADVENTURE, FANTASY',
    'https://youtu.be/VyHV0BRtdxo?si=fmfkZzbUtmMx9LAJ',
    'https://pics.filmaffinity.com/harry_potter_and_the_sorcerer_s_stone-154820574-mmed.jpg',
    '2h 32m',
    TO_DATE('11/16/2001', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    25,
    'The Flash',
    'Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without super heroes, forcing him to race for his life in order to save the future.',
    7,
    10,
    'MOVIE',
    'ACTION, ADVENTURE, FANTASY',
    'https://youtu.be/hebWYacbdvc?si=cVeWlUzC4_VCYBv8',
    'https://pics.filmaffinity.com/the_flash-205686824-mmed.jpg',
    '2h 24m',
    TO_DATE('06/16/2023', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    26,
    'Your Name',
    'Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.',
    8,
    10,
    'ANIME',
    'DRAMA, FANTASY',
    'https://youtu.be/xU47nhruN-Q?si=J2dlOfVe72W4RMTk',
    'https://pics.filmaffinity.com/kimi_no_na_wa_your_name-612760352-mmed.jpg',
    '1h 46m',
    TO_DATE('04/07/2017', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    27,
    'Weathering with You',
    'Set during a period of exceptionally rainy weather, high-school boy Hodaka Morishima runs away from his troubled rural home to Tokyo and befriends an orphan girl who can manipulate the weather.',
    8,
    10,
    'ANIME',
    'DRAMA, FANTASY',
    'https://youtu.be/Q6iK6DjV_iE?si=NYaQM_u6c6WLiNqU',
    'https://pics.filmaffinity.com/tenki_no_ko_weathering_with_you-616038056-mmed.jpg',
    '1h 52m',
    TO_DATE('01/17/2020', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    76,
    'The Boys',
    'The world''s most powerful superheroes (''Supes'') are secretly bending society to its whims, until the underdog team ''The Boys'', victims of the ''Supes'', conjure up a plan to take down ''The Seven'' and ''Vought International'' once and for all. Fighting a never ending conspiracy of corporate espionage, deep-cutting secrets and nigh-Godly figures, ''The Boys'' will do whatever it takes to save the world from its corrupt ''superheroes'' before they become unstoppable--or die trying.',
    9,
    10,
    'TV_SHOW',
    'ACTION',
    'https://www.youtube.com/watch?v=5SKP1_F7ReE',
    'https://m.media-amazon.com/images/M/MV5BYTY2ZjYyNGUtZGVkZS00MDNhLWIwMjMtZDk4MmQ5ZWI0NTY4XkEyXkFqcGdeQXVyMTY3MDE5MDY1._V1_.jpg',
    '1h',
    TO_DATE('07/26/2019', 'MM/DD/YYYY'),
    30
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    77,
    'Game of Thrones',
    'In the mythical continent of Westeros, several powerful families fight for control of the Seven Kingdoms. As conflict erupts in the kingdoms of men, an ancient enemy rises once again to threaten them all. Meanwhile, the last heirs of a recently usurped dynasty plot to take back their homeland from across the Narrow Sea.',
    9,
    10,
    'TV_SHOW',
    'ACTION',
    'https://www.youtube.com/watch?v=KPLWWIOCOOQ',
    'https://miro.medium.com/v2/resize:fit:704/1*YNYnD9Jz7zzlTqZZFtTKlQ.jpeg',
    '1h',
    TO_DATE('04/17/2011', 'MM/DD/YYYY'),
    74
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    28,
    'Naruto',
    'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village''s leader and strongest ninja.',
    8,
    10,
    'ANIME',
    'ACTION, ADVENTURE',
    'https://youtu.be/-G9BqkgZXRA?si=fJbniDImZZeTJXya',
    'https://shoptrends.com/pub/media/catalog/product/f/r/fr17949wht22x34-1.jpg',
    '24m',
    TO_DATE('09/10/2005', 'MM/DD/YYYY'),
    220
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    78,
    'The Last of Us',
    '20 years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone. What starts as a small job soon becomes a brutal heartbreaking journey as they both must traverse the U.S. and depend on each other for survival.',
    9,
    10,
    'TV_SHOW',
    'ACTION',
    'https://www.youtube.com/watch?v=uLtkt8BonwM',
    'https://assets-prd.ignimgs.com/2022/11/02/the-last-of-us-tv-button-1667405909077.jpg',
    '50m',
    TO_DATE('01/15/2023', 'MM/DD/YYYY'),
    16
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    79,
    'House of the Dragon',
    'The Targaryen dynasty is at the absolute apex of its power, with more than 10 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.',
    9,
    10,
    'TV_SHOW',
    'ADVENTURE',
    'https://www.youtube.com/watch?v=DotnJ7tTA34',
    'https://m.media-amazon.com/images/M/MV5BM2QzMGVkNjUtN2Y4Yi00ODMwLTg3YzktYzUxYjJlNjFjNDY1XkEyXkFqcGc@._V1_.jpg',
    '50m',
    TO_DATE('08/21/2022', 'MM/DD/YYYY'),
    20
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    29,
    'Attack on Titan',
    'After his hometown is destroyed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    9,
    10,
    'ANIME',
    'ACTION, ADVENTURE',
    'https://youtu.be/MGRm4IzK1SQ?si=oufdkGclrRWPh8Lo',
    'https://m.media-amazon.com/images/I/81lNsz7Ox1S._AC_SL1500_.jpg',
    '24m',
    TO_DATE('09/28/2013', 'MM/DD/YYYY'),
    98
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    80,
    'Fallout',
    'Years after a nuclear apocalypse devastates America, a violent raid by bandits on an underground fallout shelter forces one of its residents to set out into a barren wasteland filled with radiation, mutated monsters, and a lawless society of those who remained on the surface.',
    9,
    10,
    'TV_SHOW',
    'ADVENTURE',
    'https://www.youtube.com/watch?v=0kQ8i2FpRDk',
    'https://m.media-amazon.com/images/M/MV5BZjQ0YjAyNWQtMjRjMC00NzMxLTlkNjEtYWQzNmQwNGRlMGJkXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
    '1h',
    TO_DATE('04/10/2024', 'MM/DD/YYYY'),
    9
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    30,
    'Scum''s Wish',
    'A perfect couple struggles with a secret longing each has for someone else.',
    7,
    10,
    'ANIME',
    'DRAMA, ROMANCE',
    'https://youtu.be/NUoC_rvgdgI?si=mEeCX4KQVzyjCLlO',
    'https://m.media-amazon.com/images/M/MV5BMDA4ZjY5NGEtZjI2Ni00MjYwLWE0NGItN2JhMzU3Mzc2ZmQ2L2ltYWdlXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg',
    '22m',
    TO_DATE('01/13/2017', 'MM/DD/YYYY'),
    12
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    81,
    'Outlander',
    'Follows the story of Claire Randall, a married combat nurse from 1945 who is mysteriously swept back in time to 1743, where she is immediately thrown into an unknown world in which her life is threatened. When she is forced to marry Jamie Fraser, a chivalrous and romantic young Scottish warrior, a passionate relationship is ignited that tears Claire''s heart between two vastly different men in two irreconcilable lives.',
    9,
    10,
    'TV_SHOW',
    'ADVENTURE',
    'https://www.youtube.com/watch?v=PFFKjptRr7Y',
    'https://m.media-amazon.com/images/I/81tf0mQ6ljL._AC_UF1000,1000_QL80_.jpg',
    '1h',
    TO_DATE('08/09/2014', 'MM/DD/YYYY'),
    101
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    82,
    'The Bear',
    'Carmen Berzatto, a brilliant young chef from the fine-dining world is forced to return home to run his local family sandwich shop - the Original Beef of Chicagoland - after a heartbreaking death in his family. A world away from what he''s used to, Carmy must balance the soul-crushing reality of trading in Michelin star restaurants for the small ''business'' kitchen filled with strong-willed and obstinate staff and his strained familial relationships, all while grappling with the impact of his brother''s suicide.',
    9,
    10,
    'TV_SHOW',
    'COMEDY',
    'https://www.youtube.com/watch?v=gBmkI4jlaIo',
    'https://c8.alamy.com/comp/2RDR8M5/the-bear-tv-show-poster-jeremy-allen-white-2RDR8M5.jpg',
    '34m',
    TO_DATE('06/23/2022', 'MM/DD/YYYY'),
    29
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    31,
    'My Happy Marriage',
    'An unhappy young woman from an abusive family is married off to a fearsome and chilly army commander. But the two learn more about each other, love may have a chance.',
    8,
    10,
    'ANIME',
    'DRAMA, FANTASY',
    'https://youtu.be/dURh9kVzcw8?si=3b5AhHhlJmBSOcEU',
    'https://m.media-amazon.com/images/M/MV5BNjdlZWY1MzctOGUxNS00YmViLWFiOTMtNmQxMmZhMjQ5MjhhXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UX1000_.jpg',
    '24m',
    TO_DATE('07/05/2023', 'MM/DD/YYYY'),
    12
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    83,
    'The Office',
    'A mediocre paper company in the hands of Scranton, PA branch manager Michael Scott. This mockumentary follows the everyday lives of the manager and the employees he "manages." The crew follows the employees around 24/7 and captures their quite humorous and bizarre encounters as they will do what it takes to keep the company thriving.',
    9,
    10,
    'TV_SHOW',
    'COMEDY',
    'https://www.youtube.com/watch?v=tNcDHWpselE',
    'https://images1.resources.foxtel.com.au/store2/mount1/16/4/b1ixa.jpg',
    '22m',
    TO_DATE('03/24/2005', 'MM/DD/YYYY'),
    188
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    84,
    'Ted Lasso',
    'In a shock development struggling English Premier League team AFC Richmond hires American football coach Ted Lasso as its new manager. Lasso knows nothing about soccer/football. With unshakable enthusiasm and positivity he rises to the challenge but little known to him there are forces within the club that don''t want him to succeed.',
    9,
    10,
    'TV_SHOW',
    'COMEDY',
    'https://www.youtube.com/watch?v=3u7EIiohs6U',
    'https://www.apple.com/newsroom/images/product/apple-tv-plus/standard/Apple-Today-at-Apple-session-Ted-Lasso-hero.jpg.news_app_ed.jpg',
    '30m',
    TO_DATE('08/14/2020', 'MM/DD/YYYY'),
    34
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    32,
    'Angels of Death',
    'When Rachel wakes up with no memories in the basement of an unfamiliar building, she runs into Zack, a scythe-carrying serial killer.',
    7,
    10,
    'ANIME',
    'ADVENTURE, HORROR',
    'https://youtu.be/Ee5J1x6MuIo?si=ot2Lh50VFm7q6b4I',
    'https://m.media-amazon.com/images/I/71VI5eN5YYL._AC_UF1000,1000_QL80_DpWeblab_.jpg',
    '24m',
    TO_DATE('07/06/2018', 'MM/DD/YYYY'),
    16
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    85,
    'Bridgerton',
    'From Shondaland and creator Chris Van Dusen, the first season of Bridgerton follows Daphne Bridgerton (Phoebe Dynevor), the eldest daughter of the powerful Bridgerton family as she makes her debut onto Regency London''s competitive marriage market. Hoping to follow in her parent''s footsteps and find a match sparked by true love, Daphne''s prospects initially seem to be unrivaled. But as her older brother (Jonathan Bailey) begins to rule out her potential suitors, the high society scandal sheet written by the mysterious Lady Whistledown (Julie Andrews) casts aspersions on Daphne. Enter the highly desirable and rebellious Duke of Hastings (Regé-Jean Page), committed bachelor and the catch of the season for the debutantes'' mamas. Despite proclaiming that they want nothing the other has to offer, their attraction is undeniable and sparks fly as they find themselves engaged in an increasing battle of wits while navigating society''s expectations for their future.',
    8,
    10,
    'TV_SHOW',
    'DRAMA',
    'https://www.youtube.com/watch?v=gpv7ayf_tyE',
    'https://m.media-amazon.com/images/M/MV5BY2ZiODA2MGYtMmMxMi00YjlmLWFmYjktMWYyOTMwNWFkNWNkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_QL75_UX190_CR0,0,190,281_.jpg',
    '1h',
    TO_DATE('12/25/2020', 'MM/DD/YYYY'),
    25
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    33,
    'Tokyo Ghoul',
    'A Tokyo college student is attacked by a ghoul, a superpowered human who feeds on human flesh. He survives but has become part ghoul and becomes a fugitive on the run.',
    8,
    10,
    'ANIME',
    'ACTION, DRAMA',
    'https://youtu.be/vGuQeQsoRgU?si=XHP7rwksi03_LeMy',
    'https://i5.walmartimages.com/asr/d597957c-351d-4903-82ff-d52a66aed94a.73a05cb85fdaf2b6a80beb38a5a7f550.jpeg',
    '24m',
    TO_DATE('07/03/2014', 'MM/DD/YYYY'),
    12
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    86,
    'Suits',
    'While running from a drug deal gone bad, brilliant young college-dropout Mike Ross slips into a job interview with one of New York City''s best legal closers, Harvey Specter. Tired of cookie-cutter law school grads, Harvey takes a gamble by hiring Mike on the spot after recognizing his raw talent and photographic memory. Mike and Harvey are a winning team. Although Mike is a genius, he still has a lot to learn about the law; and while Harvey might seem like an emotionless, cold-blooded shark, Mike''s sympathy and concern for their cases and clients will help remind Harvey why he went into law in the first place. Mike''s other allies in the office include the firm''s best paralegal Rachel and Harvey''s no-nonsense assistant Donna. Proving to be an irrepressible duo and invaluable to the practice, Mike and Harvey must keep their secret from everyone including managing partner Jessica and Harvey''s arch nemesis Louis, who seems intent on making Mike''s life as difficult as possible.',
    9,
    10,
    'TV_SHOW',
    'DRAMA',
    'https://www.youtube.com/watch?v=85z53bAebsI',
    'https://m.media-amazon.com/images/M/MV5BNDNjNGE2ZDUtZWM1Zi00Y2FjLTk0YjQtZjFmYzE0YTM0YzYyXkEyXkFqcGdeQXVyMTE2NTA4MzQ1._V1_FMjpg_UX1000_.jpg',
    '44m',
    TO_DATE('06/23/2011', 'MM/DD/YYYY'),
    134
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    87,
    'The Sopranos',
    'An innovative look at the life of fictional Mafia Capo Tony Soprano, this serial is presented largely first person, but additional perspective is conveyed by the intimate conversations Tony has with his psychotherapist. We see Tony at work, at home, and in therapy. Moments of black comedy intersperse this aggressive, adult drama, with adult language, and extreme violence.',
    9,
    10,
    'TV_SHOW',
    'DRAMA',
    'https://www.youtube.com/watch?v=Q8cBFvpqmH0',
    'https://w0.peakpx.com/wallpaper/348/147/HD-wallpaper-tv-show-the-sopranos.jpg',
    '1h',
    TO_DATE('01/10/1999', 'MM/DD/YYYY'),
    86
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    34,
    'Serial Experiments Lain',
    'Strange things start happening when a withdrawn girl named Lain becomes obsessed with an interconnected virtual realm known as "The Wired".',
    8,
    10,
    'ANIME',
    'DRAMA, HORROR',
    'https://youtu.be/t5y4nQ5Y1V8?si=IwEjdC8ZJQi1y73f',
    'https://m.media-amazon.com/images/I/71GivzmxXUL._AC_SL1500_.jpg',
    '24m',
    TO_DATE('07/13/1999', 'MM/DD/YYYY'),
    13
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    88,
    'Stranger Things',
    'In a small town where everyone knows everyone, a peculiar incident starts a chain of events that leads to a child''s disappearance, which begins to tear at the fabric of an otherwise-peaceful community. Dark government agencies and seemingly malevolent supernatural forces converge on the town, while a few of the locals begin to understand that more is going on than meets the eye.',
    9,
    10,
    'TV_SHOW',
    'FANTASY',
    'https://www.youtube.com/watch?v=mnd7sFt5c3A',
    'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    '1h',
    TO_DATE('07/15/2016', 'MM/DD/YYYY'),
    42
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    89,
    'Supernatural',
    'John Winchester raised his two sons Sam and Dean to hunt and kill all things that go "bump in the night" after his wife Mary was murdered by an evil supernatural being when the boys were little. 22 years later the brothers set out on a journey, fighting evil along the way, to find their recently-missing father; when they finally do he reveals he knows what demon killed their mother and has found a way to track and kill it. Meanwhile, Sam develops frightening abilities such as seeing visions of people dying before it actually happens. These visions are somehow connected to the demon that murdered his mother and its mysterious plans that seem to be all about Sam. When their father dies striking a deal with that very same demon, the brothers determine to finish his crusade. But disturbing revelations about Sam''s part in the demon''s apocalyptic plan are presented when John''s dying last words to Dean are revealed.',
    9,
    10,
    'TV_SHOW',
    'FANTASY',
    'https://www.youtube.com/watch?v=t-775JyzDTk',
    'https://static.tvtropes.org/pmwiki/pub/images/supernatural_poster113.jpg',
    '44m',
    TO_DATE('09/13/2005', 'MM/DD/YYYY'),
    327
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    35,
    'Heavenly Delusion',
    'A boy grows up behind the safe walls of an apocalyptic Japan full of monsters. Tokyo flourishes as a paradise, while outside the walls of hell dangers lurk. However, a small group searches for heaven.',
    8,
    10,
    'ANIME',
    'ADVENTURE, MYSTERY',
    'https://youtu.be/-pgcwiNPiQE?si=pTeCQoqQ2GDlYabq',
    'https://m.media-amazon.com/images/M/MV5BOGEwNjQ0YjQtNzc4MS00NDBmLWJiNDItYzZkYzIzMjhmMDIyXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    '24m',
    TO_DATE('04/01/2023', 'MM/DD/YYYY'),
    13
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    90,
    'Interview with the Vampire',
    'In the year 2022, the vampire Louis de Pointe du Lac lives in Dubai and seeks to tell the story of his life or afterlife to renowned journalist Daniel Molloy. Beginning in early 20th-century New Orleans, Louis'' story follows his relationship with the vampire Lestat du Lioncourt and their formed family, including teen fledgling Claudia. Together, the vampire family endures immortality in New Orleans and beyond. As the interview continues in Dubai, Molloy discovers the truths beneath Louis'' story.',
    8,
    10,
    'TV_SHOW',
    'FANTASY',
    'https://www.youtube.com/watch?v=BecdVouR7mY',
    'https://m.media-amazon.com/images/M/MV5BMTY2NmNkYjEtMDEyZC00ZTc4LWJlZTgtYmM2N2ZhYjc5ODNmXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
    '45m',
    TO_DATE('10/02/2022', 'MM/DD/YYYY'),
    16
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    36,
    'Eden of the East',
    'On November 22, 2010 ten missiles strike Japan. However, this unprecedented terrorist act, later to be called as "Careless Monday," does not result in any apparent victims, and is soon forgotten by almost everyone. Then, 3 months later... Saki Morimi is a young woman currently in the United States of America on her graduation trip. But just when she is in front of the White House, Washington DC, she gets into trouble, and only the unexpected intervention of one of her fellow countrymen saves her. However, this man, who introduces himself as Akira Takizawa, is a complete mystery. He appears to have lost his memory. and he is stark naked, except for the gun he holds in one hand, and the mobile phone he''s holding with the other hand. A phone that is charged with 8,200,000,000 yen in digital cash.',
    7,
    10,
    'ANIME',
    'ACTION, COMEDY',
    'https://youtu.be/zfQ4e1iRoak?si=azVcHBdUvQW_IxqK',
    'https://m.media-amazon.com/images/M/MV5BNGE3MTc0NDQtYWM0Zi00NGQ2LWFkNTQtNzczMGVmMzVjNTIwXkEyXkFqcGdeQXVyMjY4MDc1MDA@._V1_FMjpg_UX1000_.jpg',
    '23m',
    TO_DATE('04/09/2009', 'MM/DD/YYYY'),
    11
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    91,
    'My Lady Jane',
    'When her ambitious mother sells Jane''s hand to the highest bidder, Jane is dismayed to discover that her dreaded husband-to-be, Guildford Dudley, is an infuriatingly attractive stranger with a dark secret; one that has the potential to get them both killed. Not to mention the fact that there are greater conspiracies afoot, like a plot to murder her cousin, King Edward, and throw the entire kingdom into chaos. A sharp-tongued, warm-hearted story full of romance, adventure, and fantasy, My Lady Jane reveals that true love is real, people are not always what they seem, and even doomed heroines can save themselves.',
    7,
    10,
    'TV_SHOW',
    'HISTORICAL',
    'https://www.youtube.com/watch?v=PwFty8yi1cU',
    'https://m.media-amazon.com/images/M/MV5BNmEwYjQ5MWMtZDdiOC00NTk1LWEwOWEtYjQ2NDUxNjk2YWU5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    '50m',
    TO_DATE('06/27/2024', 'MM/DD/YYYY'),
    8
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    92,
    'The Crown',
    'This show focuses on Queen Elizabeth II as a young newlywed faced with leading the world''s most famous monarchy while forging a relationship with legendary Prime Minister Sir Winston Churchill. The British Empire is in decline, the political world is in disarray, but a new era is dawning. Peter Morgan''s masterfully-researched scripts reveal the Queen''s private journey behind the public façade with daring frankness. Prepare to see into the coveted world of power and privilege behind the locked doors of Westminster and Buckingham Palace.',
    9,
    10,
    'TV_SHOW',
    'HISTORICAL',
    'https://www.youtube.com/watch?v=JWtnJjn6ng0',
    'https://c8.alamy.com/comp/2HPBD8E/the-crown-2016-directed-by-peter-morgan-credit-left-bank-picturessony-pictures-tv-prod-uk-album-2HPBD8E.jpg',
    '1h',
    TO_DATE('11/04/2016', 'MM/DD/YYYY'),
    60
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    93,
    'Queen Charlotte: A Bridgerton Story',
    'Betrothed against her will to King George, young Charlotte arrives in London on her wedding day and faces scrutiny from the monarch''s cunning mother.',
    8,
    10,
    'TV_SHOW',
    'HISTORICAL',
    'https://www.youtube.com/watch?v=oLtnNw0KT78',
    'https://m.media-amazon.com/images/M/MV5BNWYwNzhhNzMtMWM2Yi00NzdlLTgxNmUtYWI2YTdiNmFmNzQwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
    '58m',
    TO_DATE('05/04/2023', 'MM/DD/YYYY'),
    6
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    37,
    'A.I.C.O. Incarnation',
    'Everything Aiko knew was a lie. Now she''s joining a team of Divers to reach the place where the Burst began to stop it for good and save her family.',
    6,
    10,
    'ANIME',
    'ACTION, SCI-FI',
    'https://youtu.be/O1ER3E4Jz_U?si=Ra6DMcUUFVharGFP',
    'https://m.media-amazon.com/images/M/MV5BNzY5NzdlYTktODFjNi00ZDZkLWEyMjUtYzkwNTA2NTY1N2RhXkEyXkFqcGdeQXVyMjg1NDcxNDE@._V1_.jpg',
    '25m',
    TO_DATE('03/09/2018', 'MM/DD/YYYY'),
    12
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    94,
    'The Walking Dead',
    'Sheriff Deputy Rick Grimes gets shot and falls into a coma. When awoken he finds himself in a Zombie Apocalypse. Not knowing what to do he sets out to find his family, after he''s done that, he gets connected to a group to become the leader. He takes charge and tries to help this group of people survive, find a place to live and get them food. This show is all about survival, the risks and the things you''ll have to do to survive.',
    8,
    10,
    'TV_SHOW',
    'HORROR',
    'https://www.youtube.com/watch?v=sfAc2U20uyg',
    'https://m.media-amazon.com/images/M/MV5BNzI5MjUyYTEtMTljZC00NGI5LWFhNWYtYjY0ZTQ5YmEzMWRjXkEyXkFqcGdeQXVyMTY3MDE5MDY1._V1_FMjpg_UX1000_.jpg',
    '45m',
    TO_DATE('10/31/2010', 'MM/DD/YYYY'),
    177
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    95,
    'Evil',
    'A skeptical clinical psychologist joins a priest-in-training and a blue collar contractor as they investigate supposed abnormal events, including, demonic possession, and other extraordinary occurrences to see if there''s a scientific explanation or if something truly supernatural''s at work.',
    7,
    10,
    'TV_SHOW',
    'HORROR',
    'https://www.youtube.com/watch?v=_l4KXnKjw88',
    'https://m.media-amazon.com/images/M/MV5BNWU4NWY4MDQtYTZlNi00YTdmLWE5ZDAtOTk5ZTI1ZWJiN2UyXkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_FMjpg_UX1000_.jpg',
    '42m',
    TO_DATE('09/26/2019', 'MM/DD/YYYY'),
    50
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    38,
    'The Prince of Tennis II: U-17 World Cup',
    'When tennis phenom Ryoma Echizen is kicked out of Japan''s elite U-17 training camp for breaking the rules, he''s despondent. But a stroke of good luck hits when he''s able to try out for the U.S. team. Proving himself against their hardened veterans isn''t going to be easy, and if he is accepted, he''ll have to play against his former friends. Can he help his new brothers smash their way to victory??',
    8,
    10,
    'ANIME',
    'DRAMA, SUPERNATURAL, SPORTS',
    'https://youtu.be/ng7oI3FyhqE?si=O1wLE6ltpV5hN1FA',
    'https://m.media-amazon.com/images/M/MV5BN2U0ZDhlMTQtYzk1ZC00NTNmLWJjZWEtYzM4Mjg1NjFiNDJhXkEyXkFqcGdeQXVyODMyNTM0MjM@._V1_FMjpg_UX1000_.jpg',
    '24m',
    TO_DATE('07/07/2022', 'MM/DD/YYYY'),
    12
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    96,
    'From',
    'Unravels the mystery of a nightmarish town in middle America that traps all those who enter. As the unwilling residents fight to keep a sense of normality and search for a way out, they must also survive the threats of the surrounding forest; including the terrifying creatures that come out when the sun goes down.',
    8,
    10,
    'TV_SHOW',
    'HORROR',
    'https://www.youtube.com/watch?v=pDHqAj4eJcM',
    'https://m.media-amazon.com/images/M/MV5BNDQxOGI4ZjItM2NhZC00Y2FhLWEwZTAtZTc2MmJmNzY1MjViXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_.jpg',
    '52m',
    TO_DATE('02/20/2022', 'MM/DD/YYYY'),
    30
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    39,
    'Vinland Saga',
    'Following a tragedy, Thorfinn embarks on a journey with the man responsible for it to take his life in a duel as a true and honorable warrior to pay homage.',
    9,
    10,
    'ANIME',
    'ACTION, ADVENTURE, HISTORICAL',
    'https://youtu.be/f8JrZ7Q_p-8?si=WJpAOghDR-u0JT2a',
    'https://m.media-amazon.com/images/I/71vcBl1lANL._AC_SL1500_.jpg',
    '24m',
    TO_DATE('07/06/2019', 'MM/DD/YYYY'),
    48
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    40,
    'Death Note',
    'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.',
    9,
    10,
    'ANIME',
    'DRAMA, MYSTERY, PSYCHOLOGICAL, THRILLER',
    'https://youtu.be/NlJZ-YgAt-c?si=PT4Yef5BOjbFmgO8',
    'https://images-cdn.ubuy.co.id/6368c22732babd287a2689b2-death-note-manga-anime-tv-show-poster.jpg',
    '24m',
    TO_DATE('10/21/2007', 'MM/DD/YYYY'),
    37
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    200,
    'One Punch Man',
    'The story of Saitama, a hero that does it just for fun & can defeat his enemies with a single punch.',
    9,
    10,
    'ANIME',
    'ACTION, COMEDY',
    'https://youtu.be/Poo5lqoWSGw?si=jNzyI6zDEKGf4rqq',
    'https://m.media-amazon.com/images/M/MV5BZjJlNzE5YzEtYzQwYS00NTBjLTk5YzAtYzUwOWQyM2E3OGI2XkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg',
    '24m',
    TO_DATE('10/05/2015', 'MM/DD/YYYY'),
    25
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    201,
    'Haikyu!!',
    'Determined to be like the volleyball championship''s star player nicknamed "the small giant", Shoyo joins his school''s volleyball club.',
    9,
    10,
    'ANIME',
    'COMEDY, DRAMA, SPORTS',
    'https://youtu.be/JOGp2c7-cKc?si=NBSh_zUV-HMLeRyC',
    'https://images-cdn.ubuy.co.in/6350c81143baae1ae1777ad6-haikyuu-poster-karasuno-high-school.jpg',
    '24m',
    TO_DATE('04/05/2014', 'MM/DD/YYYY'),
    89
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    202,
    'A Silent Voice',
    'A young man is ostracized by his classmates after he bullies a deaf girl to the point where she moves away. Years later, he sets off on a path for redemption.',
    8,
    10,
    'ANIME',
    'DRAMA',
    'https://youtu.be/nfK6UgLra7g?si=RkuEu6okQW3IIuVA',
    'https://m.media-amazon.com/images/I/514ePr6WZ6L._AC_UF1000,1000_QL80_.jpg',
    '2h 10m',
    TO_DATE('09/17/2016', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    203,
    'Monster',
    'Tenma, a brilliant neurosurgeon with a promising future, risks his career to save the life of a critically wounded young boy. The boy, now a charismatic young man, reappears 9 years later in the midst of a string of unusual serial murders.',
    9,
    10,
    'ANIME',
    'DRAMA, MYSTERY, TRAGEDY',
    'https://youtu.be/9aS-EgdAq6U?si=e_t547qASYm9L83E',
    'https://m.media-amazon.com/images/I/71HfQJiQvML._AC_UF1000,1000_QL80_.jpg',
    '24m',
    TO_DATE('04/06/2004', 'MM/DD/YYYY'),
    75
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    204,
    'I Am: Celine Dion',
    'This is a journey inside Celine Dion''s life as she reveals her battle with Stiff Person Syndrome.',
    8,
    10,
    'DOCUMENTARY',
    'DRAMA, MUSIC',
    'https://youtu.be/KzV4mSZPke0?si=5fWcY6d2IRnAmICy',
    'https://m.media-amazon.com/images/M/MV5BNjA5Y2IzZDMtYzYwNi00ODBjLTk0MTMtMzYwMDk2YTA2NTIyXkEyXkFqcGc@._V1_.jpg',
    '1h 43m',
    TO_DATE('06/25/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    205,
    'Tell Them You Love Me',
    'A professor has a relationship with a nonverbal man with cerebral palsy. Their affair leads to a criminal trial over disability and consent. The film shows interviews and footage presenting both perspectives.',
    7,
    10,
    'DOCUMENTARY',
    'DRAMA, ROMANCE',
    'https://youtu.be/cTy3XMyG1Ww?si=YLReHj1keXTVM1kS',
    'https://m.media-amazon.com/images/M/MV5BMGNkZWRiZTctZGIzMS00MGYyLWI5NjQtOWZmMjYwM2IxNWM4XkEyXkFqcGdeQXVyMTQwODEzODM@._V1_FMjpg_UX1000_.jpg',
    '1h 42m',
    TO_DATE('02/03/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    206,
    'Hitler and the Nazis: Evil on Trial',
    'Chronicles Hitler''s ascent to power, his regime''s use of propaganda, censorship, and anti-Semitic policies, as well as the eventual downfall of the Nazi leadership.',
    8,
    10,
    'DOCUMENTARY',
    'HISTORICAL',
    'https://youtu.be/I6eIox2vOiA?si=F5BMyxyxLr4FnsVP',
    'https://m.media-amazon.com/images/M/MV5BOTk1MzI3ZmEtYjA2Yy00YmQxLThkMWMtYTNmMGM4N2MyZmNlXkEyXkFqcGdeQXVyNjIyMTUzMjI@._V1_.jpg',
    '1h',
    TO_DATE('06/05/2024', 'MM/DD/YYYY'),
    6
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    207,
    'How to Rob a Bank',
    'In this true-crime documentary, a charismatic rebel in 1990s Seattle pulls off an unprecedented string of bank robberies straight out of the movies.',
    7,
    10,
    'DOCUMENTARY',
    'ACTION, MYSTERY',
    'https://youtu.be/w20aHhlRjDc?si=Ap1i2ZhAImvxsp9u',
    'https://image.tmdb.org/t/p/original/v8cWReuGJelrd0Bz34NZ2gqjS3Q.jpg',
    '1h 28m',
    TO_DATE('06/05/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    208,
    'Ghost Adventures',
    'Zak Bagans, Aaron Goodwin, Billy Tolley and Jay Wasley investigate the scariest, most notorious, haunted places in the world.',
    7,
    10,
    'DOCUMENTARY',
    'HISTORICAL, HORROR, SUPERNATURAL',
    'https://youtu.be/0ztw1hwto_A?si=EfNFxLLfFp71mg67',
    'https://m.media-amazon.com/images/M/MV5BYTYwMThkYTMtOWFiYS00MWM5LWJmODItOWU2OGFiNDVhYTc4XkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg',
    '45m',
    TO_DATE('10/17/2008', 'MM/DD/YYYY'),
    331
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    209,
    'Queen Cleopatra',
    'Netflix docudrama about Queen Cleopatra of Egypt of the Ptolemaic lineage from Macedonia, Greece, that ruled for 21 years, between the years 51 BC and 30 BC, ending with her suicide.',
    1,
    10,
    'DOCUMENTARY',
    'DRAMA, HISTORICAL',
    'https://youtu.be/IktHcPyNlv4?si=CTMYFVF92RkOQp_M',
    'http://www.impawards.com/tv/posters/queen_cleopatra_ver2.jpg',
    '45m',
    TO_DATE('05/10/2023', 'MM/DD/YYYY'),
    4
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    210,
    'Planet Earth II',
    'David Attenborough returns with a new wildlife documentary that shows life in a variety of habitats.',
    6,
    10,
    'DOCUMENTARY',
    'DRAMA',
    'https://youtu.be/c8aFcHFu8QM?si=tcqWYimdA5-r2VUi',
    'https://m.media-amazon.com/images/M/MV5BMGZmYmQ5NGQtNWQ1MC00NWZlLTg0MjYtYjJjMzQ5ODgxYzRkXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
    '50m',
    TO_DATE('02/18/2017', 'MM/DD/YYYY'),
    6
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    211,
    'Taylor Swift: The Eras Tour',
    'Experience the Eras Tour concert, performed by the one and only Taylor Swift.',
    8,
    10,
    'DOCUMENTARY',
    'DRAMA, MUSIC',
    'https://youtu.be/KudedLV0tP0?si=5OEnETUXBRUfNzT1',
    'https://m.media-amazon.com/images/I/71IgsIs5+ZL._AC_UF894,1000_QL80_.jpg',
    '2h 49m',
    TO_DATE('10/12/2023', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    212,
    'Cosmos: A Spacetime Odyssey',
    'An exploration of our discovery of the laws of nature and coordinates in space and time.',
    9,
    10,
    'DOCUMENTARY',
    'DRAMA, SCI-FI',
    'https://youtu.be/_erVOAbz420?si=mcyI_VzEf7IRD3Bm',
    'https://m.media-amazon.com/images/M/MV5BZTk5OTQyZjYtMDk3Yy00YjhmLWE2MTYtZmY4NTg1YWUzZTQ0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg',
    '43m',
    TO_DATE('03/09/2014', 'MM/DD/YYYY'),
    13
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    213,
    'The Grab',
    'An investigative journalist uncovers the money, influence, and alarming rationale behind covert efforts to control the most vital resource on the planet.',
    7,
    10,
    'DOCUMENTARY',
    'DRAMA, MYSTERY',
    'https://youtu.be/dws3Rfn_ePo?si=7UQ-VbahYatTA4cb',
    'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2024/06/09181311/the-grab-poster-1037x1536.jpg',
    '1h 42m',
    TO_DATE('06/14/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    214,
    'Nathan for You',
    'Nathan Fielder uses his business degree and life experiences to help real small businesses turn a profit. But because of his unorthodox approach, Nathan''s genuine efforts to do good often draw real people into an experience far beyond what they signed up for.',
    9,
    10,
    'DOCUMENTARY',
    'COMEDY',
    'https://youtu.be/WNQ6_1GCVVA?si=tTbJV-AqjOgec7Qi',
    'https://m.media-amazon.com/images/M/MV5BOGY4ZWM1MDUtZmM3MS00ZjAxLTkyYzMtMjgxODI1YzkzNGUwXkEyXkFqcGdeQXVyNzk2NzE5Mjk@._V1_.jpg',
    '30m',
    TO_DATE('02/28/2013', 'MM/DD/YYYY'),
    32
);

INSERT INTO MEDIA ( MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE) 
VALUES (
    215,
    'The Last Dance',
    'Led by Michael Jordan, the 1990s Chicago Bulls establish themselves as one of the most notable dynasties in sports history.',
    9,
    10,
    'DOCUMENTARY',
    'HISTORICAL',
    'https://youtu.be/N9Z9JtNcCWY?si=Bi861IZb2w2EpL0D',
    'https://image.tmdb.org/t/p/original/oVf4xGGbDtwVHiKn8uTuSriY7PH.jpg',
    '49m',
    TO_DATE('04/19/2020', 'MM/DD/YYYY'),
    10
);





--------------------------------------------------------------------------------------------------------------------------------
-- INSERT INTO USERWATCHANDFAVORITE TABLE
--------------------------------------------------------------------------------------------------------------------------------


INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE, STATUS) 
    VALUES ('1234', 1, 'Y', 'PLAN_TO_WATCH');

INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE, STATUS)
    VALUES ('1234', 2, 'Y', 'PLAN_TO_WATCH');
    
INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE, STATUS) 
    VALUES ('1234', 3, 'Y', 'PLAN_TO_WATCH');

INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE, STATUS)
    VALUES ('1234', 4, 'Y', 'PLAN_TO_WATCH');
    
INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE, STATUS) 
    VALUES ('1234', 5, 'Y', 'PLAN_TO_WATCH');

INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE, STATUS)
    VALUES ('1234', 6, 'Y', 'PLAN_TO_WATCH');

INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE, STATUS) 
    VALUES ('1234', 7, 'Y', 'WATCHED');

INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE, STATUS)
    VALUES ('1234', 8, 'Y', 'WATCHED');

INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE, STATUS)
    VALUES ('1234', 9, 'Y', 'WATCHED');

INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE, STATUS)
    VALUES ('1234', 10, 'Y', 'WATCHED');

INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE, STATUS)
    VALUES ('1234', 11, 'Y', 'WATCHED');

INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE, STATUS)
    VALUES ('1234', 12, 'Y', 'WATCHED');



--------------------------------------------------------------------------------------------------------------------------------
-- INSERT INTO COMPANY TABLE
--------------------------------------------------------------------------------------------------------------------------------



INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (1, 'Walt Disney Studios Motion Pictures', 'company1', 'https://i.ytimg.com/vi/qGpWhGIMGbI/maxresdefault.jpg', 'Walt Disney Studios Motion Pictures is an American film distributor within the Disney Entertainment division of the Walt Disney Company.', 'walt@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (2, 'Paramount Pictures', 'company2', 'https://static1.srcdn.com/wordpress/wp-content/uploads/2018/02/Paramount-Logo-in-Yelllow.jpg', 'Paramount Pictures Corporation, doing business as Paramount Pictures is an American film and television production and distribution company and the namesake subsidiary of Paramount Global.', 'para@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (3, 'Warner Bros. Pictures', 'company3', 'https://wbd.com/wp-content/uploads/2024/01/wb-motion-pictures-group-16x9-1.png', 'Warner Bros. Pictures is an American film production and distribution company of the Warner Bros. Motion Picture Group division of Warner Bros. Entertainment. The studio is the flagship producer of live-action feature films within the Warner Bros', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (4, 'Warner Bros.', 'company4', 'https://logomak.com/blog/wp-content/uploads/2023/09/The-Evolution-and-Design-of-the-Warner-Brothers-Logo-min.png', 'Warner Bros. Entertainment Inc. is an American film and entertainment studio headquartered at the Warner Bros. Studios complex in Burbank, California, and a subsidiary of Warner Bros. Discovery.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (5, 'Roadshow Entertainment', 'company5', 'https://i.ytimg.com/vi/WuWiEr6Sokw/hqdefault.jpg', 'Roadshow Entertainment is an Australian home video, production and distribution company that is a division of Village Roadshow that distributes films in Australia and New Zealand. Their first release was Mad Max. Roadshow Entertainment is an independent video distributor in Australia and New Zealand.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (6, 'AA Films', 'company6', 'https://upload.wikimedia.org/wikipedia/en/5/5c/Aafilmslogo.jpg', 'AA Films is an Indian motion picture distribution company, owned by Anil Thadani. It mainly distributes Hindi films and Hindi-dubbed films.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (7, 'Netflix', 'company7', 'https://i.pcmag.com/imagery/reviews/05cItXL96l4LE9n02WfDR0h-5.fit_scale.size_760x427.v1582751026.png', 'Netflix is an American subscription video on-demand Internet streaming service. The service primarily distributes original and acquired films and television shows from various genres, and it is available internationally in multiple languages. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (8, 'Reliance Entertainment', 'company8', 'https://img.youtube.com/vi/pX3lCISMMFo/0.jpg', 'Reliance Entertainment Pvt. Ltd. is an Indian media and entertainment company. It is a division of Reliance Group, handling its media and entertainment business, across content and distribution platforms. The company was founded on 15 February 2005, as two entities, namely Reliance Big Entertainment and BIG Pictures. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (9, 'Orion Pictures', 'company9', 'https://pbs.twimg.com/profile_images/1549773030053650432/nFuqiKxZ_400x400.jpg', 'Orion Releasing, LLC is an American film production and distribution company owned by the Amazon MGM Studios subsidiary of Amazon. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (10, 'Alchemy', 'company10', 'https://www.cryptoninjas.net/wp-content/uploads/alchemy-crypto-ninjas.jpg', 'Alchemy was an American independent global film distributor based in Los Angeles, California. The company acquired and distributed feature films, television series and specialty programming. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (11, '20th Century Studios', 'company11', 'https://cdn-p.smehost.net/sites/2705a69cf9104eb6898f7ee189d0162a/wp-content/uploads/2019/05/FoxHomeEnts-940x528.jpg', '20th Century Studios, Inc. is an American film studio owned by the Walt Disney Studios, a division of Disney Entertainment, in turn a division of The Walt Disney Company. It is headquartered at the Fox Studio Lot in the Century City area of Los Angeles, leased from Fox Corporation.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (12, 'Paramount Home Entertainment', 'company12', 'https://variety.com/wp-content/uploads/2015/08/paramount-home-media-distribution.jpg', 'Paramount Home Entertainment is the home video distribution arm of Paramount Pictures. The division oversees Paramount Global''s home entertainment and transactional digital distribution activities worldwide.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (13, 'Sony Pictures', 'company13', 'https://variety.com/wp-content/uploads/2017/09/sony-pictures.jpg', 'Sony Pictures Entertainment Inc. is an American diversified multinational mass media and entertainment studio conglomerate that produces, acquires, and distributes filmed entertainment through multiple platforms.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (14, 'Lightstorm Entertainment', 'company14', 'https://i.ytimg.com/vi/cgkfH7bS-To/maxresdefault.jpg', 'Lightstorm Entertainment is an American independent production company founded in 1990 by filmmaker James Cameron and producer Lawrence Kasanoff. The majority of its films have been distributed and owned by 20th Century Fox, now known as 20th Century Studios.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (15, 'TSG Entertainment', 'company15', 'https://i.ytimg.com/vi/cDpYQzO_Jm0/maxresdefault.jpg', 'TSG Entertainment Finance LLC, doing business as TSG Entertainment, is an American film financing entity. TSG was established after the U.S. theatrical release of Parental Guidance to replace Dune Entertainment when Dune did not renew their deal with 20th Century Fox.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (16, 'Lionsgate Films', 'company16', 'https://www.closinglogos.com/images/thumb/7/77/TsqMR9stjM8GK71isbEwBw94345.jpeg/285px-TsqMR9stjM8GK71isbEwBw94345.jpeg', 'Lionsgate Films is a Canadian-American film production and distribution studio founded in Canada in 1962. It is now a division of Lionsgate Studios and headquartered in Santa Monica. Lionsgate is the largest and most successful mini-major film studio in North America.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (17, 'Toho Co., Ltd.', 'company17', 'https://pbs.twimg.com/profile_images/1281305042209964032/sCrCxbs-_200x200.jpg', 'Toho Co., Ltd. is a Japanese entertainment company primarily engaged in the production and distribution of films and the production and exhibition of stage plays. Its headquarters is in Chiyoda, Tokyo, and is one of the core companies of the Osaka-based Hankyu Hanshin Toho Group. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (18, 'Metro-Goldwyn-Mayer', 'company18', 'https://i.ytimg.com/vi/5G8mZ7Aw13Q/maxresdefault.jpg', 'Metro-Goldwyn-Mayer Studios Inc., is an American media company specializing in film and television production and distribution based in Beverly Hills, California. It was founded on April 17, 1924 and has been owned by the Amazon MGM Studios subsidiary of Amazon since 2022. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (19, 'United Artists', 'company19', 'https://variety.com/wp-content/uploads/2019/02/ua-logo-.jpg', 'United Artists Corporation was an American production and distribution company founded in 1919 by Charlie Chaplin, D.W. Griffith, Mary Pickford and Douglas Fairbanks as a venture premised on allowing actors to control their own financial and artistic interests rather than being dependent upon commercial studios.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (20, 'FilmFlex', 'company20', 'https://cdn.broadbandtvnews.com/wp-content/uploads/2015/02/14121141/filmflex.jpg', 'FilmFlex, is an on-demand movie rental services provider, claiming to be largest outside the US. The service originally launched as a joint venture between Sony Pictures Television and The Walt Disney Company, but it was sold in 2014 to Vubiquity. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (21, 'Turner Entertainment', 'company21', 'https://logodix.com/logo/1037760.jpg', 'Turner Entertainment Company is an American multimedia company founded by Ted Turner on August 2, 1986. Purchased by Time Warner Entertainment on October 10, 1996, as part of its acquisition of Turner Broadcasting System, the company was largely responsible for overseeing the TBS library for worldwide distribution.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (22, 'A24', 'company22', 'https://static1.moviewebimages.com/wordpress/wp-content/uploads/article/XTNSa7q35FZTYnHI2j2qVeLS7Iogxu.jpg', 'A24 Films LLC, commonly referred to as A24, is an American independent entertainment company that specializes in film and television production, as well as film distribution. The company is based in Manhattan. The company was founded in 2012 by Daniel Katz, David Fenkel, and John Hodges.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (23, 'Pen Studios', 'company23', 'https://upload.wikimedia.org/wikipedia/commons/7/7a/PEN_STUDIO_LOGO.jpg', 'Pen Studios is an Indian film production and distribution company established by Dr. Jayantilal Gada on 31 March 1987. Based in Mumbai, it mainly produces and distributes Hindi, Telugu and Tamil films. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (24, 'Amazon MGM Studios', 'company24', 'https://deadline.com/wp-content/uploads/2023/11/Amazon-MGM-Studios-Logo.jpg', 'Amazon MGM Studios, formerly Amazon Studios, is an American film and television production and distribution studio owned by Amazon launched in 2010. It took its current name in 2023 following its merger with MGM Holdings, which Amazon had acquired the year prior.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (25, 'Neon', 'company25', 'https://theneoncompany.shop/wp-content/uploads/2022/06/gradient-logo.png', 'Neon Rated, LLC, doing business as Neon, is an American independent film production and distribution company founded in 2017 by CEO Tom Quinn and Tim League, who also was the co-founder of the Alamo Drafthouse Cinema chain. As of 2019, League is no longer involved with daily operations for the company.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (26, 'Universal Pictures', 'company26', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Universal_Pictures_logo.svg/1200px-Universal_Pictures_logo.svg.png', 'Universal City Studios LLC, doing business as Universal Pictures is an American film production and distribution company that is a division of Universal Studios, which is owned by NBCUniversal, a division of Comcast.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (27, 'Sony Pictures Entertainment Japan', 'company27', 'https://i.ytimg.com/vi/eFhOLqrA8D0/maxresdefault.jpg', 'Sony Pictures Entertainment Japan Inc., abbreviated SPE or SPEJ, is a Japanese film studio, based in Minato-ku, Tokyo. It is a wholly owned subsidiary of Japanese conglomerate Sony Group Corporation, with the majority of SPEJ''s shares held by Sony Pictures Entertainment.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (28, 'Columbia Pictures', 'company28', 'https://c8.alamy.com/comp/K3M8K5/columbia-pictures-a-colour-rhapsody-in-technicolor-columbia-pictures-K3M8K5.jpg', 'Columbia Pictures Industries, Inc., commonly known as Columbia Pictures or simply Columbia, is an American film production and distribution company that is a member of the Sony Pictures Motion Picture', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (29, 'Miramax', 'company29', 'https://www.indiewire.com/wp-content/uploads/2017/10/miramax.jpg', 'Miramax, LLC, formerly known as Miramax Films, is an American independent film and television production and distribution company founded on December 19, 1979, by Harvey and Bob Weinstein, and based in Los Angeles, California. Today, it is owned by beIN Media Group and Paramount Global. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (30, 'New Line Cinema', 'company30', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/New_Line_Cinema_2024.svg/1200px-New_Line_Cinema_2024.svg.png', 'New Line Productions, Inc., doing business as New Line Cinema, is an American film and television production studio owned by Warner Bros. Discovery. Since 2008, it has been operating as a unit of Warner Bros. Pictures.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (31, 'RKO Pictures', 'company31', 'https://live.staticflickr.com/7423/9539125455_60333f0801_b.jpg', 'RKO Radio Pictures Inc., commonly known as RKO Pictures or simply RKO, was an American film production and distribution company, one of the "Big Five" film studios of Hollywood''s Golden Age.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (32, 'Amazon Prime Video', 'company32', 'https://i.pcmag.com/imagery/reviews/02dIsBiVpmVTMeXkrKxWy0W-13.fit_scale.size_760x427.v1582749138.png', 'Amazon Prime Video, or simply Prime Video, is an American subscription video on-demand over-the-top streaming and rental service of Amazon offered both as a stand-alone service and as part of Amazon''s Prime subscription.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (33, 'HBO', 'company33', 'https://c.dlnws.com/image/upload/c_limit,f_auto,q_auto,w_1800/v1503592425/Blog/HBO_2.jpg', 'Home Box Office is an American pay television network, which is the flagship property of namesake parent-subsidiary Home Box Office, Inc., itself a unit owned by Warner Bros. Discovery. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (34, 'Bighead, Littlehead', 'company34', 'https://i.ytimg.com/vi/cqIQ8lOZAlg/maxresdefault.jpg', 'Netflix / Bighead Littlehead - Taken from a teen music drama film "Metal Lords" (2022)., #logo #identity #label , This video shows content that is not owned by us. All the rights goes to the original.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (35, 'Pierrot', 'company35', 'https://ih1.redbubble.net/image.5221021342.6521/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg', 'Pierrot Co., Ltd. is a Japanese animation studio established in May 1979 by Yuji Nunokawa, previously an animator and director for Tatsunoko Production. Its headquarters are located in Mitaka, Tokyo', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (36, 'The Mighty Mint', 'company36', 'https://images.squarespace-cdn.com/content/v1/5cfeb36e27582b000108967b/e4eebee7-03ab-44b4-905d-83afacf525ea/tv-work-mightymint.jpg', 'The Mighty Mint. Company Details: Address: 8340 Melrose Ave, West Hollywood ... film and tv projects currently in pre-production and active development.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (37, 'Production I.G', 'company37', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Production_I.G_Logo.svg/1200px-Production_I.G_Logo.svg.png', 'Production I.G, Inc. is a Japanese animation studio and production enterprise. Headquartered in Musashino, Tokyo Production I.G was founded on December 15, 1987, by producer Mitsuhisa Ishikawa .', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (38, 'Black Isle Studios', 'company38', 'https://images.fallout.wiki/5/5c/Black_Isle_logo.png', 'Black Isle Studios is a division of the developer and publisher Interplay Entertainment formed in 1996 that develops role-playing video games. It has published several games from other developers. Black Isle is based in Irvine, California.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (39, 'Interplay Entertainment', 'company39', 'https://www.gematsu.com/wp-content/uploads/2022/02/Company-Logo_Interplay-Init.png', 'Interplay Entertainment Corp. is an American video game developer and publisher based in Los Angeles. The company was founded in 1983 as Interplay Productions by developers Brian Fargo, Jay Patel, Troy Worrell, and Rebecca Heineman, as well as investor Chris Wells.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (40, 'Square Enix', 'company40', 'https://w7.pngwing.com/pngs/745/167/png-transparent-square-enix-hd-logo-thumbnail.png', 'Square Enix Holdings Co., Ltd. is a Japanese multinational holding company, video game publisher and entertainment conglomerate. It releases role-playing game franchises, such as Final Fantasy, Dragon Quest, and Kingdom Hearts, among numerous others.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (41, 'STARZ', 'company41', 'https://i.pcmag.com/imagery/reviews/001BnpRT6eF1fQN8if2FwZ2-5..v1569476173.png', 'Starz is an American premium cable and satellite television network owned by Lionsgate, and is the flagship property of parent subsidiary Starz Inc. Programming on Starz consists of theatrically released motion pictures and first-run original television series.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (42, 'FX Productions', 'company42', 'https://pbs.twimg.com/profile_images/707883264762114049/tW3aSUbA_400x400.jpg', 'FX Productions, LLC is an American television and in-house production company owned by FX Networks, a division of the Disney Entertainment unit of The Walt Disney Company. The studio currently produces series for FX, FXX and FX on Hulu.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (43, 'Kinema Citrus', 'company43', 'https://www.animenewsnetwork.com/hotlink/thumbnails/crop600x315gIK/cms/news.2/148486/kinemacitrus.jpg', 'Kinema Citrus Co., Ltd. is a Japanese animation studio, founded on March 3, 2008, by former Production I.G and Bones members and based in Suginami, Tokyo. Its business directors are Muneki Ogasawara, Yuichiro Matsuka and Masaki Tachibana', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (44, 'NBC', 'company44', 'https://thevpn.guru/wp-content/uploads/2017/10/How-to-Watch-NBC-outside-USA-Unblock-in-UK-Canada-e1508134329932.jpg', 'The National Broadcasting Company is an American commercial broadcast television and radio network serving as the flagship property of the NBC Entertainment division of NBCUniversal, a subsidiary of Comcast. The headquarters of NBC is in New York City at the Comcast Building. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (45, 'Apple TV+', 'company45', 'https://i.blogs.es/bf7298/netflix-vs-apple-tv-hbo-max-amazon-hulu-disney-prices-and-shows/450_1000.jpg', 'Apple TV+ is an American subscription OTT streaming service owned and operated by Apple Inc. Launched on November 1, 2019, it offers a selection of original production film and television series called Apple Originals.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (46, 'Media Factory', 'company46', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Media_Factory_logo.svg/1600px-Media_Factory_logo.svg.png', 'Media Factory (??????????, Mediafakutor?), formerly known as Media Factory, Inc. (??????????????, Kabushiki gaisha Mediafakutor?), doing business as Media Factory, is a Japanese publisher and brand company of Kadokawa Future Publishing.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (47, 'Shondaland', 'company47', 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Images.Shondaland.png', 'Shondaland is an American television production company founded by television writer and producer Shonda Rhimes. She founded it to be one of the production companies of her first series, the medical drama Grey''s Anatomy in 2005.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (48, 'USA Network', 'company48', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/USA-Network-Logo.svg/2560px-USA-Network-Logo.svg.png', 'USA Network is an American basic cable television channel owned by the NBCUniversal Media Group division of Comcast''s NBCUniversal. It was originally launched in 1977 as Madison Square Garden Sports Network, one of the first national sports cable television channels. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (49, 'PlayStation', 'company49', 'https://matrixwarehouse.co.za/wp-content/uploads/2020/11/playstation.jpg', 'The PlayStation is a home video game console developed and marketed by Sony Computer Entertainment. It was released in Japan on 3 December 1994, in North America on 9 September 1995, in Europe on 29 September 1995, and in Australia on 15 November 1995', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (50, 'Wonderland Sound and Vision', 'company50', 'https://i.ytimg.com/vi/20-EJZ22KCw/maxresdefault.jpg', 'Wonderland Sound and Vision, or simply known as Wonderland, is an American production company founded by director and producer Joseph McGinty Nichol in 2001. It independently develops, produces and finances its own slate of feature films, television and digital projects. The company is responsible for television series The O.C., Chuck, and Supernatural, alongside films Terminator Salvation, We Are Marshall, The DUFF and The Babysitter.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (51, 'Warner Bros. Television Studios', 'company51', 'https://images.seeklogo.com/logo-png/52/1/warner-bros-studios-2024-logo-png_seeklogo-527162.png', 'Warner Bros. Television Studios is an American television production and distribution studio of the Warner Bros. Television Group division of Warner Bros.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (52, 'Bones', 'company52', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4b0c8131939375.56677dba15c38.jpg', 'Bones Inc. (Japanese: ???????, Hepburn: Kabushiki-gaisha Bonzu) is a Japanese animation studio. It has produced numerous series, including RahXephon, No. 6, Wolf''s Rain, Scrapped Princess, Eureka Seven, Angelic Layer, Darker than Black, Soul Eater, Ouran High School Host Club, both the 2003 and 2009 adaptations of Fullmetal Alchemist, Star Driver, Gosick, Mob Psycho 100, Space Dandy, Noragami, Bungo Stray Dogs, and My Hero Academia. Its headquarters are located in Igusa, Suginami, Tokyo.[2]', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (53, 'AMC Studio', 'company53', 'https://i.ytimg.com/vi/UyWkXynxKMM/maxresdefault.jpg', 'AMC is the largest movie exhibition company in the United States and the largest throughout the world with approximately 900 theatres and 10,000 screens across the globe.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (54, 'CBS Studios', 'company54', 'https://w7.pngwing.com/pngs/742/231/png-transparent-kyw-tv-cbs-news-television-show-cbs-news-logo-television-text-trademark.png', 'CBS Studios, Inc. is an American television production company which is a subsidiary of the CBS Entertainment Group unit of Paramount Global. It was formed on January 17, 2006, by CBS Corporation as CBS Paramount Television, as a renaming of the original incarnation of the Paramount Television studio. ', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (55, 'Shueisha', 'company55', 'https://i.ytimg.com/vi/t0CGjYVr4Yw/hqdefault.jpg', 'Shueisha Inc. is a Japanese publishing company headquartered in Chiyoda, Tokyo, Japan. Shueisha is the largest publishing company in Japan. It was established in 1925 as the entertainment-related publishing division of Japanese publisher Shogakukan. The following year, Shueisha became a separate, independent company.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (56, 'MGM+', 'company56', 'https://corp.epix.com/wp-content/uploads/2023/01/Working-At-MGM-section.jpg', 'MGM+, is an American premium cable and satellite television network owned by the MGMPlus Entertainment subsidiary of Metro-Goldwyn-Mayer, which is itself a subsidiary of Amazon MGM Studios.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (57, 'Wit Studio', 'company57', 'https://pbs.twimg.com/profile_images/758103228911382528/ddk_Mekd_400x400.jpg', 'Wit Studio, Inc., stylized as WIT Studio, is a Japanese animation studio founded on June 1, 2012, by producers at Production I.G as a subsidiary of IG Port.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (58, 'MAPPA', 'company58', 'https://miro.medium.com/v2/resize:fit:1400/1*zZbzs4vBEH3kTie-NGglXQ.jpeg', 'MAPPA Co., Ltd. is a Japanese animation studio headquartered in Suginami, Tokyo. Founded in 2011 by Madhouse co-founder and producer Masao Maruyama, it has produced anime works including Terror in .', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (59, 'Nippon TV', 'company59', 'https://static.tvtropes.org/pmwiki/pub/images/nippon_tv_logo_2014.png', 'The Nippon Television Network Corporation, also known as Nippon Television, with the call sign JOAX-DTV, is a Japanese television station serving the Kant? region as the flagship station of the Nippon News Network and the Nippon Television Network System.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (60, 'Japan Studio', 'company60', 'https://static1.srcdn.com/wordpress/wp-content/uploads/2021/07/Japan-Studio-removed-from-PlayStation-Studios-website.jpg', 'Japan Studio was a Japanese video game developer based in Tokyo. A first-party studio for Sony Interactive Entertainment, it was best known for the Ape Escape, LocoRoco, Patapon, Gravity Rush, and Knack series, the Team Ico games, Bloodborne, The Legend of Dragoon, and Astro''s Playroom.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (61, 'Madhouse, Inc.', 'company61', 'https://pbs.twimg.com/profile_images/1522526028912025601/KHMwfsr8_400x400.jpg', 'Madhouse, Inc. is a Japanese animation studio founded in 1972 by ex–Mushi Pro staff, including Masao Maruyama, Osamu Dezaki, and Yoshiaki Kawajiri.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (62, 'Toho Animation', 'company62', 'https://pbs.twimg.com/profile_images/1782960038086393856/aet3ZyAR_400x400.jpg', 'Toho Co., Ltd. (??????, T?h? Kabushiki-gaisha) is a Japanese entertainment company primarily engaged in the production and distribution of films and the production and exhibition of stage plays.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (63, 'Kyoto Animation', 'company63', 'https://ultimatemegax.wordpress.com/wp-content/uploads/2015/03/kyotoanimationlogo.jpg', 'Kyoto Animation Co., Ltd., often abbreviated KyoAni, is a Japanese animation studio and light novel publisher located in Uji, Kyoto Prefecture. It was founded in 1985 by husband and wife Hideaki and Yoko Hatta, who remain its president and vice-president respectively.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (64, 'Mindhouse', 'company64', 'https://pbs.twimg.com/profile_images/1610556562652729344/RKvkyBOb_400x400.jpg', 'Documentary movies are found here.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (65, 'MY Tupelo Entertainment', 'company65', 'https://pbs.twimg.com/media/Et3QLu2VkAQz2US.jpg', 'My Tupelo Entertainment LLC is a startup company that was incorporated in DE. This company profile was created to provide more information about My Tupelo Entertainment LLC, a private company.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (66, 'Taylor Swift Productions', 'company66', 'https://upload.wikimedia.org/wikipedia/en/8/8e/Taylor_Swift_Productions_logo.jpg', 'Taylor Swift Productions, Inc. is the in-house visual media production company of the American singer-songwriter Taylor Swift. It was first credited in the DVD and Bluray version of Speak Now World Tour – Live in 2011 and has produced all of Swift''s visual media works since 2018, including her music videos and films.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (67, 'Fuzzy Door Productions', 'company67', 'https://i1.sndcdn.com/avatars-000274822782-fh91j3-t500x500.jpg', 'Fuzzy Door Productions, Inc. is an American film and television production company founded by Seth MacFarlane in 1998.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (68, 'Impact Partners', 'company68', 'https://www.techbarcelona.com/wp-content/uploads/image-418.jpeg', 'Impact Partners is an American film production and television production company founded in 2007, by Dan Cogan and Geralyn Dreyfous. The company primarily produces documentary films focusing on social issues.', 'sample@gmail.com');

INSERT INTO COMPANY (COM_ID, NAME, USER_NAME, IMG, DESCRIPTION, EMAIL) 
VALUES (69, 'Mainstream media', 'company69', 'https://e7.pngegg.com/pngimages/68/96/png-clipart-mainstream-media-logo-mass-media-news-live-broadcast-thumbnail.png', 'In journalism, mainstream media is a term and abbreviation used to refer collectively to the various large mass news media that influence many people and both reflect and shape prevailing currents of thought. The term is used to contrast with alternative media.', 'sample@gmail.com');


--------------------------------------------------------------------------------------------------------------------------------
-- INSERT INTO COMPANYHASMEDIA TABLE
--------------------------------------------------------------------------------------------------------------------------------


INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (3, 1);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (4, 1);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (5, 1);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (6, 2);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (6, 3);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (7, 4);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (8, 1);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (9, 3);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (9, 4);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (9, 5);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (10, 3);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (10, 4);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (41, 6);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (44, 7);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (45, 8);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (46, 9);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (47, 3);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (47, 10);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (49, 11);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (51, 11);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (51, 2);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (51, 12);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (55, 7);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (56, 7);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (57, 13);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (59, 11);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (59, 14);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (59, 15);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (61, 16);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (62, 17);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (64, 11);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (65, 18);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (65, 4);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (65, 3);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (65, 19);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (65, 20);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (65, 21);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (66, 22);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (67, 23);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (69, 24);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (70, 25);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (72, 2);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (12, 3);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (12, 4);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (13, 27);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (14, 2);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (15, 1);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (16, 2);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (17, 4);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (17, 28);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (18, 29);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (18, 20);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (19, 30);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (20, 4);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (20, 2);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (20, 31);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (21, 7);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (22, 1);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (23, 7);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (24, 3);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (24, 4);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (24, 20);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (25, 3);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (26, 17);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (27, 17);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (76, 32);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (77, 33);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (77, 34);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (28, 35);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (78, 36);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (29, 37);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (80, 38);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (80, 39);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (30, 40);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (81, 41);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (82, 42);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (31, 43);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (58, 44);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (84, 45);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (32, 46);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (85, 47);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (33, 35);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (86, 48);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (87, 33);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (34, 49);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (88, 7);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (89, 50);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (89, 51);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (35, 37);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (90, 4);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (36, 46);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (91, 32);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (92, 7);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (93, 47);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (37, 52);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (94, 53);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (95, 54);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (38, 55);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (96, 56);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (39, 57);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (39, 58);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (40, 59);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (200, 60);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (200, 61);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (201, 62);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (202, 63);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (203, 59);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (204, 18);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (205, 64);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (206, 7);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (207, 7);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (208, 65);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (209, 7);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (211, 66);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (212, 67);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (213, 68);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (214, 69);

INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) 
VALUES (215, 7);


--------------------------------------------------------------------------------------------------------------------------------, 0, 0
-- INSERT INTO PRODUCTS TABLE
-------------------------------------------------------------------------------------------------------------------------------, 0, 0-


INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (100, 'Interstellar Essential T-Shirt', 'Everyday tee, crew neck, slim fit', 'https://ih1.redbubble.net/image.5087401540.6885/ssrco,slim_fit_t_shirt,mens,101010:01c5ca27c6,front,square_product,600x600.u5.jpg', 21.73, 5, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (101, 'hamilton interstellar watch', 'Hamilton Khaki Navy Automatic Green Dial Sprite Bezel Men''s Watch H82375161', 'https://www.watchvault.com.au/cdn/shop/files/HamiltonKhakiAviationPilotDayDateAuto_Interstellar_H64615135-2020WatchVault03_2048x.jpg', 631.4, 2, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (102, 'Inception Top Totem Spinning Metal', 'Made from high grade Zinc Alloy and each top should spin for at least 3 minutes', 'https://m.media-amazon.com/images/I/51eLkYY0r6L._AC_SL1292_.jpg', 20.0, 2, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (103, '"Inception" inspired poster', 'INCEPTION film poster, minimalist art print, mid-century modern, beige, grey, Swiss, Helvetica, Christopher Nolan, Leonardo DiCaprio', 'https://i.etsystatic.com/42043278/r/il/d5b8d6/6247326852/il_1588xN.6247326852_ov48.jpg', 11.56, 4, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (104, 'The Silence of the Lambs movie Canvas ', 'The Silence of the Lambs FILMS movie Canvas Art Poster unframe multiple choice-12x18''''24x36''', 'https://i.etsystatic.com/26687163/r/il/c55157/6078033999/il_1588xN.6078033999_b210.jpg', 12.75, 5, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (105, 'The Silence Of The Lambs Movie Barcode', 'Celebrate your favourite movies with our unique movie barcode prints. I use video imaging software to watch the The Silence Of The Lambs movie and extrapolate the average color of each scene in the movie. This print then features these colors displayed as a barcode. The perfect gift for any movie fan that loves a unique data representation', 'https://i.etsystatic.com/31803080/r/il/953835/5423830786/il_1588xN.5423830786_se8e.jpg', 14.4, 3, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (106, 'Chandu Champion design T-Shirt', 'Here is my design of Kartik aryan from chandu champion.. Hope you like it Pickup your favourite one merchandise.', 'https://ih1.redbubble.net/image.5568573715.8823/ssrco,slim_fit_t_shirt,flatlay,4f4942:33c5b16199,front,wide_portrait,750x1000-bg,f8f8f8.jpg', 23.0, 5, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (107, 'Psycho Scream Print-Classic Horror Movie Poster', 'Museum-quality print made on thick and long-lasting matte (uncoated) paper with high quality inks producing striking images for wall decor, gifts, projects, collections, and more!', 'https://i.etsystatic.com/37337950/r/il/f02c64/5099389131/il_1588xN.5099389131_kmj5.jpg', 16.2, 6, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (108, 'Retro Psycho 1960 Shirt -Alfred Hitchcock Shirt', 'Our products are unisex and true to size. If you prefer an oversized fit, we recommend ordering 1 or 2 sizes larger than your usual size.', 'https://i.etsystatic.com/53028486/r/il/ddacce/6277595761/il_1588xN.6277595761_ptre.jpg', 20.0, 10, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (109, 'Forrest Gump (1994) Movie Poster Print', 'Canvas Fabric, smooth, not easily deformed, particularly the printing is more realistic, waterproof, durable and Long Lasting. It is ideal for gifts and personal collections.', 'https://i.etsystatic.com/45320799/r/il/7d8db7/5354241887/il_1588xN.5354241887_oj1r.jpg', 8.57, 4, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (110, 'Forrest Gump Point', 'Forrest Gump Point'', this image has been on my bucket list for decades, and I finally got it a couple weeks ago. To get great shots like this one, you simply must be there, at the right time, in the right light, with the right preparation. It is my extreme pleasure to bring you one of my most cherished shots from anywhere. I am making it available in various materials, sizes and price points, so that anyone on any budget who appreciates the moment captured in this image can take it home.', 'https://i.etsystatic.com/36721239/r/il/630bff/5925739127/il_1588xN.5925739127_skif.jpg', 49.0, 5, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (111, 'Shawshank Redemption Unisex Sweatshirt', 'A sturdy and warm sweatshirt bound to keep you warm in the colder months. A pre-shrunk, classic fit sweater that''s made with air-jet spun yarn for a soft feel and reduced pilling', 'https://i.etsystatic.com/16104183/r/il/02cd11/2344895056/il_1588xN.2344895056_cyky.jpg', 35.0, 10, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (112, 'SHAWSHANK REDEMPTION Vintage Tshirt', '100% cotton (fiber content may vary for different colors)
Medium fabric (5.3 oz/yd² (180 g/m²))
Classic fit
Tear-away label
Runs true to size', 'https://i.etsystatic.com/43160006/r/il/43d969/5677612058/il_1588xN.5677612058_bpkk.jpg', 30.95, 5, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (113, 'Metal Pulp Fiction Wall Art', 'Metal Pulp Fiction Wall Art is an inspirational wall art for living room, bedroom, dining room, kitchen and for your entire home. Metal Pulp Fiction Wall Art will make you wanna dance all night just like Mia Wallace and Vincent Vega. Your guests will most likely adore this unique piece of art.
', 'https://i.etsystatic.com/33176996/r/il/f7a2cf/3983083566/il_1588xN.3983083566_cfmu.jpg', 120.0, 2, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (114, 'Pulp Fiction (1993) Screenplay', 'This is a full screenplay / movie script in English that comes with preprinted autographs from the cast! If you have been searching for the perfect gift for a movie fan, this is it! This full movie script / screenplay with preprinted autographs is sure to please. It makes for a great gift because it’s unique, authentic, and rare.', 'https://i.etsystatic.com/44907333/r/il/e2aedf/5084300572/il_1588xN.5084300572_j148.jpg', 33.48, 1, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (115, 'Elves Elf Boat Castle The Lord Of The Rings light box', 'Are you a believer in the mystical world of ""Lord of the Rings""? Let Elves help you turn your living space into a magical world with unique box lights inspired by this classic!', 'https://i.etsystatic.com/31580870/r/il/ed1512/6297848841/il_1588xN.6297848841_at00.jpg', 185.0, 8, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (116, '6 in 1 bundle The Fellowship of the Ring Crochet Pattern', 'The Fellowship of the Ring Crochet Pattern, English pattern quick and easy pattern', 'https://i.etsystatic.com/53018604/r/il/b5c853/6119293698/il_1588xN.6119293698_lmdh.jpg', 19.23, 10, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (117, 'The Boys Movie Poster ', 'Poster is printed on Waterproof canvas, it is thick, strong, waterproof, it has the vivid color and will not fade, not easy to be damaged and shows vibrant graphics on it. It becomes more and more popular with the cool crowd.
', 'https://i.etsystatic.com/51464994/r/il/a3f5eb/6179145815/il_1588xN.6179145815_ru1i.jpg', 15.45, 3, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (118, 'Fire Dragon and Ice Dragon Resin Lamp', 'This resin night light features a magical sight with three little dragons flying across the sky. Its beauty lies not only in the exquisite details but also in the dreamy ambiance it creates. The dragons, crafted from epoxy resin, delicately reflect light, producing a shimmering effect akin to bright stars in the night sky. This light is not just a decorative piece but also an artwork, bringing warmth and style to your living space.
', 'https://i.etsystatic.com/42604617/r/il/a8da1d/5853600023/il_1588xN.5853600023_70pq.jpg', 114.0, 3, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (119, 'Game of Thrones Coaster Set', 'Depicting the sigils of all four Great Houses of Westeros, these coasters are a unique way to celebrate your love of A Song of Ice and Fire. Made from hand selected cherry boards, each piece is one of a kind. Individually milled, engraved, and hand finished, they work perfectly for hot and cold drinks all year round. Included with these unique coasters is a hand built display box which will keep all four like a perfect wooden throne.
', 'https://i.etsystatic.com/20160004/r/il/365476/1870250368/il_1588xN.1870250368_nd2b.jpg', 45.0, 4, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (120, 'The Last of Us Ellie''s Journal Cosplay Props Replica', 'The journal is A5 size, which is 5.8 inches x 8 inches, contains content from The Last of Us Part II', 'https://i.etsystatic.com/19424222/r/il/1eea81/5123734983/il_1588xN.5123734983_gb0q.jpg', 68.5, 25, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (121, 'JOEL MUG (THE LAST OF US II) FANMADE', 'THE MUG IS PROFESSIONALLY MADE, INSPIRED BY THE ORIGINAL LOOK OF JOEL''S MUG IN THE LAST OF US PART II. INCLUDES A BOX TO DISPLAY IT WITH YOUR TLOU COLLECTION.', 'https://i.etsystatic.com/24433473/r/il/ba026f/3584208411/il_1588xN.3584208411_jt9l.jpg', 57.8, 5, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (122, ' House of Dragon Adjustable Ring', '14k Matt gold plating, oxidized silver, black oxidized silver, white silver, ring 14 mm height', 'https://i.etsystatic.com/10988505/r/il/c05308/4345385551/il_1588xN.4345385551_8e60.jpg', 69.0, 4, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (123, 'Rhaenyra and Aegon Crowns, House of the Dragon', 'This is a replica of Crown of Jaehaerys I based on series and is not an official item. King of The Seven Kingdoms Crown', 'https://i.etsystatic.com/39161474/r/il/c61d9e/6032700511/il_1588xN.6032700511_614c.jpg', 84.56, 2, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (124, 'Japanese Anime Music Box', 'Unleash the epic world of Attack on Titan with our thrilling music box. For fans of action and adventure, this handcrafted masterpiece is an absolute must-have. It pays homage to the relentless battle against the Titans, showcasing the courage and determination that define the series. Gift it to fellow fans or proudly display it as a symbol of your dedication to the Scout Regiment. 
', 'https://i.etsystatic.com/41975262/r/il/75ddcb/4799778382/il_1588xN.4799778382_orl5.jpg', 21.83, 5, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (125, 'Erwin Smith Speech Hoodie', 'Erwin Smith Speech Hoodie: A Tribute to Attack on Titan. Immerse yourself in the valor and determination of the Scouts Regiment with our Erwin Smith Speech Hoodie. Inspired by the iconic and motivational speeches of Commander Erwin Smith from "Attack on Titan" (Shingeki no Kyojin), this hoodie is a must-have for fans who admire his leadership and the thrilling saga of humanity''s fight for survival. Designed for both warmth and style, this hoodie is your shield against the cold and a banner of your fandom.', 'https://i.etsystatic.com/52597500/r/il/230191/6216527248/il_1588xN.6216527248_e2lm.jpg', 55.22, 7, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (126, 'Fallout T-shirt', 'This T-shirt is inspired by the classic post-apocalyptic RPG series Fallout. Screen-printed on Earth Positive 100% combed organic cotton T-shirts.
', 'https://i.etsystatic.com/17927977/r/il/debbb5/5857675522/il_1588xN.5857675522_fp0a.jpg', 34.75, 7, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (127, 'Explosion Resin diorama', 'This resin lamp conveys the message that we should cherish our lives because we don''t know what will happen. The light is powered by 5VDC via the USB type C charging port. A USB Type C charging cable is included.
', 'https://i.etsystatic.com/40890130/r/il/b5131b/6112626262/il_1588xN.6112626262_flnz.jpg', 108.0, 3, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (128, 'Outlander 10th Anniversary 2014-2024 Signatures Shirt', 'If you love youthful personality style, you will definitely be conquered by these hoodies/sweatshirts/t-shirts. Simple and uncompromising when combined with any item. It makes a thoughtful Birthday gift, Christmas gift, Mother''s Day gift, Holiday gift, etc.', 'https://i.etsystatic.com/39484573/r/il/9590f2/5763359631/il_1588xN.5763359631_azsa.jpg', 30.06, 6, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (129, 'Outlander ring sterling silver', 'Silver outlander ring 925 sterling silver ring for celtic wedding, Scottish wedding ring in brutalist style.Rustic wedding band for her or him.', 'https://i.etsystatic.com/35531844/r/il/ee6920/5234248329/il_1588xN.5234248329_jnm3.jpg', 45.18, 7, 0, 0);

INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY, RATING_COUNT, RATING) 
VALUES (130, 'The Bear TV Show Shirt', 'Graphic t-shirt of The Beef logo signage outside of the restaurant in Chicago.
', 'https://i.etsystatic.com/45843620/r/il/788fa9/5585868454/il_1588xN.5585868454_6q5i.jpg', 24.0, 10, 0, 0);





--------------------------------------------------------------------------------------------------------------------------------, 0, 0
-- MERCHPRODUCEPROD
-------------------------------------------------------------------------------------------------------------------------------, 0, 0-

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (100, 1235);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (101, 1235);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (102, 1235);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (103, 1235);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (104, 1235);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (105, 1235);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (106, 1235);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (107, 1235);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (108, 1235);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (109, 1235);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (110, 1236);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (111, 1236);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (112, 1236);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (113, 1236);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (114, 1236);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (115, 1236);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (116, 1236);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (117, 1236);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (118, 1236);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (119, 1236);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (120, 1237);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (121, 1237);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (122, 1237);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (123, 1237);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (124, 1237);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (125, 1237);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (126, 1237);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (127, 1237);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (128, 1237);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (129, 1237);

INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID) 
VALUES (130, 1235);

--------------------------------------------------------------------------------------------------------------------------------, 0, 0
-- COLLABORATE
-------------------------------------------------------------------------------------------------------------------------------, 0, 0-


INSERT INTO COLLABORATE (PRO_ID, COM_ID, MER_ID, DESCRIPTION, C_STATUS)
SELECT 
    p.PRO_ID, 
    c.COM_ID, 
    m.MER_ID,
    'Accepted collaboration',  -- Description
    'ACCEPTED'                 -- Status
FROM 
    PRODUCTBASEDONMEDIA p
JOIN 
    COMPANYHASMEDIA c ON p.MEDIA_ID = c.MEDIA_ID
JOIN 
    MERCHPRODUCEPROD m ON p.PRO_ID = m.PRO_ID
WHERE 
    c.COM_ID IS NOT NULL 
AND 
    m.MER_ID IS NOT NULL;

--------------------------------------------------------------------------------------------------------------------------------, 0, 0
--PRODUCTBASEDONMEDIA
-------------------------------------------------------------------------------------------------------------------------------, 0, 0-

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (100, 6);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (101, 6);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (102, 7);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (103, 7);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (104, 46);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (105, 46);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (106, 67);


INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (109, 16);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (110, 16);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (111, 17);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (112, 17);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (113, 18);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (114, 18);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (115, 19);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (116, 19);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (117, 76);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (118, 77);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (119, 77);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (120, 78);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (121, 78);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (122, 79);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (123, 79);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (124, 29);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (125, 29);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (126, 80);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (127, 80);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (128, 81);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (129, 81);

INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID) 
VALUES (130, 82);







--------------------------------------------------------------------------------------------------------------------------------, 0, 0
-- INSERT INTO COLLABORATE TABLE
-------------------------------------------------------------------------------------------------------------------------------, 0, 0-







--------------------------------------------------------------------------------------------------------------------------------, 0, 0
-- INSERT INTO ROLE TABLE
-------------------------------------------------------------------------------------------------------------------------------, 0, 0-


INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (1, 'Robert Downey Jr.', 'https://cdn.britannica.com/99/254199-050-98CF4E04/Robert-Downey-JR-UK-premier-Oppenheimer-movie-July-2023.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (2, 'Scarlett Johansson', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Scarlett_Johansson_by_Gage_Skidmore_2_%28cropped%2C_2%29.jpg/640px-Scarlett_Johansson_by_Gage_Skidmore_2_%28cropped%2C_2%29.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (3, 'Chris Evans', 'https://m.media-amazon.com/images/M/MV5BMWZlMzRkZmYtZTg0My00MGE2LWFhZWQtOTRmZGQxMWY5OTJhXkEyXkFqcGdeQXVyMTMxODA4Njgx._V1_FMjpg_UX1000_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (4, 'Chris Hemsworth', 'https://pyxis.nymag.com/v1/imgs/987/85f/be21bcfc78ac481b5609ae80fe6243992d-chrishemsworth.1x.rsquare.w1400.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (5, 'Anthony Russo', 'https://m.media-amazon.com/images/M/MV5BMTc2NjM5MTM0Ml5BMl5BanBnXkFtZTgwMTY3ODczNjM@._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (6, 'Joe Russo', 'https://m.media-amazon.com/images/M/MV5BMTc2NzY1NTY5OF5BMl5BanBnXkFtZTgwNjY3ODczNjM@._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (8, 'Cate Blanchett', 'https://upload.wikimedia.org/wikipedia/commons/3/31/Cate_Blanchett_Berlinale_2023_%28cropped%29.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (9, 'Tessa Thompson', 'https://cdn.britannica.com/97/240397-050-F3870799/Tessa-Thompson-Actress-Paris-Fashion-Week-2020.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (10, 'Taika Waititi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Taika_Waititi_by_Gage_Skidmore_2.jpg/1200px-Taika_Waititi_by_Gage_Skidmore_2.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (11, 'Eric Pearson', 'https://m.media-amazon.com/images/M/MV5BMDAwYTkxMTAtNjRkYS00ZTI5LWIyMDEtNjU1MjQ2MmE3MWZiXkEyXkFqcGdeQXVyNDM0NDAwOTQ@._V1_FMjpg_UX1000_.jpg', 'WRITER');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (12, 'Benedict Cumberbatch', 'https://m.media-amazon.com/images/M/MV5BMjE0MDkzMDQwOF5BMl5BanBnXkFtZTgwOTE1Mjg1MzE@._V1_FMjpg_UX1000_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (13, 'Rachel McAdams', 'https://m.media-amazon.com/images/M/MV5BMTY5ODcxMDU4NV5BMl5BanBnXkFtZTcwMjAzNjQyNQ@@._V1_.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (14, 'Tilda Swinton', 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Tilda_Swinton_Viennale_2018.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (15, 'Benedict Wong', 'https://image.tmdb.org/t/p/w500/yYfLyrC2CE6vBWSJfkpuVKL2POM.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (16, 'Scott Derrickson', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Scott_Derrickson_by_Gage_Skidmore_2.jpg/1200px-Scott_Derrickson_by_Gage_Skidmore_2.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (17, 'Matthew McConaughey', 'https://resizing.flixster.com/EGHx3pWc7PJu9XL5sA-Vv5D-j9s=/218x280/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/44410_v9_bc.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (18, 'Jessica Chastain', 'https://m.media-amazon.com/images/M/MV5BMTU1MDM5NjczOF5BMl5BanBnXkFtZTcwOTY2MDE4OA@@._V1_.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (19, 'Anne Hathaway', 'https://variety.com/wp-content/uploads/2024/03/GettyImages-1830881916.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (20, 'Timothée Chalamet', 'https://resizing.flixster.com/-7xX0CigJSaLOzYrjhgDLjqsY-8=/218x280/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/535891_v9_bc.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (21, 'Christopher Nolan', 'https://cdn.britannica.com/37/255737-050-9BB3FEDA/Christopher-Nolan-Movie-film-director-Oppenheimer-UK-premiere-2023.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (22, 'Leonardo DiCaprio', 'https://cdn.britannica.com/65/227665-050-D74A477E/American-actor-Leonardo-DiCaprio-2016.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (23, 'Cillian Murphy', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Cillian_Murphy_at_Berlinale_2024%2C_Ausschnitt.jpg/640px-Cillian_Murphy_at_Berlinale_2024%2C_Ausschnitt.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (24, 'Joseph Gordon-Levitt', 'https://image.tmdb.org/t/p/w500/z2FA8js799xqtfiFjBTicFYdfk.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (25, 'Marion Cotillard', 'https://upload.wikimedia.org/wikipedia/commons/5/59/Marion_Cotillard_at_2019_Cannes.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (27, 'Pete Docter', 'https://m.media-amazon.com/images/M/MV5BYzI3M2Y3Y2UtMTVmOC00Y2U4LThhOWItMjcxODdhNTJiNmI1XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (28, 'Amy Poehler', 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1142603651_cropped.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (29, 'Mindy Kaling', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Mindy_Kaling_by_Claire_Leahy_%28cropped%29.jpg/1200px-Mindy_Kaling_by_Claire_Leahy_%28cropped%29.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (30, 'Bill Hader', 'https://m.media-amazon.com/images/M/MV5BNTY3MzgwMjE3N15BMl5BanBnXkFtZTcwNjc2MjE3NA@@._V1_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (31, 'Tom Hardy', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Tom_Hardy_Locke_Premiere.jpg/640px-Tom_Hardy_Locke_Premiere.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (32, 'Charlize Theron', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Charlize_Theron_in_2017.jpg/1200px-Charlize_Theron_in_2017.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (33, 'Nicholas Hoult', 'https://goldenglobes.com/wp-content/uploads/2023/10/Nicholas_Hoult042219_0-Magnus-Sundholm.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (34, 'Zoë Kravitz', 'https://media.allure.com/photos/6217a011e844b00b21ca2666/1:1/w_3280,h_3280,c_limit/Zoe%20Kravitz%20at%20The%20Batman%20Screening%20in%20London.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (35, 'George Miller', 'https://media.newyorker.com/photos/6643cd2d50edf15e5a28f500/master/pass/Bilger-Interview-GeorgeMiller.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (36, 'Mads Mikkelsen', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Mads_Mikkelsen_by_Gage_Skidmore_2.jpg/800px-Mads_Mikkelsen_by_Gage_Skidmore_2.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (37, 'Eddie Redmayne', 'https://image.tmdb.org/t/p/w500/Ll3cAE9RIsSX4cvTi5K1KNQizI.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (38, 'Jude Law', 'https://m.media-amazon.com/images/M/MV5BMTMwOTg5NTQ3NV5BMl5BanBnXkFtZTcwNzM3MDAzNQ@@._V1_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (39, 'Katherine Waterston', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Katherine_Waterston_%2843001990584%29.jpg/170px-Katherine_Waterston_%2843001990584%29.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (40, 'David Yates', 'https://m.media-amazon.com/images/M/MV5BMTY2NTU4NjY4M15BMl5BanBnXkFtZTYwNjIxOTI1._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (41, 'Sidharth Malhotra', 'https://cms-article.forbesindia.com/media/images/2016/Nov/img_90001_siddharth_malhotrabg.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (42, 'Sonakshi Sinha', 'https://upload.wikimedia.org/wikipedia/commons/9/90/Sonakshi_Sinha_snapped_at_Krome_Studio_in_Bandra_%285%29.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (43, 'Akshaye Khanna', 'https://static.toiimg.com/thumb/msid-91419152,width-400,resizemode-4/91419152.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (44, 'Mandira Bedi', 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Mandira_Bedi_on_Day_2_of_Lakme_Fashion_Week_2017.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (45, 'Abhay Chopra', 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/abhay-chopra-29069-05-10-2017-09-15-31.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (46, 'Nawazuddin Siddiqui', 'https://in.bmscdn.com/iedb/artist/images/website/poster/large/nawazuddin_siddiqui_17110_26-07-2016_05-42-25.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (47, 'Radhika Apte', 'https://upload.wikimedia.org/wikipedia/commons/7/75/Radhika_Apte.png', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (48, 'Shivani Raghuvanshi', 'https://c8.alamy.com/comp/2RF9G7N/mumbai-india-01st-aug-2023-indian-film-actress-shivani-raghuvanshi-is-seen-during-the-trailer-launch-of-her-upcoming-web-series-made-in-heaven-season-2-in-mumbai-the-second-season-of-the-web-series-will-return-on-august-10-2023-on-prime-video-photo-by-ashish-vaishnavsopa-imagessipa-usa-credit-sipa-usaalamy-live-news-2RF9G7N.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (49, 'Smita Singh', 'https://static.toiimg.com/thumb/msid-100381153,width-400,resizemode-4/100381153.jpg', 'WRITER');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (50, 'Honey Trehan', 'https://www.thestatesman.com/wp-content/uploads/2023/07/Honey-Trehan.jpeg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (51, 'Aamir Khan', 'https://images.news18.com/ibnlive/uploads/2021/02/1612346460_aamir_khan_4k-2880x1800.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (52, 'Kareena Kapoor Khan', 'https://upload.wikimedia.org/wikipedia/commons/2/29/Kareena_Kapoor_Khan_in_2023_%281%29_%28cropped%29.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (53, 'Rani Mukerji', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Rani_Mukerji_2009.jpg/220px-Rani_Mukerji_2009.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (55, 'Reema Kagti', 'https://m.media-amazon.com/images/M/MV5BNmEwODFlOTgtNmRhMC00NTMwLTgxOGEtZDIwZTM4YzQ5OWFkXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (56, 'Anthony Hopkins', 'https://m.media-amazon.com/images/M/MV5BMTg5ODk1NTc5Ml5BMl5BanBnXkFtZTYwMjAwOTI4._V1_FMjpg_UX1000_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (57, 'Jodie Foster', 'https://cdn.britannica.com/92/250492-050-13BD1534/Jodie-Foster-attending-the-Taxi-Driver-40th-Anniversary-Screening-Tribeca-Film-Festival.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (58, 'Jonathan Demme', 'https://m.media-amazon.com/images/M/MV5BMTY1NzY0OTQ0OF5BMl5BanBnXkFtZTcwNDY1Njk5Mg@@._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (59, 'Thomas Harris', 'https://static01.nyt.com/images/2019/05/21/books/18Harris1/merlin_154859496_bad9ccb5-a380-4bbd-9a51-0655fa356485-superJumbo.jpg', 'WRITER');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (60, 'Ted Levine', 'https://ntvb.tmsimg.com/assets/assets/76236_v9_bb.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (61, 'Rodrigo Cortés', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Premios_Goya_2019_-_Rodrigo_Cort%C3%A9s_%28cropped%29.jpg/1200px-Premios_Goya_2019_-_Rodrigo_Cort%C3%A9s_%28cropped%29.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (62, 'Cillian Murphy', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Cillian_Murphy_at_Berlinale_2024%2C_Ausschnitt.jpg/640px-Cillian_Murphy_at_Berlinale_2024%2C_Ausschnitt.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (63, 'Robert De Niro', 'https://cdn.britannica.com/00/213300-050-ADF31CD9/American-actor-Robert-De-Niro-2019.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (64, 'Sigourney Weaver', 'https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgwMzIwNzY0MDQ0NDEz/0609_sigourneyweavercvr-ftr.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (65, 'Elizabeth Olsen', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Elizabeth_Olsen_by_Gage_Skidmore_2.jpg/1200px-Elizabeth_Olsen_by_Gage_Skidmore_2.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (66, 'John Polson', 'https://resizing.flixster.com/Naq25kY2CJF_WMQJ0rVgAtNgDqw=/218x280/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/87261_v9_bb.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (67, 'Robert De Niro', 'https://cdn.britannica.com/00/213300-050-ADF31CD9/American-actor-Robert-De-Niro-2019.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (68, 'Dakota Fanning', 'https://upload.wikimedia.org/wikipedia/commons/7/73/Dakota_Fanning_SAG_AWARDS_2020.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (69, 'Famke Janssen', 'https://images8.alphacoders.com/489/489170.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (70, 'James Cameron', 'https://media.vanityfair.com/photos/656f89c8710cfd971ca79847/master/pass/vf1223-james-cameron.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (71, 'Kate Winslet', 'https://cdn.britannica.com/38/130638-050-DBCE19EE/Kate-Winslet.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (73, 'Billy Zane', 'https://image.tmdb.org/t/p/original/7CBwxqE00aZAAEBaRkapylgdi15.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (74, 'Vanessa Caswill', 'https://pbs.twimg.com/profile_images/1692568181364146176/qbw7Lh9U_400x400.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (75, 'Haley Lu Richardson', 'https://m.media-amazon.com/images/M/MV5BNDNhMTgwNzAtYzNiZC00MTRiLTg1M2ItYjA1OTNmZjRiYWU3XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (76, 'Ben Hardy', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Ben_Hardy_by_Gage_Skidmore.jpg/800px-Ben_Hardy_by_Gage_Skidmore.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (77, 'Jameela Jamil', 'https://upload.wikimedia.org/wikipedia/commons/2/22/Jameela_Jamil_at_the_2018_Comic-Con_International_%2842913091955%29_%28cropped%29.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (78, 'Ben Young', 'https://images.squarespace-cdn.com/content/v1/56d5fb4b59827ed3dba79aaa/1597866849161-D0N4KCKDUVTGQ81LFQFY/ben.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (79, 'Michael Peña', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Michael_Pe%C3%B1a_TIFF_2015.jpg/800px-Michael_Pe%C3%B1a_TIFF_2015.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (80, 'Lizzy Caplan', 'https://m.media-amazon.com/images/M/MV5BMjA1MDgxNDU0Nl5BMl5BanBnXkFtZTgwNjk4NTgwMTE@._V1_.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (81, 'Israel Broussard', 'https://people.com/thmb/-04Hy6fqgcLoWjcflgvQWZVPwg0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(693x0:695x2)/israel-broussard-ac0eea0aed694a209522acfd106a83e6.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (82, 'Jon Watts', 'https://m.media-amazon.com/images/M/MV5BNzg2NjA5ODAyMV5BMl5BanBnXkFtZTgwODAzMjkxNDE@._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (83, 'Tom Holland', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/640px-Tom_Holland_by_Gage_Skidmore.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (84, 'Zendaya', 'https://www.hollywoodreporter.com/wp-content/uploads/2024/04/Zendaya-Challengers-LA-Premiere-GettyImages-2147868269-H-2024.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (85, 'Michael Keaton', 'https://cdn.britannica.com/45/188645-050-97905C5A/Michael-Keaton-2015.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (86, 'James Cameron', 'https://media.vanityfair.com/photos/656f89c8710cfd971ca79847/master/pass/vf1223-james-cameron.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (87, 'Zoe Saldana', 'https://cdn.britannica.com/17/215017-050-0E006005/American-actress-Zoe-Saldana-2018.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (88, 'Sam Worthington', 'https://image.tmdb.org/t/p/w500/mflBcox36s9ZPbsZPVOuhf6axaJ.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (89, 'Sigourney Weaver', 'https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgwMzIwNzY0MDQ0NDEz/0609_sigourneyweavercvr-ftr.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (90, 'Takashi Shimizu', 'https://static.tvtropes.org/pmwiki/pub/images/takashi_shimizu_5ab68fee_f5b0_44fe_aae8_141a49e8372_resize_750.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (91, 'Yuya Ozeki', 'https://images.mubicdn.net/images/cast_member/123660/cache-599138-1603000197/image-w856.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (92, 'Takako Fuji', 'https://m.media-amazon.com/images/M/MV5BMzMxNzEwOTg4NV5BMl5BanBnXkFtZTcwNDAxMTQyOA@@._V1_FMjpg_UX1000_.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (93, 'Hideo Nakata', 'https://m.media-amazon.com/images/M/MV5BM2UxYTY4ZTItYjAzMi00ZmU4LWJlMDAtOWFlYmZmMzhlYjBiXkEyXkFqcGdeQXVyMjk3NTUyOTc@._V1_QL75_UY207_CR87,0,140,207_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (94, 'Nanako Matsushima', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Nanako_Matsushima_in_2010_10.jpg/220px-Nanako_Matsushima_in_2010_10.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (95, 'Hiroyuki Sanada', 'https://media.vanityfair.com/photos/5b021ca9c3c368138beb8c0e/1:1/w_960,h_960,c_limit/westworld-musashi-hiroyuki.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (96, 'Rie Ino''o', 'https://image.tmdb.org/t/p/w500/xh494gyErPfHDwGJPQUiyba9kIY.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (97, 'Banjong Pisanthanakun', 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Banjong_Pisanthanakun_at_MTV_Onair_Live.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (98, 'Parkpoom Wongpoom', 'https://alchetron.com/cdn/parkpoom-wongpoom-fd6e0d7f-7096-42e3-b8aa-b86bb4de78d-resize-750.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (99, 'Ananda Everingham', 'https://i.mydramalist.com/wvzoA_5f.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (100, 'Natthaweeranuch Thongmee', 'https://i.mydramalist.com/rN04Ep_5c.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (101, 'Tobe Hooper', 'https://m.media-amazon.com/images/M/MV5BMTM0NzgyOTczMV5BMl5BanBnXkFtZTYwOTU2Nzcz._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (102, 'Heather O''Rourke', 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Heather_O%27Rourke.jpeg/220px-Heather_O%27Rourke.jpeg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (103, 'JoBeth Williams', 'https://c8.alamy.com/comp/E64WXK/beverly-hills-california-usa-14th-aug-2014-jobeth-williams-arrives-E64WXK.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (104, 'Dominique Dunne', 'https://i.pinimg.com/736x/55/75/42/5575427fc220ee1bf70b276af29cdd62.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (105, 'Sean Durkin', 'https://upload.wikimedia.org/wikipedia/commons/4/40/Sean_Durkin_%28portrait%29.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (106, 'Zac Efron', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zac_Efron_at_the_Baywatch_Red_Carpet_Premiere_Sydney_Australia.jpg/800px-Zac_Efron_at_the_Baywatch_Red_Carpet_Premiere_Sydney_Australia.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (107, 'Lily James', 'https://goldenglobes.com/wp-content/uploads/2023/10/Lily-James-GettyImages-1422627664.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (108, 'Jeremy Allen White', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jeremy_Allen_White%2C_AT%26T_Center%2C_2013.jpg/640px-Jeremy_Allen_White%2C_AT%26T_Center%2C_2013.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (109, 'Kabir Khan', 'https://upload.wikimedia.org/wikipedia/commons/5/51/Kabir_Khan_at_IFFI_2022.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (110, 'Kartik Aaryan', 'https://upload.wikimedia.org/wikipedia/commons/5/52/Kartik_Aaryan_in_2022.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (111, 'Palak Lalwani', 'https://www.gethucinema.com/wp-content/uploads/2023/10/PalakLalwani-25-768x957.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (112, 'Bhuvan Arora', 'https://m.media-amazon.com/images/M/MV5BNmQ2MWQyYzctZWUxOC00ODY4LWE4MGEtNmVlZmZjM2IwNWViXkEyXkFqcGdeQXVyMTE1MTYxNDAw._V1_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (113, 'George Clooney', 'https://ca-times.brightspotcdn.com/dims4/default/4bd7049/2147483647/strip/true/crop/3526x2343+0+0/resize/1200x797!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fe7%2F9a%2Fc6cf99e04db2842d833975a9c398%2Fla-premiere-of-the-boys-in-the-boat-92153.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (114, 'Callum Turner', 'https://m.media-amazon.com/images/M/MV5BZWJmNGRlMGMtZDlkMC00NjYxLWE2OGEtMzE1MDllN2IwYzFhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (115, 'Hadley Robinson', 'https://www.hollywoodreporter.com/wp-content/uploads/2022/04/GettyImages-1377220527-H-2022.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (116, 'Michael Mann', 'https://pyxis.nymag.com/v1/imgs/1fc/227/ceedb206db8b98938b0c6d1e70fd2c7c9e-MICHAEL-MANN-AMANDA-DEMME-NY-MAG-24638-F.rvertical.w570.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (117, 'Adam Driver', 'https://media.gq-magazine.co.uk/photos/5d138d39b6fee96334c9d921/4:3/w_1704,h_1278,c_limit/adamDriverstarwars.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (118, 'Penélope Cruz', 'https://i.abcnewsfe.com/a/2e0c575c-cc96-480d-86a9-77f29924ac05/penelope-cruz-rt-gmh-240118_1705590269793_hpMain.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (119, 'Shailene Woodley', 'https://upload.wikimedia.org/wikipedia/commons/3/30/Shailene_Woodley_2018_%28cropped%29.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (120, 'Gabriel Leone', 'https://m.media-amazon.com/images/M/MV5BYjhhNGU0NTYtNGY0YS00OGQxLThlZDAtZWE1ZmZkNDVhOWVmXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_QL75_UX500_CR0,0,500,281_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (121, 'Alfred Hitchcock', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Hitchcock%2C_Alfred_02.jpg/640px-Hitchcock%2C_Alfred_02.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (122, 'Anthony Perkins', 'https://m.media-amazon.com/images/M/MV5BMTIzMTUyMTYxM15BMl5BanBnXkFtZTYwNzE5OTI2._V1_FMjpg_UX1000_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (123, 'Janet Leigh', 'https://media.vanityfair.com/photos/651aeb5b40ecae898abc5128/9:16/w_756,h_1344,c_limit/Janet%20Leigh-Tony%20Curtis.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (124, 'Roman Polanski', 'https://upload.wikimedia.org/wikipedia/commons/0/06/Roman_Polanski_2011_2.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (125, 'Faye Dunaway', 'https://m.media-amazon.com/images/M/MV5BMTk4OTU5MDY0OV5BMl5BanBnXkFtZTYwNTc0MTM1._V1_FMjpg_UX1000_.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (126, 'Diane Ladd', 'https://image.tmdb.org/t/p/w235_and_h235_face/l09hDywACsXFkmSy7d8V2YJiRNW.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (127, 'Perry Lopez', 'https://i.ebayimg.com/images/g/aRIAAOSwPetkAoG8/s-l1200.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (128, 'Greta Gerwig', 'https://cdn.britannica.com/89/213489-050-13BB1CF2/American-actress-director-screenwriter-Greta-Gerwig-2019.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (129, 'Margot Robbie', 'https://people.com/thmb/HjGBbtW9gVBaSs9ywDRL4yzff5A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(717x306:719x308)/Margot-Robbie-attends-the-2024-Breakthrough-Prize-Ceremony-041624-1-600b6c4710f14e569060b23c6dd4004f.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (130, 'Ryan Gosling', 'https://upload.wikimedia.org/wikipedia/commons/6/62/GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (131, 'Adil El Arbi', 'https://m.media-amazon.com/images/M/MV5BNTk4ODJmM2QtMjA3YS00MjU4LThhNmQtNjZhMDkzMzU1MzI2L2ltYWdlXkEyXkFqcGdeQXVyNTAyNDQ2NjI@._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (132, 'Bilall Fallah', 'https://upload.wikimedia.org/wikipedia/commons/7/75/Bilall_Fallah_%282018%29.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (133, 'Will Smith', 'https://goldenglobes.com/wp-content/uploads/2023/10/will-smith-c-hfpa-2016.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (134, 'Jacob Scipio', 'https://guyanachronicle.com/wp-content/uploads/elementor/thumbs/jacob-qpz32593bj7cr4odamyy4kjd0xpwc9in9o4b7dk0dq.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (135, 'Martin Lawrence', 'https://cdn.britannica.com/01/219501-050-42074723/Martin-Lawrence-2020.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (136, 'Mark Waters', 'https://image.tmdb.org/t/p/w500/afouy66zeJ1hn7fcjLp8QkcTeQJ.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (137, 'Lindsay Lohan', 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Lindsay_Lohan_in_2023_%28cropped%29.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (139, 'Tina Fey', 'https://m.media-amazon.com/images/M/MV5BNTJiOWYxMzQtNWZmYS00ZmNmLWE1ODktMGM3ZTkyYmE1YTBkXkEyXkFqcGdeQXVyMTAwOTg0NzU5._V1_.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (140, 'Tim Miller', 'https://www.hollywoodreporter.com/wp-content/uploads/2019/11/us_film_director_tim_miller_-_getty_-_h_2019_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (141, 'Ryan Reynolds', 'https://m.media-amazon.com/images/M/MV5BODFmN2VmZmEtYTRjZi00ZjY1LTgxYjQtODMyNDI3ZDk4ZTJiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (142, 'Morena Baccarin', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Morena_Baccarin_by_Gage_Skidmore_2.jpg/1200px-Morena_Baccarin_by_Gage_Skidmore_2.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (143, 'Gina Carano', 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Gina_Carano_Photo_Op_GalaxyCon_Richmond_2024.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (144, 'Ed Skrein', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Ed_Skrein_by_Gage_Skidmore.jpg/1200px-Ed_Skrein_by_Gage_Skidmore.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (145, 'Robert Zemeckis', 'https://image.tmdb.org/t/p/w500/lPYDQ5LYNJ12rJZENtyASmVZ1Ql.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (146, 'Tom Hanks', 'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (147, 'Robin Wright', 'https://www.emmys.com/sites/default/files/Robin-Wright-bio-450x600.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (148, 'Frank Darabont', 'https://m.media-amazon.com/images/M/MV5BNjk0MTkxNzQwOF5BMl5BanBnXkFtZTcwODM5OTMwNA@@._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (149, 'Morgan Freeman', 'https://cdn.britannica.com/40/144440-050-DA828627/Morgan-Freeman.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (150, 'Tim Robbins', 'https://m.media-amazon.com/images/M/MV5BMTI1OTYxNzAxOF5BMl5BanBnXkFtZTYwNTE5ODI4._V1_FMjpg_UX1000_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (151, 'Clancy Brown', 'https://ew.com/thmb/52UVjfSWuqpSm872ms472fyErko=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1175128929-5eb1df7303dc4cb6adc2e99763b265cd.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (152, 'Quentin Tarantino', 'https://cdn.britannica.com/81/220481-050-55413025/Quentin-Tarantino-2020.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (153, 'John Travolta', 'https://upload.wikimedia.org/wikipedia/commons/d/d1/John_T_color_01.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (154, 'Samuel L. Jackson', 'https://ca-times.brightspotcdn.com/dims4/default/63248d7/2147483647/strip/true/crop/3803x4754+0+0/resize/2000x2500!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fbc%2F99%2Fade2b1354ed1962e527ea82eaebf%2F964075-env-samuel-l-jackson-cove-002-copy.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (155, 'Uma Thurman', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Uma_Thurman_2014_%28cropped%29.jpg/800px-Uma_Thurman_2014_%28cropped%29.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (156, 'Peter Jackson', 'https://ca-times.brightspotcdn.com/dims4/default/d53170d/2147483647/strip/true/crop/4441x5555+0+0/resize/1200x1501!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F81%2Fe8%2Ff9eafacb4341816dc8f891d46941%2Fgettyimages-1147233383.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (157, 'Elijah Wood', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Elijah_Wood_%2847955397556%29_%28cropped%29.jpg/640px-Elijah_Wood_%2847955397556%29_%28cropped%29.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (158, 'Ian McKellen', 'https://image.tmdb.org/t/p/w500/5cnnnpnJG6TiYUSS7qgJheUZgnv.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (160, 'Orson Welles', 'https://media.vanityfair.com/photos/54caa718494254fc0996667e/master/w_2560%2Cc_limit/image.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (161, 'Joseph Cotten', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Joseph_Cotten_-_1952.jpg/240px-Joseph_Cotten_-_1952.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (162, 'Dorothy Comingore', 'https://m.media-amazon.com/images/M/MV5BMTU4NjcwNTU5Ml5BMl5BanBnXkFtZTcwMDI5NDYwOA@@._V1_.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (163, 'Juan Carlos Fresnadillo', 'https://m.media-amazon.com/images/M/MV5BMTUyOTcyNjk4N15BMl5BanBnXkFtZTgwOTU5OTA5OTE@._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (164, 'Millie Bobby Brown', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Millie_Bobby_Brown_-_MBB_-_Portrait_1_-_SFM5_-_July_10%2C_2022_at_Stranger_Fan_Meet_5_People_Convention_%28cropped%29.jpg/800px-Millie_Bobby_Brown_-_MBB_-_Portrait_1_-_SFM5_-_July_10%2C_2022_at_Stranger_Fan_Meet_5_People_Convention_%28cropped%29.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (165, 'Nick Robinson', 'https://upload.wikimedia.org/wikipedia/commons/3/34/Nick_Robinson_interview_2018_left.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (166, 'Shohreh Aghdashloo', 'https://m.media-amazon.com/images/M/MV5BZDI0M2Q1NzYtYzIxNy00MWE4LTg4NDgtOWRhZDdkYTAxZTBhXkEyXkFqcGdeQXVyNTY3MzA5MzA@._V1_.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (167, 'Bill Condon', 'https://pearlanddean.com/wp-content/uploads/2021/07/uuid3ff381e2-04a6-456d-864b-2f5147929c82groupId10139t1625746046549.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (168, 'Emma Watson', 'https://m.media-amazon.com/images/M/MV5BMTQ3ODE2NTMxMV5BMl5BanBnXkFtZTgwOTIzOTQzMjE@._V1_.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (169, 'Dan Stevens', 'https://m.media-amazon.com/images/M/MV5BMTY0NTY5OTI2MF5BMl5BanBnXkFtZTgwNDkzMzIxMzE@._V1_QL75_UY207_CR5,0,140,207_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (170, 'Luke Evans', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Luke_Evans_in_2018_%28cropped_4%29.jpg/800px-Luke_Evans_in_2018_%28cropped_4%29.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (171, 'Paul Feig', 'https://m.media-amazon.com/images/M/MV5BNjUyODUyODQzM15BMl5BanBnXkFtZTcwNzM3MjE3NA@@._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (172, 'Sophia Anne Caruso', 'https://m.media-amazon.com/images/M/MV5BNmY5MjM1YzMtZWVjYS00OTY0LWE1YzgtZjRmODBiNDYzNDU5XkEyXkFqcGdeQXVyMjQyMjMwODM@._V1_.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (173, 'Sofia Wylie', 'https://cdns-images.dzcdn.net/images/artist/36779fe4262e4a5c575ec0b454643334/1900x1900-000000-80-0-0.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (174, 'Jamie Flatters', 'https://ntvb.tmsimg.com/assets/assets/1095336_v9_aa.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (175, 'Chris Columbus', 'https://m.media-amazon.com/images/M/MV5BMTY2MTYzNzUyNl5BMl5BanBnXkFtZTYwMDI0NzA0._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (176, 'Daniel Radcliffe', 'https://image.tmdb.org/t/p/w500/iPg0J9UzAlPj1fLEJNllpW9IhGe.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (178, 'Rupert Grint', 'https://m.media-amazon.com/images/M/MV5BMTM3Zjk0YzgtZjk3Mi00NGZiLThmYzUtZWRkN2E4NWQ3M2E1XkEyXkFqcGdeQXVyMzQ3Nzk5MTU@._V1_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (179, 'Andrés Muschietti', 'https://image.tmdb.org/t/p/w235_and_h235_face/mzOMGWzqFFLqIqa2WkDv5I1IxHE.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (180, 'Ezra Miller', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Ezra_Miller_by_Gage_Skidmore_2.jpg/1200px-Ezra_Miller_by_Gage_Skidmore_2.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (181, 'Michael Keaton', 'https://m.media-amazon.com/images/M/MV5BZmNiZmMzN2MtOTNkMy00YjA1LTg4NzktMWI4Njg1NzI3ODAyXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (182, 'Sasha Calle', 'https://m.media-amazon.com/images/M/MV5BYjQ2NGRkZjItMWQ4YS00ZGUwLWIwNzEtNmE3NjQ3MDQ2NjFmXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (183, 'Ben Affleck', 'https://m.media-amazon.com/images/M/MV5BMzczNzNiMDAtMmUzZS00MTkwLWIwOTYtNmYyNjg3MTVkNThhXkEyXkFqcGdeQXVyMjA4MjI5MTA@._V1_FMjpg_UX1000_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (184, 'Makoto Shinkai', 'https://m.media-amazon.com/images/M/MV5BN2IxMTg5YmEtMWQ5NC00NDQyLTliOWQtMjkxYTU5NDFmMmQyXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (185, 'Ryuunosuke Kamiki', 'https://asianwiki.com/images/c/c6/Ryunosuke_Kamiki-p1.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (186, 'Masami Nagasawa', 'https://i.mydramalist.com/Bd7goq_5c.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (187, 'Alison Brie', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Alison_Brie_by_Gage_Skidmore.jpg/800px-Alison_Brie_by_Gage_Skidmore.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (188, 'Lee Pace', 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Lee_Pace_Paris_Fashion_Week_Spring_Summer_2020.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (189, 'Kotaro Daigo', 'https://image.tmdb.org/t/p/w500/qtkmRQthVbReDZruVN1YlBlQA8W.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (190, 'Catriona McKenzie', 'https://pbs.twimg.com/profile_images/1669114877112365056/5HYMsuKR_400x400.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (191, 'Antony Starr', 'https://upload.wikimedia.org/wikipedia/commons/2/21/Antony_Starr_Photo_Op_GalaxyCon_Oklahoma_City_2024.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (192, 'Karl Urban', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Karl_Urban_SXSW_2022_%28cropped%29.jpg/640px-Karl_Urban_SXSW_2022_%28cropped%29.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (193, 'Jack Quaid', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Jack_Quaid_by_Gage_Skidmore.jpg/1200px-Jack_Quaid_by_Gage_Skidmore.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (194, 'Alan Taylor', 'https://upload.wikimedia.org/wikipedia/commons/5/54/Alan_Taylor_2013_crop.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (195, 'Emilia Clarke', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Emilia_Clarke_Dior_Rose_des_Vents.jpg/640px-Emilia_Clarke_Dior_Rose_des_Vents.jpg', 'ACTRESS');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (196, 'Kit Harington', 'https://upload.wikimedia.org/wikipedia/commons/3/32/Kit_harrington_by_sachyn_mital_%28cropped_2%29.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (197, 'Peter Dinklage', 'https://hips.hearstapps.com/hmg-prod/images/peter-dinklage-20787107-1-402.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (198, 'Hayato Date', 'https://cdn.myanimelist.net/images/voiceactors/2/10555.jpg', 'DIRECTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (199, 'Junko Takeuchi', 'https://m.media-amazon.com/images/M/MV5BNzIzNmM5OGEtMGZiYS00ZTg4LThhYmMtNjYwZDhlNzMwZGIwXkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_.jpg', 'ACTOR');

INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE) 
VALUES (200, 'Chie Nakamura', 'https://image.tmdb.org/t/p/w500/evB6vKUbm0CKgBcgikPeFXdwd29.jpg', 'ACTRESS');






------------------------------------------------------------------------------------------------------------------------------
-- MEDIAHASROLE
------------------------------------------------------------------------------------------------------------------------------








INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (3, 1);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (3, 2);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (3, 3);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (3, 4);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (3, 5);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (3, 6);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (4, 4);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (4, 8);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (4, 9);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (4, 10);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (4, 11);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (5, 12);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (5, 13);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (5, 14);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (5, 15);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (5, 16);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (6, 17);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (6, 18);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (6, 19);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (6, 20);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (6, 21);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (7, 22);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (7, 23);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (7, 24);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (7, 25);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (7, 21);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (8, 27);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (8, 28);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (8, 29);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (8, 30);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (9, 31);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (9, 32);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (9, 33);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (9, 34);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (9, 35);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (10, 36);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (10, 37);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (10, 38);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (10, 39);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (10, 40);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (41, 41);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (41, 42);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (41, 43);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (41, 44);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (41, 45);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (44, 46);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (44, 47);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (44, 48);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (44, 49);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (44, 50);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (45, 51);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (45, 52);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (45, 53);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (45, 46);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (45, 55);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (46, 56);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (46, 57);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (46, 58);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (46, 59);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (46, 60);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (47, 61);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (47, 62);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (47, 63);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (47, 64);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (47, 65);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (49, 66);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (49, 67);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (49, 68);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (49, 69);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (51, 70);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (51, 71);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (51, 22);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (51, 73);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (55, 74);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (55, 75);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (55, 76);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (55, 77);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (56, 78);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (56, 79);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (56, 80);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (56, 81);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (57, 82);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (57, 83);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (57, 84);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (57, 85);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (59, 86);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (59, 87);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (59, 88);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (59, 89);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (61, 90);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (61, 91);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (61, 92);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (62, 93);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (62, 94);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (62, 95);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (62, 96);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (64, 97);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (64, 98);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (64, 99);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (64, 100);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (65, 101);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (65, 102);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (65, 103);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (65, 104);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (66, 105);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (66, 106);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (66, 107);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (66, 108);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (67, 109);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (67, 110);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (67, 111);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (67, 112);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (69, 113);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (69, 114);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (69, 115);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (70, 116);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (70, 117);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (70, 118);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (70, 119);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (70, 120);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (72, 124);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (72, 125);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (72, 126);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (72, 127);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (12, 128);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (12, 129);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (12, 130);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (13, 131);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (13, 132);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (13, 133);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (13, 134);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (13, 135);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (14, 136);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (14, 137);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (14, 13);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (14, 139);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (15, 140);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (15, 141);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (15, 142);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (15, 143);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (15, 144);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (16, 145);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (16, 146);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (16, 147);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (17, 148);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (17, 149);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (17, 150);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (17, 151);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (18, 152);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (18, 153);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (18, 154);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (18, 155);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (19, 156);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (19, 157);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (19, 158);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (19, 8);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (20, 160);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (20, 161);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (20, 162);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (21, 163);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (21, 164);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (21, 165);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (21, 166);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (22, 167);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (22, 168);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (22, 169);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (22, 170);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (23, 171);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (23, 172);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (23, 173);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (23, 174);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (24, 175);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (24, 176);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (24, 168);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (24, 178);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (25, 179);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (25, 180);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (25, 181);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (25, 182);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (25, 183);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (26, 184);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (26, 185);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (26, 186);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (27, 184);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (27, 187);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (27, 188);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (27, 189);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (76, 190);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (76, 191);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (76, 192);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (76, 193);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (77, 194);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (77, 195);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (77, 196);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (77, 197);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (28, 198);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (28, 199);

INSERT INTO MEDIAHASROLE (MEDIA_ID, ROLE_ID) 
VALUES (28, 200);

------------------------------------------------------------------------------------------------------------------------------
-- PREFERENCEFORROLE
------------------------------------------------------------------------------------------------------------------------------

INSERT INTO PREFERENCEFORROLE (USER_ID, ROLE_ID)
VALUES (1234, 4);

INSERT INTO PREFERENCEFORROLE (USER_ID, ROLE_ID)
VALUES (1234, 8);

INSERT INTO PREFERENCEFORROLE (USER_ID, ROLE_ID)
VALUES (1234, 13);




------------------------------------------------------------------------------------------------------------------------------
-- DISCUSSION
------------------------------------------------------------------------------------------------------------------------------




INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    1,
    'This is a discussion about the best way to learn SQL.',
    'SQL',
    4,
    NULL
  );

INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    2,
    'This is a discussion about the best way to learn Python.',
    'Python',
    4,
    NULL
  );

INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    3,
    'This is a discussion about the best way to learn Java.',
    'Java',
    4,
    NULL
  );

INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    4,
    'This is a discussion about the best way to learn JavaScript.',
    'JavaScript',
    4,
    NULL
  );

  -- child topics
----------------------------------------------------------------------------------
INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    5,
    'This is a discussion about the best way to learn SQL.',
    NULL,
    1,
    1
  );
  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    8,
    'This is a discussion about the best way to learn SQL.',
    NULL,
    2,
    1
  );
  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    6,
    'This is a discussion about the best way to learn SQL.',
    NULL,
    3,
    1
  );
  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    7,
    'This is a discussion about the best way to learn SQL.',
    NULL,
    4,
    1
  );


-------------------------------------------------------------------------------
    INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    21,
    'This is a discussion about the best way to learn Python.',
    'Python',
    1,
    2
  );
  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    22,
    'This is a discussion about the best way to learn Python.',
    'Python',
    2,
    2
  );
  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    23,
    'This is a discussion about the best way to learn Python.',
    'Python',
    3,
    2
  );
  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    24,
    'This is a discussion about the best way to learn Python.',
    'Python',
    4,
    2
  );
-------------------------------------------------------------------------------------

INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    31,
    'This is a discussion about the best way to learn Java.',
    'Java',
    1,
   3
  );
  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    32,
    'This is a discussion about the best way to learn Java.',
    'Java',
    2,
    3
  );
  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    33,
    'This is a discussion about the best way to learn Java.',
    'Java',
    3,
    3
  );
  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    34,
    'This is a discussion about the best way to learn Java.',
    'Java',
    4,
    3
  );
  -----------------------------------------------------------------------------------------

  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    41,
    'This is a discussion about the best way to learn JavaScript.',
    'JavaScript',
    1,
    4
  );
  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    42,
    'This is a discussion about the best way to learn JavaScript.',
    'JavaScript',
    2,
    4
  );
  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    43,
    'This is a discussion about the best way to learn JavaScript.',
    'JavaScript',
    3,
    4
  );
  INSERT INTO DISCUSSION(
    DIS_ID,
    DESCRIPTION,
    TOPIC,
    REPLY_COUNT,
    PARENT_TOPIC
  )
VALUES
  (
    44,
    'This is a discussion about the best way to learn JavaScript.',
    'JavaScript',
    4,
    4
  );


------------------------------------------------------------------------------------------------------------------------------
-- USERSTARTDISCUSSION
------------------------------------------------------------------------------------------------------------------------------




INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    1
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    2
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    3
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    4
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    5
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    6
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    7
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    8
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    21
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    22
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    23
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    24
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    31
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    32
  );  

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    33
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    34
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    41
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    42
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    43
  );

INSERT INTO USERSTARTDISCUSSION(
    USER_ID,
    DIS_ID
  )
VALUES
  (
    1234,
    44
  );





------------------------------------------------------------------------------------------------------------------------------
-- DISCUSSIONABOUTMEDIA
------------------------------------------------------------------------------------------------------------------------------





INSERT INTO DISCUSSIONABOUTMEDIA(
    DIS_ID,
    MEDIA_ID,
    DIS_DATE
  )
VALUES
  (
    1,
    3,
    TO_DATE('2022-03-01', 'YYYY-MM-DD')
  );

INSERT INTO DISCUSSIONABOUTMEDIA(
    DIS_ID,
    MEDIA_ID,
    DIS_DATE
  )
VALUES
  (
    2,
    4,
    TO_DATE('2022-03-02', 'YYYY-MM-DD')
  );

INSERT INTO DISCUSSIONABOUTMEDIA(
    DIS_ID,
    MEDIA_ID,
    DIS_DATE
  )
VALUES
  (
    3,
    5,
    TO_DATE('2022-03-03', 'YYYY-MM-DD')
  );

INSERT INTO DISCUSSIONABOUTMEDIA(
    DIS_ID,
    MEDIA_ID,
    DIS_DATE
  )
VALUES
  (
    4,
    6,
    TO_DATE('2022-03-04', 'YYYY-MM-DD')
  );





WITH TopActors AS (
    SELECT
        ROLE.ROLE_ID,
        ROLE.NAME,
        ROLE.IMG,
        COUNT(MEDIAHASROLE.MEDIA_ID) AS MediaCount
    FROM
        ROLE
    INNER JOIN MEDIAHASROLE ON ROLE.ROLE_ID = MEDIAHASROLE.ROLE_ID
    WHERE
        ROLE.ROLE_TYPE = 'ACTOR' OR ROLE.ROLE_TYPE = 'ACTRESS'
    GROUP BY
        ROLE.ROLE_ID, ROLE.NAME, ROLE.IMG
    ORDER BY
        MediaCount DESC
    FETCH FIRST 3 ROWS ONLY
)
SELECT
    TA.ROLE_ID,
    TA.NAME AS ActorName,
    TA.IMG AS ActorImage,
    M.MEDIA_ID,
    M.TITLE,
    M.DESCRIPTION,
    M.RATING,
    M.RATING_COUNT,
    M.TYPE,
    M.GENRE,
    M.TRAILER,
    M.POSTER,
    M.DURATION,
    M.RELEASE_DATE,
    M.EPISODE
FROM
    TopActors TA
INNER JOIN MEDIAHASROLE MHR ON TA.ROLE_ID = MHR.ROLE_ID
INNER JOIN MEDIA M ON MHR.MEDIA_ID = M.MEDIA_ID;


-- top 3 from role table

SELECT *
            FROM ROLE 
            JOIN PREFERENCEFORROLE ON ROLE.ROLE_ID = PREFERENCEFORROLE.ROLE_ID
            WHERE PREFERENCEFORROLE.USER_ID = 1234
            AND ROLE.ROLE_TYPE = 'ACTOR'
            ORDER BY ROLE.ROLE_ID DESC
            FETCH FIRST 3 ROWS ONLY;


            SELECT * 
            FROM MEDIA
            JOIN MEDIAHASROLE ON MEDIA.MEDIA_ID = MEDIAHASROLE.MEDIA_ID
            WHERE ROLE_ID = 83;

            SELECT 
                M.MEDIA_ID, 
                M.TITLE, 
                M.DESCRIPTION, 
                M.RATING, 
                M.RATING_COUNT, 
                M.TYPE, 
                M.GENRE, 
                M.TRAILER, 
                M.POSTER, 
                M.DURATION, 
                M.RELEASE_DATE, 
                M.EPISODE
            FROM 
                MEDIA M
            JOIN 
                PREFERREDGENRE P ON INSTR(P.GENRES, M.GENRE) > 0
            WHERE 
                P.USER_ID = 1234
                AND NOT EXISTS (
                    SELECT 1 
                    FROM USERWATCHANDFAVORITE UWF 
                    WHERE UWF.USER_ID = P.USER_ID 
                    AND UWF.MEDIA_ID = M.MEDIA_ID
                )
            ORDER BY 
                M.RATING DESC;


                SELECT COUNT(*) , ROLE.ROLE_ID FROM MEDIA 
                join MEDIAHASROLE ON MEDIA.MEDIA_ID = MEDIAHASROLE.MEDIA_ID
                JOIN ROLE ON MEDIAHASROLE.ROLE_ID = ROLE.ROLE_ID
                GROUP BY ROLE.ROLE_ID
                ORDER BY COUNT(*) DESC;