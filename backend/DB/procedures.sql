CREATE OR REPLACE PROCEDURE RegisterUser(
    p_username IN VARCHAR2,
    p_password IN VARCHAR2,
    p_name     IN VARCHAR2,
    p_dob      IN DATE,
    p_email    IN VARCHAR2,
    p_city     IN VARCHAR2,
    p_street   IN VARCHAR2,
    p_house    IN VARCHAR2,
    p_phone    IN VARCHAR2,
    p_genres   IN VARCHAR2,
    p_login_id IN NUMBER,     -- Login ID is now passed as a parameter
    p_user_id  OUT NUMBER
) AS
BEGIN
    -- Insert into USERS table
    INSERT INTO USERS (USER_ID, USER_NAME, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE)
    VALUES (USERS_SEQ.NEXTVAL, p_username, p_name, p_dob, p_email, p_city, p_street, p_house, p_phone)
    RETURNING USER_ID INTO p_user_id;

    -- Insert into LOGIN table
    INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
    VALUES (p_login_id, p_password, 'USER', p_user_id);

    -- Insert into PREFERREDGENRE table
    INSERT INTO PREFERREDGENRE (USER_ID, GENRES)
    VALUES (p_user_id, p_genres);

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE RegisterMerchandiser(
    p_username   IN VARCHAR2,
    p_password   IN VARCHAR2,
    p_name       IN VARCHAR2,
    p_description IN VARCHAR2,
    p_email      IN VARCHAR2,
    p_city       IN VARCHAR2,
    p_street     IN VARCHAR2,
    p_house      IN VARCHAR2,
    p_phone      IN VARCHAR2,
    p_login_id   IN NUMBER,     -- Pass login_id as an input parameter
    p_merch_id   OUT NUMBER     -- Merchandiser ID returned
) AS
BEGIN
    -- Insert into MERCHANDISER table
    INSERT INTO MERCHANDISER (MER_ID, USER_NAME, NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE)
    VALUES (MERCHANDISER_SEQ.NEXTVAL, p_username, p_name, p_description, p_email, p_city, p_street, p_house, p_phone)
    RETURNING MER_ID INTO p_merch_id;

    -- Insert into LOGIN table
    INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
    VALUES (p_login_id, p_password, 'MERCHANDISER', p_merch_id);

    COMMIT;
END;
/
CREATE OR REPLACE PROCEDURE RegisterCompany(
    p_username   IN VARCHAR2,
    p_password   IN VARCHAR2,
    p_name       IN VARCHAR2,
    p_img        IN VARCHAR2,
    p_email      IN VARCHAR2,
    p_description IN VARCHAR2,
    p_login_id   IN NUMBER,     -- Pass login_id as an input parameter
    p_com_id     OUT NUMBER     -- Company ID returned
) AS
BEGIN
    -- Insert into COMPANY table
    INSERT INTO COMPANY (COM_ID, USER_NAME, NAME, IMG, EMAIL, DESCRIPTION)
    VALUES (COMPANY_SEQ.NEXTVAL, p_username, p_name, p_img, p_email, p_description)
    RETURNING COM_ID INTO p_com_id;

    -- Insert into LOGIN table
    INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
    VALUES (p_login_id, p_password, 'COMPANY', p_com_id);

    COMMIT;
END;
/

