

CREATE TABLE USERS(
    USER_ID INT NOT NULL,
    USER_NAME VARCHAR2(255),
    NAME VARCHAR2(255),
    DOB DATE,
    EMAIL VARCHAR2(255),
    PHONE VARCHAR2(255),
    ADDRESS address_type, 
    AGE NUMBER, 
    FULL_ADDRESS AS (ADDRESS.city || ', ' || ADDRESS.street || ', ' || ADDRESS.house), 
    PRIMARY KEY(USER_ID)
);

CREATE SEQUENCE USERS_SEQ START WITH 1000 INCREMENT BY 1;

CREATE TABLE ADMIN(
    ADMIN_ID INT NOT NULL,
    USER_NAME VARCHAR2(255),
    NAME VARCHAR2(255),
    DOB DATE,
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

CREATE SEQUENCE MERCHANDISER_SEQ START WITH 2000 INCREMENT BY 1;

CREATE TABLE COMPANY(
    COM_ID INT NOT NULL,
    USER_NAME VARCHAR2(255),
    NAME VARCHAR2(255),
    IMG VARCHAR2(255),
    DESCRIPTION VARCHAR2(4000),
    EMAIL VARCHAR2(255),
    PRIMARY KEY(COM_ID)
);

CREATE SEQUENCE COMPANY_SEQ START WITH 3000 INCREMENT BY 1;


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

CREATE SEQUENCE MEDIA_SEQ START WITH 4000 INCREMENT BY 1;

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

CREATE SEQUENCE PRODUCTS_SEQ START WITH 5000 INCREMENT BY 1;


CREATE TABLE NEWSANDUPDATES(
    NEWS_ID INT NOT NULL,
    DESCRIPTION VARCHAR2(4000),
    HEADLINE VARCHAR2(4000),
    PRIMARY KEY(NEWS_ID)
);

CREATE SEQUENCE NEWSANDUPDATES_SEQ START WITH 6000 INCREMENT BY 1;


CREATE TABLE ROLE(
    ROLE_ID INT NOT NULL,
    NAME VARCHAR2(255),
    IMG VARCHAR2(4000),
    ROLE_TYPE VARCHAR2(255),
    PRIMARY KEY (ROLE_ID),
    CONSTRAINT ROLE_TYPE_CHECK CHECK (ROLE_TYPE IN ('DIRECTOR', 'PRODUCER', 'WRITER', 'ACTOR', 'ACTRESS'))
);

CREATE SEQUENCE ROLE_SEQ START WITH 7000 INCREMENT BY 1;


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
    CONSTRAINT DELIVERY_STATUS_CHECK CHECK (DELIVERY_STATUS IN ('CART','PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'))
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














--user--------------------------------------------------------------------------------------------------------------------------------

INSERT INTO USERS (USER_ID, USER_NAME, NAME, DOB, EMAIL, PHONE, ADDRESS) 
            VALUES (1234, 'Siifu', 'Sifat Bin Asad', TO_DATE('01/01/1999', 'MM/DD/YYYY'), 'meow@gmail.com', '01700000000', address_type('Dhaka', 'Dhanmondi', '12'));

INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
            VALUES (1234, '1234', 'USER', 1234);

INSERT INTO PREFERREDGENRE (USER_ID, GENRES)
            VALUES (1234, 'ACTION,SCI-FI,COMEDY,HORROR');



--ADMIN--------------------------------------------------------------------------------------------------------------------------------

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


