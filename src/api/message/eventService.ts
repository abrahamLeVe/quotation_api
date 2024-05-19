import { senMessage } from "./sendMessage";

interface EventData {
  type: string;
  details: {
    id: number;
    message: string;
  };
}

export const handleEvent = async (eventData: EventData): Promise<void> => {
  try {
    switch (eventData.type) {
      case "error":
        await senMessage(
          eventData.details.id,
          `Error: ${eventData.details.message}`
        );
        break;
      case "paymentUpdate":
        await senMessage(eventData.details.id, "Estado de pago actualizado");
        break;
      default:
        console.log("No event handler for type:", eventData.type);
    }
  } catch (error) {
    console.error("Failed to handle event:", error);
  }
};
