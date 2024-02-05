## Ticketing System Client by Arkar Phyo

### [After setting up api](https://github.com/ARKAR-PHYO/ticketing-system-api/blob/26bc491df376238edb110ac4cc70c4004e2dc8f5/README.md), let's get started on client.

clone repository

```bash
git clone https://github.com/ARKAR-PHYO/ticketing-system-panel.git
```

```bash
cd ticketing-system-panel
```

Install dependencies

```bash
yarn
or
npm install
```

---

#### Signin

Please use

````json
{"email": "super_admin@admin.com", "password": "password"} ``` or
```json
{"email": "Super Admin", "password": "password"}
````

#### Create Roles & Permissions

Go to `http://localhost:3000/role-permission-management/new` and create new Role
with Permission.

#### Create Users

Go to `http://localhost:3000/user-management/new` and create new User but Email
and Mobile Number are not mandatory.

#### Create Project

Go to `http://localhost:3000/project-management/new` to create new project.

#### Ticket

First, to receive push notification, Please allow Notification Permission on
popup on `http://localhost:3000/ticket-management`
