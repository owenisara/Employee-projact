const mongoose = require('mongoose')

const  urldb = "mongodb://127.0.0.1:27017/employeeDB" 

mongoose.set("strictQuery",false)

mongoose.connect(urldb,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).catch(err=>{if(err)console.log(err)
})

const employeeSchema = mongoose.Schema({
             firstname:String,
             lastname:String,
             email:String,
             salary:Number,
             department:String})

const Employee = mongoose.model('employees',employeeSchema)

module.exports = Employee
module.exports.saveEmployee =(model,data)=>{
    model.save(data)
}

