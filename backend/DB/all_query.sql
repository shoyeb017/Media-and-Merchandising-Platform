-- Query for user registration
BEGIN 
    RegisterUser(
        :p_username, :p_password, :p_name, TO_DATE(:p_dob, 'YYYY-MM-DD'), :p_email, :p_city, :p_street, :p_house, :p_phone, 
        :p_genres, :p_login_id, :p_user_id
    );
END;

-- Query for merchandiser registration
BEGIN 
    RegisterMerchandiser(
      :p_username, :p_password, :p_name, :p_description, :p_email, :p_city, :p_street, :p_house, :p_phone, :p_login_id, :p_merch_id
    ); 
END;

-- Query for checking if the username exists for user registration
DECLARE
    CURSOR username_cursor IS
        SELECT COUNT(*) AS count FROM USERS WHERE USER_NAME = :username;
    username_count NUMBER;
BEGIN
    OPEN username_cursor;
    FETCH username_cursor INTO username_count;

    IF username_count > 0 THEN
        :result := 'exists';
    ELSE
        :result := 'available';
    END IF;

    CLOSE username_cursor;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        :result := 'available';
    WHEN OTHERS THEN
        :result := 'error';
        RAISE_APPLICATION_ERROR(-20003, 'An unexpected error occurred while checking the username.');
END;

-- Query for checking if the username exists for merchandiser registration
DECLARE
    CURSOR merch_cursor IS
        SELECT COUNT(*) AS count FROM MERCHANDISER WHERE USER_NAME = :username;
    merch_count NUMBER;
BEGIN
    OPEN merch_cursor;
    FETCH merch_cursor INTO merch_count;

    IF merch_count > 0 THEN
        :result := 'exists';
    ELSE
        :result := 'available';
    END IF;

    CLOSE merch_cursor;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        :result := 'available';
    WHEN OTHERS THEN
        :result := 'error';
        RAISE_APPLICATION_ERROR(-20002, 'An unexpected error occurred while checking merchandiser username.');
END;

-- Query for checking if the username exists for company registration
DECLARE
    CURSOR company_cursor IS
        SELECT COUNT(*) AS count FROM COMPANY WHERE USER_NAME = :username;
    company_count NUMBER;
BEGIN
    OPEN company_cursor;
    FETCH company_cursor INTO company_count;

    IF company_count > 0 THEN
        :result := 'exists';
    ELSE
        :result := 'available';
    END IF;

    CLOSE company_cursor;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        :result := 'available';
    WHEN OTHERS THEN
        :result := 'error';
        RAISE_APPLICATION_ERROR(-20001, 'An unexpected error occurred while checking username.');
END;


-- Query for ADMIN login
SELECT USER_NAME, PASSWORD, ADMIN_ID as "user_id" 
FROM LOGIN 
JOIN ADMIN ON LOGIN.ID = ADMIN.ADMIN_ID
WHERE USER_NAME = :username AND PASSWORD = :password;

-- Query for USER login
SELECT USER_NAME, PASSWORD, USER_ID as "user_id" 
FROM LOGIN 
JOIN USERS ON LOGIN.ID = USERS.USER_ID
WHERE USER_NAME = :username AND PASSWORD = :password;

-- Query for MERCHANDISER login
SELECT USER_NAME, PASSWORD, MER_ID as "user_id"
FROM LOGIN 
JOIN MERCHANDISER ON LOGIN.ID = MERCHANDISER.MER_ID 
WHERE USER_NAME = :username AND PASSWORD = :password;

-- Query for COMPANY login
SELECT USER_NAME, PASSWORD, COM_ID as "user_id"
FROM LOGIN 
JOIN COMPANY ON LOGIN.ID = COMPANY.COM_ID 
WHERE USER_NAME = :username AND PASSWORD = :password;

-- Query for ADMIN profile
SELECT * 
FROM ADMIN 
WHERE ADMIN_ID = :user_id;

