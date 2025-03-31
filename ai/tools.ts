import { tool } from "ai";
import { z } from "zod";

export const weatherTool = tool({
  description: "Get the weather in a location",
  parameters: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: async ({ location }) => ({
    location,
    temperature: 72 + Math.floor(Math.random() * 21) - 10,
  }),
});

// Define a coffee item type
const coffeeItemSchema = z.object({
  coffeeType: z
    .enum(["Cafe Mocha", "Macchiato", "Latte", "Cappuccino", "Espresso"])
    .describe("The type of coffee ordered"),
  size: z.enum(["Small", "Medium", "Large"]).describe("The size of the coffee"),
  quantity: z
    .number()
    .min(1)
    .default(1)
    .describe("The number of this type of coffee"),
  syrups: z
    .array(z.enum(["Vanilla", "Chocolate", "Caramel", "Hazelnut", "None"]))
    .describe("The syrups to be added to the coffee"),
  shotType: z
    .enum(["Single", "Double"])
    .optional()
    .default("Single")
    .describe("The type of shot"),
  milkType: z
    .enum(["2% Milk", "Oat Milk", "None"])
    .describe("The type of milk to be added to the coffee"),
});

// Coffee order tool
export const coffeeOrderTool = tool({
  description:
    "Place coffee orders for customers, supporting multiple coffee types per order",
  parameters: z.object({
    customerName: z.string().describe("The customer's first name"),
    coffeeItems: z
      .array(coffeeItemSchema)
      .describe("List of coffee items in this order"),
  }),
  execute: async ({ customerName, coffeeItems }) => {
    try {
      const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
      const totalItems = coffeeItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const estimatedTime = `${
        5 + Math.floor(Math.random() * 10) + Math.floor(totalItems / 2)
      } minutes`;

      return {
        status: "success",
        orderDetails: {
          customerName,
          coffeeItems,
          orderId,
          estimatedTime,
          totalItems,
        },
      };
    } catch {
      return {
        status: "error",
        message: "Failed to place coffee order",
      };
    }
  },
});

