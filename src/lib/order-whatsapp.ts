import type { CartLine } from "@/lib/cart";
import { findProduct } from "@/lib/products";
import { GIFT_PACKAGING_FEE } from "@/lib/sets";

export const ORDER_WHATSAPP_NUMBER = "923239847938";

export type OrderCustomer = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  zipCode: string;
  address: string;
  paymentMethod: string;
};

function pkr(amount: number) {
  return `PKR ${amount.toLocaleString()}`;
}

export function createOrderId() {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MIMI-${date}-${rand}`;
}

function resolveOption(token: string) {
  const [slug, qtyRaw] = token.split(":");
  const product = findProduct(slug);
  const qty = qtyRaw && !Number.isNaN(Number(qtyRaw)) ? Number(qtyRaw) : undefined;
  return {
    slug,
    name: product?.name ?? slug,
    category: product?.category,
    qty,
  };
}

function lineUnitPrice(line: CartLine) {
  return line.isBundle && line.bundlePrice != null ? line.bundlePrice : line.product.price;
}

function lineDiscount(line: CartLine) {
  const paid = lineUnitPrice(line);
  const original = line.product.originalPrice;
  if (!original || original <= paid) return 0;
  return (original - paid) * line.qty;
}

export function buildOrderWhatsAppMessage(
  orderId: string,
  customer: OrderCustomer,
  lines: CartLine[],
  total: number,
  promoDiscount = 0,
) {
  const productDiscount = lines.reduce((sum, line) => sum + lineDiscount(line), 0);
  const subtotalBeforeDiscount = total + productDiscount;
  const finalTotal = total - promoDiscount;

  let message = `*MIMI BEAUTY — NEW ORDER*\n`;
  message += `Order ID: ${orderId}\n\n`;

  message += `*Items*\n`;
  lines.forEach((line, index) => {
    const { product, qty, isBundle, giftPackaging, selectedOptions, selectedQuantities } = line;
    const unit = lineUnitPrice(line);
    const options = (selectedOptions ?? []).map(resolveOption);

    message += `${index + 1}. ${product.name}\n`;
    if (isBundle) {
      message += `   Set name: ${product.name}\n`;
    }
    message += `   Quantity: ${qty}\n`;
    message += `   Product price: ${pkr(unit)}\n`;
    message += `   Line total: ${pkr(unit * qty)}\n`;

    if (selectedQuantities && Object.keys(selectedQuantities).length > 0) {
      const setLines = Object.entries(selectedQuantities)
        .filter(([, n]) => n > 0)
        .map(([slug, n]) => {
          const item = findProduct(slug);
          return `   - ${item?.name ?? slug} × ${n}`;
        });
      if (setLines.length) {
        message += `   Selected Set options:\n${setLines.join("\n")}\n`;
      }
    } else if (options.length > 0) {
      const oils = options.filter((o) => o.category === "BODY");
      const other = options.filter((o) => o.category !== "BODY");
      if (other.length) {
        message += `   Selected Set options: ${other.map((o) => (o.qty ? `${o.name} × ${o.qty}` : o.name)).join(", ")}\n`;
      }
      if (oils.length) {
        message += `   Body Oil selection: ${oils.map((o) => (o.qty ? `${o.name} × ${o.qty}` : o.name)).join(", ")}\n`;
      }
      if (!other.length && oils.length === 0) {
        message += `   Selected Set options: ${options.map((o) => o.name).join(", ")}\n`;
      }
    }

    message += `   Gift Packaging: ${giftPackaging ? `Yes (+ ${pkr(GIFT_PACKAGING_FEE)})` : "No"}\n\n`;
  });

  message += `*Totals*\n`;
  message += `Subtotal: ${pkr(subtotalBeforeDiscount)}\n`;
  if (promoDiscount > 0) {
    message += `Discount (MIMI10 – 10%): − ${pkr(promoDiscount)}\n`;
  }
  if (productDiscount > 0) {
    message += `Discount: − ${pkr(productDiscount)}\n`;
  } else if (promoDiscount === 0) {
    message += `Discount: ${pkr(0)}\n`;
  }
  message += `Final total: ${pkr(finalTotal)}\n\n`;

  message += `*Customer*\n`;
  message += `Name: ${customer.firstName} ${customer.lastName}\n`;
  message += `Phone: ${customer.phone}\n`;
  if (customer.email.trim()) {
    message += `Email: ${customer.email}\n`;
  }
  message += `Address: ${customer.address}\n`;
  message += `City: ${customer.city}\n`;
  if (customer.zipCode.trim()) {
    message += `Postal code: ${customer.zipCode}\n`;
  }
  if (customer.country.trim()) {
    message += `Country: ${customer.country}\n`;
  }
  message += `Payment method: Cash on Delivery\n`;

  return message;
}

export function openOrderWhatsApp(message: string) {
  const url = `https://wa.me/${ORDER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup) {
    window.location.href = url;
  }
}
