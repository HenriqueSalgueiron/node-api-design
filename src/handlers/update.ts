import prisma from "../db";

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);
  res.json({ data: updates });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });
  if (!product) {
    return res.json({ message: "Product not found" });
  }
  const update = await prisma.update.create({
    data: req.body, // = req.body.title, req.body.body, req.body.productId
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  // catch user products
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  // catch user updates
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  // check if update :id exists
  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: "Update not found" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({data: updatedUpdate})
};

export const deleteUpdate = async (req, res) => {
  // Catch user products
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  // Catch updates
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  // Check if update exists
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: "Update not found" });
  }
  // Delete
  const deleted = prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({data: deleted})
};
