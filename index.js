const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.use(express.json());

app.get("/user", async (req, res) => {
  const userData = await prisma.users.findMany();
  res.send(userData);
});

app.post("/userinsert", async (req, res) => {
  const userin = await prisma.users.create({
    data: {
      id: req.body.id,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
    },
  });
  if (userin) {
    res.send("inserted");
  } else {
    res.send("not inserted");
  }
});

app.patch("/userupdate", async (req, res) => {
  const userupdate = await prisma.users.update({
    where: {
      id: req.body.id,
    },
    data: {
      contact: req.body.contact,
    },
  });

  if (userupdate) {
    res.send(userupdate);
  } else {
    res.send("not update");
  }
});

app.delete("/deleteuser", async (req, res) => {
  const deleteUser = await prisma.users.delete({
    where: {
      id: req.body.id,
    },
  });
  if (deleteUser) {
    res.send(deleteUser);
    res.send("user Deleted");
  } else {
    res.send("Not Deleted");
  }
});

app.post("/booking", async (req, res) => {
  const bookinsert = await prisma.booking.create({
    data: {
      id: req.body.id,
      userID: req.body.userID,
      showtimeID: req.body.showtimeID,
      number_tickets: req.body.number_tickets,
      total_cost: req.body.total_cost,
    },
  });
  if (bookinsert) {
    res.send("insert");
  } else {
    res.send("not insert");
  }
});

app.get("/userbook", async (req, res) => {
  const userbook = await prisma.booking.findFirst({
    include: {
      userbook: true,
    },
  });
  res.send(userbook);
});
app.listen(3500, () => {
  console.log("Server Start");
});
