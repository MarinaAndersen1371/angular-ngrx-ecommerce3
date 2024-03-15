export const statisticsProducts = (products) =>
  products.reduce(
    (acc, product) => {
      acc.qtyStock += +product.quantity;
      acc.qtyExtra += product.extra ? 1 : 0;
      acc.qtyExtraStock += product.extra ? +product.quantity : 0;
      acc.qtyAudio += product.category === "Audio" ? 1 : 0;
      acc.qtyAudioStock += product.category === "Audio" ? +product.quantity : 0;
      acc.qtyElectronics += product.category === "Electronics" ? 1 : 0;
      acc.qtyElectronicsStock +=
        product.category === "Electronics" ? +product.quantity : 0;
      acc.qtySmartHome += product.category === "Smart Home" ? 1 : 0;
      acc.qtySmartHomeStock +=
        product.category === "Smart Home" ? +product.quantity : 0;
      return acc;
    },
    {
      qtyStock: 0,
      qtyExtra: 0,
      qtyExtraStock: 0,
      qtyAudio: 0,
      qtyAudioStock: 0,
      qtyElectronics: 0,
      qtyElectronicsStock: 0,
      qtySmartHome: 0,
      qtySmartHomeStock: 0,
    }
  );
