const BASE_URL = "http://4.224.186.213/evaluation-service";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzE1MDIwQG5lYy5lZHUuaW4iLCJleHAiOjE3ODI5NzQzNDEsImlhdCI6MTc4Mjk3MzQ0MSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImViZWIyNzcwLTdlYWItNDYwYS05NmYzLTJjMmY2ZTRkYjNmNCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InN1cnlhIHIiLCJzdWIiOiI5ZDI0NjA1OS1kZTU1LTRjMWYtYjRmZi0xZWFiYmI5ZDMyNjYifSwiZW1haWwiOiIyMzE1MDIwQG5lYy5lZHUuaW4iLCJuYW1lIjoic3VyeWEgciIsInJvbGxObyI6IjIzMTUwMjAiLCJhY2Nlc3NDb2RlIjoiRVJ6VXl4IiwiY2xpZW50SUQiOiI5ZDI0NjA1OS1kZTU1LTRjMWYtYjRmZi0xZWFiYmI5ZDMyNjYiLCJjbGllbnRTZWNyZXQiOiJ1cmpWeFV2RVhERXZYeHNDIn0.aAwqsL-jUemaQpOycgH16iL_8Gec8JQZkF5ZVwUSuOs";
export async function fetchNotifications(
  page = 1,
  limit = 10,
  type = "All"
) {
  let url = `${BASE_URL}/notifications?page=${page}&limit=${limit}`;
  if (type !== "All") {
    url += `&notification_type=${type}`;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return await response.json();
}