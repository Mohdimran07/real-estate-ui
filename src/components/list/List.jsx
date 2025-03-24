import React from "react";
import "./list.scss";
import { listData } from "../../lib/dummydata";
import Card from "../card/Card";

const List = ({ postData }) => {
  return (
    <div className="list">
      {postData?.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