-- Query to update ADMIN profile
UPDATE ADMIN 
SET NAME = :NAME, DOB = TO_DATE(:DOB, 'YYYY-MM-DD'), EMAIL = :EMAIL, 
    CITY = :CITY, STREET = :STREET, HOUSE = :HOUSE, PHONE = :PHONE 
WHERE ADMIN_ID = :user_id;

-- Query for USER profile
SELECT USER_NAME, 
       NAME, 
       DOB, 
       EMAIL, 
       PHONE, 
       TREAT(ADDRESS AS address_type).city AS CITY,
       TREAT(ADDRESS AS address_type).street AS STREET,
       TREAT(ADDRESS AS address_type).house AS HOUSE
FROM USERS 
WHERE USER_ID = :user_id;

-- Query to update USER profile
UPDATE USERS 
SET NAME = :NAME, 
    DOB = TO_DATE(:DOB, 'YYYY-MM-DD'), 
    EMAIL = :EMAIL, 
    PHONE = :PHONE, 
    ADDRESS = address_type(:CITY, :STREET, :HOUSE) 
WHERE USER_ID = :user_id;


-- Query for fetching company profile
SELECT * FROM COMPANY WHERE COM_ID = :userid;

-- Query for fetching all users for the admin's user list
SELECT * FROM USERS;

-- Query for fetching all companies for the admin's company list
SELECT * FROM COMPANY;

-- Query for fetching all merchandisers for the admin's merchandiser list
SELECT * FROM MERCHANDISER;

-- Query for fetching all roles
SELECT * FROM ROLE;

-- Query for generating the next media ID from the MEDIA_SEQ sequence
SELECT MEDIA_SEQ.NEXTVAL AS media_id FROM dual;

-- Query for inserting media into the MEDIA table
INSERT INTO MEDIA (MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE)
VALUES (:media_id, :title, :description, :rating, 0, :type, :genres, :trailer, :poster, :duration, TO_DATE(:releaseDate, 'YYYY-MM-DD'), :episode);

-- Query for inserting a role associated with a media into the MEDIAHASROLE table
INSERT INTO MEDIAHASROLE (ROLE_ID, MEDIA_ID) VALUES (:role_id, :media_id);

-- Query for inserting the media-company association into COMPANYHASMEDIA
INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) VALUES (:media_id, :com_id);

-- Query for fetching media IDs for a given company
SELECT MEDIA_ID FROM COMPANYHASMEDIA WHERE COM_ID = :com_id;

-- Query for fetching media details for a list of media IDs and company names
SELECT MEDIA.*, COMPANY.NAME AS COMPANY_NAME 
FROM MEDIA
LEFT JOIN COMPANYHASMEDIA ON MEDIA.MEDIA_ID = COMPANYHASMEDIA.MEDIA_ID
LEFT JOIN COMPANY ON COMPANYHASMEDIA.COM_ID = COMPANY.COM_ID
WHERE MEDIA.MEDIA_ID IN (:media_ids);

-- Query for inserting news into the NEWSANDUPDATES table
INSERT INTO NEWSANDUPDATES (NEWS_ID, DESCRIPTION, HEADLINE)
VALUES (NEWSANDUPDATES_SEQ.NEXTVAL, :description, :headline);

-- Query for fetching the last generated news ID from NEWSANDUPDATES_SEQ
SELECT NEWSANDUPDATES_SEQ.CURRVAL AS news_id FROM dual;


-- Query for fetching all media data
SELECT * FROM MEDIA_VIEW;

-- Query for media search
SELECT * FROM MEDIA_SEARCH
WHERE LOWER(TITLE) LIKE LOWER(:searchTerm)
AND (GENRE LIKE '%:genre%') -- Dynamically generated for selected genres
AND LOWER(TYPE) = LOWER(:selectedMediaType) -- Optional filter for media type
ORDER BY RATING DESC;

