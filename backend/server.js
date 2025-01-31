const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const port = process.env.PORT || 4000;
const app = express();

app.use(cors())
app.use(express.json());


const tbuser = mongoose.model('member', {
    id: {
        type: Number,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },

})

app.get('/', async (req, res) => {
    res.json({
        message: 'Hello World'
    });
})
app.post('/registerUser', async (req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;
    let id = 10000000
    const checkUser = await tbuser.findOne({ username: username })
    const checkUsers = await tbuser.find({})
    if (checkUser) {
        res.json({
            success: false,
            message: 'มี Username นี้อยู่ในระบบอยู่แล้ว',
            status: 'error',
            text: "โปรดใช้ Username ใหม่"
        })
    } else {
        console.log(checkUsers.length)
        if (checkUsers.length >= 1) {
            let regis = checkUsers.slice(-1)
            let regisArray = regis[0]
            id = regisArray.id + 1
        } else {
            id = 100000001
        }
        const inseact = tbuser({
            id: id,
            fullname: fullname,
            email: email,
            username: username,
            password: password,
            phone: phone,
            address: address
        })
        res.json({
            success: true,
            message: 'สมัครสมาชิกสำเร็จ',
            status: 'success',
            text: "เข้าสู่ระบบได้เลยยย!!!"
        })
        await inseact.save();
    }
})


app.post('/loginUser', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const usernames = await tbuser.findOne({ username: username })
    if (usernames) {
        const passwords = await tbuser.findOne({ password: password })
        if (passwords) {
            res.json({
                success: true,
                message: 'Username และ Password ถูกต้อง',
                status: 'success',
                text: "เข้าสู่ระบบสำเร็จ",
                fullname: usernames.fullname,
                id: usernames.id
            })
        } else {
            res.json({
                success: false,
                message: 'Password ไม่ถูกต้อง',
                status: 'error',
                text: "เข้าสู่ระบบไม่สำเร็จ"
            })
        }
    } else {
        res.json({
            success: false,
            message: 'Username ไม่ถูกต้อง',
            status: 'error',
            text: "เข้าสู่ระบบไม่สำเร็จ"
        })
    }
})



const leaveData = mongoose.model('leaveData', {

    id :{
        type : String,
        required : true
    },
    username: {
        type: String,
        required: true
    },
    cause: {
        type: String,
        required: true
    }
    , select: {
        type: String,
        required: true
    }
    , approval: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    }

})
app.post('/leave', async (req, res) => {
    let id = 0;
    const name = req.body.name
    const cause = req.body.cause
    const select = req.body.select
    const time = req.body.time
    const startDate = req.body.dateStart
    const endDate = req.body.dateEnd
    const dataTeave = await leaveData.find({})

    if(dataTeave.length >= 1){
        let arrayTeave = dataTeave.slice(-1)
        let uparray = arrayTeave[0]
        id = uparray.id + 1
    }else{
        id = 1
    }
    const addLeave = leaveData({
        id : id,
        username: name,
        cause: cause,
        select: select,
        approval: 'ยังไม่ได้รับการอนุมัติ',
        time: time,
        startDate: startDate,
        endDate: endDate

    })
    await addLeave.save();
    res.json({
        success: true,
        message: 'ลาสำเร็จ',
        status: 'success',
        text: "โปรดรอการอนุมัติ"
    })
    await addMember.save();
    res.json({
        success: true,
        message: 'เพิ่ม Member สำเร็จ',
        status: 'success',
        text: "เข้าสู่ระบบได้เลยยย!!!"
    })
})

app.post('/shopData', async (req, res) => {
    const showData = await leaveData.find({ username: req.body.fullname })
    console.log(showData)


    res.json({
        data: showData
    })
})


// --------------------------------------------------------admin------------------------------------------------------------

