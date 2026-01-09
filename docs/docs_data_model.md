# 🗄️ Data Model Documentation

This document describes the **MongoDB schemas** used in the Disaster Relief Platform.

---

## User Schema

```js
User {
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  createdAt: Date
}
```

**Notes:**
- Passwords are stored hashed
- Email is unique

---

## HelpRequest Schema

```js
HelpRequest {
  _id: ObjectId,
  title: String,
  description: String,
  urgency: "Critical" | "High" | "Medium" | "Low",
  address: String,
  latitude: Number,
  longitude: Number,
  createdBy: ObjectId (User),
  volunteers: [ObjectId (User)],
  contactInfo: String,
  createdAt: Date
}
```

**Notes:**
- Geocoded fields enable map markers
- Contact info is revealed only after volunteering

---

## Resource Schema

```js
Resource {
  _id: ObjectId,
  type: String,
  description: String,
  quantity: Number,
  address: String,
  latitude: Number,
  longitude: Number,
  contactInfo: String,
  createdBy: ObjectId (User),
  createdAt: Date
}
```

---

## Relationships

```
User 1 ──── * HelpRequest
User 1 ──── * Resource
HelpRequest * ──── * User (Volunteers)
```

---

## Future Data Extensions

- Audit logs
- Admin moderation flags
- Status tracking (Open / In Progress / Resolved)
- GeoIndexes for spatial queries

