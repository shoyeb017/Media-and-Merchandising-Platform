CREATE OR REPLACE VIEW MEDIA_COMPANY_DETAILS AS
SELECT 
    M.MEDIA_ID, 
    INITCAP(M.TITLE) AS TITLE, 
    M.DESCRIPTION, 
    M.RATING, 
    M.TYPE, 
    M.GENRE, 
    M.RELEASE_DATE, 
    M.DURATION, 
    M.POSTER, 
    C.NAME AS COMPANY_NAME,
    M.TRAILER
FROM 
    MEDIA M
LEFT JOIN 
    COMPANYHASMEDIA CHM ON M.MEDIA_ID = CHM.MEDIA_ID
LEFT JOIN 
    COMPANY C ON CHM.COM_ID = C.COM_ID;

-- DROP VIEW MEDIA_COMPANY_DETAILS; 



CREATE OR REPLACE VIEW MEDIA_ROLE_DETAILS AS
SELECT M.MEDIA_ID, R.ROLE_ID, R.NAME AS NAME, R.ROLE_TYPE, R.IMG
FROM MEDIA M
JOIN MEDIAHASROLE MR ON M.MEDIA_ID = MR.MEDIA_ID
JOIN ROLE R ON MR.ROLE_ID = R.ROLE_ID;

CREATE OR REPLACE VIEW MEDIA_REVIEW_DETAILS AS
SELECT M.MEDIA_ID, RR.R_ID, RR.DESCRIPTION, RR.RATING, U.NAME AS REVIEWER_NAME, RR.REVIEW_DATE
FROM MEDIA M
JOIN REVIEWABOUTMEDIA RAM ON M.MEDIA_ID = RAM.MEDIA_ID
JOIN REVIEWRATING RR ON RAM.R_ID = RR.R_ID
JOIN USERGIVEREVIEW UR ON RR.R_ID = UR.R_ID
JOIN USERS U ON UR.USER_ID = U.USER_ID;

CREATE OR REPLACE VIEW MEDIA_NEWS_DETAILS AS
SELECT M.MEDIA_ID, N.NEWS_ID, N.HEADLINE, N.DESCRIPTION, CGN.NEWS_DATE, C.NAME AS COMPANY_NAME
FROM MEDIA M
JOIN NEWSTOMEDIA NTM ON M.MEDIA_ID = NTM.MEDIA_ID
JOIN NEWSANDUPDATES N ON NTM.NEWS_ID = N.NEWS_ID
JOIN COMPANYGIVENEWS CGN ON N.NEWS_ID = CGN.NEWS_ID
JOIN COMPANY C ON CGN.COM_ID = C.COM_ID;

CREATE OR REPLACE VIEW MEDIA_PRODUCT_DETAILS AS
SELECT M.MEDIA_ID, M.TITLE, P.PRO_ID, P.NAME AS PRODUCT_NAME, P.DESCRIPTION AS PRODUCT_DESCRIPTION
FROM MEDIA M
JOIN PRODUCTBASEDONMEDIA PBM ON M.MEDIA_ID = PBM.MEDIA_ID
JOIN PRODUCTS P ON PBM.PRO_ID = P.PRO_ID;


CREATE OR REPLACE VIEW MEDIA_FEATURED AS
SELECT 
    M.MEDIA_ID, 
    M.TITLE, 
    M.POSTER AS IMG_SRC, 
    M.DESCRIPTION, 
    M.RATING
FROM 
    MEDIA M
ORDER BY 
    M.RATING DESC
FETCH FIRST 5 ROWS ONLY;


CREATE OR REPLACE VIEW MEDIA_SEARCH AS
SELECT 
    MEDIA_ID, 
    TITLE, 
    POSTER, 
    DESCRIPTION, 
    RATING, 
    RELEASE_DATE, 
    TYPE, 
    EPISODE, 
    DURATION, 
    GENRE
FROM 
    MEDIA;

    CREATE OR REPLACE VIEW MEDIA_VIEW AS
SELECT 
    MEDIA_ID, 
    TITLE, 
    POSTER, 
    DESCRIPTION, 
    RATING, 
    RELEASE_DATE, 
    TYPE, 
    EPISODE, 
    DURATION, 
    GENRE
FROM 
    MEDIA
ORDER BY 
    RATING DESC;

    CREATE OR REPLACE VIEW USER_ORDER_LIST AS
SELECT 
    ORDER_DATE, 
    ORDER_TIME, 
    USER_ID, 
    LISTAGG(PRO_ID || ' (x' || ORDER_QUANTITY || ')', ', ') WITHIN GROUP (ORDER BY PRO_ID) AS ORDER_DETAILS, 
    DELIVERY_STATUS
FROM USERORDERSPRODUCT
GROUP BY ORDER_DATE, ORDER_TIME, USER_ID, DELIVERY_STATUS
ORDER BY ORDER_DATE DESC, ORDER_TIME DESC;



CREATE OR REPLACE VIEW DISCUSSION_DETAILS AS
SELECT 
    D.DIS_ID, 
    M.TITLE, 
    D.TOPIC, 
    D.DESCRIPTION, 
    D.REPLY_COUNT, 
    DAM.DIS_DATE, 
    M.MEDIA_ID,
    M.TITLE AS MEDIA_TITLE
FROM 
    DISCUSSION D
JOIN 
    DISCUSSIONABOUTMEDIA DAM ON D.DIS_ID = DAM.DIS_ID
JOIN 
    MEDIA M ON DAM.MEDIA_ID = M.MEDIA_ID
ORDER BY 
    DAM.DIS_DATE DESC, D.REPLY_COUNT DESC;



CREATE OR REPLACE VIEW COMPANY_NEWS_DETAILS AS
SELECT 
    C.COM_ID, 
    C.NAME AS COMPANY_NAME,
    M.MEDIA_ID,
    M.TITLE AS MEDIA_TITLE, 
    N.NEWS_ID, 
    N.HEADLINE, 
    N.DESCRIPTION, 
    CGN.NEWS_DATE
FROM 
    COMPANY C
JOIN 
    COMPANYGIVENEWS CGN ON C.COM_ID = CGN.COM_ID
JOIN 
    NEWSANDUPDATES N ON CGN.NEWS_ID = N.NEWS_ID
JOIN 
    NEWSTOMEDIA NTM ON N.NEWS_ID = NTM.NEWS_ID
JOIN 
    MEDIA M ON NTM.MEDIA_ID = M.MEDIA_ID;