export function matchesCategory(product, category) {
  if (category === "All") return true;

  const value = `${product.category || ""} ${product.name || ""}`.toLowerCase();

  if (category === "Shoes") {
    return /shoe|sneaker|trainer|boot|sandal/.test(value);
  }

  if (category === "Sport") {
    return /sport|ball|athletic|basketball|football|fitness|gym/.test(value);
  }

  if (category === "cook") {
    return /cook|toaster|kettle|blender|cooker|microwave|kitchen/.test(value);
  }

  return !/shoe|sneaker|trainer|boot|sandal|sport|ball|athletic|basketball|football|fitness|gym|cook|toaster|kettle|blender|cooker|microwave|kitchen/.test(value);
}
