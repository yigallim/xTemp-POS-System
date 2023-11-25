import React from "react";
import { retail } from "../../config";
import { Row, Col } from "antd";
import { PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";

export default function CompanyInfo() {
    return (
        <Row
            gutter={16}
            align="middle"
            className="border-b border-gray-500"
            style={{ marginLeft: 0, marginRight: 0 }}
        >
            <Col xs={24} md={12} style={{ padding: 0 }}>
                <img
                    src="/img/banner.png"
                    alt="Restaurant"
                    className="h-full w-full retail-banner select-none"
                />
            </Col>

            <Col xs={24} md={12} style={{ padding: 0 }}>
                <div className="p-4 md:p-7 text-gray-900">
                    <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-4">
                        {retail.name}
                    </h2>
                    <div className="bg-primary h-1 w-20 md:w-32 mb-3 md:mb-5 flex align-middle"></div>
                    <p className="mb-3 text-gray-800 text-sm md:text-base tracking-wide md:tracking-wider">
                        <EnvironmentOutlined style={{fontSize: "1.2rem"}} /> &nbsp;{retail.address}
                    </p>
                    <p className="text-gray-800 text-sm md:text-base flex align-middle tracking-wider md:tracking-widest">
                        <PhoneOutlined style={{fontSize: "1.2rem"}} /> &nbsp; {retail.tel}
                    </p>
                </div>
            </Col>
        </Row>
    );
}
