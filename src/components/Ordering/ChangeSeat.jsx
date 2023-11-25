import React, { useState } from "react";
import { Modal, Button, Select } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiProvider";
import { colors, seatNumbers } from "../../config";

const { Option } = Select;

export default function ChangeSeat({ isModalVisible, closeModal }) {
  const api = useApi();
  const navigate = useNavigate();
  const { seat } = useParams();
  const [selectedSeat, setSelectedSeat] = useState(seat);

  const handleSeatChange = (value) => {
    setSelectedSeat(value);
  };

  const handleConfirm = () => {
    if (selectedSeat === seat) {
      api["warning"]({
        message: "Seat Not Changed",
        description: `You didn't select a differrent seat.`,
        duration: 1.5,
        placement: "top",
        style: {
          padding: "1.2em 0em 1em 1.5em",
        },
      });
    }
    else {
      navigate(`/${selectedSeat}`);
      closeModal();
      api["success"]({
        message: "Seat Changed",
        description: `You have changed your seat to Table No. ${selectedSeat}.`,
        duration: 1.5,
        placement: "top",
        style: {
          padding: "1.2em 3em 1em 1.5em",
        },
      });
    }
  };

  const modalStyles = {
    header: {
      borderLeft: `5px solid ${colors.primary}`,
      borderRadius: 0,
      paddingInlineStart: 10,
      borderBottom: "1px rgba(0, 0, 0, 0.15) solid",
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
    content: {
      boxShadow: "0 0 30px #999",
    },
    title: {
      fontSize: "200px",
      fontWeight: "bold",
    },
  };

  return (
    <Modal
      title="Change Seat"
      open={isModalVisible}
      onCancel={closeModal}
      footer={null}
      styles={modalStyles}
    >
      <p className="pt-5 pb-2">Select Seat Number To Change :</p>
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
      <div className="text-right pt-5">
        <Button onClick={closeModal} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleConfirm} style={{ background: colors.primary }}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
