const express = require("express");
const bodyParser = require("body-parser");
const database = require("mysql");
const { response } = require("express");
const app = express();
const port = 5043;
let nav = "";
let connection = database.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ExpenseTracker",
});
connection.connect((err) => {
  if (err) {
    console.log("err");
  } else {
    console.log("databaseconnected");
  }
});
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/home", (req, res) => {
  console.log(req.query.id);
  let sql = `SELECT ExpenseDetails.Category,ExpenseDetails.AmountCategory,ExpenseDetails.id,ExpenseDetails.ExpenseDescription,ExpenseDetails.created_At,ExpenseDetails.amount,UserDetails.UserName,UserDetails.Totalamount FROM ExpenseDetails LEFT JOIN UserDetails ON ExpenseDetails.userId = UserDetails.id ORDER BY ExpenseDetails.created_At desc`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("err");
    } else {
      let json = result;
      nav = "home";
      res.render("index", { json, nav });
    }
  });
});
app.get("/kanban", (req, res) => {
  console.log(req.query.id + "kanaba");
  let sql = `SELECT ExpenseDetails.Category,ExpenseDetails.AmountCategory,ExpenseDetails.id,ExpenseDetails.ExpenseDescription,ExpenseDetails.created_At,ExpenseDetails.amount,UserDetails.UserName,UserDetails.Totalamount FROM ExpenseDetails LEFT JOIN UserDetails ON ExpenseDetails.userId = UserDetails.id ORDER BY ExpenseDetails.created_At desc`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("err");
    } else {
      let json = result;
      nav = "kanban";
      res.render("index", { json, nav });
    }
  });
});
app.get("/about", (req, res) => {
  console.log(req.query.id);
  let sql = `SELECT ExpenseDetails.Category,ExpenseDetails.AmountCategory,ExpenseDetails.id,ExpenseDetails.ExpenseDescription,ExpenseDetails.created_At,ExpenseDetails.amount,UserDetails.UserName,UserDetails.Totalamount FROM ExpenseDetails LEFT JOIN UserDetails ON ExpenseDetails.userId = UserDetails.id ORDER BY ExpenseDetails.created_At desc`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("err");
    } else {
      let json = result;
      nav = "about";
      res.render("index", { json, nav });
    }
  });
});
app.get("/index", (req, res) => {
  console.log(req.query.id);
  let sql = `SELECT ExpenseDetails.Category,ExpenseDetails.AmountCategory,ExpenseDetails.id,ExpenseDetails.ExpenseDescription,ExpenseDetails.created_At,ExpenseDetails.amount,UserDetails.UserName,UserDetails.Totalamount FROM ExpenseDetails LEFT JOIN UserDetails ON ExpenseDetails.userId = UserDetails.id ORDER BY ExpenseDetails.created_At desc`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("err");
    } else {
      let json = result;
      nav = "home";
      res.render("index", { json, nav });
    }
  });
});
app.set("view engine", "ejs");
app.use(express.static("public"));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

app.post("/index", (req, res) => {
  console.log(req.body.expenseDetails);
  let value = req.body.expenseDetails;
  if (value.type == "insert") {
    console.log("insert");
    let sql = `insert into ExpenseDetails(userId,amount,AmountCategory,ExpenseDescription,Category)values(${1},${
      value.amount
    },'${value.AmountCategory}','${value.ExpenseDescription}','${
      value.Category
    }')`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        connection.query(
          `UPDATE UserDetails SET Totalamount = UserDetails.Totalamount-${value.amount}  WHERE UserDetails.id = 1;`,
          sql,
          (err, result) => {
            if (err) {
              console.log("err");
            } else {
              res.redirect("/index");
            }
          }
        );
      }
    });
  } else if ((value.type == "update")) {
    console.log("update");
    let sql = `UPDATE ExpenseDetails SET ExpenseDescription ='${value.ExpenseDescription}', amount=${value.amount},AmountCategory='${value.AmountCategory}',Category='${value.Category}' WHERE ExpenseDetails.id = ${value.id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(value.nav + "nav" + value.id);
        res.redirect(`/${value.nav}?id=${value.id}`);
      }
    });
  }
  else if((value.type == 'add')){
    let sql = `update UserDetails set TotalAmount=UserDetails.TotalAmount+${value.amount} where UserDetails.id=${value.id}`;
    connection.query(sql,(err,result)=>{
      if(err){
        console.log(err)
      }
      else{
        res.redirect('/index');
      }
    })
  }
  else{
    let sql = `DELETE FROM ExpenseDetails WHERE ExpenseDetails.id =${value.id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/index');
      }
    });
  }
});
// listen port
app.listen(port, () => {
  console.log(`server up on ${port}`);
});
/*1.SELECT ExpenseDetails.Category,ExpenseDetails.AmountCategory,ExpenseDetails.ExpenseDescription,ExpenseDetails.amount,UserDetails.UserName,UserDetails.Totalamount FROM ExpenseDetails LEFT JOIN UserDetails ON ExpenseDetails.userId = UserDetails.id ORDER BY ExpenseDetails.id;
2.UPDATE `ExpenseDetails` SET `ExpenseDescription` = 'Drss', amount=200 WHERE `ExpenseDetails`.`id` = 8;
3.SELECT SUM(amount) FROM ExpenseDetails WHERE userId=1;
4.DELETE FROM `ExpenseDetails` WHERE `ExpenseDetails`.`id` = 10
<div id="statusDivId"class="<%=(element.Category == 'expenses')?'expenses':(element.Category == 'Savings')?'Savings':'Investment'%>">
                                    <div id="statusDivIdPoint"class="<%=(element.Category == 'expenses')?'expensesPoint':(element.Category == 'Savings')?'SavingsPoint':'InvestmentPoint'%>"></div>
                                    <b><%= element.Category%></b>
                                   
                                </div>*/
