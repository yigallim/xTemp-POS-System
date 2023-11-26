import { foods, foodCategories } from "../config";

export const calculateCustomizationTotal = (customizations) => {
  return customizations.reduce((total, customization) => {
    const selectedValueObject = foodCategories
      .flatMap((category) => category.customize)
      .flatMap((customize) =>
        customize.value.map((value) => ({ ...value, customizeId: customize.id }))
      )
      .find(
        (value) => value.name === customization.value && value.customizeId === customization.id
      );

    return total + (selectedValueObject ? selectedValueObject.priceDiffer : 0);
  }, 0);
};

export const calculateItemPrice = (item) => {
  const basePrice = parseFloat(foods.find((food) => food.id === item.foodId).price);
  const customizationTotal = calculateCustomizationTotal(item.customize);

  return (
    (basePrice +
      customizationTotal +
      (item.isTakeaway
        ? foodCategories.find((category) => category.id === item.categoryId).takeawayCharge
        : 0)) *
    item.quantity
  );
};

export const calculateTotalPriceForEntries = (cartItems) => {
  const totalAmount = cartItems.reduce((total, item) => {
    const itemPrice = calculateItemPrice(item);
    return total + itemPrice;
  }, 0);

  return totalAmount;
};