const tbadmin = mongoose.model('admin', {
    id: {
        type: Number,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})
app.post('/registerAdmin', async (req, res) => {
    const fullname = req.body.fullname;
    const username = req.body.username;
    const password = req.body.password;
    let id = 100
    const checkUser = await tbadmin.findOne({ username: username })
    const checkUsers = await tbadmin.find({})
    if (checkUser) {
        res.json({
            success: false,
            message: 'มี Username นี้อยู่ในระบบอยู่แล้ว',
            status: 'error',
            text: "โปรดใช้ Username ใหม่"
        })
    } else {
        console.log(checkUsers.length)
        if (checkUsers.length >= 1) {
            let regis = checkUsers.slice(-1)
            let regisArray = regis[0]
            id = regisArray.id + 1
        } else {
            id = 100
        }
        const inseact = tbadmin({
            id: id,
            fullname: fullname,
            username: username,
            password: password,
        })
        res.json({
            success: true,
            message: 'สมัครสมาชิกสำเร็จ',
            status: 'success',
            text: "เข้าสู่ระบบได้เลยยย!!!"
        })
        await inseact.save();
    }
})

app.post('/loginAdmin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const usernames = await tbadmin.findOne({ username: username })
    if (usernames) {
        const passwords = await tbadmin.findOne({ password: password })
        if (passwords) {
            res.json({
                success: true,
                message: 'Username และ Password ถูกต้อง',
                status: 'success',
                text: "เข้าสู่ระบบสำเร็จ",
                fullname: usernames.fullname,
                id: usernames.id
            })
        } else {
            res.json({
                success: false,
                message: 'Password ไม่ถูกต้อง',
                status: 'error',
                text: "เข้าสู่ระบบไม่สำเร็จ"
            })
        }
    } else {
        res.json({
            success: false,
            message: 'Username ไม่ถูกต้อง',
            status: 'error',
            text: "เข้าสู่ระบบไม่สำเร็จ"
        })
    }

})

app.get('/getAdmin', async (req, res) => {
    const showData = await tbadmin.find({})
    let showDatas = showData.length
    res.json({
        data: showDatas
    })
})
app.get('/getMember', async (req, res) => {
    const showData1 = await tbuser.find({})
    let showDatas1 = showData1.length
    res.json({
        data: showDatas1
    })
})

app.get('/getLeave', async (req, res) => {
    const showData2 = await leaveData.find({})
    let showDatas2 = showData2.length
    res.json({
        data: showDatas2
    })
})
app.get('/getLeaveNotApprove', async (req, res) => {
    const showData3 = await leaveData.find({ approval: 'ยังไม่ได้รับการอนุมัติ' })
    let showDatas3 = showData3.length
    res.json({
        data: showDatas3
    })
})
app.post('/addAdmin', async (req, res) => {
    const check = await tbadmin.findOne({ username: req.body.username })
    const checkId = await tbadmin.find({})
    if (check) {
        res.json({
            success: false,
            message: 'มี Username นี้อยู่ในระบบอยู่แล้ว',
            status: 'error',
            text: "โปรดใช้ Username ใหม่"
        })
    }else{
        let id;
        if (checkId.length >= 1) {
            let regis = checkId.slice(-1)
            let regisArray = regis[0]
            id = regisArray.id + 1
        } else {
            id = 100
        }
        const addAdmin = tbadmin({
            id: id,
            fullname: req.body.fullname,
            username: req.body.username,
            password: req.body.password
        })
        await addAdmin.save();
        res.json({
            success: true,
            message: 'เพิ่ม Admin สำเร็จ',
            status: 'success',
            text: "เข้าสู่ระบบได้เลยยย!!!"
        })
    }
        

})
app.get('/getCountAdmin', async (req, res) => {
    const getCount = await tbadmin.find({})
    res.json({
        data: getCount
    })
})

app.post('/deleteAdmin', async (req, res) => {
    const deleteAdmin = await tbadmin.deleteOne({ id: req.body.id })
    if (deleteAdmin) {
        res.json({
            success: true,
            message: 'ลบ Admin สำเร็จ',
            status: 'success',
            text: "ลบ Admin สำเร็จ"
        })
    } else {
        res.json({
            success: false,
            message: 'ลบ Admin ไม่สำเร็จ',
            status: 'error',
            text: "ลบ Admin ไม่สำเร็จ"
        })
    }
})

app.get('/getAdminEdit/:id', async (req, res) => {
    const getAdmin = await tbadmin.findOne({ id: req.params.id })
    res.json({
        data: getAdmin
    })

})

