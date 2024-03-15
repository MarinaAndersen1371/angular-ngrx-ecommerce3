import User from "../models/userModel.js";
import Mail from "../models/mailModel.js";

export const statisticsUsers = (activeUsers) => {
  return activeUsers.reduce(
    (acc, active) => {
      acc.qtyFemale += active.gender === "Female" ? 1 : 0;
      acc.qtyMale += active.gender === "Male" ? 1 : 0;
      acc.qtyPrivateCustomer +=
        active.purpose === "Private Customer" || active.purpose === "Other"
          ? 1
          : 0;
      acc.qtyFranchiseMember += active.purpose === "Franchise Member" ? 1 : 0;
      acc.qtyWholesaleBusiness +=
        active.purpose === "Wholesale Business" ? 1 : 0;
      acc.qtyPrime += active.isPrime ? 1 : 0;
      acc.qtyFranchise += active.isFranchise ? 1 : 0;
      acc.qtyTestPaid += active.testPaid ? 1 : 0;
      acc.qtyTestCompleted += +active.testScore > 79 ? 1 : 0;
      acc.qtyTestFailed +=
        +active.testScore < 80 && +active.testScore > 0 ? 1 : 0;
      acc.qtyPrimeCoupon += active.coupon !== "00" ? 1 : 0;
      return acc;
    },
    {
      qtyFemale: 0,
      qtyMale: 0,
      qtyPrivateCustomer: 0,
      qtyFranchiseMember: 0,
      qtyWholesaleBusiness: 0,
      qtyPrime: 0,
      qtyFranchise: 0,
      qtyTestPaid: 0,
      qtyTestCompleted: 0,
      qtyTestFailed: 0,
      qtyPrimeCoupon: 0,
    }
  );
};

// Function to calculate the subtotal of the cart
export function calculateSubtotal(cart) {
  return cart
    .reduce((acc, product) => {
      const quantity = +product.quantity;
      const price = +product.price;
      const discount = +product.discount;
      const warranty = +product.warranty;
      const extra1 = +product.extra1;
      const extra2 = +product.extra2;
      const gift = +product.gift;

      const itemTotal =
        price * quantity -
        price * quantity * discount +
        price * quantity * warranty +
        (extra1 + extra2) * quantity +
        gift;

      return acc + itemTotal;
    }, 0)
    .toFixed(2);
}

// Notification email
export const userNotification = async (
  user,
  notificationEmail,
  notificationSubject,
  notificationMessage
) => {
  const notification = await User.findOne({ email: notificationEmail });

  if (notification && notification.email !== user.email) {
    const mail = new Mail({
      user: notification._id,
      mailTarget: user.email,
      firstNameTarget: user.firstName,
      lastNameTarget: user.lastName,
      subject: notificationSubject,
      message: notificationMessage,
    });
    await mail.save();
  }
};