-- Query for media search by genre
SELECT * FROM MEDIA
WHERE UPPER(TITLE) LIKE UPPER(:searchTerm)
AND (GENRE LIKE '%:genre%') -- Dynamically generated for selected genres
ORDER BY RATING DESC;

-- Query for media page details
SELECT * FROM MEDIA_COMPANY_DETAILS WHERE MEDIA_ID = :id;
SELECT * FROM MEDIA_ROLE_DETAILS WHERE MEDIA_ID = :id;
SELECT * FROM MEDIA_NEWS_DETAILS WHERE MEDIA_ID = :id;
SELECT * FROM MEDIA_REVIEW_DETAILS WHERE MEDIA_ID = :id;

-- Query for adding media review
INSERT INTO REVIEWRATING (R_ID, DESCRIPTION, RATING, REVIEW_FOR, REVIEW_DATE)
VALUES (:review_id, :description, :rating, 'MEDIA', TO_DATE(:review_date, 'YYYY-MM-DD'));

INSERT INTO USERGIVEREVIEW (R_ID, USER_ID)
VALUES (:review_id, :user_id);

INSERT INTO REVIEWABOUTMEDIA (MEDIA_ID, R_ID)
VALUES (:media_id, :review_id);

SELECT RATING, RATING_COUNT FROM MEDIA WHERE MEDIA_ID = :media_id;

UPDATE MEDIA SET RATING = :newRating, RATING_COUNT = RATING_COUNT + 1 WHERE MEDIA_ID = :media_id;


-- Query to fetch product reviews
SELECT REVIEWRATING.R_ID, REVIEWRATING.DESCRIPTION, REVIEWRATING.RATING, USERS.NAME
FROM REVIEWRATING
JOIN USERGIVEREVIEW ON REVIEWRATING.R_ID = USERGIVEREVIEW.R_ID
JOIN REVIEWABOUTPRODUCT ON REVIEWRATING.R_ID = REVIEWABOUTPRODUCT.R_ID
JOIN USERS ON USERGIVEREVIEW.USER_ID = USERS.USER_ID
WHERE REVIEWABOUTPRODUCT.PRO_ID = :id
ORDER BY REVIEWRATING.REVIEW_DATE DESC;

-- Query to add a product review
INSERT INTO REVIEWRATING (R_ID, DESCRIPTION, RATING, REVIEW_FOR, REVIEW_DATE)
VALUES (:review_id, :description, :rating, 'PRODUCT', TO_DATE(:review_date, 'YYYY-MM-DD'));

-- Query to associate user with review
INSERT INTO USERGIVEREVIEW (R_ID, USER_ID)
VALUES (:review_id, :user_id);

-- Query to associate product with review
INSERT INTO REVIEWABOUTPRODUCT (PRO_ID, R_ID)
VALUES (:product_id, :review_id);

-- Query to retrieve current product rating and rating count
SELECT RATING, RATING_COUNT FROM PRODUCTS WHERE PRO_ID = :product_id;

-- Query to update product rating and rating count
UPDATE PRODUCTS 
SET RATING = :newRating, 
    RATING_COUNT = :newRatingCount 
WHERE PRO_ID = :product_id;

-- Query to fetch all products ordered by rating
SELECT * FROM PRODUCTS
ORDER BY RATING DESC;

-- Query to fetch product details by product ID
SELECT * FROM PRODUCTS WHERE PRO_ID = :id;

-- Query to fetch media details for specific media IDs
SELECT *
FROM MEDIA
WHERE MEDIA_ID IN (:mediaIds);

-- Query to fetch featured media
SELECT MEDIA_ID, TITLE, IMG_SRC, DESCRIPTION
FROM MEDIA_FEATURED;

-- Query to fetch products based on media ID
SELECT * FROM PRODUCTS
WHERE PRO_ID IN (
    SELECT PRO_ID FROM PRODUCTBASEDONMEDIA
    WHERE MEDIA_ID = :media_id
);

