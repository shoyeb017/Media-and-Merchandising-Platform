DROP TABLE NEWSTOMEDIA;

DROP TABLE DISCUSSIONABOUTMEDIA;

DROP TABLE REVIEWABOUTPRODUCT;

DROP TABLE REVIEWABOUTMEDIA;

DROP TABLE USERGIVEREVIEW;

DROP TABLE REVIEWRATING;

DROP TABLE PRODUCTBASEDONMEDIA;

DROP TABLE USERORDERSPRODUCT;

DROP TABLE MERCHPRODUCEPROD;

DROP TABLE COLLABRATE;

DROP TABLE COMPANYGIVENEWS;

DROP TABLE COMPANYHASMEDIA;

DROP TABLE MEDIAHASROLE;

DROP TABLE USERSTARTDISCUSSION;

DROP TABLE USERWATCHANDFAVORITE;

DROP TABLE PREFERENCEFORROLE;

DROP TABLE PREFERENCEFORMEDIA;

DROP TABLE ROLE;

DROP TABLE NEWSANDUPDATES;

DROP TABLE PRODUCTS;

DROP TABLE LOGIN;

DROP TABLE DISCUSSION;

DROP TABLE COMPANY;

DROP TABLE MERCHANDISER;

DROP TABLE MEDIA;

DROP TABLE ADMIN;

DROP TABLE USERS;

DROP TABLE PHONE;

CREATE TABLE USERS(
    USER_ID INT NOT NULL,
    NAME VARCHAR2(255),
    DOB DATE,
    EMAIL VARCHAR2(255),
    CITY VARCHAR2(255),
    STREET VARCHAR2(255),
    HOUSE VARCHAR2(255),
    PHONE_ID INT NOT NULL,
    PRIMARY KEY(USER_ID)
);

CREATE TABLE ADMIN(
    ADMIN_ID INT NOT NULL,
    NAME VARCHAR2(255),
    DOB DATE,
    AGE INT,
    EMAIL VARCHAR2(255),
    CITY VARCHAR2(255),
    STREET VARCHAR2(255),
    HOUSE VARCHAR2(255),
    PHONE_ID INT NOT NULL,
    PRIMARY KEY(ADMIN_ID)
);

CREATE TABLE MERCHANDISER(
    MER_ID INT NOT NULL,
    NAME VARCHAR2(255),
    DESCRIPTION VARCHAR2(4000),
    DOB DATE,
    AGE INT,
    EMAIL VARCHAR2(255),
    CITY VARCHAR2(255),
    STREET VARCHAR2(255),
    HOUSE VARCHAR2(255),
    PHONE_ID INT NOT NULL,
    PRIMARY KEY(MER_ID)
);

CREATE TABLE COMPANY(
    COM_ID INT NOT NULL,
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
    TYPE VARCHAR2(50),
    GENRE VARCHAR2(255),
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
    IMG VARCHAR2(255),
    ROLE_TYPE VARCHAR2(50),
    PRIMARY KEY (ROLE_ID),
    CONSTRAINT ROLE_TYPE_CHECK CHECK (ROLE_TYPE IN ('DIRECTOR', 'PRODUCER', 'WRITER', 'ACTOR', 'ACTRESS'))
);

CREATE TABLE PREFERENCEFORMEDIA(
    USER_ID INT NOT NULL,
    MEDIA_ID INT NOT NULL,
    CONSTRAINT PREFERENCEFORMEDIA_AK_1 UNIQUE(MEDIA_ID)
);

CREATE TABLE PREFERENCEFORROLE(
    USER_ID INT NOT NULL,
    ROLE_ID INT NOT NULL,
    MEDIA_ID INT NOT NULL,
    CONSTRAINT PREFERENCEFORROLE_AK_1 UNIQUE(MEDIA_ID)
);

CREATE TABLE USERWATCHANDFAVORITE (
    USER_ID INT NOT NULL,
    MEDIA_ID INT NOT NULL,
    FAVORITE CHAR(1) CHECK (FAVORITE IN ('Y', 'N')),
    STATUS VARCHAR2(50),
    CONSTRAINT USERWATCHANDFAVORITE_AK_1 UNIQUE (USER_ID, MEDIA_ID),
    CONSTRAINT STATUS_CHECK CHECK (STATUS IN ('WATCHED', 'WATCHING', 'PLAN_TO_WATCH'))
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

CREATE TABLE COLLABRATE (
    PRO_ID INT NOT NULL,
    COM_ID INT NOT NULL,
    MER_ID INT NOT NULL
);

CREATE TABLE MERCHPRODUCEPROD(
    PRO_ID INT NOT NULL,
    MER_ID INT NOT NULL
);

CREATE TABLE USERORDERSPRODUCT (
    USER_ID INT NOT NULL,
    PRO_ID INT NOT NULL,
    DELIVERY_STATUS VARCHAR2(50),
    TOTAL_AMOUNT INT,
    ORDER_DATE DATE,
    GENERATED_BILL INT,
    CONSTRAINT DELIVERY_STATUS_CHECK CHECK (DELIVERY_STATUS IN ('DELIVERED', 'IN_TRANSIT', 'PENDING'))
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
    PRIMARY KEY (R_ID),
    CONSTRAINT REVIEW_FOR_CHECK CHECK (REVIEW_FOR IN ('PRODUCT', 'SERVICE', 'MOVIE', 'BOOK', 'OTHER'))
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

CREATE TABLE PHONE(
    PHONE_ID INT NOT NULL,
    PHONE_NUMBER INT NOT NULL,
    PRIMARY KEY(PHONE_ID),
    CONSTRAINT PHONE_AK_1 UNIQUE(PHONE_NUMBER)
);

ALTER TABLE PREFERENCEFORMEDIA ADD CONSTRAINT FK_MEDIA_ID_PREFERENCEFORMEDIA FOREIGN KEY (MEDIA_ID) REFERENCES MEDIA (MEDIA_ID);

ALTER TABLE PREFERENCEFORMEDIA ADD CONSTRAINT FK_USER_ID_PREFERENCEFORMEDIA FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID);

ALTER TABLE PREFERENCEFORROLE ADD CONSTRAINT FK_USER_ID_PREFERENCEFORROLE FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID);

ALTER TABLE USERWATCHANDFAVORITE ADD CONSTRAINT FK_USER_ID_USERWATCHANDFAVORITE FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID);

ALTER TABLE PREFERENCEFORROLE ADD CONSTRAINT FK_MEDIA_ID_PREFERENCEFORROLE FOREIGN KEY (MEDIA_ID) REFERENCES MEDIA (MEDIA_ID);

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

ALTER TABLE COLLABRATE ADD CONSTRAINT FK_PRO_ID_COLLABRATE FOREIGN KEY (PRO_ID) REFERENCES PRODUCTS (PRO_ID);

ALTER TABLE COLLABRATE ADD CONSTRAINT FK_COM_ID_COLLABRATE FOREIGN KEY (COM_ID) REFERENCES COMPANY (COM_ID);

ALTER TABLE COLLABRATE ADD CONSTRAINT FK_MER_ID_COLLABRATE FOREIGN KEY (MER_ID) REFERENCES MERCHANDISER (MER_ID);

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

ALTER TABLE ADMIN ADD CONSTRAINT FK_PHONE_ID_ADMIN FOREIGN KEY (PHONE_ID) REFERENCES PHONE (PHONE_ID);

ALTER TABLE MERCHANDISER ADD CONSTRAINT FK_PHONE_ID_MERCHANDISER FOREIGN KEY (PHONE_ID) REFERENCES PHONE (PHONE_ID);

ALTER TABLE USERS ADD CONSTRAINT FK_PHONE_ID_USERS FOREIGN KEY (PHONE_ID) REFERENCES PHONE (PHONE_ID);

