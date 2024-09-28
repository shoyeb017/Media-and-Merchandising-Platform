

CREATE OR REPLACE FUNCTION check_phone(phone VARCHAR2) RETURN BOOLEAN IS
    len NUMBER;
BEGIN
    len := LENGTH(phone);

    IF len = 11 AND REGEXP_LIKE(phone, '^[0-9]+$') THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
/

CREATE OR REPLACE FUNCTION check_email(email VARCHAR2) RETURN BOOLEAN IS
BEGIN
    IF REGEXP_LIKE(email, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
/


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
    p_login_id IN NUMBER,     
    p_user_id  OUT NUMBER    
) AS
    is_valid_phone BOOLEAN;
    is_valid_email BOOLEAN;
BEGIN
    is_valid_phone := check_phone(p_phone);
    IF NOT is_valid_phone THEN
        RAISE_APPLICATION_ERROR(-20001, 'Invalid phone number. Must be 11 digits.');
    END IF;

    is_valid_email := check_email(p_email);
    IF NOT is_valid_email THEN
        RAISE_APPLICATION_ERROR(-20002, 'Invalid email format.');
    END IF;

    INSERT INTO USERS (USER_ID, USER_NAME, NAME, DOB, EMAIL, PHONE, ADDRESS)
    VALUES (
        USERS_SEQ.NEXTVAL, 
        p_username, 
        p_name, 
        p_dob, 
        p_email, 
        p_phone, 
        address_type(p_city, p_street, p_house) 
    )
    RETURNING USER_ID INTO p_user_id;

    INSERT INTO LOGIN (LOGIN_ID, PASSWORD, ROLE, ID)
    VALUES (p_login_id, p_password, 'USER', p_user_id);

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
    p_login_id   IN NUMBER,     
    p_merch_id   OUT NUMBER     
) AS
BEGIN
    INSERT INTO MERCHANDISER (MER_ID, USER_NAME, NAME, DESCRIPTION, EMAIL, CITY, STREET, HOUSE, PHONE)
    VALUES (MERCHANDISER_SEQ.NEXTVAL, p_username, p_name, p_description, p_email, p_city, p_street, p_house, p_phone)
    RETURNING MER_ID INTO p_merch_id;
    
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
    p_login_id   IN NUMBER,  
    p_com_id     OUT NUMBER     
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