-- Query to check if a user has added a media to the list
SELECT * FROM USERWATCHANDFAVORITE 
WHERE USER_ID = :user_id
AND MEDIA_ID = :media_id;


-- Query for fetching watched media for a user
SELECT * FROM MEDIA 
WHERE MEDIA_ID IN (
    SELECT MEDIA_ID FROM USERWATCHANDFAVORITE 
    WHERE USER_ID = :user_id
    AND STATUS = 'WATCHED'
);

-- Query for fetching favorite media in "My List" for a user
SELECT * FROM MEDIA
WHERE MEDIA_ID IN (
    SELECT MEDIA_ID FROM USERWATCHANDFAVORITE
    WHERE USER_ID = :user_id
    AND FAVORITE = 'Y'
);

-- Query for inserting a favorite media for a user
INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE)
VALUES (:user_id, :media_id, :status);

-- Query for updating the favorite status of a media for a user
UPDATE USERWATCHANDFAVORITE 
SET FAVORITE = :status
WHERE USER_ID = :user_id
AND MEDIA_ID = :media_id;

-- Query for fetching favorite status of a media for a user
SELECT FAVORITE FROM USERWATCHANDFAVORITE
WHERE USER_ID = :user_id
AND MEDIA_ID = :media_id;

-- Query for deleting or updating favorite status in "WATCHED" or "PLAN_TO_WATCH"
UPDATE USERWATCHANDFAVORITE
SET FAVORITE = NULL
WHERE USER_ID = :user_id
AND MEDIA_ID = :media_id;

-- Query for deleting a media from user's favorites if it is not in "WATCHED" or "PLAN_TO_WATCH"
DELETE FROM USERWATCHANDFAVORITE
WHERE USER_ID = :user_id
AND MEDIA_ID = :media_id;

-- Query for fetching roles associated with media for a user
SELECT ROLE.ROLE_ID, ROLE.NAME, ROLE.IMG FROM ROLE
WHERE USER_ID = :user_id;


-- Query for checking favorite status for a role
SELECT * FROM PREFERENCEFORROLE
WHERE USER_ID = :user_id
AND ROLE_ID = :role_id;

-- Query for fetching all discussions
SELECT DISTINCT DISCUSSION.DIS_ID, TITLE, TOPIC, DISCUSSION.DESCRIPTION, REPLY_COUNT, DISCUSSIONABOUTMEDIA.DIS_DATE, MEDIA.POSTER
FROM DISCUSSION 
JOIN DISCUSSIONABOUTMEDIA ON DISCUSSION.DIS_ID = DISCUSSIONABOUTMEDIA.DIS_ID 
JOIN MEDIA ON DISCUSSIONABOUTMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
WHERE PARENT_TOPIC IS NULL
ORDER BY DISCUSSIONABOUTMEDIA.DIS_DATE DESC, DISCUSSION.REPLY_COUNT DESC;

-- Query for fetching user-specific discussions
SELECT DISTINCT DISCUSSION.DIS_ID, TITLE, TOPIC, DISCUSSION.DESCRIPTION, REPLY_COUNT, DISCUSSIONABOUTMEDIA.DIS_DATE, MEDIA.POSTER
FROM DISCUSSION 
JOIN DISCUSSIONABOUTMEDIA ON DISCUSSION.DIS_ID = DISCUSSIONABOUTMEDIA.DIS_ID 
JOIN MEDIA ON DISCUSSIONABOUTMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
JOIN USERSTARTDISCUSSION ON DISCUSSION.DIS_ID = USERSTARTDISCUSSION.DIS_ID
WHERE USERSTARTDISCUSSION.USER_ID = :user_id AND PARENT_TOPIC IS NULL
ORDER BY DISCUSSIONABOUTMEDIA.DIS_DATE DESC, DISCUSSION.REPLY_COUNT DESC;

