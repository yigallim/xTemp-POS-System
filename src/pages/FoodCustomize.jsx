import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Row, Col, Radio, Space, Input, Checkbox } from "antd";
import localStorage from "local-storage";
import BottomBar from "../components/Ordering/BottomBar";
import QuantityControl from "../components/Ordering/QuantityControl";
import { useApi } from "../context/ApiProvider";
import { calculateItemPrice } from "../utils/calculatePrice";
import { bottomBarType, colors, foodCategories, foods } from "../config";

export default function FoodCustomize() {
  const api = useApi();
  const navigate = useNavigate();
  const { seat, foodId } = useParams();

  const actualFoodId = foodId.substring("customize-".length);
  const food = foods.find((item) => item.id === actualFoodId);
  const foodCategory = foodCategories.find((category) => category.id === food.categoryId);
  
  const [foodEntry, setFoodEntry] = useState({
    foodId: food.id,
    categoryId: food.categoryId,
    quantity: 1,
    customize: [],
    isTakeaway: false,
    remarks: "",
  });

  const canAddToCartRef = useRef(false);

  useEffect(() => {
    const allCustomizationsSelected =
      foodCategory.customize &&
      foodCategory.customize.every((customization) =>
      foodEntry.customize.some((selected) => selected.id === customization.id)
      );
    canAddToCartRef.current = allCustomizationsSelected;
  }, [foodEntry.customize, foodCategory.customize]);

  const handleTakeawayChange = (event) => setFoodEntry({ ...foodEntry, isTakeaway: event.target.checked });

  const handleCustomizationChange = (id, value) => {
    const selectedCustomization = foodEntry.customize;
    const updatedCustomize = [...selectedCustomization.filter((c) => c.id !== id), { id, value }];
    setFoodEntry({...foodEntry, customize : updatedCustomize});
  };

  const handleRemarksChange = (event) => (setFoodEntry({ ...foodEntry , remarks: event.target.value}));

  const handleQuantityChange = (newQuantity) => setFoodEntry({ ...foodEntry, quantity: newQuantity });

  const addFoodToCart = () => {
    if (canAddToCartRef.current) {
      const existingCartItems = localStorage.get("cartItems") || [];
      const existingItemIndex = existingCartItems.findIndex(
        (item) =>
          item.foodId === food.id &&
          JSON.stringify(item.customize) === JSON.stringify(foodEntry.customize) &&
          item.isTakeaway === foodEntry.isTakeaway 
      );

      if (existingItemIndex !== -1) {
        existingCartItems[existingItemIndex].quantity += foodEntry.quantity;
        existingCartItems[existingItemIndex].remarks += `\n${foodEntry.remarks}`;
      } else 
          existingCartItems.push(foodEntry);
      
      console.log(foodEntry);
      localStorage.set("cartItems", existingCartItems);
      navigate(`/${seat}`);

      if (existingItemIndex !== -1) {
        api["success"]({
          message: "Item Quantity Updated in Cart",
          description: `You updated the quantity of ${food.name} in your cart.`,
          duration: 1.5,
          placement: "top",
          style: {
            padding: "1.2em 0em 1em 1.5em",
          },
        });
      } else {
        api["success"]({
          message: "Item Added to Cart",
          description: `You added ${foodEntry.quantity} ${food.name} to your cart.`,
          duration: 1.5,
          placement: "top",
          style: {
            padding: "1.2em 0em 1em 1.5em",
          },
        });
      }
    } else {
      api["error"]({
        message: "Unable to Add to Cart",
        description: "Please make sure you have selected all required options.",
        duration: 2,
        placement: "top",
        style: {
          padding: "1em 0em 1em 1.5em",
        },
      });
    }
  };

  return (
    <div className="min-h-screen md:mx-28 lg:mx-60 md:border-x md:shadow-2xl pb-20 bg-slate-100">
      <Row gutter={[0, 10]}>
        <Col span={24} className="border-b border-gray-300 bg-white">
          <div className="h-48 md:h-64 lg:h-80 overflow-hidden">
            <img src={food.src} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="p-4 py-3">
            <h2 className="text-2xl font-semibold py-1">
              {food.id}. {food.name}
            </h2>
            <p className="text-sm text-gray-600 py-0.5">{food.description}</p>
            <div className="flex justify-between">
              <div>
                <p className="text-lg font-semibold py-0.5" style={{ color: colors.primary }}>
                  RM{parseFloat(food.price).toFixed(2)}
                </p>
                <Link
                  to={`/${seat}`}
                  className="text-base text-blue-500 hover:underline py-1 flex items-center"
                >
                  <LeftOutlined className="mr-1" />
                  Back to Ordering
                </Link>
              </div>
              <QuantityControl minQuantity={1} onQuantityChange={handleQuantityChange} />
            </div>
          </div>
        </Col>

        {foodCategory.customize &&
          foodCategory.customize.map((customization) => (
            <Col span={24} className="border-y border-gray-300 bg-white" key={customization.name}>
              <h3 className="font-semibold py-2 px-5 text-base">
                {customization.name}{" "}
                <span className="text-orange-600 text-sm ml-1">(Required)</span>
              </h3>
              <div className="border-t border-gray-300 pt-2.5"></div>
              <Radio.Group
                className="px-5 mb-2.5 w-full"
                name={foodCategory.name}
                onChange={(e) => handleCustomizationChange(customization.id, e.target.value)}
              >
                <Space direction="vertical" size={15} className="w-full">
                  {customization.value.map((value) => (
                    <Row key={value.name} justify="space-between" align="middle">
                      <Col>
                        <Radio value={value.name}>{value.name}</Radio>
                      </Col>
                      <Col className="text-slate-600">
                        {value.priceDiffer > 0
                          ? `+ ${value.priceDiffer.toFixed(2)}`
                          : value.priceDiffer.toFixed(2)}
                      </Col>
                    </Row>
                  ))}
                </Space>
              </Radio.Group>
            </Col>
          ))}

        <Col span={24} className="border-y border-gray-300 bg-white">
          <h3 className="font-semibold py-2 px-5 text-base">Takeaway</h3>
          <div className="border-t border-gray-300 py-2 px-5 flex justify-between">
            <Checkbox checked={foodEntry.isTakeaway} onChange={handleTakeawayChange}>
              Takeaway Charge
            </Checkbox>
            <p className="text-slate-600">+ {foodCategory.takeawayCharge.toFixed(2)}</p>
          </div>
        </Col>

        <Col span={24} className="border-y border-gray-300 bg-white">
          <h3 className="font-semibold py-2 px-5 text-base">Remarks</h3>
          <div className="border-t border-gray-300 pt-2">
            <Input.TextArea
              rows={4}
              placeholder="Add remarks here..."
              className="mb-2.5 px-5"
              bordered={false}
              onChange={handleRemarksChange}
            />
          </div>
        </Col>
      </Row>
      <BottomBar
        type={bottomBarType.customizingFood}
        onConfirm={addFoodToCart}
        price={calculateItemPrice(foodEntry)}
      />
    </div>
  );
}