--------------------------------------------------------------------------------------------------------------------------------
-- INSERTING DATA INTO MEDIA TABLE
--------------------------------------------------------------------------------------------------------------------------------

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    1,
    'The Avengers',
    'Earth''s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
    8,
    'MOVIE',
    'ACTION, SCI-FI',
    'https://youtu.be/eOrNdBpGMv8?si=Tp27b8QNmWcnex6p',
    'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    '2h 23m',
    TO_DATE('05/04/2012', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    2,
    'Avengers: Infinity War',
    'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    8,
    'MOVIE',
    'ACTION, ADVENTURE, SCI-FI',
    'https://youtu.be/6ZfuNTqbHE8?si=zKfQwyjw9ryFeygb',
    'https://m.media-amazon.com/images/I/71d8Iw9uVCL._AC_UF894,1000_QL80_.jpg',
    '2h 29m',
    TO_DATE('04/27/2018', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    3,
    'Avengers: Endgame',
    'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos'' actions and restore balance to the universe.',
    8,
    'MOVIE',
    'ACTION, ADVENTURE, DRAMA',
    'https://youtu.be/TcMBFSGVi1c?si=W6KzacCFkdZR4_q-',
    'https://wallpapers.com/images/hd/avengers-endgame-iphone-3ou9gbq83nsfw8c9.jpg',
    '3h 1m',
    TO_DATE('04/26/2019', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    4,
    'Thor: Ragnarok',
    'Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.',
    8,
    'MOVIE',
    'ACTION, ADVENTURE, DRAMA',
    'https://youtu.be/ue80QwXMRHg?si=GFREUdqQ1xVb-e03',
    'https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_.jpg',
    '2h 10m',
    TO_DATE('11/03/2017', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    5,
    'Doctor Strange',
    'While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.',
    7,
    'MOVIE',
    'ACTION, ADVENTURE, FANTASY',
    'https://youtu.be/aWzlQ2N6qqg?si=3FGgMK0-_Lrb6UYh',
    'https://c7.alamy.com/comp/PMBTYY/doctor-strange-2016-poster-PMBTYY.jpg',
    '1h 55m',
    TO_DATE('11/04/2016', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    6,
    'Interstellar',
    'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    9,
    'MOVIE',
    'ADVENTURE, DRAMA, SCI-FI',
    'https://youtu.be/zSWdZVtXT7E?si=uMdKxv36T26fVZEU',
    'https://m.media-amazon.com/images/I/91vIHsL-zjL._AC_SY879_.jpg',
    '2h 49m',
    TO_DATE('11/07/2014', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    7,
    'Inception',
    'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    9,
    'MOVIE',
    'ACTION, ADVENTURE, SCI-FI',
    'https://youtu.be/YoHD9XEInc0?si=B7hUAbokf8pyeHOt',
    'https://image.tmdb.org/t/p/original/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    '2h 28m',
    TO_DATE('07/16/2010', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    8,
    'Inside Out',
    'After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.',
    8,
    'MOVIE',
    'ADVENTURE, COMEDY',
    'https://youtu.be/yRUAzGQ3nSY?si=eaw9sjCpe_eIEcme',
    'https://m.media-amazon.com/images/I/41MhGPg-N7L._AC_.jpg',
    '1h 35m',
    TO_DATE('06/19/2015', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    9,
    'Mad Max: Fury Road',
    'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshipper and a drifter named Max.',
    8,
    'MOVIE',
    'ACTION, ADVENTURE, SCI-FI',
    'https://youtu.be/hEJnMQG9ev8?si=tWLU_QpmTDX6239r',
    'https://d27csu38upkiqd.cloudfront.net/eyJidWNrZXQiOiJmZGMtc2l0ZXB1YmxpYy1tZWRpYS1wcm9kIiwia2V5IjoidXBsb2Fkc1wvMjAyNFwvMDVcLzE3MDg0MS1zY2FsZWQuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxNjAwLCJmaXQiOiJjb3ZlciJ9fX0=',
    '2h',
    TO_DATE('05/15/2015', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    10,
    'Fantastic Beasts: The Secrets of Dumbledore',
    'Albus Dumbledore knows that Gellert Grindelwald is moving to take control of the wizarding world. Unable to stop him alone, he asks Newt Scamander to lead an intrepid team on a dangerous mission.',
    6,
    'MOVIE',
    'ADVENTURE, FANTASY',
    'https://youtu.be/Y9dr2zw-TXQ?si=LWaEbXn9GF8C9Iw0',
    'https://m.media-amazon.com/images/M/MV5BZGQ1NjQyNDMtNzFlZS00ZGIzLTliMWUtNGJkMGMzNTBjNDg0XkEyXkFqcGdeQXVyMTE1NDI5MDQx._V1_.jpg',
    '2h 22m',
    TO_DATE('04/15/2022', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    41,
    'Ittefaq',
    'A police officer, is investigating a double murder case that has only two witnesses, who are also the prime suspects. The suspects - Vikram, an acclaimed writer, and Maya, a young homemaker, have different narratives about the events of that fateful night.',
    7,
    'MOVIE',
    'MYSTERY',
    'https://www.youtube.com/watch?v=QiQAW4ylha4',
    'https://stat5.bollywoodhungama.in/wp-content/uploads/2017/11/Ittefaq-19.jpg',
    '1h 45m',
    TO_DATE('11/03/2017', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    42,
    'Badla',
    'Naina Sethi a successful entrepreneur finds herself locked in a hotel room.When she gains conscious she finds herself lying to corpse of her lover Arjun she is arrested for the murder.But left on bail her lawyer Jimmy hires a defense lawyer Badal Gupta who hasn''t lost a case since last 40 years.Badal and Naina discuss about the events that happened during that day.But Badal feels that there are lot many loopholes in Naina''s story',
    8,
    'MOVIE',
    'MYSTERY',
    'https://www.youtube.com/watch?v=xHWQiok-ei0',
    'https://m.media-amazon.com/images/M/MV5BYjZiMzIzYTctNDViZi00OWNmLWFmN2YtMmI2OWJiZWViMmY3XkEyXkFqcGdeQXVyNTYwMzA0MTM@._V1_.jpg',
    '1h 58m',
    TO_DATE('03/08/2019', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    43,
    'Chehre',
    'CHEHRE is the story of a man who faces a tough time when faced with retired law professionals. Sameer Mehra (Emraan Hashmi) is the chief of an ad agency called Paradoy. He goes to a hill station somewhere in the North for an ad shoot. But due to a work commitment in Delhi, he leaves from the hill town despite heavy snow. On the way, he takes a short cut to Delhi but due to a tree fall, he gets stuck. On top of it, his car suddenly breaks down. He then meets Paramjeet Singh Bhullar (Annu Kapoor) who advises him to join him to a friend’s place till it’s safe to go.',
    7,
    'MOVIE',
    'MYSTERY',
    'https://www.youtube.com/watch?v=W4WTPps4zM8',
    'https://m.media-amazon.com/images/M/MV5BNGFlOTVkMmMtOWE1OC00Y2Q1LThmNTctM2IxMWVkY2EyYjBlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
    '2h 19m',
    TO_DATE('08/27/2021', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    44,
    'Raat Akeli Hai ',
    'An aged and rich politician is found dead on his wedding night with a very young girl. A local cop is assigned the task to investigate the crime. As all circumstantial evidence points towards the young bride, our cop is hell bent on opening the Pandora''s box and digs in to an old unresolved case putting him at risk.',
    8,
    'MOVIE',
    'MYSTERY',
    'https://www.youtube.com/watch?v=uc78PxSxXMg',
    'https://upload.wikimedia.org/wikipedia/en/c/cd/Raat_Akeli_Hai_film_poster.jpg',
    '2h 29m',
    TO_DATE('07/31/2020', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    45,
    'Talaash',
    'Seeing reflections of Mumbai under the red light, Talaash is a tale of love lost, fatal attraction and above all the quest to solve a perfect crime. Suspense at its core, Talaash explores Mumbai''s underbelly like never before. Aamir Khan plays an investigation officer, Inspector Shekhawat who receives a phone call early in the morning informing him about death and an accident and how everything starts to unfold from there. The case turns into a life altering chase for Inspector Shekhawat when he is forced to reel under the repercussions of a broken married life with his wife Roshni played by Rani Mukherji and come face to face with his suppressed grief. Being on his investigational quest and fighting it out with personal struggle, Inspector Shekhawat meets a sex worker Rosie played by Kareena Kapoor who further adds shades of mystery to the puzzle. What looks like a simple car accident investigation turns into a haunting mystery as further investigations show many anomalies stringed to the death of the victim.',
    8,
    'MOVIE',
    'MYSTERY',
    'https://www.youtube.com/watch?v=M97P3zoUIos',
    'https://stat4.bollywoodhungama.in/wp-content/uploads/2016/03/Talaash-1.jpg',
    '2h 20m',
    TO_DATE('11/30/2012', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    46,
    'The Silence of the Lambs',
    'F.B.I. trainee Clarice Starling (Jodie Foster) works hard to advance her career, while trying to hide or put behind her West Virginia roots, of which if some knew, would automatically classify her as being backward or white trash. After graduation, she aspires to work in the agency''s Behavioral Science Unit under the leadership of Jack Crawford (Scott Glenn). While she is still a trainee, Crawford asks her to question Dr. Hannibal Lecter (Sir Anthony Hopkins), a psychiatrist imprisoned, thus far, for eight years in maximum security isolation for being a serial killer who cannibalized his victims. Clarice is able to figure out the assignment is to pick Lecter''s brains to help them solve another serial murder case, that of someone coined by the media as "Buffalo Bill" (Ted Levine), who has so far killed five victims, all located in the eastern U.S., all young women, who are slightly overweight (especially around the hips), all who were drowned in natural bodies of water, and all who were stripped of large swaths of skin. She also figures that Crawford chose her, as a woman, to be able to trigger some emotional response from Lecter. After speaking to Lecter for the first time, she realizes that everything with him will be a psychological game, with her often having to read between the very cryptic lines he provides. She has to decide how much she will play along, as his request in return for talking to him is to expose herself emotionally to him. The case takes a more dire turn when a sixth victim is discovered, this one from who they are able to retrieve a key piece of evidence, if Lecter is being forthright as to its meaning. A potential seventh victim is high profile Catherine Martin (Brooke Smith), the daughter of Senator Ruth Martin (Diane Baker), which places greater scrutiny on the case as they search for a hopefully still alive Catherine. Who may factor into what happens is Dr. Frederick Chilton (Anthony Heald), the warden at the prison, an opportunist who sees the higher profile with Catherine, meaning a higher profile for himself if he can insert himself successfully into the proceedings.',
    9,
    'MOVIE',
    'PSYCHOLOGICAL',
    'https://www.youtube.com/watch?v=6iB21hsprAQ',
    'https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781839023675.jpg',
    '1h 58m',
    TO_DATE('02/14/1991', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    47,
    'Red Lights',
    'The skeptical psychologist Dr. Margaret Matheson and her assistant, physicist Tom Buckley, are specialists in disclosing fraudulent paranormal phenomena. When the famous psychic Simon Silver reappears to his public after many years of absence, Tom becomes singularly obsessed in determining whether Silver is a fraud or not.',
    7,
    'MOVIE',
    'PSYCHOLOGICAL',
    'https://www.youtube.com/watch?v=7fPOplL8KTI',
    'https://m.media-amazon.com/images/M/MV5BMTQzMjYwNTc2M15BMl5BanBnXkFtZTcwMTY0Mjc4Nw@@._V1_.jpg',
    '1h 54m',
    TO_DATE('03/22/2012', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    48,
    'Black Swan',
    'Nina (Portman) is a ballerina in a New York City ballet company whose life, like all those in her profession, is completely consumed with dance. She lives with her obsessive former ballerina mother Erica (Hershey) who exerts a suffocating control over her. When artistic director Thomas Leroy (Cassel) decides to replace prima ballerina Beth MacIntyre (Ryder) for the opening production of their new season, Swan Lake, Nina is his first choice. But Nina has competition: a new dancer, Lily (Kunis), who impresses Leroy as well. Swan Lake requires a dancer who can play both the White Swan with innocence and grace, and the Black Swan, who represents guile and sensuality. Nina fits the White Swan role perfectly but Lily is the personification of the Black Swan. As the two young dancers expand their rivalry into a twisted friendship, Nina begins to get more in touch with her dark side - a recklessness that threatens to destroy her.',
    8,
    'MOVIE',
    'PSYCHOLOGICAL',
    'https://www.youtube.com/watch?v=5jaI1XOB-bs',
    'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8236892_p_v8_ar.jpg',
    '1h 48m',
    TO_DATE('12/17/2010', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    49,
    'Hide and Seek',
    'After her mother commits suicide in the bathtub, Emily Callaway is taken to live upstate in new surroundings to forget her traumatic past. Psychologist David, her father, learns that his daughter has a new friend, the enigmatic, never to be seen, imaginary (or not?) Charlie. A deadly game of hide-and-seek ensues. Who is Charlie? And what is troubling David in his dreams?',
    6,
    'MOVIE',
    'PSYCHOLOGICAL',
    'https://www.youtube.com/watch?v=mgmjpk-mv2s',
    'https://m.media-amazon.com/images/I/61dP1MSEgcL._AC_UF1000,1000_QL80_.jpg',
    '1h 41m',
    TO_DATE('12/08/2005', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    50,
    'The Killing Room',
    'Four individuals sign up for a psychological research study only to discover that they are now subjects of a brutal, classified government program.',
    6,
    'MOVIE',
    'PSYCHOLOGICAL',
    'https://www.youtube.com/watch?v=VoqAszG5EYc',
    'https://m.media-amazon.com/images/M/MV5BOTBmYTk5ZmMtMjFhNS00Yzc4LWJiZTAtNjUxNzFmMjIwM2IwXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_.jpg',
    '1h 33m',
    TO_DATE('11/14/2009', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    51,
    'Titanic',
    '84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.',
    8,
    'MOVIE',
    'ROMANCE',
    'https://www.youtube.com/watch?v=LuPB43YSgCs',
    'https://c8.alamy.com/comp/PXNB80/titanic-original-movie-poster-PXNB80.jpg',
    '3h 14m',
    TO_DATE('12/19/1997', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    52,
    'Pretty Woman',
    'Replete with extreme wealth and suave good looks, Edward Lewis could seemingly have any woman he wants, a committed significant other needed on his arm at social events to further how he makes his money as a corporate raider, but since he focuses more on his corporate-raiding pursuits with his lawyer of 10 years and partner-in-crime Philip Stuckey than any woman, every significant other he''s had in his life has felt neglected and eventually left him, the fact of which he is just realizing. In Beverly Hills, still in need of a woman on his arm as he and Philip work toward taking over a company owned by the increasingly insolvent James Morse, he decides, from a chance encounter, to hire Hollywood Boulevard hooker Vivian Ward as his escort for the week. It makes sense: a professional who would be committed to the work without having any relationship issues after the week is done. Beyond their chance encounter, he also makes this decision because she surprises him about how unhookerish she is in certain respects. Vivian, relatively new to Los Angeles and the business, must still look and act the part, with Edward, beyond giving her money, leaving her largely to her own devices to do so. She finds a somewhat-unlikely Henry Higgins in Barney Thompson, manager of the Beverly Wilshire Hotel where Edward is staying. Barney draws that fine line of keeping the hotel''s upscale clients happy while maintaining the posh decorum of the upper class, which does not include people to the hotel looking for rooms with hourly rates. As Barney and his associates are able to transform Vivian into a Cinderella, the questions become whether Vivian can go back to her Hollywood Boulevard life and whether she does have her Prince Charming beyond this week in the form of Edward (or anyone else) who truly does see her as Cinderella as opposed to a Hollywood Boulevard streetwalker.',
    8,
    'MOVIE',
    'ROMANCE',
    'https://www.youtube.com/watch?v=jvd3TjJaf3c',
    'https://m.media-amazon.com/images/M/MV5BMTk1NjYzMTQ5NV5BMl5BanBnXkFtZTYwNDEyMDM5._V1_QL75_UX820_.jpg',
    '1h 59m',
    TO_DATE('03/23/1990', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    53,
    'The Notebook',
    'With almost religious devotion, Duke, a kind octogenarian inmate of a peaceful nursing home, reads daily a captivating story from the worn-out pages of his leather-bound notebook to a fellow female patient. To keep her company, Duke recounts the fascinating love affair between impecunious but poetic country boy Noah and Allie, an affluent city girl. And little by little, Duke unfolds a Southern, lumber-scented summer romance beneath the tall trees of late 1930s North Carolina. Indeed, it seems as if the silent manuscript possesses the unfathomable power to penetrate the opaque clouds that enclose the silver-haired dame; slowly but surely, the enchanted lady becomes immersed in the strangely alluring fairy tale of the young ardent lovers'' highs and lows. But nobody knows what tomorrow holds. Are all summer loves doomed to fail?',
    8,
    'MOVIE',
    'ROMANCE',
    'https://www.youtube.com/watch?v=BjJcYdEOI0k',
    'https://m.media-amazon.com/images/M/MV5BNzk0NGU5ZWYtZTI5Ni00NTcwLWJjMzAtN2JmZTA5YTA1YTVlXkEyXkFqcGdeQXVyMzk3NDU4NTU@._V1_FMjpg_UX1000_.jpg',
    '2h 3m',
    TO_DATE('06/25/2004', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    54,
    'Chemical Hearts',
    '17-year-old Henry Page has never been in love. He fancies himself a romantic, but the kind of once-in-a-lifetime love he''s been hoping for just hasn''t happened yet. When he meets transfer student Grace Town on the first day of senior year, all that might be about to change. When Grace and Henry are chosen to co-edit the school paper, he is immediately drawn to the mysterious newcomer. As he learns the heartbreaking secret that has changed her life, he finds himself falling in love with her--or at least the person he thinks she is.',
    7,
    'MOVIE',
    'ROMANCE',
    'https://www.youtube.com/watch?v=GuS5BZTUVJs',
    'https://m.media-amazon.com/images/M/MV5BZGFkMDJkOWMtNGI4MS00ZTQ0LWJkMjktYTM2YTQ1MTA3NTRiXkEyXkFqcGdeQXVyMDc2NTEzMw@@._V1_FMjpg_UX1000_.jpg',
    '1h 33m',
    TO_DATE('07/21/2020', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    55,
    'Love at First Sight',
    'When a 20 year old woman, named Hadley, misses her scheduled flight from JFK to London, on her rescheduled flight, she meets a British man, named Oliver, who happens to be in her row on the airplane. When Hadley and Oliver lose each other once they arrive at the airport in London, will fate bring them together or will they be torn apart forever?',
    7,
    'MOVIE',
    'ROMANCE',
    'https://www.youtube.com/watch?v=j0kro6SuwxM',
    'https://m.media-amazon.com/images/M/MV5BYmE0MWJhNDgtMTIwNy00YTE0LWIwMTQtY2QzZDRkZjI3OTNhXkEyXkFqcGdeQXVyMTQ4MDUxMTk1._V1_.jpg',
    '1h 31m',
    TO_DATE('09/15/2023', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    56,
    'Extinction',
    'A family man is plagued by dreams of loss, but his dreams turn out to be more prophetic than paranoid when the planet is attacked by an offworld invasion. As he fights to protect the people he loves, he discovers a hidden strength that can keep them safe from harm.',
    6,
    'MOVIE',
    'SCI-FI',
    'https://www.youtube.com/watch?v=bTvi7wcmyi4',
    'https://m.media-amazon.com/images/M/MV5BMTU5OTYzMzcwOF5BMl5BanBnXkFtZTgwNTkzMzk4NTM@._V1_QL75_UX190_CR0,0,190,281_.jpg',
    '1h 35m',
    TO_DATE('07/27/2018', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    57,
    'Spider-Man: Homecoming',
    'A young Peter Parker/Spider-Man begins to navigate his newfound identity as web-slinging superhero Spider-Man. Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark. Peter tries to fall back into his normal daily routine--distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man--but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened.',
    8,
    'MOVIE',
    'SCI-FI',
    'https://www.youtube.com/watch?v=rk-dF1lIbIg',
    'https://m.media-amazon.com/images/M/MV5BODY2MTAzOTQ4M15BMl5BanBnXkFtZTgwNzg5MTE0MjI@._V1_FMjpg_UX1000_.jpg',
    '2h 13m',
    TO_DATE('07/07/2017', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    58,
    'Total Recall',
    'The planet has been decimated by chemical war in the late 21st century, leaving only two nations -- the United Federation of Britain and the Colony. Douglas Quaid (Farrell) is a factory worker with a stable job and a loving wife (Beckinsale), but upon learning that a company named Rekall could grant him the memory of the ultimate espionage adventure, he decides to take a virtual vacation. But in the midst of having the new memories implanted, something goes haywire. He''s branded a spy, the authorities close in, and he quickly flees for his life. Later, Quaid discovers that his life and memories were implanted. He joins forces with rebel soldier Melina (Jessica Biel) on a mission to track down Matthias (Bill Nighy), the head of a resistance movement that''s been labeled a terrorist organization by the tyrannical Chancellor Cohaagen (Bryan Cranston). Cohaagen seeks to control the entire free world. The harder Quaid fights to defeat him, the clearer it becomes that his memory had been altered long before he walked into Rekall',
    7,
    'MOVIE',
    'SCI-FI',
    'https://www.youtube.com/watch?v=GljhR5rk5eY',
    'https://upload.wikimedia.org/wikipedia/en/a/a5/TotalRecall2012Poster.jpg',
    '1h 58m',
    TO_DATE('08/31/2012', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    59,
    'Avatar',
    'When his brother is killed in a robbery, paraplegic Marine Jake Sully decides to take his place in a mission on the distant world of Pandora. There he learns of greedy corporate figurehead Parker Selfridge''s intentions of driving off the native humanoid "Na''vi" in order to mine for the precious material scattered throughout their rich woodland. In exchange for the spinal surgery that will fix his legs, Jake gathers knowledge, of the Indigenous Race and their Culture, for the cooperating military unit spearheaded by gung-ho Colonel Quaritch, while simultaneously attempting to infiltrate the Na''vi people with the use of an "avatar" identity. While Jake begins to bond with the native tribe and quickly falls in love with the beautiful alien Neytiri, the restless Colonel moves forward with his ruthless extermination tactics, forcing the soldier to take a stand - and fight back in an epic battle for the fate of Pandora.',
    8,
    'MOVIE',
    'SCI-FI',
    'https://www.youtube.com/watch?v=5PSNL1qE6VY',
    'https://images.moviesanywhere.com/7fbdd5c310d10623af2d040a726c4447/850a4464-275c-458f-a26a-fa6fdd4ab18c.jpg',
    '2h 42m',
    TO_DATE('12/18/2009', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    60,
    'The 5th Wave',
    'Four waves of increasingly-deadly attacks have left most of Earth in ruins. Against a backdrop of fear and distrust, Cassie is on the run, desperately trying to save her younger brother. As she prepares for the inevitable and lethal fifth wave, Cassie teams up with a young man who may become her final hope--if she can only trust him.1',
    6,
    'MOVIE',
    'SCI-FI',
    'https://www.youtube.com/watch?v=kmxLybfGNC4',
    'https://m.media-amazon.com/images/M/MV5BMTUxMTAxYzktZjE0NC00Y2E1LWI1MjktYzc5N2ZlMDk2ODEyXkEyXkFqcGdeQXVyMTQyMTMwOTk0._V1_.jpg',
    '1h 52m',
    TO_DATE('12/22/2016', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    61,
    'Ju-on: The Grudge',
    'In Japan, when the volunteer social assistant Rika Nishina is assigned to visit a family, she is cursed and chased by two revengeful fiends: Kayako, a woman brutally murdered by her husband and her son Toshio. Each person that lives in or visits the haunted house is murdered or disappears.',
    7,
    'MOVIE',
    'SUPERNATURAL',
    'https://www.youtube.com/watch?v=BxbBdEA7ZCQ',
    'https://m.media-amazon.com/images/M/MV5BYjNjMWNhZjctYmQzYS00M2ZmLWEzZTktZTJjZDI0NmM0MmMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
    '1h 32m',
    TO_DATE('01/25/2003', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    62,
    'Ringu',
    'Reiko Asakawa is researching into a ''Cursed Video'' interviewing teenagers about it. When her niece Tomoko dies of ''sudden heart failure'' with an unnaturally horrified expression on her face, Reiko investigates. She finds out that some of Tomoko''s friends, who had been on a holiday with Tomoko the week before, had died on exactly the same night at the exact same time in the exact same way. Reiko goes to the cabin where the teens had stayed and finds an ''unlabeled'' video tape. Reiko watched the tape to discover to her horror it is in fact the ''cursed videotape''. Ex-Husband Ryuji helps Reiko solve the mystery, Reiko makes him a copy for further investigation. Things become more tense when their son Yoichi watches the tape saying Tomoko had told him to. Their discovery takes them to a volcanic island where they discover that the video has a connection to a psychic who died 30 years ago, and her child Sadako..',
    8,
    'MOVIE',
    'SUPERNATURAL',
    'https://www.youtube.com/watch?v=0_f3vfflnOE',
    'https://m.media-amazon.com/images/M/MV5BMTI5NzcyNDQyOF5BMl5BanBnXkFtZTYwMTcyNDQ5._V1_.jpg',
    '1h 36m',
    TO_DATE('01/31/1998', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    63,
    'The Exorcist',
    'A visiting actress in Washington, D.C., notices dramatic and dangerous changes in the behavior and physical make-up of her 12-year-old daughter. Meanwhile, a young priest at nearby Georgetown University begins to doubt his faith while dealing with his mother''s terminal sickness. And a frail, elderly priest recognizes the necessity for a show-down with an old demonic enemy.',
    9,
    'MOVIE',
    'SUPERNATURAL',
    'https://www.youtube.com/watch?v=YDGw1MTEe9k',
    'https://upload.wikimedia.org/wikipedia/en/7/7b/Exorcist_ver2.jpg',
    '2h 2m',
    TO_DATE('12/26/1973', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    64,
    'Shutter',
    'A young photographer Thun and his girlfriend Jane discover mysterious shadows in their photographs after fleeing the scene of an accident. As they investigate the phenomenon, they find other photographs contain similar supernatural images, that Thun''s best friends are being haunted as well, and Jane discovers that her boyfriend has not told her everything. It soon becomes clear that you can not escape your past.',
    7,
    'MOVIE',
    'SUPERNATURAL',
    'https://www.youtube.com/watch?v=CZ6a5tLA8o4',
    'https://upload.wikimedia.org/wikipedia/en/7/7b/Exorcist_ver2.jpg',
    '1h 37m',
    TO_DATE('09/09/2004', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    65,
    ' Poltergeist',
    'A young family are visited by ghosts in their home. At first the ghosts appear friendly, moving objects around the house to the amusement of everyone, then they turn nasty and start to terrorise the family before they "kidnap" the youngest daughter.',
    8,
    'MOVIE',
    'SUPERNATURAL',
    'https://www.youtube.com/watch?v=9eZgEKjYJqA',
    'https://m.media-amazon.com/images/I/81BA9xFIB2L._AC_UF894,1000_QL80_.jpg',
    '1h 54m',
    TO_DATE('06/04/1982', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    66,
    'The Iron Claw',
    'The true story of the inseparable Von Erich brothers, who made history in the intensely competitive world of professional wrestling in the early 1980s. Through tragedy and triumph, under the shadow of their domineering father and coach, the brothers seek larger-than-life immortality on the biggest stage in sports.',
    8,
    'MOVIE',
    'SPORTS',
    'https://www.youtube.com/watch?v=8KVsaoveTbw',
    'https://m.media-amazon.com/images/M/MV5BOGE5NjllZTEtMGJjNy00ZTFmLThlNDItNmNiZTgyOTQ4OTA2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
    '2h 12m',
    TO_DATE('6/14/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    67,
    'Chandu Champion',
    '"Chottu Tiger," an absolutely terrific true story of a man who has lived possibly the most incredible life unknown to the world. An unbelievable tale of a man who kept bouncing back from one adversity after another with grit, determination and undying spirit. From wrestling in the rustic interiors of Maharashtra as a teenager, to representing India at the prestigious International Services Meet held in Tokyo, to fighting a War against Pakistan and getting disabled in that, to finally making it to the Grand Munich Olympics of 1972 and facing the Black September Terrorist attack.',
    9,
    'MOVIE',
    'SPORTS',
    'https://www.youtube.com/watch?v=IHQQK_Wn5DM',
    'https://assets-in.bmscdn.com/discovery-catalog/events/et00363650-emsultwpym-landscape.jpg',
    '2h 22m',
    TO_DATE('06/14/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    68,
    'Challengers',
    'From visionary filmmaker Luca Guadagnino, Challengers stars Zendaya as Tashi Duncan, a former tennis prodigy turned coach and a force of nature who makes no apologies for her game on and off the court. Married to a champion on a losing streak (Mike Faist - West Side Story), Tashi''s strategy for her husband''s redemption takes a surprising turn when he must face off against the washed-up Patrick (Josh O''Connor - The Crown) - his former best friend and Tashi''s former boyfriend. As their pasts and presents collide, and tensions run high, Tashi must ask herself, what will it cost to win.',
    8,
    'MOVIE',
    'SPORTS',
    'https://www.youtube.com/watch?v=AXEK7y1BuNQ',
    'https://upload.wikimedia.org/wikipedia/en/b/b4/Challengers_2024_poster.jpeg',
    '2h 11m',
    TO_DATE('6/14/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    69,
    'The Boys in the Boat',
    'The Boys in the Boat is a sports drama based on the #1 New York Times bestselling non-fiction novel written by Daniel James Brown. The film, directed by George Clooney, is about the 1936 University of Washington rowing team that competed for gold at the Summer Olympics in Berlin. This inspirational true story follows a group of underdogs at the height of the Great Depression as they are thrust into the spotlight and take on elite rivals from around the world.',
    7,
    'MOVIE',
    'SPORTS',
    'https://www.youtube.com/watch?v=dfEA-udzjjQ',
    'https://m.media-amazon.com/images/M/MV5BNGU1Nzc4YWMtZmZiYi00NzFkLTk2MDUtOGRlNGU1Njk0ZTdkXkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_FMjpg_UX1000_.jpg',
    '2h 3m',
    TO_DATE('12/25/2023', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    70,
    'Ferrari',
    'Set during the summer of 1957. Ex-racecar driver, Ferrari, is in crisis. Bankruptcy stalks the company he and his wife, Laura, built from nothing ten years earlier. Their tempestuous marriage struggles with the mourning for one son and the acknowledgement of another. He decides to counter his losses by rolling the dice on one race - 1,000 miles across Italy, the iconic Mille Migl!',
    7,
    'MOVIE',
    'SPORTS',
    'https://www.youtube.com/watch?v=ERIBTIlVVJQ',
    'https://m.media-amazon.com/images/M/MV5BNTM0YTBlMjctZjJjZS00MDU4LTg5YmQtMDY5Y2FhMWZiMjQ2XkEyXkFqcGdeQXVyNzU0NzQxNTE@._V1_FMjpg_UX1000_.jpg',
    '2h 10m',
    TO_DATE('12/25/2023', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    71,
    'Psycho',
    'Phoenix office worker Marion Crane is fed up with the way life has treated her. She has to meet her lover Sam in lunch breaks, and they cannot get married because Sam has to give most of his money away in alimony. One Friday, Marion is trusted to bank forty thousand dollars by her employer. Seeing the opportunity to take the money and start a new life, Marion leaves town and heads towards Sam''s California store. Tired after the long drive and caught in a storm, she gets off the main highway and pulls into the Bates Motel. The motel is managed by a quiet young man called Norman who seems to be dominated by his mother.',
    9,
    'MOVIE',
    'THRILLER',
    'https://www.youtube.com/watch?v=NG3-GlvKPcg',
    'https://i.ebayimg.com/images/g/HtsAAOSwY11jVxZ1/s-l400.jpg',
    '1h 49m',
    TO_DATE('09/08/1960', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    72,
    'Chinatown',
    'In 1937 Los Angeles, private investigator Jake ''J.J.'' Gittes specializes in cheating-spouse cases. His current target is Hollis Mulwray, high-profile chief engineer for the Los Angeles Department of Water and Power, whose wife suspects him of infidelity. In following Mulwray, Gittes witnesses some usual business dealings, such as a public meeting for construction of a new dam to create additional water supply for Los Angeles, as fresh water is vital to the growing community during the chronic drought; Mulwray opposes the dam. Eventually Gittes sees Mulwray meeting with an unknown young woman who isn''t his wife. Once news of the supposed tryst between Mulwray and this woman hits the media, additional information comes to light that makes Gittes believe that Mulwray is being framed for something and that he himself is being set up. In his investigation of the issue behind Mulwray''s framing and his own setup, Gittes is assisted by Mulwray''s wife Evelyn, but he thinks she isn''t being forthright with him. The further he gets into the investigation, the more secrets he uncovers about the Mulwrays'' professional and personal dealings, including Mulwray''s former business-partnership with Evelyn''s father, Noah Cross. The identity of the unknown woman may be the key to uncovering the whole story.',
    8,
    'MOVIE',
    'THRILLER',
    'https://www.youtube.com/watch?v=T37QkBc4IGY',
    'https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTkyNjQ4MDA0NzE5NjE3NDYw/should-i-watch-chinatown.jpg',
    '2h 10m',
    TO_DATE('06/20/1974', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    73,
    'The Tenant',
    'In Paris, the shy bureaucrat Trelkovsky rents an old apartment without bathroom where the previous tenant, the Egyptologist Simone Choule, committed suicide. The unfriendly concierge (Shelley Winters) and the tough landlord Mr. Zy establish stringent rules of behavior and Trelkovsky feels ridden by his neighbors. Meanwhile he visits Simone in the hospital and befriends her girlfriend Stella. After the death of Simone, Trelkovsky feels obsessed for her and believes his landlord and neighbors are plotting a scheme to force him to also commit suicide.',
    8,
    'MOVIE',
    'THRILLER',
    'https://www.youtube.com/watch?v=2Y-4rJJw554',
    'https://upload.wikimedia.org/wikipedia/en/a/a6/Locataire.jpg',
    '2h 6m',
    TO_DATE('05/26/1976', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    74,
    'The Name of the Rose',
    '14. century Franciscan monk William of Baskerville and his young novice arrive at a conference to find that several monks have been murdered under mysterious circumstances. To solve the crimes, William must rise up against the Church''s authority and fight the shadowy conspiracy of monastery monks using only his intelligence which is considerable.',
    8,
    'MOVIE',
    'THRILLER',
    'https://www.youtube.com/watch?v=0h6j8T5bGoA',
    'https://m.media-amazon.com/images/M/MV5BZjEyZTdhNDMtMWFkMS00ZmRjLWEyNmEtZDU3MWFkNDEzMDYwXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
    '2h 10m',
    TO_DATE('09/24/1986', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    75,
    'Blue Velvet',
    'College student Jeffrey Beaumont returns to his idyllic hometown of Lumberton to manage his father''s hardware store while his father is hospitalized. Walking though a grassy meadow near the family home, Jeffrey finds a severed human ear. After an initial investigation, lead police Detective John Williams advises Jeffrey not to speak to anyone about the case as they investigate further. Detective Williams also tells Jeffrey that he cannot divulge any information about what the police know. Detective Williams'' high school aged daughter, Sandy Williams, tells Jeffrey what she knows about the case from overhearing her father''s private conversations on the matter: that it has to do with a nightclub singer named Dorothy Vallens, who lives in an older apartment building near the Beaumont home. His curiosity getting the better of him, Jeffrey, with Sandy''s help, decides to find out more about the woman at the center of the case by breaking into Dorothy''s apartment while he knows she''s at work. What Jeffrey finds is a world unfamiliar to him, one that he doesn''t truly understand but one that he is unable to deny the lure of despite the inherent dangers of being associated with a possible murder. Still, he is torn between this world and the prospect of a relationship with Sandy, the two who are falling for each other, despite Sandy already being in a relationship with Mike, the school''s star football player.',
    8,
    'MOVIE',
    'THRILLER',
    'https://www.youtube.com/watch?v=00Mq6N5AsjE',
    'https://m.media-amazon.com/images/M/MV5BNjg0OWE0YWUtMGRlMi00Y2QzLTgzMjQtZGY4YTRlZWYxMmQxXkEyXkFqcGdeQW1pYnJ5YW50._V1_.jpg',
    '2h',
    TO_DATE('10/23/1986', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    11,
    'Hit Man',
    'A professor moonlighting as a hit man of sorts for his city police department, descends into dangerous, dubious territory when he finds himself attracted to a woman who enlists his services.',
    7,
    'MOVIE',
    'COMEDY, ROMANCE',
    'https://youtu.be/0g4cJ4NE8HA?si=_ieCJ03jE7FSt5fQ',
    'https://m.media-amazon.com/images/M/MV5BMDlmMmZhZjQtZDhlMi00MzU0LWIwYjMtNDRhOGE5YzczYjBmXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_.jpg',
    '1h 55m',
    TO_DATE('06/07/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    12,
    'Barbie',
    'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
    7,
    'MOVIE',
    'ADVENTURE, COMEDY, FANTASY',
    'https://youtu.be/pBk4NYhWNMM?si=la093vKRkygsK9F6',
    'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
    '1h 54m',
    TO_DATE('06/21/2023', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    13,
    'Bad Boys: Ride or Die',
    'This Summer, the world''s favorite Bad Boys are back with their iconic mix of edge-of-your seat action and outrageous comedy but this time with a twist: Miami''s finest are now on the run.',
    7,
    'MOVIE',
    'ACTION, ADVENTURE, COMEDY',
    'https://youtu.be/CVxi3m2h3Q8?si=GtQOOUW-1fU5xV6g',
    'https://m.media-amazon.com/images/M/MV5BY2U5YmQ3YjgtM2I2OC00YmM5LTkyM2MtN2I5Zjg2MDE0ODkwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
    '1h 55m',
    TO_DATE('06/07/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    14,
    'Mean Girls',
    'Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.',
    7,
    'MOVIE',
    'COMEDY',
    'https://youtu.be/oDU84nmSDZY?si=syVMvkSixkz2k_8q',
    'https://m.media-amazon.com/images/M/MV5BNDExMGMyN2QtYjRkZC00Yzk1LTkzMDktMTliZTI5NjQ0NTNkXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg',
    '1h 37m',
    TO_DATE('04/30/2004', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    15,
    'Deadpool',
    'A wisecracking mercenary gets experimented on and becomes immortal yet hideously scarred, and sets out to track down the man who ruined his looks.',
    8,
    'MOVIE',
    'ACTION, COMEDY',
    'https://youtu.be/Xithigfg7dA?si=Gx5t67hstKDEetED',
    'https://m.media-amazon.com/images/I/71pInEHoevL._AC_UF1000,1000_QL80_.jpg',
    '1h 48m',
    TO_DATE('02/12/2016', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    16,
    'Forrest Gump',
    'The history of the United States from the 1950s to the ''70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.',
    9,
    'MOVIE',
    'DRAMA, ROMANCE',
    'https://youtu.be/bLvqoHBptjg?si=FRVf720bWMkV3FRq',
    'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
    '2h 22m',
    TO_DATE('07/06/1994', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    17,
    'The Shawshank Redemption',
    'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
    9,
    'MOVIE',
    'DRAMA',
    'https://youtu.be/6hB3S9bIaco?si=YztWhZySr4mGUCWL',
    'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    '2h 22m',
    TO_DATE('10/14/1994', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    18,
    'Pulp Fiction ',
    'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    9,
    'MOVIE',
    'DRAMA',
    'https://youtu.be/s7EdQ4FqbhY?si=eihQP0rVwia3PjJe',
    'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    '2h 34m',
    TO_DATE('10/14/1994', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    19,
    'The Lord of the Rings: The Fellowship of the Ring',
    'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    9,
    'MOVIE',
    'ACTION, ADVENTURE, DRAMA',
    'https://youtu.be/V75dMMIW2B4?si=bXRxzZ8QjQk7P1nG',
    'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UX1000_.jpg',
    '2h 58m',
    TO_DATE('12/19/2001', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    20,
    'Citizen Kane',
    'Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance: ''Rosebud.''',
    8,
    'MOVIE',
    'DRAMA, MYSTERY',
    'https://youtu.be/8dxh3lwdOFw?si=_4rDsGPNUoXiaCob',
    'https://pics.filmaffinity.com/citizen_kane-217208961-mmed.jpg',
    '1h 59m',
    TO_DATE('09/05/1941', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    21,
    'Damsel',
    'A dutiful damsel agrees to marry a handsome prince, only to find the royal family has recruited her as a sacrifice to repay an ancient debt.',
    6,
    'MOVIE',
    'ACTION, ADVENTURE, FANTASY',
    'https://youtu.be/iM150ZWovZM?si=iaXjJsA6_-cqtla1',
    'https://m.media-amazon.com/images/M/MV5BODRiMTA4NGMtOTQzZC00OWFjLWFmODctMjY2ZTcwYjI5NDMyXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg',
    '1h 50m',
    TO_DATE('03/08/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    22,
    'Beauty and the Beast',
    'A selfish Prince is cursed to become a monster for the rest of his life, unless he learns to fall in love with a beautiful young woman he keeps prisoner.',
    7,
    'MOVIE',
    'ADVENTURE, FANTASY',
    'https://youtu.be/OvW_L8sTu5E?si=AN60372iqhrO6S7t',
    'https://pics.filmaffinity.com/beauty_and_the_beast-399141417-mmed.jpg',
    '2h 9m',
    TO_DATE('03/17/2017', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    23,
    'The School for Good and Evil',
    'Best friends Sophie and Agatha find themselves on opposing sides of an epic battle when they''re swept away into an enchanted school where aspiring heroes and villains are trained to protect the balance between Good and Evil.',
    6,
    'MOVIE',
    'ACTION, COMEDY, DRAMA, FANTASY',
    'https://youtu.be/aftysDQ4hpI?si=0jpufwwmd-Np9j7a',
    'https://pics.filmaffinity.com/the_school_for_good_and_evil-366146357-mmed.jpg',
    '2h 27m',
    TO_DATE('10/19/2022', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    24,
    'Harry Potter and the Sorcerer''s Stone',
    'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.',
    8,
    'MOVIE',
    'ADVENTURE, FANTASY',
    'https://youtu.be/VyHV0BRtdxo?si=fmfkZzbUtmMx9LAJ',
    'https://pics.filmaffinity.com/harry_potter_and_the_sorcerer_s_stone-154820574-mmed.jpg',
    '2h 32m',
    TO_DATE('11/16/2001', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    25,
    'The Flash',
    'Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without super heroes, forcing him to race for his life in order to save the future.',
    7,
    'MOVIE',
    'ACTION, ADVENTURE, FANTASY',
    'https://youtu.be/hebWYacbdvc?si=cVeWlUzC4_VCYBv8',
    'https://pics.filmaffinity.com/the_flash-205686824-mmed.jpg',
    '2h 24m',
    TO_DATE('06/16/2023', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    26,
    'Your Name',
    'Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.',
    8,
    'ANIME',
    'DRAMA, FANTASY',
    'https://youtu.be/xU47nhruN-Q?si=J2dlOfVe72W4RMTk',
    'https://pics.filmaffinity.com/kimi_no_na_wa_your_name-612760352-mmed.jpg',
    '1h 46m',
    TO_DATE('04/07/2017', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    27,
    'Weathering with You',
    'Set during a period of exceptionally rainy weather, high-school boy Hodaka Morishima runs away from his troubled rural home to Tokyo and befriends an orphan girl who can manipulate the weather.',
    8,
    'ANIME',
    'DRAMA, FANTASY',
    'https://youtu.be/Q6iK6DjV_iE?si=NYaQM_u6c6WLiNqU',
    'https://pics.filmaffinity.com/tenki_no_ko_weathering_with_you-616038056-mmed.jpg',
    '1h 52m',
    TO_DATE('01/17/2020', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    76,
    'The Boys',
    'The world''s most powerful superheroes (''Supes'') are secretly bending society to its whims, until the underdog team ''The Boys'', victims of the ''Supes'', conjure up a plan to take down ''The Seven'' and ''Vought International'' once and for all. Fighting a never ending conspiracy of corporate espionage, deep-cutting secrets and nigh-Godly figures, ''The Boys'' will do whatever it takes to save the world from its corrupt ''superheroes'' before they become unstoppable--or die trying.',
    9,
    'TV_SHOW',
    'ACTION',
    'https://www.youtube.com/watch?v=5SKP1_F7ReE',
    'https://m.media-amazon.com/images/M/MV5BYTY2ZjYyNGUtZGVkZS00MDNhLWIwMjMtZDk4MmQ5ZWI0NTY4XkEyXkFqcGdeQXVyMTY3MDE5MDY1._V1_.jpg',
    '1h',
    TO_DATE('07/26/2019', 'MM/DD/YYYY'),
    30
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    77,
    'Game of Thrones',
    'In the mythical continent of Westeros, several powerful families fight for control of the Seven Kingdoms. As conflict erupts in the kingdoms of men, an ancient enemy rises once again to threaten them all. Meanwhile, the last heirs of a recently usurped dynasty plot to take back their homeland from across the Narrow Sea.',
    9,
    'TV_SHOW',
    'ACTION',
    'https://www.youtube.com/watch?v=KPLWWIOCOOQ',
    'https://miro.medium.com/v2/resize:fit:704/1*YNYnD9Jz7zzlTqZZFtTKlQ.jpeg',
    '1h',
    TO_DATE('04/17/2011', 'MM/DD/YYYY'),
    74
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    28,
    'Naruto',
    'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village''s leader and strongest ninja.',
    8,
    'ANIME',
    'ACTION, ADVENTURE',
    'https://youtu.be/-G9BqkgZXRA?si=fJbniDImZZeTJXya',
    'https://shoptrends.com/pub/media/catalog/product/f/r/fr17949wht22x34-1.jpg',
    '24m',
    TO_DATE('09/10/2005', 'MM/DD/YYYY'),
    220
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    78,
    'The Last of Us',
    '20 years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone. What starts as a small job soon becomes a brutal heartbreaking journey as they both must traverse the U.S. and depend on each other for survival.',
    9,
    'TV_SHOW',
    'ACTION',
    'https://www.youtube.com/watch?v=uLtkt8BonwM',
    'https://assets-prd.ignimgs.com/2022/11/02/the-last-of-us-tv-button-1667405909077.jpg',
    '50m',
    TO_DATE('01/15/2023', 'MM/DD/YYYY'),
    16
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    79,
    'House of the Dragon',
    'The Targaryen dynasty is at the absolute apex of its power, with more than 10 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.',
    9,
    'TV_SHOW',
    'ADVENTURE',
    'https://www.youtube.com/watch?v=DotnJ7tTA34',
    'https://m.media-amazon.com/images/M/MV5BM2QzMGVkNjUtN2Y4Yi00ODMwLTg3YzktYzUxYjJlNjFjNDY1XkEyXkFqcGc@._V1_.jpg',
    '50m',
    TO_DATE('08/21/2022', 'MM/DD/YYYY'),
    20
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    29,
    'Attack on Titan',
    'After his hometown is destroyed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    9,
    'ANIME',
    'ACTION, ADVENTURE',
    'https://youtu.be/MGRm4IzK1SQ?si=oufdkGclrRWPh8Lo',
    'https://m.media-amazon.com/images/I/81lNsz7Ox1S._AC_SL1500_.jpg',
    '24m',
    TO_DATE('09/28/2013', 'MM/DD/YYYY'),
    98
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    80,
    'Fallout',
    'Years after a nuclear apocalypse devastates America, a violent raid by bandits on an underground fallout shelter forces one of its residents to set out into a barren wasteland filled with radiation, mutated monsters, and a lawless society of those who remained on the surface.',
    9,
    'TV_SHOW',
    'ADVENTURE',
    'https://www.youtube.com/watch?v=0kQ8i2FpRDk',
    'https://m.media-amazon.com/images/M/MV5BZjQ0YjAyNWQtMjRjMC00NzMxLTlkNjEtYWQzNmQwNGRlMGJkXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
    '1h',
    TO_DATE('04/10/2024', 'MM/DD/YYYY'),
    9
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    30,
    'Scum''s Wish',
    'A perfect couple struggles with a secret longing each has for someone else.',
    7,
    'ANIME',
    'DRAMA, ROMANCE',
    'https://youtu.be/NUoC_rvgdgI?si=mEeCX4KQVzyjCLlO',
    'https://m.media-amazon.com/images/M/MV5BMDA4ZjY5NGEtZjI2Ni00MjYwLWE0NGItN2JhMzU3Mzc2ZmQ2L2ltYWdlXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg',
    '22m',
    TO_DATE('01/13/2017', 'MM/DD/YYYY'),
    12
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    81,
    'Outlander',
    'Follows the story of Claire Randall, a married combat nurse from 1945 who is mysteriously swept back in time to 1743, where she is immediately thrown into an unknown world in which her life is threatened. When she is forced to marry Jamie Fraser, a chivalrous and romantic young Scottish warrior, a passionate relationship is ignited that tears Claire''s heart between two vastly different men in two irreconcilable lives.',
    9,
    'TV_SHOW',
    'ADVENTURE',
    'https://www.youtube.com/watch?v=PFFKjptRr7Y',
    'https://m.media-amazon.com/images/I/81tf0mQ6ljL._AC_UF1000,1000_QL80_.jpg',
    '1h',
    TO_DATE('08/09/2014', 'MM/DD/YYYY'),
    101
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    82,
    'The Bear',
    'Carmen Berzatto, a brilliant young chef from the fine-dining world is forced to return home to run his local family sandwich shop - the Original Beef of Chicagoland - after a heartbreaking death in his family. A world away from what he''s used to, Carmy must balance the soul-crushing reality of trading in Michelin star restaurants for the small ''business'' kitchen filled with strong-willed and obstinate staff and his strained familial relationships, all while grappling with the impact of his brother''s suicide.',
    9,
    'TV_SHOW',
    'COMEDY',
    'https://www.youtube.com/watch?v=gBmkI4jlaIo',
    'https://c8.alamy.com/comp/2RDR8M5/the-bear-tv-show-poster-jeremy-allen-white-2RDR8M5.jpg',
    '34m',
    TO_DATE('06/23/2022', 'MM/DD/YYYY'),
    29
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    31,
    'My Happy Marriage',
    'An unhappy young woman from an abusive family is married off to a fearsome and chilly army commander. But the two learn more about each other, love may have a chance.',
    8,
    'ANIME',
    'DRAMA, FANTASY',
    'https://youtu.be/dURh9kVzcw8?si=3b5AhHhlJmBSOcEU',
    'https://m.media-amazon.com/images/M/MV5BNjdlZWY1MzctOGUxNS00YmViLWFiOTMtNmQxMmZhMjQ5MjhhXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UX1000_.jpg',
    '24m',
    TO_DATE('07/05/2023', 'MM/DD/YYYY'),
    12
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    83,
    'The Office',
    'A mediocre paper company in the hands of Scranton, PA branch manager Michael Scott. This mockumentary follows the everyday lives of the manager and the employees he "manages." The crew follows the employees around 24/7 and captures their quite humorous and bizarre encounters as they will do what it takes to keep the company thriving.',
    9,
    'TV_SHOW',
    'COMEDY',
    'https://www.youtube.com/watch?v=tNcDHWpselE',
    'https://images1.resources.foxtel.com.au/store2/mount1/16/4/b1ixa.jpg',
    '22m',
    TO_DATE('03/24/2005', 'MM/DD/YYYY'),
    188
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    84,
    'Ted Lasso',
    'In a shock development struggling English Premier League team AFC Richmond hires American football coach Ted Lasso as its new manager. Lasso knows nothing about soccer/football. With unshakable enthusiasm and positivity he rises to the challenge but little known to him there are forces within the club that don''t want him to succeed.',
    9,
    'TV_SHOW',
    'COMEDY',
    'https://www.youtube.com/watch?v=3u7EIiohs6U',
    'https://www.apple.com/newsroom/images/product/apple-tv-plus/standard/Apple-Today-at-Apple-session-Ted-Lasso-hero.jpg.news_app_ed.jpg',
    '30m',
    TO_DATE('08/14/2020', 'MM/DD/YYYY'),
    34
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    32,
    'Angels of Death',
    'When Rachel wakes up with no memories in the basement of an unfamiliar building, she runs into Zack, a scythe-carrying serial killer.',
    7,
    'ANIME',
    'ADVENTURE, HORROR',
    'https://youtu.be/Ee5J1x6MuIo?si=ot2Lh50VFm7q6b4I',
    'https://m.media-amazon.com/images/I/71VI5eN5YYL._AC_UF1000,1000_QL80_DpWeblab_.jpg',
    '24m',
    TO_DATE('07/06/2018', 'MM/DD/YYYY'),
    16
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    85,
    'Bridgerton',
    'From Shondaland and creator Chris Van Dusen, the first season of Bridgerton follows Daphne Bridgerton (Phoebe Dynevor), the eldest daughter of the powerful Bridgerton family as she makes her debut onto Regency London''s competitive marriage market. Hoping to follow in her parent''s footsteps and find a match sparked by true love, Daphne''s prospects initially seem to be unrivaled. But as her older brother (Jonathan Bailey) begins to rule out her potential suitors, the high society scandal sheet written by the mysterious Lady Whistledown (Julie Andrews) casts aspersions on Daphne. Enter the highly desirable and rebellious Duke of Hastings (Regé-Jean Page), committed bachelor and the catch of the season for the debutantes'' mamas. Despite proclaiming that they want nothing the other has to offer, their attraction is undeniable and sparks fly as they find themselves engaged in an increasing battle of wits while navigating society''s expectations for their future.',
    8,
    'TV_SHOW',
    'DRAMA',
    'https://www.youtube.com/watch?v=gpv7ayf_tyE',
    'https://m.media-amazon.com/images/M/MV5BY2ZiODA2MGYtMmMxMi00YjlmLWFmYjktMWYyOTMwNWFkNWNkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_QL75_UX190_CR0,0,190,281_.jpg',
    '1h',
    TO_DATE('12/25/2020', 'MM/DD/YYYY'),
    25
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    33,
    'Tokyo Ghoul',
    'A Tokyo college student is attacked by a ghoul, a superpowered human who feeds on human flesh. He survives but has become part ghoul and becomes a fugitive on the run.',
    8,
    'ANIME',
    'ACTION, DRAMA',
    'https://youtu.be/vGuQeQsoRgU?si=XHP7rwksi03_LeMy',
    'https://i5.walmartimages.com/asr/d597957c-351d-4903-82ff-d52a66aed94a.73a05cb85fdaf2b6a80beb38a5a7f550.jpeg',
    '24m',
    TO_DATE('07/03/2014', 'MM/DD/YYYY'),
    12
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    86,
    'Suits',
    'While running from a drug deal gone bad, brilliant young college-dropout Mike Ross slips into a job interview with one of New York City''s best legal closers, Harvey Specter. Tired of cookie-cutter law school grads, Harvey takes a gamble by hiring Mike on the spot after recognizing his raw talent and photographic memory. Mike and Harvey are a winning team. Although Mike is a genius, he still has a lot to learn about the law; and while Harvey might seem like an emotionless, cold-blooded shark, Mike''s sympathy and concern for their cases and clients will help remind Harvey why he went into law in the first place. Mike''s other allies in the office include the firm''s best paralegal Rachel and Harvey''s no-nonsense assistant Donna. Proving to be an irrepressible duo and invaluable to the practice, Mike and Harvey must keep their secret from everyone including managing partner Jessica and Harvey''s arch nemesis Louis, who seems intent on making Mike''s life as difficult as possible.',
    9,
    'TV_SHOW',
    'DRAMA',
    'https://www.youtube.com/watch?v=85z53bAebsI',
    'https://m.media-amazon.com/images/M/MV5BNDNjNGE2ZDUtZWM1Zi00Y2FjLTk0YjQtZjFmYzE0YTM0YzYyXkEyXkFqcGdeQXVyMTE2NTA4MzQ1._V1_FMjpg_UX1000_.jpg',
    '44m',
    TO_DATE('06/23/2011', 'MM/DD/YYYY'),
    134
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    87,
    'The Sopranos',
    'An innovative look at the life of fictional Mafia Capo Tony Soprano, this serial is presented largely first person, but additional perspective is conveyed by the intimate conversations Tony has with his psychotherapist. We see Tony at work, at home, and in therapy. Moments of black comedy intersperse this aggressive, adult drama, with adult language, and extreme violence.',
    9,
    'TV_SHOW',
    'DRAMA',
    'https://www.youtube.com/watch?v=Q8cBFvpqmH0',
    'https://w0.peakpx.com/wallpaper/348/147/HD-wallpaper-tv-show-the-sopranos.jpg',
    '1h',
    TO_DATE('01/10/1999', 'MM/DD/YYYY'),
    86
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    34,
    'Serial Experiments Lain',
    'Strange things start happening when a withdrawn girl named Lain becomes obsessed with an interconnected virtual realm known as "The Wired".',
    8,
    'ANIME',
    'DRAMA, HORROR',
    'https://youtu.be/t5y4nQ5Y1V8?si=IwEjdC8ZJQi1y73f',
    'https://m.media-amazon.com/images/I/71GivzmxXUL._AC_SL1500_.jpg',
    '24m',
    TO_DATE('07/13/1999', 'MM/DD/YYYY'),
    13
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    88,
    'Stranger Things',
    'In a small town where everyone knows everyone, a peculiar incident starts a chain of events that leads to a child''s disappearance, which begins to tear at the fabric of an otherwise-peaceful community. Dark government agencies and seemingly malevolent supernatural forces converge on the town, while a few of the locals begin to understand that more is going on than meets the eye.',
    9,
    'TV_SHOW',
    'FANTASY',
    'https://www.youtube.com/watch?v=mnd7sFt5c3A',
    'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    '1h',
    TO_DATE('07/15/2016', 'MM/DD/YYYY'),
    42
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    89,
    'Supernatural',
    'John Winchester raised his two sons Sam and Dean to hunt and kill all things that go "bump in the night" after his wife Mary was murdered by an evil supernatural being when the boys were little. 22 years later the brothers set out on a journey, fighting evil along the way, to find their recently-missing father; when they finally do he reveals he knows what demon killed their mother and has found a way to track and kill it. Meanwhile, Sam develops frightening abilities such as seeing visions of people dying before it actually happens. These visions are somehow connected to the demon that murdered his mother and its mysterious plans that seem to be all about Sam. When their father dies striking a deal with that very same demon, the brothers determine to finish his crusade. But disturbing revelations about Sam''s part in the demon''s apocalyptic plan are presented when John''s dying last words to Dean are revealed.',
    9,
    'TV_SHOW',
    'FANTASY',
    'https://www.youtube.com/watch?v=t-775JyzDTk',
    'https://static.tvtropes.org/pmwiki/pub/images/supernatural_poster113.jpg',
    '44m',
    TO_DATE('09/13/2005', 'MM/DD/YYYY'),
    327
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    35,
    'Heavenly Delusion',
    'A boy grows up behind the safe walls of an apocalyptic Japan full of monsters. Tokyo flourishes as a paradise, while outside the walls of hell dangers lurk. However, a small group searches for heaven.',
    8,
    'ANIME',
    'ADVENTURE, MYSTERY',
    'https://youtu.be/-pgcwiNPiQE?si=pTeCQoqQ2GDlYabq',
    'https://m.media-amazon.com/images/M/MV5BOGEwNjQ0YjQtNzc4MS00NDBmLWJiNDItYzZkYzIzMjhmMDIyXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    '24m',
    TO_DATE('04/01/2023', 'MM/DD/YYYY'),
    13
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    90,
    'Interview with the Vampire',
    'In the year 2022, the vampire Louis de Pointe du Lac lives in Dubai and seeks to tell the story of his life or afterlife to renowned journalist Daniel Molloy. Beginning in early 20th-century New Orleans, Louis'' story follows his relationship with the vampire Lestat du Lioncourt and their formed family, including teen fledgling Claudia. Together, the vampire family endures immortality in New Orleans and beyond. As the interview continues in Dubai, Molloy discovers the truths beneath Louis'' story.',
    8,
    'TV_SHOW',
    'FANTASY',
    'https://www.youtube.com/watch?v=BecdVouR7mY',
    'https://m.media-amazon.com/images/M/MV5BMTY2NmNkYjEtMDEyZC00ZTc4LWJlZTgtYmM2N2ZhYjc5ODNmXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
    '45m',
    TO_DATE('10/02/2022', 'MM/DD/YYYY'),
    16
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    36,
    'Eden of the East',
    'On November 22, 2010 ten missiles strike Japan. However, this unprecedented terrorist act, later to be called as "Careless Monday," does not result in any apparent victims, and is soon forgotten by almost everyone. Then, 3 months later... Saki Morimi is a young woman currently in the United States of America on her graduation trip. But just when she is in front of the White House, Washington DC, she gets into trouble, and only the unexpected intervention of one of her fellow countrymen saves her. However, this man, who introduces himself as Akira Takizawa, is a complete mystery. He appears to have lost his memory. and he is stark naked, except for the gun he holds in one hand, and the mobile phone he''s holding with the other hand. A phone that is charged with 8,200,000,000 yen in digital cash.',
    7,
    'ANIME',
    'ACTION, COMEDY',
    'https://youtu.be/zfQ4e1iRoak?si=azVcHBdUvQW_IxqK',
    'https://m.media-amazon.com/images/M/MV5BNGE3MTc0NDQtYWM0Zi00NGQ2LWFkNTQtNzczMGVmMzVjNTIwXkEyXkFqcGdeQXVyMjY4MDc1MDA@._V1_FMjpg_UX1000_.jpg',
    '23m',
    TO_DATE('04/09/2009', 'MM/DD/YYYY'),
    11
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    91,
    'My Lady Jane',
    'When her ambitious mother sells Jane''s hand to the highest bidder, Jane is dismayed to discover that her dreaded husband-to-be, Guildford Dudley, is an infuriatingly attractive stranger with a dark secret; one that has the potential to get them both killed. Not to mention the fact that there are greater conspiracies afoot, like a plot to murder her cousin, King Edward, and throw the entire kingdom into chaos. A sharp-tongued, warm-hearted story full of romance, adventure, and fantasy, My Lady Jane reveals that true love is real, people are not always what they seem, and even doomed heroines can save themselves.',
    7,
    'TV_SHOW',
    'HISTORICAL',
    'https://www.youtube.com/watch?v=PwFty8yi1cU',
    'https://m.media-amazon.com/images/M/MV5BNmEwYjQ5MWMtZDdiOC00NTk1LWEwOWEtYjQ2NDUxNjk2YWU5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    '50m',
    TO_DATE('06/27/2024', 'MM/DD/YYYY'),
    8
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    92,
    'The Crown',
    'This show focuses on Queen Elizabeth II as a young newlywed faced with leading the world''s most famous monarchy while forging a relationship with legendary Prime Minister Sir Winston Churchill. The British Empire is in decline, the political world is in disarray, but a new era is dawning. Peter Morgan''s masterfully-researched scripts reveal the Queen''s private journey behind the public façade with daring frankness. Prepare to see into the coveted world of power and privilege behind the locked doors of Westminster and Buckingham Palace.',
    9,
    'TV_SHOW',
    'HISTORICAL',
    'https://www.youtube.com/watch?v=JWtnJjn6ng0',
    'https://c8.alamy.com/comp/2HPBD8E/the-crown-2016-directed-by-peter-morgan-credit-left-bank-picturessony-pictures-tv-prod-uk-album-2HPBD8E.jpg',
    '1h',
    TO_DATE('11/04/2016', 'MM/DD/YYYY'),
    60
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    93,
    'Queen Charlotte: A Bridgerton Story',
    'Betrothed against her will to King George, young Charlotte arrives in London on her wedding day and faces scrutiny from the monarch''s cunning mother.',
    8,
    'TV_SHOW',
    'HISTORICAL',
    'https://www.youtube.com/watch?v=oLtnNw0KT78',
    'https://m.media-amazon.com/images/M/MV5BNWYwNzhhNzMtMWM2Yi00NzdlLTgxNmUtYWI2YTdiNmFmNzQwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
    '58m',
    TO_DATE('05/04/2023', 'MM/DD/YYYY'),
    6
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    37,
    'A.I.C.O. Incarnation',
    'Everything Aiko knew was a lie. Now she''s joining a team of Divers to reach the place where the Burst began to stop it for good and save her family.',
    6,
    'ANIME',
    'ACTION, SCI-FI',
    'https://youtu.be/O1ER3E4Jz_U?si=Ra6DMcUUFVharGFP',
    'https://m.media-amazon.com/images/M/MV5BNzY5NzdlYTktODFjNi00ZDZkLWEyMjUtYzkwNTA2NTY1N2RhXkEyXkFqcGdeQXVyMjg1NDcxNDE@._V1_.jpg',
    '25m',
    TO_DATE('03/09/2018', 'MM/DD/YYYY'),
    12
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    94,
    'The Walking Dead',
    'Sheriff Deputy Rick Grimes gets shot and falls into a coma. When awoken he finds himself in a Zombie Apocalypse. Not knowing what to do he sets out to find his family, after he''s done that, he gets connected to a group to become the leader. He takes charge and tries to help this group of people survive, find a place to live and get them food. This show is all about survival, the risks and the things you''ll have to do to survive.',
    8,
    'TV_SHOW',
    'HORROR',
    'https://www.youtube.com/watch?v=sfAc2U20uyg',
    'https://m.media-amazon.com/images/M/MV5BNzI5MjUyYTEtMTljZC00NGI5LWFhNWYtYjY0ZTQ5YmEzMWRjXkEyXkFqcGdeQXVyMTY3MDE5MDY1._V1_FMjpg_UX1000_.jpg',
    '45m',
    TO_DATE('10/31/2010', 'MM/DD/YYYY'),
    177
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    95,
    'Evil',
    'A skeptical clinical psychologist joins a priest-in-training and a blue collar contractor as they investigate supposed abnormal events, including, demonic possession, and other extraordinary occurrences to see if there''s a scientific explanation or if something truly supernatural''s at work.',
    7,
    'TV_SHOW',
    'HORROR',
    'https://www.youtube.com/watch?v=_l4KXnKjw88',
    'https://m.media-amazon.com/images/M/MV5BNWU4NWY4MDQtYTZlNi00YTdmLWE5ZDAtOTk5ZTI1ZWJiN2UyXkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_FMjpg_UX1000_.jpg',
    '42m',
    TO_DATE('09/26/2019', 'MM/DD/YYYY'),
    50
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    38,
    'The Prince of Tennis II: U-17 World Cup',
    'When tennis phenom Ryoma Echizen is kicked out of Japan''s elite U-17 training camp for breaking the rules, he''s despondent. But a stroke of good luck hits when he''s able to try out for the U.S. team. Proving himself against their hardened veterans isn''t going to be easy, and if he is accepted, he''ll have to play against his former friends. Can he help his new brothers smash their way to victory??',
    8,
    'ANIME',
    'DRAMA, SUPERNATURAL, SPORTS',
    'https://youtu.be/ng7oI3FyhqE?si=O1wLE6ltpV5hN1FA',
    'https://m.media-amazon.com/images/M/MV5BN2U0ZDhlMTQtYzk1ZC00NTNmLWJjZWEtYzM4Mjg1NjFiNDJhXkEyXkFqcGdeQXVyODMyNTM0MjM@._V1_FMjpg_UX1000_.jpg',
    '24m',
    TO_DATE('07/07/2022', 'MM/DD/YYYY'),
    12
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    96,
    'From',
    'Unravels the mystery of a nightmarish town in middle America that traps all those who enter. As the unwilling residents fight to keep a sense of normality and search for a way out, they must also survive the threats of the surrounding forest; including the terrifying creatures that come out when the sun goes down.',
    8,
    'TV_SHOW',
    'HORROR',
    'https://www.youtube.com/watch?v=pDHqAj4eJcM',
    'https://m.media-amazon.com/images/M/MV5BNDQxOGI4ZjItM2NhZC00Y2FhLWEwZTAtZTc2MmJmNzY1MjViXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_.jpg',
    '52m',
    TO_DATE('02/20/2022', 'MM/DD/YYYY'),
    30
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    39,
    'Vinland Saga',
    'Following a tragedy, Thorfinn embarks on a journey with the man responsible for it to take his life in a duel as a true and honorable warrior to pay homage.',
    9,
    'ANIME',
    'ACTION, ADVENTURE, HISTORICAL',
    'https://youtu.be/f8JrZ7Q_p-8?si=WJpAOghDR-u0JT2a',
    'https://m.media-amazon.com/images/I/71vcBl1lANL._AC_SL1500_.jpg',
    '24m',
    TO_DATE('07/06/2019', 'MM/DD/YYYY'),
    48
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    40,
    'Death Note',
    'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.',
    9,
    'ANIME',
    'DRAMA, MYSTERY, PSYCHOLOGICAL, THRILLER',
    'https://youtu.be/NlJZ-YgAt-c?si=PT4Yef5BOjbFmgO8',
    'https://images-cdn.ubuy.co.id/6368c22732babd287a2689b2-death-note-manga-anime-tv-show-poster.jpg',
    '24m',
    TO_DATE('10/21/2007', 'MM/DD/YYYY'),
    37
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    200,
    'One Punch Man',
    'The story of Saitama, a hero that does it just for fun & can defeat his enemies with a single punch.',
    9,
    'ANIME',
    'ACTION, COMEDY',
    'https://youtu.be/Poo5lqoWSGw?si=jNzyI6zDEKGf4rqq',
    'https://www.impericon.com/media/catalog/product/a/b/abydco503_lg.jpg',
    '24m',
    TO_DATE('10/05/2015', 'MM/DD/YYYY'),
    25
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    201,
    'Haikyu!!',
    'Determined to be like the volleyball championship''s star player nicknamed "the small giant", Shoyo joins his school''s volleyball club.',
    9,
    'ANIME',
    'COMEDY, DRAMA, SPORTS',
    'https://youtu.be/JOGp2c7-cKc?si=NBSh_zUV-HMLeRyC',
    'https://images-cdn.ubuy.co.in/6350c81143baae1ae1777ad6-haikyuu-poster-karasuno-high-school.jpg',
    '24m',
    TO_DATE('04/05/2014', 'MM/DD/YYYY'),
    89
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    202,
    'A Silent Voice',
    'A young man is ostracized by his classmates after he bullies a deaf girl to the point where she moves away. Years later, he sets off on a path for redemption.',
    8,
    'ANIME',
    'DRAMA',
    'https://youtu.be/nfK6UgLra7g?si=RkuEu6okQW3IIuVA',
    'https://m.media-amazon.com/images/I/514ePr6WZ6L._AC_UF1000,1000_QL80_.jpg',
    '2h 10m',
    TO_DATE('09/17/2016', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    203,
    'Monster',
    'Tenma, a brilliant neurosurgeon with a promising future, risks his career to save the life of a critically wounded young boy. The boy, now a charismatic young man, reappears 9 years later in the midst of a string of unusual serial murders.',
    9,
    'ANIME',
    'DRAMA, MYSTERY, TRAGEDY',
    'https://youtu.be/9aS-EgdAq6U?si=e_t547qASYm9L83E',
    'https://m.media-amazon.com/images/I/71HfQJiQvML._AC_UF1000,1000_QL80_.jpg',
    '24m',
    TO_DATE('04/06/2004', 'MM/DD/YYYY'),
    75
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    204,
    'I Am: Celine Dion',
    'This is a journey inside Celine Dion''s life as she reveals her battle with Stiff Person Syndrome.',
    8,
    'DOCUMENTARY',
    'DRAMA, MUSIC',
    'https://youtu.be/KzV4mSZPke0?si=5fWcY6d2IRnAmICy',
    'https://m.media-amazon.com/images/M/MV5BNjA5Y2IzZDMtYzYwNi00ODBjLTk0MTMtMzYwMDk2YTA2NTIyXkEyXkFqcGc@._V1_.jpg',
    '1h 43m',
    TO_DATE('06/25/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    205,
    'Tell Them You Love Me',
    'A professor has a relationship with a nonverbal man with cerebral palsy. Their affair leads to a criminal trial over disability and consent. The film shows interviews and footage presenting both perspectives.',
    7,
    'DOCUMENTARY',
    'DRAMA, ROMANCE',
    'https://youtu.be/cTy3XMyG1Ww?si=YLReHj1keXTVM1kS',
    'https://m.media-amazon.com/images/M/MV5BMGNkZWRiZTctZGIzMS00MGYyLWI5NjQtOWZmMjYwM2IxNWM4XkEyXkFqcGdeQXVyMTQwODEzODM@._V1_FMjpg_UX1000_.jpg',
    '1h 42m',
    TO_DATE('02/03/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    206,
    'Hitler and the Nazis: Evil on Trial',
    'Chronicles Hitler''s ascent to power, his regime''s use of propaganda, censorship, and anti-Semitic policies, as well as the eventual downfall of the Nazi leadership.',
    8,
    'DOCUMENTARY',
    'HISTORICAL',
    'https://youtu.be/I6eIox2vOiA?si=F5BMyxyxLr4FnsVP',
    'https://m.media-amazon.com/images/M/MV5BOTk1MzI3ZmEtYjA2Yy00YmQxLThkMWMtYTNmMGM4N2MyZmNlXkEyXkFqcGdeQXVyNjIyMTUzMjI@._V1_.jpg',
    '1h',
    TO_DATE('06/05/2024', 'MM/DD/YYYY'),
    6
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    207,
    'How to Rob a Bank',
    'In this true-crime documentary, a charismatic rebel in 1990s Seattle pulls off an unprecedented string of bank robberies straight out of the movies.',
    7,
    'DOCUMENTARY',
    'ACTION, MYSTERY',
    'https://youtu.be/w20aHhlRjDc?si=Ap1i2ZhAImvxsp9u',
    'https://image.tmdb.org/t/p/original/v8cWReuGJelrd0Bz34NZ2gqjS3Q.jpg',
    '1h 28m',
    TO_DATE('06/05/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    208,
    'Ghost Adventures',
    'Zak Bagans, Aaron Goodwin, Billy Tolley and Jay Wasley investigate the scariest, most notorious, haunted places in the world.',
    7,
    'DOCUMENTARY',
    'HISTORICAL, HORROR, SUPERNATURAL',
    'https://youtu.be/0ztw1hwto_A?si=EfNFxLLfFp71mg67',
    'https://m.media-amazon.com/images/M/MV5BYTYwMThkYTMtOWFiYS00MWM5LWJmODItOWU2OGFiNDVhYTc4XkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg',
    '45m',
    TO_DATE('10/17/2008', 'MM/DD/YYYY'),
    331
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    209,
    'Queen Cleopatra',
    'Netflix docudrama about Queen Cleopatra of Egypt of the Ptolemaic lineage from Macedonia, Greece, that ruled for 21 years, between the years 51 BC and 30 BC, ending with her suicide.',
    1,
    'DOCUMENTARY',
    'DRAMA, HISTORICAL',
    'https://youtu.be/IktHcPyNlv4?si=CTMYFVF92RkOQp_M',
    'http://www.impawards.com/tv/posters/queen_cleopatra_ver2.jpg',
    '45m',
    TO_DATE('05/10/2023', 'MM/DD/YYYY'),
    4
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    210,
    'Planet Earth II',
    'David Attenborough returns with a new wildlife documentary that shows life in a variety of habitats.',
    10,
    'DOCUMENTARY',
    'DRAMA',
    'https://youtu.be/c8aFcHFu8QM?si=tcqWYimdA5-r2VUi',
    'https://m.media-amazon.com/images/M/MV5BMGZmYmQ5NGQtNWQ1MC00NWZlLTg0MjYtYjJjMzQ5ODgxYzRkXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
    '50m',
    TO_DATE('02/18/2017', 'MM/DD/YYYY'),
    6
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    211,
    'Taylor Swift: The Eras Tour',
    'Experience the Eras Tour concert, performed by the one and only Taylor Swift.',
    8,
    'DOCUMENTARY',
    'DRAMA, MUSIC',
    'https://youtu.be/KudedLV0tP0?si=5OEnETUXBRUfNzT1',
    'https://m.media-amazon.com/images/I/71IgsIs5+ZL._AC_UF894,1000_QL80_.jpg',
    '2h 49m',
    TO_DATE('10/12/2023', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    212,
    'Cosmos: A Spacetime Odyssey',
    'An exploration of our discovery of the laws of nature and coordinates in space and time.',
    9,
    'DOCUMENTARY',
    'DRAMA, SCI-FI',
    'https://youtu.be/_erVOAbz420?si=mcyI_VzEf7IRD3Bm',
    'https://m.media-amazon.com/images/M/MV5BZTk5OTQyZjYtMDk3Yy00YjhmLWE2MTYtZmY4NTg1YWUzZTQ0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg',
    '43m',
    TO_DATE('03/09/2014', 'MM/DD/YYYY'),
    13
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    213,
    'The Grab',
    'An investigative journalist uncovers the money, influence, and alarming rationale behind covert efforts to control the most vital resource on the planet.',
    7,
    'DOCUMENTARY',
    'DRAMA, MYSTERY',
    'https://youtu.be/dws3Rfn_ePo?si=7UQ-VbahYatTA4cb',
    'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2024/06/09181311/the-grab-poster-1037x1536.jpg',
    '1h 42m',
    TO_DATE('06/14/2024', 'MM/DD/YYYY'),
    NULL
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    214,
    'Nathan for You',
    'Nathan Fielder uses his business degree and life experiences to help real small businesses turn a profit. But because of his unorthodox approach, Nathan''s genuine efforts to do good often draw real people into an experience far beyond what they signed up for.',
    9,
    'DOCUMENTARY',
    'COMEDY',
    'https://youtu.be/WNQ6_1GCVVA?si=tTbJV-AqjOgec7Qi',
    'https://m.media-amazon.com/images/M/MV5BOGY4ZWM1MDUtZmM3MS00ZjAxLTkyYzMtMjgxODI1YzkzNGUwXkEyXkFqcGdeQXVyNzk2NzE5Mjk@._V1_.jpg',
    '30m',
    TO_DATE('02/28/2013', 'MM/DD/YYYY'),
    32
);

INSERT INTO MEDIA (
    MEDIA_ID,
    TITLE,
    DESCRIPTION,
    RATING,
    TYPE,
    GENRE,
    TRAILER,
    POSTER,
    DURATION,
    RELEASE_DATE,
    EPISODE
) VALUES (
    215,
    'The Last Dance',
    'Led by Michael Jordan, the 1990s Chicago Bulls establish themselves as one of the most notable dynasties in sports history.',
    9,
    'DOCUMENTARY',
    'HISTORICAL',
    'https://youtu.be/N9Z9JtNcCWY?si=Bi861IZb2w2EpL0D',
    'https://image.tmdb.org/t/p/original/oVf4xGGbDtwVHiKn8uTuSriY7PH.jpg',
    '49m',
    TO_DATE('04/19/2020', 'MM/DD/YYYY'),
    10
);


--------------------------------------------------------------------------------------------------------------------------------
-- INSERT INTO COMPANY TABLE
--------------------------------------------------------------------------------------------------------------------------------

INSERT INTO COMPANY(
    COM_ID,
    "NAME",
    IMG,
    DESCRIPTION,
    EMAIL
) VALUES (
    1,
    'Company1',
    'https://www.anime-planet.com/images/studios/banners/ufotable-29.jpg',
    'Company1dsadadhaskjndkjskdkjdsamdnaklsdjadkjlnsaldknakldnlsandlkndklandkladnskldaklsdhsaldkjlasdhksabclhbclkabdahidbfhcbdhdsbsufhb',
    'sample@gmail.com'
);

INSERT INTO COMPANY(
    COM_ID,
    "NAME",
    IMG,
    DESCRIPTION,
    EMAIL
) VALUES (
    2,
    'Company2',
    'https://miro.medium.com/v2/resize:fit:1400/1*zZbzs4vBEH3kTie-NGglXQ.jpeg',
    'Company2dsadadhaskjndkjskdkjdsamdnaklsdjadkjlnsaldknakldnlsandlkndklandkladnskldaklsdhsaldkjlasdhksabclhbclkabdahidbfhcbdhdsbsufhb',
    'sample@gmail.com'
);


--------------------------------------------------------------------------------------------------------------------------------
-- INSERT INTO PRODUCT TABLE
--------------------------------------------------------------------------------------------------------------------------------


INSERT INTO PRODUCTS(
    PRO_ID,
    NAME,
    DESCRIPTION,
    IMAGE,
    PRICE,
    QUANTITY
) VALUES (
    1,
    'Product1',
    'this is a really good product',
    'https://www.anime-planet.com/images/studios/banners/ufotable-29.jpg',
    100,
    10
);

INSERT INTO PRODUCTS(
    PRO_ID,
    NAME,
    DESCRIPTION,
    IMAGE,
    PRICE,
    QUANTITY
) VALUES (
    2,
    'Product2',
    'this is a really good product',
    'https://miro.medium.com/v2/resize:fit:1400/1*zZbzs4vBEH3kTie-NGglXQ.jpeg',
    200,
    20
);

INSERT INTO PRODUCTS(
    PRO_ID,
    NAME,
    DESCRIPTION,
    IMAGE,
    PRICE,
    QUANTITY
) VALUES (
    3,
    'Product3',
    'this is a really good product',
    'https://www.anime-planet.com/images/studios/banners/ufotable-29.jpg',
    300,
    30
);

INSERT INTO PRODUCTS(
    PRO_ID,
    NAME,
    DESCRIPTION,
    IMAGE,
    PRICE,
    QUANTITY
) VALUES (
    4,
    'Product4',
    'this is a really good product',
    'https://miro.medium.com/v2/resize:fit:1400/1*zZbzs4vBEH3kTie-NGglXQ.jpeg',
    400,
    40
);

INSERT INTO PRODUCTS(
    PRO_ID,
    NAME,
    DESCRIPTION,
    IMAGE,
    PRICE,
    QUANTITY
) VALUES (
    5,
    'Product5',
    'this is a really good product',
    'https://www.anime-planet.com/images/studios/banners/ufotable-29.jpg',
    500,
    50
);