-- Query for fetching replies to a discussion
SELECT DISCUSSION.DIS_ID, USERS.NAME, DISCUSSION.DESCRIPTION, DISCUSSION.REPLY_COUNT
FROM DISCUSSION
JOIN USERSTARTDISCUSSION ON DISCUSSION.DIS_ID = USERSTARTDISCUSSION.DIS_ID
JOIN USERS ON USERSTARTDISCUSSION.USER_ID = USERS.USER_ID
WHERE DISCUSSION.PARENT_TOPIC = :discussion_id
ORDER BY DISCUSSION.REPLY_COUNT ASC;

-- Query for fetching discussions on a specific media
SELECT DISTINCT DISCUSSION.DIS_ID, TITLE, TOPIC, DISCUSSION.DESCRIPTION, REPLY_COUNT, DISCUSSIONABOUTMEDIA.DIS_DATE, MEDIA.POSTER
FROM DISCUSSION 
JOIN DISCUSSIONABOUTMEDIA ON DISCUSSION.DIS_ID = DISCUSSIONABOUTMEDIA.DIS_ID 
JOIN MEDIA ON DISCUSSIONABOUTMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
WHERE PARENT_TOPIC IS NULL AND DISCUSSIONABOUTMEDIA.MEDIA_ID = :id
ORDER BY DISCUSSIONABOUTMEDIA.DIS_DATE DESC, DISCUSSION.REPLY_COUNT DESC;

-- Query for adding a new discussion
INSERT INTO DISCUSSION (DIS_ID, DESCRIPTION, TOPIC, REPLY_COUNT, PARENT_TOPIC)
VALUES (:dis_id, :description, :topic, 0, NULL);

INSERT INTO USERSTARTDISCUSSION (DIS_ID, USER_ID)
VALUES (:dis_id, :user_id);

INSERT INTO DISCUSSIONABOUTMEDIA (DIS_ID, MEDIA_ID, DIS_DATE)
VALUES (:dis_id, :media_id, TO_DATE(:dis_date, 'YYYY-MM-DD'));

-- Query for adding a new discussion reply
INSERT INTO DISCUSSION (DIS_ID, DESCRIPTION, REPLY_COUNT, PARENT_TOPIC)
VALUES (:dis_id, :description, :replyCount, :discussion_id);

INSERT INTO USERSTARTDISCUSSION (DIS_ID, USER_ID)
VALUES (:dis_id, :user_id);

UPDATE DISCUSSION SET REPLY_COUNT = (
    SELECT REPLY_COUNT FROM DISCUSSION WHERE DIS_ID = :dis_id
) WHERE DIS_ID = :discussion_id;

-- Query for fetching notifications
SELECT
    NEWSANDUPDATES.NEWS_ID,
    NEWSANDUPDATES.HEADLINE,
    NEWSANDUPDATES.DESCRIPTION,
    NEWSTOMEDIA.NEWS_DATE,
    MEDIA.TITLE AS MEDIA_TITLE,
    MEDIA.MEDIA_ID AS MEDIA_ID,
    MEDIA.POSTER AS MEDIA_POSTER
FROM
    NEWSANDUPDATES
JOIN
    NEWSTOMEDIA ON NEWSANDUPDATES.NEWS_ID = NEWSTOMEDIA.NEWS_ID
JOIN
    MEDIA ON NEWSTOMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
WHERE
    NEWSTOMEDIA.MEDIA_ID IN (
        SELECT MEDIA_ID FROM USERWATCHANDRATE WHERE USER_ID = :user_id
    );


-- Query to get statistics for users
SELECT 'User' AS name, COUNT(*) AS count FROM USERS
UNION ALL
SELECT 'Company' AS name, COUNT(*) AS count FROM COMPANY
UNION ALL
SELECT 'Merchandiser' AS name, COUNT(*) AS count FROM MERCHANDISER;

