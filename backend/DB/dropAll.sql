-- drop table USERS cascade constraints;
-- drop table ADMIN cascade constraints;
-- drop table MERCHANDISER cascade constraints;
-- drop table COMPANY cascade constraints;
-- drop table MEDIA cascade constraints;
-- drop table DISCUSSION cascade constraints;
-- drop table LOGIN cascade constraints;
-- drop table PRODUCTS cascade constraints;
-- drop table NEWSANDUPDATES cascade constraints;
-- drop table ROLE cascade constraints;
-- drop table PREFERREDGENRE cascade constraints;
-- drop table PREFERENCEFORMEDIA cascade constraints;
-- drop table PREFERENCEFORROLE cascade constraints;
-- drop table USERWATCHANDFAVORITE cascade constraints;
-- drop table USERSTARTDISCUSSION cascade constraints;
-- drop table MEDIAHASROLE cascade constraints;
-- drop table COMPANYHASMEDIA cascade constraints;
-- drop table COMPANYGIVENEWS cascade constraints;
-- drop table COLLABORATE cascade constraints;
-- drop table MERCHPRODUCEPROD cascade constraints;
-- drop table USERORDERSPRODUCT cascade constraints;
-- drop table PRODUCTBASEDONMEDIA cascade constraints;
-- drop table REVIEWRATING cascade constraints;
-- drop table USERGIVEREVIEW cascade constraints;
-- drop table REVIEWABOUTMEDIA cascade constraints;
-- drop table REVIEWABOUTPRODUCT cascade constraints;
-- drop table DISCUSSIONABOUTMEDIA cascade constraints;
-- drop table NEWSTOMEDIA cascade constraints;

BEGIN
   FOR rec IN (SELECT table_name FROM user_tables) LOOP
      EXECUTE IMMEDIATE 'DROP TABLE ' || rec.table_name || ' CASCADE CONSTRAINTS';
   END LOOP;
END;
/


-- DROP SEQUENCE USERS_SEQ;
-- DROP SEQUENCE MERCHANDISER_SEQ;
-- DROP SEQUENCE COMPANY_SEQ;
-- DROP SEQUENCE MEDIA_SEQ;
-- DROP SEQUENCE NEWSANDUPDATES_SEQ;
-- DROP SEQUENCE PRODUCTS_SEQ;
-- DROP SEQUENCE ROLE_SEQ;

BEGIN
   FOR rec IN (SELECT sequence_name FROM user_sequences) LOOP
      EXECUTE IMMEDIATE 'DROP SEQUENCE ' || rec.sequence_name;
   END LOOP;
END;
/

DROP TYPE address_type;


-- DROP TRIGGER update_product_quantity;
-- DROP TRIGGER increase_product_quantity;
-- DROP TRIGGER calculate_age;

BEGIN
    FOR i IN (SELECT trigger_name FROM user_triggers) LOOP
        EXECUTE IMMEDIATE 'DROP TRIGGER ' || i.trigger_name;
    END LOOP;
END;
/


-- DROP PROCEDURE RegisterUser;
-- DROP PROCEDURE RegisterMerchandiser;
-- DROP PROCEDURE RegisterCompany;

BEGIN 
    FOR i IN (SELECT object_name FROM user_objects WHERE object_type IN ('PROCEDURE')) LOOP
        EXECUTE IMMEDIATE 'DROP PROCEDURE ' || i.object_name;
    END LOOP;
END;
/
-- DROP FUNCTION check_phone;
-- DROP FUNCTION check_email;

BEGIN 
    FOR i IN (SELECT object_name FROM user_objects WHERE object_type IN ('FUNCTION')) LOOP
        EXECUTE IMMEDIATE 'DROP FUNCTION ' || i.object_name;
    END LOOP;
END;
/

-- DROP VIEW MEDIA_COMPANY_DETAILS;
-- DROP VIEW MEDIA_ROLE_DETAILS;
-- DROP VIEW MEDIA_REVIEW_DETAILS;
-- DROP VIEW MEDIA_NEWS_DETAILS;
-- DROP VIEW MEDIA_PRODUCT_DETAILS;
-- DROP VIEW MEDIA_FEATURED;
-- DROP VIEW MEDIA_SEARCH;
-- DROP VIEW MEDIA_VIEW;
-- DROP VIEW USER_ORDER_LIST;
-- DROP VIEW DISCUSSION_DETAILS;
-- DROP VIEW COMPANY_NEWS_DETAILS;


BEGIN
    FOR i IN (SELECT view_name FROM user_views) LOOP
        EXECUTE IMMEDIATE 'DROP VIEW ' || i.view_name;
    END LOOP;
END;
/