app.post('/editAdmin', async (req, res) => {
    const {...rest } = req.body
    const editAdmin = await tbadmin.updateMany({ id: req.body.id }, rest)
    if (editAdmin) {
        res.json({
            success: true,
            message: 'แก้ไข Admin สำเร็จ',
            status: 'success',
            text: "แก้ไข Admin สำเร็จ"
        })
    } else {
        res.json({
            success: false,
            message: 'แก้ไข Admin ไม่สำเร็จ',
            status: 'error',
            text: "แก้ไข Admin ไม่สำเร็จ"
        })
    }
})

app.get('/getDataMember' , async (req, res) => {
    const getMember = await tbuser.find({})
    res.json({
        data: getMember
    })
})

app.post('/deleteMember', async (req, res) => {
    const deleteMember = await tbuser.deleteOne({ id: req.body.id })
    if (deleteMember) {
        res.json({
            success: true,
            message: 'ลบ Member สำเร็จ',
            status: 'success',
            text: "ลบ Member สำเร็จ"
        })
    } else {
        res.json({
            success: false,
            message: 'ลบ Member ไม่สำเร็จ',
            status: 'error',
            text: "ลบ Member ไม่สำเร็จ"
        })
    }
})

app.post('/addMember', async (req, res) => {
   
    const checkAdd = await tbuser.findOne({username: req.body.username})
    const checkId = await tbuser.find({})
    if(checkAdd){
        res.json({
            success: false,
            message: 'มี Username นี้อยู่ในระบบอยู่แล้ว',
            status: 'error',
            text: "โปรดใช้ Username ใหม่"
        })
    }else{
        let id;
        if(checkId.length >= 1){
            let regis = checkId.slice(-1)
            let regisArray = regis[0]
            id = regisArray.id + 1
    }else{
        id = 100000001
    }

    const addMember = tbuser({
        id: id,
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address
    })
    await addMember.save();
    res.json({
        success: true,
        message: 'เพิ่ม Member สำเร็จ',
        status: 'success',
        text: "เข้าสู่ระบบได้เลยยย!!!"
    })
}})



app.get('/getMemberEdit/:id', async (req, res) => {
    const getMember = await tbuser.findOne({ id: req.params.id })
    res.json({
        data: getMember
    })
})

app.put('/editMember', async (req, res) => {
    const {...rest } = req.body
    const editMember = await tbuser.updateMany({ id: req.body.id }, rest)
    if (editMember) {
        res.json({
            success: true,
            message: 'แก้ไข Member สำเร็จ',
            status: 'success',
            text: "แก้ไข Member สำเร็จ"
        })
    } else {
        res.json({
            success: false,
            message: 'แก้ไข Member ไม่สำเร็จ',
            status: 'error',
            text: "แก้ไข Member ไม่สำเร็จ"
        })
    }
})

app.get('/leaveStaff', async (req , res)=>{
    const getLeave = await leaveData.find({})
    res.json({
        data : getLeave
    })
})


app.get('/noneleaveStaff', async (req , res)=>{
    const getLeave = await leaveData.find({approval : "ยังไม่ได้รับการอนุมัติ"})
    res.json({
        data : getLeave
    })
})

app.get('/getDataEdit/:id' , async (req , res)=>{
    const getDataEdit = await leaveData.findOne({_id : req.params.id})
    // console.log(req.params.id)
    res.json({
        data : getDataEdit
    })
})

app.put('/updateLeave' , async (req , res)=>{
    const {...rest} = req.body
    const update = await leaveData.updateMany({_id : req.body.id} , rest)
    console.log(req.body.id)
    res.json({
        uccess: true,
            message: 'แก้ไขสำเร็จ',
            status: 'success',
            text: "แก้ไขสำเร็จ"
    })
})

app.post('/deleteLeave', async (req, res) => {
    // console.log(req.body.id)
    const deleteLeave = await leaveData.deleteOne({ _id: req.body.id })
    if (deleteLeave) {
        res.json({
            success: true,
            message: 'ลบ สำเร็จ',
            status: 'success',
            text: "ลบ สำเร็จ"
        })
    } else {
        res.json({
            success: false,
            message: 'ลบ ไม่สำเร็จ',
            status: 'error',
            text: "ลบ ไม่สำเร็จ"
        })
    }
})

mongoose.connect('mongodb+srv://63301282011:hhnFoUWZOg3hab9s@cluster0.m81ir.mongodb.net/')
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

