import React from "react";
import "./NotificationCard.css";

function NotificationCard(props) {
  const { cls, title } = props.item;
  return (
    <div>
      <div className={`card m-2 tickets-${cls}`}>
        <div className="card-body">
          <h5
            className={`card-title mb-4 tickets-${cls}-title`}
          >{`Tickets (${title})`}</h5>
          {title === "Resolved" ? (
            <h5 className="card-subtitle mb-2 text-muted">0</h5>
          ) : (
            <h5 className="card-subtitle mb-2 text-muted">{props.count}</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