-- Query to get pie chart statistics for users
SELECT 'Total Users' AS name, 
       (SELECT COUNT(*) FROM USERS) + 
       (SELECT COUNT(*) FROM COMPANY) + 
       (SELECT COUNT(*) FROM MERCHANDISER) AS value
FROM DUAL
UNION ALL
SELECT 'Users' AS name, COUNT(*) AS value FROM USERS
UNION ALL
SELECT 'Companies' AS name, COUNT(*) AS value FROM COMPANY
UNION ALL
SELECT 'Merchandisers' AS name, COUNT(*) AS value FROM MERCHANDISER;

-- Query to get statistics for media
SELECT 'Media' AS name, COUNT(*) AS count FROM MEDIA
UNION ALL
SELECT 'Products' AS name, COUNT(*) AS count FROM PRODUCTS
UNION ALL
SELECT 'Roles' AS name, COUNT(*) AS count FROM ROLE;

-- Query to fetch genres from media
SELECT GENRE
FROM MEDIA;

-- Query to get type statistics
SELECT TYPE AS type, COUNT(*) AS count
FROM MEDIA
GROUP BY TYPE;

-- Query to get role statistics
SELECT ROLE_TYPE AS role, COUNT(*) AS count
FROM ROLE
GROUP BY ROLE_TYPE;

-- Query to fetch all media
SELECT * FROM MEDIA;

-- Query to fetch next product ID
SELECT PRODUCTS_SEQ.NEXTVAL AS pro_id FROM dual;

-- Query to insert product into the PRODUCTS table
INSERT INTO PRODUCTS (PRO_ID, NAME, DESCRIPTION, IMAGE, PRICE, QUANTITY)
VALUES (:pro_id, :name, :description, :image, :price, :quantity);

-- Query to insert association between product and media
INSERT INTO PRODUCTBASEDONMEDIA (PRO_ID, MEDIA_ID)
VALUES (:pro_id, :media_id);

-- Query to insert association between product and merch
INSERT INTO MERCHPRODUCEPROD (PRO_ID, MER_ID)
VALUES (:pro_id, :merchId);

-- Query to get product details for a specific merchandiser
SELECT PRODUCTS.* 
FROM MERCHANDISER, MERCHPRODUCEPROD, PRODUCTS 
WHERE MERCHANDISER.MER_ID = MERCHPRODUCEPROD.MER_ID
AND PRODUCTS.PRO_ID = MERCHPRODUCEPROD.PRO_ID
AND MERCHANDISER.MER_ID = :mer_id;


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Query to get all collaborate details for a merchandiser based on merchandiser ID
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SELECT C.NAME,
       COL.MER_ID,
       COL.COM_ID,
       COL.DESCRIPTION,
       COL.C_STATUS,
       (SELECT COUNT(P.PRO_ID)
        FROM PRODUCTS P
        JOIN PRODUCTBASEDONMEDIA PB ON P.PRO_ID = PB.PRO_ID
        JOIN COMPANYHASMEDIA CHM ON PB.MEDIA_ID = CHM.MEDIA_ID
        WHERE CHM.COM_ID = COL.COM_ID
        AND P.PRO_ID IN (
            SELECT PRO_ID
            FROM MERCHPRODUCEPROD
            WHERE MER_ID = COL.MER_ID
        )
       ) AS PRODUCT_COUNT
