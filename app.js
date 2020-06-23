var express     = require("express"),
methodOverride  = require("method-override"),
expressSanitizer=require("express-sanitizer"),
bodyParser      =require("body-parser"),
mongoose        =require("mongoose"), 
app             =express();

mongoose.connect("mongodb+srv://dbUser:dbUser@cluster0-asksu.mongodb.net/restful_blog_app?retryWrites=true&w=majority");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

var ansSchema=new mongoose.Schema({
    ans:String,
    name:String
})
var blogSchema = new mongoose.Schema({
    title: String,
    image:String,
    body:[ansSchema],
    created: {type:Date,default:Date.now},
    name:String,
    genre:String
    
});
var infoSchema= new mongoose.Schema({
    email: String,
    password:String,
    name:String,
    number:String
})

var Ans=mongoose.model("Ans",ansSchema);

var Blog=mongoose.model("Blog",blogSchema);

var Info=mongoose.model("Info",infoSchema);

app.get("/",function(req,res){
    res.render("signup");
    
})
app.post("/login",function(req,res){
    var email=req.body.info.email;
    var pass=req.body.info.password;

    Info.find({email:email,password:pass},function(err,infos){
        
        global.info = infos;
        ;
        if(infos[0]==null || infos[0].email!=email){
            res.redirect("/");
            
        }
        else{
            Blog.find({},function(err,blogs){
                if(err){
                    res.redirect("/");
                }
                else{
                    res.render("all",{blogs:blogs,infos:infos});
                }
            })
            
            
        }
    })
})

app.get("/content",function(req,res){
    Blog.find({name:info[0].name},function(err,foundBlog){
        if(err){
            console.log(err);
        }
        else{
            res.render("content",{blogs:foundBlog,infos:info})
        }
    })
})

app.get("/content/ans",function(req,res){
    Blog.find({},function(err,foundBlog){
        if(err){
            console.log(err);
        }
        else{
            res.render("answered",{blogs:foundBlog,infos:info})
        }
    })
})

app.get("/sign",function(req,res){
    res.render("sign");
})

app.post("/signin",function(req,res){
    Info.create(req.body.info,function(err,infoBlog){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    })

})

app.get("/blogs",function(req,res){
    if(info[0].email!=null && info[0].password!=null){
    Blog.find({},function(err,blogs){
        if (err){
            console.log("ERROR!");
        }
        else{
            res.render("all",{blogs:blogs,infos:info});
        }
    })
    }
    else{
        res.redirect("/");
    }
    
})

app.get("/blogs/academics",function(req,res){
    Blog.find({genre:"Academics"},function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("academics",{blogs:foundBlog,infos:info});
            
        }
    })
})

app.get("/blogs/hostel",function(req,res){
    Blog.find({genre:"Hostel"},function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("hostel",{blogs:foundBlog,infos:info});
            
        }
    })
})

app.get("/blogs/mess",function(req,res){
    Blog.find({genre:"Mess"},function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("mess",{blogs:foundBlog,infos:info});
            
        }
    })
})

app.get("/blogs/roomallotment",function(req,res){
    Blog.find({genre:"RoomAllotment"},function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("roomallotment",{blogs:foundBlog,infos:info});
            
        }
    })
})

app.get("/blogs/books",function(req,res){
    Blog.find({genre:"Books"},function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("books",{blogs:foundBlog,infos:info});
            
        }
    })
})

app.get("/blogs/projects",function(req,res){
    Blog.find({genre:"Projects"},function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("projects",{blogs:foundBlog,infos:info});
            
        }
    })
})

app.get("/blogs/faculty",function(req,res){
    Blog.find({genre:"Faculty"},function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("faculty",{blogs:foundBlog,infos:info});
            
        }
    })
})

app.get("/blogs/subjects",function(req,res){
    Blog.find({genre:"Subjects"},function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("subjects",{blogs:foundBlog,infos:info});
            
        }
    })
})

app.get("/blogs/ffcs",function(req,res){
    Blog.find({genre:"FFCS"},function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("ffcs",{blogs:foundBlog,infos:info});
            
        }
    })
})

app.get("/blogs/transport",function(req,res){
    Blog.find({genre:"Transport"},function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("transport",{blogs:foundBlog,infos:info});
            
        }
    })
})
app.get("/answer",function(req,res){
    Blog.find({},function(err,blogs){
        if (err){
            console.log("ERROR!");
        }
        else{
            res.render("answer",{blogs:blogs,infos:info});
        }
    })
})

//NEW
app.get("/blogs/new",function(req,res){
    
    res.render("new",{infos:info});
})
//RESTFUL ROUTES
app.post("/blogs",function(req,res){
    req.body.blog.name=info[0].name;
    if(req.body.blog.title!=""){
        
        Blog.create(req.body.blog,function(err,newBlog){
            if(err){
                console.log(err);
            }else{
                res.redirect("/blogs");
                
            }
        }) 
    }else{
        res.redirect("/blogs");
    }
})

app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log(err);
        }else{
            
             res.render("ans",{blog:foundBlog,infos:info});
        }
    })
    
})



app.put("/blogs/:id",function(req,res){
    req.body.ans.name=info[0].name;
    Ans.create(req.body.ans,function(err,ans){
        if(err){
            console.log(err);
        }
        else{
            
            Blog.findById(req.params.id,function(err,foundBlog){
                if(err){
                    console.log(err);
                }
                else{
                    foundBlog.body.push(ans);
                    Blog.findByIdAndUpdate(req.params.id,foundBlog,function(err,blog){
                        if(err){
                            console.log(err);
                        }else{
                            res.redirect("/blogs");
                        }

                        
                    })
                }
            })
            
           
            
        }
    })
    // Blog.findByIdAndUpdate(req.params.id,req.body.ans,function(err,UpdatedBlog){
    //     if(err){
    //         res.redirect("/blogs");
    //     }else{
    //         res.redirect("/blogs/"+req.params.id);
    //     }
    // })
})

//DELETE
app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndDelete(req.params.id,function(err,delBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    })
})
app.get("/blogs/:id/view",function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log(err);
        }
        else{
            var count=0;
            for(var i=0;i<foundBlog.body.length;i++){
                if(foundBlog.body[i].ans!=""){
                    var count=count+1;
                }
            }
        
            res.render("view",{blog:foundBlog,infos:info,count:count});
        }
    })
})

var PORT=process.env.PORT || 3000;
app.listen(PORT,function(){
    console.log("Server is running");
})