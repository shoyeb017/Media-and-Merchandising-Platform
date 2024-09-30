import React, { useState, useEffect } from "react";
import "./RoleCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const RoleCard = ({ role }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        console.log("role id:", role.NAME);
        const response = await fetch(
          "http://localhost:5000/media/favorite/role/status",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: localStorage.getItem("user_id"),
              role_id: role.ROLE_ID,
            }),
          }
        );
        if (response.status === 200) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };
    fetchFavorite();
  }, [role.ROLE_ID]);

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    try {
      await fetch("http://localhost:5000/media/favorite/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          role_id: role.ROLE_ID,
          is_favorite: !isFavorite,
        }),
      });
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className="role-card111">
      <img src={role.IMG} alt={role.NAME} className="role-img111" />
      <div className="role-info111">
        <h4>{role.NAME}</h4>
        <p>{role.ROLE_TYPE}</p>
      </div>
    </div>
  );
};

export default RoleCard;
