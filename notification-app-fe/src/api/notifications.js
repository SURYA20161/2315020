const BASE_URL = "http://4.224.186.213/evaluation-service";

// Store your JWT securely (for example, in a Vite environment variable).
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzE1MDIwQG5lYy5lZHUuaW4iLCJleHAiOjE3ODI5NzYwNTksImlhdCI6MTc4Mjk3NTE1OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjA5MTJlMWM4LTI5OTEtNDNmMy05MjQzLWI3MzRlYmRlZTIxZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InN1cnlhIHIiLCJzdWIiOiI5ZDI0NjA1OS1kZTU1LTRjMWYtYjRmZi0xZWFiYmI5ZDMyNjYifSwiZW1haWwiOiIyMzE1MDIwQG5lYy5lZHUuaW4iLCJuYW1lIjoic3VyeWEgciIsInJvbGxObyI6IjIzMTUwMjAiLCJhY2Nlc3NDb2RlIjoiRVJ6VXl4IiwiY2xpZW50SUQiOiI5ZDI0NjA1OS1kZTU1LTRjMWYtYjRmZi0xZWFiYmI5ZDMyNjYiLCJjbGllbnRTZWNyZXQiOiJ1cmpWeFV2RVhERXZYeHNDIn0.uvkD7hXBxz4lCb9QG9w4tClj6Vt7-g33N8vQ6aYVopc";

export async function fetchNotifications(
  page = 1,
  limit = 10,
  type = "All"
) {
  let url = `${BASE_URL}/notifications?page=${page}&limit=${limit}`;

  if (type !== "All") {
    url += `&notification_type=${encodeURIComponent(type)}`;
  }

  try {
    console.log("======================================");
    console.log("Notification API Request Started");
    console.log("URL     :", url);
    console.log("Method  : GET");
    console.log("======================================");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();

      console.log("======================================");
      console.log("Status  :", response.status);
      console.log("Message :", error);
      console.log("======================================");

      throw new Error(error);
    }

    const data = await response.json();

    console.log("======================================");
    console.log("Status  : Success");
    console.log("HTTP    :", response.status);
    console.log(
      "Count   :",
      Array.isArray(data.notifications) ? data.notifications.length : 0
    );
    console.log("Message : Notifications fetched successfully");
    console.log("======================================");

    return data;
  } catch (err) {
    console.log("======================================");
    console.log("Status  : Failed");
    console.log("Message :", err.message);
    console.log("======================================");
    throw err;
  }
}