const axios = require("axios");
const fs = require("fs");
const readline = require("readline");

const EVENT_NAMES = {
  ADD_REVENUE: "add_revenue",
  SUBTRACT_REVENUE: "subtract_revenue",
};

const EventData = {
  create: function (userId, name, value) {
    return {
      userId: userId,
      name: name,
      value: value,
    };
  },
};
const serverUrl = "http://localhost:8000/liveEvent";
const secret = "secret";

// Function to send an event to the server
async function sendEvent(userId, name, value) {
  try {
    const eventData = EventData.create(userId, name, value);

    const headers = {
      Authorization: `Bearer ${secret}`,
    };

    // Make a POST request to the server's 'liveEvent' endpoint
    const response = await axios.post(serverUrl, eventData, { headers });

    console.log("Event sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending event:", error.message);
  }
}

// Function to read events from the file and send them
async function readAndSendEventsFromFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    try {
      const eventData = JSON.parse(line);
      await sendEvent(eventData);
    } catch (error) {
      console.error("Error parsing JSON:", error.message);
    }
  }
}

// Example usage
const filePath = "events.jsonl";
readAndSendEventsFromFile(filePath);
