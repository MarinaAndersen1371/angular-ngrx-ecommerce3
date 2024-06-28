import Mail from "../models/mailModel.js";
import User from "../models/userModel.js";

export const calculateStatistics = (orders) =>
  orders.reduce(
    (acc, order) => {
      acc.qtyPaid += order.isPaid ? 1 : 0;
      acc.qtyNotPaid += !order.isPaid ? 1 : 0;
      acc.costPaid += order.isPaid ? +order.totalCost : 0;
      acc.costNotPaid += !order.isPaid ? +order.totalCost : 0;
      acc.totalItemsPaid += order.isPaid ? +order.itemsPrice : 0;
      acc.totalItemsNotPaid += !order.isPaid ? +order.itemsPrice : 0;
      acc.totalPricePaid += order.isPaid ? +order.totalPrice : 0;
      acc.totalPriceNotPaid += !order.isPaid ? +order.totalPrice : 0;
      acc.taxPaid += order.isPaid ? +order.taxPrice : 0;
      acc.taxNotPaid += !order.isPaid ? +order.taxPrice : 0;
      acc.shippingPaid += order.isPaid ? +order.shippingPrice : 0;
      acc.shippingNotPaid += !order.isPaid ? +order.shippingPrice : 0;
      acc.qtyStandard += order.shippingPrice === 5 ? 1 : 0;
      acc.qtyFree += order.shippingPrice === 0 ? 1 : 0;
      acc.qtyFastest += order.shippingPrice === 10 ? 1 : 0;
      acc.qtySent += order.isSent ? 1 : 0;
      acc.qtyNotSent += !order.isSent ? 1 : 0;
      acc.qtyDelivered += order.isDelivered ? 1 : 0;
      acc.totalItemsReturn += +order.itemsPriceReturn;
      acc.totalReturnPaid += order.isPaid ? +order.totalPriceReturn : 0;
      acc.totalReturnNotPaid += !order.isPaid ? +order.totalPriceReturn : 0;
      acc.totalShippingReturn += +order.shippingPriceReturn;
      acc.totalTaxReturnPaid += order.isPaid ? +order.taxPriceReturn : 0;
      acc.totalTaxReturnNotPaid += !order.isPaid ? +order.taxPriceReturn : 0;
      acc.qtyReturn += order.returnActive ? 1 : 0;
      acc.qtyReturnReceived += order.returnReceived ? 1 : 0;
      acc.qtyReturnActive += order.returnActive && !order.returnClosed ? 1 : 0;
      acc.qtyReturnClosed += order.returnActive && order.returnClosed ? 1 : 0;
      acc.qtyGift += +order.giftPrice > 0 ? 1 : 0;
      acc.totalGiftPrice += +order.giftPrice;
      acc.qtyExtra += +order.extraPrice > 0 ? 1 : 0;
      acc.totalExtraPrice += +order.extraPrice;
      acc.qtyExtraActive += order.isExtra ? 1 : 0;
      acc.qtyExtraNotActive += +order.extraPrice > 0 && !order.isExtra ? 1 : 0;
      acc.qtyVoucher += order.voucher !== "00" ? 1 : 0;
      acc.totalPrimePaid += order.isPaid ? +order.primePrice : 0;
      acc.totalPrimeNotPaid += !order.isPaid ? +order.primePrice : 0;
      acc.totalFranchisePaid += order.isPaid ? +order.franchisePrice : 0;
      acc.totalFranchiseNotPaid += !order.isPaid ? +order.franchisePrice : 0;
      return acc;
    },
    {
      qtyPaid: 0,
      qtyNotPaid: 0,
      costPaid: 0,
      costNotPaid: 0,
      totalItemsPaid: 0,
      totalItemsNotPaid: 0,
      totalPricePaid: 0,
      totalPriceNotPaid: 0,
      taxPaid: 0,
      taxNotPaid: 0,
      shippingPaid: 0,
      shippingNotPaid: 0,
      qtyStandard: 0,
      qtyFree: 0,
      qtyFastest: 0,
      qtySent: 0,
      qtyNotSent: 0,
      qtyDelivered: 0,
      totalItemsReturn: 0,
      totalReturnPaid: 0,
      totalReturnNotPaid: 0,
      totalShippingReturn: 0,
      totalTaxReturnPaid: 0,
      totalTaxReturnNotPaid: 0,
      qtyReturn: 0,
      qtyReturnReceived: 0,
      qtyReturnActive: 0,
      qtyReturnClosed: 0,
      qtyGift: 0,
      totalGiftPrice: 0,
      qtyExtra: 0,
      totalExtraPrice: 0,
      qtyExtraActive: 0,
      qtyExtraNotActive: 0,
      qtyVoucher: 0,
      totalPrimePaid: 0,
      totalPrimeNotPaid: 0,
      totalFranchisePaid: 0,
      totalFranchiseNotPaid: 0,
    }
  );

export const orderNotification = async (
  order,
  notificationEmail,
  notificationSubject,
  notificationMessage
) => {
  const notification = await User.findOne({ email: notificationEmail });

  if (notification && notification.email !== order.user.email) {
    const mail = new Mail({
      user: notification._id,
      mailTarget: order.user.email,
      firstNameTarget: order.user.firstName,
      lastNameTarget: order.user.lastName,
      subject: notificationSubject,
      message: notificationMessage,
    });
    await mail.save();
  }
};

export const handleSubscription = async (
  order,
  subscriptionType,
  additionalMessage
) => {
  const notificationEmail = "manager@web.de";
  const notificationSubject = `Your ${subscriptionType}, ${order.user.firstName}!`;
  const notificationMessage = `Hello, ${order.user.firstName}! Thank you for the subscription! ${additionalMessage}`;

  await orderNotification(
    order,
    notificationEmail,
    notificationSubject,
    notificationMessage
  );
};