FROM COLLABORATE COL
JOIN MERCHANDISER C ON COL.MER_ID = C.MER_ID
WHERE COL.MER_ID = :mer_id
GROUP BY C.NAME, COL.MER_ID, COL.COM_ID, COL.DESCRIPTION, COL.C_STATUS, COL.COM_ID;

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Query to delete collaborate status for a specific company and merchandiser
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SELECT COUNT(*) AS COUNT 
FROM COLLABORATE 
WHERE COM_ID = :com_id 
AND MER_ID = :mer_id;

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Query to get all collaborate details for a company based on company ID
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SELECT C.NAME,
       COL.MER_ID,
       COL.DESCRIPTION,
       COL.C_STATUS,
       (SELECT COUNT(P.PRO_ID)
        FROM PRODUCTS P
        JOIN PRODUCTBASEDONMEDIA PB ON P.PRO_ID = PB.PRO_ID
        JOIN COMPANYHASMEDIA CHM ON PB.MEDIA_ID = CHM.MEDIA_ID
        WHERE CHM.COM_ID = COL.COM_ID
        AND P.PRO_ID IN (
            SELECT PRO_ID
            FROM MERCHPRODUCEPROD
            WHERE MER_ID = COL.MER_ID
        )
       ) AS PRODUCT_COUNT
FROM COLLABORATE COL
JOIN MERCHANDISER C ON COL.MER_ID = C.MER_ID
WHERE COL.COM_ID = :com_id
AND COL.C_STATUS = 'WAITING'
GROUP BY C.NAME, COL.MER_ID, COL.DESCRIPTION, COL.C_STATUS, COL.COM_ID;

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Query to get all collaborate details for a company based on company ID and collaboration status
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SELECT C.NAME,
       COL.MER_ID,
       COL.COM_ID,
       COL.DESCRIPTION,
       COL.C_STATUS,
       (SELECT COUNT(P.PRO_ID)
        FROM PRODUCTS P
        JOIN PRODUCTBASEDONMEDIA PB ON P.PRO_ID = PB.PRO_ID
        JOIN COMPANYHASMEDIA CHM ON PB.MEDIA_ID = CHM.MEDIA_ID
        WHERE CHM.COM_ID = COL.COM_ID
        AND P.PRO_ID IN (
            SELECT PRO_ID
            FROM MERCHPRODUCEPROD
            WHERE MER_ID = COL.MER_ID
        )
       ) AS PRODUCT_COUNT
FROM COLLABORATE COL
JOIN MERCHANDISER C ON COL.MER_ID = C.MER_ID
WHERE COL.COM_ID = :com_id
AND (COL.C_STATUS = 'ACCEPTED' OR COL.C_STATUS = 'REJECTED')
GROUP BY C.NAME, COL.MER_ID, COL.COM_ID, COL.DESCRIPTION, COL.C_STATUS, COL.COM_ID;

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Query to update collaboration status for a specific company and merchandiser
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UPDATE COLLABORATE
SET C_STATUS = :status
WHERE COM_ID = :com_id AND MER_ID = :mer_id;



-- Query for company details page advertisement product
SELECT P.PRO_ID, P.NAME, P.DESCRIPTION, P.IMAGE, P.PRICE, P.QUANTITY
FROM PRODUCTS P
JOIN PRODUCTBASEDONMEDIA PB ON P.PRO_ID = PB.PRO_ID
JOIN COMPANYHASMEDIA CHM ON PB.MEDIA_ID = CHM.MEDIA_ID
JOIN COLLABORATE COL ON P.PRO_ID = COL.PRO_ID AND CHM.COM_ID = COL.COM_ID
WHERE COL.COM_ID = :com_id
AND COL.C_STATUS = 'ACCEPTED';

-- Query for company details page media
SELECT *
FROM MEDIA
JOIN COMPANYHASMEDIA ON MEDIA.MEDIA_ID = COMPANYHASMEDIA.MEDIA_ID
WHERE COMPANYHASMEDIA.COM_ID = :com_id
ORDER BY MEDIA.RELEASE_DATE DESC;

-- Query for quantity check
SELECT QUANTITY
FROM PRODUCTS
WHERE PRO_ID = :PRO_ID;

-- Query for user order confirmation
INSERT INTO USERORDERSPRODUCT (USER_ID, PRO_ID, DELIVERY_STATUS, ORDER_DATE, ORDER_TIME, ORDER_QUANTITY)
VALUES (:user_id, :pro_id, 'PENDING', TO_DATE(:order_date, 'DD-MM-YYYY'), :order_time, :quantity);

