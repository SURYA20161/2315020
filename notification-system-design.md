# Notification System Design

## Stage 1

### REST API Design

#### Get Notifications

**Endpoint**

```http
GET /notifications
```

**Headers**

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Query Parameters**

| Parameter | Description |
|-----------|-------------|
| page | Page number |
| limit | Number of notifications |
| notification_type | All / Placement / Result / Event |

### Response

```json
{
  "notifications": [
    {
      "ID": "123",
      "Type": "Placement",
      "Message": "Microsoft Hiring",
      "Timestamp": "2026-07-01T10:00:00Z"
    }
  ]
}
```

### Features

- View notifications
- Filter notifications
- Pagination
- Mark notification as read
- Real-time notification updates

### Real-Time Communication

WebSocket or Server-Sent Events (SSE) can be used to push notifications instantly without refreshing the page.

---

# Stage 2

## Database Design

### Notifications Table

| Column | Type |
|---------|------|
| id | UUID |
| studentId | UUID |
| notificationType | VARCHAR |
| message | TEXT |
| isRead | BOOLEAN |
| createdAt | TIMESTAMP |

### Indexes

- studentId
- notificationType
- createdAt
- (studentId, isRead, createdAt)

### Scaling Strategy

- Database indexing
- Pagination
- Read replicas
- Database partitioning
- Archive old notifications

---

# Stage 3

## SQL Query Optimization

### Existing Query

```sql
SELECT *
FROM notifications
WHERE studentID=1042
AND isRead=false
ORDER BY createdAt;
```

### Problems

- Uses SELECT *
- No composite index
- Large data scan

### Optimized Query

```sql
SELECT id,
notificationType,
message,
createdAt
FROM notifications
WHERE studentID=1042
AND isRead=false
ORDER BY createdAt
LIMIT 20;
```

### Composite Index

```sql
CREATE INDEX idx_notifications
ON notifications(studentID,isRead,createdAt);
```

### Placement Notifications

```sql
SELECT studentID
FROM notifications
WHERE notificationType='Placement'
AND createdAt>=NOW()-INTERVAL '7 DAY';
```

---

# Stage 4

## Performance Improvements

Fetching notifications every page load increases server load.

### Better Solution

- Server-side pagination
- Redis caching
- Lazy loading
- Infinite scrolling
- Background refresh
- Read replicas

### Benefits

- Faster response time
- Reduced database load
- Better user experience

---

# Stage 5

## Reliable Notification Delivery

### Current Problem

If email delivery fails, some notifications may be lost.

### Improved Design

1. Save notification in database.
2. Push notification to a message queue.
3. Worker processes send emails.
4. Retry failed notifications.
5. Maintain delivery logs.

### Pseudocode

```text
NotifyAll(studentIds,message)

for each student

    saveNotification(student)

    enqueueEmail(student)

    enqueuePush(student)

return success
```

### Advantages

- Reliable delivery
- Retry support
- Fault tolerance
- Better scalability

---

# Stage 6

## Priority Notification Algorithm

### Priority Levels

| Notification Type | Priority |
|-------------------|----------|
| Placement | 3 |
| Result | 2 |
| Event | 1 |

### Algorithm

1. Assign priority based on notification type.
2. Sort by priority.
3. If priorities are equal, sort by latest timestamp.
4. Display the top N notifications.

### Time Complexity

- Insert : O(log N)
- Remove : O(log N)
- Retrieve Top N : O(N)

---

# Stage 7

## Frontend Implementation

### Features Completed

- Display notifications
- Filter notifications
- Pagination
- Material UI interface
- API integration using Fetch API
- JWT authentication
- Error handling
- Loading indicator
- Responsive design

### Technologies Used

- React
- Material UI
- JavaScript
- Fetch API
- Vite