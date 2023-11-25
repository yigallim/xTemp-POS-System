import React, { useState } from "react";
import { Select, Button, Card } from "antd";
import { Link } from "react-router-dom";
import { seatNumbers } from "../config";

const { Option } = Select;

export default function SelectSeat() {
  const [selectedSeat, setSelectedSeat] = useState("101");

  const handleSeatChange = (value) => {
    setSelectedSeat(value);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card
        title="Select a Seat"
        className="w-80 md:w-96 shadow-xl container mb-20 font-poppins"
        headStyle={{ fontSize: "1.5rem", padding: "0.75em 1em" }}
      >
        <div className="mb-6">
          <label className="text-lg font-semibold mb-2">Seat Number:</label>
          <Select
            showSearch
            value={selectedSeat}
            onChange={handleSeatChange}
            style={{ width: "100%" }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {seatNumbers.map((seat) => (
              <Option key={seat} value={seat}>
                {seat}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Link to={`/${selectedSeat}`}>
            <Button
              type="primary"
              className="bg-primary font-poppins font-semibold button-hover h-10 px-5"
            >
              Confirm
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