-- Query for user order list
SELECT 
    TO_CHAR(ORDER_DATE, 'DD-MM-YYYY') AS ORDER_DATE,
    ORDER_TIME,  
    USER_ID, 
    ORDER_DETAILS, 
    DELIVERY_STATUS
FROM USER_ORDER_LIST
WHERE USER_ID = :user_id;

-- Query for merchandiser order list products
SELECT 
    PRO_ID, 
    NAME, 
    PRICE, 
    IMAGE
FROM PRODUCTS
WHERE PRO_ID IN (:productIds);

-- Query for merchandiser order user details
SELECT NAME, EMAIL, PHONE, 
    TREAT(ADDRESS AS address_type).city AS CITY, 
    TREAT(ADDRESS AS address_type).street AS STREET, 
    TREAT(ADDRESS AS address_type).house AS HOUSE
FROM USERS 
WHERE USER_ID = :user_id;


-- Query for fetching user details
SELECT NAME, EMAIL, PHONE, CITY, STREET, HOUSE 
FROM USERS 
WHERE USER_ID = :user_id;

-- Query for updating the order status
UPDATE USERORDERSPRODUCT 
SET DELIVERY_STATUS = :status 
WHERE USER_ID = :user_id
AND ORDER_DATE = TO_DATE(:order_date, 'DD-MM-YYYY')
AND ORDER_TIME = :order_time;

-- Query for deleting a specific order
SELECT COUNT(*) AS COUNT 
FROM USERORDERSPRODUCT 
WHERE USER_ID = :user_id
AND ORDER_DATE = TO_DATE(:order_date, 'DD-MM-YYYY')
AND ORDER_TIME = :order_time;

DELETE 
FROM USERORDERSPRODUCT
WHERE USER_ID = :user_id
AND ORDER_DATE = TO_DATE(:order_date, 'DD-MM-YYYY')
AND ORDER_TIME = :order_time;

-- Query for media recommendations
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
    PREFERREDGENRE P ON REGEXP_LIKE(M.GENRE, REPLACE(P.GENRES, ',', '|'))
WHERE 
    P.USER_ID = :USER_ID
    AND NOT EXISTS (
        SELECT 1 
        FROM USERWATCHANDFAVORITE UWF 
        WHERE UWF.USER_ID = P.USER_ID 
        AND UWF.MEDIA_ID = M.MEDIA_ID
    )
ORDER BY 
    M.RATING DESC;

-- Query for fetching favorite roles
SELECT * 
FROM ROLE 
JOIN PREFERENCEFORROLE ON ROLE.ROLE_ID = PREFERENCEFORROLE.ROLE_ID
WHERE PREFERENCEFORROLE.USER_ID = :user_id;

-- Query for fetching role and associated media
SELECT * 
FROM ROLE
WHERE ROLE_ID = :role_id;

SELECT * 
FROM MEDIA
JOIN MEDIAHASROLE ON MEDIA.MEDIA_ID = MEDIAHASROLE.MEDIA_ID
WHERE ROLE_ID = :role_id;

-- Query for fetching latest news associated with media
SELECT MEDIA.MEDIA_ID, MEDIA.TITLE, MEDIA.POSTER, NEWSANDUPDATES.NEWS_ID, 
       NEWSANDUPDATES.DESCRIPTION, NEWSANDUPDATES.HEADLINE, 
       NEWSTOMEDIA.NEWS_DATE
FROM NEWSANDUPDATES
JOIN NEWSTOMEDIA ON NEWSANDUPDATES.NEWS_ID = NEWSTOMEDIA.NEWS_ID
JOIN MEDIA ON NEWSTOMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
ORDER BY NEWSTOMEDIA.NEWS_DATE DESC;
