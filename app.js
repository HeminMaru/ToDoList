const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Date = require(__dirname + "/date.js")

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

const Item = mongoose.model('Item', {
    item: {
        require: [true, "Work not Found"],
        type: String
    }

});


app.get("/", function(req, res) {
    Item.find({}, function(err, itemList) {
        if (err) {
            console.log(err);
        } else {
            res.render("list", {
                Today: Date(),
                allItems: itemList
            });
        }
    });

});

app.post("/", function(req, res) {
    let item = req.body.newItem;
    const newItem = new Item({ item: item });
    Item.insertMany(newItem, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Item added Successfully!!")
        }
    });
    res.redirect("/");
});

app.post("/delete", function(req, res) {
    Item.deleteOne({ _id: req.body.checkbox }, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("deleted successfully!");
        }
    })
    res.redirect("/");
});

app.listen(5500);