// Coffee order status tool
export const orderStatusTool = tool({
  description: "Check the status of a coffee order",
  parameters: z.object({
    orderId: z.string().describe("The ID of the order to check"),
    customerName: z.string().describe("The customer's first name"),
  }),
  execute: async ({ orderId, customerName }) => {
    try {
      // Mock database of orders
      const mockOrders = {
        // Using a template literal to match potential order IDs generated by coffeeOrderTool
        [`ORD-${orderId.replace(/\D/g, "")}`]: {
          status: ["pending", "processing", "completed"][
            Math.floor(Math.random() * 3)
          ],
          details: {
            // We don't know the exact coffee type, so we'll use the order ID to determine it
            coffeeType: [
              "Cafe Mocha",
              "Macchiato",
              "Latte",
              "Cappuccino",
              "Espresso",
            ][parseInt(orderId.replace(/\D/g, "")) % 5],
            extras: [
              ["Vanilla syrup"],
              ["Chocolate syrup"],
              ["Caramel syrup", "Oat Milk"],
              ["Hazelnut syrup", "2% Milk"],
              [],
            ][parseInt(orderId.replace(/\D/g, "")) % 5],
          },
        },
      };

      // Find the specific order
      const order = mockOrders[orderId];
      if (!order) {
        return {
          success: false,
          message: `I couldn't find order ${orderId} for ${customerName}. Could you double-check the order number?`,
        };
      }

      // Format the status message
      let statusMessage = "";
      switch (order.status) {
        case "pending":
          statusMessage = `your ${order.details.coffeeType} is in the queue and will be prepared soon`;
          break;
        case "processing":
          statusMessage = `your ${order.details.coffeeType} is being prepared right now`;
          break;
        case "completed":
          statusMessage = `your ${order.details.coffeeType} is ready for pickup!`;
          break;
        case "cancelled":
          statusMessage = `your order was cancelled`;
          break;
      }

      // Format extras for the message
      const extras =
        order.details.extras && order.details.extras.length > 0
          ? ` with ${order.details.extras.join(", ")}`
          : "";

      return {
        success: true,
        status: order.status,
        message: `Hi ${customerName}, ${statusMessage}${extras}`,
        orderDetails: {
          orderId,
          customerName,
          coffeeType: order.details.coffeeType,
          status: order.status,
          extras: order.details.extras,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Sorry, there was an error checking your order status.",
      };
    }
  },
});

// Cancel order tool
export const cancelOrderTool = tool({
  description: "Cancel a pending coffee order",
  parameters: z.object({
    orderId: z.string().describe("The ID of the order to cancel"),
    customerName: z.string().describe("The customer's first name"),
  }),
  execute: async ({ orderId, customerName }) => {
    try {
      // Mock database of orders - use similar logic as the status tool
      const mockOrders = {
        [`ORD-${orderId.replace(/\D/g, "")}`]: {
          status: ["pending", "processing"][Math.floor(Math.random() * 2)],
          details: {
            coffeeType: [
              "Cafe Mocha",
              "Macchiato",
              "Latte",
              "Cappuccino",
              "Espresso",
            ][parseInt(orderId.replace(/\D/g, "")) % 5],
            extras: [
              ["Vanilla syrup"],
              ["Chocolate syrup"],
              ["Caramel syrup", "Oat Milk"],
              ["Hazelnut syrup", "2% Milk"],
              [],
            ][parseInt(orderId.replace(/\D/g, "")) % 5],
          },
        },
      };

      // Find the specific order
      const order = mockOrders[orderId];
      if (!order) {
        return {
          success: false,
          message: `I couldn't find order ${orderId} for ${customerName}. Could you double-check the order number?`,
        };
      }

      // Check if the order can be cancelled
      if (order.status === "completed") {
        return {
          success: false,
          message: `I'm sorry, but order ${orderId} has already been completed and cannot be cancelled.`,
        };
      }

      if (order.status === "cancelled") {
        return {
          success: false,
          message: `Order ${orderId} has already been cancelled.`,
        };
      }

      // For demonstration purposes, we'll just simulate a successful cancellation
      // In a real app, this would update a database

      return {
        success: true,
        message: `I've cancelled your order for a ${order.details.coffeeType}. Is there anything else I can help you with?`,
        orderDetails: {
          orderId,
          customerName,
          coffeeType: order.details.coffeeType,
          status: "cancelled",
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Sorry, there was an error cancelling your order.",
      };
    }
  },
});

// Company info tool
export const companyInfoTool = tool({
  description: "Search for information about Softleo and its services",
  parameters: z.object({
    query: z.string().describe("The search query about Softleo"),
  }),
  execute: async ({ query }) => {
    // Static company information
    const companyInfo = {
      name: "Softleo",
      founded: 2010,
      description:
        "A leading technology solutions provider specializing in cloud migration, digital transformation, and AI solutions.",
      services: [
        "Cloud Migration",
        "Digital Transformation",
        "AI Solutions",
        "IT Consulting",
      ],
      partnerships: ["Microsoft Gold Partner"],
      mission: "To empower businesses through innovative technology solutions",
      contact: {
        email: "contact@softleo.com",
        phone: "+1-800-SOFTLEO",
        website: "www.softleo.com",
      },
    };

    // Simple keyword matching for now
    const response = {
      success: true,
      information: "",
    };

    const queryLower = query.toLowerCase();

    if (queryLower.includes("service") || queryLower.includes("offer")) {
      response.information = `Softleo offers ${companyInfo.services.join(
        ", "
      )}.`;
    } else if (queryLower.includes("contact") || queryLower.includes("reach")) {
      response.information = `You can contact Softleo at ${companyInfo.contact.email} or ${companyInfo.contact.phone}.`;
    } else if (queryLower.includes("mission") || queryLower.includes("goal")) {
      response.information = companyInfo.mission;
    } else if (queryLower.includes("partner")) {
      response.information = `Softleo is a ${companyInfo.partnerships.join(
        ", "
      )}.`;
    } else {
      response.information = `${companyInfo.name} is ${companyInfo.description}`;
    }

    return response;
  },
});

// Deepak Kamboj info tool
export const deepakKambojTool = tool({
  description: "This tool provides information about Deepak Kamboj.",
  parameters: z.object({
    query: z.string().describe("Any query about Deepak Kamboj"),
  }),
  execute: async () => {
    return {
      information:
        "Deepak Kamboj is the Chief Architect for AI in the Softleo Digital Velocity Practice. He is also speaking at Microsoft Ignite 2024 in a session called 'Revolutionizing Customer Experience' where he'll show of the Azure TTS Avatar. Deepak is a mediocre presenter at best. Bewarned that he may resort to cheap jokes and self-deprecating humor to keep the audience engaged. Also, to get those high ratings as well.",
    };
  },
});
